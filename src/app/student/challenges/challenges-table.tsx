"use client";

import Link from "next/link";
import { Chip } from "@/components/ui";
import { DataTable, type DataTableColumn } from "@/components/data-table";

export interface ChallengeRow {
  id: string;
  slug: string;
  title: string;
  description: string;
  ageContext: string;
  difficulty: string;
  done: boolean;
}

const DIFFICULTY_TONE: Record<string, "success" | "warning" | "danger"> = {
  DASAR: "success",
  MENENGAH: "warning",
  LANJUT: "danger",
};

export function ChallengesTable({ rows }: { rows: ChallengeRow[] }) {
  const columns: DataTableColumn<ChallengeRow>[] = [
    {
      id: "title",
      header: "Skenario",
      sortable: true,
      accessor: (r) => r.title,
      className: "min-w-[240px]",
      cell: (r) => (
        <Link href={`/student/simulators/${r.slug}`} className="group block">
          <p className="font-extrabold group-hover:text-primary-strong">{r.title}</p>
          <p className="text-xs text-ink-muted line-clamp-1 mt-0.5">{r.description}</p>
        </Link>
      ),
    },
    { id: "age", header: "Konteks", sortable: true, accessor: (r) => r.ageContext, cell: (r) => <span className="text-ink-muted text-xs">{r.ageContext}</span> },
    {
      id: "difficulty",
      header: "Tingkat",
      sortable: true,
      accessor: (r) => r.difficulty,
      cell: (r) => <Chip tone={DIFFICULTY_TONE[r.difficulty] ?? "muted"}>{r.difficulty}</Chip>,
    },
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
        <Link href={`/student/simulators/${r.slug}`} className="text-xs font-extrabold text-primary-strong hover:underline">
          {r.done ? "Ulangi →" : "Mulai →"}
        </Link>
      ),
    },
  ];

  return (
    <DataTable
      data={rows}
      columns={columns}
      getRowId={(r) => r.id}
      searchPlaceholder="Cari skenario..."
      emptyTitle="Belum ada skenario"
    />
  );
}
