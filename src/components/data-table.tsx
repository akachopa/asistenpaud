"use client";

import { useMemo, useState, type ReactNode } from "react";
import { EmptyState } from "@/components/ui";

export interface DataTableColumn<T> {
  id: string;
  header: string;
  /** Nilai teks untuk pencarian dan pengurutan. */
  accessor?: (row: T) => string | number;
  cell: (row: T) => ReactNode;
  sortable?: boolean;
  className?: string;
  headerClassName?: string;
}

export interface DataTableProps<T> {
  data: T[];
  columns: DataTableColumn<T>[];
  getRowId: (row: T) => string;
  searchPlaceholder?: string;
  pageSize?: number;
  emptyTitle?: string;
  emptyDescription?: string;
  emptyEmoji?: string;
  toolbar?: ReactNode;
}

export function DataTable<T>({
  data,
  columns,
  getRowId,
  searchPlaceholder = "Cari...",
  pageSize: initialPageSize = 15,
  emptyTitle = "Belum ada data",
  emptyDescription,
  emptyEmoji = "🗂️",
  toolbar,
}: DataTableProps<T>) {
  const [query, setQuery] = useState("");
  const [sortId, setSortId] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(initialPageSize);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return data;
    return data.filter((row) =>
      columns.some((col) => {
        const value = col.accessor?.(row);
        return value !== undefined && String(value).toLowerCase().includes(q);
      }),
    );
  }, [data, query, columns]);

  const sorted = useMemo(() => {
    if (!sortId) return filtered;
    const col = columns.find((c) => c.id === sortId);
    if (!col?.accessor) return filtered;
    const copy = [...filtered];
    copy.sort((a, b) => {
      const av = col.accessor!(a);
      const bv = col.accessor!(b);
      const cmp = typeof av === "number" && typeof bv === "number" ? av - bv : String(av).localeCompare(String(bv), "id");
      return sortDir === "asc" ? cmp : -cmp;
    });
    return copy;
  }, [filtered, sortId, sortDir, columns]);

  const pageCount = Math.max(1, Math.ceil(sorted.length / pageSize));
  const safePage = Math.min(page, pageCount - 1);
  const pageRows = sorted.slice(safePage * pageSize, safePage * pageSize + pageSize);
  const from = sorted.length === 0 ? 0 : safePage * pageSize + 1;
  const to = Math.min(sorted.length, (safePage + 1) * pageSize);

  const toggleSort = (col: DataTableColumn<T>) => {
    if (!col.sortable || !col.accessor) return;
    if (sortId === col.id) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortId(col.id);
      setSortDir("asc");
    }
    setPage(0);
  };

  return (
    <div className="bg-surface border border-line rounded-(--radius-card) overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 px-4 py-3.5 border-b border-line bg-surface-muted/50">
        <label className="relative flex-1 min-w-0">
          <span className="sr-only">Cari tabel</span>
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted" aria-hidden>
            🔍
          </span>
          <input
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(0);
            }}
            placeholder={searchPlaceholder}
            className="w-full rounded-xl border-2 border-line bg-surface pl-9 pr-3 py-2.5 text-sm focus:border-primary focus:outline-none"
          />
        </label>
        {toolbar}
        <p className="text-xs font-bold text-ink-muted whitespace-nowrap">
          {sorted.length} dari {data.length} baris
        </p>
      </div>

      {sorted.length === 0 ? (
        <EmptyState emoji={emptyEmoji} title={emptyTitle} description={emptyDescription} />
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[640px]">
              <thead className="sticky top-0 z-10 bg-surface-muted">
                <tr className="text-left border-b border-line">
                  {columns.map((col) => {
                    const active = sortId === col.id;
                    const canSort = Boolean(col.sortable && col.accessor);
                    return (
                      <th
                        key={col.id}
                        className={`px-4 py-3 font-extrabold text-ink whitespace-nowrap ${col.headerClassName ?? ""}`}
                        aria-sort={canSort ? (active ? (sortDir === "asc" ? "ascending" : "descending") : "none") : undefined}
                      >
                        {canSort ? (
                          <button
                            type="button"
                            onClick={() => toggleSort(col)}
                            className="inline-flex items-center gap-1.5 hover:text-primary-strong"
                          >
                            {col.header}
                            <span className="text-[10px] text-ink-muted" aria-hidden>
                              {active ? (sortDir === "asc" ? "▲" : "▼") : "↕"}
                            </span>
                          </button>
                        ) : (
                          col.header
                        )}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {pageRows.map((row) => (
                  <tr key={getRowId(row)} className="border-b border-line last:border-0 hover:bg-primary-soft/40 transition-colors">
                    {columns.map((col) => (
                      <td key={col.id} className={`px-4 py-3 align-middle ${col.className ?? ""}`}>
                        {col.cell(row)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 py-3 border-t border-line bg-surface-muted/40">
            <div className="flex items-center gap-2 text-xs font-bold text-ink-muted">
              <span>
                Menampilkan {from}–{to}
              </span>
              <label className="inline-flex items-center gap-1.5">
                <span>per halaman</span>
                <select
                  value={pageSize}
                  onChange={(e) => {
                    setPageSize(Number(e.target.value));
                    setPage(0);
                  }}
                  className="rounded-lg border-2 border-line bg-surface px-2 py-1 font-bold text-ink"
                >
                  {[10, 15, 25, 50].map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div className="flex items-center gap-1.5">
              <PagerButton label="‹‹" disabled={safePage === 0} onClick={() => setPage(0)} />
              <PagerButton label="‹" disabled={safePage === 0} onClick={() => setPage(safePage - 1)} />
              <span className="px-2 text-xs font-extrabold">
                {safePage + 1} / {pageCount}
              </span>
              <PagerButton label="›" disabled={safePage >= pageCount - 1} onClick={() => setPage(safePage + 1)} />
              <PagerButton label="››" disabled={safePage >= pageCount - 1} onClick={() => setPage(pageCount - 1)} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function PagerButton({ label, disabled, onClick }: { label: string; disabled: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className="min-h-9 min-w-9 rounded-lg border-2 border-line bg-surface text-sm font-extrabold disabled:opacity-40 hover:border-primary hover:text-primary-strong"
    >
      {label}
    </button>
  );
}
