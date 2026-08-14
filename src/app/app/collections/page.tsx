import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { ContentCard } from "@/components/content-card";
import { EmptyState, LinkButton } from "@/components/ui";

export const metadata = { title: "Koleksi" };

export default async function CollectionsPage() {
  const user = await requireUser();
  const saved = await db.savedItem.findMany({
    where: { userId: user.id },
    include: { content: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main>
      <h1 className="text-2xl font-black mt-2 mb-4">Koleksiku 📚</h1>
      {saved.length === 0 ? (
        <EmptyState
          emoji="📚"
          title="Koleksimu masih kosong"
          description="Simpan aktivitas, games, dan cerita favoritmu agar mudah ditemukan saat dibutuhkan."
          action={<LinkButton href="/app/explore">Jelajahi Konten</LinkButton>}
        />
      ) : (
        <div className="space-y-2.5">
          {saved.map((s) => (
            <ContentCard key={s.id} item={s.content} />
          ))}
        </div>
      )}
    </main>
  );
}
