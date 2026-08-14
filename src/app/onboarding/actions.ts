"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { db } from "@/lib/db";
import { requireUser } from "@/lib/auth";

const onboardingSchema = z.object({
  agePreference: z.string().max(20).optional().default(""),
  institutionType: z.string().max(30).optional().default(""),
  classSize: z.coerce.number().int().min(1).max(60).optional(),
  semester: z.coerce.number().int().min(1).max(14).optional(),
  goals: z.array(z.string().max(60)).max(10),
});

export async function completeOnboardingAction(formData: FormData): Promise<void> {
  const user = await requireUser();
  const parsed = onboardingSchema.safeParse({
    agePreference: formData.get("agePreference") ?? "",
    institutionType: formData.get("institutionType") ?? "",
    classSize: formData.get("classSize") || undefined,
    semester: formData.get("semester") || undefined,
    goals: formData.getAll("goals").map(String),
  });
  if (!parsed.success) redirect("/onboarding");

  await db.profile.upsert({
    where: { userId: user.id },
    create: {
      userId: user.id,
      userType: user.role,
      agePreference: parsed.data.agePreference || null,
      institutionType: parsed.data.institutionType || null,
      classSize: parsed.data.classSize ?? null,
      semester: parsed.data.semester ?? null,
      focusGoals: JSON.stringify(parsed.data.goals),
      onboardingCompleted: true,
    },
    update: {
      agePreference: parsed.data.agePreference || null,
      institutionType: parsed.data.institutionType || null,
      classSize: parsed.data.classSize ?? null,
      semester: parsed.data.semester ?? null,
      focusGoals: JSON.stringify(parsed.data.goals),
      onboardingCompleted: true,
    },
  });

  // Quick win: langsung ke aksi pertama, bukan berhenti di onboarding
  if (user.role === "STUDENT") {
    redirect("/student?quickwin=1");
  }
  redirect("/app/activity/new?quickwin=1");
}
