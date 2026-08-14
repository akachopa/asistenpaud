import "server-only";
import { db } from "@/lib/db";

export const XP_AMOUNTS = {
  SIMULATOR_COMPLETED: 30,
  REFLECTION: 10,
  MICROTEACHING: 50,
  ACTIVITY_CREATED: 10,
  MODULE_COMPLETED: 15,
} as const;

export interface LevelInfo {
  level: number;
  title: string;
  minXp: number;
}

export const LEVELS: LevelInfo[] = [
  { level: 1, title: "Teacher Rookie", minXp: 0 },
  { level: 2, title: "Classroom Explorer", minXp: 100 },
  { level: 3, title: "Creative Teacher", minXp: 300 },
  { level: 4, title: "Learning Guide", minXp: 600 },
  { level: 5, title: "Classroom Hero", minXp: 1000 },
];

export function levelForXp(xp: number) {
  let current = LEVELS[0];
  for (const l of LEVELS) {
    if (xp >= l.minXp) current = l;
  }
  const next = LEVELS.find((l) => l.minXp > xp) ?? null;
  return { ...current, nextLevel: next, xp };
}

export async function awardXp(
  userId: string,
  reason: keyof typeof XP_AMOUNTS,
  refId?: string,
): Promise<void> {
  await db.xPEvent.create({
    data: { userId, amount: XP_AMOUNTS[reason], reason, refId },
  });
  await checkBadges(userId);
}

export async function getTotalXp(userId: string): Promise<number> {
  const agg = await db.xPEvent.aggregate({
    where: { userId },
    _sum: { amount: true },
  });
  return agg._sum.amount ?? 0;
}

async function checkBadges(userId: string): Promise<void> {
  const [simCount, microCount, activityCount] = await Promise.all([
    db.simulatorAttempt.count({ where: { userId, status: "COMPLETED" } }),
    db.microteachingSubmission.count({ where: { userId } }),
    db.generation.count({ where: { userId, feature: "ACTIVITY", status: "SUCCESS" } }),
  ]);

  const earned: string[] = [];
  if (activityCount >= 1) earned.push("first-activity");
  if (simCount >= 1) earned.push("simulation-starter");
  if (simCount >= 10) earned.push("10-simulations");
  if (microCount >= 1) earned.push("microteaching-starter");

  if (earned.length === 0) return;
  const badges = await db.badge.findMany({ where: { slug: { in: earned } } });
  for (const badge of badges) {
    await db.userBadge.upsert({
      where: { userId_badgeId: { userId, badgeId: badge.id } },
      create: { userId, badgeId: badge.id },
      update: {},
    });
  }
}
