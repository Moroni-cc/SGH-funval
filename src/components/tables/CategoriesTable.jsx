function CategoriesTable({ categories, onEdit, onDelete }) {
    if (categories.length === 0) {
        return <p className="text-sm text-[#64748B]">No hay categorías registradas.</p>;
    }

    return (
        <table className="w-full text-left text-sm">
            <thead>
                <tr className="border-b border-[#F1F5F9]">
                    <th className="py-3 pr-4 text-[11.5px] font-bold uppercase tracking-[0.6px] text-[#94A3B8]">
                        Nombre
                    </th>
                    <th className="py-3 pr-4 text-[11.5px] font-bold uppercase tracking-[0.6px] text-[#94A3B8]">
                        Descripción
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
                {categories.map((cat) => (
                    <tr key={cat.id} className="border-b border-[#F1F5F9]">
                        <td className="py-3 pr-4 font-semibold text-[#16213E]">{cat.name}</td>
                        <td className="py-3 pr-4 text-[#334155]">{cat.description}</td>
                        <td className="py-3 pr-4">
                            {cat.is_active ? (
                                <span className="font-semibold text-[#22A366]">Activa</span>
                            ) : (
                                <span className="text-[#94A3B8]">Inactiva</span>
                            )}
                        </td>
                        <td className="py-3">
                            <button
                                onClick={() => onEdit(cat)}
                                className="mr-4 font-semibold text-[#2E7CF6] hover:underline"
                            >
                                Editar
                            </button>
                            <button
                                onClick={() => onDelete(cat)}
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

export default CategoriesTable;
