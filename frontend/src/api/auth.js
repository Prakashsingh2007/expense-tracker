import api from "./axios";

export const login = async (credentials) => {
    const response = await api.post("/accounts/login/", credentials);
    return response.data;
};

export const register = async (userData) => {
    const response = await api.post("/accounts/register/", userData);
    return response.data;
};