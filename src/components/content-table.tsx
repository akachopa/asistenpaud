"use client";

import Link from "next/link";
import { Chip } from "@/components/ui";
import { DataTable, type DataTableColumn } from "@/components/data-table";

export interface ContentRow {
  id: string;
  slug: string;
  title: string;
  summary: string;
  type: string;
  href: string;
  ageLabel: string;
  durationLabel: string;
  noTools: boolean;
  location: string;
  categories: string;
}

const TYPE_ICONS: Record<string, string> = {
  ACTIVITY: "🎨",
  GAME: "🎲",
  TIP: "💡",
  STORY_TEMPLATE: "📖",
  MICROTEACHING_BRIEF: "📝",
};

const LOCATION_LABEL: Record<string, string> = {
  INDOOR: "Indoor",
  OUTDOOR: "Outdoor",
  KEDUANYA: "Indoor/Outdoor",
};

export function ContentTable({
  rows,
  searchPlaceholder,
  emptyTitle,
  emptyDescription,
  hideMeta = false,
}: {
  rows: ContentRow[];
  searchPlaceholder?: string;
  emptyTitle?: string;
  emptyDescription?: string;
  hideMeta?: boolean;
}) {
  const columns: DataTableColumn<ContentRow>[] = [
    {
      id: "title",
      header: "Judul",
      sortable: true,
      accessor: (r) => r.title,
      className: "min-w-[240px]",
      cell: (r) => (
        <Link href={r.href} className="group block">
          <p className="font-extrabold group-hover:text-primary-strong">
            <span aria-hidden>{TYPE_ICONS[r.type] ?? "📄"} </span>
            {r.title}
          </p>
          <p className="text-xs text-ink-muted line-clamp-1 mt-0.5">{r.summary}</p>
        </Link>
      ),
    },
    ...(hideMeta
      ? []
      : [
          {
            id: "age",
            header: "Usia",
            sortable: true,
            accessor: (r: ContentRow) => r.ageLabel,
            cell: (r: ContentRow) => <Chip tone="primary">{r.ageLabel}</Chip>,
          },
          {
            id: "duration",
            header: "Durasi",
            sortable: true,
            accessor: (r: ContentRow) => r.durationLabel,
            cell: (r: ContentRow) => <span className="text-ink-muted whitespace-nowrap">{r.durationLabel}</span>,
          },
          {
            id: "location",
            header: "Lokasi",
            sortable: true,
            accessor: (r: ContentRow) => r.location,
            cell: (r: ContentRow) => LOCATION_LABEL[r.location] ?? r.location,
          },
          {
            id: "tools",
            header: "Alat",
            sortable: true,
            accessor: (r: ContentRow) => (r.noTools ? "Tanpa alat" : "Ada alat"),
            cell: (r: ContentRow) => (r.noTools ? <Chip tone="success">Tanpa alat</Chip> : <Chip>Ada alat</Chip>),
          },
        ]),
    {
      id: "categories",
      header: "Kategori",
      sortable: true,
      accessor: (r) => r.categories,
      cell: (r) => <span className="text-ink-muted line-clamp-1 max-w-[220px]">{r.categories || "—"}</span>,
    },
    {
      id: "open",
      header: "",
      className: "w-24 text-right",
      cell: (r) => (
        <Link href={r.href} className="text-xs font-extrabold text-primary-strong hover:underline">
          Buka →
        </Link>
      ),
    },
  ];

  return (
    <DataTable
      data={rows}
      columns={columns}
      getRowId={(r) => r.id}
      searchPlaceholder={searchPlaceholder}
      emptyTitle={emptyTitle}
      emptyDescription={emptyDescription}
    />
  );
}
