import { notFound } from "next/navigation";
import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { parseJson } from "@/lib/utils";
import { Card, ListBlock } from "@/components/ui";
import { CompleteModuleButton } from "./complete-button";

interface ModuleSection {
  heading: string;
  body: string;
  points?: string[];
}

export default async function ModulePage({ params }: PageProps<"/student/learn/[slug]">) {
  const { slug } = await params;
  const user = await requireUser();
  const learningModule = await db.learningModule.findUnique({ where: { slug } });
  if (!learningModule) notFound();

  const done = await db.learningProgress.findUnique({
    where: { userId_moduleId: { userId: user.id, moduleId: learningModule.id } },
  });
  const sections = parseJson<ModuleSection[]>(learningModule.content, []);

  return (
    <main className="w-full max-w-3xl">
      <p className="text-xs font-bold text-primary-strong uppercase tracking-wide mt-2">Level {learningModule.level}</p>
      <h1 className="text-2xl font-black leading-tight mt-1">{learningModule.title}</h1>
      <p className="text-ink-muted mt-2">{learningModule.description}</p>

      <div className="space-y-4 mt-5">
        {sections.map((section, i) => (
          <Card key={i} className="p-5">
            <h2 className="font-extrabold mb-2">{section.heading}</h2>
            <p className="text-sm leading-relaxed">{section.body}</p>
            {section.points?.length ? (
              <div className="mt-3">
                <ListBlock title="" items={section.points} />
              </div>
            ) : null}
          </Card>
        ))}
      </div>

      <div className="mt-6">
        <CompleteModuleButton moduleId={learningModule.id} initialDone={Boolean(done)} />
      </div>
    </main>
  );
}
