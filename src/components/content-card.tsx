import Link from "next/link";
import type { ContentItem } from "@prisma/client";
import { Chip } from "@/components/ui";
import { formatAgeRange, formatDuration, parseJson } from "@/lib/utils";

const TYPE_PATHS: Record<string, string> = {
  ACTIVITY: "/app/activities",
  GAME: "/app/games",
  TIP: "/app/tips",
  STORY_TEMPLATE: "/app/stories",
};

const TYPE_ICONS: Record<string, string> = {
  ACTIVITY: "🎨",
  GAME: "🎲",
  TIP: "💡",
  STORY_TEMPLATE: "📖",
};

export function ContentCard({ item }: { item: ContentItem }) {
  const categories = parseJson<string[]>(item.categories, []);
  return (
    <Link
      href={`${TYPE_PATHS[item.type] ?? "/app/activities"}/${item.slug}`}
      className="block bg-surface rounded-(--radius-card) border border-line p-4 hover:border-primary transition-colors"
    >
      <div className="flex items-start gap-3">
        <span className="text-2xl mt-0.5" aria-hidden>
          {TYPE_ICONS[item.type] ?? "📄"}
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="font-extrabold leading-snug">{item.title}</h3>
          <p className="text-sm text-ink-muted mt-1 line-clamp-2">{item.summary}</p>
          <div className="flex flex-wrap gap-1.5 mt-2.5">
            {item.type !== "TIP" ? (
              <>
                <Chip tone="primary">{formatAgeRange(item.ageMinMonths, item.ageMaxMonths)}</Chip>
                <Chip>{formatDuration(item.durationMin, item.durationMax)}</Chip>
                {item.noTools ? <Chip tone="success">Tanpa alat</Chip> : null}
              </>
            ) : null}
            {categories.slice(0, 2).map((c) => (
              <Chip key={c}>{c}</Chip>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
