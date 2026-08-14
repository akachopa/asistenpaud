import { notFound } from "next/navigation";
import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { Chip } from "@/components/ui";
import { SimulatorPlayer } from "./simulator-player";

export default async function SimulatorPage({ params }: PageProps<"/student/simulators/[slug]">) {
  const { slug } = await params;
  await requireUser();
  const simulator = await db.simulator.findUnique({ where: { slug } });
  if (!simulator || simulator.status !== "APPROVED") notFound();

  return (
    <main>
      <div className="flex flex-wrap gap-1.5 mt-2">
        <Chip tone="primary">{simulator.difficulty}</Chip>
        <Chip>{simulator.ageContext}</Chip>
      </div>
      <h1 className="text-2xl font-black leading-tight mt-2">{simulator.title}</h1>
      <p className="text-ink-muted mt-1.5 mb-5">{simulator.description}</p>
      <SimulatorPlayer simulatorId={simulator.id} />
    </main>
  );
}
