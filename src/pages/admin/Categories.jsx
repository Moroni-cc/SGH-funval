import { useEffect, useState } from "react";
import {
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory,
} from "../../services/categories.service";
import { useToast } from "../../hooks/useToast";
import CategoriesTable from "../../components/tables/CategoriesTable";
import CategoryForm from "../../components/forms/CategoryForm";
import DeleteModal from "../../components/modals/DeleteModal";
import Button from "../../components/ui/Button";

function Categories() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [editing, setEditing] = useState(null);   // categoría en edición
    const [deleting, setDeleting] = useState(null); // categoría por eliminar
    const { showToast } = useToast();

    const loadCategories = async () => {
        try {
            setLoading(true);
            const data = await getCategories();
            setCategories(data);
        } catch {
            showToast("Error al cargar las categorías", "error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadCategories();
    }, []);

    const handleSubmit = async (form) => {
        try {
            setSaving(true);
            if (editing) {
                await updateCategory(editing.id, form);
                showToast("Categoría actualizada con éxito", "success");
            } else {
                await createCategory(form);
                showToast("Categoría creada con éxito", "success");
            }
            setShowForm(false);
            setEditing(null);
            await loadCategories();
        } catch {
            showToast("Error al guardar la categoría", "error");
        } finally {
            setSaving(false);
        }
    };

    const handleConfirmDelete = async () => {
        try {
            setSaving(true);
            await deleteCategory(deleting.id);
            showToast("Categoría eliminada con éxito", "success");
            setDeleting(null);
            await loadCategories();
        } catch {
            showToast("Error al eliminar la categoría", "error");
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="mx-auto max-w-3xl p-6">
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-semibold text-gray-900">
                    Gestión de Categorías
                </h1>
                <Button
                    className="!w-auto"
                    onClick={() => {
                        setEditing(null);
                        setShowForm(true);
                    }}
                >
                    Nueva categoría
                </Button>
            </div>

            {showForm && (
                <div className="mb-6 rounded-lg border border-gray-200 p-4">
                    <CategoryForm
                        key={editing?.id ?? "new"}
                        initialData={editing}
                        loading={saving}
                        onSubmit={handleSubmit}
                        onCancel={() => {
                            setShowForm(false);
                            setEditing(null);
                        }}
                    />
                </div>
            )}

            {loading ? (
                <p className="text-sm text-gray-500">Cargando...</p>
            ) : (
                <CategoriesTable
                    categories={categories}
                    onEdit={(cat) => {
                        setEditing(cat);
                        setShowForm(true);
                    }}
                    onDelete={(cat) => setDeleting(cat)}
                />
            )}

            {deleting && (
                <DeleteModal
                    title="Eliminar categoría"
                    message={`¿Seguro que deseas eliminar "${deleting.name}"? Quedará inactiva.`}
                    loading={saving}
                    onConfirm={handleConfirmDelete}
                    onCancel={() => setDeleting(null)}
                />
            )}
        </div>
    );
}

export default Categories;