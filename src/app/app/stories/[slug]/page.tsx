import { notFound } from "next/navigation";
import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { getContentBySlug, contentData, type StoryData } from "@/lib/content";
import { Card, Chip, ListBlock } from "@/components/ui";
import { SaveButton, MarkUsedButton } from "@/components/save-button";
import { formatAgeRange, formatDuration } from "@/lib/utils";

export default async function StoryDetailPage({ params }: PageProps<"/app/stories/[slug]">) {
  const { slug } = await params;
  const user = await requireUser();
  const item = await getContentBySlug(slug);
  if (!item || item.type !== "STORY_TEMPLATE") notFound();

  const data = contentData<StoryData>(item);
  const saved = await db.savedItem.findUnique({
    where: { userId_contentId: { userId: user.id, contentId: item.id } },
  });

  return (
    <main>
      <h1 className="text-2xl font-black mt-2 leading-tight">{item.title}</h1>
      <p className="text-ink-muted mt-2">{item.summary}</p>
      <div className="flex flex-wrap gap-1.5 mt-3">
        <Chip tone="primary">{formatAgeRange(item.ageMinMonths, item.ageMaxMonths)}</Chip>
        <Chip>{formatDuration(item.durationMin, item.durationMax)}</Chip>
        {(data.values ?? []).map((v) => (
          <Chip key={v} tone="secondary">
            {v}
          </Chip>
        ))}
      </div>

      <div className="flex gap-2 mt-5">
        <SaveButton contentId={item.id} initialSaved={Boolean(saved)} />
        <MarkUsedButton contentId={item.id} title={item.title} />
      </div>

      <Card className="p-5 mt-5">
        <div className="mb-4">
          <h4 className="text-sm font-extrabold mb-1.5">❓ Pertanyaan pembuka</h4>
          <p className="text-sm italic">“{data.openingQuestion}”</p>
        </div>
        <ListBlock title="🧑‍🤝‍🧑 Tokoh" items={data.characters ?? []} />
        <div className="mb-4">
          <h4 className="text-sm font-extrabold mb-1.5">🏞 Latar</h4>
          <p className="text-sm">{data.setting}</p>
        </div>
      </Card>

      <Card className="p-5 mt-4">
        <h4 className="text-sm font-extrabold mb-2">📜 Alur cerita</h4>
        <ol className="space-y-2 list-decimal list-inside">
          {(data.plotBeats ?? []).map((beat, i) => (
            <li key={i} className="text-sm leading-relaxed">
              {beat}
            </li>
          ))}
        </ol>
      </Card>

      <Card className="p-5 mt-4 bg-primary-soft border-primary/30">
        <h4 className="text-sm font-extrabold mb-2">💬 Titik interaksi dengan anak</h4>
        <ul className="space-y-2">
          {(data.interactionPoints ?? []).map((p, i) => (
            <li key={i} className="text-sm italic">
              “{p}”
            </li>
          ))}
        </ul>
      </Card>

      <Card className="p-5 mt-4">
        <ListBlock title="🎭 Ekspresi & gerakan guru" items={data.gestures ?? []} />
        <ListBlock title="❓ Pertanyaan setelah cerita" items={data.closingQuestions ?? []} />
        <div className="mb-4">
          <h4 className="text-sm font-extrabold mb-1.5">💛 Pesan</h4>
          <p className="text-sm">{data.message}</p>
        </div>
        <div>
          <h4 className="text-sm font-extrabold mb-1.5">➡️ Aktivitas lanjutan</h4>
          <p className="text-sm">{data.followUpActivity}</p>
        </div>
      </Card>
    </main>
  );
}
