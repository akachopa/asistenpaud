import { listContent } from "@/lib/content";
import { ContentCard } from "@/components/content-card";
import { EmptyState, LinkButton } from "@/components/ui";
import { FilterBar, SearchBox } from "@/components/filter-bar";
import { AGE_FILTER_OPTIONS, DURATION_FILTER_OPTIONS, currentFilterValues, filtersFromSearchParams } from "@/lib/filters";

export const metadata = { title: "Games" };

const CATEGORY_OPTIONS = [
  "Ice Breaking",
  "Fokus",
  "Energi Tinggi",
  "Calm Down",
  "Motorik",
  "Bahasa",
  "Numerasi",
  "Musik",
  "Tanpa Alat",
  "5 Menit",
  "Transisi Kegiatan",
].map((c) => ({ label: c, value: c }));

export default async function GamesPage({ searchParams }: PageProps<"/app/games">) {
  const params = await searchParams;
  const filters = filtersFromSearchParams(params);
  const current = currentFilterValues(params);
  const items = await listContent("GAME", filters);

  return (
    <main>
      <div className="flex items-center justify-between mt-2 mb-4">
        <h1 className="text-2xl font-black">Games 🎲</h1>
        <LinkButton href="/app/random-game" variant="secondary" className="!min-h-10 !px-4 text-sm">
          🎰 Acak!
        </LinkButton>
      </div>
      <SearchBox basePath="/app/games" placeholder="Cari game... mis. tepuk, lingkaran" defaultValue={current.q} />
      <FilterBar
        basePath="/app/games"
        current={current}
        groups={[
          { name: "Usia", key: "age", options: AGE_FILTER_OPTIONS },
          { name: "Durasi", key: "duration", options: DURATION_FILTER_OPTIONS },
          { name: "Kategori", key: "category", options: CATEGORY_OPTIONS },
        ]}
      />
      <div className="space-y-2.5 mt-4">
        {items.length === 0 ? (
          <EmptyState
            emoji="🎲"
            title="Belum menemukan game yang pas"
            description="Coba longgarkan filter atau gunakan pengacak game sesuai kondisi kelasmu."
            action={<LinkButton href="/app/random-game">🎰 Kasih Saya Game!</LinkButton>}
          />
        ) : (
          items.map((item) => <ContentCard key={item.id} item={item} />)
        )}
      </div>
    </main>
  );
}
