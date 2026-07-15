import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { ROLE_HOME_ROUTES } from "../utils/constants";


function PublicRoute() {
    const { isAuthenticated, checkingAuth, user } = useAuth();

    if (checkingAuth) {
        return (
            <div className="flex min-h-screen items-center justify-center text-sm text-gray-500">
                Verificando sesión...
            </div>
        );
    }

    if (isAuthenticated) {
        const home = ROLE_HOME_ROUTES[user?.role] ?? "/";
        return <Navigate to={home} replace />;
    }

    return <Outlet />;
}

export default PublicRoute;