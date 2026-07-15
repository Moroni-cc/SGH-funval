function Button({ children, loading = false, disabled = false, className = "", ...props }) {
    return (
        <button
            className={`relative flex w-full items-center justify-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
            disabled={disabled || loading}
            {...props}
        >
            {loading && (
                <span
                    className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"
                    aria-hidden="true"
                />
            )}
            {children}
        </button>
    );
}

export default Button;
