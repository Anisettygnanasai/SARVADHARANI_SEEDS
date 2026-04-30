import api from "./api";

export const login = (payload) => api.post("/auth/login", payload);
export const fetchCompanies = () => api.get("/auth/companies");
export const fetchAdminCompanies = () => api.get("/auth/admin/companies");
export const createCompany = (payload) => api.post("/auth/admin/companies", payload);
export const updateCompany = (companyCode, payload) => api.put(`/auth/admin/companies/${companyCode}`, payload);
export const fetchPendingAccountants = () => api.get("/auth/admin/pending-accountants");
export const approveAccountant = (payload) => api.post("/auth/admin/approve-accountant", payload);
export const rejectAccountant = (payload) => api.post("/auth/admin/reject-accountant", payload);
export const inviteAdmin = (payload) => api.post("/auth/admin/invite", payload);
export const requestRegisterOtp = (payload) => api.post("/auth/register/request-otp", payload);
export const verifyRegisterOtp = (payload) => api.post("/auth/verify-otp", payload);
export const register = (payload) => api.post("/auth/register", payload);
export const requestForgotPasswordOtp = (payload) => api.post("/auth/forgot-password/request-otp", payload);
export const verifyForgotPasswordOtp = (payload) => api.post("/auth/forgot-password/verify-otp", payload);
export const resetPasswordWithOtp = (payload) => api.post("/auth/forgot-password/reset", payload);
