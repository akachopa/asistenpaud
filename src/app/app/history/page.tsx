import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { Card, Chip, EmptyState, LinkButton } from "@/components/ui";
import { relativeTime } from "@/lib/utils";
import { RatingButtons } from "./rating-buttons";

export const metadata = { title: "Riwayat" };

const STATUS_LABELS: Record<string, string> = {
  VIEWED: "Dilihat",
  STARTED: "Dimulai",
  USED: "Digunakan",
};

export default async function HistoryPage() {
  const user = await requireUser();
  const sessions = await db.teachingSession.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  return (
    <main>
      <h1 className="text-2xl font-black mt-2 mb-4">Riwayat Mengajar 🕰</h1>
      {sessions.length === 0 ? (
        <EmptyState
          emoji="🕰"
          title="Belum ada riwayat"
          description="Aktivitas yang kamu buat, lihat, dan gunakan akan tercatat di sini."
          action={<LinkButton href="/app/activity/new">✨ Buat Kegiatan Pertama</LinkButton>}
        />
      ) : (
        <div className="space-y-2.5">
          {sessions.map((s) => (
            <Card key={s.id} className="p-4">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="font-extrabold text-sm leading-snug">{s.title}</p>
                  <p className="text-xs text-ink-muted mt-0.5">{relativeTime(s.createdAt)}</p>
                </div>
                <Chip tone={s.status === "USED" ? "success" : "muted"}>{STATUS_LABELS[s.status] ?? s.status}</Chip>
              </div>
              {s.status === "USED" ? (
                <div className="mt-3 border-t border-line pt-3">
                  <p className="text-xs font-bold text-ink-muted mb-2">Bagaimana hasilnya?</p>
                  <RatingButtons sessionId={s.id} currentRating={s.rating} />
                </div>
              ) : null}
            </Card>
          ))}
        </div>
      )}
    </main>
  );
}
