import React, { useMemo, useState } from "react";

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
        <input placeholder="Search..." value={query} onChange={(e) => setQuery(e.target.value)} className="input-premium" />
        {filterKey && (
          <select className="input-premium md:max-w-40" value={filterValue} onChange={(e) => setFilterValue(e.target.value)}>
            <option value="all">All</option>
            {filterOptions.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        )}
      </div>
      <div className="overflow-auto rounded-xl border border-white/60 bg-white/70">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b bg-slate-50/80 text-slate-700">
              {columns.map((c) => <th key={c.key} className="px-3 py-3 text-left font-semibold">{c.title}</th>)}
              {actions?.length ? <th className="px-3 py-3 text-left font-semibold">Actions</th> : null}
            </tr>
          </thead>
          <tbody>
            {filtered.map((row, idx) => (
              <tr key={row[rowKey] ?? idx} className="border-b border-slate-100/80">
                {columns.map((c) => <td key={c.key} className="px-3 py-2.5 text-slate-700">{row[c.key]}</td>)}
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
