import { useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";

function CategoryForm({ initialData = null, onSubmit, onCancel, loading = false }) {
  const [form, setForm] = useState({
    name: initialData?.name ?? "",
    description: initialData?.description ?? "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "El nombre es obligatorio.";
    if (!form.description.trim()) newErrors.description = "La descripción es obligatoria.";
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    onSubmit(form);
  };

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
          className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}

export default CategoryForm;