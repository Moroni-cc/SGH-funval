import api from "../api/axios";
import { ENDPOINTS } from "../api/endpoints";

export async function getCourses() {
    const { data } = await api.get(ENDPOINTS.COURSES.LIST);
    return data;
}

export async function createCourse(course) {
    const { data } = await api.post(ENDPOINTS.COURSES.LIST, course);
    return data;
}

export async function updateCourse(id, changes) {
    const { data } = await api.patch(ENDPOINTS.COURSES.DETAIL(id), changes);
    return data;
}

export async function deleteCourse(id) {
    await api.delete(ENDPOINTS.COURSES.DETAIL(id));
}