import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/auth/Login";
import NotFound from "../pages/shared/NotFound";
import Unauthorized from "../pages/shared/Unauthorized";
import AdminDashboard from "../pages/admin/Dashboard";
import StudentDashboard from "../pages/student/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";
import StudentRoute from "./StudentRoute";
import PublicRoute from "./PublicRoute";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
      </Route>
      <Route path="/unauthorized" element={<Unauthorized />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<AdminRoute />}>
          <Route path="/admin" element={<AdminDashboard />} />
        </Route>

        <Route element={<StudentRoute />}>
          <Route path="/student" element={<StudentDashboard />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRouter;
