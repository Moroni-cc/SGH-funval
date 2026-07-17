function UsersTable({ users, onDelete }) {
    if (users.length === 0) {
        return <p className="text-sm text-gray-500">No hay usuarios registrados.</p>;
    }

    return (
        <table className="w-full text-left text-sm">
            <thead>
                <tr className="border-b text-gray-500">
                    <th className="py-2 pr-4">Nombre</th>
                    <th className="py-2 pr-4">Email</th>
                    <th className="py-2 pr-4">Rol</th>
                    <th className="py-2 pr-4">Estado</th>
                    <th className="py-2 pr-4">Fecha de registro</th>
                    <th className="py-2">Acciones</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user) => (
                    <tr
                        key={user.id}
                        className={`border-b ${user.is_active ? "" : "bg-gray-50 opacity-60"}`}
                    >
                        <td className="py-2 pr-4 font-medium text-gray-900">
                            {user.full_name ?? `${user.first_name} ${user.last_name}`}
                        </td>
                        <td className="py-2 pr-4 text-gray-600">{user.email}</td>
                        <td className="py-2 pr-4 text-gray-600">{user.role}</td>
                        <td className="py-2 pr-4">
                            {user.is_active ? (
                                <span className="text-green-600">Activo</span>
                            ) : (
                                <span className="text-gray-400">Inactivo</span>
                            )}
                        </td>
                        <td className="py-2 pr-4 text-gray-600">
                            {new Date(user.created_at).toLocaleDateString()}
                        </td>
                        <td className="py-2">
                            <button
                                onClick={() => onDelete(user)}
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

export default UsersTable;