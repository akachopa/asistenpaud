import { db } from "@/lib/db";
import { Card } from "@/components/ui";

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
    { label: "Total pengguna", value: userCount },
    { label: "Guru", value: teacherCount },
    { label: "Mahasiswa", value: studentCount },
    { label: "Konten terbit", value: contentCount },
    { label: "Generasi AI hari ini", value: generationToday },
    { label: "Generasi AI total", value: generationTotal },
    { label: "Simulasi selesai", value: simAttempts },
    { label: "Aktivitas digunakan", value: usedSessions },
  ];

  return (
    <div>
      <h1 className="text-2xl font-black mb-6">Dashboard</h1>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <Card key={s.label} className="p-5">
            <p className="text-3xl font-black text-primary-strong">{s.value}</p>
            <p className="text-sm text-ink-muted font-bold mt-1">{s.label}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
