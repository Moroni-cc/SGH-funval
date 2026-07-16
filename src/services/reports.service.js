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