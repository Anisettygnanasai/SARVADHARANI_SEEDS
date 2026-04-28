import api from "./api";

export const fetchLedgers = () => api.get("/ledgers");
export const createLedger = (payload) => api.post("/ledgers", payload);
export const updateLedger = (id, payload) => api.put(`/ledgers/${id}`, payload);
export const deleteLedger = (id) => api.delete(`/ledgers/${id}`);
