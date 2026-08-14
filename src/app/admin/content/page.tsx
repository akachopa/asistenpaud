import Link from "next/link";
import { db } from "@/lib/db";
import { Chip } from "@/components/ui";
import { setContentStatusAction } from "../actions";

export const metadata = { title: "Konten" };

const TYPES = [
  { value: "", label: "Semua" },
  { value: "ACTIVITY", label: "Aktivitas" },
  { value: "GAME", label: "Games" },
  { value: "TIP", label: "Tips" },
  { value: "STORY_TEMPLATE", label: "Cerita" },
  { value: "MICROTEACHING_BRIEF", label: "Microteaching" },
];

const STATUS_TONES: Record<string, "success" | "warning" | "danger" | "muted"> = {
  APPROVED: "success",
  PENDING_REVIEW: "warning",
  REJECTED: "danger",
  ARCHIVED: "muted",
  DRAFT: "muted",
};

export default async function AdminContentPage({ searchParams }: PageProps<"/admin/content">) {
  const params = await searchParams;
  const type = typeof params.type === "string" ? params.type : "";

  const [items, statusCounts] = await Promise.all([
    db.contentItem.findMany({
      where: type ? { type } : undefined,
      orderBy: { updatedAt: "desc" },
      take: 100,
    }),
    db.contentItem.groupBy({ by: ["status"], _count: true }),
  ]);

  return (
    <div>
      <h1 className="text-2xl font-black mb-4">Konten</h1>
      <div className="flex flex-wrap gap-3 mb-5">
        {statusCounts.map((s) => (
          <div key={s.status} className="bg-surface border border-line rounded-2xl px-4 py-2.5">
            <span className="font-black text-lg">{s._count}</span>{" "}
            <span className="text-xs font-bold text-ink-muted">{s.status}</span>
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
      <div className="overflow-x-auto bg-surface border border-line rounded-(--radius-card)">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-line text-left">
              <th className="p-3.5 font-extrabold">Judul</th>
              <th className="p-3.5 font-extrabold">Tipe</th>
              <th className="p-3.5 font-extrabold">Sumber</th>
              <th className="p-3.5 font-extrabold">Status</th>
              <th className="p-3.5 font-extrabold">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-b border-line last:border-0">
                <td className="p-3.5 font-bold max-w-xs">
                  <p className="truncate">{item.title}</p>
                  <p className="text-xs text-ink-muted font-normal truncate">{item.slug}</p>
                </td>
                <td className="p-3.5">
                  <Chip>{item.type}</Chip>
                </td>
                <td className="p-3.5 text-ink-muted">{item.authorType}</td>
                <td className="p-3.5">
                  <Chip tone={STATUS_TONES[item.status] ?? "muted"}>{item.status}</Chip>
                </td>
                <td className="p-3.5">
                  <div className="flex gap-2">
                    {item.status !== "APPROVED" ? (
                      <form action={setContentStatusAction.bind(null, item.id, "APPROVED")}>
                        <button type="submit" className="text-xs font-bold text-success hover:underline">
                          Terbitkan
                        </button>
                      </form>
                    ) : null}
                    {item.status !== "ARCHIVED" ? (
                      <form action={setContentStatusAction.bind(null, item.id, "ARCHIVED")}>
                        <button type="submit" className="text-xs font-bold text-danger hover:underline">
                          Arsipkan
                        </button>
                      </form>
                    ) : null}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
