import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { ROLES } from "../utils/constants";

function StudentRoute() {
    const { user } = useAuth();

    if (user?.role !== ROLES.STUDENT) {
        return <Navigate to="/unauthorized" replace />;
    }

    return <Outlet />;
}

export default StudentRoute;
