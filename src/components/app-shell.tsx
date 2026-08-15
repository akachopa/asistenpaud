"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { BottomNav, type NavItem } from "@/components/bottom-nav";

export interface ShellLink {
  href: string;
  label: string;
  icon: string;
  exact?: boolean;
}

export function AppShell({
  brand,
  brandHref,
  userName,
  userRole,
  sidebar,
  bottomNav,
  children,
}: {
  brand: string;
  brandHref: string;
  userName: string;
  userRole: string;
  sidebar: ShellLink[];
  bottomNav: NavItem[];
  children: ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex-1 flex min-h-0">
      <aside className="no-print hidden lg:flex w-64 shrink-0 flex-col border-r border-line bg-surface sticky top-0 h-screen">
        <Link href={brandHref} className="flex items-center gap-2 px-5 py-5 font-black text-lg text-primary-strong">
          <span aria-hidden>🧸</span> {brand}
        </Link>
        <nav className="flex-1 px-3 space-y-0.5 overflow-y-auto" aria-label="Navigasi samping">
          {sidebar.map((item) => {
            const active = item.exact ? pathname === item.href : pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold transition-colors ${
                  active ? "bg-primary-soft text-primary-strong" : "text-ink hover:bg-surface-muted"
                }`}
              >
                <span aria-hidden>{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="px-5 py-4 border-t border-line">
          <p className="text-sm font-extrabold truncate">{userName}</p>
          <p className="text-xs text-ink-muted font-bold">{userRole}</p>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="no-print sticky top-0 z-30 border-b border-line bg-surface/90 backdrop-blur">
          <div className="flex items-center justify-between gap-3 px-4 lg:px-8 h-14">
            <Link href={brandHref} className="lg:hidden flex items-center gap-2 font-black text-primary-strong">
              <span aria-hidden>🧸</span> {brand}
            </Link>
            <p className="hidden lg:block text-sm font-bold text-ink-muted">Teman mengajar yang praktis dan aman untuk anak</p>
            <span className="text-xs font-extrabold text-primary-strong bg-primary-soft rounded-full px-3 py-1">{userRole}</span>
          </div>
        </header>
        <div className="flex-1 w-full px-4 sm:px-6 lg:px-8 py-6 pb-24 lg:pb-8">{children}</div>
        <div className="lg:hidden">
          <BottomNav items={bottomNav} />
        </div>
      </div>
    </div>
  );
}
