import { Link } from "react-router-dom";

function NotFound() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-3 text-center">
            <h1 className="text-3xl font-semibold text-gray-900">404</h1>
            <p className="text-sm text-gray-500">La página que buscas no existe.</p>
            <Link to="/login" className="text-sm font-medium text-blue-600 hover:underline">
                Volver al inicio de sesión
            </Link>
        </div>
    );
}

export default NotFound;
