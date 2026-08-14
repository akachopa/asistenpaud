// Tipe data materi seed TemanPAUD.
// Semua konten berbahasa Indonesia, sesuai prinsip PAUD:
// bermain bermakna, aman, bahasa positif, tanpa drill akademik berlebihan.

export type EnergyLevel = "TENANG" | "SEDANG" | "TINGGI";
export type LocationType = "INDOOR" | "OUTDOOR" | "KEDUANYA";
export type SetupLevel = "TANPA_PERSIAPAN" | "RINGAN" | "SEDANG";

export interface BaseContentMeta {
  slug: string; // kebab-case unik
  title: string;
  summary: string; // 1-2 kalimat
  ageMinMonths: number; // ex: 24
  ageMaxMonths: number; // ex: 72
  durationMin: number; // menit
  durationMax: number;
  energyLevel: EnergyLevel;
  location: LocationType;
  setupLevel: SetupLevel;
  noTools: boolean; // true jika benar-benar tanpa alat
  groupSizeMin: number;
  groupSizeMax: number;
  categories: string[]; // lihat daftar kategori di plan
  themes: string[]; // ex: ["Binatang", "Alam"]
}

export interface GameSeed extends BaseContentMeta {
  hook: string; // 1 kalimat yang membuat guru tertarik
  materials: string[]; // [] jika tanpa alat
  preparation: string[]; // langkah persiapan, [] jika tidak perlu
  steps: string[]; // cara bermain, 3-7 langkah, kalimat perintah singkat
  teacherScript: string[]; // 2-4 contoh kalimat yang diucapkan guru
  variations: string[]; // 2-3 variasi
  objectives: string[]; // 2-3 tujuan perkembangan
  observationPoints: string[]; // 2-3 hal yang diamati guru
  safetyNotes: string[]; // minimal 1
}

export interface ActivitySeed extends BaseContentMeta {
  learningElements: string[]; // "Nilai Agama dan Budi Pekerti" | "Jati Diri" | "Dasar-dasar Literasi, Matematika, Sains, Teknologi, Rekayasa, dan Seni"
  objectives: string[]; // 2-4 tujuan
  materials: string[];
  preparation: string[];
  opening: string[]; // 1-3 langkah pembukaan
  mainSteps: string[]; // 3-7 langkah inti
  closing: string[]; // 1-3 langkah penutup
  teacherScript: string[]; // 2-4 contoh kalimat guru
  observationPoints: string[];
  adaptations: string[]; // adaptasi utk usia lebih muda/tua atau kondisi kelas
  safetyNotes: string[];
  noToolAlternative: string[]; // alternatif tanpa alat, [] jika sudah tanpa alat
  reflectionQuestions: string[]; // 2-3 pertanyaan refleksi guru
}

export interface TipSeed {
  slug: string;
  title: string;
  category: string; // ex: "Anak menangis", "Classroom management", "Bahasa positif"
  situation: string; // deskripsi situasi
  actions: string[]; // apa yang bisa dilakukan sekarang, 3-5 poin
  exampleScripts: string[]; // 2-3 contoh kalimat guru
  avoid: string[]; // hal yang dihindari, 2-3 poin
  escalation: string; // kapan perlu bantuan lebih lanjut
}

export interface StoryFrameworkSeed {
  slug: string;
  title: string;
  summary: string;
  ageMinMonths: number;
  ageMaxMonths: number;
  durationMin: number;
  durationMax: number;
  themes: string[];
  values: string[]; // nilai/karakter, ex: ["berbagi", "berani"]
  openingQuestion: string; // pertanyaan pembuka sebelum cerita
  characters: string[]; // tokoh original
  setting: string;
  plotBeats: string[]; // 5-8 alur cerita ringkas (per adegan)
  interactionPoints: string[]; // 2-4 titik tanya-jawab dengan anak
  gestures: string[]; // ekspresi/gerakan guru
  closingQuestions: string[]; // pertanyaan setelah cerita
  message: string; // pesan cerita, tanpa menggurui
  followUpActivity: string; // aktivitas lanjutan singkat
}

export type ScoreDimension =
  | "safety"
  | "empathy"
  | "communication"
  | "classroomManagement"
  | "childAgency"
  | "pedagogy";

export interface SimulatorChoiceSeed {
  label: string; // pilihan tindakan
  effect: string; // konsekuensi yang terjadi (2-3 kalimat, konkret)
  nextNodeId: string | "END";
  scores: Partial<Record<ScoreDimension, number>>; // -2 s/d +2 per dimensi
}

export interface SimulatorNodeSeed {
  id: string;
  scene: string; // apa yang terjadi (2-4 kalimat)
  context?: string; // info tambahan opsional
  choices: SimulatorChoiceSeed[]; // 3-4 pilihan; jangan ada yang jelas "bodoh", buat dilema realistis
}

export interface SimulatorSeed {
  slug: string;
  title: string;
  description: string;
  difficulty: "DASAR" | "MENENGAH" | "LANJUT";
  ageContext: string; // ex: "Kelompok B, usia 5-6 tahun, 15 anak"
  startNodeId: string;
  nodes: SimulatorNodeSeed[]; // 3-6 node per skenario
  debriefGood: string; // ringkasan praktik baik untuk feedback akhir
  debriefRisky: string; // hal yang perlu dihindari
}

export interface MicroteachingBriefSeed {
  slug: string;
  title: string;
  ageRange: string; // ex: "5-6 tahun"
  childCount: number;
  durationMinutes: number;
  theme: string;
  constraint: string; // ex: "Tidak ada printer", "Ruangan sempit"
  goal: string; // fokus keterampilan yang dilatih
  hints: string[]; // 2-3 petunjuk tanpa memberi jawaban penuh
}
