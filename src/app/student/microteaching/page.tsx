import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { parseJson } from "@/lib/utils";
import type { BriefData } from "@/lib/content";
import { PageHeader } from "@/components/page-header";
import { MicroteachingTable } from "./microteaching-table";

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
    <main className="w-full">
      <PageHeader
        title="Microteaching Coach 📝"
        description="Pilih tantangan, susun rencana mengajarmu, dapatkan feedback yang bisa ditindaklanjuti."
      />
      <MicroteachingTable
        rows={briefs.map((brief) => {
          const data = parseJson<BriefData>(brief.data, {} as BriefData);
          return {
            id: brief.id,
            slug: brief.slug,
            title: brief.title,
            ageRange: data.ageRange ?? "—",
            childCount: data.childCount ?? 0,
            durationMinutes: data.durationMinutes ?? 0,
            theme: data.theme ?? "—",
            constraint: data.constraint ?? "—",
            done: doneSlugs.has(brief.slug),
          };
        })}
      />
    </main>
  );
}
