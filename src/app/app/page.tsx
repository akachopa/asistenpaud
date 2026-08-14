import Link from "next/link";
import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { recommendForUser } from "@/lib/content";
import { ContentCard } from "@/components/content-card";
import { SectionTitle } from "@/components/ui";
import { relativeTime } from "@/lib/utils";

const QUICK_ACTIONS = [
  { href: "/app/activity/new", icon: "✨", label: "Buat Kegiatan" },
  { href: "/app/random-game", icon: "🎲", label: "Cari Games" },
  { href: "/app/stories/new", icon: "📖", label: "Buat Cerita" },
  { href: "/app/tips", icon: "💡", label: "Tips Mengajar" },
  { href: "/app/assistant", icon: "💬", label: "Tanya Teman Guru" },
  { href: "/app/toolkit", icon: "🧰", label: "Classroom Toolkit" },
];

const PRESETS = [
  { label: "Saya punya 5 menit", href: "/app/random-game?duration=5" },
  { label: "Saya punya 15 menit", href: "/app/random-game?duration=15" },
  { label: "Tanpa alat", href: "/app/random-game?noTools=1" },
  { label: "Indoor", href: "/app/random-game?location=INDOOR" },
  { label: "Outdoor", href: "/app/random-game?location=OUTDOOR" },
  { label: "Anak mulai bosan", href: "/app/games?category=Energi+Tinggi" },
  { label: "Sebelum pulang", href: "/app/games?category=Calm+Down" },
  { label: "Setelah istirahat", href: "/app/games?category=Transisi+Kegiatan" },
];

export default async function TeacherHomePage() {
  const user = await requireUser();
  const [recent, recommendations] = await Promise.all([
    db.teachingSession.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
      take: 3,
    }),
    recommendForUser(user.id, user.profile?.agePreference ?? null),
  ]);

  return (
    <main>
      <p className="text-sm text-ink-muted mt-2">Halo, {user.name.split(" ")[0]}! 🌞</p>
      <h1 className="text-2xl font-black leading-tight mt-1">
        Mau ngapain bersama anak-anak hari ini?
      </h1>

      <div className="grid grid-cols-3 gap-2.5 mt-6">
        {QUICK_ACTIONS.map((a) => (
          <Link
            key={a.href}
            href={a.href}
            className="flex flex-col items-center gap-1.5 bg-surface border border-line rounded-(--radius-card) p-3.5 text-center hover:border-primary transition-colors"
          >
            <span className="text-2xl" aria-hidden>
              {a.icon}
            </span>
            <span className="text-xs font-bold leading-tight">{a.label}</span>
          </Link>
        ))}
      </div>

      <SectionTitle>Butuh ide cepat? ⚡</SectionTitle>
      <div className="flex flex-wrap gap-2">
        {PRESETS.map((p) => (
          <Link
            key={p.label}
            href={p.href}
            className="rounded-full border-2 border-line bg-surface px-4 py-2 text-sm font-bold hover:border-primary transition-colors"
          >
            {p.label}
          </Link>
        ))}
      </div>

      {recent.length > 0 ? (
        <>
          <SectionTitle>Lanjutkan 📌</SectionTitle>
          <div className="space-y-2">
            {recent.map((s) => (
              <Link
                key={s.id}
                href="/app/history"
                className="flex items-center justify-between bg-surface border border-line rounded-2xl px-4 py-3 hover:border-primary transition-colors"
              >
                <div className="min-w-0">
                  <p className="font-bold text-sm truncate">{s.title}</p>
                  <p className="text-xs text-ink-muted">{relativeTime(s.createdAt)}</p>
                </div>
                <span aria-hidden>›</span>
              </Link>
            ))}
          </div>
        </>
      ) : null}

      <SectionTitle>Untukmu hari ini 🌈</SectionTitle>
      <div className="space-y-2.5">
        {recommendations.map((item) => (
          <ContentCard key={item.id} item={item} />
        ))}
      </div>
    </main>
  );
}
