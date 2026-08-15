import "server-only";
import { z } from "zod";
import { db } from "@/lib/db";
import { TemplateFallbackProvider } from "./fallback";
import { OpenAICompatibleProvider } from "./openai";
import type { AIProvider } from "./provider";
import { buildPrompts, PROMPT_VERSION } from "./prompts";
import { checkOutputSafety } from "./safety";
import {
  generatedActivitySchema,
  generatedStorySchema,
  microteachingFeedbackSchema,
  situationAdviceSchema,
  type ActivityInput,
  type AIFeature,
  type GeneratedActivity,
  type GeneratedStory,
  type MicroteachingFeedback,
  type MicroteachingPlan,
  type SituationAdvice,
  type SituationInput,
  type StoryInput,
} from "./schemas";

const DAILY_GENERATION_LIMIT = Number(process.env.AI_DAILY_LIMIT ?? 50);

function getProviders(): AIProvider[] {
  const providers: AIProvider[] = [];
  if (process.env.AI_API_KEY) providers.push(new OpenAICompatibleProvider());
  providers.push(new TemplateFallbackProvider());
  return providers;
}

export class QuotaExceededError extends Error {
  constructor() {
    super("Kuota AI harian tercapai. Coba lagi besok atau jelajahi library.");
  }
}

async function checkQuota(userId: string): Promise<void> {
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);
  const count = await db.generation.count({
    where: { userId, createdAt: { gte: startOfDay } },
  });
  if (count >= DAILY_GENERATION_LIMIT) throw new QuotaExceededError();
}

async function runGeneration<T>(
  userId: string,
  feature: AIFeature,
  input: unknown,
  inputDescription: string,
  schema: z.ZodType<T>,
): Promise<T> {
  await checkQuota(userId);
  const { system, user } = buildPrompts(feature, inputDescription);
  const providers = getProviders();
  let lastError: Error | null = null;

  for (const provider of providers) {
    const started = Date.now();
    try {
      const result = await provider.generate(feature, system, user, input);
      const parsed = schema.safeParse(result.output);
      if (!parsed.success) {
        await logGeneration(userId, feature, input, null, provider.name, result.model, 0, 0, Date.now() - started, "SCHEMA_FAILED", parsed.error.message.slice(0, 500));
        lastError = new Error("Output AI tidak sesuai format");
        continue;
      }
      const safety = checkOutputSafety(parsed.data);
      if (!safety.ok) {
        await logGeneration(userId, feature, input, null, provider.name, result.model, result.tokenInput, result.tokenOutput, Date.now() - started, "SAFETY_REJECTED", safety.reasons.join(", "));
        lastError = new Error("Output tidak lolos pemeriksaan keamanan");
        continue;
      }
      await logGeneration(userId, feature, input, parsed.data, provider.name, result.model, result.tokenInput, result.tokenOutput, Date.now() - started, "SUCCESS", null);
      return parsed.data;
    } catch (error) {
      if (error instanceof QuotaExceededError) throw error;
      const message = error instanceof Error ? error.message : "unknown";
      await logGeneration(userId, feature, input, null, provider.name, "-", 0, 0, Date.now() - started, "ERROR", message.slice(0, 500));
      lastError = error instanceof Error ? error : new Error(message);
    }
  }

  throw lastError ?? new Error("Semua provider AI gagal");
}

async function logGeneration(
  userId: string,
  feature: AIFeature,
  input: unknown,
  output: unknown,
  provider: string,
  model: string,
  tokenInput: number,
  tokenOutput: number,
  latencyMs: number,
  status: string,
  errorMessage: string | null,
): Promise<void> {
  try {
    await db.generation.create({
      data: {
        userId,
        feature,
        inputJson: JSON.stringify(input).slice(0, 8000),
        outputJson: output ? JSON.stringify(output).slice(0, 30000) : null,
        provider,
        model,
        promptVersion: PROMPT_VERSION,
        tokenInput,
        tokenOutput,
        latencyMs,
        status,
        errorMessage,
      },
    });
  } catch {
    // logging tidak boleh menggagalkan request utama
  }
}

export async function generateActivity(userId: string, input: ActivityInput): Promise<GeneratedActivity> {
  const desc = `Usia anak: ${input.ageRange}. Jumlah anak: ${input.childCount}. Durasi: ${input.durationMinutes} menit. Tema: ${input.theme}. Tujuan: ${input.goal || "-"}. Lokasi: ${input.location}. ${input.noTools ? "TANPA ALAT sama sekali." : `Alat tersedia: ${input.materials || "alat sederhana umum"}.`} Catatan: ${input.notes || "-"}`;
  return runGeneration(userId, "ACTIVITY", input, desc, generatedActivitySchema);
}

export async function generateStory(userId: string, input: StoryInput): Promise<GeneratedStory> {
  const desc = `Usia: ${input.ageRange}. Tema: ${input.theme}. Nilai/karakter: ${input.value || "-"}. Durasi: ${input.durationMinutes} menit. Nama tokoh: ${input.characterName || "buat tokoh original"}. Setting: ${input.setting || "-"}. Interaktif: ${input.interactive ? "ya" : "tidak"}.`;
  return runGeneration(userId, "STORY", input, desc, generatedStorySchema);
}

export async function analyzeSituation(userId: string, input: SituationInput): Promise<SituationAdvice> {
  const desc = `Situasi kelas: ${input.situation}. ${input.ageRange ? `Usia anak: ${input.ageRange}.` : ""}`;
  return runGeneration(userId, "SITUATION", input, desc, situationAdviceSchema);
}

export async function reviewMicroteaching(
  userId: string,
  plan: MicroteachingPlan,
  brief: { title: string; theme: string; ageRange: string; childCount: number; durationMinutes: number; constraint: string; goal: string },
): Promise<MicroteachingFeedback> {
  const desc = `Brief tantangan: ${brief.title}. Usia ${brief.ageRange}, ${brief.childCount} anak, ${brief.durationMinutes} menit, tema ${brief.theme}, kondisi khusus: ${brief.constraint}, fokus keterampilan: ${brief.goal}.

Rencana mahasiswa:
- Tujuan: ${plan.objectives}
- Pembukaan: ${plan.opening}
- Kegiatan inti: ${plan.mainActivity}
- Media: ${plan.media}
- Penutup: ${plan.closing}
- Rencana observasi: ${plan.observation}`;
  return runGeneration(userId, "MICROTEACHING_REVIEW", { plan, brief }, desc, microteachingFeedbackSchema);
}
