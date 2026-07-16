import { NavLink } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import {
  LayoutDashboard,
  ClipboardCheck,
  Users,
  FolderKanban,
  BarChart3,
  User,
  FilePlus2,
  History,
  LogOut,
} from 'lucide-react'

function Sidebar({ isSidebarOpen, setIsSidebarOpen }) {
  const { user, logout } = useAuth()

  const adminLinks = [
    {
      section: 'ADMINISTRACIÓN',
    },
    {
      name: 'Panel general',
      path: '/admin',
      icon: LayoutDashboard,
    },
    {
      name: 'Revisión de solicitudes',
      path: '/admin/reports',
      icon: ClipboardCheck,
    },
    {
      name: 'Usuarios',
      path: '/admin/users',
      icon: Users,
    },
    {
      name: 'Categorías',
      path: '/admin/categories',
      icon: FolderKanban,
    },
    {
      name: 'Cursos',
      path: '/admin/courses',
      icon: FolderKanban,
    },
    {
      name: 'Países',
      path: '/admin/countries',
      icon: FolderKanban,
    },
    {
      name: 'Estadísticas',
      path: '/admin/statistics',
      icon: BarChart3,
    },
    {
      name: 'Mi perfil',
      path: '/perfil', // <-- CORREGIDO AQUÍ
      icon: User,
    },
  ]
  
  const studentLinks = [
    {
      section: 'ESTUDIANTE',
    },
    {
      name: 'Inicio',
      path: '/student',
      icon: LayoutDashboard,
    },
    {
      name: 'Registrar horas',
      path: '/student/new-report',
      icon: FilePlus2,
    },
    {
      name: 'Historial',
      path: '/student/reports',
      icon: History,
    },
    {
      name: 'Mi perfil',
      path: '/perfil', // <-- Y CORREGIDO AQUÍ
      icon: User,
    },
  ]

  const links = user?.role === 'ADMIN' ? adminLinks : studentLinks

  return (
    <>
      {/* Fondo oscuro */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 flex h-full w-72 flex-col  bg-[rgb(30,57,132)] shadow-lg transition-transform duration-300
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                lg:translate-x-0`}
      >
        <div className="flex items-center justify-between  p-4">
          <h2 className="text-xl font-bold text-amber-50">FUNVAL</h2>

          <button
            className="lg:hidden text-white"
            onClick={() => setIsSidebarOpen(false)}
          >
            ✕
          </button>
        </div>

        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            <p className="px-4 pb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
              {links[0].section}
            </p>

            {links.slice(1).map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  onClick={() => setIsSidebarOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-lg px-4 py-3 text-white ${
                      isActive ? 'bg-white/15 font-semibold' : ''
                    }`
                  }
                >
                  <link.icon size={20} />
                  <span>{link.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className=" border-t border-gray-500 px-2 py-4">
          <button
            onClick={logout}
            className="flex w-full items-center gap-3 px-4 py-2 text-white cursor-pointer"
          >
            <LogOut size={20} />
            <span>Cerrar sesión</span>
          </button>
        </div>
      </aside>
    </>
  )
}

export default Sidebar