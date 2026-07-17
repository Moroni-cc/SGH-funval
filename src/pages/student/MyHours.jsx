import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getReports } from "../../services/reports.service";
import { usePagination } from "../../hooks/usePagination";
import { useToast } from "../../hooks/useToast";
import MyReportsTable from "../../components/tables/MyReportsTable";
import Pagination from "../../components/ui/Pagination";

const PAGE_SIZE = 10;

function MyHours() {
    const [reports, setReports] = useState([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const { showToast } = useToast();
    const navigate = useNavigate();

    const { currentPage, totalPages, goToPage } = usePagination({
        totalItems: total,
        pageSize: PAGE_SIZE,
    });

    const loadReports = useCallback(async () => {
        try {
            const data = await getReports({ page: currentPage, pageSize: PAGE_SIZE });
            setReports(data.items);
            setTotal(data.total);
        } catch {
            showToast("Error al cargar tus reportes", "error");
        } finally {
            setLoading(false);
        }
    }, [currentPage, showToast]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        loadReports();
    }, [loadReports]);

    if (loading) {
        return (
            <div className="flex h-full min-h-[50vh] items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
            </div>
        );
    }

    return (
        <div className="mx-auto w-full max-w-7xl space-y-6 bg-slate-50 p-6 min-h-screen">
            <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-800">
                        Mis reportes
                    </h1>
                    <p className="mt-1 text-sm font-medium text-slate-500">
                        Historial de tus horas de servicio registradas
                    </p>
                </div>

                <Link
                    to="/student/new-report"
                    className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
                >
                    + Nuevo reporte
                </Link>
            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white px-6 py-2 shadow-sm">
                <MyReportsTable
                    reports={reports}
                    onEdit={(report) => navigate(`/student/reports/${report.id}/edit`)}
                />
            </div>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={goToPage}
            />
        </div>
    );
}

export default MyHours;