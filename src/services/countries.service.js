import api from "../api/axios";
import { ENDPOINTS } from "../api/endpoints";

export async function getCountries() {
    const { data } = await api.get(ENDPOINTS.COUNTRIES.LIST);
    return data;
}

export async function createCountry(country) {
    const { data } = await api.post(ENDPOINTS.COUNTRIES.LIST, country);
    return data;
}

export async function updateCountry(id, changes) {
    const { data } = await api.patch(ENDPOINTS.COUNTRIES.DETAIL(id), changes);
    return data;
}

export async function deleteCountry(id) {
    await api.delete(ENDPOINTS.COUNTRIES.DETAIL(id));
}