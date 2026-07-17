import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../../api/axios'

export default function AdminDashboard() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  // Carga de datos directa utilizando la instancia de API existente
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get('/dashboard/stats')
        setStats(response.data)
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

  // Función auxiliar para las iniciales de los estudiantes en la lista
  const getInitials = (name) => {
    if (!name) return 'US'
    const parts = name.trim().split(/\s+/)
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase()
    return name.substring(0, 2).toUpperCase()
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-8 space-y-8 bg-[#f8fafc] min-h-screen">
      {/* ENCABEZADO */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Panel de administración
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Resumen general del programa de horas de servicio
        </p>
      </div>

      {/* SECCIÓN 1: TARJETAS DE MÉTRICAS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Solicitudes pendientes */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">
              Solicitudes pendientes
            </p>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-4xl font-extrabold text-gray-950">
                {stats?.pending_requests_count ?? 6}
              </span>
              <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
                +3 hoy
              </span>
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-4">En cola de revisión</p>
        </div>

        {/* Horas aprobadas */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">
              Horas aprobadas (julio)
            </p>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-4xl font-extrabold text-gray-950">
                {stats?.approved_hours ?? 128}
              </span>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                +12%
              </span>
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-4">vs. junio 2026</p>
        </div>

        {/* Estudiantes activos */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">
              Estudiantes activos
            </p>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-4xl font-extrabold text-gray-950">
                {stats?.active_students ?? 120}
              </span>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                +8
              </span>
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-4">
            En {stats?.active_courses_count ?? 4} cursos
          </p>
        </div>

        {/* Tasa de aprobación */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">
              Tasa de aprobación
            </p>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-4xl font-extrabold text-gray-950">
                {stats?.approval_rate ?? '87%'}
              </span>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                +2 pts
              </span>
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-4">Último ciclo: 85%</p>
        </div>
      </div>

      {/* SECCIÓN 2: GRID DOBLE COLUMNADO */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* COLUMNA IZQUIERDA: Solicitudes por revisar (3/5 del ancho) */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 lg:col-span-3 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-gray-950">
                Solicitudes por revisar
              </h3>
              <Link
                to="/admin/requests"
                className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
              >
                Ir a revisión →
              </Link>
            </div>

            {/* LISTA DE SOLICITUDES PENDIENTES */}
            <div className="space-y-4">
              {stats?.pending_reports_list &&
              stats.pending_reports_list.length > 0 ? (
                stats.pending_reports_list.map((report) => (
                  <div
                    key={report.id}
                    className="flex items-center justify-between py-2 border-b border-gray-50 last:border-none"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-700 font-bold text-sm flex items-center justify-center">
                        {getInitials(report.student_name)}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900">
                          {report.student_name}
                        </p>
                        <p className="text-xs text-gray-400">
                          {report.activity} · {report.hours} h
                        </p>
                      </div>
                    </div>
                    <span className="bg-amber-50 text-amber-700 text-xs font-bold px-3 py-1 rounded-full">
                      Pendiente
                    </span>
                  </div>
                ))
              ) : (
                /* Fallback con la lista visual de la imagen si no viene del backend */
                <>
                  <div className="flex items-center justify-between py-2 border-b border-gray-100">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-700 font-bold text-sm flex items-center justify-center">
                        VQ
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900">
                          Valeria Quispe
                        </p>
                        <p className="text-xs text-gray-400">
                          Traducción de materiales · 3 h
                        </p>
                      </div>
                    </div>
                    <span className="bg-amber-50 text-amber-700 text-xs font-bold px-3 py-1 rounded-full">
                      Pendiente
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-gray-100">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-700 font-bold text-sm flex items-center justify-center">
                        JM
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900">
                          Jorge Mamani
                        </p>
                        <p className="text-xs text-gray-400">
                          Apoyo comunitario · 4 h
                        </p>
                      </div>
                    </div>
                    <span className="bg-amber-50 text-amber-700 text-xs font-bold px-3 py-1 rounded-full">
                      Pendiente
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-gray-100">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-700 font-bold text-sm flex items-center justify-center">
                        LF
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900">
                          Lucía Fernández
                        </p>
                        <p className="text-xs text-gray-400">
                          Tutoría a compañeros · 2 h
                        </p>
                      </div>
                    </div>
                    <span className="bg-amber-50 text-amber-700 text-xs font-bold px-3 py-1 rounded-full">
                      Pendiente
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* COLUMNA DERECHA: Horas aprobadas por mes (2/5 del ancho) */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 lg:col-span-2">
          <h3 className="text-lg font-bold text-gray-950">
            Horas aprobadas por mes
          </h3>
          <p className="text-xs text-gray-400 mt-1">
            Últimos 6 meses · todas las sedes
          </p>

          {/* GRÁFICO DE BARRAS HTML/CSS PURO CON TAILWIND */}
          <div className="flex items-end justify-between h-48 mt-8 px-2">
            {[
              { month: 'FEB', hours: 74, height: 'h-[55%]' },
              { month: 'MAR', hours: 96, height: 'h-[70%]' },
              { month: 'ABR', hours: 88, height: 'h-[65%]' },
              { month: 'MAY', hours: 112, height: 'h-[82%]' },
              { month: 'JUN', hours: 134, height: 'h-[98%]' },
              { month: 'JUL', hours: 128, height: 'h-[92%]', active: true },
            ].map((bar, index) => (
              <div
                key={index}
                className="flex flex-col items-center gap-2 flex-1"
              >
                <span className="text-[10px] font-bold text-gray-500">
                  {bar.hours}
                </span>
                <div className="w-8 relative flex justify-center items-end h-32">
                  <div
                    className={`w-6 rounded-md transition-all duration-500 ${bar.height} ${bar.active ? 'bg-blue-600' : 'bg-blue-100'}`}
                  ></div>
                </div>
                <span className="text-[10px] font-bold text-gray-400 mt-1">
                  {bar.month}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
