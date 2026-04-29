import React, { useEffect, useMemo, useState } from "react";
import DataTable from "../components/DataTable";
import { createLedger, deleteLedger, fetchLedgers, updateLedger } from "../services/ledgerService";

export default function LedgersPage() {
  const [rows, setRows] = useState([]);
  const [form, setForm] = useState({ name: "", ledger_code: "", ledger_type: "customer", opening_balance: 0 });
  const [editing, setEditing] = useState(null);
  const userRole = useMemo(() => JSON.parse(localStorage.getItem("user") || "null")?.role, []);
  const isAdmin = userRole === "admin";

  const load = () => fetchLedgers().then((res) => setRows(res.data));
  useEffect(() => { load(); }, []);

  const submit = async (e) => {
    e.preventDefault();
    if (editing) {
      await updateLedger(editing.id, { name: form.name, ledger_type: form.ledger_type });
      setEditing(null);
    } else {
      await createLedger(form);
    }
    setForm({ name: "", ledger_code: "", ledger_type: "customer", opening_balance: 0 });
    load();
  };

  const startEdit = (row) => {
    setEditing(row);
    setForm({ ...form, name: row.name, ledger_code: row.ledger_code, ledger_type: row.ledger_type, opening_balance: row.opening_balance });
  };

  const actions = [
    { label: "Edit", className: "btn-edit text-sm", onClick: startEdit },
    ...(isAdmin ? [{ label: "Delete", className: "btn-danger text-sm", onClick: async (row) => { await deleteLedger(row.id); load(); } }] : []),
  ];

  return (
    <div className="space-y-4">
      <form onSubmit={submit} className="glass-card grid grid-cols-1 gap-3 p-4 md:p-5 md:grid-cols-4">
        <input className="input-premium" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input className="input-premium" placeholder="Ledger Code" value={form.ledger_code} onChange={(e) => setForm({ ...form, ledger_code: e.target.value })} disabled={Boolean(editing)} />
        <select className="input-premium" value={form.ledger_type} onChange={(e) => setForm({ ...form, ledger_type: e.target.value })}>
          <option value="customer">Customer</option><option value="supplier">Supplier</option><option value="expense">Expense</option>
        </select>
        <input type="number" className="input-premium" placeholder="Opening Balance" value={form.opening_balance} onChange={(e) => setForm({ ...form, opening_balance: e.target.value })} disabled={Boolean(editing)} />
        <button className="btn-primary md:col-span-4">{editing ? "Update Ledger" : "Save Ledger"}</button>
      </form>
      <DataTable rows={rows} columns={[{ key: "name", title: "Name" }, { key: "ledger_code", title: "Code" }, { key: "ledger_type", title: "Type" }, { key: "current_balance", title: "Current Balance" }]} filterKey="ledger_type" actions={actions} />
    </div>
  );
}
