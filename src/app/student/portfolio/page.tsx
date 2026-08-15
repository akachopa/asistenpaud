import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { getTotalXp, levelForXp } from "@/lib/xp";
import { Card, SectionTitle } from "@/components/ui";
import { PageHeader } from "@/components/page-header";
import { relativeTime, parseJson } from "@/lib/utils";
import { PortfolioMicroTable, PortfolioSimTable } from "./portfolio-tables";

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
    <main className="w-full">
      <PageHeader title="Practice Portfolio 🏅" description="Rekam jejak latihan, badge, dan refleksi." />

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
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
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
      <PortfolioSimTable
        rows={attempts.map((a) => ({
          id: a.id,
          title: a.simulator.title,
          when: a.completedAt ? relativeTime(a.completedAt) : "",
          reflection: a.reflection ?? "",
        }))}
      />

      <SectionTitle>Microteaching 📝</SectionTitle>
      <PortfolioMicroTable
        rows={submissions.map((s) => {
          const plan = parseJson<{ objectives?: string }>(s.planJson, {});
          return {
            id: s.id,
            title: s.briefSlug.replace(/-/g, " "),
            status: s.status,
            when: relativeTime(s.createdAt),
            objectives: plan.objectives ?? "",
          };
        })}
      />
    </main>
  );
}
