function CategoriesTable({ categories, onEdit, onDelete }) {
    if (categories.length === 0) {
        return <p className="p-6 text-sm text-slate-500">No hay categorías registradas.</p>;
    }

    return (
        <table className="w-full text-left text-sm">
            <thead>
                <tr className="border-b border-slate-100">
                    <th className="py-3 pr-4 text-xs font-bold uppercase tracking-wider text-slate-400">Nombre</th>
                    <th className="py-3 pr-4 text-xs font-bold uppercase tracking-wider text-slate-400">Descripción</th>
                    <th className="py-3 pr-4 text-xs font-bold uppercase tracking-wider text-slate-400">Estado</th>
                    <th className="py-3 text-xs font-bold uppercase tracking-wider text-slate-400">Acciones</th>
                </tr>
            </thead>
            <tbody>
                {categories.map((cat) => (
                    <tr
                        key={cat.id}
                        className="border-b border-slate-100 transition-colors hover:bg-slate-50"
                    >
                        <td className="py-3 pr-4 font-semibold text-slate-800">{cat.name}</td>
                        <td className="py-3 pr-4 text-slate-600">{cat.description}</td>
                        <td className="py-3 pr-4">
                            {cat.is_active ? (
                                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                                    Activa
                                </span>
                            ) : (
                                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-500">
                                    Inactiva
                                </span>
                            )}
                        </td>
                        <td className="py-3">
                            <button
                                onClick={() => onEdit(cat)}
                                className="mr-4 font-semibold text-blue-600 hover:underline"
                            >
                                Editar
                            </button>
                            <button
                                onClick={() => onDelete(cat)}
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

export default CategoriesTable;