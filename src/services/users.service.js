import api from "../api/axios";
import { ENDPOINTS } from "../api/endpoints";

export async function getUsers({ page = 1, pageSize = 10 } = {}) {
    const { data } = await api.get(ENDPOINTS.USERS.LIST, {
        params: { page, page_size: pageSize },
    });
    return data;
}

export async function createUser(user) {
    const { data } = await api.post(ENDPOINTS.USERS.LIST, user);
    return data;
}

export async function deleteUser(id) {
    await api.delete(ENDPOINTS.USERS.DETAIL(id));
}