import { useState, useEffect } from 'react'
import { getDashboardStats } from '../../services/dashboard.service'

function Dashboard() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  // GET /api/v1/dashboard/stats
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getDashboardStats()
        setStats(data)
      } catch (error) {
        console.error('Error al cargar las estadísticas del dashboard:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full min-h-[50vh]">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
      </div>
    )
  }

  // Cálculos para las barras de progreso del estado de solicitudes
  const totalReports = stats?.reports?.total || 1
  const pendingPercentage = Math.min(
    100,
    Math.round(((stats?.reports?.pending || 0) / totalReports) * 100),
  )
  const approvedPercentage = Math.min(
    100,
    Math.round(((stats?.reports?.approved || 0) / totalReports) * 100),
  )
  const rejectedPercentage = Math.min(
    100,
    Math.round(((stats?.reports?.rejected || 0) / totalReports) * 100),
  )

  // Obtener el valor máximo de horas para escalar las barras del gráfico dinámicamente
  const maxHours = stats?.top_categories
    ? Math.max(...stats.top_categories.map((c) => c.total_hours_approved), 1)
    : 1

  return (
    <div className="w-full max-w-7xl mx-auto p-6 space-y-6 bg-slate-50 min-h-screen">
      {/* ENCABEZADO */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800 tracking-tight">
          Panel de administración
        </h1>
        <p className="text-sm text-slate-500 font-medium mt-1">
          Resumen general del programa de horas de servicio
        </p>
      </div>

      {/* SECCIÓN 1: CARDS DE ESTADÍSTICAS GLOBALES */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Usuarios */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <p className="text-sm font-semibold text-slate-400">Total Usuarios</p>
          <p className="text-4xl font-bold text-slate-800 mt-2">
            {(stats?.users?.total_students ?? 0) +
              (stats?.users?.total_admins ?? 0)}
          </p>
          <p className="text-xs text-slate-400 mt-2">
            {stats?.users?.total_students ?? 0} Alumnos ·{' '}
            {stats?.users?.total_admins ?? 0} Admins
          </p>
        </div>

        {/* Total Reportes */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <p className="text-sm font-semibold text-slate-400">Total Reportes</p>
          <p className="text-4xl font-bold text-slate-800 mt-2">
            {stats?.reports?.total ?? 0}
          </p>
          <p className="text-xs text-slate-400 mt-2">
            Registrados en la plataforma
          </p>
        </div>

        {/* Cursos Activos */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <p className="text-sm font-semibold text-slate-400">Cursos Activos</p>
          <p className="text-4xl font-bold text-slate-800 mt-2">
            {stats?.top_courses?.length ?? 0}
          </p>
          <p className="text-xs text-slate-400 mt-2">Programas en desarrollo</p>
        </div>

        {/* Categorías Activas */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <p className="text-sm font-semibold text-slate-400">
            Categorías Activas
          </p>
          <p className="text-4xl font-bold text-slate-800 mt-2">
            {stats?.top_categories?.length ?? 0}
          </p>
          <p className="text-xs text-slate-400 mt-2">
            Áreas de servicio comunitario
          </p>
        </div>
      </div>

      {/* SECCIÓN 2: GRID DE DOS COLUMNAS (MÉTRICAS DE SOLICITUDES + GRÁFICO DINÁMICO POR CATEGORÍA) */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* COLUMNA IZQUIERDA: ESTADO DE LAS SOLICITUDES (Ocupa 3 de 5 columnas) */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 lg:col-span-3 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-slate-800">
                Estado de solicitudes
              </h3>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Métricas de control
              </span>
            </div>

            <div className="space-y-5">
              {/* Pendientes */}
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-semibold text-slate-600">
                    Pendientes de revisión
                  </span>
                  <span className="font-bold text-amber-600">
                    {stats?.reports?.pending ?? 0}
                  </span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-amber-500 h-full transition-all duration-500"
                    style={{ width: `${pendingPercentage}%` }}
                  ></div>
                </div>
              </div>

              {/* Aprobados */}
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-semibold text-slate-600">
                    Aprobadas
                  </span>
                  <span className="font-bold text-emerald-600">
                    {stats?.reports?.approved ?? 0}
                  </span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-emerald-500 h-full transition-all duration-500"
                    style={{ width: `${approvedPercentage}%` }}
                  ></div>
                </div>
              </div>

              {/* Rechazados */}
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-semibold text-slate-600">
                    Rechazadas
                  </span>
                  <span className="font-bold text-rose-600">
                    {stats?.reports?.rejected ?? 0}
                  </span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-rose-500 h-full transition-all duration-500"
                    style={{ width: `${rejectedPercentage}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Resumen de totalizador de horas en la base */}
          <div className="grid grid-cols-2 gap-4 border-t border-slate-100 pt-6 mt-6">
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
              <p className="text-xs font-medium text-slate-400">
                Total horas enviadas
              </p>
              <p className="text-xl font-bold text-slate-700 mt-1">
                {stats?.reports?.total_hours_submitted ?? 0} h
              </p>
            </div>
            <div className="bg-blue-50/50 p-3 rounded-xl border border-blue-100/50">
              <p className="text-xs font-medium text-blue-500">
                Total horas aprobadas
              </p>
              <p className="text-xl font-bold text-blue-700 mt-1">
                {stats?.reports?.total_hours_approved ?? 0} h
              </p>
            </div>
          </div>
        </div>

        {/* COLUMNA DERECHA: GRÁFICO REAL CON DATOS DE TU API (Ocupa 2 de 5 columnas) */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 lg:col-span-2 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-800">
              Horas aprobadas por área
            </h3>
            <p className="text-xs text-slate-400 font-medium mt-1">
              Distribución real según categorías activas
            </p>
          </div>

          {/* Renderizado de barras basado en top_categories */}
          <div className="flex items-end justify-around h-48 mt-6 px-1 gap-2">
            {stats?.top_categories &&
              stats.top_categories.slice(0, 5).map((category, index) => {
                // Calcular altura proporcional en base a las horas que trae el JSON
                const percentageHeight = Math.max(
                  10,
                  Math.round((category.total_hours_approved / maxHours) * 100),
                )

                return (
                  <div
                    key={category.id}
                    className="flex flex-col items-center gap-2 flex-1 min-w-0"
                  >
                    {/* Horas arriba de la barra */}
                    <span className="text-[10px] font-bold text-slate-500 truncate w-full text-center">
                      {category.total_hours_approved}h
                    </span>
                    {/* Contenedor de la barra */}
                    <div className="w-full relative flex justify-center items-end h-32">
                      <div
                        className={`w-6 rounded-md transition-all duration-500 ${
                          index === 1 ? 'bg-blue-600' : 'bg-blue-200'
                        }`}
                        style={{ height: `${percentageHeight}%` }}
                      ></div>
                    </div>
                    {/* Nombre de la categoría recortado elegantemente para que no se amontone */}
                    <span
                      className="text-[10px] font-semibold text-slate-400 mt-1 truncate w-full text-center"
                      title={category.name}
                    >
                      {category.name.substring(0, 6)}..
                    </span>
                  </div>
                )
              })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
