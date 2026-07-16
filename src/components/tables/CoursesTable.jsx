function CoursesTable({ courses, onEdit, onDelete }) {
    if (courses.length === 0) {
        return <p className="text-sm text-gray-500">No hay cursos registrados.</p>;
    }

    return (
        <table className="w-full text-left text-sm">
            <thead>
                <tr className="border-b text-gray-500">
                    <th className="py-2 pr-4">Nombre</th>
                    <th className="py-2 pr-4">Duración</th>
                    <th className="py-2 pr-4">Horas requeridas</th>
                    <th className="py-2 pr-4">Precio</th>
                    <th className="py-2 pr-4">Estado</th>
                    <th className="py-2">Acciones</th>
                </tr>
            </thead>
            <tbody>
                {courses.map((course) => (
                    <tr key={course.id} className="border-b">
                        <td className="py-2 pr-4 font-medium text-gray-900">{course.name}</td>
                        <td className="py-2 pr-4 text-gray-600">{course.duration}</td>
                        <td className="py-2 pr-4 text-gray-600">{course.required_service_hours}</td>
                        <td className="py-2 pr-4 text-gray-600">{course.price}</td>
                        <td className="py-2 pr-4">
                            {course.is_active ? (
                                <span className="text-green-600">Activo</span>
                            ) : (
                                <span className="text-gray-400">Inactivo</span>
                            )}
                        </td>
                        <td className="py-2">
                            <button
                                onClick={() => onEdit(course)}
                                className="mr-3 text-blue-600 hover:underline"
                            >
                                Editar
                            </button>
                            <button
                                onClick={() => onDelete(course)}
                                className="text-red-600 hover:underline"
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