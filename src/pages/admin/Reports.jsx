import { useCallback, useEffect, useState } from "react";
import { getReports, getReportStatuses, reviewReport } from "../../services/reports.service";
import { usePagination } from "../../hooks/usePagination";
import { useToast } from "../../hooks/useToast";
import ReportsTable from "../../components/tables/ReportsTable";
import Pagination from "../../components/ui/Pagination";

const PAGE_SIZE = 10;
const STATUS_LABELS = {
    PENDING: "Pendiente",
    APPROVED_FULL: "Aprobado total",
    APPROVED_PARTIAL: "Aprobado parcial",
    REJECTED: "Rechazado",
};

function Reports() {
    const [reports, setReports] = useState([]);
    const [total, setTotal] = useState(0);
    const [statuses, setStatuses] = useState([]);
    const [students, setStudents] = useState([]);
    const [status, setStatus] = useState("");
    const [studentId, setStudentId] = useState("");
    const [loading, setLoading] = useState(true);
    const { showToast } = useToast();

    const { currentPage, totalPages, goToPage } = usePagination({
        totalItems: total,
        pageSize: PAGE_SIZE,
    });

    const loadFilters = useCallback(async () => {
        try {
            const [statusList, all] = await Promise.all([
                getReportStatuses(),
                getReports({ pageSize: 100 }),
            ]);
            setStatuses(statusList);

            const unique = [];
            const seen = new Set();
            for (const report of all.items) {
                if (report.student && !seen.has(report.student.id)) {
                    seen.add(report.student.id);
                    unique.push(report.student);
                }
            }
            setStudents(unique);
        } catch {
            showToast("Error al cargar los filtros", "error");
        }
    }, [showToast]);

    const loadReports = useCallback(async () => {
        try {
            const data = await getReports({
                status,
                studentId,
                page: currentPage,
                pageSize: PAGE_SIZE,
            });
            setReports(data.items);
            setTotal(data.total);
        } catch {
            showToast("Error al cargar los reportes", "error");
        } finally {
            setLoading(false);
        }
    }, [status, studentId, currentPage, showToast]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        loadFilters();
    }, [loadFilters]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        loadReports();
    }, [loadReports]);

    const handleStatusChange = (e) => {
        setStatus(e.target.value);
        goToPage(1);
    };

    const handleStudentChange = (e) => {
        setStudentId(e.target.value);
        goToPage(1);
    };

    const handleReview = async (report, action, comment) => {
        let approved_hours;
        if (action === "APPROVED") {
            approved_hours = report.hours_spent;
        } else if (action === "REJECTED") {
            approved_hours = 0;
        } else {
            const value = window.prompt(
                `Horas a aprobar (entre 1 y ${report.hours_spent - 1}):`
            );
            approved_hours = Number(value);
            if (
                !value ||
                Number.isNaN(approved_hours) ||
                approved_hours <= 0 ||
                approved_hours >= report.hours_spent
            ) {
                showToast("Cantidad de horas inválida", "error");
                return;
            }
        }

        try {
            await reviewReport(report.id, {
                approved_hours,
                reviewer_notes: comment,
            });
            showToast("Reporte revisado con éxito", "success");
            loadReports();
        } catch (error) {
            if (error.response?.status === 422) {
                showToast("Datos inválidos en la revisión", "error");
            } else {
                showToast("Error al revisar el reporte", "error");
            }
        }
    };

    return (
        <div className="mx-auto w-full max-w-5xl">
            <div className="flex justify-between items-center">
            <div className="text-left">
            <h1 className="text-2xl font-bold text-gray-900">
              Revision de solicitudes
            </h1>
            <p className="text-sm text-slate-400 flex justify-start mb-6">{reports.length} solicitudes esperando tu revision</p>
            </div>

            <div className=" mb-6 flex flex-wrap justify-end gap-4">
                <div className="flex flex-col gap-1">
                    <label htmlFor="status" className="text-sm font-bold text-gray-600">
                        Estado
                    </label>
                    <select
                        id="status"
                        value={status}
                        onChange={handleStatusChange}
                        className="rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900"
                    >
                        <option value="">Todos</option>
                        {statuses.map((s) => (
                            <option key={s} value={s}>
                                {STATUS_LABELS[s] ?? s}
                            </option>
                        ))}
                    </select>
                </div>


            </div>

                <div className="hidden  flex-col gap-1">
                    <label htmlFor="student" className="text-sm font-medium text-gray-700">
                        Estudiante
                    </label>
                    <select
                        id="student"
                        value={studentId}
                        onChange={handleStudentChange}
                        className="rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900"
                    >
                        <option value="">Todos</option>
                        {students.map((s) => (
                            <option key={s.id} value={s.id}>
                                {s.full_name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {loading ? (
                <p className="text-sm text-gray-500">Cargando...</p>
            ) : (
                <>
                    <ReportsTable reports={reports} onReview={handleReview} />
                    <div className="mt-6">
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={goToPage}
                        />
                    </div>
                </>
            )}
        </div>
    );
}

export default Reports;