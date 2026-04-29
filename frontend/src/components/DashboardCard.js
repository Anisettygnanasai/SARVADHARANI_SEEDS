import React from "react";

export default function DashboardCard({ title, value }) {
  return (
    <div className="glass-card p-5">
      <p className="text-sm font-medium text-slate-500">{title}</p>
      <p className="mt-2 text-3xl font-bold tracking-tight text-slate-800">{value}</p>
    </div>
  );
}
