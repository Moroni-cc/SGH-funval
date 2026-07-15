import { createContext, useState, useEffect, useCallback } from "react";
import { login as loginRequest, getProfile, logout as logoutRequest } from "../services/auth.service";
import { getStoredUser, setStoredUser, clearStoredUser } from "../utils/storage";
import { setupInterceptors } from "../api/interceptors";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => getStoredUser());
    // Solo hay algo que verificar si hubo un login previo guardado;
    // si no, arrancamos ya "verificados" (sin sesión).
    const [checkingAuth, setCheckingAuth] = useState(() => Boolean(getStoredUser()));

    const clearSession = useCallback(() => {
        setUser(null);
        clearStoredUser();
    }, []);

    // Reacciona ante un 401 disparado en cualquier petición (sesión expirada)
    useEffect(() => {
        const teardown = setupInterceptors(clearSession);
        return teardown;
    }, [clearSession]);

    // Restaura la sesión al cargar la app, pero solo si hubo un login previo
    // (evita disparar un GET /profile/me -> 401 innecesario en un /login "limpio").
    useEffect(() => {
        if (!checkingAuth) return undefined;

        let active = true;

        async function checkSession() {
            try {
                const profile = await getProfile();
                if (!active) return;
                setUser(profile);
                setStoredUser(profile);
            } catch {
                if (!active) return;
                clearSession();
            } finally {
                if (active) setCheckingAuth(false);
            }
        }

        checkSession();
        return () => {
            active = false;
        };
    }, [checkingAuth, clearSession]);

    async function login(credentials) {
        await loginRequest(credentials);
        const profile = await getProfile();
        setUser(profile);
        setStoredUser(profile);
        return profile;
    }

    async function logout() {
        try {
            await logoutRequest();
        } finally {
            clearSession();
        }
    }

    const value = {
        user,
        isAuthenticated: Boolean(user),
        checkingAuth,
        login,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}