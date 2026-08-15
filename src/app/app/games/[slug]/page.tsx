import { notFound } from "next/navigation";
import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { getContentBySlug, contentData, type GameData } from "@/lib/content";
import { Card, Chip, ListBlock } from "@/components/ui";
import { StepMode } from "@/components/step-mode";
import { SaveButton, MarkUsedButton } from "@/components/save-button";
import { formatAgeRange, formatDuration, parseJson } from "@/lib/utils";

export default async function GameDetailPage({ params }: PageProps<"/app/games/[slug]">) {
  const { slug } = await params;
  const user = await requireUser();
  const item = await getContentBySlug(slug);
  if (!item || item.type !== "GAME") notFound();

  const data = contentData<GameData>(item);
  const saved = await db.savedItem.findUnique({
    where: { userId_contentId: { userId: user.id, contentId: item.id } },
  });
  const categories = parseJson<string[]>(item.categories, []);

  return (
    <main className="w-full max-w-3xl">
      <h1 className="text-2xl font-black mt-2 leading-tight">{item.title}</h1>
      {data.hook ? <p className="text-primary-strong font-bold mt-1.5">{data.hook}</p> : null}
      <p className="text-ink-muted mt-1.5">{item.summary}</p>
      <div className="flex flex-wrap gap-1.5 mt-3">
        <Chip tone="primary">{formatAgeRange(item.ageMinMonths, item.ageMaxMonths)}</Chip>
        <Chip>{formatDuration(item.durationMin, item.durationMax)}</Chip>
        <Chip>
          {item.groupSizeMin}–{item.groupSizeMax} anak
        </Chip>
        {item.noTools ? <Chip tone="success">Tanpa alat</Chip> : null}
        {categories.slice(0, 3).map((c) => (
          <Chip key={c}>{c}</Chip>
        ))}
      </div>

      <div className="mt-5 space-y-2.5">
        <StepMode steps={data.steps ?? []} title={item.title} />
        <div className="flex gap-2">
          <SaveButton contentId={item.id} initialSaved={Boolean(saved)} />
          <MarkUsedButton contentId={item.id} title={item.title} />
        </div>
      </div>

      <Card className="p-5 mt-5">
        <ListBlock title="🧺 Alat" items={data.materials?.length ? data.materials : ["Tanpa alat — siap langsung dimainkan!"]} />
        <ListBlock title="🛠 Persiapan" items={data.preparation ?? []} />
        <ListBlock title="🎮 Cara bermain" items={data.steps ?? []} />
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
        <ListBlock title="🎯 Tujuan" items={data.objectives ?? []} />
        <ListBlock title="🔄 Variasi" items={data.variations ?? []} />
        <ListBlock title="👀 Yang diamati" items={data.observationPoints ?? []} />
        <ListBlock title="⚠️ Keamanan" items={data.safetyNotes ?? []} tone="danger" />
      </Card>
    </main>
  );
}
