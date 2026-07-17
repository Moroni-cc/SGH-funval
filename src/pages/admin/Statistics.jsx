import { useEffect, useState } from 'react'
import { getDashboardStats } from '../../services/dashboard.service'

function Statistics() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadStatistics() {
      try {
        const data = await getDashboardStats()
        setStats(data)
      } catch (error) {
        console.error('Error al cargar estadísticas:', error)
      } finally {
        setLoading(false)
      }
    }

    loadStatistics()
  }, [])

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
      </div>
    )
  }
  const maxCategory = Math.max(
    ...(stats?.top_categories?.map((c) => c.total_hours_approved) || [1]),
  )

  const maxCourse = Math.max(
    ...(stats?.top_courses?.map((c) => c.total_students) || [1]),
  )

  return (
    <div className="mx-auto max-w-7xl space-y-8 p-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">Estadísticas</h1>

        <p className="mt-1 text-sm text-slate-500">
          Análisis de categorías y cursos.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* TOP CATEGORÍAS */}

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-6 text-xl font-bold text-slate-800">
            Top categorías
          </h2>

          <div className="space-y-5">
            {stats.top_categories.map((category) => (
              <div key={category.id}>
                <div className="mb-2 flex justify-between">
                  <span className="font-medium text-slate-700">
                    {category.name}
                  </span>

                  <span className="font-semibold text-blue-600">
                    {category.total_hours_approved} h
                  </span>
                </div>

                <div className="h-2 rounded-full bg-slate-200">
                  <div
                    className="h-2 rounded-full bg-blue-500"
                    style={{
                      width: `${
                        (category.total_hours_approved / maxCategory) * 100
                      }%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* TOP CURSOS */}

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-6 text-xl font-bold text-slate-800">Top cursos</h2>

          <div className="space-y-5">
            {stats.top_courses.map((course) => (
              <div key={course.id}>
                <div className="mb-2 flex justify-between">
                  <span className="font-medium text-slate-700">
                    {course.name}
                  </span>

                  <span className="font-semibold text-emerald-600">
                    {course.total_students} alumnos
                  </span>
                </div>

                <div className="h-2 rounded-full bg-slate-200">
                  <div
                    className="h-2 rounded-full bg-emerald-500"
                    style={{
                      width: `${(course.total_students / maxCourse) * 100}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Statistics
