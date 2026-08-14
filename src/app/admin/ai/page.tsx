import { db } from "@/lib/db";
import { Card, Chip } from "@/components/ui";
import { relativeTime } from "@/lib/utils";

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
      take: 50,
      include: { user: { select: { email: true } } },
    }),
  ]);

  return (
    <div>
      <h1 className="text-2xl font-black mb-6">AI Usage</h1>

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
      <div className="overflow-x-auto bg-surface border border-line rounded-(--radius-card)">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-line text-left">
              <th className="p-3.5 font-extrabold">Waktu</th>
              <th className="p-3.5 font-extrabold">User</th>
              <th className="p-3.5 font-extrabold">Fitur</th>
              <th className="p-3.5 font-extrabold">Provider</th>
              <th className="p-3.5 font-extrabold">Latensi</th>
              <th className="p-3.5 font-extrabold">Status</th>
            </tr>
          </thead>
          <tbody>
            {recent.map((g) => (
              <tr key={g.id} className="border-b border-line last:border-0">
                <td className="p-3.5 text-ink-muted whitespace-nowrap">{relativeTime(g.createdAt)}</td>
                <td className="p-3.5 text-ink-muted">{g.user.email}</td>
                <td className="p-3.5 font-bold">{g.feature}</td>
                <td className="p-3.5 text-ink-muted">
                  {g.provider} / {g.model}
                </td>
                <td className="p-3.5 text-ink-muted">{g.latencyMs}ms</td>
                <td className="p-3.5">
                  <Chip tone={STATUS_TONES[g.status] ?? "muted"}>{g.status}</Chip>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
