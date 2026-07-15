import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { validateLoginForm } from "../../utils/validators";
import { ROLE_HOME_ROUTES } from "../../utils/constants";
import Input from "../ui/Input";
import Button from "../ui/Button";

const INITIAL_FORM = { email: "", password: "" };

function LoginForm() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const [form, setForm] = useState(INITIAL_FORM);
    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState("");
    const [loading, setLoading] = useState(false);

    function handleChange(e) {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: "" }));
        setServerError("");
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setServerError("");

        const validationErrors = validateLoginForm(form);
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length > 0) return;

        setLoading(true);
        try {
            const profile = await login(form);
            const from = location.state?.from?.pathname;
            const redirectTo = from || ROLE_HOME_ROUTES[profile.role] || "/";
            navigate(redirectTo, { replace: true });
        } catch (error) {
            if (error.response?.status === 401) {
                setServerError("Credenciales inválidas. Verifica tu correo y contraseña.");
            } else {
                setServerError("Ocurrió un error al iniciar sesión. Intenta nuevamente.");
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} noValidate className="flex w-full flex-col gap-4">
            <Input
                label="Correo electrónico"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                error={errors.email}
                placeholder="correo@ejemplo.com"
                autoComplete="email"
                disabled={loading}
            />

            <Input
                label="Contraseña"
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                error={errors.password}
                placeholder="••••••••"
                autoComplete="current-password"
                disabled={loading}
            />

            {serverError && (
                <p
                    role="alert"
                    className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600"
                >
                    {serverError}
                </p>
            )}

            <Button type="submit" loading={loading}>
                {loading ? "Ingresando..." : "Iniciar sesión"}
            </Button>
        </form>
    );
}

export default LoginForm;
