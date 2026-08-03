import api from "./axios";

export const getProfile = async () => {
  const response = await api.get("/accounts/profile/");
  return response.data;
};

export const updateProfile = async (profileData) => {
  // If profileData is FormData (for file uploads), don't set Content-Type
  // Axios will handle it correctly
  const response = await api.patch("/accounts/profile/", profileData, {
    headers: profileData instanceof FormData ? {} : {}
  });
  return response.data;
};

export const changePassword = async (passwordData) => {
  const response = await api.post("/accounts/change-password/", passwordData);
  return response.data;
};