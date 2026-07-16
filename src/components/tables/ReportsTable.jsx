import Badge from "../ui/Badge";

function ReportsTable({ reports, onReview }) {
    if (reports.length === 0) {
        return (
            <p className="text-sm text-gray-500">
                No hay reportes que coincidan con los filtros.
            </p>
        );
    }

    return (
        <table className="w-full text-left text-sm">
            <thead>
                <tr className="border-b text-gray-500">
                    <th className="py-2 pr-4">Estudiante</th>
                    <th className="py-2 pr-4">Categoría</th>
                    <th className="py-2 pr-4">Horas reportadas</th>
                    <th className="py-2 pr-4">Horas aprobadas</th>
                    <th className="py-2 pr-4">Estado</th>
                    <th className="py-2 pr-4">Fecha</th>
                    <th className="py-2">Acciones</th>
                </tr>
            </thead>
            <tbody>
                {reports.map((report) => (
                    <tr key={report.id} className="border-b">
                        <td className="py-2 pr-4 font-medium text-gray-900">
                            {report.student?.full_name ?? "—"}
                        </td>
                        <td className="py-2 pr-4 text-gray-600">
                            {report.category?.name ?? "—"}
                        </td>
                        <td className="py-2 pr-4 text-gray-600">{report.hours_spent}</td>
                        <td className="py-2 pr-4 text-gray-600">
                            {report.approved_hours ?? "—"}
                        </td>
                        <td className="py-2 pr-4">
                            <Badge status={report.status} />
                        </td>
                        <td className="py-2 pr-4 text-gray-600">
                            {new Date(report.created_at).toLocaleDateString()}
                        </td>
                        <td className="py-2">
                            {report.status === "PENDING" && (
                                <button
                                    onClick={() => onReview(report)}
                                    className="text-blue-600 hover:underline"
                                >
                                    Revisar
                                </button>
                            )}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default ReportsTable;