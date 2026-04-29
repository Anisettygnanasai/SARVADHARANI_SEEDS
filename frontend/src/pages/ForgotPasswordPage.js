import React, { useState } from "react";
import { Link } from "react-router-dom";
import { requestForgotPasswordOtp, resetPasswordWithOtp } from "../services/authService";

export default function ForgotPasswordPage() {
  const [companyCode, setCompanyCode] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [message, setMessage] = useState("");

  const requestOtp = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      await requestForgotPasswordOtp({ email, company_code: companyCode });
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
      await resetPasswordWithOtp({ email, otp, new_password: newPassword, company_code: companyCode });
      setMessage("Password reset successful. You can login now.");
    } catch (err) {
      setMessage(err.response?.data?.message || "Password reset failed");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <form onSubmit={otpSent ? resetPassword : requestOtp} className="glass-card w-full max-w-md p-6 md:p-7">
        <h2 className="mb-4 text-2xl font-bold">Reset password</h2>
        {message && <p className="mb-2 rounded-lg bg-blue-50 px-3 py-2 text-sm text-slate-700">{message}</p>}
        <input className="input-premium mb-3" placeholder="Company Code" value={companyCode} onChange={(e) => setCompanyCode(e.target.value)} disabled={otpSent} />
        <input className="input-premium mb-3" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} disabled={otpSent} />
        {otpSent && (
          <>
            <input className="input-premium mb-3" placeholder="6-digit OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />
            <input className="input-premium mb-3" type="password" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
          </>
        )}
        <button className="btn-primary w-full">{otpSent ? "Reset Password" : "Send OTP"}</button>
        <p className="mt-3 text-sm"><Link className="font-medium text-blue-600" to="/login">Back to Login</Link></p>
      </form>
    </div>
  );
}
