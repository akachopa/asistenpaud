"use client";

import { useState, useTransition } from "react";
import { rateSessionAction } from "../actions";

const RATINGS = [
  { value: "KURANG", label: "😕 Kurang cocok" },
  { value: "LUMAYAN", label: "🙂 Lumayan" },
  { value: "SUKA", label: "😁 Anak suka" },
];

export function RatingButtons({ sessionId, currentRating }: { sessionId: string; currentRating: string | null }) {
  const [rating, setRating] = useState(currentRating);
  const [pending, startTransition] = useTransition();

  return (
    <div className="flex flex-wrap gap-2">
      {RATINGS.map((r) => (
        <button
          key={r.value}
          type="button"
          disabled={pending}
          onClick={() =>
            startTransition(async () => {
              await rateSessionAction(sessionId, r.value);
              setRating(r.value);
            })
          }
          className={`rounded-full border-2 px-3.5 py-1.5 text-xs font-bold transition-colors ${
            rating === r.value ? "border-primary bg-primary-soft text-primary-strong" : "border-line bg-surface text-ink-muted"
          }`}
          aria-pressed={rating === r.value}
        >
          {r.label}
        </button>
      ))}
    </div>
  );
}
