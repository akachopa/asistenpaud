import { redirect } from "next/navigation";
import { requireUser } from "@/lib/auth";
import { AppShell } from "@/components/app-shell";

const BOTTOM_NAV = [
  { href: "/student", label: "Home", icon: "🏠", exact: true },
  { href: "/student/learn", label: "Learn", icon: "📘" },
  { href: "/student/challenges", label: "Challenge", icon: "🎯" },
  { href: "/student/portfolio", label: "Portfolio", icon: "🏅" },
  { href: "/student/profile", label: "Saya", icon: "😊" },
];

const SIDEBAR = [
  { href: "/student", label: "Beranda", icon: "🏠", exact: true },
  { href: "/student/learn", label: "Learning Path", icon: "📘" },
  { href: "/student/challenges", label: "Simulator", icon: "🎭" },
  { href: "/student/microteaching", label: "Microteaching", icon: "📝" },
  { href: "/student/portfolio", label: "Portfolio", icon: "🏅" },
  { href: "/student/profile", label: "Profil", icon: "😊" },
];

export default async function StudentLayout({ children }: LayoutProps<"/student">) {
  const user = await requireUser();
  if (user.role === "TEACHER") redirect("/app");
  if (!user.profile?.onboardingCompleted && user.role !== "ADMIN") redirect("/onboarding");

  return (
    <AppShell
      brand="TemanPAUD"
      brandHref="/student"
      userName={user.name}
      userRole="Mahasiswa PGPAUD"
      sidebar={SIDEBAR}
      bottomNav={BOTTOM_NAV}
    >
      {children}
    </AppShell>
  );
}
