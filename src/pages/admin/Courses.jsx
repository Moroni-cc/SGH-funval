import { useCallback, useEffect, useState } from "react";
import {
    getCourses,
    createCourse,
    updateCourse,
    deleteCourse,
} from "../../services/courses.service";
import { useToast } from "../../hooks/useToast";
import CoursesTable from "../../components/tables/CoursesTable";
import CourseForm from "../../components/forms/CourseForm";
import DeleteModal from "../../components/modals/DeleteModal";
import Button from "../../components/ui/Button";

function Courses() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [editing, setEditing] = useState(null);
    const [deleting, setDeleting] = useState(null);
    const { showToast } = useToast();

    const loadCourses = useCallback(async () => {
        try {
            const data = await getCourses();
            setCourses(data);
        } catch {
            showToast("Error al cargar los cursos", "error");
        } finally {
            setLoading(false);
        }
    }, [showToast]);

    useEffect(() => {
        // Carga inicial de datos (fetch-on-mount); falso positivo de la regla.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        loadCourses();
    }, [loadCourses]);

    const handleSubmit = async (form) => {
        try {
            setSaving(true);
            if (editing) {
                await updateCourse(editing.id, form);
                showToast("Curso actualizado con éxito", "success");
            } else {
                await createCourse(form);
                showToast("Curso creado con éxito", "success");
            }
            setShowForm(false);
            setEditing(null);
            await loadCourses();
        } catch {
            showToast("Error al guardar el curso", "error");
        } finally {
            setSaving(false);
        }
    };

    const handleConfirmDelete = async () => {
        try {
            setSaving(true);
            await deleteCourse(deleting.id);
            showToast("Curso eliminado con éxito", "success");
            setDeleting(null);
            await loadCourses();
        } catch {
            showToast("Error al eliminar el curso", "error");
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="mx-auto max-w-4xl p-6">
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight text-slate-800">
                    Gestión de Cursos
                </h1>
                <Button
                    className="w-auto!"
                    onClick={() => {
                        setEditing(null);
                        setShowForm(true);
                    }}
                >
                    Nuevo curso
                </Button>
            </div>

            {showForm && (
                <div className="mb-6 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
                    <CourseForm
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
                                <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white px-6 py-2 shadow-sm">
                    <CoursesTable
                        courses={courses}
                        onEdit={(course) => {
                            setEditing(course);
                            setShowForm(true);
                        }}
                        onDelete={(course) => setDeleting(course)}
                    />
                </div>
            )}

            {deleting && (
                <DeleteModal
                    title="Eliminar curso"
                    message={`¿Seguro que deseas eliminar "${deleting.name}"? Quedará inactivo.`}
                    loading={saving}
                    onConfirm={handleConfirmDelete}
                    onCancel={() => setDeleting(null)}
                />
            )}
        </div>
    );
}

export default Courses;