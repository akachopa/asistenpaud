import { notFound } from "next/navigation";
import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { parseJson } from "@/lib/utils";
import type { BriefData } from "@/lib/content";
import { Card, Chip, ListBlock } from "@/components/ui";
import { MicroteachingForm } from "./microteaching-form";

export default async function MicroteachingBriefPage({ params }: PageProps<"/student/microteaching/[slug]">) {
  const { slug } = await params;
  await requireUser();
  const brief = await db.contentItem.findFirst({
    where: { slug, type: "MICROTEACHING_BRIEF", status: "APPROVED" },
  });
  if (!brief) notFound();
  const data = parseJson<BriefData>(brief.data, {} as BriefData);

  return (
    <main className="w-full max-w-3xl">
      <h1 className="text-2xl font-black leading-tight mt-2">{brief.title}</h1>
      <Card className="p-5 mt-4">
        <h2 className="font-extrabold text-sm mb-3">📋 Brief tantangan</h2>
        <div className="flex flex-wrap gap-1.5 mb-3">
          <Chip tone="primary">Usia {data.ageRange}</Chip>
          <Chip>{data.childCount} anak</Chip>
          <Chip>{data.durationMinutes} menit</Chip>
          <Chip tone="secondary">Tema: {data.theme}</Chip>
        </div>
        <p className="text-sm">
          <span className="font-bold">Kondisi khusus:</span> {data.constraint}
        </p>
        <p className="text-sm mt-1.5">
          <span className="font-bold">Fokus keterampilan:</span> {data.goal}
        </p>
        <div className="mt-3">
          <ListBlock title="💡 Petunjuk" items={data.hints ?? []} />
        </div>
      </Card>
      <MicroteachingForm briefSlug={brief.slug} />
    </main>
  );
}
