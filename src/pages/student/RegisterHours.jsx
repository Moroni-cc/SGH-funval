import { useNavigate } from "react-router-dom";
import { useToast } from "../../hooks/useToast";
import { createReport } from "../../services/reports.service";
import HourForm from "../../components/forms/HourForm";

function RegisterHours() {
    const navigate = useNavigate();
    const { showToast } = useToast();

    const handleSubmit = async (formData) => {
        try {
            await createReport({
                hours_spent: formData.get("horas"),
                category_id: formData.get("categoriaServicio"),
                description: formData.get("descripcion"),
                evidence: formData.get("evidencia"),
            });

            showToast("Reporte registrado correctamente", "success");
            navigate("/student/reports");
        } catch (error) {
            const detail = error.response?.data?.detail;
            const mensaje = Array.isArray(detail)
                ? detail.map((d) => d.msg).join(", ")
                : detail || error.message || "No se pudo registrar el reporte";

            showToast(mensaje, "error");
            throw error; // evita que HourForm limpie el formulario si falla
        }
    };

    const handleCancel = () => {
        navigate("/student/reports");
    };

    return (
        <div className="mx-auto w-full max-w-7xl p-6 min-h-screen bg-slate-50">
            <HourForm onSubmit={handleSubmit} onCancel={handleCancel} />
        </div>
    );
}

export default RegisterHours;