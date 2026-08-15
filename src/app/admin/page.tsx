import { db } from "@/lib/db";
import { Card } from "@/components/ui";
import { PageHeader } from "@/components/page-header";

export const metadata = { title: "Admin Dashboard" };

export default async function AdminDashboardPage() {
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const [userCount, teacherCount, studentCount, contentCount, generationToday, generationTotal, simAttempts, usedSessions] =
    await Promise.all([
      db.user.count(),
      db.user.count({ where: { role: "TEACHER" } }),
      db.user.count({ where: { role: "STUDENT" } }),
      db.contentItem.count({ where: { status: "APPROVED" } }),
      db.generation.count({ where: { createdAt: { gte: startOfDay } } }),
      db.generation.count(),
      db.simulatorAttempt.count({ where: { status: "COMPLETED" } }),
      db.teachingSession.count({ where: { status: "USED" } }),
    ]);

  const stats = [
    { label: "Total pengguna", value: userCount, icon: "👥" },
    { label: "Guru", value: teacherCount, icon: "🍎" },
    { label: "Mahasiswa", value: studentCount, icon: "🎓" },
    { label: "Konten terbit", value: contentCount, icon: "📚" },
    { label: "Generasi AI hari ini", value: generationToday, icon: "✨" },
    { label: "Generasi AI total", value: generationTotal, icon: "🤖" },
    { label: "Simulasi selesai", value: simAttempts, icon: "🎭" },
    { label: "Aktivitas digunakan", value: usedSessions, icon: "✅" },
  ];

  return (
    <div className="w-full">
      <PageHeader title="Dashboard" description="Ringkasan penggunaan TemanPAUD." />
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {stats.map((s) => (
          <Card key={s.label} className="p-5">
            <p className="text-2xl" aria-hidden>
              {s.icon}
            </p>
            <p className="text-3xl font-black text-primary-strong mt-2">{s.value}</p>
            <p className="text-sm text-ink-muted font-bold mt-1">{s.label}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
