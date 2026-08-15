import Link from "next/link";
import { db } from "@/lib/db";
import { PageHeader } from "@/components/page-header";
import { ContentAdminTable } from "./content-admin-table";

export const metadata = { title: "Konten" };

const TYPES = [
  { value: "", label: "Semua" },
  { value: "ACTIVITY", label: "Aktivitas" },
  { value: "GAME", label: "Games" },
  { value: "TIP", label: "Tips" },
  { value: "STORY_TEMPLATE", label: "Cerita" },
  { value: "MICROTEACHING_BRIEF", label: "Microteaching" },
];

export default async function AdminContentPage({ searchParams }: PageProps<"/admin/content">) {
  const params = await searchParams;
  const type = typeof params.type === "string" ? params.type : "";

  const [items, statusCounts] = await Promise.all([
    db.contentItem.findMany({
      where: type ? { type } : undefined,
      orderBy: { updatedAt: "desc" },
      take: 500,
    }),
    db.contentItem.groupBy({ by: ["status"], _count: true }),
  ]);

  return (
    <div className="w-full">
      <PageHeader title="Konten" description="Tinjau, terbitkan, atau arsipkan materi terkurasi." />
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-5">
        {statusCounts.map((s) => (
          <div key={s.status} className="bg-surface border border-line rounded-2xl px-4 py-3">
            <p className="font-black text-2xl text-primary-strong">{s._count}</p>
            <p className="text-xs font-bold text-ink-muted">{s.status}</p>
          </div>
        ))}
      </div>
      <div className="flex gap-2 mb-5 overflow-x-auto">
        {TYPES.map((t) => (
          <Link
            key={t.value}
            href={t.value ? `/admin/content?type=${t.value}` : "/admin/content"}
            className={`shrink-0 rounded-full border-2 px-4 py-1.5 text-xs font-bold ${
              type === t.value ? "border-primary bg-primary-soft text-primary-strong" : "border-line bg-surface text-ink-muted"
            }`}
          >
            {t.label}
          </Link>
        ))}
      </div>
      <ContentAdminTable
        rows={items.map((item) => ({
          id: item.id,
          title: item.title,
          slug: item.slug,
          type: item.type,
          authorType: item.authorType,
          status: item.status,
        }))}
      />
    </div>
  );
}
