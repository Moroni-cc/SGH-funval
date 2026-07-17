function CountriesTable({ countries, onEdit, onDelete }) {
    if (countries.length === 0) {
        return <p className="text-sm text-[#64748B]">No hay países registrados.</p>;
    }

    return (
        <table className="w-full text-left text-sm">
            <thead>
                <tr className="border-b border-[#F1F5F9]">
                    <th className="py-3 pr-4 text-[11.5px] font-bold uppercase tracking-[0.6px] text-[#94A3B8]">
                        Nombre
                    </th>
                    <th className="py-3 pr-4 text-[11.5px] font-bold uppercase tracking-[0.6px] text-[#94A3B8]">
                        Código ISO
                    </th>
                    <th className="py-3 text-[11.5px] font-bold uppercase tracking-[0.6px] text-[#94A3B8]">
                        Acciones
                    </th>
                </tr>
            </thead>
            <tbody>
                {countries.map((country) => (
                    <tr key={country.id} className="border-b border-[#F1F5F9]">
                        <td className="py-3 pr-4 font-semibold text-[#16213E]">
                            {country.name}
                        </td>
                        <td className="py-3 pr-4 text-[#334155]">{country.code}</td>
                        <td className="py-3">
                            <button
                                onClick={() => onEdit(country)}
                                className="mr-4 font-semibold text-[#2E7CF6] hover:underline"
                            >
                                Editar
                            </button>
                            <button
                                onClick={() => onDelete(country)}
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

export default CountriesTable;
