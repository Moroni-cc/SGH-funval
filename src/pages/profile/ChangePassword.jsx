import { useState } from "react";
import api from "../../api/axios";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
export default function ChangePassword() {
    const [passwords, setPasswords] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState(null);

    const handleChange = (e) => {
        setPasswords({ ...passwords, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setToast(null);

        // Validación: nueva === confirmación
        if (passwords.newPassword !== passwords.confirmPassword) {
            setToast({ type: "error", text: "La nueva contraseña y la confirmación no coinciden." });
            return;
        }

        setLoading(true);
        try {
            const response = await api.patch("/profile/password", {
                currentPassword: passwords.currentPassword,
                newPassword: passwords.newPassword
            });

            // Manejo del 204
            if (response.status === 204) {
                setToast({ type: "success", text: "¡Contraseña actualizada con éxito!" });
                setPasswords({ currentPassword: "", newPassword: "", confirmPassword: "" }); // Limpiar campos
            }
        } catch (error) {
            // Manejo del 401
            if (error.response?.status === 401) {
                setToast({ type: "error", text: "La contraseña actual es incorrecta." });
            } else {
                setToast({ type: "error", text: "Ocurrió un error al intentar cambiar la contraseña." });
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mx-auto max-w-md p-6 bg-white rounded-lg shadow-sm border border-gray-200 mt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Cambiar Contraseña</h2>

            {toast && (
                <div className={`mb-6 p-4 rounded-md text-sm font-medium ${toast.type === "error" ? "bg-red-50 text-red-700 border border-red-200" : "bg-green-50 text-green-700 border border-green-200"}`}>
                    {toast.text}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
                <Input
                    label="Contraseña Actual"
                    name="currentPassword"
                    type="password"
                    value={passwords.currentPassword}
                    onChange={handleChange}
                    required
                />
                
                <Input
                    label="Nueva Contraseña"
                    name="newPassword"
                    type="password"
                    value={passwords.newPassword}
                    onChange={handleChange}
                    required
                />
                
                <Input
                    label="Confirmar Nueva Contraseña"
                    name="confirmPassword"
                    type="password"
                    value={passwords.confirmPassword}
                    onChange={handleChange}
                    required
                />

                <div className="pt-4">
                    <Button type="submit" loading={loading}>
                        Actualizar Contraseña
                    </Button>
                </div>
            </form>
        </div>
    );
}