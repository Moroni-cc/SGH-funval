import { useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";

function CourseForm({ initialData = null, onSubmit, onCancel, loading = false }) {
  const [form, setForm] = useState({
    name: initialData?.name ?? "",
    duration: initialData?.duration ?? "",
    required_service_hours: initialData?.required_service_hours ?? "",
    price: initialData?.price ?? "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "El nombre es obligatorio.";
    if (!form.duration || Number(form.duration) <= 0)
      newErrors.duration = "La duración debe ser un número mayor a 0.";
    if (!form.required_service_hours || Number(form.required_service_hours) <= 0)
      newErrors.required_service_hours = "Las horas deben ser un número mayor a 0.";
    if (form.price === "" || Number(form.price) < 0)
      newErrors.price = "El precio no puede ser negativo.";
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    onSubmit({
      name: form.name,
      duration: Number(form.duration),
      required_service_hours: Number(form.required_service_hours),
      price: Number(form.price),
    });
  };

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