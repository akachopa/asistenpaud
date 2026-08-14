import { listContent } from "@/lib/content";
import { ContentCard } from "@/components/content-card";
import { EmptyState } from "@/components/ui";
import { FilterBar, SearchBox } from "@/components/filter-bar";
import { currentFilterValues, filtersFromSearchParams } from "@/lib/filters";

export const metadata = { title: "Tips Mengajar" };

const CATEGORY_OPTIONS = [
  "Anak menangis",
  "Anak berebut",
  "Anak tidak fokus",
  "Anak pemalu",
  "Kelas terlalu aktif",
  "Transisi aktivitas",
  "Komunikasi dengan orang tua",
  "Classroom management",
  "Bahasa positif",
  "Persiapan mengajar",
  "Observasi",
  "Adaptasi sekolah",
].map((c) => ({ label: c, value: c }));

export default async function TipsPage({ searchParams }: PageProps<"/app/tips">) {
  const params = await searchParams;
  const filters = filtersFromSearchParams(params);
  const current = currentFilterValues(params);
  const items = await listContent("TIP", filters);

  return (
    <main>
      <h1 className="text-2xl font-black mt-2 mb-4">Tips Mengajar 💡</h1>
      <SearchBox basePath="/app/tips" placeholder="Cari tips..." defaultValue={current.q} />
      <FilterBar
        basePath="/app/tips"
        current={current}
        groups={[{ name: "Kategori", key: "category", options: CATEGORY_OPTIONS }]}
      />
      <div className="space-y-2.5 mt-4">
        {items.length === 0 ? (
          <EmptyState emoji="💡" title="Belum ada tips untuk filter ini" description="Coba kategori lain atau kata kunci berbeda." />
        ) : (
          items.map((item) => <ContentCard key={item.id} item={item} />)
        )}
      </div>
    </main>
  );
}
