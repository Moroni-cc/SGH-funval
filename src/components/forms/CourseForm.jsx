{/*Apartado de los cursos*/}

function CourseForm() {
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input
        label="Nombre"
        name="name"
        value={form.name}
        onChange={handleChange}
        error={errors.name}
        placeholder="Ej. Desarrollo Web"
      />
      <Input
        label="Duración (semanas)"
        name="duration"
        type="number"
        value={form.duration}
        onChange={handleChange}
        error={errors.duration}
        placeholder="Ej. 24"
      />
      <Input
        label="Horas de servicio requeridas"
        name="required_service_hours"
        type="number"
        value={form.required_service_hours}
        onChange={handleChange}
        error={errors.required_service_hours}
        placeholder="Ej. 40"
      />
      <Input
        label="Precio"
        name="price"
        type="number"
        value={form.price}
        onChange={handleChange}
        error={errors.price}
        placeholder="Ej. 100"
      />
      <div className="flex gap-2">
        <Button type="submit" loading={loading}>
          {initialData ? "Guardar cambios" : "Crear curso"}
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

export default CourseForm;