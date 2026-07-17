import api from "../api/axios";
import { ENDPOINTS } from "../api/endpoints";

/**
 * Autentica al usuario. El backend responde estableciendo una cookie
 * de sesión (withCredentials), por lo que no se maneja token manualmente.
 */
export async function login({ email, password }) {
  const { data } = await api.post(ENDPOINTS.AUTH.LOGIN, { email, password });
  return data;
}

/**
 * Obtiene el perfil del usuario autenticado (incluye su rol),
 * usado tanto tras el login como para restaurar la sesión al recargar.
 */
export async function getProfile() {
  const { data } = await api.get(ENDPOINTS.PROFILE.ME);
  console.log(data);
  return data;
}

export async function logout() {
  await api.post(ENDPOINTS.AUTH.LOGOUT);
}

