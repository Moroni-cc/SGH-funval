//muestra la lista izquierda de los reportes.

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

function ReportsList({
  reports = [], //contiene los datos.
  selectedId, //indica cuál reporte está activo.
  onSelect, //cambia el reporte cuando haces clic:
}) {
  return (
    <div className="min-w-0 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      {reports.map((report) => {
        const studentName =
          report.student?.full_name ??
          "Estudiante sin nombre";

        const categoryName =
          report.category?.name ??
          "Sin categoría";

        const isSelected =
          report.id === selectedId;

        return (
          <button
            key={report.id}
            type="button"
            onClick={() => onSelect(report.id)}
            className={`
              relative
              grid
              w-full
              grid-cols-[auto_minmax(0,1fr)_auto]
              items-center
              gap-3
              border-b
              border-gray-100
              px-4
              py-3
              text-left
              transition-colors
              last:border-b-0
              hover:bg-blue-50
              ${
                isSelected
                  ? "bg-blue-50"
                  : "bg-white"
              }
            `}
          >
            {/* Línea azul del reporte seleccionado */}
            {isSelected && (
              <span className="absolute inset-y-0 left-0 w-1 bg-blue-500" />
            )}

            {/* Iniciales del estudiante */}
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-blue-950">
              {getInitials(studentName) || "NA"}
            </div>

            {/* Nombre, fecha y categoría */}
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-slate-900">
                {studentName}
              </p>

              <p className="mt-0.5 truncate text-xs text-slate-400">
                {formatDate(report.created_at)}

                <span className="mx-1">•</span>

                {categoryName}
              </p>
            </div>

            {/* Horas y estado */}
            <div className="flex shrink-0 flex-col items-end gap-1">
              <span className="text-sm font-bold text-slate-900">
                {report.hours_spent ?? 0} h
              </span>

              <Badge status={report.status} />
            </div>
          </button>
        );
      })}
    </div>
  );
}

export default ReportsList;