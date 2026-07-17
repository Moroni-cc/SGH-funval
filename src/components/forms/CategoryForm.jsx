
{/*Apartado de las categorias*/}

function CategoryForm() {
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input
        label="Nombre"
        name="name"
        value={form.name}
        onChange={handleChange}
        error={errors.name}
        placeholder="Ej. Tutorías"
      />
      <Input
        label="Descripción"
        name="description"
        value={form.description}
        onChange={handleChange}
        error={errors.description}
        placeholder="Ej. Horas de servicio por tutorías"
      />
      <div className="flex gap-2">
        <Button type="submit" loading={loading}>
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