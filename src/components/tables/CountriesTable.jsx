function CountriesTable({ countries, onEdit, onDelete }) {
    if (countries.length === 0) {
        return <p className="text-sm text-gray-500">No hay países registrados.</p>;
    }

    return (
        <table className="w-full text-left text-sm">
            <thead>
                <tr className="border-b text-gray-500">
                    <th className="py-2 pr-4">Nombre</th>
                    <th className="py-2 pr-4">Código ISO</th>
                    <th className="py-2">Acciones</th>
                </tr>
            </thead>
            <tbody>
                {countries.map((country) => (
                    <tr key={country.id} className="border-b">
                        <td className="py-2 pr-4 font-medium text-gray-900">{country.name}</td>
                        <td className="py-2 pr-4 text-gray-600">{country.code}</td>
                        <td className="py-2">
                            <button
                                onClick={() => onEdit(country)}
                                className="mr-3 text-blue-600 hover:underline"
                            >
                                Editar
                            </button>
                            <button
                                onClick={() => onDelete(country)}
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

export default CountriesTable;