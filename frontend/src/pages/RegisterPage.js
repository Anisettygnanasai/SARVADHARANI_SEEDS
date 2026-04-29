import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register, requestRegisterOtp } from "../services/authService";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ full_name: "", email: "", password: "", role: "accountant" });
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [message, setMessage] = useState("");

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
      await register({ email: form.email, otp });
      setMessage("Registration successful. Please login.");
      setTimeout(() => navigate("/login"), 800);
    } catch (err) {
      setMessage(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <form onSubmit={otpSent ? submit : sendOtp} className="w-full max-w-md rounded-lg bg-white p-6 shadow">
        <h2 className="mb-4 text-xl font-bold">Register</h2>
        {message && <p className="mb-2 text-sm">{message}</p>}
        <input className="mb-3 w-full rounded border px-3 py-2" placeholder="Full Name" value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} disabled={otpSent} />
        <input className="mb-3 w-full rounded border px-3 py-2" placeholder="Email (gmail/yahoo)" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} disabled={otpSent} />
        <input className="mb-3 w-full rounded border px-3 py-2" type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} disabled={otpSent} />
        <select className="mb-3 w-full rounded border px-3 py-2" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} disabled={otpSent}>
          <option value="accountant">Accountant</option>
          <option value="admin">Admin</option>
        </select>
        {otpSent && <input className="mb-3 w-full rounded border px-3 py-2" placeholder="Enter 6-digit OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />}
        <button className="w-full rounded bg-blue-600 px-3 py-2 text-white">{otpSent ? "Verify OTP & Create Account" : "Send OTP"}</button>
        <p className="mt-3 text-sm">Have account? <Link className="text-blue-600" to="/login">Login</Link></p>
      </form>
    </div>
  );
}
