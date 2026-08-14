import { redirect } from "next/navigation";
import { requireUser } from "@/lib/auth";
import { BottomNav } from "@/components/bottom-nav";

const NAV_ITEMS = [
  { href: "/app", label: "Home", icon: "🏠", exact: true },
  { href: "/app/explore", label: "Explore", icon: "🔍" },
  { href: "/app/create", label: "Buat", icon: "✨" },
  { href: "/app/collections", label: "Koleksi", icon: "📚" },
  { href: "/app/profile", label: "Saya", icon: "😊" },
];

export default async function TeacherLayout({ children }: LayoutProps<"/app">) {
  const user = await requireUser();
  if (user.role === "STUDENT") redirect("/student");
  if (!user.profile?.onboardingCompleted && user.role !== "ADMIN") redirect("/onboarding");

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex-1 mx-auto w-full max-w-md px-4 pt-4 pb-24">{children}</div>
      <BottomNav items={NAV_ITEMS} />
    </div>
  );
}
