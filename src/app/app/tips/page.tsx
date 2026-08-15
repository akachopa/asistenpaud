import { listContent, toContentRow } from "@/lib/content";
import { EmptyState } from "@/components/ui";
import { FilterBar, SearchBox } from "@/components/filter-bar";
import { PageHeader } from "@/components/page-header";
import { ContentTable } from "@/components/content-table";
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
    <main className="w-full">
      <PageHeader title="Tips Mengajar 💡" description="Strategi praktis menghadapi situasi kelas — ringkas dan langsung dipakai." />
      <SearchBox basePath="/app/tips" placeholder="Cari tips..." defaultValue={current.q} />
      <FilterBar
        basePath="/app/tips"
        current={current}
        groups={[{ name: "Kategori", key: "category", options: CATEGORY_OPTIONS }]}
      />
      <div className="mt-4">
        {items.length === 0 ? (
          <EmptyState emoji="💡" title="Belum ada tips untuk filter ini" description="Coba kategori lain atau kata kunci berbeda." />
        ) : (
          <ContentTable
            rows={items.map((item) => toContentRow(item))}
            searchPlaceholder="Cari di tabel tips..."
            emptyTitle="Tidak ada tips"
            hideMeta
          />
        )}
      </div>
    </main>
  );
}
