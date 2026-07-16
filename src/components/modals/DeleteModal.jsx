function DeleteModal({ title, message, onConfirm, onCancel, loading = false }) {
    return (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50">
            <div className="w-full max-w-sm rounded-lg bg-white p-6 shadow-xl">
                <h2 className="mb-2 text-lg font-semibold text-gray-900">{title}</h2>
                <p className="mb-6 text-sm text-gray-600">{message}</p>
                <div className="flex justify-end gap-2">
                    <button
                        onClick={onCancel}
                        className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={onConfirm}
                        disabled={loading}
                        className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-60"
                    >
                        {loading ? "Eliminando..." : "Eliminar"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DeleteModal;