import Link from "next/link";
import { PageHeader } from "@/components/page-header";

export const metadata = { title: "Buat" };

const CREATE_OPTIONS = [
  { href: "/app/activity/new", icon: "✨", title: "Buat Kegiatan", desc: "Aktivitas lengkap sesuai usia, durasi, dan alat yang ada" },
  { href: "/app/stories/new", icon: "📖", title: "Buat Cerita", desc: "Cerita interaktif dengan tokoh original dan titik tanya-jawab" },
  { href: "/app/random-game", icon: "🎲", title: "Acak Game", desc: "Dapatkan game instan sesuai kondisi kelas" },
  { href: "/app/assistant", icon: "💬", title: "Tanya Teman Guru", desc: "Konsultasi situasi kelas, dapat langkah konkret" },
];

export default function CreatePage() {
  return (
    <main className="w-full">
      <PageHeader title="Mau buat apa? ✨" description="Pilih jenis bantuan yang kamu butuhkan sekarang." />
      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {CREATE_OPTIONS.map((o) => (
          <Link
            key={o.href}
            href={o.href}
            className="flex flex-col bg-surface border border-line rounded-(--radius-card) p-6 hover:border-primary hover:shadow-sm transition-all h-full"
          >
            <span className="text-4xl" aria-hidden>
              {o.icon}
            </span>
            <h2 className="font-extrabold text-lg mt-3">{o.title}</h2>
            <p className="text-sm text-ink-muted mt-1">{o.desc}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
