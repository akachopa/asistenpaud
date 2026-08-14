import { notFound } from "next/navigation";
import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { getContentBySlug, contentData, type ActivityData } from "@/lib/content";
import { Card, Chip, ListBlock } from "@/components/ui";
import { StepMode } from "@/components/step-mode";
import { SaveButton, MarkUsedButton } from "@/components/save-button";
import { formatAgeRange, formatDuration, parseJson } from "@/lib/utils";

export default async function ActivityDetailPage({ params }: PageProps<"/app/activities/[slug]">) {
  const { slug } = await params;
  const user = await requireUser();
  const item = await getContentBySlug(slug);
  if (!item || item.type !== "ACTIVITY") notFound();

  const data = contentData<ActivityData>(item);
  const saved = await db.savedItem.findUnique({
    where: { userId_contentId: { userId: user.id, contentId: item.id } },
  });
  const categories = parseJson<string[]>(item.categories, []);
  const allSteps = [...(data.opening ?? []), ...(data.mainSteps ?? []), ...(data.closing ?? [])];

  return (
    <main>
      <h1 className="text-2xl font-black mt-2 leading-tight">{item.title}</h1>
      <p className="text-ink-muted mt-2">{item.summary}</p>
      <div className="flex flex-wrap gap-1.5 mt-3">
        <Chip tone="primary">{formatAgeRange(item.ageMinMonths, item.ageMaxMonths)}</Chip>
        <Chip>{formatDuration(item.durationMin, item.durationMax)}</Chip>
        {item.noTools ? <Chip tone="success">Tanpa alat</Chip> : null}
        {categories.map((c) => (
          <Chip key={c}>{c}</Chip>
        ))}
      </div>

      <div className="mt-5 space-y-2.5">
        <StepMode steps={allSteps} title={item.title} />
        <div className="flex gap-2">
          <SaveButton contentId={item.id} initialSaved={Boolean(saved)} />
          <MarkUsedButton contentId={item.id} title={item.title} />
        </div>
      </div>

      <Card className="p-5 mt-5">
        <ListBlock title="🎯 Tujuan" items={data.objectives ?? []} />
        <ListBlock title="🧺 Alat & bahan" items={data.materials?.length ? data.materials : ["Tanpa alat — siap langsung dimainkan!"]} />
        <ListBlock title="🛠 Persiapan" items={data.preparation ?? []} />
      </Card>

      <Card className="p-5 mt-4">
        <ListBlock title="👋 Pembukaan" items={data.opening ?? []} />
        <ListBlock title="⭐ Kegiatan inti" items={data.mainSteps ?? []} />
        <ListBlock title="🌙 Penutup" items={data.closing ?? []} />
      </Card>

      {data.teacherScript?.length ? (
        <Card className="p-5 mt-4 bg-primary-soft border-primary/30">
          <h4 className="text-sm font-extrabold mb-2">🗣 Kalimat guru</h4>
          <ul className="space-y-2">
            {data.teacherScript.map((s, i) => (
              <li key={i} className="text-sm italic leading-relaxed">
                “{s}”
              </li>
            ))}
          </ul>
        </Card>
      ) : null}

      <Card className="p-5 mt-4">
        <ListBlock title="👀 Yang diamati" items={data.observationPoints ?? []} />
        <ListBlock title="🔄 Adaptasi" items={data.adaptations ?? []} />
        <ListBlock title="⚠️ Catatan keamanan" items={data.safetyNotes ?? []} tone="danger" />
        {data.noToolAlternative?.length ? <ListBlock title="🙌 Alternatif tanpa alat" items={data.noToolAlternative} /> : null}
        <ListBlock title="🪞 Refleksi guru" items={data.reflectionQuestions ?? []} />
      </Card>
    </main>
  );
}
