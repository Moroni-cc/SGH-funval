function UsersTable({ users, onDelete }) {
    if (users.length === 0) {
        return <p className="p-6 text-sm text-slate-500">No hay usuarios registrados.</p>;
    }

    const initials = (user) => {
        const name = user.full_name ?? `${user.first_name} ${user.last_name}`;
        return name
            .split(" ")
            .filter(Boolean)
            .slice(0, 2)
            .map((w) => w[0].toUpperCase())
            .join("");
    };

    return (
        <table className="w-full text-left text-sm">
            <thead>
                <tr className="border-b border-slate-100">
                    <th className="py-3 pr-4 text-xs font-bold uppercase tracking-wider text-slate-400">Nombre</th>
                    <th className="py-3 pr-4 text-xs font-bold uppercase tracking-wider text-slate-400">Email</th>
                    <th className="py-3 pr-4 text-xs font-bold uppercase tracking-wider text-slate-400">Rol</th>
                    <th className="py-3 pr-4 text-xs font-bold uppercase tracking-wider text-slate-400">Estado</th>
                    <th className="py-3 pr-4 text-xs font-bold uppercase tracking-wider text-slate-400">Fecha de registro</th>
                    <th className="py-3 text-xs font-bold uppercase tracking-wider text-slate-400">Acciones</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user) => (
                    <tr
                        key={user.id}
                        className={`border-b border-slate-100 transition-colors hover:bg-slate-50 ${
                            user.is_active ? "" : "bg-slate-50 opacity-60"
                        }`}
                    >
                        <td className="py-3 pr-4">
                            <div className="flex items-center gap-3">
                                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-600">
                                    {initials(user)}
                                </span>
                                <span className="font-semibold text-slate-800">
                                    {user.full_name ?? `${user.first_name} ${user.last_name}`}
                                </span>
                            </div>
                        </td>
                        <td className="py-3 pr-4 text-slate-600">{user.email}</td>
                        <td className="py-3 pr-4 text-slate-600">{user.role}</td>
                        <td className="py-3 pr-4">
                            {user.is_active ? (
                                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                                    Activo
                                </span>
                            ) : (
                                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-500">
                                    Inactivo
                                </span>
                            )}
                        </td>
                        <td className="py-3 pr-4 text-slate-600">
                            {new Date(user.created_at).toLocaleDateString()}
                        </td>
                        <td className="py-3">
                            <button
                                onClick={() => onDelete(user)}
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

export default UsersTable;