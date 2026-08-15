import "server-only";
import { db } from "@/lib/db";
import type { ContentItem } from "@prisma/client";
import { parseJson } from "@/lib/utils";

export interface ContentFilters {
  q?: string;
  ageMonths?: number; // usia target dalam bulan (mis. 54 utk 4-5 th)
  maxDuration?: number;
  category?: string;
  theme?: string;
  location?: string;
  noTools?: boolean;
  groupSize?: number;
}

export async function listContent(
  type: string,
  filters: ContentFilters,
  take = 400,
): Promise<ContentItem[]> {
  const where: Record<string, unknown> = { type, status: "APPROVED" };
  if (filters.ageMonths) {
    where.ageMinMonths = { lte: filters.ageMonths };
    where.ageMaxMonths = { gte: filters.ageMonths };
  }
  if (filters.maxDuration) where.durationMin = { lte: filters.maxDuration };
  if (filters.location) where.location = { in: [filters.location, "KEDUANYA"] };
  if (filters.noTools) where.noTools = true;
  if (filters.category) where.categories = { contains: `"${filters.category}"` };
  if (filters.theme) where.themes = { contains: `"${filters.theme}"` };
  if (filters.groupSize) {
    where.groupSizeMin = { lte: filters.groupSize };
    where.groupSizeMax = { gte: filters.groupSize };
  }
  if (filters.q) {
    const q = filters.q.trim();
    where.OR = [
      { title: { contains: q } },
      { summary: { contains: q } },
      { categories: { contains: q } },
      { themes: { contains: q } },
    ];
  }
  return db.contentItem.findMany({ where, orderBy: { title: "asc" }, take });
}

export async function getContentBySlug(slug: string): Promise<ContentItem | null> {
  return db.contentItem.findFirst({ where: { slug, status: "APPROVED" } });
}

// Random game engine: query database dulu, ranking, hindari pengulangan terlalu cepat.
export async function pickRandomGame(
  filters: ContentFilters,
  excludeIds: string[] = [],
): Promise<ContentItem | null> {
  const candidates = await listContent("GAME", filters, 200);
  if (candidates.length === 0) return null;
  const fresh = candidates.filter((c) => !excludeIds.includes(c.id));
  const pool = fresh.length > 0 ? fresh : candidates;
  return pool[Math.floor(Math.random() * pool.length)];
}

// Rekomendasi MVP: score-based sederhana.
export async function recommendForUser(
  userId: string,
  agePreference: string | null,
  take = 4,
): Promise<ContentItem[]> {
  const ageMonths = agePreference
    ? Math.round((Number(agePreference.split("-")[0]) + Number(agePreference.split("-")[1])) / 2)
    : undefined;

  const recentIds = (
    await db.teachingSession.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: 20,
      select: { contentId: true },
    })
  )
    .map((s) => s.contentId)
    .filter((id): id is string => Boolean(id));

  const items = await db.contentItem.findMany({
    where: {
      type: { in: ["ACTIVITY", "GAME"] },
      status: "APPROVED",
      ...(ageMonths ? { ageMinMonths: { lte: ageMonths }, ageMaxMonths: { gte: ageMonths } } : {}),
    },
    take: 80,
  });

  const scored = items.map((item) => {
    let score = Math.random() * 2; // sedikit variasi
    if (!recentIds.includes(item.id)) score += 3;
    if (item.noTools) score += 1;
    if (item.setupLevel === "TANPA_PERSIAPAN") score += 1;
    return { item, score };
  });
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, take).map((s) => s.item);
}

export interface GameData {
  hook: string;
  materials: string[];
  preparation: string[];
  steps: string[];
  teacherScript: string[];
  variations: string[];
  objectives: string[];
  observationPoints: string[];
  safetyNotes: string[];
}

export interface ActivityData {
  learningElements: string[];
  objectives: string[];
  materials: string[];
  preparation: string[];
  opening: string[];
  mainSteps: string[];
  closing: string[];
  teacherScript: string[];
  observationPoints: string[];
  adaptations: string[];
  safetyNotes: string[];
  noToolAlternative: string[];
  reflectionQuestions: string[];
}

export interface TipData {
  category: string;
  situation: string;
  actions: string[];
  exampleScripts: string[];
  avoid: string[];
  escalation: string;
}

export interface StoryData {
  values: string[];
  openingQuestion: string;
  characters: string[];
  setting: string;
  plotBeats: string[];
  interactionPoints: string[];
  gestures: string[];
  closingQuestions: string[];
  message: string;
  followUpActivity: string;
}

export interface BriefData {
  ageRange: string;
  childCount: number;
  durationMinutes: number;
  theme: string;
  constraint: string;
  goal: string;
  hints: string[];
}

export function contentData<T>(item: ContentItem): T {
  return parseJson<T>(item.data, {} as T);
}

export function contentCategories(item: ContentItem): string[] {
  return parseJson<string[]>(item.categories, []);
}

export function contentThemes(item: ContentItem): string[] {
  return parseJson<string[]>(item.themes, []);
}

const TYPE_PATHS: Record<string, string> = {
  ACTIVITY: "/app/activities",
  GAME: "/app/games",
  TIP: "/app/tips",
  STORY_TEMPLATE: "/app/stories",
  MICROTEACHING_BRIEF: "/student/microteaching",
};

export function toContentRow(item: ContentItem, hrefOverride?: string) {
  const min = Math.floor(item.ageMinMonths / 12);
  const max = Math.ceil(item.ageMaxMonths / 12);
  return {
    id: item.id,
    slug: item.slug,
    title: item.title,
    summary: item.summary,
    type: item.type,
    href: hrefOverride ?? `${TYPE_PATHS[item.type] ?? "/app/activities"}/${item.slug}`,
    ageLabel: `${min}\u2013${max} tahun`,
    durationLabel: item.durationMin === item.durationMax ? `${item.durationMin} menit` : `${item.durationMin}\u2013${item.durationMax} menit`,
    noTools: item.noTools,
    location: item.location,
    categories: parseJson<string[]>(item.categories, []).join(", "),
  };
}
