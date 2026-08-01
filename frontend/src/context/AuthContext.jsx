import { useState } from "react";
import { AuthContext } from "./authContext";

export function AuthProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem("access") || null);

    const login = ({ access, refresh } = {}) => {
        if (access) {
            localStorage.setItem("access", access);
            setToken(access);
        }

        if (refresh) {
            localStorage.setItem("refresh", refresh);
        }
    };

    const logout = () => {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}