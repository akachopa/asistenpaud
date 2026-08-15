"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { randomGameAction, type RandomGameResult } from "../actions";
import { buttonStyles, Card, Chip } from "@/components/ui";
import { SaveButton, MarkUsedButton } from "@/components/save-button";
import { ageParamToMonths } from "@/lib/filters";

const AGE_CHOICES = [
  { label: "2–3 th", value: "24-36" },
  { label: "3–4 th", value: "36-48" },
  { label: "4–5 th", value: "48-60" },
  { label: "5–6 th", value: "60-72" },
];
const DURATION_CHOICES = ["5", "10", "15"];

export function RandomGameClient({
  initialDuration,
  initialNoTools,
  initialLocation,
}: {
  initialDuration?: string;
  initialNoTools?: boolean;
  initialLocation?: string;
}) {
  const [age, setAge] = useState<string>("");
  const [duration, setDuration] = useState<string>(initialDuration ?? "");
  const [noTools, setNoTools] = useState<boolean>(initialNoTools ?? false);
  const [location, setLocation] = useState<string>(initialLocation ?? "");
  const [result, setResult] = useState<RandomGameResult | null>(null);
  const [error, setError] = useState<string>("");
  const [seenIds, setSeenIds] = useState<string[]>([]);
  const [pending, startTransition] = useTransition();

  const roll = () => {
    startTransition(async () => {
      setError("");
      const res = await randomGameAction(
        {
          ageMonths: ageParamToMonths(age || undefined),
          maxDuration: duration ? Number(duration) : undefined,
          noTools: noTools || undefined,
          location: location || undefined,
        },
        seenIds,
      );
      if ("error" in res && res.error) {
        setError(res.error);
        setResult(null);
        return;
      }
      const game = res as RandomGameResult;
      setResult(game);
      setSeenIds((prev) => [...prev.slice(-9), game.id]);
    });
  };

  const chip = (active: boolean) =>
    `rounded-full border-2 px-4 py-2 text-sm font-bold transition-colors ${
      active ? "border-primary bg-primary-soft text-primary-strong" : "border-line bg-surface text-ink-muted"
    }`;

  return (
    <main className="w-full">
      <h1 className="text-2xl font-black mt-2">Kasih Saya Game! 🎰</h1>
      <p className="text-ink-muted mt-1 mb-5">Atur kondisi kelasmu, lalu putar!</p>

      <div className="grid xl:grid-cols-[minmax(0,420px)_1fr] gap-8 items-start">
      <div>
      <div className="space-y-4">
        <div>
          <p className="text-sm font-extrabold mb-2">Usia</p>
          <div className="flex flex-wrap gap-2">
            {AGE_CHOICES.map((a) => (
              <button key={a.value} type="button" onClick={() => setAge(age === a.value ? "" : a.value)} className={chip(age === a.value)}>
                {a.label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="text-sm font-extrabold mb-2">Durasi maksimal</p>
          <div className="flex flex-wrap gap-2">
            {DURATION_CHOICES.map((d) => (
              <button key={d} type="button" onClick={() => setDuration(duration === d ? "" : d)} className={chip(duration === d)}>
                {d} menit
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={() => setNoTools(!noTools)} className={chip(noTools)} aria-pressed={noTools}>
            🙌 Tanpa alat
          </button>
          <button type="button" onClick={() => setLocation(location === "INDOOR" ? "" : "INDOOR")} className={chip(location === "INDOOR")}>
            🏠 Indoor
          </button>
          <button type="button" onClick={() => setLocation(location === "OUTDOOR" ? "" : "OUTDOOR")} className={chip(location === "OUTDOOR")}>
            🌳 Outdoor
          </button>
        </div>
      </div>

      <button type="button" onClick={roll} disabled={pending} className={`${buttonStyles.primary} w-full mt-6 text-lg`}>
        {pending ? "Mengacak..." : result ? "🎲 Acak Lagi!" : "🎲 Kasih Saya Game!"}
      </button>

      {error ? (
        <Card className="p-5 mt-5 text-center">
          <p className="font-bold">{error}</p>
        </Card>
      ) : null}
      </div>

      {result ? (
        <Card className="p-5">
          <div className="flex flex-wrap gap-1.5 mb-2">
            <Chip tone="primary">{result.ageLabel}</Chip>
            <Chip>{result.durationLabel}</Chip>
            {result.noTools ? <Chip tone="success">Tanpa alat</Chip> : null}
          </div>
          <h2 className="text-xl font-black">{result.title}</h2>
          {result.hook ? <p className="text-primary-strong font-bold text-sm mt-1">{result.hook}</p> : null}
          <p className="text-sm text-ink-muted mt-1.5">{result.summary}</p>
          {result.materials.length > 0 ? (
            <p className="text-sm mt-2">
              <span className="font-bold">Alat:</span> {result.materials.join(", ")}
            </p>
          ) : null}
          <ol className="mt-3 space-y-1.5 list-decimal list-inside text-sm leading-relaxed">
            {result.steps.slice(0, 4).map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ol>
          <div className="flex flex-col gap-2 mt-4">
            <Link href={`/app/games/${result.slug}`} className={buttonStyles.primary}>
              ▶ Mainkan Sekarang
            </Link>
            <div className="flex gap-2">
              <SaveButton key={`save-${result.id}`} contentId={result.id} initialSaved={false} />
              <MarkUsedButton key={`used-${result.id}`} contentId={result.id} title={result.title} />
            </div>
          </div>
        </Card>
      ) : (
        <Card className="p-8 hidden xl:flex items-center justify-center text-center min-h-[280px]">
          <div>
            <p className="text-4xl mb-3" aria-hidden>
              🎰
            </p>
            <p className="font-extrabold">Game hasil acak akan muncul di sini</p>
            <p className="text-sm text-ink-muted mt-1">Atur kondisi, lalu klik Kasih Saya Game!</p>
          </div>
        </Card>
      )}
      </div>
    </main>
  );
}
