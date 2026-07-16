function AuthLayout({ children }) {
    return (
        <div className="flex min-h-screen bg-slate-50 font-sans">
            
            {/* PANEL IZQUIERDO (Color azul corporativo corregido) */}
            <div className="hidden lg:flex lg:w-1/2 bg-[#172a4d] text-white p-12 flex-col justify-between">
                <div>
                    {/* Logo corregido: FUN en blanco, VAL en celeste */}
                    <div className="text-2xl font-bold tracking-widest mb-16">
                        <span className="text-white">FUN</span><span className="text-blue-400">VAL</span>
                    </div>
                    
                    <h1 className="text-4xl xl:text-5xl font-bold leading-tight mb-6">
                        Sistema de Gestión de<br />Horas de Servicio
                    </h1>
                    
                    <p className="text-lg text-slate-300 mb-10 max-w-md">
                        Registra, revisa y aprueba las horas de servicio de los estudiantes de Funval Internacional en una sola plataforma.
                    </p>
                    
                    <ul className="space-y-4 text-slate-300">
                        <li className="flex items-center gap-3">
                            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                            Registro de horas con evidencias adjuntas
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="w-2 h-2 rounded-full bg-green-500"></span>
                            Revisión y aprobación centralizada
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                            Seguimiento de progreso en tiempo real
                        </li>
                    </ul>
                </div>
                
                <div className="text-sm text-slate-400">
                    © 2026 Funval Internacional · Plataforma institucional
                </div>
            </div>

            {/* PANEL DERECHO */}
            <div className="flex-1 flex items-center justify-center p-6 md:p-12">
                <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 sm:p-10 border border-gray-100">
                    
                    {/* AQUÍ SE INYECTA EL FORMULARIO */}
                    {children}
                    
                </div>
            </div>

        </div>
    );
}

export default AuthLayout;