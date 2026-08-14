"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { awardXp } from "@/lib/xp";
import { parseJson } from "@/lib/utils";
import type { SimGraph } from "@/lib/simulator";
import { reviewMicroteaching, QuotaExceededError } from "@/lib/ai/service";
import { microteachingPlanSchema, type MicroteachingFeedback } from "@/lib/ai/schemas";
import { sanitizeInput } from "@/lib/ai/safety";
import type { BriefData } from "@/lib/content";

export interface SimStepState {
  attemptId: string;
  done: boolean;
  stepCount: number;
  node?: {
    scene: string;
    context?: string;
    choices: { label: string }[];
  };
  lastEffect?: string;
  scores?: Record<string, number>;
  debriefGood?: string;
  debriefRisky?: string;
  reflectionSaved?: boolean;
  error?: string;
}

async function buildStepState(attemptId: string): Promise<SimStepState> {
  const attempt = await db.simulatorAttempt.findUnique({
    where: { id: attemptId },
    include: { simulator: true },
  });
  if (!attempt) return { attemptId, done: false, stepCount: 0, error: "Attempt tidak ditemukan" };
  const graph = parseJson<SimGraph>(attempt.simulator.nodes, { startNodeId: "", nodes: {}, debriefGood: "", debriefRisky: "" });
  const path = parseJson<{ effect: string }[]>(attempt.pathJson, []);
  const lastEffect = path.length > 0 ? path[path.length - 1].effect : undefined;

  if (attempt.status === "COMPLETED" || !attempt.currentNode) {
    return {
      attemptId,
      done: true,
      stepCount: path.length,
      lastEffect,
      scores: parseJson<Record<string, number>>(attempt.scoresJson, {}),
      debriefGood: graph.debriefGood,
      debriefRisky: graph.debriefRisky,
      reflectionSaved: Boolean(attempt.reflection),
    };
  }

  const node = graph.nodes[attempt.currentNode];
  if (!node) return { attemptId, done: false, stepCount: path.length, error: "Node skenario tidak valid" };
  return {
    attemptId,
    done: false,
    stepCount: path.length,
    lastEffect,
    node: {
      scene: node.scene,
      context: node.context,
      choices: node.choices.map((c) => ({ label: c.label })),
    },
  };
}

export async function startSimulatorAction(simulatorId: string): Promise<SimStepState> {
  const user = await requireUser();
  const simulator = await db.simulator.findUnique({ where: { id: simulatorId } });
  if (!simulator) return { attemptId: "", done: false, stepCount: 0, error: "Skenario tidak ditemukan" };
  const graph = parseJson<SimGraph>(simulator.nodes, { startNodeId: "", nodes: {}, debriefGood: "", debriefRisky: "" });

  // lanjutkan attempt yang belum selesai agar state tidak hilang saat refresh
  const existing = await db.simulatorAttempt.findFirst({
    where: { userId: user.id, simulatorId, status: "IN_PROGRESS" },
    orderBy: { createdAt: "desc" },
  });
  if (existing) return buildStepState(existing.id);

  const attempt = await db.simulatorAttempt.create({
    data: {
      userId: user.id,
      simulatorId,
      currentNode: graph.startNodeId,
      status: "IN_PROGRESS",
    },
  });
  return buildStepState(attempt.id);
}

