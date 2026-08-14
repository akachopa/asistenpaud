import { listContent } from "@/lib/content";
import { ContentCard } from "@/components/content-card";
import { EmptyState, LinkButton } from "@/components/ui";
import { FilterBar, SearchBox } from "@/components/filter-bar";
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
    <main>
      <h1 className="text-2xl font-black mt-2 mb-4">Aktivitas 🎨</h1>
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
      <div className="space-y-2.5 mt-4">
        {items.length === 0 ? (
          <EmptyState
            emoji="🔎"
            title="Belum menemukan aktivitas yang pas"
            description="Coba longgarkan filter, atau biar AI membuatkan satu sesuai kondisi kelasmu."
            action={<LinkButton href="/app/activity/new">✨ Buatkan Aktivitas</LinkButton>}
          />
        ) : (
          items.map((item) => <ContentCard key={item.id} item={item} />)
        )}
      </div>
    </main>
  );
}
