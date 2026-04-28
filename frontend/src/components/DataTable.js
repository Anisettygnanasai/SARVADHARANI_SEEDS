import React, { useMemo, useState } from "react";

export default function DataTable({ rows, columns, filterKey }) {
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
    <div className="rounded-lg bg-white p-4 shadow">
      <div className="mb-3 flex flex-col gap-2 md:flex-row">
        <input
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded border px-3 py-2"
        />
        {filterKey && (
          <select className="rounded border px-3 py-2" value={filterValue} onChange={(e) => setFilterValue(e.target.value)}>
            <option value="all">All</option>
            {filterOptions.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        )}
      </div>
      <div className="overflow-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b bg-slate-50">
              {columns.map((c) => <th key={c.key} className="px-3 py-2 text-left">{c.title}</th>)}
            </tr>
          </thead>
          <tbody>
            {filtered.map((row, idx) => (
              <tr key={idx} className="border-b">
                {columns.map((c) => <td key={c.key} className="px-3 py-2">{row[c.key]}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
