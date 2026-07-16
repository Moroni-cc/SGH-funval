import { useState, useEffect } from "react";
import api from "../../api/axios";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

export default function Profile() {
    const [formData, setFormData] = useState({
        nombre: "",
        email: "",
        telefono: "",
        fecha_nacimiento: "",
        pais: ""
    });
    const [countries, setCountries] = useState([]);
    
    // Estados para la interfaz
    const [loadingData, setLoadingData] = useState(true);
    const [saving, setSaving] = useState(false);
    const [toast, setToast] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Hacemos ambas peticiones en paralelo para mayor velocidad
                const [profileRes, countriesRes] = await Promise.all([
                    api.get("/profile/me"),
                    api.get("/countries/")
                ]);
                setFormData(profileRes.data);
                setCountries(countriesRes.data);
            } catch (error) {
                console.error("Error al cargar los datos", error);
                setToast({ type: "error", text: "No se pudieron cargar los datos del perfil." });
            } finally {
                setLoadingData(false);
            }
        };

        fetchData();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setToast(null);

        // Validación del dominio del correo
        if (!formData.email.endsWith("@funval.com")) {
            setToast({ type: "error", text: "El correo debe pertenecer al dominio @funval.com" });
            return;
        }

        setSaving(true);
        try {
            await api.patch("/profile/me", formData);
            setToast({ type: "success", text: "Datos actualizados correctamente." });
        } catch (error) {
            console.error(error);
            setToast({ type: "error", text: "Error al actualizar el perfil." });
        } finally {
            setSaving(false);
        }
    };

    if (loadingData) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-2xl p-6 bg-white rounded-lg shadow-sm border border-gray-200 mt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Mi Perfil</h2>

            {toast && (
                <div className={`mb-6 p-4 rounded-md text-sm font-medium ${toast.type === "error" ? "bg-red-50 text-red-700 border border-red-200" : "bg-green-50 text-green-700 border border-green-200"}`}>
                    {toast.text}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
                <Input
                    label="Nombre completo"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                />
                
                <Input
                    label="Correo electrónico"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                
                <Input
                    label="Teléfono"
                    name="telefono"
                    type="tel"
                    value={formData.telefono}
                    onChange={handleChange}
                />
                
                <Input
                    label="Fecha de nacimiento"
                    name="fecha_nacimiento"
                    type="date"
                    value={formData.fecha_nacimiento}
                    onChange={handleChange}
                />

                {/* Replicamos el estilo del Input.jsx para el select, ya que Input no soporta la etiqueta <select> nativamente */}
                <div className="flex flex-col gap-1">
                    <label htmlFor="pais" className="text-sm font-medium text-gray-700">País</label>
                    <select
                        id="pais"
                        name="pais"
                        value={formData.pais}
                        onChange={handleChange}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none transition-colors focus:ring-2 focus:ring-blue-500 bg-white"
                        required
                    >
                        <option value="">Seleccione un país...</option>
                        {countries.map((country) => (
                            <option key={country.id} value={country.id}>
                                {country.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="pt-4">
                    <Button type="submit" loading={saving}>
                        Guardar Cambios
                    </Button>
                </div>
            </form>
        </div>
    );
}