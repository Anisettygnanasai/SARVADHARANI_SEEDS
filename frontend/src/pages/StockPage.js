import React, { useEffect, useState } from "react";
import DataTable from "../components/DataTable";
import { createStock, fetchStocks } from "../services/stockService";

export default function StockPage() {
  const [rows, setRows] = useState([]);
  const [form, setForm] = useState({ sku: "", name: "", quantity_on_hand: 0, unit_price: 0, unit: "pcs" });

  const load = () => fetchStocks().then((res) => setRows(res.data));
  useEffect(() => { load(); }, []);

  const submit = async (e) => {
    e.preventDefault();
    await createStock(form);
    setForm({ sku: "", name: "", quantity_on_hand: 0, unit_price: 0, unit: "pcs" });
    load();
  };

  return (
    <div className="space-y-4">
      <form onSubmit={submit} className="grid grid-cols-1 gap-3 rounded-lg bg-white p-4 shadow md:grid-cols-5">
        <input className="rounded border px-3 py-2" placeholder="SKU" value={form.sku} onChange={(e) => setForm({ ...form, sku: e.target.value })} />
        <input className="rounded border px-3 py-2" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input type="number" className="rounded border px-3 py-2" placeholder="Quantity" value={form.quantity_on_hand} onChange={(e) => setForm({ ...form, quantity_on_hand: e.target.value })} />
        <input type="number" className="rounded border px-3 py-2" placeholder="Unit Price" value={form.unit_price} onChange={(e) => setForm({ ...form, unit_price: e.target.value })} />
        <input className="rounded border px-3 py-2" placeholder="Unit" value={form.unit} onChange={(e) => setForm({ ...form, unit: e.target.value })} />
        <button className="rounded bg-blue-600 px-3 py-2 text-white md:col-span-5">Save Stock</button>
      </form>
      <DataTable rows={rows} columns={[
        { key: "sku", title: "SKU" },
        { key: "name", title: "Name" },
        { key: "quantity_on_hand", title: "Qty" },
        { key: "unit_price", title: "Unit Price" },
      ]} filterKey="unit" />
    </div>
  );
}
