import { useCallback, useEffect, useState } from "react";
import { getUsers, deleteUser } from "../../services/users.service";
import { usePagination } from "../../hooks/usePagination";
import { useToast } from "../../hooks/useToast";
import UsersTable from "../../components/tables/UsersTable";
import DeleteModal from "../../components/modals/DeleteModal";
import Pagination from "../../components/ui/Pagination";
import Button from "../../components/ui/Button";

const PAGE_SIZE = 10;

function Users() {
    const [users, setUsers] = useState([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [deleting, setDeleting] = useState(null);
    const { showToast } = useToast();

    const { currentPage, totalPages, goToPage } = usePagination({
        totalItems: total,
        pageSize: PAGE_SIZE,
    });

    const loadUsers = useCallback(async () => {
        try {
            const data = await getUsers({ page: currentPage, pageSize: PAGE_SIZE });
            setUsers(data.items);
            setTotal(data.total);
        } catch {
            showToast("Error al cargar los usuarios", "error");
        } finally {
            setLoading(false);
        }
    }, [currentPage, showToast]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        loadUsers();
    }, [loadUsers]);

    const handleConfirmDelete = async () => {
        try {
            setSaving(true);
            await deleteUser(deleting.id);
            showToast("Usuario eliminado con éxito", "success");
            setDeleting(null);
            await loadUsers();
        } catch (error) {
            if (error.response?.status === 409) {
                showToast("No se puede eliminar: el usuario está en uso", "error");
            } else {
                showToast("Error al eliminar el usuario", "error");
            }
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="mx-auto max-w-5xl p-6">
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-semibold text-gray-900">
                    Listado de Usuarios
                </h1>
                <Button className="w-auto!" onClick={() => showToast("Próximamente", "info")}>
                    Nuevo usuario
                </Button>
            </div>

            {loading ? (
                <p className="text-sm text-gray-500">Cargando...</p>
            ) : (
                <>
                    <UsersTable users={users} onDelete={(user) => setDeleting(user)} />
                    <div className="mt-6">
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={goToPage}
                        />
                    </div>
                </>
            )}

            {deleting && (
                <DeleteModal
                    title="Eliminar usuario"
                    message={`¿Seguro que deseas eliminar a "${deleting.full_name ?? deleting.email}"?`}
                    loading={saving}
                    onConfirm={handleConfirmDelete}
                    onCancel={() => setDeleting(null)}
                />
            )}
        </div>
    );
}

export default Users;