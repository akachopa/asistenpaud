import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { getTotalXp, levelForXp } from "@/lib/xp";
import { Card, Chip, EmptyState, SectionTitle } from "@/components/ui";
import { relativeTime, parseJson } from "@/lib/utils";

export const metadata = { title: "Portfolio" };

export default async function PortfolioPage() {
  const user = await requireUser();
  const [xp, badges, attempts, submissions, moduleCount] = await Promise.all([
    getTotalXp(user.id),
    db.userBadge.findMany({ where: { userId: user.id }, include: { badge: true } }),
    db.simulatorAttempt.findMany({
      where: { userId: user.id, status: "COMPLETED" },
      include: { simulator: true },
      orderBy: { completedAt: "desc" },
      take: 20,
    }),
    db.microteachingSubmission.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
      take: 20,
    }),
    db.learningProgress.count({ where: { userId: user.id } }),
  ]);
  const level = levelForXp(xp);

  return (
    <main>
      <h1 className="text-2xl font-black mt-2 mb-4">Practice Portfolio 🏅</h1>

      <Card className="p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-ink-muted">Level {level.level}</p>
            <p className="font-black text-xl text-primary-strong">{level.title}</p>
          </div>
          <p className="font-black text-2xl">{xp} XP</p>
        </div>
        <div className="grid grid-cols-3 gap-3 mt-4 text-center">
          <div>
            <p className="text-xl font-black">{attempts.length}</p>
            <p className="text-xs text-ink-muted font-bold">Simulasi</p>
          </div>
          <div>
            <p className="text-xl font-black">{submissions.length}</p>
            <p className="text-xs text-ink-muted font-bold">Microteaching</p>
          </div>
          <div>
            <p className="text-xl font-black">{moduleCount}</p>
            <p className="text-xs text-ink-muted font-bold">Modul</p>
          </div>
        </div>
      </Card>

      {badges.length > 0 ? (
        <>
          <SectionTitle>Badge 🎖</SectionTitle>
          <div className="grid grid-cols-2 gap-3">
            {badges.map((ub) => (
              <Card key={ub.id} className="p-4 text-center">
                <p className="text-3xl" aria-hidden>
                  🏅
                </p>
                <p className="font-extrabold text-sm mt-1">{ub.badge.title}</p>
                <p className="text-xs text-ink-muted mt-0.5">{ub.badge.description}</p>
              </Card>
            ))}
          </div>
        </>
      ) : null}

      <SectionTitle>Riwayat simulasi 🎭</SectionTitle>
      {attempts.length === 0 ? (
        <EmptyState emoji="🎭" title="Belum ada simulasi selesai" description="Selesaikan simulasi pertamamu untuk mengisi portfolio." />
      ) : (
        <div className="space-y-2.5">
          {attempts.map((a) => (
            <Card key={a.id} className="p-4">
              <div className="flex items-start justify-between gap-2">
                <p className="font-extrabold text-sm">{a.simulator.title}</p>
                <Chip tone="success">✓</Chip>
              </div>
              <p className="text-xs text-ink-muted mt-0.5">{a.completedAt ? relativeTime(a.completedAt) : ""}</p>
              {a.reflection ? (
                <p className="text-sm mt-2 bg-surface-muted rounded-xl px-3 py-2 italic">🪞 “{a.reflection}”</p>
              ) : null}
            </Card>
          ))}
        </div>
      )}

      <SectionTitle>Microteaching 📝</SectionTitle>
      {submissions.length === 0 ? (
        <EmptyState emoji="📝" title="Belum ada rencana terkirim" description="Kirim rencana mengajar pertamamu untuk mendapatkan feedback." />
      ) : (
        <div className="space-y-2.5">
          {submissions.map((s) => {
            const plan = parseJson<{ objectives?: string }>(s.planJson, {});
            return (
              <Card key={s.id} className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <p className="font-extrabold text-sm">{s.briefSlug.replace(/-/g, " ")}</p>
                  <Chip tone={s.status === "REVIEWED" ? "success" : "muted"}>
                    {s.status === "REVIEWED" ? "Direview" : "Terkirim"}
                  </Chip>
                </div>
                <p className="text-xs text-ink-muted mt-0.5">{relativeTime(s.createdAt)}</p>
                {plan.objectives ? <p className="text-sm mt-2 line-clamp-2">{plan.objectives}</p> : null}
              </Card>
            );
          })}
        </div>
      )}
    </main>
  );
}
