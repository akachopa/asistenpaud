import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { PageHeader } from "@/components/page-header";
import { ChallengesTable } from "./challenges-table";

export const metadata = { title: "Challenge" };

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
    <main className="w-full">
      <PageHeader
        title="Simulasi Kelas 🎭"
        description={`${doneIds.size} dari ${simulators.length} skenario selesai. Ambil keputusan, lihat konsekuensinya, dapatkan feedback.`}
      />
      <ChallengesTable
        rows={simulators.map((sim) => ({
          id: sim.id,
          slug: sim.slug,
          title: sim.title,
          description: sim.description,
          ageContext: sim.ageContext,
          difficulty: sim.difficulty,
          done: doneIds.has(sim.id),
        }))}
      />
    </main>
  );
}
