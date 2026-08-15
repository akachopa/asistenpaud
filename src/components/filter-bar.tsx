import Link from "next/link";

export interface FilterOption {
  label: string;
  params: Record<string, string>;
}

// Filter berbasis link GET agar tetap bekerja tanpa JavaScript dan mudah dibagikan.
export function FilterBar({
  basePath,
  current,
  groups,
}: {
  basePath: string;
  current: Record<string, string | undefined>;
  groups: { name: string; key: string; options: { label: string; value: string }[] }[];
}) {
  const buildHref = (key: string, value: string | null) => {
    const params = new URLSearchParams();
    for (const [k, v] of Object.entries(current)) {
      if (v && k !== key) params.set(k, v);
    }
    if (value) params.set(key, value);
    const qs = params.toString();
    return qs ? `${basePath}?${qs}` : basePath;
  };

  return (
    <div className="space-y-2.5">
      {groups.map((group) => (
        <div key={group.key} className="flex gap-1.5 overflow-x-auto pb-1">
          <Link
            href={buildHref(group.key, null)}
            className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-bold border-2 transition-colors ${
              !current[group.key] ? "border-primary bg-primary-soft text-primary-strong" : "border-line bg-surface text-ink-muted"
            }`}
          >
            Semua
          </Link>
          {group.options.map((opt) => {
            const active = current[group.key] === opt.value;
            return (
              <Link
                key={opt.value}
                href={buildHref(group.key, active ? null : opt.value)}
                className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-bold border-2 transition-colors ${
                  active ? "border-primary bg-primary-soft text-primary-strong" : "border-line bg-surface text-ink-muted"
                }`}
              >
                {opt.label}
              </Link>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export function SearchBox({ basePath, placeholder, defaultValue }: { basePath: string; placeholder: string; defaultValue?: string }) {
  return (
    <form action={basePath} method="GET" className="mb-3">
      <label className="sr-only" htmlFor="q">
        Cari
      </label>
      <input
        id="q"
        name="q"
        type="search"
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="w-full rounded-2xl border-2 border-line bg-surface px-4 py-3 text-base focus:border-primary focus:outline-none"
      />
    </form>
  );
}
