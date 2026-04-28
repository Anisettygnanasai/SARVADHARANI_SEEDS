import React, { useEffect, useState } from "react";
import DataTable from "../components/DataTable";
import { fetchLedgers } from "../services/ledgerService";
import { fetchStocks } from "../services/stockService";
import { createTransaction, fetchTransactions } from "../services/transactionService";

export default function TransactionsPage() {
  const [rows, setRows] = useState([]);
  const [ledgers, setLedgers] = useState([]);
  const [stocks, setStocks] = useState([]);
  const [form, setForm] = useState({
    transaction_number: "",
    transaction_type: "sales",
    ledger_id: "",
    total_amount: 0,
    stock_item_id: "",
    quantity: 1,
    unit_price: 0,
  });

  const load = () => fetchTransactions().then((res) => setRows(res.data));
  useEffect(() => {
    load();
    fetchLedgers().then((res) => setLedgers(res.data));
    fetchStocks().then((res) => setStocks(res.data));
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    const payload = {
      transaction_number: form.transaction_number,
      transaction_type: form.transaction_type,
      ledger_id: Number(form.ledger_id),
      total_amount: form.total_amount,
      items: [
        {
          stock_item_id: Number(form.stock_item_id),
          quantity: Number(form.quantity),
          unit_price: Number(form.unit_price),
        },
      ],
    };

    await createTransaction(payload);
    setForm({ ...form, transaction_number: "", total_amount: 0 });
    load();
  };

  return (
    <div className="space-y-4">
      <form onSubmit={submit} className="grid grid-cols-1 gap-3 rounded-lg bg-white p-4 shadow md:grid-cols-4">
        <input className="rounded border px-3 py-2" placeholder="Transaction No" value={form.transaction_number} onChange={(e) => setForm({ ...form, transaction_number: e.target.value })} />
        <select className="rounded border px-3 py-2" value={form.transaction_type} onChange={(e) => setForm({ ...form, transaction_type: e.target.value })}>
          <option value="sales">Sales</option><option value="purchase">Purchase</option><option value="payment">Payment</option><option value="receipt">Receipt</option>
        </select>
        <select className="rounded border px-3 py-2" value={form.ledger_id} onChange={(e) => setForm({ ...form, ledger_id: e.target.value })}>
          <option value="">Select Ledger</option>
          {ledgers.map((l) => <option key={l.id} value={l.id}>{l.name}</option>)}
        </select>
        <input type="number" className="rounded border px-3 py-2" placeholder="Total Amount" value={form.total_amount} onChange={(e) => setForm({ ...form, total_amount: e.target.value })} />
        <select className="rounded border px-3 py-2" value={form.stock_item_id} onChange={(e) => setForm({ ...form, stock_item_id: e.target.value })}>
          <option value="">Select Stock</option>
          {stocks.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
        </select>
        <input type="number" className="rounded border px-3 py-2" placeholder="Qty" value={form.quantity} onChange={(e) => setForm({ ...form, quantity: e.target.value })} />
        <input type="number" className="rounded border px-3 py-2" placeholder="Unit Price" value={form.unit_price} onChange={(e) => setForm({ ...form, unit_price: e.target.value })} />
        <button className="rounded bg-blue-600 px-3 py-2 text-white">Save Transaction</button>
      </form>
      <DataTable rows={rows} columns={[
        { key: "transaction_number", title: "Number" },
        { key: "transaction_type", title: "Type" },
        { key: "ledger_id", title: "Ledger" },
        { key: "total_amount", title: "Amount" },
      ]} />
    </div>
  );
}
