import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/auth/Login";
import NotFound from "../pages/shared/NotFound";
import Unauthorized from "../pages/shared/Unauthorized";
import AdminDashboard from "../pages/admin/Dashboard";
import StudentDashboard from "../pages/student/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import RoleRoute from "./RolRoute";
import { ROLES } from "../utils/constants";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
      </Route>
      <Route path="/unauthorized" element={<Unauthorized />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<RoleRoute allowedRoles={[ROLES.ADMIN]}/>}>
          <Route path="/admin" element={<AdminDashboard />} />
        </Route>

        <Route element={<RoleRoute allowedRoles={[ROLES.STUDENT]} />}>
          <Route path="/student" element={<StudentDashboard />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRouter;
