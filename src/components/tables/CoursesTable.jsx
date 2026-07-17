function CoursesTable({ courses, onEdit, onDelete }) {
    if (courses.length === 0) {
        return <p className="p-6 text-sm text-slate-500">No hay cursos registrados.</p>;
    }

    return (
        <table className="w-full text-left text-sm">
            <thead>
                <tr className="border-b border-slate-100">
                    <th className="py-3 pr-4 text-xs font-bold uppercase tracking-wider text-slate-400">Nombre</th>
                    <th className="py-3 pr-4 text-xs font-bold uppercase tracking-wider text-slate-400">Duración</th>
                    <th className="py-3 pr-4 text-xs font-bold uppercase tracking-wider text-slate-400">Horas requeridas</th>
                    <th className="py-3 pr-4 text-xs font-bold uppercase tracking-wider text-slate-400">Precio</th>
                    <th className="py-3 pr-4 text-xs font-bold uppercase tracking-wider text-slate-400">Estado</th>
                    <th className="py-3 text-xs font-bold uppercase tracking-wider text-slate-400">Acciones</th>
                </tr>
            </thead>
            <tbody>
                {courses.map((course) => (
                    <tr
                        key={course.id}
                        className="border-b border-slate-100 transition-colors hover:bg-slate-50"
                    >
                        <td className="py-3 pr-4 font-semibold text-slate-800">{course.name}</td>
                        <td className="py-3 pr-4 text-slate-600">{course.duration}</td>
                        <td className="py-3 pr-4 text-slate-600">{course.required_service_hours}</td>
                        <td className="py-3 pr-4 text-slate-600">{course.price}</td>
                        <td className="py-3 pr-4">
                            {course.is_active ? (
                                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                                    Activo
                                </span>
                            ) : (
                                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-500">
                                    Inactivo
                                </span>
                            )}
                        </td>
                        <td className="py-3">
                            <button
                                onClick={() => onEdit(course)}
                                className="mr-4 font-semibold text-blue-600 hover:underline"
                            >
                                Editar
                            </button>
                            <button
                                onClick={() => onDelete(course)}
                                className="font-semibold text-rose-600 hover:underline"
                            >
                                Eliminar
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default CoursesTable;