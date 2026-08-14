"use client";

import { useActionState } from "react";
import { submitMicroteachingAction, type MicroteachingState } from "../../actions";
import { buttonStyles, Card, Chip, ListBlock } from "@/components/ui";

const FIELDS = [
  { name: "objectives", label: "🎯 Tujuan kegiatan", placeholder: "Apa yang kamu harapkan anak alami/pelajari?", rows: 2 },
  { name: "opening", label: "👋 Pembukaan", placeholder: "Bagaimana kamu menarik perhatian anak di awal?", rows: 2 },
  { name: "mainActivity", label: "⭐ Kegiatan inti", placeholder: "Langkah demi langkah. Apa yang DILAKUKAN anak?", rows: 4 },
  { name: "media", label: "🧺 Media / alat", placeholder: "Apa saja yang dipakai? Cukup untuk semua anak?", rows: 2 },
  { name: "closing", label: "🌙 Penutup", placeholder: "Bagaimana kamu menutup dan merefleksikan bersama anak?", rows: 2 },
  { name: "observation", label: "👀 Rencana observasi", placeholder: "Perilaku spesifik apa yang akan kamu amati?", rows: 2 },
];

const LEVEL_TONES: Record<string, "success" | "warning" | "danger"> = {
  BAIK: "success",
  CUKUP: "warning",
  PERLU_DIKEMBANGKAN: "danger",
};

export function MicroteachingForm({ briefSlug }: { briefSlug: string }) {
  const action = submitMicroteachingAction.bind(null, briefSlug);
  const [state, formAction, pending] = useActionState<MicroteachingState, FormData>(action, {});

  const feedback = state.feedback;

  return (
    <div className="mt-5">
      {!feedback ? (
        <form action={formAction} className="space-y-4">
          <h2 className="font-extrabold">Rencanamu ✍️</h2>
          {FIELDS.map((f) => (
            <div key={f.name}>
              <label htmlFor={f.name} className="text-sm font-extrabold block mb-1.5">
                {f.label}
              </label>
              <textarea
                id={f.name}
                name={f.name}
                rows={f.rows}
                required
                placeholder={f.placeholder}
                className="w-full rounded-2xl border-2 border-line bg-surface px-4 py-3 text-sm focus:border-primary focus:outline-none"
              />
            </div>
          ))}
          {state.error ? (
            <p role="alert" className="rounded-2xl bg-danger-soft text-danger text-sm font-bold px-4 py-3">
              {state.error}
            </p>
          ) : null}
          <button type="submit" disabled={pending} className={`${buttonStyles.primary} w-full`}>
            {pending ? "Coach sedang membaca rencanamu..." : "📤 Kirim & Minta Feedback (+50 XP)"}
          </button>
        </form>
      ) : (
        <div className="space-y-4">
          <Card className="p-5 text-center bg-success-soft border-success/30">
            <p className="font-black text-lg">🎉 Feedback siap! +50 XP</p>
          </Card>
          <Card className="p-5">
            <ListBlock title="💚 Kekuatan" items={feedback.strengths} />
            <ListBlock title="🔧 Yang perlu diperbaiki" items={feedback.improvements} />
            <ListBlock title="⚠️ Risiko" items={feedback.risks} tone="danger" />
            <ListBlock title="✏️ Usulan revisi" items={feedback.revision_suggestions} />
            <ListBlock title="🪞 Pertanyaan refleksi" items={feedback.reflection_questions} />
          </Card>
          <Card className="p-5">
            <h3 className="font-extrabold mb-3">Rubrik</h3>
            <div className="space-y-3">
              {feedback.rubric.map((r, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-bold">{r.criterion}</p>
                    <Chip tone={LEVEL_TONES[r.level] ?? "muted"}>{r.level.replace(/_/g, " ")}</Chip>
                  </div>
                  <p className="text-xs text-ink-muted mt-0.5">{r.note}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
