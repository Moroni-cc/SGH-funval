import { useCallback, useEffect, useState } from "react";
import {
    getCountries,
    createCountry,
    updateCountry,
    deleteCountry,
} from "../../services/countries.service";
import { useToast } from "../../hooks/useToast";
import CountriesTable from "../../components/tables/CountriesTable";
import CountryForm from "../../components/forms/CountryForm";
import DeleteModal from "../../components/modals/DeleteModal";
import Button from "../../components/ui/Button";

function Countries() {
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [editing, setEditing] = useState(null);
    const [deleting, setDeleting] = useState(null);
    const { showToast } = useToast();

    const loadCountries = useCallback(async () => {
        try {
            const data = await getCountries();
            setCountries(data);
        } catch {
            showToast("Error al cargar los países", "error");
        } finally {
            setLoading(false);
        }
    }, [showToast]);

    useEffect(() => {
        // Carga inicial de datos (fetch-on-mount); falso positivo de la regla.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        loadCountries();
    }, [loadCountries]);

    const handleSubmit = async (form) => {
        try {
            setSaving(true);
            if (editing) {
                await updateCountry(editing.id, form);
                showToast("País actualizado con éxito", "success");
            } else {
                await createCountry(form);
                showToast("País creado con éxito", "success");
            }
            setShowForm(false);
            setEditing(null);
            await loadCountries();
        } catch (error) {
            if (error.response?.status === 400 || error.response?.status === 409) {
                showToast("El código ISO ya existe o es inválido", "error");
            } else {
                showToast("Error al guardar el país", "error");
            }
        } finally {
            setSaving(false);
        }
    };

    const handleConfirmDelete = async () => {
        try {
            setSaving(true);
            await deleteCountry(deleting.id);
            showToast("País eliminado con éxito", "success");
            setDeleting(null);
            await loadCountries();
                } catch (error) {
            if (error.response?.status === 409) {
                showToast("No se puede eliminar: el país está en uso", "error");
            } else {
                showToast("Error al eliminar el país", "error");
            }
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="mx-auto max-w-3xl p-6">
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-[26px] font-extrabold text-[#16213E]">
                    Gestión de Países
                </h1>
                <Button
                    className="w-auto!"
                    onClick={() => {
                        setEditing(null);
                        setShowForm(true);
                    }}
                >
                    Nuevo país
                </Button>
            </div>

            {showForm && (
                <div className="mb-6 rounded-[14px] border border-[#E7ECF3] bg-white p-6 shadow-[0_1px_2px_rgba(15,29,69,0.04)]">
                    <CountryForm
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
                <p className="text-sm text-[#64748B]">Cargando...</p>
            ) : (
                <CountriesTable
                    countries={countries}
                    onEdit={(country) => {
                        setEditing(country);
                        setShowForm(true);
                    }}
                    onDelete={(country) => setDeleting(country)}
                />
            )}

            {deleting && (
                <DeleteModal
                    title="Eliminar país"
                    message={`¿Seguro que deseas eliminar "${deleting.name}"? Esta acción es permanente y no se puede deshacer.`}
                    loading={saving}
                    onConfirm={handleConfirmDelete}
                    onCancel={() => setDeleting(null)}
                />
            )}
        </div>
    );
}

export default Countries;