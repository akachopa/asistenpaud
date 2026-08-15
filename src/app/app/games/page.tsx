import { listContent, toContentRow } from "@/lib/content";
import { EmptyState, LinkButton } from "@/components/ui";
import { FilterBar, SearchBox } from "@/components/filter-bar";
import { PageHeader } from "@/components/page-header";
import { ContentTable } from "@/components/content-table";
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
    <main className="w-full">
      <PageHeader
        title="Games 🎲"
        description="Permainan cepat untuk segala situasi kelas."
        action={<LinkButton href="/app/random-game" variant="secondary">🎰 Acak!</LinkButton>}
      />
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
      <div className="mt-4">
        {items.length === 0 ? (
          <EmptyState
            emoji="🎲"
            title="Belum menemukan game yang pas"
            description="Coba longgarkan filter atau gunakan pengacak game sesuai kondisi kelasmu."
            action={<LinkButton href="/app/random-game">🎰 Kasih Saya Game!</LinkButton>}
          />
        ) : (
          <ContentTable
            rows={items.map((item) => toContentRow(item))}
            searchPlaceholder="Cari di tabel games..."
            emptyTitle="Tidak ada game"
          />
        )}
      </div>
    </main>
  );
}
