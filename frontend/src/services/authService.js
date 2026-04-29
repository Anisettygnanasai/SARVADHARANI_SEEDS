import api from "./api";

export const login = (payload) => api.post("/auth/login", payload);
export const requestRegisterOtp = (payload) => api.post("/auth/register/request-otp", payload);
export const register = (payload) => api.post("/auth/register", payload);
export const requestForgotPasswordOtp = (payload) => api.post("/auth/forgot-password/request-otp", payload);
export const resetPasswordWithOtp = (payload) => api.post("/auth/forgot-password/verify-otp", payload);
