"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import {
  startSimulatorAction,
  chooseSimulatorAction,
  saveReflectionAction,
  type SimStepState,
} from "../../actions";
import { buttonStyles, Card, Chip } from "@/components/ui";
import { summarizeScores } from "@/lib/simulator";
import type { ScoreDimension } from "../../../../../prisma/seed-data/types";

export function SimulatorPlayer({ simulatorId }: { simulatorId: string }) {
  const [state, setState] = useState<SimStepState | null>(null);
  const [reflection, setReflection] = useState("");
  const [reflectionSaved, setReflectionSaved] = useState(false);
  const [pending, startTransition] = useTransition();

  const start = () => {
    startTransition(async () => {
      const res = await startSimulatorAction(simulatorId);
      setState(res);
      setReflectionSaved(Boolean(res.reflectionSaved));
    });
  };

  const choose = (index: number) => {
    if (!state) return;
    startTransition(async () => {
      const res = await chooseSimulatorAction(state.attemptId, index);
      setState(res);
    });
  };

  if (!state) {
    return (
      <button type="button" onClick={start} disabled={pending} className={`${buttonStyles.primary} w-full text-lg`}>
        {pending ? "Menyiapkan kelas..." : "▶ Masuk ke Kelas"}
      </button>
    );
  }

  if (state.error) {
    return (
      <Card className="p-5 text-center">
        <p className="font-bold text-danger">{state.error}</p>
      </Card>
    );
  }

  if (state.done) {
    const scores = summarizeScores((state.scores ?? {}) as Partial<Record<ScoreDimension, number>>);
    return (
      <div className="space-y-4">
        {state.lastEffect ? (
          <Card className="p-5 bg-secondary-soft border-secondary/40">
            <p className="text-sm leading-relaxed">{state.lastEffect}</p>
          </Card>
        ) : null}
        <Card className="p-5 text-center">
          <p className="text-4xl" aria-hidden>
            🎉
          </p>
          <h2 className="font-black text-xl mt-1">Simulasi selesai! +30 XP</h2>
        </Card>
        <Card className="p-5">
          <h3 className="font-extrabold mb-3">Profil keputusanmu</h3>
          <div className="space-y-2">
            {scores.map((s) => (
              <div key={s.dimension} className="flex items-center justify-between">
                <span className="text-sm font-bold">{s.label}</span>
                <Chip tone={s.tone}>{s.value > 0 ? `+${s.value}` : s.value}</Chip>
              </div>
            ))}
          </div>
        </Card>
        <Card className="p-5">
          <h3 className="font-extrabold mb-1.5">💚 Praktik baik</h3>
          <p className="text-sm leading-relaxed">{state.debriefGood}</p>
          <h3 className="font-extrabold mb-1.5 mt-4">⚠️ Yang perlu dihindari</h3>
          <p className="text-sm leading-relaxed">{state.debriefRisky}</p>
        </Card>
        <Card className="p-5">
          <h3 className="font-extrabold mb-2">🪞 Refleksi (+10 XP)</h3>
          {reflectionSaved ? (
            <p className="text-sm font-bold text-success">✓ Refleksimu tersimpan di portfolio.</p>
          ) : (
            <>
              <textarea
                rows={3}
                value={reflection}
                onChange={(e) => setReflection(e.target.value)}
                placeholder="Apa yang akan kamu lakukan berbeda jika menghadapi situasi ini lagi?"
                className="w-full rounded-2xl border-2 border-line bg-surface px-4 py-3 text-sm focus:border-primary focus:outline-none"
              />
              <button
                type="button"
                disabled={pending || reflection.trim().length < 5}
                onClick={() =>
                  startTransition(async () => {
                    const res = await saveReflectionAction(state.attemptId, reflection);
                    if (res.ok) setReflectionSaved(true);
                  })
                }
                className={`${buttonStyles.primary} w-full mt-2`}
              >
                Simpan Refleksi
              </button>
            </>
          )}
        </Card>
        <Link href="/student/challenges" className={`${buttonStyles.outline} w-full`}>
          ← Kembali ke daftar skenario
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {state.lastEffect ? (
        <Card className="p-4 bg-secondary-soft border-secondary/40">
          <p className="text-xs font-bold text-warning mb-1">Yang terjadi:</p>
          <p className="text-sm leading-relaxed">{state.lastEffect}</p>
        </Card>
      ) : null}
      <Card className="p-5">
        <p className="text-xs font-bold text-ink-muted uppercase tracking-wide mb-2">Situasi {state.stepCount + 1}</p>
        <p className="leading-relaxed font-bold">{state.node?.scene}</p>
        {state.node?.context ? <p className="text-sm text-ink-muted mt-2">{state.node.context}</p> : null}
      </Card>
      <p className="font-extrabold text-sm">Apa yang kamu lakukan?</p>
      <div className="space-y-2">
        {state.node?.choices.map((choice, i) => (
          <button
            key={i}
            type="button"
            disabled={pending}
            onClick={() => choose(i)}
            className="w-full text-left bg-surface border-2 border-line rounded-2xl p-4 text-sm font-bold leading-relaxed hover:border-primary transition-colors disabled:opacity-60"
          >
            {choice.label}
          </button>
        ))}
      </div>
    </div>
  );
}
