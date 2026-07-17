function Badge({ status }) {
  const badgeConfig = {
    PENDING: {
      text: 'Pendiente',
      className: 'bg-amber-100 text-amber-800',
    },
    APPROVED_FULL: {
      text: 'Aprobado',
      className: 'bg-emerald-100 text-emerald-800',
    },
    APPROVED_PARTIAL: {
      text: 'Aprobado parcialmente',
      className: 'bg-sky-100 text-sky-800',
    },
    REJECTED: {
      text: 'Rechazado',
      className: 'bg-rose-100 text-rose-800',
    },
  }

  const currentBadge = badgeConfig[status] || {
    text: 'Estado desconocido',
    className: 'bg-slate-100 text-slate-700',
  }

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${currentBadge.className}`}
    >
      {currentBadge.text}
    </span>
  )
}

export default Badge
