import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginService } from '../../services/auth.service';
// import { useAuth } from '../../hooks/useAuth'; // Descomentar cuando Thalía termine su parte

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  // const { loginContext } = useAuth(); // Para guardar el estado global luego

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Por favor, completa todos los campos.');
      return;
    }

    setIsLoading(true);

    try {
      const data = await loginService({ email, password });
       const { role } = data; // Ajustar según respuesta de la API

      // loginContext(user, role); 

      if (role === 'ADMIN') {
        navigate('/admin');
      } else if (role === 'STUDENT') {
        navigate('/student');
      } else {
        navigate('/');
      }

    } catch (err) {
      if (err.response?.status === 401) {
        setError('Correo o contraseña incorrectos.');
      } else {
        setError('Error al iniciar sesión. Intenta de nuevo.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const loadDemo = (demoEmail, demoPass) => {
    setEmail(demoEmail);
    setPassword(demoPass);
    setError('');
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Correo institucional</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="nombre@funval.org"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            disabled={isLoading}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            disabled={isLoading}
          />
        </div>

        {error && <p className="text-red-500 text-sm font-medium">{error}</p>}

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-2.5 px-4 bg-[#2563EB] hover:bg-blue-700 text-white rounded-lg font-medium ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
        </button>
      </form>

      {/* Botones Demo */}
      <div className="mt-8">
        <div className="relative flex items-center justify-center mb-6">
          <div className="border-t border-gray-200 w-full absolute"></div>
          <span className="bg-white px-4 text-xs text-gray-400 font-medium uppercase tracking-wider relative">Acceso de demostración</span>
        </div>
        <div className="flex gap-3">
          <button onClick={() => loadDemo('student@funval.com', '12345678')} type="button" className="flex-1 py-2 px-4 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50">Estudiante</button>
          <button onClick={() => loadDemo('admin@funval.com', '1234567890')} type="button" className="flex-1 py-2 px-4 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50">Administrador</button>
        </div>
      </div>
    </div>
  );
}