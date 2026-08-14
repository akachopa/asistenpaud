import Link from "next/link";
import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { getTotalXp, levelForXp } from "@/lib/xp";
import { Card, LinkButton, SectionTitle } from "@/components/ui";

export default async function StudentHomePage({ searchParams }: PageProps<"/student">) {
  const user = await requireUser();
  const params = await searchParams;
  const quickwin = params.quickwin === "1";

  const [xp, completedSims, simulators] = await Promise.all([
    getTotalXp(user.id),
    db.simulatorAttempt.findMany({
      where: { userId: user.id, status: "COMPLETED" },
      select: { simulatorId: true },
    }),
    db.simulator.findMany({ where: { status: "APPROVED" }, take: 50 }),
  ]);
  const level = levelForXp(xp);
  const completedIds = new Set(completedSims.map((s) => s.simulatorId));
  const nextSim = simulators.find((s) => !completedIds.has(s.id)) ?? simulators[0];
  const progressPct = level.nextLevel
    ? Math.min(100, Math.round(((xp - level.minXp) / (level.nextLevel.minXp - level.minXp)) * 100))
    : 100;

  return (
    <main>
      {quickwin ? (
        <p className="bg-secondary-soft text-warning font-bold text-sm rounded-2xl px-4 py-3 mt-2">
          🎉 Akunmu siap! Coba langsung simulasi mengajar pertamamu di bawah.
        </p>
      ) : null}
      <p className="text-sm text-ink-muted mt-2">Halo, {user.name.split(" ")[0]}!</p>
      <h1 className="text-2xl font-black leading-tight mt-1">Siap latihan menjadi guru hari ini? 💪</h1>

      <Card className="p-4 mt-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-ink-muted">Level {level.level}</p>
            <p className="font-black text-primary-strong">{level.title}</p>
          </div>
          <p className="font-black text-xl">{xp} XP</p>
        </div>
        <div className="mt-2 h-2.5 rounded-full bg-surface-muted overflow-hidden" role="progressbar" aria-valuenow={progressPct} aria-valuemin={0} aria-valuemax={100}>
          <div className="h-full bg-primary rounded-full" style={{ width: `${progressPct}%` }} />
        </div>
        {level.nextLevel ? (
          <p className="text-xs text-ink-muted mt-1.5">
            {level.nextLevel.minXp - xp} XP lagi menuju {level.nextLevel.title}
          </p>
        ) : null}
      </Card>

      {nextSim ? (
        <>
          <SectionTitle>Tantangan hari ini 🎭</SectionTitle>
          <Card className="p-5">
            <p className="text-xs font-bold text-ink-muted">{nextSim.ageContext}</p>
            <h2 className="font-black text-lg mt-1">{nextSim.title}</h2>
            <p className="text-sm text-ink-muted mt-1">{nextSim.description}</p>
            <LinkButton href={`/student/simulators/${nextSim.slug}`} className="w-full mt-4">
              ▶ Mulai Simulasi (+30 XP)
            </LinkButton>
          </Card>
        </>
      ) : null}

      <SectionTitle>Latihan lainnya</SectionTitle>
      <div className="grid grid-cols-2 gap-3">
        {[
          { href: "/student/challenges", icon: "🎭", label: "Simulator", desc: "Hadapi situasi kelas" },
          { href: "/student/microteaching", icon: "📝", label: "Microteaching", desc: "Rancang & dapat feedback" },
          { href: "/student/learn", icon: "📘", label: "Belajar", desc: "Learning path 6 level" },
          { href: "/student/portfolio", icon: "🏅", label: "Portfolio", desc: "Rekam jejak latihanmu" },
        ].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="bg-surface border border-line rounded-(--radius-card) p-4 hover:border-primary transition-colors"
          >
            <span className="text-2xl" aria-hidden>
              {item.icon}
            </span>
            <p className="font-extrabold text-sm mt-1.5">{item.label}</p>
            <p className="text-xs text-ink-muted mt-0.5">{item.desc}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
