import { db } from "@/lib/db";
import { Card, Chip } from "@/components/ui";
import { PageHeader } from "@/components/page-header";
import { relativeTime } from "@/lib/utils";
import { AILogsTable } from "./ai-logs-table";

export const metadata = { title: "AI Logs" };

const STATUS_TONES: Record<string, "success" | "warning" | "danger"> = {
  SUCCESS: "success",
  SCHEMA_FAILED: "warning",
  SAFETY_REJECTED: "danger",
  ERROR: "danger",
};

export default async function AdminAIPage() {
  const [byFeature, byStatus, recent] = await Promise.all([
    db.generation.groupBy({ by: ["feature"], _count: true, _avg: { latencyMs: true } }),
    db.generation.groupBy({ by: ["status"], _count: true }),
    db.generation.findMany({
      orderBy: { createdAt: "desc" },
      take: 200,
      include: { user: { select: { email: true } } },
    }),
  ]);

  return (
    <div className="w-full">
      <PageHeader title="AI Usage" description="Pantau generasi, latensi, dan status keamanan." />

      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <Card className="p-5">
          <h2 className="font-extrabold mb-3">Per fitur</h2>
          {byFeature.length === 0 ? (
            <p className="text-sm text-ink-muted">Belum ada penggunaan.</p>
          ) : (
            <ul className="space-y-2 text-sm">
              {byFeature.map((f) => (
                <li key={f.feature} className="flex justify-between">
                  <span className="font-bold">{f.feature}</span>
                  <span className="text-ink-muted">
                    {f._count}x · rata-rata {Math.round(f._avg.latencyMs ?? 0)}ms
                  </span>
                </li>
              ))}
            </ul>
          )}
        </Card>
        <Card className="p-5">
          <h2 className="font-extrabold mb-3">Per status</h2>
          {byStatus.length === 0 ? (
            <p className="text-sm text-ink-muted">Belum ada penggunaan.</p>
          ) : (
            <ul className="space-y-2 text-sm">
              {byStatus.map((s) => (
                <li key={s.status} className="flex justify-between items-center">
                  <Chip tone={STATUS_TONES[s.status] ?? "muted"}>{s.status}</Chip>
                  <span className="font-bold">{s._count}</span>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>

      <h2 className="font-extrabold mb-3">Log terbaru</h2>
      <AILogsTable
        rows={recent.map((g) => ({
          id: g.id,
          createdAt: relativeTime(g.createdAt),
          email: g.user.email,
          feature: g.feature,
          provider: g.provider,
          model: g.model,
          latencyMs: g.latencyMs,
          status: g.status,
        }))}
      />
    </div>
  );
}
