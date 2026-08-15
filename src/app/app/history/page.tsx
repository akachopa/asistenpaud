import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { EmptyState, LinkButton } from "@/components/ui";
import { PageHeader } from "@/components/page-header";
import { relativeTime } from "@/lib/utils";
import { HistoryTable } from "./history-table";

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
    take: 200,
  });

  return (
    <main className="w-full">
      <PageHeader title="Riwayat Mengajar 🕰" description="Aktivitas yang kamu buat, lihat, dan gunakan." />
      {sessions.length === 0 ? (
        <EmptyState
          emoji="🕰"
          title="Belum ada riwayat"
          description="Aktivitas yang kamu buat, lihat, dan gunakan akan tercatat di sini."
          action={<LinkButton href="/app/activity/new">✨ Buat Kegiatan Pertama</LinkButton>}
        />
      ) : (
        <HistoryTable
          rows={sessions.map((s) => ({
            id: s.id,
            title: s.title,
            status: s.status,
            statusLabel: STATUS_LABELS[s.status] ?? s.status,
            when: relativeTime(s.createdAt),
            rating: s.rating,
          }))}
        />
      )}
    </main>
  );
}
