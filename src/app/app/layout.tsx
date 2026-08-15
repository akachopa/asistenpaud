import { redirect } from "next/navigation";
import { requireUser } from "@/lib/auth";
import { AppShell } from "@/components/app-shell";

const BOTTOM_NAV = [
  { href: "/app", label: "Home", icon: "🏠", exact: true },
  { href: "/app/explore", label: "Explore", icon: "🔍" },
  { href: "/app/create", label: "Buat", icon: "✨" },
  { href: "/app/collections", label: "Koleksi", icon: "📚" },
  { href: "/app/profile", label: "Saya", icon: "😊" },
];

const SIDEBAR = [
  { href: "/app", label: "Beranda", icon: "🏠", exact: true },
  { href: "/app/explore", label: "Jelajahi", icon: "🔍" },
  { href: "/app/create", label: "Buat", icon: "✨" },
  { href: "/app/activities", label: "Aktivitas", icon: "🎨" },
  { href: "/app/games", label: "Games", icon: "🎲" },
  { href: "/app/random-game", label: "Acak Game", icon: "🎰" },
  { href: "/app/stories", label: "Cerita", icon: "📖" },
  { href: "/app/tips", label: "Tips", icon: "💡" },
  { href: "/app/assistant", label: "Tanya Teman Guru", icon: "💬" },
  { href: "/app/toolkit", label: "Toolkit", icon: "🧰" },
  { href: "/app/collections", label: "Koleksi", icon: "📚" },
  { href: "/app/history", label: "Riwayat", icon: "🕰" },
  { href: "/app/profile", label: "Profil", icon: "😊" },
];

export default async function TeacherLayout({ children }: LayoutProps<"/app">) {
  const user = await requireUser();
  if (user.role === "STUDENT") redirect("/student");
  if (!user.profile?.onboardingCompleted && user.role !== "ADMIN") redirect("/onboarding");

  return (
    <AppShell
      brand="TemanPAUD"
      brandHref="/app"
      userName={user.name}
      userRole="Guru PAUD"
      sidebar={SIDEBAR}
      bottomNav={BOTTOM_NAV}
    >
      {children}
    </AppShell>
  );
}
