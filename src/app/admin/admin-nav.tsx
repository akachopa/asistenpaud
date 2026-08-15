"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logoutAction } from "@/app/(auth)/actions";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: "📊", exact: true },
  { href: "/admin/users", label: "Pengguna", icon: "👥" },
  { href: "/admin/content", label: "Konten", icon: "📚" },
  { href: "/admin/ai", label: "AI Logs", icon: "🤖" },
];

export function AdminNav({ variant = "sidebar" }: { variant?: "sidebar" | "top" }) {
  const pathname = usePathname();
  const isTop = variant === "top";
  return (
    <nav
      className={isTop ? "flex gap-1 px-3 py-2 overflow-x-auto" : "flex-1 px-3 space-y-0.5 overflow-y-auto"}
      aria-label="Navigasi admin"
    >
      {NAV.map((item) => {
        const active = item.exact ? pathname === item.href : pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={`flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-bold whitespace-nowrap transition-colors ${
              active ? "bg-primary-soft text-primary-strong" : "text-ink hover:bg-surface-muted"
            }`}
          >
            <span aria-hidden>{item.icon}</span>
            {item.label}
          </Link>
        );
      })}
      <form action={logoutAction} className={isTop ? "" : "pt-2"}>
        <button type="submit" className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-bold text-danger hover:bg-danger-soft whitespace-nowrap">
          <span aria-hidden>🚪</span> Keluar
        </button>
      </form>
    </nav>
  );
}
