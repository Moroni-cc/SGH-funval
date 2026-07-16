import { useToast } from "../../hooks/useToast";

const STYLES = {
    success: "bg-green-600",
    error: "bg-red-600",
    info: "bg-blue-600",
};

function ToastContainer() {
    const { toasts } = useToast();

    return (
        <div className="fixed right-4 top-4 z-50 flex flex-col gap-2">
            {toasts.map((toast) => (
                <div
                    key={toast.id}
                    role="alert"
                    className={`rounded-md px-4 py-3 text-sm font-medium text-white shadow-lg ${
                        STYLES[toast.type] ?? STYLES.info
                    }`}
                >
                    {toast.message}
                </div>
            ))}
        </div>
    );
}

export default ToastContainer;