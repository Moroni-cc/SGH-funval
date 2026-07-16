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
        COURSES: {
        LIST: "/courses/",
        DETAIL: (id) => `/courses/${id}`,
    },
        COUNTRIES: {
        LIST: "/countries/",
        DETAIL: (id) => `/countries/${id}`,
    },
};