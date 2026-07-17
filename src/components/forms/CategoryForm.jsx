import { useEffect, useState } from "react";
import { getCategories } from "../../services/categories.service";
// Nota: Asegúrate de importar tus componentes Button e Input si están en otro archivo, por ejemplo:
// import { Input } from "../ui/Input"; 
// import { Button } from "../ui/Button";

function CategoryForm({ initialData, handleSubmit, handleChange, form, errors, onCancel }) {
  const [categorias, setCategorias] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [errorCategories, setErrorCategories] = useState("");

  useEffect(() => {
    let activo = true;

    getCategories()
      .then((data) => {
        if (activo) setCategorias(data);
      })
      .catch(() => {
        if (activo) setErrorCategories("No se pudieron cargar las categorías.");
      })
      .finally(() => {
        if (activo) setLoadingCategories(false);
      });

    return () => {
      activo = false;
    };
  }, []);

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/* --- BLOQUE UNIFICADO: Selector de Categorías (De MC-historial) --- */}
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
          value={form?.categoriaServicio || ""}
          onChange={handleChange}
          required
          disabled={loadingCategories}
          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-[#1F2937] outline-none transition focus:border-[#3B82F6] focus:ring-4 focus:ring-blue-100 disabled:opacity-60"
        >
          <option value="" disabled>
            {loadingCategories ? "Cargando categorías..." : "Seleccionar categoría"}
          </option>

          {categorias.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        {errorCategories && <p className="mt-1 text-xs text-red-500">{errorCategories}</p>}
      </div>

      {/* --- BLOQUE: Inputs de Formulario (De master) --- */}
      <Input
        label="Nombre"
        name="name"
        value={form?.name || ""}
        onChange={handleChange}
        error={errors?.name}
        placeholder="Ej. Tutorías"
      />
      
      <Input
        label="Descripción"
        name="description"
        value={form?.description || ""}
        onChange={handleChange}
        error={errors?.description}
        placeholder="Ej. Horas de servicio por tutorías"
      />

      {/* --- BLOQUE: Botones de Acción (De master) --- */}
      <div className="flex gap-2">
        <Button type="submit" loading={loadingCategories}>
          {initialData ? "Guardar cambios" : "Crear categoría"}
        </Button>
        <button
          type="button"
          onClick={onCancel}
          className="w-full rounded-[10px] border border-[#CBD5E1] bg-white px-5 py-[11px] text-sm font-semibold text-[#334155] transition-colors hover:bg-[#F1F5F9]"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}

export default CategoryForm;