// Seed idempotent TemanPAUD — aman dijalankan berulang.
// Jalankan: npm run db:seed

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { games } from "./seed-data/games";
import { activities } from "./seed-data/activities";
import { tips } from "./seed-data/tips";
import { stories } from "./seed-data/stories";
import { simulators } from "./seed-data/simulators";
import { microteachingBriefs } from "./seed-data/microteaching";
import { learningModules } from "./seed-data/learning-modules";
import type { BaseContentMeta } from "./seed-data/types";

const db = new PrismaClient();

function baseFields(meta: BaseContentMeta, type: string) {
  return {
    type,
    title: meta.title,
    summary: meta.summary,
    status: "APPROVED",
    language: "id-ID",
    ageMinMonths: meta.ageMinMonths,
    ageMaxMonths: meta.ageMaxMonths,
    durationMin: meta.durationMin,
    durationMax: meta.durationMax,
    energyLevel: meta.energyLevel,
    location: meta.location,
    setupLevel: meta.setupLevel,
    noTools: meta.noTools,
    groupSizeMin: meta.groupSizeMin,
    groupSizeMax: meta.groupSizeMax,
    categories: JSON.stringify(meta.categories),
    themes: JSON.stringify(meta.themes),
    authorType: "CURATED",
    publishedAt: new Date(),
  };
}

async function upsertContent(slug: string, fields: Record<string, unknown>, data: Record<string, unknown>) {
  const payload = { ...fields, data: JSON.stringify(data) };
  await db.contentItem.upsert({
    where: { slug },
    create: { slug, ...(payload as object) } as never,
    update: payload as never,
  });
}

async function seedGames() {
  for (const g of games) {
    await upsertContent(g.slug, baseFields(g, "GAME"), {
      hook: g.hook,
      materials: g.materials,
      preparation: g.preparation,
      steps: g.steps,
      teacherScript: g.teacherScript,
      variations: g.variations,
      objectives: g.objectives,
      observationPoints: g.observationPoints,
      safetyNotes: g.safetyNotes,
    });
  }
  console.log(`✔ ${games.length} games`);
}

async function seedActivities() {
  for (const a of activities) {
    await upsertContent(a.slug, baseFields(a, "ACTIVITY"), {
      learningElements: a.learningElements,
      objectives: a.objectives,
      materials: a.materials,
      preparation: a.preparation,
      opening: a.opening,
      mainSteps: a.mainSteps,
      closing: a.closing,
      teacherScript: a.teacherScript,
      observationPoints: a.observationPoints,
      adaptations: a.adaptations,
      safetyNotes: a.safetyNotes,
      noToolAlternative: a.noToolAlternative,
      reflectionQuestions: a.reflectionQuestions,
    });
  }
  console.log(`✔ ${activities.length} activities`);
}

async function seedTips() {
  for (const t of tips) {
    await upsertContent(
      t.slug,
      {
        type: "TIP",
        title: t.title,
        summary: t.situation.slice(0, 160),
        status: "APPROVED",
        language: "id-ID",
        ageMinMonths: 24,
        ageMaxMonths: 72,
        durationMin: 1,
        durationMax: 5,
        energyLevel: "TENANG",
        location: "KEDUANYA",
        setupLevel: "TANPA_PERSIAPAN",
        noTools: true,
        groupSizeMin: 1,
        groupSizeMax: 40,
        categories: JSON.stringify([t.category]),
        themes: "[]",
        authorType: "CURATED",
        publishedAt: new Date(),
      },
      {
        category: t.category,
        situation: t.situation,
        actions: t.actions,
        exampleScripts: t.exampleScripts,
        avoid: t.avoid,
        escalation: t.escalation,
      },
    );
  }
  console.log(`✔ ${tips.length} tips`);
}

async function seedStories() {
  for (const s of stories) {
    await upsertContent(
      s.slug,
      {
        type: "STORY_TEMPLATE",
        title: s.title,
        summary: s.summary,
        status: "APPROVED",
        language: "id-ID",
        ageMinMonths: s.ageMinMonths,
        ageMaxMonths: s.ageMaxMonths,
        durationMin: s.durationMin,
        durationMax: s.durationMax,
        energyLevel: "TENANG",
        location: "KEDUANYA",
        setupLevel: "TANPA_PERSIAPAN",
        noTools: true,
        groupSizeMin: 1,
        groupSizeMax: 40,
        categories: JSON.stringify(["Cerita"]),
        themes: JSON.stringify(s.themes),
        authorType: "CURATED",
        publishedAt: new Date(),
      },
      {
        values: s.values,
        openingQuestion: s.openingQuestion,
        characters: s.characters,
        setting: s.setting,
        plotBeats: s.plotBeats,
        interactionPoints: s.interactionPoints,
        gestures: s.gestures,
        closingQuestions: s.closingQuestions,
        message: s.message,
        followUpActivity: s.followUpActivity,
      },
    );
  }
  console.log(`✔ ${stories.length} story frameworks`);
}

