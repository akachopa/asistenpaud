"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import {
  generateActivity,
  generateStory,
  analyzeSituation,
  QuotaExceededError,
} from "@/lib/ai/service";
import {
  activityInputSchema,
  situationInputSchema,
  storyInputSchema,
  type GeneratedActivity,
  type GeneratedStory,
  type SituationAdvice,
} from "@/lib/ai/schemas";
import { sanitizeInput } from "@/lib/ai/safety";
import { pickRandomGame, type ContentFilters } from "@/lib/content";
import { awardXp } from "@/lib/xp";
import { slugify } from "@/lib/utils";

export interface GenerateActivityState {
  result?: GeneratedActivity;
  savedSlug?: string;
  error?: string;
}

export async function generateActivityAction(
  _prev: GenerateActivityState,
  formData: FormData,
): Promise<GenerateActivityState> {
  const user = await requireUser();
  const parsed = activityInputSchema.safeParse({
    ageRange: formData.get("ageRange"),
    childCount: formData.get("childCount") || 15,
    durationMinutes: formData.get("durationMinutes") || 15,
    theme: sanitizeInput(String(formData.get("theme") ?? "")),
    goal: sanitizeInput(String(formData.get("goal") ?? "")),
    location: formData.get("location") ?? "INDOOR",
    noTools: formData.get("noTools") === "on",
    materials: sanitizeInput(String(formData.get("materials") ?? "")),
    notes: sanitizeInput(String(formData.get("notes") ?? "")),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Lengkapi dulu isian utamanya ya." };
  }

  try {
    const result = await generateActivity(user.id, parsed.data);
    await db.teachingSession.create({
      data: { userId: user.id, source: "AI", title: result.title, status: "VIEWED" },
    });
    if (user.role === "STUDENT") await awardXp(user.id, "ACTIVITY_CREATED");
    return { result };
  } catch (error) {
    if (error instanceof QuotaExceededError) return { error: error.message };
    return { error: "Belum berhasil membuat aktivitas. Coba lagi atau gunakan ide dari library." };
  }
}

export async function saveGeneratedActivityAction(activity: GeneratedActivity): Promise<{ slug?: string; error?: string }> {
  const user = await requireUser();
  const baseSlug = slugify(activity.title) || "aktivitas";
  const slug = `${baseSlug}-${Date.now().toString(36)}`;
  const durationMinutes = Math.max(3, Math.min(120, Math.round(activity.duration_minutes)));
  const item = await db.contentItem.create({
    data: {
      type: "ACTIVITY",
      slug,
      title: activity.title,
      summary: activity.summary,
      status: "APPROVED", // konten personal milik user, bukan konten publik terkurasi
      authorType: "AI",
      ageMinMonths: 24,
      ageMaxMonths: 72,
      durationMin: durationMinutes,
      durationMax: durationMinutes,
      noTools: activity.materials.length === 0,
      categories: JSON.stringify(["Buatan AI"]),
      themes: "[]",
      data: JSON.stringify({
        learningElements: activity.learning_elements,
        objectives: activity.objectives,
        materials: activity.materials,
        preparation: activity.preparation,
        opening: activity.opening,
        mainSteps: activity.main_activities,
        closing: activity.closing,
        teacherScript: activity.teacher_script,
        observationPoints: activity.observation_points,
        adaptations: activity.adaptations,
        safetyNotes: activity.safety_notes,
        noToolAlternative: activity.no_tool_alternative,
        reflectionQuestions: activity.reflection_questions,
      }),
    },
  });
  await db.savedItem.create({ data: { userId: user.id, contentId: item.id } });
  revalidatePath("/app/collections");
  return { slug: item.slug };
}

export interface GenerateStoryState {
  result?: GeneratedStory;
  error?: string;
}

export async function generateStoryAction(
  _prev: GenerateStoryState,
  formData: FormData,
): Promise<GenerateStoryState> {
  const user = await requireUser();
  const parsed = storyInputSchema.safeParse({
    ageRange: formData.get("ageRange") || "4-5 tahun",
    theme: sanitizeInput(String(formData.get("theme") ?? "")),
    value: sanitizeInput(String(formData.get("value") ?? "")),
    durationMinutes: formData.get("durationMinutes") || 10,
    characterName: sanitizeInput(String(formData.get("characterName") ?? "")),
    setting: sanitizeInput(String(formData.get("setting") ?? "")),
    interactive: formData.get("interactive") !== "off",
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Isi tema ceritanya dulu ya." };
  }
  try {
    const result = await generateStory(user.id, parsed.data);
    await db.teachingSession.create({
      data: { userId: user.id, source: "AI", title: `Cerita: ${result.title}`, status: "VIEWED" },
    });
    return { result };
  } catch (error) {
    if (error instanceof QuotaExceededError) return { error: error.message };
    return { error: "Belum berhasil membuat cerita. Coba lagi sebentar lagi ya." };
  }
}

export interface SituationState {
  result?: SituationAdvice;
  error?: string;
}

export async function askSituationAction(
  _prev: SituationState,
  formData: FormData,
): Promise<SituationState> {
  const user = await requireUser();
  const parsed = situationInputSchema.safeParse({
    situation: sanitizeInput(String(formData.get("situation") ?? "")),
    ageRange: sanitizeInput(String(formData.get("ageRange") ?? "")),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Ceritakan situasinya dulu ya." };
  }
  try {
    const result = await analyzeSituation(user.id, parsed.data);
    return { result };
  } catch (error) {
    if (error instanceof QuotaExceededError) return { error: error.message };
    return { error: "Belum berhasil menganalisis situasi. Coba lagi ya." };
  }
}

export async function toggleSaveAction(contentId: string): Promise<{ saved: boolean }> {
  const user = await requireUser();
  const existing = await db.savedItem.findUnique({
    where: { userId_contentId: { userId: user.id, contentId } },
  });
  if (existing) {
    await db.savedItem.delete({ where: { id: existing.id } });
    revalidatePath("/app/collections");
    return { saved: false };
  }
  await db.savedItem.create({ data: { userId: user.id, contentId } });
  revalidatePath("/app/collections");
  return { saved: true };
}

export async function markUsedAction(contentId: string, title: string): Promise<void> {
  const user = await requireUser();
  await db.teachingSession.create({
    data: { userId: user.id, contentId, source: "LIBRARY", title, status: "USED" },
  });
  revalidatePath("/app/history");
}

export async function rateSessionAction(sessionId: string, rating: string): Promise<void> {
  const user = await requireUser();
  if (!["KURANG", "LUMAYAN", "SUKA"].includes(rating)) return;
  await db.teachingSession.updateMany({
    where: { id: sessionId, userId: user.id },
    data: { rating },
  });
  revalidatePath("/app/history");
}

export interface RandomGameResult {
  id: string;
  slug: string;
  title: string;
  summary: string;
  ageLabel: string;
  durationLabel: string;
  noTools: boolean;
  hook: string;
  steps: string[];
  materials: string[];
  error?: string;
}

export async function randomGameAction(
  filters: ContentFilters,
  excludeIds: string[],
): Promise<RandomGameResult | { error: string }> {
  await requireUser();
  const game = await pickRandomGame(filters, excludeIds);
  if (!game) {
    return {
      error: "Belum menemukan game yang pas dengan kondisi itu. Coba longgarkan filternya, ya.",
    };
  }
  const data = JSON.parse(game.data) as { hook?: string; steps?: string[]; materials?: string[] };
  return {
    id: game.id,
    slug: game.slug,
    title: game.title,
    summary: game.summary,
    ageLabel: `${Math.floor(game.ageMinMonths / 12)}\u2013${Math.ceil(game.ageMaxMonths / 12)} tahun`,
    durationLabel: `${game.durationMin}\u2013${game.durationMax} menit`,
    noTools: game.noTools,
    hook: data.hook ?? "",
    steps: data.steps ?? [],
    materials: data.materials ?? [],
  };
}
