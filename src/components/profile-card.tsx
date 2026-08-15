import { logoutAction } from "@/app/(auth)/actions";
import { Card, Chip, buttonStyles } from "@/components/ui";
import type { SessionUser } from "@/lib/auth";

const ROLE_LABELS: Record<string, string> = {
  TEACHER: "Guru PAUD",
  STUDENT: "Mahasiswa PGPAUD/PIAUD",
  ADMIN: "Admin",
};

export function ProfileCard({ user, stats }: { user: SessionUser; stats: { label: string; value: number | string }[] }) {
  return (
    <div>
      <Card className="p-5 text-center">
        <div className="text-5xl mb-2" aria-hidden>
          {user.role === "STUDENT" ? "🎓" : "🍎"}
        </div>
        <h2 className="text-xl font-black">{user.name}</h2>
        <p className="text-sm text-ink-muted">{user.email}</p>
        <div className="mt-2">
          <Chip tone="primary">{ROLE_LABELS[user.role] ?? user.role}</Chip>
        </div>
      </Card>

      <div className="grid grid-cols-3 gap-3 mt-4">
        {stats.map((s) => (
          <Card key={s.label} className="p-4 text-center">
            <p className="text-2xl font-black text-primary-strong">{s.value}</p>
            <p className="text-xs text-ink-muted font-bold mt-1">{s.label}</p>
          </Card>
        ))}
      </div>

      <form action={logoutAction} className="mt-6">
        <button type="submit" className={`${buttonStyles.danger} w-full`}>
          Keluar
        </button>
      </form>
    </div>
  );
}
