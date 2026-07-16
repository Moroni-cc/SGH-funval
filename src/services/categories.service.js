import api from "../api/axios";
import { ENDPOINTS } from "../api/endpoints";

export async function getCategories() {
    const { data } = await api.get(ENDPOINTS.CATEGORIES.LIST);
    return data;
}

export async function createCategory(category) {
    const { data } = await api.post(ENDPOINTS.CATEGORIES.LIST, category);
    return data;
}

export async function updateCategory(id, changes) {
    const { data } = await api.patch(ENDPOINTS.CATEGORIES.DETAIL(id), changes);
    return data;
}

export async function deleteCategory(id) {
    await api.delete(ENDPOINTS.CATEGORIES.DETAIL(id));
}