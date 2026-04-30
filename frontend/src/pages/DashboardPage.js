import React, { useEffect, useMemo, useState } from "react";
import DashboardCard from "../components/DashboardCard";
import MiniBarChart from "../components/MiniBarChart";
import { fetchLedgers } from "../services/ledgerService";
import { fetchStocks } from "../services/stockService";
import { fetchTransactions } from "../services/transactionService";
import { approveAccountant, createCompany, deleteCompany, fetchAdminCompanies, fetchPendingAccountants, inviteAdmin, rejectAccountant, updateCompany } from "../services/authService";

export default function DashboardPage({ user }) {
  const isMainAdmin = Boolean(user?.is_main_admin);
  const [ledgers, setLedgers] = useState([]); const [stocks, setStocks] = useState([]); const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState("");
  const [pending, setPending] = useState([]); const [companies, setCompanies] = useState([]); const [msg, setMsg] = useState("");
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteCompanyCode, setInviteCompanyCode] = useState("");
  const [companyForm, setCompanyForm] = useState({ company_code: "", company_name: "" });

  const loadAdminData = () => Promise.all([fetchPendingAccountants(), fetchAdminCompanies()]).then(([p, c]) => { setPending(p.data || []); setCompanies(c.data || []); });

  useEffect(() => {
    if (isMainAdmin) { loadAdminData().catch((e) => setError(e.response?.data?.message || "Failed to load admin data")); return; }
    Promise.all([fetchLedgers(), fetchStocks(), fetchTransactions()]).then(([l, s, t]) => { setLedgers(l.data); setStocks(s.data); setTransactions(t.data); }).catch((err) => setError(err.response?.data?.message || "Failed to load dashboard"));
  }, [isMainAdmin]);

  const chartData = useMemo(() => {
    const agg = { sales: 0, purchase: 0, payment: 0, receipt: 0 };
    transactions.forEach((t) => { agg[t.transaction_type] += 1; });
    return Object.entries(agg).map(([label, value]) => ({ label, value }));
  }, [transactions]);

  const handleApprove = async (user_id) => { await approveAccountant({ user_id }); setMsg("Accountant approved"); loadAdminData(); };
  const handleReject = async (user_id) => { await rejectAccountant({ user_id }); setMsg("Accountant rejected"); loadAdminData(); };
  const handleInvite = async (e) => { e.preventDefault(); try { const { data } = await inviteAdmin({ email: inviteEmail, company_code: inviteCompanyCode || undefined }); setMsg(data.error ? `${data.message}: ${data.error}` : (data.message || `Invite token: ${data.token}`)); setInviteEmail(""); } catch (err) { const data = err.response?.data || {}; setMsg(data.error || data.message || "Invite failed"); } };
  const handleDeleteCompany = async (code) => { await deleteCompany(code); setMsg("Company deleted"); loadAdminData(); };
  const handleCreateCompany = async (e) => { e.preventDefault(); await createCompany(companyForm); setMsg("Company created"); setCompanyForm({ company_code: "", company_name: "" }); loadAdminData(); };
  const handleToggleCompany = async (code, isActive) => { await updateCompany(code, { is_active: !isActive }); setMsg("Company status updated"); loadAdminData(); };

  if (isMainAdmin) return (
    <div className="space-y-5">
      <h2 className="text-2xl font-semibold">Main Admin Control Center</h2>
      {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
      {msg && <p className="rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-700">{msg}</p>}

      <div className="glass-card p-4"><h3 className="mb-2 text-lg font-semibold">Pending Accountant Approvals</h3>{pending.length === 0 ? <p>No pending users.</p> : pending.map((u) => <div key={u.id} className="mb-2 flex items-center justify-between rounded-lg border border-white/10 p-2"><span>{u.full_name} ({u.email})</span><div className="flex gap-2"><button className="btn-primary" onClick={() => handleApprove(u.id)}>Approve</button><button className="btn-danger" onClick={() => handleReject(u.id)}>Reject</button></div></div>)}</div>

      <form className="glass-card p-4" onSubmit={handleInvite}><h3 className="mb-2 text-lg font-semibold">Invite Admin</h3><input className="input-premium mb-2" placeholder="Admin Gmail" value={inviteEmail} onChange={(e) => setInviteEmail(e.target.value)} /><select className="input-premium mb-2" value={inviteCompanyCode} onChange={(e) => setInviteCompanyCode(e.target.value)}><option value="">Use my company</option>{companies.map((c) => <option key={c.company_code} value={c.company_code}>{c.company_name} ({c.company_code})</option>)}</select><button className="btn-primary">Send Invite Email</button></form>

      <form className="glass-card p-4" onSubmit={handleCreateCompany}><h3 className="mb-2 text-lg font-semibold">Create Company</h3><input className="input-premium mb-2" placeholder="Company Code" value={companyForm.company_code} onChange={(e) => setCompanyForm({ ...companyForm, company_code: e.target.value.toUpperCase() })} /><input className="input-premium mb-2" placeholder="Company Name" value={companyForm.company_name} onChange={(e) => setCompanyForm({ ...companyForm, company_name: e.target.value })} /><button className="btn-primary">Create Company</button></form>

      <div className="glass-card p-4"><h3 className="mb-2 text-lg font-semibold">Manage Companies</h3>{companies.map((c) => <div key={c.company_code} className="mb-2 flex items-center justify-between rounded-lg border border-white/10 p-2"><span>{c.company_name} ({c.company_code}) - {c.is_active ? "Active" : "Inactive"}</span><div className="flex gap-2"><button className={c.is_active ? "btn-danger" : "btn-primary"} onClick={() => handleToggleCompany(c.company_code, c.is_active)}>{c.is_active ? "Deactivate" : "Activate"}</button><button className="btn-danger" onClick={() => handleDeleteCompany(c.company_code)}>Delete</button></div></div>)}</div>
    </div>
  );

  return (
    <div className="space-y-5">
      {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3"><DashboardCard title="Total Ledgers" value={ledgers.length} /><DashboardCard title="Stock Items" value={stocks.length} /><DashboardCard title="Transactions" value={transactions.length} /></div>
      <MiniBarChart data={chartData} />
    </div>
  );
}
