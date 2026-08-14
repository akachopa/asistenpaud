import Link from "next/link";
import { db } from "@/lib/db";

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
    <main>
      <h1 className="text-2xl font-black mt-2 mb-5">Jelajahi 🔍</h1>
      <div className="space-y-3">
        {SECTIONS.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="flex items-center gap-4 bg-surface border border-line rounded-(--radius-card) p-4 hover:border-primary transition-colors"
          >
            <span className="text-3xl" aria-hidden>
              {s.icon}
            </span>
            <div className="flex-1">
              <h2 className="font-extrabold">{s.title}</h2>
              <p className="text-sm text-ink-muted">{s.desc}</p>
            </div>
            <span className="text-sm font-bold text-primary-strong shrink-0">{countMap[s.type] ?? 0}</span>
          </Link>
        ))}
      </div>
    </main>
  );
}
