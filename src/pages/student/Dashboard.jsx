import { useAuth } from "../../hooks/useAuth";

function Dashboard() {
    const { user, logout } = useAuth();

    return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-3 text-center">
            <h1 className="text-2xl font-semibold text-gray-900">Panel del Estudiante</h1>
            <p className="text-sm text-gray-500">
                Bienvenido{user?.name ? `, ${user.name}` : ""} ({user?.role}).
            </p>
            <button
                onClick={logout}
                className="text-sm font-medium text-blue-600 hover:underline"
            >
                Cerrar sesión
            </button>
        </div>
    );
}

export default Dashboard;
