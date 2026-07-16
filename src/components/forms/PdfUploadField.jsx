function PdfUploadField({
  archivo,
  error,
  dragging,
  setDragging,
  fileInputRef,
  handleFileChange,
  handleDrop,
  limpiarArchivo,
}) {
  return (
    <fieldset className="mt-6 rounded-xl border border-slate-200 bg-white p-5">
      <legend className="px-3 text-base font-bold text-[#1A2B4C]">
        Evidencia de servicio
      </legend>

      <div className="mb-2 flex items-center justify-between gap-3">
        <label
          htmlFor="evidencia"
          className="text-sm font-semibold text-[#1F2937]"
        >
          Evidencia en PDF
          <span className="ml-1 text-red-500">*</span>
        </label>

        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-[#3B82F6]">
          Solo archivos .pdf
        </span>
      </div>

      {!archivo ? (
        <label
          htmlFor="evidencia"
          onDragOver={(event) => {
            event.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          className={`
            flex cursor-pointer flex-col items-center justify-center
            rounded-xl border-2 border-dashed px-6 py-9
            text-center transition
            ${
              dragging
                ? "border-[#3B82F6] bg-blue-50"
                : "border-slate-300 bg-slate-50 hover:border-[#3B82F6] hover:bg-blue-50/50"
            }
          `}
        >
          {/* Ícono para subir */}
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-[#3B82F6]">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="h-7 w-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 16V4m0 0L7.5 8.5M12 4l4.5 4.5M5 14v4a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4"
              />
            </svg>
          </div>

          <p className="font-semibold text-[#1A2B4C]">
            Selecciona tu archivo PDF
          </p>

          <p className="mt-1 text-sm text-slate-500">
            Haz clic o arrastra el archivo hasta esta área
          </p>

          <span className="mt-4 rounded-lg bg-[#3B82F6] px-4 py-2 text-sm font-semibold text-white shadow-sm">
            Seleccionar PDF
          </span>

          <input
            ref={fileInputRef}
            id="evidencia"
            name="evidencia"
            type="file"
            accept=".pdf,application/pdf"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
      ) : (
        <div className="flex items-center justify-between gap-4 rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <div className="flex min-w-0 items-center gap-3">
            {/* Ícono del archivo */}
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#10B981] text-white">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7 3h7l4 4v14H7V3Zm7 0v5h4"
                />
              </svg>
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-[#1F2937]">
                {archivo.name}
              </p>

              <p className="mt-1 text-xs text-emerald-700">
                Archivo válido y listo para subir
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={limpiarArchivo}
            className="shrink-0 rounded-lg border border-red-200 bg-white px-3 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50"
          >
            Eliminar
          </button>
        </div>
      )}

      {error && (
        <p role="alert" className="mt-3 text-sm font-medium text-red-600">
          {error}
        </p>
      )}
    </fieldset>
  );
}

export default PdfUploadField;
