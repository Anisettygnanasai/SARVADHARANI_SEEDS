import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import useAuth from "./hooks/useAuth";
import DashboardPage from "./pages/DashboardPage";
import LedgersPage from "./pages/LedgersPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import StockPage from "./pages/StockPage";
import TransactionsPage from "./pages/TransactionsPage";

function Layout({ children, user, onLogout }) {
  return (
    <div>
      <Navbar user={user} onLogout={onLogout} />
      <main className="mx-auto max-w-7xl p-4">{children}</main>
    </div>
  );
}

export default function App() {
  const { user, isAuthenticated, saveAuth, logout } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={<LoginPage onLogin={saveAuth} />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <Layout user={user} onLogout={logout}><DashboardPage user={user} /></Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/ledgers"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <Layout user={user} onLogout={logout}><LedgersPage /></Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/stocks"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <Layout user={user} onLogout={logout}><StockPage /></Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/transactions"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <Layout user={user} onLogout={logout}><TransactionsPage /></Layout>
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />} />
    </Routes>
  );
}
