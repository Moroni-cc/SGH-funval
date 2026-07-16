import { useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";

function CountryForm({ initialData = null, onSubmit, onCancel, loading = false }) {
    const [form, setForm] = useState({
        name: initialData?.name ?? "",
        code: initialData?.code ?? "",
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const value =
            e.target.name === "code" ? e.target.value.toUpperCase() : e.target.value;
        setForm({ ...form, [e.target.name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newErrors = {};
        if (!form.name.trim()) newErrors.name = "El nombre es obligatorio.";
        if (!/^[A-Z]{2}$/.test(form.code))
            newErrors.code = "El código ISO debe ser exactamente 2 letras (ej. PE).";
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
                placeholder="Ej. Perú"
            />
            <Input
                label="Código ISO"
                name="code"
                value={form.code}
                onChange={handleChange}
                error={errors.code}
                placeholder="Ej. PE"
                maxLength={2}
            />
            <div className="flex gap-2">
                <Button type="submit" loading={loading}>
                    {initialData ? "Guardar cambios" : "Crear país"}
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

export default CountryForm;