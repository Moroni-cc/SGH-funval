function CategoriesTable({ categories, onEdit, onDelete }) {
    if (categories.length === 0) {
        return <p className="text-sm text-gray-500">No hay categorías registradas.</p>;
    }

    return (
        <table className="w-full text-left text-sm">
            <thead>
                <tr className="border-b text-gray-500">
                    <th className="py-2 pr-4">Nombre</th>
                    <th className="py-2 pr-4">Descripción</th>
                    <th className="py-2 pr-4">Estado</th>
                    <th className="py-2">Acciones</th>
                </tr>
            </thead>
            <tbody>
                {categories.map((cat) => (
                    <tr key={cat.id} className="border-b">
                        <td className="py-2 pr-4 font-medium text-gray-900">{cat.name}</td>
                        <td className="py-2 pr-4 text-gray-600">{cat.description}</td>
                        <td className="py-2 pr-4">
                            {cat.is_active ? (
                                <span className="text-green-600">Activa</span>
                            ) : (
                                <span className="text-gray-400">Inactiva</span>
                            )}
                        </td>
                        <td className="py-2">
                            <button
                                onClick={() => onEdit(cat)}
                                className="mr-3 text-blue-600 hover:underline"
                            >
                                Editar
                            </button>
                            <button
                                onClick={() => onDelete(cat)}
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

export default CategoriesTable;