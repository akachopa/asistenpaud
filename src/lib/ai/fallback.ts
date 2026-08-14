import type { AIProvider, AIProviderResult } from "./provider";
import type {
  ActivityInput,
  AIFeature,
  GeneratedActivity,
  GeneratedStory,
  MicroteachingFeedback,
  MicroteachingPlan,
  SituationAdvice,
  SituationInput,
  StoryInput,
} from "./schemas";

// Provider fallback deterministik berbasis template pedagogis.
// Dipakai saat AI_API_KEY tidak tersedia atau provider utama gagal,
// sehingga aplikasi tetap berfungsi penuh tanpa layanan eksternal.

function hashString(text: string): number {
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = (hash * 31 + text.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

type MicroteachingReviewInput = {
  plan: MicroteachingPlan;
  brief: {
    title: string;
    theme: string;
    ageRange: string;
    childCount: number;
    durationMinutes: number;
    constraint: string;
    goal: string;
  };
};

export class TemplateFallbackProvider implements AIProvider {
  readonly name = "template-fallback";

  async generate(feature: AIFeature, _system: string, _user: string, input: unknown): Promise<AIProviderResult> {
    let output: unknown;
    switch (feature) {
      case "ACTIVITY":
        output = buildActivity(input as ActivityInput);
        break;
      case "STORY":
        output = buildStory(input as StoryInput);
        break;
      case "SITUATION":
        output = buildSituationAdvice(input as SituationInput);
        break;
      case "MICROTEACHING_REVIEW":
        output = buildMicroteachingFeedback(input as MicroteachingReviewInput);
        break;
    }
    return { output, tokenInput: 0, tokenOutput: 0, model: "template-v1" };
  }
}

// ---------- ACTIVITY ----------

interface ActivityPattern {
  kind: string;
  opening: (theme: string) => string[];
  main: (theme: string) => string[];
  closing: (theme: string) => string[];
  script: (theme: string) => string[];
  objectives: (theme: string) => string[];
  materials: (theme: string, noTools: boolean) => string[];
  observation: string[];
}

const ACTIVITY_PATTERNS: ActivityPattern[] = [
  {
    kind: "Gerak dan Peran",
    opening: (t) => [
      `Ajak anak berdiri melingkar dan lakukan pemanasan ringan sambil bernyanyi.`,
      `Tanyakan kepada anak apa yang mereka ketahui tentang ${t}.`,
    ],
    main: (t) => [
      `Sebutkan satu hal terkait ${t}, minta anak menirukan dengan gerakan tubuh mereka sendiri.`,
      `Beri kesempatan 2\u20133 anak memimpin gerakan secara bergantian.`,
      `Variasikan tempo: gerakan pelan, cepat, lalu berhenti seperti patung saat guru bertepuk tangan.`,
      `Gabungkan gerakan menjadi cerita pendek yang dimainkan bersama.`,
      `Akhiri dengan gerakan pendinginan sambil menarik napas panjang.`,
    ],
    closing: (t) => [
      `Duduk melingkar, tanyakan gerakan ${t} mana yang paling disukai anak dan mengapa.`,
      `Apresiasi usaha setiap anak dengan menyebut hal spesifik yang mereka lakukan.`,
    ],
    script: (t) => [
      `Siapa yang bisa menunjukkan gerakan seperti ${t}? Coba kita lihat bersama!`,
      `Wah, ada banyak cara berbeda! Sekarang coba bergerak pelan sekali...`,
      `Tubuh kita hebat ya, bisa bercerita tanpa kata-kata.`,
    ],
    objectives: (t) => [
      `Anak mengeksplorasi gerakan tubuh terkait tema ${t} (motorik kasar).`,
      `Anak berani tampil dan memimpin di depan teman (jati diri).`,
      `Anak mengikuti aturan sederhana dalam permainan kelompok.`,
    ],
    materials: () => [],
    observation: [
      "Keseimbangan dan koordinasi gerak anak.",
      "Keberanian anak saat mendapat giliran memimpin.",
      "Kemampuan anak mengikuti perubahan instruksi (cepat/pelan/berhenti).",
    ],
  },
  {
    kind: "Eksplorasi dan Pengamatan",
    opening: (t) => [
      `Tunjukkan satu benda atau gambar terkait ${t}, biarkan anak mengamati dengan bebas.`,
      `Tanyakan: apa yang kalian lihat? Terima semua jawaban tanpa menilai benar-salah.`,
    ],
    main: (t) => [
      `Bagikan bahan eksplorasi terkait ${t} ke tiap kelompok kecil.`,
      `Minta anak mengamati dengan panca indra: dilihat, disentuh, dicium baunya (jika aman).`,
      `Minta setiap kelompok menceritakan satu hal menarik yang mereka temukan.`,
      `Catat temuan anak di kertas besar dengan gambar sederhana.`,
      `Ajak anak membandingkan: mana yang sama? mana yang berbeda?`,
    ],
    closing: (t) => [
      `Rangkum temuan anak tentang ${t} sambil menunjuk catatan bersama.`,
      `Tanyakan apa lagi yang ingin mereka ketahui untuk pertemuan berikutnya.`,
    ],
    script: (t) => [
      `Coba pegang pelan-pelan, bagaimana rasanya di tanganmu?`,
      `Menurutmu kenapa ${t} bisa seperti ini?`,
      `Pertanyaan yang bagus! Kita cari tahu sama-sama yuk.`,
    ],
    objectives: (t) => [
      `Anak mengamati dan mendeskripsikan ${t} dengan kata-katanya sendiri (sains awal).`,
      `Anak menyampaikan pendapat dalam kelompok kecil (bahasa).`,
      `Anak menunjukkan rasa ingin tahu melalui pertanyaan.`,
    ],
    materials: (t, noTools) =>
      noTools ? [] : [`Benda nyata atau gambar terkait ${t}`, "Kertas besar dan spidol", "Nampan/wadah untuk bahan eksplorasi"],
    observation: [
      "Kosakata baru yang muncul saat anak mendeskripsikan temuannya.",
      "Cara anak bergiliran dan berbagi bahan dalam kelompok.",
      "Pertanyaan yang diajukan anak secara spontan.",
    ],
  },
  {
    kind: "Karya dan Kreasi",
    opening: (t) => [
      `Ceritakan pendek tentang ${t}, lalu tunjukkan contoh hasil karya sederhana (bukan untuk ditiru persis).`,
      `Sampaikan bahwa setiap karya anak boleh berbeda dan semuanya berharga.`,
    ],
    main: (t) => [
      `Bagikan bahan karya, biarkan anak memilih bahan yang mereka mau.`,
      `Beri waktu anak berkarya bebas dengan tema ${t}; guru berkeliling bertanya, bukan mengarahkan hasil.`,
      `Tawarkan bantuan hanya jika anak memintanya.`,
      `Minta anak yang sudah selesai menceritakan karyanya kepada teman di sebelahnya.`,
    ],
    closing: () => [
      `Pajang semua karya di area yang bisa dilihat anak.`,
      `Lakukan galeri berjalan: anak melihat karya teman sambil memberi tepuk apresiasi.`,
    ],
    script: (t) => [
      `Ceritakan dong, ini bagian apa dari ${t}?`,
      `Kamu memilih warna ini, apa alasannya?`,
      `Setiap karya berbeda, dan itu yang membuatnya istimewa.`,
    ],
    objectives: (t) => [
      `Anak mengekspresikan ide tentang ${t} melalui karya (seni).`,
      `Anak melatih koordinasi tangan dan jari (motorik halus).`,
      `Anak menceritakan karyanya dengan percaya diri.`,
    ],
    materials: (t, noTools) =>
      noTools ? [] : ["Kertas/kardus bekas", "Krayon atau pensil warna", "Lem dan bahan alam (daun, ranting kecil) bila ada"],
    observation: [
      "Cara anak memegang alat tulis/lem (motorik halus).",
      "Ide orisinal yang muncul dalam karya anak.",
      "Kalimat anak saat menceritakan karyanya.",
    ],
  },
];

function buildActivity(input: ActivityInput): GeneratedActivity {
  const theme = input.theme || "tema hari ini";
  const pattern = input.noTools
    ? ACTIVITY_PATTERNS[0]
    : ACTIVITY_PATTERNS[hashString(theme + input.ageRange) % ACTIVITY_PATTERNS.length];
  return {
    title: `${pattern.kind}: ${theme.charAt(0).toUpperCase()}${theme.slice(1)}`,
    summary: `Kegiatan ${pattern.kind.toLowerCase()} bertema ${theme} untuk ${input.childCount} anak usia ${input.ageRange}, sekitar ${input.durationMinutes} menit, ${input.location === "OUTDOOR" ? "di luar ruangan" : "di dalam ruangan"}${input.noTools ? ", tanpa alat" : ""}.`,
    age_range: input.ageRange,
    duration_minutes: input.durationMinutes,
    group_size: `${input.childCount} anak`,
    learning_elements: [
      "Jati Diri",
      "Dasar-dasar Literasi, Matematika, Sains, Teknologi, Rekayasa, dan Seni",
    ],
    objectives: pattern.objectives(theme),
    materials: pattern.materials(theme, input.noTools),
    preparation: input.noTools
      ? ["Pastikan area cukup luas dan bebas benda yang bisa membuat anak tersandung."]
      : ["Siapkan bahan sebelum anak datang.", "Atur area agar semua anak dapat bergerak dengan aman."],
    opening: pattern.opening(theme),
    main_activities: pattern.main(theme),
    closing: pattern.closing(theme),
    teacher_script: pattern.script(theme),
    observation_points: pattern.observation,
    adaptations: [
      "Untuk anak yang lebih muda: sederhanakan instruksi menjadi satu langkah dan beri contoh langsung.",
      "Untuk anak pemalu: mulai berpasangan dengan teman dekat sebelum tampil di kelompok besar.",
      input.notes ? `Catatan guru diperhatikan: ${input.notes}` : "Jika kelas sangat aktif, selingi jeda tenang dengan tarik napas bersama.",
    ],
    safety_notes: [
      input.location === "OUTDOOR"
        ? "Periksa area luar dari benda tajam, lubang, atau permukaan licin sebelum mulai."
        : "Singkirkan kursi/meja dari area gerak agar anak tidak terbentur.",
      "Awasi jarak antaranak saat bergerak agar tidak bertabrakan.",
    ],
    no_tool_alternative: input.noTools
      ? []
      : ["Ganti bahan dengan gerakan tubuh dan tanya-jawab: anak memperagakan objek terkait tema tanpa alat."],
    reflection_questions: [
      "Bagian mana yang paling melibatkan anak, dan mengapa?",
      "Adakah anak yang membutuhkan dukungan berbeda pada kegiatan berikutnya?",
    ],
  };
}

// ---------- STORY ----------

const STORY_NAMES = ["Kiko", "Lala", "Bimo", "Sari", "Tito", "Nina"];
const STORY_SETTINGS = ["halaman sekolah", "kebun di belakang rumah", "tepi sungai kecil", "kampung yang rindang"];

function buildStory(input: StoryInput): GeneratedStory {
  const seed = hashString(input.theme + input.ageRange);
  const name = input.characterName || STORY_NAMES[seed % STORY_NAMES.length];
  const setting = input.setting || STORY_SETTINGS[seed % STORY_SETTINGS.length];
  const theme = input.theme;
  const value = input.value || "saling membantu";
  return {
    title: `${name} dan ${theme.charAt(0).toUpperCase()}${theme.slice(1)}`,
    opening_question: `Siapa di sini yang pernah melihat ${theme}? Seperti apa ya?`,
    story_parts: [
      {
        text: `Pagi itu, ${name} bermain di ${setting}. Tiba-tiba, ${name} menemukan sesuatu yang berhubungan dengan ${theme}. Matanya membulat karena penasaran.`,
        interaction: input.interactive ? `Menurut kalian, apa yang ditemukan ${name}?` : undefined,
      },
      {
        text: `${name} mendekat pelan-pelan. Ternyata benar! ${name} ingin sekali tahu lebih banyak, tapi ${name} tidak bisa melakukannya sendirian.`,
      },
      {
        text: `${name} memanggil sahabatnya. Mereka mencoba bersama-sama. Awalnya belum berhasil, tapi mereka tidak menyerah dan mencoba cara lain.`,
        interaction: input.interactive ? `Kalau kalian jadi ${name}, cara apa yang mau kalian coba?` : undefined,
      },
      {
        text: `Dengan ${value}, akhirnya mereka berhasil! ${name} dan sahabatnya melompat kegirangan. Mereka belajar sesuatu yang baru tentang ${theme} hari itu.`,
      },
      {
        text: `Sebelum pulang, ${name} berkata, "Terima kasih sudah membantuku. Bersama-sama, semuanya jadi lebih mudah dan menyenangkan!"`,
        interaction: input.interactive ? `Apa yang membuat ${name} senang di akhir cerita?` : undefined,
      },
    ],
    gestures: [
      `Buka mata lebar-lebar dan tutup mulut dengan tangan saat ${name} menemukan sesuatu.`,
      "Gerakkan tangan seolah mencoba dan gagal, lalu tunjukkan wajah pantang menyerah.",
      "Melompat kecil dengan wajah gembira di bagian akhir.",
    ],
    closing_questions: [
      `Apa yang dilakukan ${name} saat belum berhasil?`,
      `Pernahkah kalian dibantu teman seperti ${name}? Bagaimana rasanya?`,
    ],
    message: `Dengan ${value}, hal yang sulit menjadi lebih ringan dan menyenangkan.`,
    follow_up_activity: `Ajak anak menggambar bagian cerita favoritnya tentang ${theme}, lalu menceritakannya ke teman sebelah.`,
  };
}

// ---------- SITUATION ----------

interface SituationTemplate {
  keywords: RegExp;
  advice: SituationAdvice;
}

const SITUATION_TEMPLATES: SituationTemplate[] = [
  {
    keywords: /menangis|nangis|ditinggal|pisah|ibu|ayah/i,
    advice: {
      empathy_opener:
        "Perpisahan memang momen berat untuk anak (dan guru!). Wajar bila anak menangis; ini bagian dari proses membangun rasa aman.",
      do_now: [
        "Turunkan posisi tubuh sejajar dengan anak, sapa dengan tenang dan lembut.",
        "Akui perasaannya terlebih dahulu sebelum mengalihkan perhatian.",
        "Tawarkan aktivitas transisi yang menenangkan: memegang mainan favorit, melihat ikan/tanaman, atau membantu guru membawa sesuatu.",
        "Sepakati ritual perpisahan singkat dengan orang tua (peluk, tos, dadah dari jendela) dan konsisten menjalankannya.",
      ],
      scripts: [
        "Ibu guru tahu kamu sedih karena Bunda pulang. Tidak apa-apa, sedih itu boleh.",
        "Bunda akan menjemput setelah kita bermain dan makan. Sekarang mau menemani Ibu guru menyiram bunga?",
        "Kamu aman di sini bersama Ibu guru dan teman-teman.",
      ],
      observe: [
        "Berapa lama anak dapat tenang kembali setiap harinya (biasanya makin singkat).",
        "Aktivitas apa yang paling membantu anak beralih.",
        "Apakah anak tetap menolak makan/minum atau menarik diri sepanjang hari.",
      ],
      avoid: [
        "Menyuruh orang tua pergi diam-diam tanpa pamit — ini menurunkan rasa percaya anak.",
        "Melabel anak cengeng atau membandingkan dengan teman yang tidak menangis.",
        "Memaksa anak berhenti menangis dengan ancaman.",
      ],
      escalation:
        "Bila setelah beberapa pekan anak masih sangat sulit tenang, menolak semua aktivitas, atau menunjukkan perubahan besar (tidak mau makan, mimpi buruk terus-menerus), ajak orang tua berdiskusi dan pertimbangkan melibatkan kepala sekolah sesuai prosedur satuan.",
    },
  },
  {
    keywords: /berebut|rebut|berkelahi|bertengkar|mainan|dorong|pukul/i,
    advice: {
      empathy_opener:
        "Berebut adalah bagian normal dari belajar sosial di usia dini — anak sedang berlatih memahami milik bersama dan menunggu giliran.",
      do_now: [
        "Dekati dengan tenang, pisahkan mainan sejenak (bukan anaknya) agar situasi netral.",
        "Bantu kedua anak menyebutkan perasaannya dengan kata-kata.",
        "Ajak keduanya mencari solusi: bergiliran dengan penanda waktu, bermain bersama, atau memilih mainan lain.",
        "Kembalikan mainan setelah ada kesepakatan, dan apresiasi saat mereka menjalankannya.",
      ],
      scripts: [
        "Ibu guru lihat kalian berdua sama-sama ingin mainan ini. Boleh ceritakan apa yang terjadi?",
        "Kamu kesal ya. Katakan pada temanmu: aku masih pakai, nanti gantian ya.",
        "Bagaimana kalau kita pakai jam pasir? Saat pasirnya habis, giliran berganti.",
      ],
      observe: [
        "Apakah pola berebut terjadi pada mainan/waktu tertentu (mainan terlalu sedikit?).",
        "Kemampuan masing-masing anak menyatakan keinginan dengan kata-kata.",
        "Apakah anak mulai bisa menunggu giliran dengan bantuan.",
      ],
      avoid: [
        "Langsung menghakimi siapa yang salah tanpa bertanya.",
        "Menyita mainan sebagai hukuman tanpa proses belajar.",
        "Memaksa anak meminta maaf sebelum tenang — tunggu emosinya turun dulu.",
      ],
      escalation:
        "Bila ada anak yang sering menyakiti secara fisik dan tidak berkurang dengan pendampingan konsisten, diskusikan bersama orang tua untuk menyamakan strategi di rumah dan sekolah.",
    },
  },
  {
    keywords: /tidak fokus|bosan|gaduh|berisik|ramai|tidak mau duduk|lari-lari|berkeliaran/i,
    advice: {
      empathy_opener:
        "Kelas yang riuh biasanya adalah sinyal, bukan masalah: anak mungkin butuh bergerak, kegiatan terlalu panjang, atau terlalu sulit/mudah.",
      do_now: [
        "Gunakan penarik perhatian yang sudah dikenal: tepuk pola, lagu pendek, atau bisikan misterius.",
        "Selipkan jeda gerak 1\u20132 menit (menggeliat, melompat 5 kali, meniru binatang) lalu kembali ke kegiatan.",
        "Perpendek sesi duduk; pecah kegiatan menjadi bagian-bagian kecil.",
        "Beri peran pada anak yang paling aktif: membagikan alat, memimpin tepuk.",
      ],
      scripts: [
        "Tepuk satu! Tepuk dua! Semua tangan di pangkuan.",
        "Ibu guru mau membisikkan rahasia untuk yang sudah duduk melingkar...",
        "Ayo kita jadi robot yang berjalan pelaaan sekali menuju karpet.",
      ],
      observe: [
        "Pada menit ke berapa perhatian anak mulai buyar (untuk kalibrasi durasi kegiatan).",
        "Anak tertentu yang selalu butuh gerak lebih — beri kesempatan gerak lebih sering.",
        "Apakah kegaduhan terjadi pada transisi tertentu.",
      ],
      avoid: [
        "Berteriak lebih keras dari anak-anak — ini menaikkan volume kelas.",
        "Menghukum seluruh kelas karena beberapa anak.",
        "Memberi label 'anak nakal' pada anak yang paling aktif.",
      ],
      escalation:
        "Bila kegaduhan selalu bersumber dari kebutuhan yang sama dan strategi kelas belum membantu, diskusikan penataan ulang jadwal/lingkungan main dengan rekan guru atau kepala sekolah.",
    },
  },
  {
    keywords: /malu|pemalu|diam|tidak mau ikut|menyendiri|menolak/i,
    advice: {
      empathy_opener:
        "Setiap anak punya ritme keterlibatan yang berbeda. Mengamati dari pinggir juga merupakan bentuk partisipasi bagi sebagian anak.",
      do_now: [
        "Biarkan anak mengamati dulu tanpa dipaksa; sediakan 'kursi penonton' yang nyaman.",
        "Tawarkan peran kecil tanpa sorotan: memegang gambar, membantu membagikan alat.",
        "Pasangkan dengan satu teman yang hangat, bukan langsung kelompok besar.",
        "Apresiasi setiap langkah kecil keterlibatannya secara privat, tanpa mengumumkan ke kelas.",
      ],
      scripts: [
        "Kamu boleh melihat dulu dari sini. Kalau sudah siap, ada tempat di sebelah Ibu guru.",
        "Maukah kamu membantu Ibu memegang keranjang ini?",
        "Tadi Ibu lihat kamu ikut bertepuk, Ibu senang sekali.",
      ],
      observe: [
        "Aktivitas apa yang membuat anak mendekat dengan sendirinya.",
        "Dengan teman siapa anak tampak paling nyaman.",
        "Perubahan kecil dari minggu ke minggu (durasi keterlibatan, jarak dengan kelompok).",
      ],
      avoid: [
        "Memaksa anak tampil atau berbicara di depan kelas.",
        "Melabel 'pemalu' di depan anak — label mudah melekat.",
        "Membandingkan dengan saudara atau teman yang lebih berani.",
      ],
      escalation:
        "Bila anak sama sekali tidak berinteraksi dalam waktu lama dan hal ini juga terjadi di rumah, ajak orang tua bertukar cerita untuk memahami kebutuhan anak lebih dalam.",
    },
  },
];

const GENERIC_ADVICE: SituationAdvice = {
  empathy_opener:
    "Situasi seperti ini menantang, dan wajar bila guru butuh strategi. Mari urai langkah-langkahnya.",
  do_now: [
    "Pastikan dulu semua anak dalam kondisi aman secara fisik.",
    "Turunkan tempo: dekati anak yang terlibat, sejajarkan posisi tubuh, gunakan suara tenang.",
    "Akui perasaan anak dengan kata-kata sebelum memberi arahan.",
    "Tawarkan pilihan terbatas (dua opsi) agar anak tetap merasa punya kendali.",
    "Setelah tenang, ajak anak bicara singkat tentang apa yang terjadi.",
  ],
  scripts: [
    "Ibu guru di sini. Kamu aman.",
    "Sepertinya kamu sedang kesal/sedih. Mau cerita atau mau tenang dulu?",
    "Kamu mau melanjutkan dengan duduk di sini atau di dekat jendela?",
  ],
  observe: [
    "Pemicu yang mendahului situasi (waktu, tempat, aktivitas, teman tertentu).",
    "Berapa lama anak membutuhkan waktu untuk tenang.",
    "Strategi mana yang paling membantu untuk anak ini.",
  ],
  avoid: [
    "Merespons dengan nada tinggi atau tergesa-gesa.",
    "Memberi label pada anak atau membicarakan anak di depan anak lain.",
    "Menjanjikan hadiah agar anak patuh sesaat.",
  ],
  escalation:
    "Bila situasi berulang terus, membahayakan keselamatan, atau di luar kewenangan guru, ikuti prosedur satuan: libatkan kepala sekolah dan komunikasikan dengan orang tua. Untuk kekhawatiran perkembangan, sarankan orang tua berkonsultasi dengan tenaga profesional \u2014 guru tidak membuat diagnosis.",
};

function buildSituationAdvice(input: SituationInput): SituationAdvice {
  const match = SITUATION_TEMPLATES.find((t) => t.keywords.test(input.situation));
  return match ? match.advice : GENERIC_ADVICE;
}

// ---------- MICROTEACHING REVIEW ----------

function buildMicroteachingFeedback(input: MicroteachingReviewInput): MicroteachingFeedback {
  const { plan, brief } = input;
  const allText = `${plan.objectives} ${plan.opening} ${plan.mainActivity} ${plan.closing}`.toLowerCase();

  const hasOpenQuestion = /(apa|bagaimana|mengapa|siapa|menurut)/.test(allText);
  const hasPlay = /(main|bermain|permainan|lagu|gerak|cerita|tepuk|peran)/.test(allText);
  const hasSafety = /(aman|awasi|keselamatan|hati-hati|periksa)/.test(allText);
  const mentionsTheme = allText.includes(brief.theme.toLowerCase());
  const hasChildAction = /(anak (mencoba|memilih|membuat|bergerak|menceritakan|mengamati|bermain))/.test(allText);
  const detailedMain = plan.mainActivity.length > 150;

  const strengths: string[] = [];
  const improvements: string[] = [];
  const risks: string[] = [];

  if (hasPlay) strengths.push("Rencanamu sudah memakai pendekatan bermain \u2014 ini inti pembelajaran PAUD.");
  else improvements.push(`Kegiatan inti belum terlihat unsur bermainnya. Ubah penyampaian materi ${brief.theme} menjadi permainan, gerak, lagu, atau peran.`);

  if (hasOpenQuestion) strengths.push("Ada pertanyaan terbuka yang memancing anak berpikir, bukan sekadar menjawab ya/tidak.");
  else improvements.push("Tambahkan pertanyaan terbuka (apa, bagaimana, menurutmu) agar anak aktif berpikir, bukan hanya mendengarkan.");

  if (mentionsTheme) strengths.push(`Tema ${brief.theme} muncul konsisten dalam rencana kegiatanmu.`);
  else improvements.push(`Kaitkan langkah kegiatan lebih eksplisit dengan tema ${brief.theme} dari brief.`);

  if (hasChildAction || detailedMain) strengths.push("Kegiatan inti cukup rinci sehingga bisa dibayangkan jalannya di kelas.");
  else improvements.push("Rinci kegiatan inti langkah per langkah: apa yang dilakukan ANAK (bukan hanya guru) di setiap menit.");

  if (!hasSafety) {
    risks.push(`Aspek keamanan belum disebut. Dengan ${brief.childCount} anak dan kondisi \u201c${brief.constraint}\u201d, tuliskan apa yang perlu diawasi.`);
  }
  if (plan.media.length < 20) {
    risks.push("Media masih umum. Pastikan jumlah alat cukup untuk semua anak atau rencanakan sistem bergiliran.");
  }
  if (strengths.length === 0) strengths.push("Struktur rencana sudah lengkap dari pembukaan sampai observasi \u2014 fondasi yang baik untuk direvisi.");

  return {
    strengths,
    improvements: improvements.length > 0 ? improvements : ["Pertajam kalimat observasi: perilaku spesifik apa yang ingin kamu lihat sebagai bukti anak belajar?"],
    risks,
    revision_suggestions: [
      `Tulis ulang kegiatan inti dalam format langkah bernomor, tiap langkah menyebut aksi anak (contoh: anak memilih kartu, anak menirukan gerakan).`,
      `Siapkan rencana cadangan bila kondisi \u201c${brief.constraint}\u201d mengubah jalannya kegiatan (misal kegiatan selesai lebih cepat).`,
      "Tentukan 2\u20133 poin observasi konkret yang bisa dicatat sambil mengajar.",
    ],
    reflection_questions: [
      "Pada bagian mana anak paling banyak bergerak dan memilih sendiri? Bisakah porsi itu diperbesar?",
      `Bagaimana kamu tahu tujuan \u201c${brief.goal}\u201d tercapai di akhir ${brief.durationMinutes} menit?`,
    ],
    rubric: [
      { criterion: "Kesesuaian usia", note: `Periksa kembali apakah semua instruksi dapat diikuti anak ${brief.ageRange}.`, level: mentionsTheme ? "BAIK" : "CUKUP" },
      { criterion: "Kejelasan tujuan", note: plan.objectives.length > 40 ? "Tujuan tertulis cukup jelas." : "Tujuan masih singkat, perjelas perilaku anak yang diharapkan.", level: plan.objectives.length > 40 ? "BAIK" : "CUKUP" },
      { criterion: "Bermain bermakna", note: hasPlay ? "Unsur bermain sudah ada." : "Unsur bermain perlu ditambahkan.", level: hasPlay ? "BAIK" : "PERLU_DIKEMBANGKAN" },
      { criterion: "Keterlibatan anak", note: hasChildAction ? "Aksi anak terlihat dalam rencana." : "Perbanyak aksi yang dilakukan anak, bukan guru.", level: hasChildAction ? "BAIK" : "CUKUP" },
      { criterion: "Keamanan", note: hasSafety ? "Keamanan sudah dipikirkan." : "Tambahkan poin pengawasan keamanan.", level: hasSafety ? "BAIK" : "PERLU_DIKEMBANGKAN" },
      { criterion: "Kualitas pertanyaan", note: hasOpenQuestion ? "Ada pertanyaan terbuka." : "Tambahkan pertanyaan terbuka.", level: hasOpenQuestion ? "BAIK" : "CUKUP" },
    ],
  };
}
