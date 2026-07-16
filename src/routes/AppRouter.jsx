
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/auth/Login";
import NotFound from "../pages/shared/NotFound";
import Unauthorized from "../pages/shared/Unauthorized";
import AdminDashboard from "../pages/admin/Dashboard";
import StudentDashboard from "../pages/student/Dashboard";
import Profile from "../pages/profile/Profile";
import ChangePassword from "../pages/profile/ChangePassword";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import RoleRoute from "./RolRoute";
import { ROLES } from "../utils/constants";
import Categories from "../pages/admin/Categories";
import Courses from "../pages/admin/Courses";
import DashboardLayout from '../layouts/DashboardLayout'


function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
      </Route>
      <Route path="/unauthorized" element={<Unauthorized />} />

      <Route element={<ProtectedRoute />}>

        
        {/* Solo Admin */}
       <Route element={<RoleRoute allowedRoles={[ROLES.ADMIN]}/>}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/courses" element={<Courses />} />
          <Route path="/admin/categories" element={<Categories />} />
        </Route>

        {/* Solo Student */}
        <Route element={<RoleRoute allowedRoles={[ROLES.STUDENT]} />}>
          <Route path="/student" element={<StudentDashboard />} />
        </Route>


          <Route element={<RoleRoute allowedRoles={[ROLES.STUDENT]} />}>
            <Route path="/student" element={<StudentDashboard />} />
          </Route>
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default AppRouter
