import api from "./api";

export const fetchTransactions = () => api.get("/transactions");
export const createTransaction = (payload) => api.post("/transactions", payload);
export const updateTransaction = (id, payload) => api.put(`/transactions/${id}`, payload);
export const deleteTransaction = (id) => api.delete(`/transactions/${id}`);
