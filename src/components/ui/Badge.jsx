const STYLES = {
    PENDING: "bg-yellow-100 text-yellow-800",
    APPROVED_FULL: "bg-green-100 text-green-800",
    APPROVED_PARTIAL: "bg-blue-100 text-blue-800",
    REJECTED: "bg-red-100 text-red-800",
};

const LABELS = {
    PENDING: "Pendiente",
    APPROVED_FULL: "Aprobado total",
    APPROVED_PARTIAL: "Aprobado parcial",
    REJECTED: "Rechazado",
};

function Badge({ status }) {
    return (
        <span
            className={`inline-block rounded-full px-2 py-1 text-xs font-medium ${
                STYLES[status] ?? "bg-gray-100 text-gray-800"
            }`}
        >
            {LABELS[status] ?? status}
        </span>
    );
}

export default Badge;