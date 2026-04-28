import React from "react";

export default function MiniBarChart({ data }) {
  const max = Math.max(...data.map((d) => d.value), 1);
  return (
    <div className="rounded-lg bg-white p-4 shadow">
      <h3 className="mb-4 text-sm font-medium">Transaction Type Mix</h3>
      <div className="space-y-2">
        {data.map((d) => (
          <div key={d.label}>
            <div className="flex justify-between text-xs"><span>{d.label}</span><span>{d.value}</span></div>
            <div className="h-2 rounded bg-slate-200">
              <div className="h-2 rounded bg-blue-600" style={{ width: `${(d.value / max) * 100}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
