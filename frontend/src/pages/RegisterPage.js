import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { fetchCompanies, register, requestRegisterOtp } from "../services/authService";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ full_name: "", email: "", password: "", company_code: "", company_name: "" });
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [message, setMessage] = useState("");
  const [companies, setCompanies] = useState([]);

  useEffect(() => { fetchCompanies().then(({data}) => setCompanies(data || [])).catch(() => setCompanies([])); }, []);

  const sendOtp = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      await requestRegisterOtp(form);
      setOtpSent(true);
      setMessage("OTP sent to your email. Enter OTP to complete registration.");
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to send OTP");
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      await register({ full_name: form.full_name, email: form.email, password: form.password, otp, company_code: form.company_code });
      setMessage("Registration successful. Please login.");
      setTimeout(() => navigate("/login"), 800);
    } catch (err) {
      setMessage(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <form onSubmit={otpSent ? submit : sendOtp} className="glass-card w-full max-w-md p-6 md:p-7">
        <h2 className="mb-4 text-2xl font-bold">Create account</h2>
        {message && <p className="mb-2 rounded-lg bg-blue-50 px-3 py-2 text-sm text-slate-700">{message}</p>}
        <input className="input-premium mb-3" placeholder="Full Name" value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} disabled={otpSent} />
        <input className="input-premium mb-3" placeholder="Email (Gmail only)" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} disabled={otpSent} />
        <input className="input-premium mb-3" type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} disabled={otpSent} />
        <select className="input-premium mb-3" value={form.company_code} onChange={(e) => { const selected = companies.find((c) => c.company_code === e.target.value); setForm({ ...form, company_code: e.target.value, company_name: selected?.company_name || "" }); }} disabled={otpSent}><option value="">Select Company</option>{companies.map((c) => <option key={c.company_code} value={c.company_code}>{c.company_name} ({c.company_code})</option>)}</select>
        {otpSent && <input className="input-premium mb-3" placeholder="Enter 6-digit OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />}
        <button className="btn-primary w-full">{otpSent ? "Verify OTP & Create Account" : "Send OTP"}</button>
        <button type="button" className="mt-2 w-full rounded-lg border border-white/20 px-4 py-2 text-sm" onClick={() => setMessage("Google login will be enabled after OAuth client setup.")}>Continue with Google</button>
        <p className="mt-3 text-sm">Have account? <Link className="font-medium text-blue-600" to="/login">Login</Link></p>
      </form>
    </div>
  );
}
