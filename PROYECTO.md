# SGH-Funval — Documentación del Proyecto Grupal

## ¿Qué es este proyecto?

**SGH-Funval** es un Sistema de Gestión de Horas (SGH) desarrollado para la organización Funval. Permite a estudiantes registrar sus horas de servicio comunitario y a administradores revisarlas, aprobarlas o rechazarlas.

Está construido con **React + Vite** en el frontend y consume una **API REST externa** en `https://www.hs-api.devfunval.cloud`. Está desplegado en **Vercel** en `https://sgh-funval.vercel.app`.

---

## Roles del sistema

| Rol | Acceso |
|---|---|
| **Estudiante** | Registrar horas, ver sus reportes, editar reportes pendientes, ver su perfil |
| **Administrador** | Ver todos los reportes, aprobar/rechazar, gestionar usuarios, categorías, cursos, países, estadísticas |

---

## Estructura técnica

```
src/
├── api/           # Configuración de axios y endpoints
├── components/    # Componentes reutilizables (forms, tables, modals, ui)
├── context/       # AuthContext, ToastContext
├── hooks/         # useAuth, useFetch, usePagination, useReports, useToast
├── layouts/       # AdminLayout, StudentLayout, AuthLayout
├── pages/         # Vistas por rol (admin/, student/, auth/, profile/)
├── routes/        # Rutas protegidas por rol
├── services/      # Llamadas a la API (reports, users, categories, etc.)
└── utils/         # Helpers, validadores, formateadores
```

---

## Quién hizo qué

### Moroni Capcha — Líder del proyecto / Arquitectura base
**Fue la pieza clave del equipo.** Supervisó y revisó el trabajo de todos los integrantes, tomó las decisiones técnicas principales y marcó la dirección del proyecto desde el inicio hasta el final. Sin su guía el equipo no hubiera sabido qué construir ni cómo estructurarlo.

- Creó la estructura inicial del proyecto y las carpetas
- Configuró el deploy en Vercel (vercel.json con proxy a la API)
- Implementó el login con autenticación por rol
- CRUD de categorías (con Fabian/Ricardo)
- CRUD de cursos
- CRUD de países
- Correcciones en formularios (CategoryForm, CourseForm)
- Historial de reportes del estudiante
- Administración y revisión de todos los pull requests del equipo
- Supervisión y revisión del código de cada integrante

### Ricardo Miranda — Frontend / UI / CRUD
- Sistema de rutas protegidas por rol (`PublicRoute`, `RolRoute`, `ProtectedRoute`)
- Componente `Pagination` y hook `usePagination`
- Sistema de notificaciones `Toast` con contexto y hook `useToast`
- CRUD completo de categorías (formulario, modal de eliminación)
- CRUD de países con validación de código ISO
- Listado de reportes con filtros, paginación y badges de estado
- Listado y gestión de usuarios (paginación, eliminación)
- Formulario de creación de usuario con validación de dominio `@funval.com`
- Fix del sidebar (links, SPA fallback en Vercel)
- Estilos de cards en dashboard, categorías, cursos, países
- Vista de usuarios con cards y avatares
- Fix de selects con data real en registrar horas
- Fix de CategoryForm y CourseForm en producción
- Eliminar `getReport` no utilizado

### Fabian Coloma — Vistas de estudiante / Perfil / Login
- Pantalla de login con validaciones y conexión inicial a la API
- Vistas de perfil (información personal y cambio de contraseña)
- Dashboard del estudiante con métricas y progreso del curso
- Listado de mis reportes (`MyReportsTable`)
- Edición de reporte pendiente (`EditReport`)
- Vista de mis horas (`MyHours`)
- Diseño del login
- Alineación de vista de usuarios en panel admin

### Thalia (Vynes Villar) — UI / Layout / Dashboard admin
- Layout principal: Sidebar y Navbar
- Badge de estado de reportes (componente reutilizable)
- Dashboard de administrador con estadísticas
- Módulo de estadísticas admin (Statistics.jsx)
- Fix del estado activo del sidebar
- Ajustes generales de sidebar

### Jose Guadalupe Jiménez — Panel de revisión / Formularios
- Panel de revisión de reportes del administrador
- Mejoras de diseño en vistas
- Formulario de crear reportes (reemplazo de código dañado)
- Actualización de rutas en el router

---

## Flujo principal de la aplicación

```
Login
  ├── Rol ADMIN → Dashboard Admin
  │     ├── Revisión de solicitudes (aprobar/rechazar reportes)
  │     ├── Usuarios (CRUD)
  │     ├── Categorías (CRUD)
  │     ├── Cursos (CRUD)
  │     ├── Países (CRUD)
  │     └── Estadísticas
  │
  └── Rol ESTUDIANTE → Dashboard Estudiante
        ├── Registrar horas (crear reporte)
        ├── Mis reportes (ver y editar pendientes)
        ├── Mis horas
        └── Mi perfil (editar datos y contraseña)
```

---

## Conexión con la API

- **axios** configurado con `baseURL: "/api/v1"` y `withCredentials: true` (usa cookies de sesión)
- Vercel proxea `/api/*` → `https://www.hs-api.devfunval.cloud/api/*`
- Vite proxea `/api/*` → `https://www.hs-api.devfunval.cloud` en desarrollo local
- Un interceptor de respuesta detecta el error 401 y cierra la sesión automáticamente

---

## Tecnologías usadas

| Tecnología | Para qué |
|---|---|
| React 18 | UI con componentes y hooks |
| React Router v6 | Navegación y rutas protegidas |
| Axios | Peticiones HTTP a la API |
| Vite | Bundler y servidor de desarrollo |
| Tailwind CSS | Estilos |
| Vercel | Hosting y proxy a la API |
