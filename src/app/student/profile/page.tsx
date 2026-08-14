import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { getTotalXp } from "@/lib/xp";
import { ProfileCard } from "@/components/profile-card";

export const metadata = { title: "Profil" };

export default async function StudentProfilePage() {
  const user = await requireUser();
  const [xp, simCount, microCount] = await Promise.all([
    getTotalXp(user.id),
    db.simulatorAttempt.count({ where: { userId: user.id, status: "COMPLETED" } }),
    db.microteachingSubmission.count({ where: { userId: user.id } }),
  ]);

  return (
    <main>
      <h1 className="text-2xl font-black mt-2 mb-4">Profil Saya</h1>
      <ProfileCard
        user={user}
        stats={[
          { label: "XP", value: xp },
          { label: "Simulasi", value: simCount },
          { label: "Microteaching", value: microCount },
        ]}
      />
    </main>
  );
}
