"use client";

import { Chip } from "@/components/ui";
import { DataTable, type DataTableColumn } from "@/components/data-table";
import { RatingButtons } from "./rating-buttons";

export interface HistoryRow {
  id: string;
  title: string;
  status: string;
  statusLabel: string;
  when: string;
  rating: string | null;
}

export function HistoryTable({ rows }: { rows: HistoryRow[] }) {
  const columns: DataTableColumn<HistoryRow>[] = [
    { id: "title", header: "Judul", sortable: true, accessor: (r) => r.title, cell: (r) => <span className="font-extrabold">{r.title}</span> },
    {
      id: "status",
      header: "Status",
      sortable: true,
      accessor: (r) => r.statusLabel,
      cell: (r) => <Chip tone={r.status === "USED" ? "success" : "muted"}>{r.statusLabel}</Chip>,
    },
    { id: "when", header: "Waktu", sortable: true, accessor: (r) => r.when, cell: (r) => <span className="text-ink-muted whitespace-nowrap">{r.when}</span> },
    {
      id: "rating",
      header: "Hasil",
      accessor: (r) => r.rating ?? "",
      cell: (r) =>
        r.status === "USED" ? <RatingButtons sessionId={r.id} currentRating={r.rating} /> : <span className="text-xs text-ink-muted">—</span>,
    },
  ];

  return (
    <DataTable
      data={rows}
      columns={columns}
      getRowId={(r) => r.id}
      searchPlaceholder="Cari riwayat..."
      emptyTitle="Belum ada riwayat"
    />
  );
}
