import { listContent } from "@/lib/content";
import { ContentCard } from "@/components/content-card";
import { EmptyState, LinkButton } from "@/components/ui";
import { SearchBox } from "@/components/filter-bar";
import { currentFilterValues, filtersFromSearchParams } from "@/lib/filters";

export const metadata = { title: "Cerita" };

export default async function StoriesPage({ searchParams }: PageProps<"/app/stories">) {
  const params = await searchParams;
  const filters = filtersFromSearchParams(params);
  const current = currentFilterValues(params);
  const items = await listContent("STORY_TEMPLATE", filters);

  return (
    <main>
      <div className="flex items-center justify-between mt-2 mb-4">
        <h1 className="text-2xl font-black">Cerita 📖</h1>
        <LinkButton href="/app/stories/new" variant="secondary" className="!min-h-10 !px-4 text-sm">
          🪄 Buat Baru
        </LinkButton>
      </div>
      <SearchBox basePath="/app/stories" placeholder="Cari cerita..." defaultValue={current.q} />
      <div className="space-y-2.5 mt-4">
        {items.length === 0 ? (
          <EmptyState
            emoji="📖"
            title="Belum menemukan cerita yang pas"
            description="Biar AI merangkai cerita baru sesuai tema kelasmu."
            action={<LinkButton href="/app/stories/new">🪄 Buatkan Cerita</LinkButton>}
          />
        ) : (
          items.map((item) => <ContentCard key={item.id} item={item} />)
        )}
      </div>
    </main>
  );
}
