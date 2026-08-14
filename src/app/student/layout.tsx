import { redirect } from "next/navigation";
import { requireUser } from "@/lib/auth";
import { BottomNav } from "@/components/bottom-nav";

const NAV_ITEMS = [
  { href: "/student", label: "Home", icon: "🏠", exact: true },
  { href: "/student/learn", label: "Learn", icon: "📘" },
  { href: "/student/challenges", label: "Challenge", icon: "🎯" },
  { href: "/student/portfolio", label: "Portfolio", icon: "🏅" },
  { href: "/student/profile", label: "Saya", icon: "😊" },
];

export default async function StudentLayout({ children }: LayoutProps<"/student">) {
  const user = await requireUser();
  if (user.role === "TEACHER") redirect("/app");
  if (!user.profile?.onboardingCompleted && user.role !== "ADMIN") redirect("/onboarding");

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex-1 mx-auto w-full max-w-md px-4 pt-4 pb-24">{children}</div>
      <BottomNav items={NAV_ITEMS} />
    </div>
  );
}
