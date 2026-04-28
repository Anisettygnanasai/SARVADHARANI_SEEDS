import React, { useEffect, useState } from "react";
import DataTable from "../components/DataTable";
import { createLedger, fetchLedgers } from "../services/ledgerService";

export default function LedgersPage() {
  const [rows, setRows] = useState([]);
  const [form, setForm] = useState({ name: "", ledger_code: "", ledger_type: "customer", opening_balance: 0 });

  const load = () => fetchLedgers().then((res) => setRows(res.data));
  useEffect(() => { load(); }, []);

  const submit = async (e) => {
    e.preventDefault();
    await createLedger(form);
    setForm({ name: "", ledger_code: "", ledger_type: "customer", opening_balance: 0 });
    load();
  };

  return (
    <div className="space-y-4">
      <form onSubmit={submit} className="grid grid-cols-1 gap-3 rounded-lg bg-white p-4 shadow md:grid-cols-4">
        <input className="rounded border px-3 py-2" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input className="rounded border px-3 py-2" placeholder="Ledger Code" value={form.ledger_code} onChange={(e) => setForm({ ...form, ledger_code: e.target.value })} />
        <select className="rounded border px-3 py-2" value={form.ledger_type} onChange={(e) => setForm({ ...form, ledger_type: e.target.value })}>
          <option value="customer">Customer</option><option value="supplier">Supplier</option><option value="expense">Expense</option>
        </select>
        <input type="number" className="rounded border px-3 py-2" placeholder="Opening Balance" value={form.opening_balance} onChange={(e) => setForm({ ...form, opening_balance: e.target.value })} />
        <button className="rounded bg-blue-600 px-3 py-2 text-white md:col-span-4">Save Ledger</button>
      </form>
      <DataTable rows={rows} columns={[
        { key: "name", title: "Name" },
        { key: "ledger_code", title: "Code" },
        { key: "ledger_type", title: "Type" },
        { key: "current_balance", title: "Current Balance" },
      ]} filterKey="ledger_type" />
    </div>
  );
}
