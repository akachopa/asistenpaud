# 🧸 TemanPAUD

**AI Teaching Companion untuk Guru PAUD dan Mahasiswa PGPAUD/PIAUD.**

TemanPAUD membantu guru menjawab: *"Hari ini saya mengajar apa, bagaimana cara menjalankannya, dan apa yang perlu diamati?"* — dan menjadi tempat mahasiswa berlatih menjadi guru melalui simulasi, microteaching, dan feedback.

## Fitur (MVP)

### 👩‍🏫 Untuk Guru
- **Beranda "Mau ngapain hari ini?"** — quick actions & preset ide cepat (5 menit, tanpa alat, indoor...)
- **AI Activity Generator** — buat kegiatan lengkap (tujuan, langkah, script guru, observasi, safety) dari usia + durasi + tema
- **Library 80+ aktivitas & 100+ games terkurasi** dengan filter usia/durasi/kategori/tanpa-alat
- **Random Game ("Kasih Saya Game!")** — engine database-first, AI hanya fallback
- **Story Generator + 20 kerangka cerita interaktif** dengan tokoh original
- **50+ tips situasional** dan **Tanya Teman Guru** (asisten AI situasi kelas dengan guardrail pedagogis)
- **Classroom Toolkit** — timer, pemilih acak, pembagi kelompok, roda putar (offline-ready)
- **Koleksi, riwayat, dan feedback loop** ("Saya gunakan" → rating)
- **Mode langkah** — satu langkah per layar saat menjalankan kegiatan

### 🎓 Untuk Mahasiswa
- **Teaching Simulator** — 20 skenario bercabang (anak menangis, berebut mainan, kelas riuh...) dengan skor 6 dimensi: keamanan, empati, komunikasi, manajemen kelas, otonomi anak, pedagogi
- **Microteaching Coach** — 20 brief tantangan + feedback AI berbasis rubrik (bukan sekadar skor)
- **Learning Path** — 12 modul dalam 6 level (Mengenal Anak → Microteaching)
- **XP, level, dan badge** — gamifikasi ringan tanpa dark pattern

### 🛠 Admin
- Dashboard metrik, manajemen pengguna, CMS konten (status review), log penggunaan AI

## Menjalankan

```bash
npm install
cp .env.example .env      # sesuaikan bila perlu
npx prisma migrate dev    # buat database (SQLite)
npm run db:seed           # isi materi seed
npm run dev               # http://localhost:3000
```

### Akun demo (setelah seed)

| Peran | Email | Kata sandi |
|---|---|---|
| Admin | `admin@temanpaud.id` | `admin12345` |
| Guru | `guru@temanpaud.id` | `guru12345` |
| Mahasiswa | `mahasiswa@temanpaud.id` | `mahasiswa12345` |

## Konfigurasi AI

Tanpa konfigurasi apa pun, semua fitur AI berjalan dengan **template fallback deterministik** (pedagogically-sound, tanpa layanan eksternal). Untuk memakai LLM sungguhan, isi di `.env`:

```env
AI_API_KEY="sk-..."
AI_BASE_URL="https://api.openai.com/v1"   # atau OpenRouter/Groq/Ollama (OpenAI-compatible)
AI_MODEL="gpt-4o-mini"
```

Pipeline AI: input sanitizer → prompt versioned → provider → schema validator (zod) → safety validator (blokir diagnosis, hukuman, label negatif, aktivitas berbahaya) → log usage. Jika provider gagal, otomatis fallback.

## Teknologi

- **Next.js 16** (App Router, Server Actions) + **TypeScript strict** + **Tailwind CSS 4**
- **Prisma + SQLite** (dev) — ganti `provider` di `prisma/schema.prisma` + `DATABASE_URL` untuk PostgreSQL
- **PWA** — manifest + service worker (toolkit tetap berfungsi offline)
- Session auth berbasis cookie httpOnly + RBAC (TEACHER / STUDENT / ADMIN)

## Struktur

```
prisma/
├── schema.prisma          # skema database
├── seed.ts                # seed idempotent
└── seed-data/             # 290+ item materi terkurasi (Bahasa Indonesia)
src/
├── app/
│   ├── (auth)/            # login, register
│   ├── onboarding/
│   ├── app/               # aplikasi guru (mobile-first)
│   ├── student/           # aplikasi mahasiswa
│   └── admin/             # panel admin (desktop-first)
├── components/            # UI kit (Card, Chip, BottomNav, StepMode...)
└── lib/
    ├── ai/                # provider abstraction, prompts, schemas, safety, service
    ├── auth.ts            # session + RBAC
    ├── content.ts         # query konten, random game engine, rekomendasi
    ├── simulator.ts       # tipe & skor simulator
    └── xp.ts              # XP, level, badge
```

## Prinsip Produk

- Bermain bermakna, child-centered, bahasa positif — bukan mini-SD
- AI **tidak pernah** membuat diagnosis, menyarankan hukuman, atau melabel anak
- Data anak privat by default; foto anak tidak dikirim ke AI
- Konten seed melalui status review (`APPROVED`) sebelum tampil ke pengguna
