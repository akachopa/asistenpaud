import { notFound } from "next/navigation";
import { getContentBySlug, contentData, type TipData } from "@/lib/content";
import { Card, Chip, ListBlock } from "@/components/ui";

export default async function TipDetailPage({ params }: PageProps<"/app/tips/[slug]">) {
  const { slug } = await params;
  const item = await getContentBySlug(slug);
  if (!item || item.type !== "TIP") notFound();

  const data = contentData<TipData>(item);

  return (
    <main>
      <Chip tone="secondary">{data.category}</Chip>
      <h1 className="text-2xl font-black mt-2 leading-tight">{item.title}</h1>

      <Card className="p-5 mt-5">
        <h4 className="text-sm font-extrabold mb-1.5">📍 Situasi</h4>
        <p className="text-sm leading-relaxed">{data.situation}</p>
      </Card>

      <Card className="p-5 mt-4">
        <ListBlock title="✅ Apa yang bisa dilakukan sekarang" items={data.actions ?? []} />
      </Card>

      {data.exampleScripts?.length ? (
        <Card className="p-5 mt-4 bg-primary-soft border-primary/30">
          <h4 className="text-sm font-extrabold mb-2">🗣 Contoh kalimat guru</h4>
          <ul className="space-y-2">
            {data.exampleScripts.map((s, i) => (
              <li key={i} className="text-sm italic leading-relaxed">
                “{s}”
              </li>
            ))}
          </ul>
        </Card>
      ) : null}

      <Card className="p-5 mt-4">
        <ListBlock title="🚫 Hindari" items={data.avoid ?? []} tone="danger" />
        <div>
          <h4 className="text-sm font-extrabold mb-1.5">🤝 Kapan perlu bantuan lebih lanjut</h4>
          <p className="text-sm leading-relaxed">{data.escalation}</p>
        </div>
      </Card>
    </main>
  );
}
