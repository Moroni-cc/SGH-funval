import { useState, useEffect } from "react";
import api from "../../api/axios";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { useAuth } from "../../hooks/useAuth"; 

export default function Profile() {
    const { user } = useAuth();
    
    // --- ESTADOS PARA PERFIL (CONECTADOS A LA API) ---
    const [formData, setFormData] = useState({
        full_name: "", 
        email: "", 
        phone_number: "", 
        birthdate: "", 
        country_id: ""
    });
    const [countries, setCountries] = useState([]);
    const [loadingProfile, setLoadingProfile] = useState(true);
    const [savingProfile, setSavingProfile] = useState(false);
    const [profileToast, setProfileToast] = useState(null);

    // --- ESTADOS PARA CONTRASEÑA ---
    const [passwords, setPasswords] = useState({
        currentPassword: "", 
        newPassword: "", 
        confirmPassword: ""
    });
    const [savingPassword, setSavingPassword] = useState(false);
    const [passwordToast, setPasswordToast] = useState(null);

    // --- CARGA INICIAL DESDE LA API ---
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [profileRes, countriesRes] = await Promise.all([
                    api.get("/profile/me"),
                    api.get("/countries/")
                ]);
                
                const data = profileRes.data;
                setFormData({
                    full_name: data.full_name || "",
                    email: data.email || "",
                    phone_number: data.phone_number || "",
                    birthdate: data.birthdate || "",
                    country_id: data.country_id || ""
                });
                
                setCountries(countriesRes.data);
            } catch (error) {
                console.error("Error al cargar los datos", error);
            } finally {
                setLoadingProfile(false);
            }
        };
        fetchData();
    }, []);

    const handleProfileChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
    const handlePasswordChange = (e) => setPasswords({ ...passwords, [e.target.name]: e.target.value });

    // --- SUBMITS ---
    const handleProfileSubmit = async (e) => {
        e.preventDefault();
        setProfileToast(null);

        if (!formData.email.endsWith("@funval.com")) {
            setProfileToast({ type: "error", text: "El correo debe pertenecer al dominio @funval.com" });
            return;
        }

        setSavingProfile(true);
        try {
            await api.patch("/profile/me", formData);
            setProfileToast({ type: "success", text: "Cambios guardados correctamente." });
        } catch (error) {
            console.error(error);
            setProfileToast({ type: "error", text: "Error al actualizar el perfil." });
        } finally {
            setSavingProfile(false);
        }
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        setPasswordToast(null);

        if (passwords.newPassword !== passwords.confirmPassword) {
            setPasswordToast({ type: "error", text: "La nueva contraseña no coincide con la confirmación." });
            return;
        }

        setSavingPassword(true);
        try {
            const response = await api.patch("/profile/password", {
                currentPassword: passwords.currentPassword,
                newPassword: passwords.newPassword
            });
            if (response.status === 204) {
                setPasswordToast({ type: "success", text: "Contraseña actualizada con éxito." });
                setPasswords({ currentPassword: "", newPassword: "", confirmPassword: "" });
            }
        } catch (error) {
            if (error.response?.status === 401) {
                setPasswordToast({ type: "error", text: "La contraseña actual es incorrecta." });
            } else {
                setPasswordToast({ type: "error", text: "Error al intentar cambiar la contraseña." });
            }
        } finally {
            setSavingPassword(false);
        }
    };

    if (loadingProfile) {
        return (
            <div className="flex justify-center items-center h-full min-h-[50vh]">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
            </div>
        );
    }

    const getInitials = (name) => {
        if (!name) return "US";
        const parts = name.split(" ");
        if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
        return name.substring(0, 2).toUpperCase();
    };

    return (
        <div className="w-full max-w-5xl mx-auto p-4 md:p-8 space-y-6 bg-[#f8fafc] min-h-screen">
            
            {/* TARJETA 1: ENCABEZADO (Igual a la imagen) */}
            <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col md:flex-row items-center gap-6 justify-between border border-gray-100">
                <div className="flex items-center gap-5">
                    <div className="w-16 h-16 rounded-full bg-[#1e293b] text-white flex items-center justify-center text-xl font-bold tracking-wide">
                        {getInitials(formData.full_name)}
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">{formData.full_name || "Usuario"}</h2>
                        <p className="text-sm text-gray-500">{formData.email}</p>
                    </div>
                </div>
                <div>
                    <span className="bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-sm font-semibold">
                        {user?.role === 'ADMIN' ? 'Administrador' : 'Estudiante · Desarrollo de Software'}
                    </span>
                </div>
            </div>

            {/* TARJETA 2: INFORMACIÓN PERSONAL (Cuadrícula Horizontal) */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-6">Información personal</h3>
                
                {profileToast && (
                    <div className={`mb-4 p-3 rounded-md text-sm font-medium ${profileToast.type === "error" ? "bg-red-50 text-red-700" : "bg-green-50 text-green-700"}`}>
                        {profileToast.text}
                    </div>
                )}

                <form onSubmit={handleProfileSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Input label="Nombre completo" name="full_name" value={formData.full_name} onChange={handleProfileChange} required />
                        <Input label="Correo institucional" name="email" type="email" value={formData.email} onChange={handleProfileChange} required />
                        <Input label="Teléfono" name="phone_number" type="tel" value={formData.phone_number} onChange={handleProfileChange} />
                        <Input label="Fecha de nacimiento" name="birthdate" type="date" value={formData.birthdate} onChange={handleProfileChange} />
                        
                        <div className="flex flex-col gap-1">
                            <label htmlFor="country_id" className="text-sm font-medium text-gray-700">País</label>
                            <select id="country_id" name="country_id" value={formData.country_id} onChange={handleProfileChange} className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none transition-colors focus:ring-2 focus:ring-blue-500 bg-white" required>
                                <option value="">Seleccione un país...</option>
                                {countries.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                            </select>
                        </div>
                    </div>
                    <div>
                        <Button type="submit" loading={savingProfile} className="w-auto px-6">
                            Guardar cambios
                        </Button>
                    </div>
                </form>
            </div>

            {/* TARJETA 3: SEGURIDAD (Cuadrícula Horizontal) */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-6">Seguridad</h3>
                
                {passwordToast && (
                    <div className={`mb-4 p-3 rounded-md text-sm font-medium ${passwordToast.type === "error" ? "bg-red-50 text-red-700" : "bg-green-50 text-green-700"}`}>
                        {passwordToast.text}
                    </div>
                )}

                <form onSubmit={handlePasswordSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Input label="Contraseña actual" name="currentPassword" type="password" placeholder="••••••••" value={passwords.currentPassword} onChange={handlePasswordChange} required />
                        <Input label="Nueva contraseña" name="newPassword" type="password" placeholder="Mínimo 8 caracteres" value={passwords.newPassword} onChange={handlePasswordChange} required />
                        <Input label="Confirmar nueva contraseña" name="confirmPassword" type="password" placeholder="••••••••" value={passwords.confirmPassword} onChange={handlePasswordChange} required />
                    </div>
                    <div>
                        <button type="submit" disabled={savingPassword} className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors disabled:opacity-50">
                            {savingPassword ? "Actualizando..." : "Actualizar contraseña"}
                        </button>
                    </div>
                </form>
            </div>

        </div>
    );
}