import { Routes, Route } from 'react-router-dom';
import Login from '../pages/auth/Login';
// Aquí irán las importaciones de Admin y Student cuando tus compañeros las creen

export default function AppRouter() {
  return (
    <Routes>
      {/* Ruta pública que te toca a ti */}
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />

      {/* Rutas que tus compañeros completarán después */}
      {/* <Route path="/admin" element={<AdminDashboard />} /> */}
      {/* <Route path="/student" element={<StudentDashboard />} /> */}
    </Routes>
  );
}