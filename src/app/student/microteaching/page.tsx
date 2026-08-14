import Link from "next/link";
import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { Chip } from "@/components/ui";
import { parseJson } from "@/lib/utils";
import type { BriefData } from "@/lib/content";

export const metadata = { title: "Microteaching" };

export default async function MicroteachingPage() {
  const user = await requireUser();
  const [briefs, submissions] = await Promise.all([
    db.contentItem.findMany({
      where: { type: "MICROTEACHING_BRIEF", status: "APPROVED" },
      orderBy: { title: "asc" },
    }),
    db.microteachingSubmission.findMany({
      where: { userId: user.id },
      select: { briefSlug: true },
    }),
  ]);
  const doneSlugs = new Set(submissions.map((s) => s.briefSlug));

  return (
    <main>
      <h1 className="text-2xl font-black mt-2 mb-1">Microteaching Coach 📝</h1>
      <p className="text-sm text-ink-muted mb-5">
        Pilih tantangan, susun rencana mengajarmu, dapatkan feedback yang bisa ditindaklanjuti.
      </p>
      <div className="space-y-2.5">
        {briefs.map((brief) => {
          const data = parseJson<BriefData>(brief.data, {} as BriefData);
          return (
            <Link
              key={brief.id}
              href={`/student/microteaching/${brief.slug}`}
              className="block bg-surface border border-line rounded-(--radius-card) p-4 hover:border-primary transition-colors"
            >
              <div className="flex items-start justify-between gap-2">
                <h2 className="font-extrabold leading-snug">{brief.title}</h2>
                {doneSlugs.has(brief.slug) ? <Chip tone="success">✓</Chip> : null}
              </div>
              <div className="flex flex-wrap gap-1.5 mt-2">
                <Chip tone="primary">{data.ageRange}</Chip>
                <Chip>{data.childCount} anak</Chip>
                <Chip>{data.durationMinutes} menit</Chip>
                <Chip tone="secondary">{data.theme}</Chip>
              </div>
              <p className="text-xs text-ink-muted mt-2">⚠️ {data.constraint}</p>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
