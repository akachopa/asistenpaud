import Link from "next/link";

export const metadata = { title: "Buat" };

const CREATE_OPTIONS = [
  { href: "/app/activity/new", icon: "✨", title: "Buat Kegiatan", desc: "Aktivitas lengkap sesuai usia, durasi, dan alat yang ada" },
  { href: "/app/stories/new", icon: "📖", title: "Buat Cerita", desc: "Cerita interaktif dengan tokoh original dan titik tanya-jawab" },
  { href: "/app/random-game", icon: "🎲", title: "Acak Game", desc: "Dapatkan game instan sesuai kondisi kelas" },
  { href: "/app/assistant", icon: "💬", title: "Tanya Teman Guru", desc: "Konsultasi situasi kelas, dapat langkah konkret" },
];

export default function CreatePage() {
  return (
    <main>
      <h1 className="text-2xl font-black mt-2 mb-5">Mau buat apa? ✨</h1>
      <div className="space-y-3">
        {CREATE_OPTIONS.map((o) => (
          <Link
            key={o.href}
            href={o.href}
            className="flex items-center gap-4 bg-surface border border-line rounded-(--radius-card) p-4 hover:border-primary transition-colors"
          >
            <span className="text-3xl" aria-hidden>
              {o.icon}
            </span>
            <div>
              <h2 className="font-extrabold">{o.title}</h2>
              <p className="text-sm text-ink-muted">{o.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
