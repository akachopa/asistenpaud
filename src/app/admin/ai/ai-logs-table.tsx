"use client";

import { Chip } from "@/components/ui";
import { DataTable, type DataTableColumn } from "@/components/data-table";

export interface AILogRow {
  id: string;
  createdAt: string;
  email: string;
  feature: string;
  provider: string;
  model: string;
  latencyMs: number;
  status: string;
}

const STATUS_TONES: Record<string, "success" | "warning" | "danger"> = {
  SUCCESS: "success",
  SCHEMA_FAILED: "warning",
  SAFETY_REJECTED: "danger",
  ERROR: "danger",
};

export function AILogsTable({ rows }: { rows: AILogRow[] }) {
  const columns: DataTableColumn<AILogRow>[] = [
    { id: "createdAt", header: "Waktu", sortable: true, accessor: (r) => r.createdAt, cell: (r) => <span className="text-ink-muted whitespace-nowrap">{r.createdAt}</span> },
    { id: "email", header: "User", sortable: true, accessor: (r) => r.email, cell: (r) => <span className="text-ink-muted">{r.email}</span> },
    { id: "feature", header: "Fitur", sortable: true, accessor: (r) => r.feature, cell: (r) => <span className="font-extrabold">{r.feature}</span> },
    {
      id: "provider",
      header: "Provider",
      sortable: true,
      accessor: (r) => `${r.provider} ${r.model}`,
      cell: (r) => (
        <span className="text-ink-muted">
          {r.provider} / {r.model}
        </span>
      ),
    },
    {
      id: "latencyMs",
      header: "Latensi",
      sortable: true,
      accessor: (r) => r.latencyMs,
      cell: (r) => <span className="text-ink-muted tabular-nums">{r.latencyMs}ms</span>,
    },
    {
      id: "status",
      header: "Status",
      sortable: true,
      accessor: (r) => r.status,
      cell: (r) => <Chip tone={STATUS_TONES[r.status] ?? "muted"}>{r.status}</Chip>,
    },
  ];

  return (
    <DataTable
      data={rows}
      columns={columns}
      getRowId={(r) => r.id}
      searchPlaceholder="Cari user, fitur, status, provider..."
      emptyTitle="Belum ada log AI"
    />
  );
}
