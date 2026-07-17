function CoursesTable({ courses, onEdit, onDelete }) {
    if (courses.length === 0) {
        return <p className="text-sm text-[#64748B]">No hay cursos registrados.</p>;
    }

    return (
        <table className="w-full text-left text-sm">
            <thead>
                <tr className="border-b border-[#F1F5F9]">
                    <th className="py-3 pr-4 text-[11.5px] font-bold uppercase tracking-[0.6px] text-[#94A3B8]">
                        Nombre
                    </th>
                    <th className="py-3 pr-4 text-[11.5px] font-bold uppercase tracking-[0.6px] text-[#94A3B8]">
                        Duración
                    </th>
                    <th className="py-3 pr-4 text-[11.5px] font-bold uppercase tracking-[0.6px] text-[#94A3B8]">
                        Horas requeridas
                    </th>
                    <th className="py-3 pr-4 text-[11.5px] font-bold uppercase tracking-[0.6px] text-[#94A3B8]">
                        Precio
                    </th>
                    <th className="py-3 pr-4 text-[11.5px] font-bold uppercase tracking-[0.6px] text-[#94A3B8]">
                        Estado
                    </th>
                    <th className="py-3 text-[11.5px] font-bold uppercase tracking-[0.6px] text-[#94A3B8]">
                        Acciones
                    </th>
                </tr>
            </thead>
            <tbody>
                {courses.map((course) => (
                    <tr key={course.id} className="border-b border-[#F1F5F9]">
                        <td className="py-3 pr-4 font-semibold text-[#16213E]">{course.name}</td>
                        <td className="py-3 pr-4 text-[#334155]">{course.duration}</td>
                        <td className="py-3 pr-4 text-[#334155]">
                            {course.required_service_hours}
                        </td>
                        <td className="py-3 pr-4 text-[#334155]">{course.price}</td>
                        <td className="py-3 pr-4">
                            {course.is_active ? (
                                <span className="font-semibold text-[#22A366]">Activo</span>
                            ) : (
                                <span className="text-[#94A3B8]">Inactivo</span>
                            )}
                        </td>
                        <td className="py-3">
                            <button
                                onClick={() => onEdit(course)}
                                className="mr-4 font-semibold text-[#2E7CF6] hover:underline"
                            >
                                Editar
                            </button>
                            <button
                                onClick={() => onDelete(course)}
                                className="font-semibold text-[#C43D3D] hover:underline"
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
