"use client";

import { Chip } from "@/components/ui";
import { DataTable, type DataTableColumn } from "@/components/data-table";

export interface SimRow {
  id: string;
  title: string;
  when: string;
  reflection: string;
}

export interface MicroRow {
  id: string;
  title: string;
  status: string;
  when: string;
  objectives: string;
}

export function PortfolioSimTable({ rows }: { rows: SimRow[] }) {
  const columns: DataTableColumn<SimRow>[] = [
    { id: "title", header: "Skenario", sortable: true, accessor: (r) => r.title, cell: (r) => <span className="font-extrabold">{r.title}</span> },
    { id: "when", header: "Selesai", sortable: true, accessor: (r) => r.when, cell: (r) => <span className="text-ink-muted whitespace-nowrap">{r.when}</span> },
    {
      id: "reflection",
      header: "Refleksi",
      accessor: (r) => r.reflection,
      cell: (r) => (r.reflection ? <span className="text-sm italic line-clamp-2">“{r.reflection}”</span> : <span className="text-xs text-ink-muted">—</span>),
    },
  ];
  return <DataTable data={rows} columns={columns} getRowId={(r) => r.id} searchPlaceholder="Cari simulasi..." emptyTitle="Belum ada simulasi selesai" emptyEmoji="🎭" />;
}

export function PortfolioMicroTable({ rows }: { rows: MicroRow[] }) {
  const columns: DataTableColumn<MicroRow>[] = [
    { id: "title", header: "Brief", sortable: true, accessor: (r) => r.title, cell: (r) => <span className="font-extrabold">{r.title}</span> },
    {
      id: "status",
      header: "Status",
      sortable: true,
      accessor: (r) => r.status,
      cell: (r) => <Chip tone={r.status === "REVIEWED" ? "success" : "muted"}>{r.status === "REVIEWED" ? "Direview" : "Terkirim"}</Chip>,
    },
    { id: "when", header: "Waktu", sortable: true, accessor: (r) => r.when, cell: (r) => <span className="text-ink-muted whitespace-nowrap">{r.when}</span> },
    { id: "objectives", header: "Tujuan", accessor: (r) => r.objectives, cell: (r) => <span className="text-sm line-clamp-2">{r.objectives || "—"}</span> },
  ];
  return <DataTable data={rows} columns={columns} getRowId={(r) => r.id} searchPlaceholder="Cari microteaching..." emptyTitle="Belum ada rencana terkirim" emptyEmoji="📝" />;
}
