
{/*Apartado de las categorias*/}

function CategoryForm() {
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
        className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-[#1F2937] outline-none transition focus:border-[#3B82F6] focus:ring-4 focus:ring-blue-100"
      >
        <option value="" disabled>
          Seleccionar categoría
        </option>

        <option value="tutoria-companeros">
          Tutoría a compañeros
        </option>

        <option value="apoyo-comunitario">
          Apoyo comunitario
        </option>

        <option value="mentoria-estudiantes">
          Mentoría a nuevos estudiantes
        </option>

        <option value="eventos-institucionales">
          Eventos institucionales
        </option>

        <option value="traduccion-materiales">
          Traducción de materiales
        </option>
      </select>
    </div>
  );
}

export default CategoryForm;