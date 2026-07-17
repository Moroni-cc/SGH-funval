function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav
      className="
        flex flex-wrap items-center justify-center gap-2
        rounded-xl border border-gray-200
        bg-white px-3 py-3 shadow-sm
    "
      aria-label="Paginación"
    >
      {/* Botón anterior */}
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="
            flex items-center justify-center
            rounded-lg border border-gray-200
            px-3 py-2
            text-sm font-medium text-gray-600
            transition-all duration-200

            hover:border-blue-200
            hover:bg-blue-50
            hover:text-blue-600

            focus:outline-none
            focus-visible:ring-2
            focus-visible:ring-blue-500
            focus-visible:ring-offset-2

            disabled:cursor-not-allowed
            disabled:bg-gray-50
            disabled:text-gray-300
            disabled:hover:border-gray-200
        "
      >
        <span className="mr-1" aria-hidden="true">
          ←
        </span>

        <span className="hidden sm:inline">Anterior</span>
      </button>

      {/* Números de página */}
      <div className="flex items-center gap-1">
        {pages.map((page) => {
          const isActive = page === currentPage;

          return (
            <button
              type="button"
              key={page}
              onClick={() => onPageChange(page)}
              aria-label={`Ir a la página ${page}`}
              aria-current={isActive ? "page" : undefined}
              className={`
                        flex h-10 min-w-10 items-center justify-center
                        rounded-lg px-3
                        text-sm font-semibold
                        transition-all duration-200

                        focus:outline-none
                        focus-visible:ring-2
                        focus-visible:ring-blue-500
                        focus-visible:ring-offset-2

                        ${
                          isActive
                            ? `
                                    bg-blue-600
                                    text-white
                                    shadow-md shadow-blue-200
                                    scale-105
                                  `
                            : `
                                    border border-transparent
                                    text-gray-600
                                    hover:border-blue-100
                                    hover:bg-blue-50
                                    hover:text-blue-600
                                  `
                        }
                    `}
            >
              {page}
            </button>
          );
        })}
      </div>

      {/* Botón siguiente */}
      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="
            flex items-center justify-center
            rounded-lg border border-gray-200
            px-3 py-2
            text-sm font-medium text-gray-600
            transition-all duration-200

            hover:border-blue-200
            hover:bg-blue-50
            hover:text-blue-600

            focus:outline-none
            focus-visible:ring-2
            focus-visible:ring-blue-500
            focus-visible:ring-offset-2

            disabled:cursor-not-allowed
            disabled:bg-gray-50
            disabled:text-gray-300
            disabled:hover:border-gray-200
        "
      >
        <span className="hidden sm:inline">Siguiente</span>

        <span className="ml-1" aria-hidden="true">
          →
        </span>
      </button>
    </nav>
  );
}

export default Pagination;
