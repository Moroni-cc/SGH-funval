// Asegúrate de importar la instancia de axios que tu equipo configuró
import { axiosInstance } from '../api/axios'; 
import { API_ENDPOINTS } from '../api/endpoints';

export const loginService = async (credentials) => {
  // axiosInstance ya debería tener configurado la baseURL y withCredentials: true
  const response = await axiosInstance.post(API_ENDPOINTS.AUTH.LOGIN, credentials);
  return response.data;
};