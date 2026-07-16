import { Menu, Bell } from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'
import { useLocation } from 'react-router-dom'

function Navbar({ setIsSidebarOpen }) {
  const { user } = useAuth()
  const location = useLocation()

  const TITLES = {
    '/admin': 'Panel de Administrador',
    '/student': 'Panel del Estudiante',

    '/admin/users': 'Usuarios',
    '/admin/courses': 'Cursos',
    '/admin/categories': 'Categorías',
    '/admin/reports': 'Reportes',

    '/student/reports': 'Mis Reportes',
    '/student/new-report': 'Nuevo Reporte',
    '/student/progress': 'Progreso',

    '/profile': 'Mi Perfil',
  }

  const title = TITLES[location.pathname] || 'Dashboard'

  const initials = user?.full_name
    ? user.full_name
        .split(' ')
        .map((word) => word[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : 'US'

  return (
    <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6">
      <div className="flex items-center gap-4">
        <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden">
          <Menu size={24} />
        </button>

        <h1 className="text-2xl font-semibold text-slate-800">{title}</h1>
      </div>

      <div className="flex items-center gap-5">
        
        {/* Buscador (solo Desktop) */}
        <div className="hidden lg:block">
          <input
            type="text"
            placeholder="Buscar..."
            className="w-64 rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-sm outline-none focus:border-blue-500"
          />
        </div>

        <button>
          <Bell size={22} className="text-slate-600" />
        </button>

        <div className="flex items-center gap-3">
          <div className="hidden text-right lg:block">
            <p className="font-medium text-slate-700">{user?.full_name}</p>

            <p className="text-sm text-slate-400">{user?.role}</p>
          </div>

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-900 font-semibold text-white">
            {initials}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
