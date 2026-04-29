import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../services/authService";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ full_name: "", email: "", password: "", role: "accountant" });
  const [message, setMessage] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      await register(form);
      setMessage("Registration successful. Please login.");
      setTimeout(() => navigate("/login"), 800);
    } catch (err) {
      const serverMessage = err.response?.data?.message;
      const serverError = err.response?.data?.error;
      if (serverMessage || serverError) {
        setMessage(serverError ? `${serverMessage || "Request failed"}: ${serverError}` : serverMessage);
        return;
      }

      if (err.code === "ERR_NETWORK") {
        setMessage("Cannot connect to backend API. Verify backend is running on port 5000.");
        return;
      }

      setMessage(`Registration failed${err.response?.status ? ` (HTTP ${err.response.status})` : ""}. Please check backend logs.`);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <form onSubmit={submit} className="w-full max-w-md rounded-lg bg-white p-6 shadow">
        <h2 className="mb-4 text-xl font-bold">Register</h2>
        {message && <p className="mb-2 text-sm">{message}</p>}
        <input className="mb-3 w-full rounded border px-3 py-2" placeholder="Full Name" value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} />
        <input className="mb-3 w-full rounded border px-3 py-2" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input className="mb-3 w-full rounded border px-3 py-2" type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <select className="mb-3 w-full rounded border px-3 py-2" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
          <option value="accountant">Accountant</option>
          <option value="admin">Admin</option>
        </select>
        <button className="w-full rounded bg-blue-600 px-3 py-2 text-white">Create Account</button>
        <p className="mt-3 text-sm">Have account? <Link className="text-blue-600" to="/login">Login</Link></p>
      </form>
    </div>
  );
}
