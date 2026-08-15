import Link from "next/link";
import { requireRole } from "@/lib/auth";
import { AdminNav } from "./admin-nav";

export default async function AdminLayout({ children }: LayoutProps<"/admin">) {
  const user = await requireRole("ADMIN");
  return (
    <div className="flex-1 flex min-h-0">
      <aside className="hidden md:flex w-64 shrink-0 flex-col border-r border-line bg-surface sticky top-0 h-screen">
        <Link href="/admin" className="flex items-center gap-2 px-5 py-5 font-black text-lg text-primary-strong">
          <span aria-hidden>🧸</span> TemanPAUD Admin
        </Link>
        <AdminNav />
        <div className="px-5 py-4 border-t border-line">
          <p className="text-sm font-extrabold truncate">{user.name}</p>
          <p className="text-xs text-ink-muted font-bold">Super Admin</p>
        </div>
      </aside>
      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-30 border-b border-line bg-surface/90 backdrop-blur">
          <div className="flex items-center justify-between gap-3 px-4 lg:px-8 h-14">
            <Link href="/admin" className="md:hidden flex items-center gap-2 font-black text-primary-strong">
              <span aria-hidden>🧸</span> Admin
            </Link>
            <p className="hidden md:block text-sm font-bold text-ink-muted">Kelola pengguna, konten, dan penggunaan AI</p>
            <span className="text-xs font-extrabold text-accent bg-accent-soft rounded-full px-3 py-1">Admin</span>
          </div>
          <div className="md:hidden border-t border-line">
            <AdminNav variant="top" />
          </div>
        </header>
        <div className="flex-1 w-full px-4 sm:px-6 lg:px-8 py-6">{children}</div>
      </div>
    </div>
  );
}
