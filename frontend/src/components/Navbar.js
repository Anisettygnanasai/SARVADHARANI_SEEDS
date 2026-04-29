import React from "react";
import { Link, useLocation } from "react-router-dom";

const links = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/ledgers", label: "Ledgers" },
  { to: "/stocks", label: "Stock" },
  { to: "/transactions", label: "Transactions" },
];

export default function Navbar({ user, onLogout }) {
  const location = useLocation();
  return (
    <header className="sticky top-0 z-50 border-b border-white/60 bg-white/50 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3">
        <h1 className="text-xl font-semibold tracking-tight text-slate-800">Accounting ERP</h1>
        <nav className="flex flex-wrap gap-2">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`rounded-xl px-3 py-2 text-sm font-medium transition ${location.pathname === link.to ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-200" : "text-slate-700 hover:bg-white/70"}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <span className="rounded-xl bg-white/70 px-3 py-2 text-xs text-slate-700 md:text-sm">{user?.full_name} ({user?.role})</span>
          <button className="btn-danger text-sm" onClick={onLogout}>Logout</button>
        </div>
      </div>
    </header>
  );
}
