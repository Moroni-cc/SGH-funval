function CountriesTable({ countries, onEdit, onDelete }) {
    if (countries.length === 0) {
        return <p className="p-6 text-sm text-slate-500">No hay países registrados.</p>;
    }

    return (
        <table className="w-full text-left text-sm">
            <thead>
                <tr className="border-b border-slate-100">
                    <th className="py-3 pr-4 text-xs font-bold uppercase tracking-wider text-slate-400">Nombre</th>
                    <th className="py-3 pr-4 text-xs font-bold uppercase tracking-wider text-slate-400">Código ISO</th>
                    <th className="py-3 text-xs font-bold uppercase tracking-wider text-slate-400">Acciones</th>
                </tr>
            </thead>
            <tbody>
                {countries.map((country) => (
                    <tr
                        key={country.id}
                        className="border-b border-slate-100 transition-colors hover:bg-slate-50"
                    >
                        <td className="py-3 pr-4 font-semibold text-slate-800">{country.name}</td>
                        <td className="py-3 pr-4 text-slate-600">{country.code}</td>
                        <td className="py-3">
                            <button
                                onClick={() => onEdit(country)}
                                className="mr-4 font-semibold text-blue-600 hover:underline"
                            >
                                Editar
                            </button>
                            <button
                                onClick={() => onDelete(country)}
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

export default CountriesTable;