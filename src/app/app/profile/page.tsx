import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { ProfileCard } from "@/components/profile-card";

export const metadata = { title: "Profil" };

export default async function TeacherProfilePage() {
  const user = await requireUser();
  const [savedCount, usedCount, generationCount] = await Promise.all([
    db.savedItem.count({ where: { userId: user.id } }),
    db.teachingSession.count({ where: { userId: user.id, status: "USED" } }),
    db.generation.count({ where: { userId: user.id, status: "SUCCESS" } }),
  ]);

  return (
    <main>
      <h1 className="text-2xl font-black mt-2 mb-4">Profil Saya</h1>
      <ProfileCard
        user={user}
        stats={[
          { label: "Tersimpan", value: savedCount },
          { label: "Digunakan", value: usedCount },
          { label: "Dibuat AI", value: generationCount },
        ]}
      />
    </main>
  );
}
