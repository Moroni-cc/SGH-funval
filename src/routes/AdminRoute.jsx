import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { ROLES } from "../utils/constants";

/**
 * Se anida dentro de <ProtectedRoute />, por lo que aquí ya se sabe
 * que el usuario está autenticado; solo se valida el rol.
 */
function AdminRoute() {
    const { user } = useAuth();

    if (user?.role !== ROLES.ADMIN) {
        return <Navigate to="/unauthorized" replace />;
    }

    return <Outlet />;
}

export default AdminRoute;
