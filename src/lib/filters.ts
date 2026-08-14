import type { ContentFilters } from "@/lib/content";

export const AGE_FILTER_OPTIONS = [
  { label: "2–3 th", value: "24-36" },
  { label: "3–4 th", value: "36-48" },
  { label: "4–5 th", value: "48-60" },
  { label: "5–6 th", value: "60-72" },
];

export const DURATION_FILTER_OPTIONS = [
  { label: "≤ 5 menit", value: "5" },
  { label: "≤ 10 menit", value: "10" },
  { label: "≤ 15 menit", value: "15" },
  { label: "≤ 30 menit", value: "30" },
];

export function ageParamToMonths(age?: string): number | undefined {
  if (!age) return undefined;
  const [min, max] = age.split("-").map(Number);
  if (!min || !max) return undefined;
  return Math.round((min + max) / 2);
}

export function filtersFromSearchParams(params: Record<string, string | string[] | undefined>): ContentFilters {
  const get = (key: string) => {
    const v = params[key];
    return typeof v === "string" ? v : undefined;
  };
  return {
    q: get("q"),
    ageMonths: ageParamToMonths(get("age")),
    maxDuration: get("duration") ? Number(get("duration")) : undefined,
    category: get("category"),
    theme: get("theme"),
    location: get("location"),
    noTools: get("noTools") === "1",
  };
}

export function currentFilterValues(params: Record<string, string | string[] | undefined>): Record<string, string | undefined> {
  const get = (key: string) => {
    const v = params[key];
    return typeof v === "string" ? v : undefined;
  };
  return {
    q: get("q"),
    age: get("age"),
    duration: get("duration"),
    category: get("category"),
    location: get("location"),
    noTools: get("noTools"),
  };
}
