import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/auth/Login";
import NotFound from "../pages/shared/NotFound";
import Unauthorized from "../pages/shared/Unauthorized";
import AdminDashboard from "../pages/admin/Dashboard";
import StudentDashboard from "../pages/student/Dashboard";
import Categories from "../pages/admin/Categories";
import Courses from "../pages/admin/Courses";
import Countries from "../pages/admin/Countries";
import Reports from "../pages/admin/Reports";
import Users from "../pages/admin/Users";
import MyHours from "../pages/student/MyHours";
import EditReport from "../pages/student/EditReport";

// Componentes importados desde la rama JJ/Logout-loadingFile
import HourForm from "../components/forms/HourForm";

// Importación corregida de tu perfil (con P mayúscula para evitar errores en Vercel)
import Profile from "../pages/profile/Perfil";

import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import RoleRoute from "./RolRoute";
import { ROLES } from "../utils/constants";

// Importamos el molde que contiene el menú lateral
import DashboardLayout from "../layouts/DashboardLayout";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
      </Route>

      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* RUTAS PROTEGIDAS */}
      <Route element={<ProtectedRoute />}>
        {/* ENVOLVEMOS TODO EN EL LAYOUT PARA QUE SE VEA EL SIDEBAR */}
        <Route element={<DashboardLayout />}>
          {/* Solo Admin */}
          <Route element={<RoleRoute allowedRoles={[ROLES.ADMIN]} />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/categories" element={<Categories />} />
            <Route path="/admin/countries" element={<Countries />} />
            <Route path="/admin/courses" element={<Courses />} />
            <Route path="/admin/reports" element={<Reports />} />
            <Route path="/admin/users" element={<Users />} />
          </Route>

          {/* Solo Student */}
          <Route element={<RoleRoute allowedRoles={[ROLES.STUDENT]} />}>
            <Route path="/student" element={<StudentDashboard />} />
            <Route path="/student/new-report" element={<HourForm />} />
          </Route>
          <Route path="/student/reports" element={<MyHours />} />
          <Route path="/student/reports/:id/edit" element={<EditReport />} />

          {/* Accesible para ADMIN y STUDENT */}
          <Route
            element={<RoleRoute allowedRoles={[ROLES.ADMIN, ROLES.STUDENT]} />}
          >
            <Route path="/perfil" element={<Profile />} />
          </Route>
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRouter;
