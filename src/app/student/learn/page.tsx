import Link from "next/link";
import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";

export const metadata = { title: "Learning Path" };

const LEVEL_TITLES: Record<number, string> = {
  1: "Level 1 — Mengenal Anak",
  2: "Level 2 — Merancang Aktivitas",
  3: "Level 3 — Membawa Kelas",
  4: "Level 4 — Menghadapi Situasi",
  5: "Level 5 — Observasi",
  6: "Level 6 — Microteaching",
};

export default async function LearnPage() {
  const user = await requireUser();
  const [modules, progress] = await Promise.all([
    db.learningModule.findMany({ orderBy: [{ level: "asc" }, { order: "asc" }] }),
    db.learningProgress.findMany({ where: { userId: user.id }, select: { moduleId: true } }),
  ]);
  const doneIds = new Set(progress.map((p) => p.moduleId));
  const levels = [...new Set(modules.map((m) => m.level))].sort((a, b) => a - b);

  return (
    <main>
      <h1 className="text-2xl font-black mt-2 mb-1">Learning Path 📘</h1>
      <p className="text-sm text-ink-muted mb-5">
        {doneIds.size} dari {modules.length} modul selesai
      </p>
      <div className="space-y-6">
        {levels.map((level) => (
          <section key={level}>
            <h2 className="font-extrabold text-sm text-primary-strong uppercase tracking-wide mb-2.5">
              {LEVEL_TITLES[level] ?? `Level ${level}`}
            </h2>
            <div className="space-y-2">
              {modules
                .filter((m) => m.level === level)
                .map((m) => {
                  const done = doneIds.has(m.id);
                  return (
                    <Link
                      key={m.id}
                      href={`/student/learn/${m.slug}`}
                      className="flex items-center gap-3 bg-surface border border-line rounded-2xl p-4 hover:border-primary transition-colors"
                    >
                      <span
                        className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-black ${
                          done ? "bg-success-soft text-success" : "bg-surface-muted text-ink-muted"
                        }`}
                        aria-hidden
                      >
                        {done ? "✓" : m.order}
                      </span>
                      <div className="min-w-0">
                        <p className="font-extrabold text-sm">{m.title}</p>
                        <p className="text-xs text-ink-muted line-clamp-1">{m.description}</p>
                      </div>
                    </Link>
                  );
                })}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
