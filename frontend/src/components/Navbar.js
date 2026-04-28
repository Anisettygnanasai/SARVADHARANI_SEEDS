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
    <header className="bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between p-4">
        <h1 className="text-xl font-semibold">Accounting ERP</h1>
        <nav className="flex gap-3">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`rounded px-3 py-2 text-sm ${location.pathname === link.to ? "bg-blue-600 text-white" : "text-slate-700"}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <span className="text-sm">{user?.full_name} ({user?.role})</span>
          <button className="rounded bg-red-500 px-3 py-2 text-sm text-white" onClick={onLogout}>Logout</button>
        </div>
      </div>
    </header>
  );
}
