"use client";

import Link from "next/link";
import { Chip } from "@/components/ui";
import { DataTable, type DataTableColumn } from "@/components/data-table";

export interface MicroteachingRow {
  id: string;
  slug: string;
  title: string;
  ageRange: string;
  childCount: number;
  durationMinutes: number;
  theme: string;
  constraint: string;
  done: boolean;
}

export function MicroteachingTable({ rows }: { rows: MicroteachingRow[] }) {
  const columns: DataTableColumn<MicroteachingRow>[] = [
    {
      id: "title",
      header: "Tantangan",
      sortable: true,
      accessor: (r) => r.title,
      className: "min-w-[220px]",
      cell: (r) => (
        <Link href={`/student/microteaching/${r.slug}`} className="font-extrabold hover:text-primary-strong">
          {r.title}
        </Link>
      ),
    },
    { id: "age", header: "Usia", sortable: true, accessor: (r) => r.ageRange, cell: (r) => <Chip tone="primary">{r.ageRange}</Chip> },
    { id: "childCount", header: "Anak", sortable: true, accessor: (r) => r.childCount, cell: (r) => <span className="tabular-nums">{r.childCount}</span> },
    { id: "duration", header: "Durasi", sortable: true, accessor: (r) => r.durationMinutes, cell: (r) => <span className="tabular-nums">{r.durationMinutes} mnt</span> },
    { id: "theme", header: "Tema", sortable: true, accessor: (r) => r.theme, cell: (r) => <Chip tone="secondary">{r.theme}</Chip> },
    { id: "constraint", header: "Kondisi", sortable: true, accessor: (r) => r.constraint, cell: (r) => <span className="text-xs text-ink-muted line-clamp-2 max-w-[240px]">{r.constraint}</span> },
    {
      id: "done",
      header: "Status",
      sortable: true,
      accessor: (r) => (r.done ? "Selesai" : "Belum"),
      cell: (r) => (r.done ? <Chip tone="success">✓ Selesai</Chip> : <Chip>Belum</Chip>),
    },
    {
      id: "open",
      header: "",
      cell: (r) => (
        <Link href={`/student/microteaching/${r.slug}`} className="text-xs font-extrabold text-primary-strong hover:underline">
          Kerjakan →
        </Link>
      ),
    },
  ];

  return (
    <DataTable
      data={rows}
      columns={columns}
      getRowId={(r) => r.id}
      searchPlaceholder="Cari tantangan, tema, kondisi..."
      emptyTitle="Belum ada tantangan"
    />
  );
}
