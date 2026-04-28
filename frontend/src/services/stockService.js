import api from "./api";

export const fetchStocks = () => api.get("/stocks");
export const createStock = (payload) => api.post("/stocks", payload);
export const updateStock = (id, payload) => api.put(`/stocks/${id}`, payload);
export const deleteStock = (id) => api.delete(`/stocks/${id}`);
