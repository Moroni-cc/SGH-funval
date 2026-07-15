function Input({ label, name, error, className = "", ...props }) {
    return (
        <div className="flex flex-col gap-1">
            {label && (
                <label htmlFor={name} className="text-sm font-medium text-gray-700">
                    {label}
                </label>
            )}
            <input
                id={name}
                name={name}
                aria-invalid={Boolean(error)}
                aria-describedby={error ? `${name}-error` : undefined}
                className={`w-full rounded-md border px-3 py-2 text-sm text-gray-900 outline-none transition-colors focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed ${error ? "border-red-500" : "border-gray-300"
                    } ${className}`}
                {...props}
            />
            {error && (
                <span id={`${name}-error`} className="text-xs text-red-600">
                    {error}
                </span>
            )}
        </div>
    );
}

export default Input;
