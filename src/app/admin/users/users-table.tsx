"use client";

import { Chip } from "@/components/ui";
import { DataTable, type DataTableColumn } from "@/components/data-table";
import { setUserStatusAction } from "../actions";

export interface UserRow {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  createdAt: string;
}

const ROLE_TONE: Record<string, "accent" | "secondary" | "primary"> = {
  ADMIN: "accent",
  STUDENT: "secondary",
  TEACHER: "primary",
};

export function UsersTable({ rows }: { rows: UserRow[] }) {
  const columns: DataTableColumn<UserRow>[] = [
    { id: "name", header: "Nama", sortable: true, accessor: (r) => r.name, cell: (r) => <span className="font-extrabold">{r.name}</span> },
    { id: "email", header: "Email", sortable: true, accessor: (r) => r.email, cell: (r) => <span className="text-ink-muted">{r.email}</span> },
    {
      id: "role",
      header: "Peran",
      sortable: true,
      accessor: (r) => r.role,
      cell: (r) => <Chip tone={ROLE_TONE[r.role] ?? "muted"}>{r.role}</Chip>,
    },
    {
      id: "status",
      header: "Status",
      sortable: true,
      accessor: (r) => r.status,
      cell: (r) => <Chip tone={r.status === "ACTIVE" ? "success" : "danger"}>{r.status}</Chip>,
    },
    { id: "createdAt", header: "Terdaftar", sortable: true, accessor: (r) => r.createdAt, cell: (r) => <span className="text-ink-muted whitespace-nowrap">{r.createdAt}</span> },
    {
      id: "actions",
      header: "Aksi",
      cell: (r) =>
        r.role === "ADMIN" ? (
          <span className="text-xs text-ink-muted">—</span>
        ) : (
          <form action={setUserStatusAction.bind(null, r.id, r.status === "ACTIVE" ? "SUSPENDED" : "ACTIVE")}>
            <button type="submit" className="text-xs font-extrabold text-primary-strong hover:underline">
              {r.status === "ACTIVE" ? "Nonaktifkan" : "Aktifkan"}
            </button>
          </form>
        ),
    },
  ];

  return (
    <DataTable
      data={rows}
      columns={columns}
      getRowId={(r) => r.id}
      searchPlaceholder="Cari nama, email, peran..."
      emptyTitle="Belum ada pengguna"
    />
  );
}
