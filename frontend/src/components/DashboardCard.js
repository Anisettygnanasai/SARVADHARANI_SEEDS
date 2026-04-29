import React from "react";

export default function DashboardCard({ title, value }) {
  return (
    <div className="glass-card p-5">
      <p className="text-sm font-semibold tracking-wide text-slate-300">{title}</p>
      <p className="mt-2 text-3xl font-bold tracking-tight text-cyan-300 drop-shadow-[0_0_12px_rgba(56,189,248,0.35)]">{value}</p>
    </div>
  );
}
