import { useRef, useState } from "react";
import CategoryForm from "./CategoryForm";
import CourseForm from "./CourseForm";
import PdfUploadField from "./PdfUploadField";

function HourForm({ onSubmit, onCancel }) {
  const formRef = useRef(null); //Se utiliza para limpiar todos los campos con reset().
  const fileInputRef = useRef(null); //Permite limpiar manualmente el archivo seleccionado.

  const [archivo, setArchivo] = useState(null);
  const [error, setError] = useState("");
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(false);

  const limpiarArchivo = () => {
    setArchivo(null);
    setError("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const validarArchivo = (file) => {
    if (!file) return;

    const esPdfPorTipo = file.type === "application/pdf";
    const esPdfPorExtension = file.name.toLowerCase().endsWith(".pdf");

    if (!esPdfPorTipo || !esPdfPorExtension) {
      limpiarArchivo();
      setError("El archivo seleccionado debe estar en formato PDF.");
      return;
    }

    setArchivo(file);
    setError("");
  };

  const handleFileChange = (event) => {
    validarArchivo(event.target.files?.[0]);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragging(false);

    validarArchivo(event.dataTransfer.files?.[0]);
  };

  const handleCancel = () => {
    formRef.current?.reset();
    limpiarArchivo();
    onCancel?.();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!archivo) {
      setError("Debes adjuntar una evidencia en PDF.");
      return;
    }

    const formulario = event.currentTarget;
    const formData = new FormData(formulario);

    formData.set("evidencia", archivo);

    try {
      setLoading(true);
      setError("");

      if (onSubmit) {
        await onSubmit(formData);
      } else {
        console.log({
          fecha: formData.get("fecha"),
          horas: formData.get("horas"),
          curso: formData.get("curso"),
          categoria: formData.get("categoriaServicio"),
          descripcion: formData.get("descripcion"),
          evidencia: formData.get("evidencia"),
        });
      }

      formulario.reset();
      limpiarArchivo();
    } catch (error) {
      setError(error.message || "No se pudo registrar la actividad.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      encType="multipart/form-data"
      className="mx-auto w-full max-w-4xl rounded-2xl border border-slate-200 bg-white p-5 shadow-xl sm:p-7"
    >
      {/* Encabezado */}
      <header className="mb-5 flex items-start gap-4 pb-5">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#1A2B4C] text-white shadow-md">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 16V4m0 0L7.5 8.5M12 4l4.5 4.5M5 14v4a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4"
            />
          </svg>
        </div>

        <div>
          <h2 className="text-xl font-bold text-[#1A2B4C] sm:text-2xl">
            Registrar horas de servicio
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Completa el formulario y adjunta la evidencia de tu actividad. El
            reporte quedará pendiente hasta su revisión.
          </p>
        </div>
      </header>

      {/* Datos de la actividad */}
      <fieldset className="rounded-xl border border-slate-200 bg-slate-50/50 p-5">
        <legend className="px-3 text-base font-bold text-[#1A2B4C]">
          Datos de la actividad
        </legend>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {/* Fecha */}
          <div>
            <label
              htmlFor="fecha"
              className="mb-2 block text-sm font-semibold text-[#1F2937]"
            >
              Fecha de la actividad
              <span className="ml-1 text-red-500">*</span>
            </label>

            <input
              id="fecha"
              name="fecha"
              type="date"
              required
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-[#1F2937] outline-none transition focus:border-[#3B82F6] focus:ring-4 focus:ring-blue-100"
            />
          </div>

          {/* Horas */}
          <div>
            <label
              htmlFor="horas"
              className="mb-2 block text-sm font-semibold text-[#1F2937]"
            >
              Horas realizadas
              <span className="ml-1 text-red-500">*</span>
            </label>

            <input
              id="horas"
              name="horas"
              type="number"
              min="1"
              step="1"
              placeholder="Ejemplo: 5"
              required
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-[#1F2937] outline-none transition placeholder:text-slate-400 focus:border-[#3B82F6] focus:ring-4 focus:ring-blue-100"
            />
          </div>

          <CourseForm />

          <CategoryForm />

          {/* Descripción */}
          <div className="md:col-span-2">
            <label
              htmlFor="descripcion"
              className="mb-2 block text-sm font-semibold text-[#1F2937]"
            >
              Descripción de la actividad
              <span className="ml-1 text-red-500">*</span>
            </label>

            <textarea
              id="descripcion"
              name="descripcion"
              rows="4"
              placeholder="Describe brevemente qué actividad realizaste, dónde y con quién..."
              required
              className="w-full resize-none rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-[#1F2937] outline-none transition placeholder:text-slate-400 focus:border-[#3B82F6] focus:ring-4 focus:ring-blue-100"
            />
          </div>
        </div>
      </fieldset>

      {/* Componente de evidencia */}
      <PdfUploadField
        archivo={archivo}
        error={error}
        dragging={dragging}
        setDragging={setDragging}
        fileInputRef={fileInputRef}
        handleFileChange={handleFileChange}
        handleDrop={handleDrop}
        limpiarArchivo={limpiarArchivo}
      />

      {/* Botones */}
      <div className="mt-7 flex flex-col-reverse gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={handleCancel}
          disabled={loading}
          className="rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-[#1F2937] transition hover:bg-slate-100 disabled:opacity-50"
        >
          Cancelar
        </button>

        <button
          type="submit"
          disabled={loading}
          className="flex items-center justify-center gap-2 rounded-lg bg-[#1A2B4C] px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-[#3B82F6] disabled:opacity-50"
        >
          {loading && (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
          )}

          {loading ? "Registrando..." : "Registrar"}
        </button>
      </div>
    </form>
  );
}

export default HourForm;