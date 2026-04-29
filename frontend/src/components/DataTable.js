import React, { useMemo, useState } from "react";
import { Search } from "lucide-react";

export default function DataTable({ rows, columns, filterKey, actions, rowKey = "id" }) {
  const [query, setQuery] = useState("");
  const [filterValue, setFilterValue] = useState("all");

  const filterOptions = useMemo(() => {
    if (!filterKey) return [];
    return Array.from(new Set(rows.map((r) => String(r[filterKey] ?? "")).filter(Boolean)));
  }, [rows, filterKey]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows.filter((r) => {
      const searchMatch = !q || columns.some((c) => String(r[c.key] ?? "").toLowerCase().includes(q));
      const dropdownMatch = !filterKey || filterValue === "all" || String(r[filterKey]) === filterValue;
      return searchMatch && dropdownMatch;
    });
  }, [rows, columns, query, filterKey, filterValue]);

  return (
    <div className="glass-card p-4 md:p-5">
      <div className="mb-4 flex flex-col gap-2 md:flex-row">
        <div className="relative w-full">
          <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input placeholder="Search..." value={query} onChange={(e) => setQuery(e.target.value)} className="input-premium pl-9" />
        </div>
        {filterKey && (
          <select className="input-premium md:max-w-40" value={filterValue} onChange={(e) => setFilterValue(e.target.value)}>
            <option value="all">All</option>
            {filterOptions.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        )}
      </div>
      <div className="overflow-auto rounded-xl border border-white/10 bg-slate-900/60">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b border-slate-700/60 bg-slate-800/70 text-slate-100">
              {columns.map((c) => <th key={c.key} className="px-3 py-3 text-left font-semibold">{c.title}</th>)}
              {actions?.length ? <th className="px-3 py-3 text-left font-semibold">Actions</th> : null}
            </tr>
          </thead>
          <tbody>
            {filtered.map((row, idx) => (
              <tr key={row[rowKey] ?? idx} className="border-b border-slate-800/80">
                {columns.map((c) => <td key={c.key} className="px-3 py-2.5 text-slate-200">{row[c.key]}</td>)}
                {actions?.length ? (
                  <td className="px-3 py-2.5">
                    <div className="flex flex-wrap gap-2">
                      {actions.map((action) => <button key={action.label} type="button" className={action.className ?? "btn-primary"} onClick={() => action.onClick(row)}>{action.label}</button>)}
                    </div>
                  </td>
                ) : null}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
