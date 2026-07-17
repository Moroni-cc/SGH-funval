import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {  updateReport } from "../../services/reports.service";
import { getCategories } from "../../services/categories.service";
import { useToast } from "../../hooks/useToast";
import PdfUploadField from "../../components/forms/PdfUploadField";

function EditReport() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { showToast } = useToast();

    const [form, setForm] = useState({
        hours_spent: "",
        category_id: "",
        description: "",
    });
    const [categories, setCategories] = useState([]);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [blocked, setBlocked] = useState(false);

    const [archivo, setArchivo] = useState(null);
    const [fileError, setFileError] = useState("");
    const [dragging, setDragging] = useState(false);
    const fileInputRef = useRef(null);

    const loadData = useCallback(async () => {
        try {
            const [data, categoryList] = await Promise.all([
                getReports({ pageSize: 100 }),
                getCategories(),
            ]);
            const report = data.items.find((r) => String(r.id) === String(id));

            if (!report) {
                setBlocked(true);
                showToast("El reporte no existe", "error");
                return;
            }

            if (report.status !== "PENDING") {
                setBlocked(true);
                showToast("Solo puedes editar reportes pendientes", "error");
                return;
            }

            setForm({
                hours_spent: String(report.hours_spent ?? ""),
                category_id: String(report.category_id ?? ""),
                description: report.description ?? "",
            });
            setCategories(categoryList);
        } catch (error) {
            if (error.response?.status === 403) {
                setBlocked(true);
                showToast("No tienes permiso para editar este reporte", "error");
            } else if (error.response?.status === 404) {
                setBlocked(true);
                showToast("El reporte no existe", "error");
            } else {
                showToast("Error al cargar el reporte", "error");
            }
        } finally {
            setLoading(false);
        }
    }, [id, showToast]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        loadData();
    }, [loadData]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const validarArchivo = (file) => {
        if (!file) return;
        if (file.type !== "application/pdf") {
            setFileError("El archivo debe ser un PDF.");
            setArchivo(null);
            return;
        }
        setFileError("");
        setArchivo(file);
    };

    const handleFileChange = (e) => validarArchivo(e.target.files?.[0]);

    const handleDrop = (e) => {
        e.preventDefault();
        setDragging(false);
        validarArchivo(e.dataTransfer.files?.[0]);
    };

    const limpiarArchivo = () => {
        setArchivo(null);
        setFileError("");
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = {};
        if (!form.hours_spent || Number(form.hours_spent) <= 0)
            newErrors.hours_spent = "Las horas deben ser un número mayor a 0.";
        if (!form.category_id) newErrors.category_id = "Selecciona una categoría.";
        if (!form.description.trim())
            newErrors.description = "La descripción es obligatoria.";
        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) return;

        try {
            setSaving(true);
            await updateReport(id, {
                hours_spent: Number(form.hours_spent),
                category_id: Number(form.category_id),
                description: form.description,
                file: archivo,
            });
            showToast("Reporte actualizado con éxito", "success");
            navigate("/student/reports");
        } catch (error) {
            if (error.response?.status === 403) {
                showToast("No puedes editar un reporte que ya fue revisado", "error");
            } else if (error.response?.status === 422) {
                showToast("Datos inválidos: revisa los campos", "error");
            } else {
                showToast("Error al actualizar el reporte", "error");
            }
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex h-full min-h-[50vh] items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
            </div>
        );
    }

    if (blocked) {
        return (
            <div className="mx-auto w-full max-w-3xl space-y-6 bg-slate-50 p-6 min-h-screen">
                <div className="rounded-2xl border border-rose-100 bg-white p-6 shadow-sm">
                    <h1 className="text-xl font-bold text-slate-800">
                        No puedes editar este reporte
                    </h1>
                    <p className="mt-2 text-sm text-slate-500">
                        Solo los reportes en estado Pendiente pueden modificarse.
                    </p>
                    <button
                        onClick={() => navigate("/student/reports")}
                        className="mt-6 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
                    >
                        Volver al listado
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="mx-auto w-full max-w-3xl space-y-6 bg-slate-50 p-6 min-h-screen">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-slate-800">
                    Editar reporte
                </h1>
                <p className="mt-1 text-sm font-medium text-slate-500">
                    Modifica los datos de tu reporte pendiente
                </p>
            </div>

            <form
                onSubmit={handleSubmit}
                className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm"
            >
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                        <label htmlFor="hours_spent" className="text-sm font-semibold text-slate-700">
                            Horas de servicio
                        </label>
                        <input
                            id="hours_spent"
                            name="hours_spent"
                            type="number"
                            value={form.hours_spent}
                            onChange={handleChange}
                            className={`w-full rounded-xl border px-4 py-3 text-sm text-slate-800 outline-none transition focus:ring-2 focus:ring-blue-500 ${
                                errors.hours_spent ? "border-red-500" : "border-slate-300"
                            }`}
                            placeholder="Ej. 4"
                        />
                        {errors.hours_spent && (
                            <span className="text-xs text-red-600">{errors.hours_spent}</span>
                        )}
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="category_id" className="text-sm font-semibold text-slate-700">
                            Categoría
                        </label>
                        <select
                            id="category_id"
                            name="category_id"
                            value={form.category_id}
                            onChange={handleChange}
                            className={`w-full rounded-xl border px-4 py-3 text-sm text-slate-800 outline-none transition focus:ring-2 focus:ring-blue-500 ${
                                errors.category_id ? "border-red-500" : "border-slate-300"
                            }`}
                        >
                            <option value="">Selecciona una categoría</option>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                        {errors.category_id && (
                            <span className="text-xs text-red-600">{errors.category_id}</span>
                        )}
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="description" className="text-sm font-semibold text-slate-700">
                            Descripción
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            rows={4}
                            value={form.description}
                            onChange={handleChange}
                            className={`w-full rounded-xl border px-4 py-3 text-sm text-slate-800 outline-none transition focus:ring-2 focus:ring-blue-500 ${
                                errors.description ? "border-red-500" : "border-slate-300"
                            }`}
                            placeholder="Describe la actividad realizada"
                        />
                        {errors.description && (
                            <span className="text-xs text-red-600">{errors.description}</span>
                        )}
                    </div>
                </div>

                <PdfUploadField
                    archivo={archivo}
                    error={fileError}
                    dragging={dragging}
                    setDragging={setDragging}
                    fileInputRef={fileInputRef}
                    handleFileChange={handleFileChange}
                    handleDrop={handleDrop}
                    limpiarArchivo={limpiarArchivo}
                />

                <p className="mt-3 text-xs text-slate-500">
                    La evidencia es opcional: si no subes un archivo nuevo, se conserva el actual.
                </p>

                <div className="mt-6 flex gap-3">
                    <button
                        type="submit"
                        disabled={saving}
                        className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700 disabled:opacity-60"
                    >
                        {saving ? "Guardando..." : "Guardar cambios"}
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate("/student/reports")}
                        className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
                    >
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
}

export default EditReport;