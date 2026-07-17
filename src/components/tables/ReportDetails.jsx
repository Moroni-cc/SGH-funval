import { useState } from "react";
import Badge from "../ui/Badge";

function ReportDetails({ report, onReview }) {
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const [loadingAction, setLoadingAction] = useState("");

  if (!report) {
    return (
      <div className="rounded-xl border bg-white p-8 text-center">
        <p className="text-sm text-gray-500">
          Selecciona un reporte.
        </p>
      </div>
    );
  }

  const handleAction = async (newStatus) => {
    /*
      Para observar o rechazar,
      el comentario será obligatorio.
    */
    const commentRequired =
      newStatus === "OBSERVED" ||
      newStatus === "REJECTED";

    if (commentRequired && !comment.trim()) {
      setError(
        "Debes escribir un comentario para observar o rechazar."
      );

      return;
    }

    try {
      setError("");
      setLoadingAction(newStatus);

      /*
        Ejecutamos la función que viene desde Reports.jsx.
      */
      await onReview(
        report,
        newStatus,
        comment.trim()
      );

      /*
        Limpia el comentario cuando la operación termina.
      */
      setComment("");
    } catch (actionError) {
      console.error(actionError);

      setError(
        "No se pudo actualizar el reporte. Inténtalo nuevamente."
      );
    } finally {
      setLoadingAction("");
    }
  };

  return (
    <div className="min-w-0 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      {/* Datos que ya tienes del reporte */}

      <div className="mb-5">
        <h2 className="text-lg font-bold text-slate-900">
          {report.student?.full_name ?? "Estudiante"}
        </h2>

        <Badge status={report.status} />
      </div>

      <div className="mb-5 grid grid-cols-3 gap-4 rounded-xl bg-slate-50 p-4">
        <div>
          <p className="text-xs uppercase text-gray-400">
            Fecha
          </p>

          <p className="font-semibold">
            {new Date(
              report.created_at
            ).toLocaleDateString("es-MX")}
          </p>
        </div>

        <div>
          <p className="text-xs uppercase text-gray-400">
            Horas
          </p>

          <p className="font-semibold">
            {report.hours_spent ?? 0} h
          </p>
        </div>

        <div>
          <p className="text-xs uppercase text-gray-400">
            Categoría
          </p>

          <p className="font-semibold">
            {report.category?.name ?? "Sin categoría"}
          </p>
        </div>
      </div>

      <div className="mb-5">
        <p className="mb-2 text-xs font-semibold uppercase text-gray-400">
          Descripción
        </p>

        <p className="text-sm text-gray-600">
          {report.description ??
            "No se agregó una descripción."}
        </p>
      </div>

      {/* Comentario */}

      <div className="mb-5">
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
          placeholder="Validada tus horas de servicio por la visita al templo. ¡Gracias por tu esfuerzo y dedicación!..."
          rows={3}
          disabled={Boolean(loadingAction)}
          className="
            w-full
            resize-none
            rounded-xl
            border
            border-gray-300
            px-4
            py-3
            text-[13px]
            outline-none
            focus:border-blue-500
            disabled:cursor-not-allowed
            disabled:bg-gray-100
          "
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
          disabled={Boolean(loadingAction)}
          onClick={() => handleAction("APPROVED")}
          className="
            rounded-lg
            bg-green-600
            px-4
            py-3
            text-sm
            font-semibold
            text-white
            hover:bg-green-700
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          {loadingAction === "APPROVED"
            ? "Aprobando..."
            : "Aprobar"}
        </button>

        <button
          type="button"
          disabled={Boolean(loadingAction)}
          onClick={() => handleAction("OBSERVED")}
          className="
            rounded-lg
            border
            border-blue-500
            px-4
            py-3
            text-sm
            font-semibold
            text-blue-600
            hover:bg-blue-50
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          {loadingAction === "OBSERVED"
            ? "Observando..."
            : "Observar"}
        </button>

        <button
          type="button"
          disabled={Boolean(loadingAction)}
          onClick={() => handleAction("REJECTED")}
          className="
            rounded-lg
            border
            border-red-300
            px-4
            py-3
            text-sm
            font-semibold
            text-red-600
            hover:bg-red-50
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          {loadingAction === "REJECTED"
            ? "Rechazando..."
            : "Rechazar"}
        </button>
      </div>
    </div>
  );
}

export default ReportDetails;