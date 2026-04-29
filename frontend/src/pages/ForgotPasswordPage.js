import React, { useState } from "react";
import { Link } from "react-router-dom";
import { requestForgotPasswordOtp, resetPasswordWithOtp } from "../services/authService";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [message, setMessage] = useState("");

  const requestOtp = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      await requestForgotPasswordOtp({ email });
      setOtpSent(true);
      setMessage("OTP sent to your email.");
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to send OTP");
    }
  };

  const resetPassword = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      await resetPasswordWithOtp({ email, otp, new_password: newPassword });
      setMessage("Password reset successful. You can login now.");
    } catch (err) {
      setMessage(err.response?.data?.message || "Password reset failed");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <form onSubmit={otpSent ? resetPassword : requestOtp} className="w-full max-w-md rounded-lg bg-white p-6 shadow">
        <h2 className="mb-4 text-xl font-bold">Forgot Password</h2>
        {message && <p className="mb-2 text-sm">{message}</p>}
        <input className="mb-3 w-full rounded border px-3 py-2" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} disabled={otpSent} />
        {otpSent && (
          <>
            <input className="mb-3 w-full rounded border px-3 py-2" placeholder="6-digit OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />
            <input className="mb-3 w-full rounded border px-3 py-2" type="password" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
          </>
        )}
        <button className="w-full rounded bg-blue-600 px-3 py-2 text-white">{otpSent ? "Reset Password" : "Send OTP"}</button>
        <p className="mt-3 text-sm"><Link className="text-blue-600" to="/login">Back to Login</Link></p>
      </form>
    </div>
  );
}
