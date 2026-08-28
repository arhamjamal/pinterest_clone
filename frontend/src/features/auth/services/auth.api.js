import apiClient from "../../../lib/api/client";

export const signup = async (userData) => {
  return apiClient("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify(userData),
  });
};

export const login = async (credentials) => {
  return apiClient("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
};

export const logout = async () => {
  return apiClient("/api/auth/logout", {
    method: "POST",
  });
};

export const getCurrentUser = async () => {
  return apiClient("/api/auth/me", {
    method: "GET",
  });
};