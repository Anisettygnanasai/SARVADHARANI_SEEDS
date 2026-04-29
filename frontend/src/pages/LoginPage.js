import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../services/authService";

export default function LoginPage({ onLogin }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const { data } = await login(form);
      onLogin(data.access_token, data.user);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <form onSubmit={submit} className="glass-card w-full max-w-md p-6 md:p-7">
        <h2 className="mb-1 text-2xl font-bold">Welcome back</h2>
        <p className="mb-4 text-sm text-slate-500">Sign in to continue your accounting workflow.</p>
        {error && <p className="mb-2 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}
        <input className="input-premium mb-3" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input className="input-premium mb-3" type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <button className="btn-primary w-full">Sign In</button>
        <p className="mt-3 text-sm">No account? <Link className="font-medium text-blue-600" to="/register">Register</Link></p>
        <p className="mt-2 text-sm"><Link className="font-medium text-blue-600" to="/forgot-password">Forgot password?</Link></p>
      </form>
    </div>
  );
}