export async function chooseSimulatorAction(attemptId: string, choiceIndex: number): Promise<SimStepState> {
  const user = await requireUser();
  const attempt = await db.simulatorAttempt.findFirst({
    where: { id: attemptId, userId: user.id },
    include: { simulator: true },
  });
  if (!attempt || attempt.status === "COMPLETED" || !attempt.currentNode) {
    return buildStepState(attemptId);
  }

  const graph = parseJson<SimGraph>(attempt.simulator.nodes, { startNodeId: "", nodes: {}, debriefGood: "", debriefRisky: "" });
  const node = graph.nodes[attempt.currentNode];
  const choice = node?.choices[choiceIndex];
  if (!node || !choice) return buildStepState(attemptId);

  const scores = parseJson<Record<string, number>>(attempt.scoresJson, {});
  for (const [dim, val] of Object.entries(choice.scores ?? {})) {
    scores[dim] = (scores[dim] ?? 0) + (val ?? 0);
  }
  const path = parseJson<{ nodeId: string; choice: string; effect: string }[]>(attempt.pathJson, []);
  path.push({ nodeId: node.id, choice: choice.label, effect: choice.effect });

  const isEnd = choice.nextNodeId === "END" || !graph.nodes[choice.nextNodeId];
  await db.simulatorAttempt.update({
    where: { id: attempt.id },
    data: {
      currentNode: isEnd ? null : choice.nextNodeId,
      pathJson: JSON.stringify(path),
      scoresJson: JSON.stringify(scores),
      status: isEnd ? "COMPLETED" : "IN_PROGRESS",
      completedAt: isEnd ? new Date() : null,
    },
  });

  if (isEnd) {
    await awardXp(user.id, "SIMULATOR_COMPLETED", attempt.simulatorId);
    revalidatePath("/student");
    revalidatePath("/student/portfolio");
  }
  return buildStepState(attemptId);
}

export async function saveReflectionAction(attemptId: string, reflection: string): Promise<{ ok: boolean }> {
  const user = await requireUser();
  const clean = sanitizeInput(reflection).slice(0, 2000);
  if (clean.length < 5) return { ok: false };
  const attempt = await db.simulatorAttempt.findFirst({
    where: { id: attemptId, userId: user.id, status: "COMPLETED" },
  });
  if (!attempt) return { ok: false };
  const firstReflection = !attempt.reflection;
  await db.simulatorAttempt.update({ where: { id: attempt.id }, data: { reflection: clean } });
  if (firstReflection) await awardXp(user.id, "REFLECTION", attempt.id);
  revalidatePath("/student/portfolio");
  return { ok: true };
}

export async function completeModuleAction(moduleId: string): Promise<void> {
  const user = await requireUser();
  const existing = await db.learningProgress.findUnique({
    where: { userId_moduleId: { userId: user.id, moduleId } },
  });
  if (existing) return;
  await db.learningProgress.create({ data: { userId: user.id, moduleId } });
  await awardXp(user.id, "MODULE_COMPLETED", moduleId);
  revalidatePath("/student/learn");
}

export interface MicroteachingState {
  feedback?: MicroteachingFeedback;
  error?: string;
}

export async function submitMicroteachingAction(
  briefSlug: string,
  _prev: MicroteachingState,
  formData: FormData,
): Promise<MicroteachingState> {
  const user = await requireUser();
  const brief = await db.contentItem.findFirst({
    where: { slug: briefSlug, type: "MICROTEACHING_BRIEF" },
  });
  if (!brief) return { error: "Brief tidak ditemukan" };
  const briefData = parseJson<BriefData>(brief.data, {} as BriefData);

  const parsed = microteachingPlanSchema.safeParse({
    objectives: sanitizeInput(String(formData.get("objectives") ?? "")),
    opening: sanitizeInput(String(formData.get("opening") ?? "")),
    mainActivity: sanitizeInput(String(formData.get("mainActivity") ?? "")),
    media: sanitizeInput(String(formData.get("media") ?? "")),
    closing: sanitizeInput(String(formData.get("closing") ?? "")),
    observation: sanitizeInput(String(formData.get("observation") ?? "")),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Lengkapi semua bagian rencana ya." };
  }

  try {
    const feedback = await reviewMicroteaching(user.id, parsed.data, {
      title: brief.title,
      theme: briefData.theme ?? "-",
      ageRange: briefData.ageRange ?? "-",
      childCount: briefData.childCount ?? 15,
      durationMinutes: briefData.durationMinutes ?? 20,
      constraint: briefData.constraint ?? "-",
      goal: briefData.goal ?? "-",
    });
    await db.microteachingSubmission.create({
      data: {
        userId: user.id,
        briefSlug,
        planJson: JSON.stringify(parsed.data),
        feedbackJson: JSON.stringify(feedback),
        status: "REVIEWED",
      },
    });
    await awardXp(user.id, "MICROTEACHING", briefSlug);
    revalidatePath("/student/portfolio");
    return { feedback };
  } catch (error) {
    if (error instanceof QuotaExceededError) return { error: error.message };
    return { error: "Belum berhasil mereview rencanamu. Coba kirim lagi ya." };
  }
}
