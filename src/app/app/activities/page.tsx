import { listContent, toContentRow } from "@/lib/content";
import { EmptyState, LinkButton } from "@/components/ui";
import { FilterBar, SearchBox } from "@/components/filter-bar";
import { PageHeader } from "@/components/page-header";
import { ContentTable } from "@/components/content-table";
import { AGE_FILTER_OPTIONS, DURATION_FILTER_OPTIONS, currentFilterValues, filtersFromSearchParams } from "@/lib/filters";

export const metadata = { title: "Aktivitas" };

const CATEGORY_OPTIONS = [
  "Bahasa",
  "Motorik kasar",
  "Motorik halus",
  "Kognitif",
  "Sosial emosional",
  "Seni",
  "Sains",
  "Numerasi",
  "Sensori",
  "Karakter",
].map((c) => ({ label: c, value: c }));

export default async function ActivitiesPage({ searchParams }: PageProps<"/app/activities">) {
  const params = await searchParams;
  const filters = filtersFromSearchParams(params);
  const current = currentFilterValues(params);
  const items = await listContent("ACTIVITY", filters);

  return (
    <main className="w-full">
      <PageHeader
        title="Aktivitas 🎨"
        description="Kegiatan belajar lengkap dengan langkah, script guru, dan poin observasi."
        action={<LinkButton href="/app/activity/new">✨ Buat Baru</LinkButton>}
      />
      <SearchBox basePath="/app/activities" placeholder="Cari aktivitas..." defaultValue={current.q} />
      <FilterBar
        basePath="/app/activities"
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
            emoji="🔎"
            title="Belum menemukan aktivitas yang pas"
            description="Coba longgarkan filter, atau biar AI membuatkan satu sesuai kondisi kelasmu."
            action={<LinkButton href="/app/activity/new">✨ Buatkan Aktivitas</LinkButton>}
          />
        ) : (
          <ContentTable
            rows={items.map((item) => toContentRow(item))}
            searchPlaceholder="Cari di tabel aktivitas..."
            emptyTitle="Tidak ada aktivitas"
          />
        )}
      </div>
    </main>
  );
}
