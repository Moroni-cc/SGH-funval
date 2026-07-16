import AuthLayout from "../../layouts/AuthLayout";
import LoginForm from "../../components/forms/LoginForm";

function Login() {
    return (
        <AuthLayout>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Iniciar sesión</h2>
            <p className="text-sm text-gray-500 mb-8">Ingresa tus credenciales para acceder al sistema</p>
            
            <LoginForm />
        </AuthLayout>
    );
}

export default Login;