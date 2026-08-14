import Link from "next/link";
import { requireRole } from "@/lib/auth";
import { logoutAction } from "@/app/(auth)/actions";

const NAV = [
  { href: "/admin", label: "📊 Dashboard" },
  { href: "/admin/users", label: "👥 Pengguna" },
  { href: "/admin/content", label: "📚 Konten" },
  { href: "/admin/ai", label: "🤖 AI Logs" },
];

export default async function AdminLayout({ children }: LayoutProps<"/admin">) {
  await requireRole("ADMIN");
  return (
    <div className="flex-1 flex flex-col md:flex-row">
      <aside className="md:w-60 shrink-0 border-b md:border-b-0 md:border-r border-line bg-surface">
        <div className="p-5 font-black text-primary-strong text-lg">🧸 TemanPAUD Admin</div>
        <nav className="flex md:flex-col gap-1 px-3 pb-3 overflow-x-auto" aria-label="Navigasi admin">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-xl px-3 py-2.5 text-sm font-bold text-ink hover:bg-surface-muted whitespace-nowrap"
            >
              {item.label}
            </Link>
          ))}
          <form action={logoutAction}>
            <button type="submit" className="rounded-xl px-3 py-2.5 text-sm font-bold text-danger hover:bg-danger-soft w-full text-left">
              🚪 Keluar
            </button>
          </form>
        </nav>
      </aside>
      <main className="flex-1 p-6 max-w-5xl">{children}</main>
    </div>
  );
}
