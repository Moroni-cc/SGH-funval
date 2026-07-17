function UsersTable({ users, onDelete }) {
    if (users.length === 0) {
        return <p className="text-sm text-[#64748B]">No hay usuarios registrados.</p>;
    }

    return (
        <table className="w-full text-left text-sm">
            <thead>
                <tr className="border-b border-[#F1F5F9]">
                    <th className="py-3 pr-4 text-[11.5px] font-bold uppercase tracking-[0.6px] text-[#94A3B8]">
                        Nombre
                    </th>
                    <th className="py-3 pr-4 text-[11.5px] font-bold uppercase tracking-[0.6px] text-[#94A3B8]">
                        Email
                    </th>
                    <th className="py-3 pr-4 text-[11.5px] font-bold uppercase tracking-[0.6px] text-[#94A3B8]">
                        Rol
                    </th>
                    <th className="py-3 pr-4 text-[11.5px] font-bold uppercase tracking-[0.6px] text-[#94A3B8]">
                        Estado
                    </th>
                    <th className="py-3 pr-4 text-[11.5px] font-bold uppercase tracking-[0.6px] text-[#94A3B8]">
                        Fecha de registro
                    </th>
                    <th className="py-3 text-[11.5px] font-bold uppercase tracking-[0.6px] text-[#94A3B8]">
                        Acciones
                    </th>
                </tr>
            </thead>
            <tbody>
                {users.map((user) => (
                    <tr
                        key={user.id}
                        className={`border-b border-[#F1F5F9] transition-colors hover:bg-[#F8FAFD] ${
                            user.is_active ? "" : "bg-[#F8FAFD] opacity-60"
                        }`}
                    >
                        <td className="py-3 pr-4 font-semibold text-[#16213E]">
                            {user.full_name ?? `${user.first_name} ${user.last_name}`}
                        </td>
                        <td className="py-3 pr-4 text-[#334155]">{user.email}</td>
                        <td className="py-3 pr-4 text-[#334155]">{user.role}</td>
                        <td className="py-3 pr-4">
                            {user.is_active ? (
                                <span className="font-semibold text-[#22A366]">Activo</span>
                            ) : (
                                <span className="text-[#94A3B8]">Inactivo</span>
                            )}
                        </td>
                        <td className="py-3 pr-4 text-[#334155]">
                            {new Date(user.created_at).toLocaleDateString()}
                        </td>
                        <td className="py-3">
                            <button
                                onClick={() => onDelete(user)}
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

export default UsersTable;