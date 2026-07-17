import { useCallback, useEffect, useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { ROLES } from "../../utils/constants";
import { getCountries } from "../../services/countries.service";
import { getCourses } from "../../services/courses.service";

function UserForm({ onSubmit, onCancel, loading = false }) {
    const [form, setForm] = useState({
        email: "",
        first_name: "",
        last_name: "",
        document_number: "",
        phone_number: "",
        role: ROLES.STUDENT,
        country_id: "",
        course_id: "",
    });
    const [errors, setErrors] = useState({});
    const [countries, setCountries] = useState([]);
    const [courses, setCourses] = useState([]);

    const loadOptions = useCallback(async () => {
        try {
            const [countryList, courseList] = await Promise.all([
                getCountries(),
                getCourses(),
            ]);
            setCountries(countryList);
            setCourses(courseList);
        } catch {
            setCountries([]);
            setCourses([]);
        }
    }, []);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        loadOptions();
    }, [loadOptions]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newErrors = {};
        if (!/^\S+@funval\.com$/.test(form.email))
            newErrors.email = "El correo debe pertenecer al dominio @funval.com";
        if (!form.first_name.trim()) newErrors.first_name = "El nombre es obligatorio.";
        if (!form.last_name.trim()) newErrors.last_name = "El apellido es obligatorio.";
        if (!form.document_number.trim())
            newErrors.document_number = "El número de documento es obligatorio.";
        if (!form.phone_number.trim())
            newErrors.phone_number = "El teléfono es obligatorio.";
        if (!form.country_id) newErrors.country_id = "Selecciona un país.";
        if (!form.course_id) newErrors.course_id = "Selecciona un curso.";
        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) return;

        onSubmit({
            email: form.email,
            first_name: form.first_name,
            last_name: form.last_name,
            document_number: form.document_number,
            phone_number: form.phone_number,
            role: form.role,
            country_id: Number(form.country_id),
            course_id: Number(form.course_id),
            password: form.document_number,
        });
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
                label="Correo electrónico"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                error={errors.email}
                placeholder="Ej. juan@funval.com"
            />
            <Input
                label="Nombre"
                name="first_name"
                value={form.first_name}
                onChange={handleChange}
                error={errors.first_name}
                placeholder="Ej. Juan"
            />
            <Input
                label="Apellido"
                name="last_name"
                value={form.last_name}
                onChange={handleChange}
                error={errors.last_name}
                placeholder="Ej. Pérez"
            />
            <Input
                label="Número de documento"
                name="document_number"
                value={form.document_number}
                onChange={handleChange}
                error={errors.document_number}
                placeholder="Ej. 12345678"
            />
            <Input
                label="Teléfono"
                name="phone_number"
                value={form.phone_number}
                onChange={handleChange}
                error={errors.phone_number}
                placeholder="Ej. 88001234"
            />

            <div className="flex flex-col gap-1">
                <label htmlFor="role" className="text-sm font-medium text-gray-700">
                    Rol
                </label>
                <select
                    id="role"
                    name="role"
                    value={form.role}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value={ROLES.STUDENT}>Estudiante</option>
                    <option value={ROLES.ADMIN}>Administrador</option>
                </select>
            </div>

            <div className="flex flex-col gap-1">
                <label htmlFor="country_id" className="text-sm font-medium text-gray-700">
                    País
                </label>
                <select
                    id="country_id"
                    name="country_id"
                    value={form.country_id}
                    onChange={handleChange}
                    className={`w-full rounded-md border px-3 py-2 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.country_id ? "border-red-500" : "border-gray-300"
                    }`}
                >
                    <option value="">Selecciona un país</option>
                    {countries.map((country) => (
                        <option key={country.id} value={country.id}>
                            {country.name}
                        </option>
                    ))}
                </select>
                {errors.country_id && (
                    <span className="text-xs text-red-600">{errors.country_id}</span>
                )}
            </div>

            <div className="flex flex-col gap-1">
                <label htmlFor="course_id" className="text-sm font-medium text-gray-700">
                    Curso
                </label>
                <select
                    id="course_id"
                    name="course_id"
                    value={form.course_id}
                    onChange={handleChange}
                    className={`w-full rounded-md border px-3 py-2 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.course_id ? "border-red-500" : "border-gray-300"
                    }`}
                >
                    <option value="">Selecciona un curso</option>
                    {courses.map((course) => (
                        <option key={course.id} value={course.id}>
                            {course.name}
                        </option>
                    ))}
                </select>
                {errors.course_id && (
                    <span className="text-xs text-red-600">{errors.course_id}</span>
                )}
            </div>

            <p className="rounded-md bg-blue-50 px-3 py-2 text-xs text-blue-800">
                La contraseña inicial del usuario será su número de documento.
            </p>

            <div className="flex gap-2">
                <Button type="submit" loading={loading}>
                    Crear usuario
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

export default UserForm;