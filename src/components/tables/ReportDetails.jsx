//contiene el panel de detalles sobre los reportess.

import { useState } from "react";
import Badge from "../ui/Badge";

function getInitials(name = "") {
  return name
    .trim()
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word.charAt(0).toUpperCase())
    .join("");
}

function formatDate(date) {
  if (!date) return "Sin fecha";

  const formattedDate = new Date(date);

  if (Number.isNaN(formattedDate.getTime())) {
    return "Fecha inválida";
  }

  return formattedDate.toLocaleDateString("es-MX", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function ReportDetails({ report, onReview }) {
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");


  if (!report) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm">
        <p className="text-sm text-gray-500">
          Selecciona un reporte para ver sus detalles.
        </p>
      </div>
    );
  }

  
  const studentName =
    report.student?.full_name ??
    "Estudiante sin nombre";

  const categoryName =
    report.category?.name ??
    "Sin categoría";

  /*
    Busca la URL del PDF usando diferentes
    nombres posibles.
  */
  const evidenceUrl = report.web_view_link
    ? `/api/v1/reports/${report.id}/evidence/stream`
    : null;

  const evidenceName =
    report.evidence_name ??
    report.file_name ??
    report.document_name ??
    "evidencia_servicio.pdf";

  const handleAction = (action) => {
    const commentRequired =
      action === "OBSERVED" ||
      action === "REJECTED";

    if (commentRequired && !comment.trim()) {
      setError(
        "Debes escribir un comentario para observar o rechazar.",
      );

      return;
    }

    setError("");

    onReview?.(
      report,
      action,
      comment.trim(),
    );
  };

  return (
    <div className="min-w-0 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      {/* Encabezado */}
      <div className="mb-3 flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-950 text-xs font-bold text-white">
            {getInitials(studentName) || "NA"}
          </div>

          <div className="min-w-0">
            <h2 className="truncate text-lg font-bold text-slate-900">
              {studentName}
            </h2>

            <p className="truncate text-sm text-gray-500">
              {report.student?.career ??
                report.student?.program ??
                "Estudiante"}
            </p>
          </div>
        </div>

        <div className="shrink-0">
          <Badge status={report.status} />
        </div>
      </div>

      {/* Información general */}
      <div className="mb-3 grid grid-cols-1 gap-4 rounded-xl bg-slate-50 p-4 sm:grid-cols-3">
        <InfoItem
          label="Fecha"
          value={formatDate(report.created_at)}
        />

        <InfoItem
          label="Horas"
          value={`${report.hours_spent ?? 0} h`}
        />

        <InfoItem
          label="Categoría"
          value={categoryName}
        />
      </div>

      {/* Descripción */}
      <section className="mb-5">
        <SectionTitle>
          Descripción
        </SectionTitle>

        <p className="text-sm leading-6 text-gray-600">
          {report.description ??
            report.activity_description ??
            "El estudiante no agregó una descripción."}
        </p>
      </section>

      {/* Evidencia PDF */}
      <section className="mb-5">
        <SectionTitle>
          Evidencia
        </SectionTitle>

        {evidenceUrl ? (
          <div className="overflow-hidden rounded-xl border border-gray-200">
            <iframe
              src={evidenceUrl}
              title={`Evidencia de ${studentName}`}
              className="h-80 w-full bg-gray-100"
            />

            <div className="flex flex-col gap-2 border-t border-gray-200 bg-gray-50 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="truncate text-xs text-gray-500">
                {evidenceName}
              </p>

              <a
                href={evidenceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 text-sm font-semibold text-blue-600 hover:underline"
              >
                Abrir PDF
              </a>
            </div>
          </div>
        ) : (
          <div className="flex h-32 flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-gray-50 px-4 text-center">
            <p className="text-sm font-medium text-gray-600">
              No hay evidencia PDF
            </p>

            <p className="mt-1 text-xs text-gray-400">
              Este reporte no tiene un archivo adjunto.
            </p>
          </div>
        )}
      </section>

      {/* Comentario */}
      <div className="mb-4">
        <label
          htmlFor="review-comment"
          className="mb-2 block text-sm font-semibold text-slate-700"
        >
          Comentario para el estudiante
        </label>

        <textarea
          id="review-comment"
          value={comment}
          onChange={(event) => {
            setComment(event.target.value);
            setError("");
          }}
          rows={3}
          placeholder="Opcional para aprobar; obligatorio para observar o rechazar..."
          className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />

        {error && (
          <p className="mt-2 text-sm text-red-600">
            {error}
          </p>
        )}
      </div>

      {/* Botones */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <button
          type="button"
          onClick={() =>
            handleAction("APPROVED")
          }
          className="rounded-lg bg-green-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-green-700"
        >
          Aprobar
        </button>

        <button
          type="button"
          onClick={() =>
            handleAction("OBSERVED")
          }
          className="rounded-lg border border-blue-500 bg-white px-4 py-3 text-sm font-semibold text-blue-600 transition-colors hover:bg-blue-50"
        >
          Observar
        </button>

        <button
          type="button"
          onClick={() =>
            handleAction("REJECTED")
          }
          className="rounded-lg border border-red-300 bg-white px-4 py-3 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50"
        >
          Rechazar
        </button>
      </div>
    </div>
  );
}

/*
  Componente pequeño para mostrar
  fecha, horas y categoría.
*/
function InfoItem({ label, value }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
        {label}
      </p>

      <p className="mt-1 text-sm font-bold text-slate-900">
        {value}
      </p>
    </div>
  );
}

/*
  Título reutilizable para las secciones.
*/
function SectionTitle({ children }) {
  return (
    <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">
      {children}
    </h3>
  );
}

export default ReportDetails;