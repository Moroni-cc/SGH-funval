import AuthLayout from "../../layouts/AuthLayout";
import LoginForm from "../../components/forms/LoginForm";

function Login() {
    return (
        <AuthLayout>
            <h1 className="mb-1 text-2xl font-semibold text-gray-900">Iniciar sesión</h1>
            <p className="mb-6 text-sm text-gray-500">
                Ingresa tus credenciales para acceder al sistema.
            </p>
            <LoginForm />
        </AuthLayout>
    );
}

export default Login;
