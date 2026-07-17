import { useEffect, useState } from "react";
import { getCategories } from "../../services/categories.service";

function CategoryForm() {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let activo = true;

    getCategories()
      .then((data) => {
        if (activo) setCategorias(data);
      })
      .catch(() => {
        if (activo) setError("No se pudieron cargar las categorías.");
      })
      .finally(() => {
        if (activo) setLoading(false);
      });

    return () => {
      activo = false;
    };
  }, []);

  return (
    <div>
      <label
        htmlFor="categoriaServicio"
        className="mb-2 block text-sm font-semibold text-[#1F2937]"
      >
        Categoría de servicio
        <span className="ml-1 text-red-500">*</span>
      </label>

      <select
        id="categoriaServicio"
        name="categoriaServicio"
        defaultValue=""
        required
        disabled={loading}
        className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-[#1F2937] outline-none transition focus:border-[#3B82F6] focus:ring-4 focus:ring-blue-100 disabled:opacity-60"
      >
        <option value="" disabled>
          {loading ? "Cargando categorías..." : "Seleccionar categoría"}
        </option>

        {categorias.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>

      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}

export default CategoryForm;