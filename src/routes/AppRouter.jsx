
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from '../pages/auth/Login'
import NotFound from '../pages/shared/NotFound'
import Unauthorized from '../pages/shared/Unauthorized'
import AdminDashboard from '../pages/admin/Dashboard'
import StudentDashboard from '../pages/student/Dashboard'
import Profile from "../pages/profile/Profile"
import ChangePassword from "../pages/profile/ChangePassword"
import Categories from "../pages/admin/Categories"
import Courses from "../pages/admin/Courses"
import ProtectedRoute from './ProtectedRoute'
import PublicRoute from './PublicRoute'
import RoleRoute from './RolRoute'
import { ROLES } from '../utils/constants'
import DashboardLayout from '../layouts/DashboardLayout'

function AppRouter() {
  return (
    <Routes>
      {/* Redirección inicial */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Rutas Públicas */}
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
      </Route>
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* Rutas Protegidas bajo Layout del Dashboard */}
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          
          {/* RUTA COMÚN (Para cualquier usuario autenticado) */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/change-password" element={<ChangePassword />} />

          {/* SOLO ADMINISTRADORES */}
          <Route element={<RoleRoute allowedRoles={[ROLES.ADMIN]} />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/courses" element={<Courses />} />
            <Route path="/admin/categories" element={<Categories />} />
          </Route>

          {/* SOLO ESTUDIANTES */}
          <Route element={<RoleRoute allowedRoles={[ROLES.STUDENT]} />}>
            <Route path="/student" element={<StudentDashboard />} />
          </Route>

        </Route>
      </Route>

      {/* Ruta 404 - No Encontrada */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default AppRouter
