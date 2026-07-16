import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/auth/Login';
import NotFound from '../pages/shared/NotFound';
import Unauthorized from '../pages/shared/Unauthorized';
import AdminDashboard from '../pages/admin/Dashboard';
import StudentDashboard from '../pages/student/Dashboard';
import Categories from '../pages/admin/Categories';
import Courses from '../pages/admin/Courses';
import Countries from "../pages/admin/Countries";

// Componentes importados desde la rama JJ/Logout-loadingFile
import HourForm from '../components/forms/HourForm';
import ChangePassword from "../pages/profile/ChangePassword";

// Importación corregida de tu perfil (con P mayúscula para evitar errores en Vercel)
import Profile from "../pages/profile/Perfil";

import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';
import RoleRoute from './RolRoute';
import { ROLES } from '../utils/constants';

// Importamos el molde que contiene el menú lateral
import DashboardLayout from '../layouts/DashboardLayout'; 

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
          <Route element={<RoleRoute allowedRoles={[ROLES.ADMIN]}/>}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/categories" element={<Categories />} />
            <Route path="/admin/countries" element={<Countries />} />
            <Route path="/admin/courses" element={<Courses />} />
          </Route>

          {/* Solo Student */}
          <Route element={<RoleRoute allowedRoles={[ROLES.STUDENT]} />}>
            <Route path="/student" element={<StudentDashboard />} />
            <Route path="/student/new-report" element={<HourForm />} />
          </Route>

          {/* Accesible para ADMIN y STUDENT */}
          <Route element={<RoleRoute allowedRoles={[ROLES.ADMIN, ROLES.STUDENT]} />}>
            <Route path="/perfil" element={<Profile />} />
            <Route path="/perfil/cambiar-password" element={<ChangePassword />} />
          </Route>

        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRouter;