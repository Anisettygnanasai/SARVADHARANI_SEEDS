import React, { useEffect, useMemo, useState } from "react";
import DashboardCard from "../components/DashboardCard";
import MiniBarChart from "../components/MiniBarChart";
import { fetchLedgers } from "../services/ledgerService";
import { fetchStocks } from "../services/stockService";
import { fetchTransactions } from "../services/transactionService";

export default function DashboardPage() {
  const [ledgers, setLedgers] = useState([]);
  const [stocks, setStocks] = useState([]);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    Promise.all([fetchLedgers(), fetchStocks(), fetchTransactions()]).then(([l, s, t]) => {
      setLedgers(l.data);
      setStocks(s.data);
      setTransactions(t.data);
    });
  }, []);

  const chartData = useMemo(() => {
    const agg = { sales: 0, purchase: 0, payment: 0, receipt: 0 };
    transactions.forEach((t) => {
      agg[t.transaction_type] += 1;
    });
    return Object.entries(agg).map(([label, value]) => ({ label, value }));
  }, [transactions]);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <DashboardCard title="Total Ledgers" value={ledgers.length} />
        <DashboardCard title="Stock Items" value={stocks.length} />
        <DashboardCard title="Transactions" value={transactions.length} />
      </div>
      <MiniBarChart data={chartData} />
    </div>
  );
}
