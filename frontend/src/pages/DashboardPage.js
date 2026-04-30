import React, { useEffect, useMemo, useState } from "react";
import DashboardCard from "../components/DashboardCard";
import MiniBarChart from "../components/MiniBarChart";
import { fetchLedgers } from "../services/ledgerService";
import { fetchStocks } from "../services/stockService";
import { fetchTransactions } from "../services/transactionService";

export default function DashboardPage({ user }) {
  const isMainAdmin = Boolean(user?.is_main_admin);
  const [ledgers, setLedgers] = useState([]);
  const [stocks, setStocks] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isMainAdmin) return;
    Promise.all([fetchLedgers(), fetchStocks(), fetchTransactions()])
      .then(([l, s, t]) => {
        setLedgers(l.data);
        setStocks(s.data);
        setTransactions(t.data);
      })
      .catch((err) => setError(err.response?.data?.message || "Failed to load dashboard"));
  }, [isMainAdmin]);

  const chartData = useMemo(() => {
    const agg = { sales: 0, purchase: 0, payment: 0, receipt: 0 };
    transactions.forEach((t) => {
      agg[t.transaction_type] += 1;
    });
    return Object.entries(agg).map(([label, value]) => ({ label, value }));
  }, [transactions]);

  if (isMainAdmin) {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Main Admin Control Center</h2>
        <p className="text-slate-300">You can manage companies, approve/reject accountant requests, and invite admins.</p>
        <div className="rounded-xl border border-white/10 bg-slate-900/60 p-4 text-sm text-slate-200">
          Use these APIs from your admin tools/UI integration:<br />
          • GET /api/auth/admin/pending-accountants<br />
          • POST /api/auth/admin/approve-accountant<br />
          • POST /api/auth/admin/reject-accountant<br />
          • POST /api/auth/admin/invite<br />
          • POST /api/auth/admin/companies<br />
          • PUT /api/auth/admin/companies/:company_code
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <DashboardCard title="Total Ledgers" value={ledgers.length} />
        <DashboardCard title="Stock Items" value={stocks.length} />
        <DashboardCard title="Transactions" value={transactions.length} />
      </div>
      <MiniBarChart data={chartData} />
    </div>
  );
}
