"use client";

import { Chip } from "@/components/ui";
import { DataTable, type DataTableColumn } from "@/components/data-table";
import { setContentStatusAction } from "../actions";

export interface AdminContentRow {
  id: string;
  title: string;
  slug: string;
  type: string;
  authorType: string;
  status: string;
}

const STATUS_TONES: Record<string, "success" | "warning" | "danger" | "muted"> = {
  APPROVED: "success",
  PENDING_REVIEW: "warning",
  REJECTED: "danger",
  ARCHIVED: "muted",
  DRAFT: "muted",
};

export function ContentAdminTable({ rows }: { rows: AdminContentRow[] }) {
  const columns: DataTableColumn<AdminContentRow>[] = [
    {
      id: "title",
      header: "Judul",
      sortable: true,
      accessor: (r) => `${r.title} ${r.slug}`,
      className: "min-w-[240px]",
      cell: (r) => (
        <div>
          <p className="font-extrabold">{r.title}</p>
          <p className="text-xs text-ink-muted">{r.slug}</p>
        </div>
      ),
    },
    { id: "type", header: "Tipe", sortable: true, accessor: (r) => r.type, cell: (r) => <Chip>{r.type}</Chip> },
    { id: "authorType", header: "Sumber", sortable: true, accessor: (r) => r.authorType, cell: (r) => <span className="text-ink-muted">{r.authorType}</span> },
    {
      id: "status",
      header: "Status",
      sortable: true,
      accessor: (r) => r.status,
      cell: (r) => <Chip tone={STATUS_TONES[r.status] ?? "muted"}>{r.status}</Chip>,
    },
    {
      id: "actions",
      header: "Aksi",
      cell: (r) => (
        <div className="flex gap-3">
          {r.status !== "APPROVED" ? (
            <form action={setContentStatusAction.bind(null, r.id, "APPROVED")}>
              <button type="submit" className="text-xs font-extrabold text-success hover:underline">
                Terbitkan
              </button>
            </form>
          ) : null}
          {r.status !== "ARCHIVED" ? (
            <form action={setContentStatusAction.bind(null, r.id, "ARCHIVED")}>
              <button type="submit" className="text-xs font-extrabold text-danger hover:underline">
                Arsipkan
              </button>
            </form>
          ) : null}
        </div>
      ),
    },
  ];

  return (
    <DataTable
      data={rows}
      columns={columns}
      getRowId={(r) => r.id}
      searchPlaceholder="Cari judul, slug, tipe, status..."
      emptyTitle="Belum ada konten"
      pageSize={25}
    />
  );
}
