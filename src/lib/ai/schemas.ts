import { z } from "zod";

export const activityInputSchema = z.object({
  ageRange: z.string().min(1, "Pilih usia anak"),
  childCount: z.coerce.number().int().min(1).max(60),
  durationMinutes: z.coerce.number().int().min(3).max(120),
  theme: z.string().min(1, "Isi tema atau tujuan").max(200),
  goal: z.string().max(300).optional().default(""),
  location: z.enum(["INDOOR", "OUTDOOR"]).default("INDOOR"),
  noTools: z.coerce.boolean().default(false),
  materials: z.string().max(300).optional().default(""),
  notes: z.string().max(500).optional().default(""),
});
export type ActivityInput = z.infer<typeof activityInputSchema>;

export const generatedActivitySchema = z.object({
  title: z.string().min(1),
  summary: z.string().min(1),
  age_range: z.string(),
  duration_minutes: z.number(),
  group_size: z.string(),
  learning_elements: z.array(z.string()),
  objectives: z.array(z.string()).min(1),
  materials: z.array(z.string()),
  preparation: z.array(z.string()),
  opening: z.array(z.string()).min(1),
  main_activities: z.array(z.string()).min(2),
  closing: z.array(z.string()).min(1),
  teacher_script: z.array(z.string()),
  observation_points: z.array(z.string()).min(1),
  adaptations: z.array(z.string()),
  safety_notes: z.array(z.string()).min(1),
  no_tool_alternative: z.array(z.string()),
  reflection_questions: z.array(z.string()),
});
export type GeneratedActivity = z.infer<typeof generatedActivitySchema>;

export const storyInputSchema = z.object({
  ageRange: z.string().min(1),
  theme: z.string().min(1).max(200),
  value: z.string().max(200).optional().default(""),
  durationMinutes: z.coerce.number().int().min(3).max(30).default(10),
  characterName: z.string().max(60).optional().default(""),
  setting: z.string().max(120).optional().default(""),
  interactive: z.coerce.boolean().default(true),
});
export type StoryInput = z.infer<typeof storyInputSchema>;

export const generatedStorySchema = z.object({
  title: z.string().min(1),
  opening_question: z.string(),
  story_parts: z
    .array(
      z.object({
        text: z.string(),
        interaction: z.string().optional(),
      }),
    )
    .min(3),
  gestures: z.array(z.string()),
  closing_questions: z.array(z.string()).min(1),
  message: z.string(),
  follow_up_activity: z.string(),
});
export type GeneratedStory = z.infer<typeof generatedStorySchema>;

export const situationInputSchema = z.object({
  situation: z.string().min(10, "Ceritakan situasinya sedikit lebih detail").max(1000),
  ageRange: z.string().optional().default(""),
});
export type SituationInput = z.infer<typeof situationInputSchema>;

export const situationAdviceSchema = z.object({
  empathy_opener: z.string(),
  do_now: z.array(z.string()).min(2),
  scripts: z.array(z.string()).min(1),
  observe: z.array(z.string()).min(1),
  avoid: z.array(z.string()).min(1),
  escalation: z.string(),
});
export type SituationAdvice = z.infer<typeof situationAdviceSchema>;

export const microteachingPlanSchema = z.object({
  objectives: z.string().min(10, "Tuliskan tujuan kegiatanmu"),
  opening: z.string().min(10, "Tuliskan rencana pembukaan"),
  mainActivity: z.string().min(20, "Tuliskan kegiatan intinya"),
  media: z.string().min(3, "Sebutkan media/alat yang digunakan"),
  closing: z.string().min(10, "Tuliskan rencana penutup"),
  observation: z.string().min(10, "Tuliskan apa yang akan diamati"),
});
export type MicroteachingPlan = z.infer<typeof microteachingPlanSchema>;

export const microteachingFeedbackSchema = z.object({
  strengths: z.array(z.string()).min(1),
  improvements: z.array(z.string()).min(1),
  risks: z.array(z.string()),
  revision_suggestions: z.array(z.string()).min(1),
  reflection_questions: z.array(z.string()).min(1),
  rubric: z.array(
    z.object({
      criterion: z.string(),
      note: z.string(),
      level: z.enum(["BAIK", "CUKUP", "PERLU_DIKEMBANGKAN"]),
    }),
  ),
});
export type MicroteachingFeedback = z.infer<typeof microteachingFeedbackSchema>;

export type AIFeature = "ACTIVITY" | "STORY" | "SITUATION" | "MICROTEACHING_REVIEW";
