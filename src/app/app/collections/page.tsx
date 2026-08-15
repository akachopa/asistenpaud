import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { toContentRow } from "@/lib/content";
import { EmptyState, LinkButton } from "@/components/ui";
import { PageHeader } from "@/components/page-header";
import { ContentTable } from "@/components/content-table";

export const metadata = { title: "Koleksi" };

export default async function CollectionsPage() {
  const user = await requireUser();
  const saved = await db.savedItem.findMany({
    where: { userId: user.id },
    include: { content: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="w-full">
      <PageHeader title="Koleksiku 📚" description="Aktivitas, games, dan cerita yang kamu simpan." />
      {saved.length === 0 ? (
        <EmptyState
          emoji="📚"
          title="Koleksimu masih kosong"
          description="Simpan aktivitas, games, dan cerita favoritmu agar mudah ditemukan saat dibutuhkan."
          action={<LinkButton href="/app/explore">Jelajahi Konten</LinkButton>}
        />
      ) : (
        <ContentTable
          rows={saved.map((s) => toContentRow(s.content))}
          searchPlaceholder="Cari di koleksi..."
          emptyTitle="Tidak ada item"
        />
      )}
    </main>
  );
}
