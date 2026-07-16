export const ENDPOINTS = {
    AUTH: {
        LOGIN: "/auth/login",
        LOGOUT: "/auth/logout",
    },
    PROFILE: {
        ME: "/profile/me",
    },
    CATEGORIES: {
        LIST: "/categories/",
        DETAIL: (id) => `/categories/${id}`,
    },
};