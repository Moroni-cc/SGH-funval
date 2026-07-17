import api from "../api/axios";
import { ENDPOINTS } from "../api/endpoints";

export async function getDashboardStats() {
  const { data } = await api.get(ENDPOINTS.DASHBOARD.STATS);
  return data;
}