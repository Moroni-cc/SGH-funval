import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../../api/axios'
import { useAuth } from '../../hooks/useAuth'

function Dashboard() {
  const { user } = useAuth()
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  // GET /api/v1/dashboard/stats
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

  const progress = stats?.course_progress
  const progressPercentage = Math.min(100, progress?.progress_percentage ?? 0)

  return (
    <div className="w-full max-w-7xl mx-auto p-6 space-y-6 bg-slate-50 min-h-screen">
      {/* ENCABEZADO */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">
            Mi panel
          </h1>
          <p className="text-sm text-slate-500 font-medium mt-1">
            Bienvenido{user?.first_name ? `, ${user.first_name}` : ''} · Resumen de tus horas de servicio
          </p>
        </div>

        {/* ACCESO RÁPIDO PARA CREAR REPORTE */}
        <Link
          to="/student/new-report"
          className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
        >
          + Registrar horas
        </Link>
      </div>

      {/* SECCIÓN 1: CARDS DE MÉTRICAS PERSONALES */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Horas reportadas */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <p className="text-sm font-semibold text-slate-400">Horas reportadas</p>
          <p className="text-4xl font-bold text-slate-800 mt-2">
            {stats?.reports?.total_hours_submitted ?? 0} h
          </p>
          <p className="text-xs text-slate-400 mt-2">
            En {stats?.reports?.total ?? 0} reportes enviados
          </p>
        </div>

        {/* Horas aprobadas */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <p className="text-sm font-semibold text-slate-400">Horas aprobadas</p>
          <p className="text-4xl font-bold text-emerald-600 mt-2">
            {stats?.reports?.total_hours_approved ?? 0} h
          </p>
          <p className="text-xs text-slate-400 mt-2">
            {stats?.reports?.approved ?? 0} reportes aprobados
          </p>
        </div>

        {/* Pendientes */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <p className="text-sm font-semibold text-slate-400">Pendientes</p>
          <p className="text-4xl font-bold text-amber-600 mt-2">
            {stats?.reports?.pending ?? 0}
          </p>
          <p className="text-xs text-slate-400 mt-2">Esperando revisión</p>
        </div>

        {/* Rechazados */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <p className="text-sm font-semibold text-slate-400">Rechazados</p>
          <p className="text-4xl font-bold text-rose-600 mt-2">
            {stats?.reports?.rejected ?? 0}
          </p>
          <p className="text-xs text-slate-400 mt-2">Requieren corrección</p>
        </div>
      </div>

      {/* SECCIÓN 2: PROGRESO DEL CURSO + TASA DE APROBACIÓN */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

        {/* COLUMNA IZQUIERDA: PROGRESO HACIA EL TOTAL REQUERIDO */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 lg:col-span-3 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-slate-800">Progreso del curso</h3>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                {progress?.course_name ?? 'Sin curso'}
              </span>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-semibold text-slate-600">
                  {progress?.hours_approved ?? 0} de {progress?.required_service_hours ?? 0} horas aprobadas
                </span>
                <span className="font-bold text-blue-600">{progressPercentage}%</span>
              </div>
              <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                <div
                  className="bg-blue-600 h-full transition-all duration-500"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Totalizador de horas */}
          <div className="grid grid-cols-2 gap-4 border-t border-slate-100 pt-6 mt-6">
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
              <p className="text-xs font-medium text-slate-400">Horas restantes</p>
              <p className="text-xl font-bold text-slate-700 mt-1">
                {progress?.hours_remaining ?? 0} h
              </p>
            </div>
            <div className="bg-blue-50/50 p-3 rounded-xl border border-blue-100/50">
              <p className="text-xs font-medium text-blue-500">Horas requeridas</p>
              <p className="text-xl font-bold text-blue-700 mt-1">
                {progress?.required_service_hours ?? 0} h
              </p>
            </div>
          </div>
        </div>

        {/* COLUMNA DERECHA: TASA DE APROBACIÓN */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 lg:col-span-2 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-800">Tasa de aprobación</h3>
            <p className="text-xs text-slate-400 font-medium mt-1">
              Porcentaje de tus reportes aprobados
            </p>
          </div>

          <div className="flex flex-col items-center justify-center flex-1 py-6">
            <p className="text-5xl font-bold text-slate-800">
              {Math.round(stats?.reports?.approval_rate ?? 0)}%
            </p>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mt-6">
              <div
                className="bg-emerald-500 h-full transition-all duration-500"
                style={{ width: `${Math.min(100, stats?.reports?.approval_rate ?? 0)}%` }}
              ></div>
            </div>
            <p className="text-xs text-slate-400 font-medium mt-4 text-center">
              {stats?.reports?.approved ?? 0} aprobados de {stats?.reports?.total ?? 0} enviados
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Dashboard;