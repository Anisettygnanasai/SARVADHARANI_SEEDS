import React from "react";
import { Link, useLocation } from "react-router-dom";
import { BarChart3, BookOpenText, Boxes, ArrowRightLeft, LogOut } from "lucide-react";

const links = [
  { to: "/dashboard", label: "Dashboard", icon: BarChart3 },
  { to: "/ledgers", label: "Ledgers", icon: BookOpenText },
  { to: "/stocks", label: "Stock", icon: Boxes },
  { to: "/transactions", label: "Transactions", icon: ArrowRightLeft },
];

export default function Navbar({ user, onLogout }) {
  const location = useLocation();
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3">
        <h1 className="text-xl font-semibold tracking-tight text-slate-100">Accounting ERP</h1>
        <nav className="flex flex-wrap gap-2">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition ${location.pathname === link.to ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-blue-500/30" : "text-slate-300 hover:bg-slate-800/70"}`}
              >
                <Icon size={16} />
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-3">
          <span className="rounded-xl border border-white/10 bg-slate-900/70 px-3 py-2 text-xs text-slate-200 md:text-sm">{user?.full_name} ({user?.role})</span>
          <button className="btn-danger text-sm" onClick={onLogout}><LogOut size={16} />Logout</button>
        </div>
      </div>
    </header>
  );
}
