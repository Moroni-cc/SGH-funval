import Badge from "../ui/Badge";

function MyReportsTable({ reports, onEdit }) {
    if (reports.length === 0) {
        return (
            <p className="p-6 text-sm text-slate-500">
                Aún no has registrado ningún reporte.
            </p>
        );
    }

    return (
        <table className="w-full text-left text-sm">
            <thead>
                <tr className="border-b border-slate-100">
                    <th className="py-3 pr-4 text-xs font-bold uppercase tracking-wider text-slate-400">Categoría</th>
                    <th className="py-3 pr-4 text-xs font-bold uppercase tracking-wider text-slate-400">Horas reportadas</th>
                    <th className="py-3 pr-4 text-xs font-bold uppercase tracking-wider text-slate-400">Horas aprobadas</th>
                    <th className="py-3 pr-4 text-xs font-bold uppercase tracking-wider text-slate-400">Estado</th>
                    <th className="py-3 pr-4 text-xs font-bold uppercase tracking-wider text-slate-400">Fecha</th>
                    <th className="py-3 text-xs font-bold uppercase tracking-wider text-slate-400">Acciones</th>
                </tr>
            </thead>
            <tbody>
                {reports.map((report) => (
                    <tr
                        key={report.id}
                        className="border-b border-slate-100 transition-colors hover:bg-slate-50"
                    >
                        <td className="py-3 pr-4 font-semibold text-slate-800">
                            {report.category?.name ?? "—"}
                        </td>
                        <td className="py-3 pr-4 text-slate-600">{report.hours_spent} h</td>
                        <td className="py-3 pr-4 text-slate-600">
                            {report.approved_hours != null ? `${report.approved_hours} h` : "—"}
                        </td>
                        <td className="py-3 pr-4">
                            <Badge status={report.status} />
                        </td>
                        <td className="py-3 pr-4 text-slate-600">
                            {new Date(report.created_at).toLocaleDateString()}
                        </td>
                        <td className="py-3">
                            {report.status === "PENDING" && (
                                <button
                                    onClick={() => onEdit(report)}
                                    className="font-semibold text-blue-600 hover:underline"
                                >
                                    Editar
                                </button>
                            )}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default MyReportsTable;