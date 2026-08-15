import Link from "next/link";
import { db } from "@/lib/db";
import { PageHeader } from "@/components/page-header";

const SECTIONS = [
  { href: "/app/activities", icon: "🎨", title: "Aktivitas", desc: "Kegiatan belajar lengkap dengan langkah dan observasi", type: "ACTIVITY" },
  { href: "/app/games", icon: "🎲", title: "Games", desc: "Permainan cepat untuk segala situasi kelas", type: "GAME" },
  { href: "/app/stories", icon: "📖", title: "Cerita", desc: "Kerangka cerita interaktif siap dibawakan", type: "STORY_TEMPLATE" },
  { href: "/app/tips", icon: "💡", title: "Tips", desc: "Strategi praktis menghadapi situasi kelas", type: "TIP" },
];

export const metadata = { title: "Explore" };

export default async function ExplorePage() {
  const counts = await db.contentItem.groupBy({
    by: ["type"],
    where: { status: "APPROVED" },
    _count: true,
  });
  const countMap = Object.fromEntries(counts.map((c) => [c.type, c._count]));

  return (
    <main className="w-full">
      <PageHeader title="Jelajahi 🔍" description="Pilih jenis materi yang kamu butuhkan hari ini." />
      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {SECTIONS.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="flex flex-col bg-surface border border-line rounded-(--radius-card) p-6 hover:border-primary hover:shadow-sm transition-all h-full"
          >
            <span className="text-4xl" aria-hidden>
              {s.icon}
            </span>
            <h2 className="font-extrabold text-lg mt-3">{s.title}</h2>
            <p className="text-sm text-ink-muted mt-1 flex-1">{s.desc}</p>
            <p className="text-sm font-black text-primary-strong mt-4">{countMap[s.type] ?? 0} materi</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
