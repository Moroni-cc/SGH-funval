import LoginForm from '../../components/forms/LoginForm';

export default function Login() {
  return (
    <div className="min-h-screen flex bg-gray-50 font-sans">
      
      {/* Columna Izquierda */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#101b3b] text-white p-12 flex-col justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-wider mb-20">FUNV<span className="text-blue-500">AL</span></h1>
          <div className="max-w-md">
            <h2 className="text-4xl font-bold mb-6 leading-tight">Sistema de Gestión de Horas de Servicio</h2>
            <p className="text-gray-300 mb-10">Registra, revisa y aprueba las horas de servicio de los estudiantes de Funval Internacional en una sola plataforma.</p>
            <ul className="space-y-4 text-sm text-gray-300">
              <li className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-blue-500"></span>Registro de horas con evidencias adjuntas</li>
              <li className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-green-500"></span>Revisión y aprobación centralizada</li>
              <li className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-blue-500"></span>Seguimiento de progreso en tiempo real</li>
            </ul>
          </div>
        </div>
        <p className="text-xs text-gray-500">© 2026 Funval Internacional · Plataforma institucional</p>
      </div>

      {/* Columna Derecha */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Iniciar sesión</h2>
          <p className="text-gray-500 text-sm mb-8">Accede con tu cuenta institucional</p>
          
          {/* Aquí inyectamos el componente del formulario */}
          <LoginForm />
          
        </div>
      </div>
    </div>
  );
}