async function seedSimulators() {
  for (const s of simulators) {
    const nodes = {
      startNodeId: s.startNodeId,
      nodes: Object.fromEntries(s.nodes.map((n) => [n.id, n])),
      debriefGood: s.debriefGood,
      debriefRisky: s.debriefRisky,
    };
    await db.simulator.upsert({
      where: { slug: s.slug },
      create: {
        slug: s.slug,
        title: s.title,
        description: s.description,
        difficulty: s.difficulty,
        ageContext: s.ageContext,
        status: "APPROVED",
        nodes: JSON.stringify(nodes),
      },
      update: {
        title: s.title,
        description: s.description,
        difficulty: s.difficulty,
        ageContext: s.ageContext,
        nodes: JSON.stringify(nodes),
      },
    });
  }
  console.log(`✔ ${simulators.length} simulator scenarios`);
}

async function seedMicroteaching() {
  for (const b of microteachingBriefs) {
    await upsertContent(
      b.slug,
      {
        type: "MICROTEACHING_BRIEF",
        title: b.title,
        summary: `${b.ageRange} · ${b.childCount} anak · ${b.durationMinutes} menit · ${b.constraint}`,
        status: "APPROVED",
        language: "id-ID",
        ageMinMonths: 24,
        ageMaxMonths: 72,
        durationMin: b.durationMinutes,
        durationMax: b.durationMinutes,
        energyLevel: "SEDANG",
        location: "KEDUANYA",
        setupLevel: "RINGAN",
        noTools: false,
        groupSizeMin: b.childCount,
        groupSizeMax: b.childCount,
        categories: JSON.stringify(["Microteaching"]),
        themes: JSON.stringify([b.theme]),
        authorType: "CURATED",
        publishedAt: new Date(),
      },
      {
        ageRange: b.ageRange,
        childCount: b.childCount,
        durationMinutes: b.durationMinutes,
        theme: b.theme,
        constraint: b.constraint,
        goal: b.goal,
        hints: b.hints,
      },
    );
  }
  console.log(`✔ ${microteachingBriefs.length} microteaching briefs`);
}

async function seedLearningModules() {
  for (const m of learningModules) {
    await db.learningModule.upsert({
      where: { slug: m.slug },
      create: {
        slug: m.slug,
        level: m.level,
        order: m.order,
        title: m.title,
        description: m.description,
        content: JSON.stringify(m.sections),
      },
      update: {
        level: m.level,
        order: m.order,
        title: m.title,
        description: m.description,
        content: JSON.stringify(m.sections),
      },
    });
  }
  console.log(`✔ ${learningModules.length} learning modules`);
}

const BADGES = [
  { slug: "first-activity", title: "First Activity", description: "Membuat aktivitas pertama dengan AI", icon: "sparkles" },
  { slug: "simulation-starter", title: "Simulation Starter", description: "Menyelesaikan simulasi pertama", icon: "theater" },
  { slug: "10-simulations", title: "10 Simulations", description: "Menyelesaikan 10 simulasi mengajar", icon: "trophy" },
  { slug: "microteaching-starter", title: "Microteaching Starter", description: "Mengirim rencana microteaching pertama", icon: "clipboard" },
];

async function seedBadges() {
  for (const b of BADGES) {
    await db.badge.upsert({ where: { slug: b.slug }, create: b, update: b });
  }
  console.log(`✔ ${BADGES.length} badges`);
}

async function seedUsers() {
  const demoUsers = [
    { email: "admin@temanpaud.id", name: "Admin TemanPAUD", role: "ADMIN", password: "admin12345" },
    { email: "guru@temanpaud.id", name: "Bu Sari", role: "TEACHER", password: "guru12345" },
    { email: "mahasiswa@temanpaud.id", name: "Dina Mahasiswa", role: "STUDENT", password: "mahasiswa12345" },
  ];
  for (const u of demoUsers) {
    const passwordHash = await bcrypt.hash(u.password, 10);
    await db.user.upsert({
      where: { email: u.email },
      create: {
        email: u.email,
        name: u.name,
        role: u.role,
        passwordHash,
        profile: {
          create: {
            userType: u.role === "STUDENT" ? "STUDENT" : "TEACHER",
            onboardingCompleted: true,
            agePreference: "48-60",
          },
        },
      },
      update: {},
    });
  }
  console.log(`✔ ${demoUsers.length} demo users (admin@temanpaud.id / guru@temanpaud.id / mahasiswa@temanpaud.id)`);
}

async function main() {
  console.log("🌱 Seeding TemanPAUD...");
  await seedUsers();
  await seedBadges();
  await seedGames();
  await seedActivities();
  await seedTips();
  await seedStories();
  await seedSimulators();
  await seedMicroteaching();
  await seedLearningModules();
  console.log("✅ Seed selesai.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
