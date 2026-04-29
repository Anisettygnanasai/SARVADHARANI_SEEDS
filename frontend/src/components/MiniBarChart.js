import React from "react";

export default function MiniBarChart({ data }) {
  const max = Math.max(...data.map((d) => d.value), 1);
  return (
    <div className="glass-card p-5">
      <h3 className="mb-4 text-base font-semibold text-slate-100">Transaction Type Mix</h3>
      <div className="space-y-3">
        {data.map((d) => (
          <div key={d.label}>
            <div className="mb-1 flex justify-between text-sm text-slate-200">
              <span className="capitalize">{d.label}</span>
              <span className="font-medium text-cyan-300">{d.value}</span>
            </div>
            <div className="h-2.5 rounded bg-slate-700/70">
              <div
                className="h-2.5 rounded bg-gradient-to-r from-cyan-400 to-blue-500 shadow-[0_0_10px_rgba(56,189,248,0.45)]"
                style={{ width: `${(d.value / max) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
