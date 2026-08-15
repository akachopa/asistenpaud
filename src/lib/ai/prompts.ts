// Prompt versioning terpusat — jangan menyebarkan prompt di business logic.
import type { AIFeature } from "./schemas";

export const PROMPT_VERSION = "v1";

const PEDAGOGY_CONTEXT = `Kamu adalah asisten guru PAUD Indonesia yang berpengalaman.
Prinsip wajib:
- berpusat pada anak, bermain bermakna, menyenangkan;
- aman secara fisik dan psikologis;
- bahasa positif, tanpa label negatif, tanpa hukuman, tanpa mempermalukan anak;
- tidak mendorong calistung dini secara berlebihan;
- tidak pernah membuat diagnosis kondisi anak (autisme, ADHD, keterlambatan, dsb);
- praktis dan langsung bisa dijalankan guru di kelas Indonesia;
- konteks budaya Indonesia, bahan murah dan mudah didapat.
Jawab HANYA dengan JSON valid sesuai skema yang diminta, tanpa teks lain.`;

const SCHEMA_HINTS: Record<AIFeature, string> = {
  ACTIVITY: `{"title":string,"summary":string,"age_range":string,"duration_minutes":number,"group_size":string,"learning_elements":string[],"objectives":string[],"materials":string[],"preparation":string[],"opening":string[],"main_activities":string[],"closing":string[],"teacher_script":string[],"observation_points":string[],"adaptations":string[],"safety_notes":string[],"no_tool_alternative":string[],"reflection_questions":string[]}`,
  STORY: `{"title":string,"opening_question":string,"story_parts":[{"text":string,"interaction"?:string}],"gestures":string[],"closing_questions":string[],"message":string,"follow_up_activity":string}`,
  SITUATION: `{"empathy_opener":string,"do_now":string[],"scripts":string[],"observe":string[],"avoid":string[],"escalation":string}`,
  MICROTEACHING_REVIEW: `{"strengths":string[],"improvements":string[],"risks":string[],"revision_suggestions":string[],"reflection_questions":string[],"rubric":[{"criterion":string,"note":string,"level":"BAIK"|"CUKUP"|"PERLU_DIKEMBANGKAN"}]}`,
};

const TASK_INSTRUCTIONS: Record<AIFeature, string> = {
  ACTIVITY: `Buat satu aktivitas pembelajaran PAUD sesuai konteks kelas berikut. Langkah harus konkret per langkah, teacher_script berisi kalimat literal yang diucapkan guru. Jika diminta tanpa alat, materials harus kosong dan aktivitas benar-benar tanpa alat.`,
  STORY: `Buat satu cerita anak original (tokoh bukan karakter berhak cipta) sesuai konteks berikut. story_parts adalah bagian cerita berurutan; tambahkan interaction (pertanyaan ke anak) pada 2-3 bagian. Hindari kekerasan, ketakutan berlebihan, dan stereotip.`,
  SITUATION: `Guru menghadapi situasi kelas berikut. Berikan saran empatik dan bisa langsung dilakukan. scripts berisi kalimat literal yang bisa diucapkan guru. escalation menjelaskan kapan melibatkan kepala sekolah/orang tua/profesional, tanpa diagnosis.`,
  MICROTEACHING_REVIEW: `Review rencana mengajar mahasiswa PGPAUD berikut terhadap brief tantangannya. Rubrik: kesesuaian usia, kejelasan tujuan, bermain bermakna, keterlibatan anak, feasibility, keamanan, kualitas pertanyaan guru, observasi. Feedback harus actionable, berbasis bukti dari teks mahasiswa, seimbang antara kekuatan dan perbaikan.`,
};

export function buildPrompts(feature: AIFeature, inputDescription: string): {
  system: string;
  user: string;
} {
  return {
    system: PEDAGOGY_CONTEXT,
    user: `${TASK_INSTRUCTIONS[feature]}\n\nKonteks:\n${inputDescription}\n\nSkema JSON yang wajib diikuti:\n${SCHEMA_HINTS[feature]}`,
  };
}
