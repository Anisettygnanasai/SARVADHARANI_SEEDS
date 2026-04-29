import React, { useEffect, useMemo, useState } from "react";
import DataTable from "../components/DataTable";
import { createStock, deleteStock, fetchStocks, updateStock } from "../services/stockService";

export default function StockPage() {
  const [rows, setRows] = useState([]);
  const [form, setForm] = useState({ sku: "", name: "", quantity_on_hand: 0, unit_price: 0, unit: "pcs" });
  const [editing, setEditing] = useState(null);
  const userRole = useMemo(() => JSON.parse(localStorage.getItem("user") || "null")?.role, []);
  const isAdmin = userRole === "admin";

  const load = () => fetchStocks().then((res) => setRows(res.data));
  useEffect(() => { load(); }, []);

  const submit = async (e) => {
    e.preventDefault();
    if (editing) {
      await updateStock(editing.id, { name: form.name, unit: form.unit, unit_price: form.unit_price });
      setEditing(null);
    } else {
      await createStock(form);
    }
    setForm({ sku: "", name: "", quantity_on_hand: 0, unit_price: 0, unit: "pcs" });
    load();
  };

  const startEdit = (row) => {
    setEditing(row);
    setForm({ ...form, sku: row.sku, name: row.name, quantity_on_hand: row.quantity_on_hand, unit_price: row.unit_price, unit: row.unit });
  };

  const actions = [
    { label: "Edit", className: "btn-edit text-sm", onClick: startEdit },
    ...(isAdmin ? [{ label: "Delete", className: "btn-danger text-sm", onClick: async (row) => { await deleteStock(row.id); load(); } }] : []),
  ];

  return (
    <div className="space-y-4">
      <form onSubmit={submit} className="glass-card grid grid-cols-1 gap-3 p-4 md:p-5 md:grid-cols-5">
        <input className="input-premium" placeholder="SKU" value={form.sku} onChange={(e) => setForm({ ...form, sku: e.target.value })} disabled={Boolean(editing)} />
        <input className="input-premium" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input type="number" className="input-premium" placeholder="Quantity" value={form.quantity_on_hand} onChange={(e) => setForm({ ...form, quantity_on_hand: e.target.value })} disabled={Boolean(editing)} />
        <input type="number" className="input-premium" placeholder="Unit Price" value={form.unit_price} onChange={(e) => setForm({ ...form, unit_price: e.target.value })} />
        <input className="input-premium" placeholder="Unit" value={form.unit} onChange={(e) => setForm({ ...form, unit: e.target.value })} />
        <button className="btn-primary md:col-span-5">{editing ? "Update Stock" : "Save Stock"}</button>
      </form>
      <DataTable rows={rows} columns={[{ key: "sku", title: "SKU" }, { key: "name", title: "Name" }, { key: "quantity_on_hand", title: "Qty" }, { key: "unit_price", title: "Unit Price" }]} filterKey="unit" actions={actions} />
    </div>
  );
}
