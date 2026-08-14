import Link from "next/link";
import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { Chip } from "@/components/ui";

export const metadata = { title: "Challenge" };

const DIFFICULTY_TONE: Record<string, "success" | "warning" | "danger"> = {
  DASAR: "success",
  MENENGAH: "warning",
  LANJUT: "danger",
};

export default async function ChallengesPage() {
  const user = await requireUser();
  const [simulators, attempts] = await Promise.all([
    db.simulator.findMany({ where: { status: "APPROVED" }, orderBy: { title: "asc" } }),
    db.simulatorAttempt.findMany({
      where: { userId: user.id, status: "COMPLETED" },
      select: { simulatorId: true },
    }),
  ]);
  const doneIds = new Set(attempts.map((a) => a.simulatorId));

  return (
    <main>
      <h1 className="text-2xl font-black mt-2 mb-1">Simulasi Kelas 🎭</h1>
      <p className="text-sm text-ink-muted mb-5">
        {doneIds.size} dari {simulators.length} skenario selesai · Ambil keputusan, lihat konsekuensinya, dapatkan feedback.
      </p>
      <div className="space-y-2.5">
        {simulators.map((sim) => (
          <Link
            key={sim.id}
            href={`/student/simulators/${sim.slug}`}
            className="block bg-surface border border-line rounded-(--radius-card) p-4 hover:border-primary transition-colors"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <h2 className="font-extrabold leading-snug">{sim.title}</h2>
                <p className="text-sm text-ink-muted mt-1 line-clamp-2">{sim.description}</p>
                <p className="text-xs text-ink-muted mt-1.5">{sim.ageContext}</p>
              </div>
              <div className="flex flex-col items-end gap-1.5 shrink-0">
                {doneIds.has(sim.id) ? <Chip tone="success">✓ Selesai</Chip> : null}
                <Chip tone={DIFFICULTY_TONE[sim.difficulty] ?? "muted"}>{sim.difficulty}</Chip>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
