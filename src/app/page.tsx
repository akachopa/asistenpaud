import Link from "next/link";
import { getCurrentUser, homePathFor, type Role } from "@/lib/auth";
import { redirect } from "next/navigation";
import { LinkButton } from "@/components/ui";

const FEATURES = [
  { icon: "✨", title: "Buat Kegiatan", desc: "Aktivitas sesuai usia, durasi, dan alat yang tersedia — langsung siap dijalankan." },
  { icon: "🎲", title: "Kasih Saya Game!", desc: "Ratusan permainan terkurasi. Pilih kondisi kelas, dapatkan game dalam hitungan detik." },
  { icon: "📖", title: "Cerita Anak", desc: "Cerita interaktif dengan tokoh original, titik tanya-jawab, dan gerakan guru." },
  { icon: "💬", title: "Tanya Teman Guru", desc: "Ada situasi di kelas? Dapatkan langkah konkret, kalimat guru, dan kapan perlu eskalasi." },
  { icon: "🎭", title: "Simulasi Mengajar", desc: "Mahasiswa berlatih menghadapi situasi kelas nyata lewat skenario bercabang." },
  { icon: "🏅", title: "Microteaching Coach", desc: "Kirim rencana mengajarmu, dapatkan feedback yang bisa langsung ditindaklanjuti." },
];

export default async function LandingPage() {
  const user = await getCurrentUser();
  if (user) redirect(homePathFor(user.role as Role));

  return (
    <main className="flex-1 w-full">
      <header className="w-full border-b border-line bg-surface/80 backdrop-blur sticky top-0 z-20">
        <div className="w-full px-6 lg:px-10 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 font-black text-xl text-primary-strong">
            <span aria-hidden>🧸</span> TemanPAUD
          </div>
          <nav className="flex gap-2">
            <Link href="/login" className="min-h-12 inline-flex items-center px-4 font-bold text-ink-muted hover:text-ink">
              Masuk
            </Link>
            <LinkButton href="/register">Daftar Gratis</LinkButton>
          </nav>
        </div>
      </header>

      <section className="w-full px-6 lg:px-10 pt-16 pb-20 text-center">
        <p className="inline-block bg-secondary-soft text-warning font-bold text-sm rounded-full px-4 py-1.5 mb-6">
          Untuk Guru PAUD & Mahasiswa PGPAUD/PIAUD
        </p>
        <h1 className="text-4xl md:text-6xl font-black leading-tight max-w-4xl mx-auto">
          Mau ngapain bersama anak-anak hari ini?
        </h1>
        <p className="text-lg text-ink-muted mt-5 max-w-2xl mx-auto">
          TemanPAUD membantu menjawab: hari ini saya mengajar apa, bagaimana menjalankannya,
          dan apa yang perlu diamati. Bukan bank materi — teman mengajar.
        </p>
        <div className="flex flex-wrap justify-center gap-3 mt-8">
          <LinkButton href="/register" className="text-lg px-8">
            Mulai Sekarang — Gratis
          </LinkButton>
          <LinkButton href="/login" variant="outline" className="text-lg px-8">
            Saya Sudah Punya Akun
          </LinkButton>
        </div>
      </section>

      <section className="w-full px-6 lg:px-10 pb-20">
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {FEATURES.map((f) => (
            <div key={f.title} className="bg-surface border border-line rounded-(--radius-card) p-6 h-full">
              <div className="text-3xl mb-3" aria-hidden>
                {f.icon}
              </div>
              <h3 className="font-extrabold text-lg">{f.title}</h3>
              <p className="text-sm text-ink-muted mt-1.5 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-primary-soft w-full">
        <div className="w-full px-6 lg:px-10 py-16 text-center">
          <h2 className="text-3xl font-black">Aman untuk anak, ramah untuk guru</h2>
          <p className="text-ink-muted mt-3 leading-relaxed max-w-3xl mx-auto">
            Semua konten mengikuti prinsip PAUD: bermain bermakna, bahasa positif, tanpa tekanan
            calistung dini. AI kami dibatasi pagar pedagogis — tidak pernah membuat diagnosis,
            tidak pernah menyarankan hukuman.
          </p>
        </div>
      </section>

      <footer className="w-full px-6 lg:px-10 py-8 text-sm text-ink-muted flex flex-wrap justify-between gap-3">
        <span>© {new Date().getFullYear()} TemanPAUD</span>
        <span>Dibuat dengan ❤️ untuk pendidikan anak usia dini Indonesia</span>
      </footer>
    </main>
  );
}
