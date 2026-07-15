import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

/**
 * Permite el acceso solo a usuarios autenticados.
 * Mientras se verifica la sesión (checkingAuth) no se decide nada aún,
 * para evitar un redirect prematuro a /login en cada recarga.
 */
function ProtectedRoute() {
    const { isAuthenticated, checkingAuth } = useAuth();
    const location = useLocation();

    if (checkingAuth) {
        return (
            <div className="flex min-h-screen items-center justify-center text-sm text-gray-500">
                Verificando sesión...
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <Outlet />;
}

export default ProtectedRoute;
