import { useCallback, useEffect, useState } from "react";
import { getUsers, createUser, deleteUser } from "../../services/users.service";
import { usePagination } from "../../hooks/usePagination";
import { useToast } from "../../hooks/useToast";
import UsersTable from "../../components/tables/UsersTable";
import DeleteModal from "../../components/modals/DeleteModal";
import Pagination from "../../components/ui/Pagination";
import Button from "../../components/ui/Button";
import UserForm from "../../components/forms/UserForm";

const PAGE_SIZE = 10;


function Users() {
    const [users, setUsers] = useState([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [deleting, setDeleting] = useState(null);
    const { showToast } = useToast();
    const [showForm, setShowForm] = useState(false);

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

         const handleCreate = async (form) => {
        try {
            setSaving(true);
            await createUser(form);
            showToast("Usuario creado con éxito", "success");
            setShowForm(false);
            await loadUsers();
        } catch (error) {
            if (error.response?.status === 409) {
                showToast("El correo o documento ya existe", "error");
            } else if (error.response?.status === 422) {
                showToast("Datos inválidos: revisa los campos", "error");
            } else {
                showToast("Error al crear el usuario", "error");
            }
        } finally {
            setSaving(false);
        }
    };

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
                <Button className="w-auto!" onClick={() => setShowForm(true)}>
                    Nuevo usuario
                </Button>
            </div>

            {showForm && (
                <div className="mb-6 rounded-lg border border-gray-200 p-4">
                    <UserForm
                        loading={saving}
                        onSubmit={handleCreate}
                        onCancel={() => setShowForm(false)}
                    />
                </div>
            )}

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