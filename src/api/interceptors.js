import api from "./axios";

/**
 * Registra un interceptor de respuesta que reacciona ante un 401
 * (sesión inválida o expirada), útil para cerrar sesión en el cliente
 * cuando el backend rechaza la cookie/sesión en cualquier petición.
 */
export function setupInterceptors(onUnauthorized) {
    const interceptorId = api.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response?.status === 401) {
                onUnauthorized?.();
            }
            return Promise.reject(error);
        },
    );

    return () => api.interceptors.response.eject(interceptorId);
}
