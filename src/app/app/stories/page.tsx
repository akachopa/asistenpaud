import { listContent, toContentRow } from "@/lib/content";
import { EmptyState, LinkButton } from "@/components/ui";
import { SearchBox } from "@/components/filter-bar";
import { PageHeader } from "@/components/page-header";
import { ContentTable } from "@/components/content-table";
import { currentFilterValues, filtersFromSearchParams } from "@/lib/filters";

export const metadata = { title: "Cerita" };

export default async function StoriesPage({ searchParams }: PageProps<"/app/stories">) {
  const params = await searchParams;
  const filters = filtersFromSearchParams(params);
  const current = currentFilterValues(params);
  const items = await listContent("STORY_TEMPLATE", filters);

  return (
    <main className="w-full">
      <PageHeader
        title="Cerita 📖"
        description="Kerangka cerita interaktif dengan tokoh original, siap dibawakan."
        action={<LinkButton href="/app/stories/new" variant="secondary">🪄 Buat Baru</LinkButton>}
      />
      <SearchBox basePath="/app/stories" placeholder="Cari cerita..." defaultValue={current.q} />
      <div className="mt-4">
        {items.length === 0 ? (
          <EmptyState
            emoji="📖"
            title="Belum menemukan cerita yang pas"
            description="Biar AI merangkai cerita baru sesuai tema kelasmu."
            action={<LinkButton href="/app/stories/new">🪄 Buatkan Cerita</LinkButton>}
          />
        ) : (
          <ContentTable
            rows={items.map((item) => toContentRow(item))}
            searchPlaceholder="Cari di tabel cerita..."
            emptyTitle="Tidak ada cerita"
          />
        )}
      </div>
    </main>
  );
}
