import api from "../api/axios";
import { ENDPOINTS } from "../api/endpoints";

export async function getReports({ status, studentId, page = 1, pageSize = 10 } = {}) {
    const params = { page, page_size: pageSize };
    if (status) params.status = status;
    if (studentId) params.student_id = studentId;

    const { data } = await api.get(ENDPOINTS.REPORTS.LIST, { params });
    return data;
}

export async function getReportStatuses() {
    const { data } = await api.get(ENDPOINTS.ENUMS.REPORT_STATUSES);
    return data;
}

export async function getReport(id) {
    const { data } = await api.get(ENDPOINTS.REPORTS.DETAIL(id));
    return data;
}
export async function createReport({ hours_spent, category_id, description, evidence }) {
    const formData = new FormData();
    formData.append("hours_spent", hours_spent);
    formData.append("category_id", category_id);
    formData.append("description", description);
    formData.append("evidence", evidence);

    const { data } = await api.post(ENDPOINTS.REPORTS.LIST, formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
}

export async function updateReport(id, { hours_spent, category_id, description, file }) {
    if (file) {
        const formData = new FormData();
        formData.append("hours_spent", hours_spent);
        formData.append("category_id", category_id);
        formData.append("description", description);
        formData.append("file", file);

        const { data } = await api.patch(ENDPOINTS.REPORTS.DETAIL(id), formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return data;
    }

    const { data } = await api.patch(ENDPOINTS.REPORTS.DETAIL(id), {
        hours_spent,
        category_id,
        description,
    });
    return data;
}