import React, { useMemo, useState } from "react";

export default function DataTable({ rows, columns }) {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((r) => columns.some((c) => String(r[c.key] ?? "").toLowerCase().includes(q)));
  }, [rows, columns, query]);

  return (
    <div className="rounded-lg bg-white p-4 shadow">
      <input
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="mb-3 w-full rounded border px-3 py-2"
      />
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
