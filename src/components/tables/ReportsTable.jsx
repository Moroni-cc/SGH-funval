import { useState } from "react";
import ReportsList from "./ReportsList";
import ReportDetails from "./ReportDetails";

function ReportsTable({ reports = [], onReview }) {
  const [selectedId, setSelectedId] = useState(null);

  const selectedReport =
    reports.find((report) => report.id === selectedId) ??
    reports[0] ??
    null;

  const activeId = selectedReport?.id ?? null;

  if (reports.length === 0) {
    return (
      <div className="rounded-xl border bg-white p-8 text-center">
        <p className="text-sm text-gray-500">
          No hay reportes disponibles.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-2">
      <ReportsList
        reports={reports}
        selectedId={activeId}
        onSelect={setSelectedId}
      />

      <ReportDetails
        key={activeId}
        report={selectedReport}
        onReview={onReview}
      />
    </div>
  );
}

export default ReportsTable;