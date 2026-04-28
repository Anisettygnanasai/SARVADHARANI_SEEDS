import api from "./api";

export const fetchTransactions = () => api.get("/transactions");
export const createTransaction = (payload) => api.post("/transactions", payload);
