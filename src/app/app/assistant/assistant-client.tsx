"use client";

import { useActionState, useRef } from "react";
import { askSituationAction, type SituationState } from "../actions";
import { buttonStyles, Card, ListBlock } from "@/components/ui";

const EXAMPLES = [
  "Dua anak berebut mainan dan mulai menangis.",
  "Satu anak tidak mau ikut kegiatan sama sekali.",
  "Anak menangis dan tidak mau ditinggal ibunya.",
  "Kelas sangat gaduh setelah istirahat.",
];

export function AssistantClient() {
  const [state, formAction, pending] = useActionState<SituationState, FormData>(askSituationAction, {});
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const result = state.result;

  return (
    <main className="w-full">
      <h1 className="text-2xl font-black mt-2">Ada situasi apa di kelas? 💬</h1>
      <p className="text-ink-muted mt-1 mb-5">
        Ceritakan yang sedang terjadi. Teman Guru akan bantu dengan langkah konkret — bukan teori panjang.
      </p>

      <div className="grid xl:grid-cols-[minmax(0,420px)_1fr] gap-8 items-start">
      <div>
      <form action={formAction} className="space-y-4">
        <textarea
          ref={textareaRef}
          name="situation"
          rows={4}
          required
          minLength={10}
          placeholder="mis. Dua anak berebut mainan dan mulai menangis..."
          className="w-full rounded-2xl border-2 border-line bg-surface px-4 py-3 text-base focus:border-primary focus:outline-none"
          aria-label="Ceritakan situasi kelas"
        />
        <div className="flex flex-wrap gap-2">
          {EXAMPLES.map((ex) => (
            <button
              key={ex}
              type="button"
              onClick={() => {
                if (textareaRef.current) textareaRef.current.value = ex;
              }}
              className="rounded-full border-2 border-line bg-surface px-3.5 py-1.5 text-xs font-bold text-ink-muted hover:border-primary transition-colors"
            >
              {ex}
            </button>
          ))}
        </div>
        <button type="submit" disabled={pending} className={`${buttonStyles.primary} w-full`}>
          {pending ? "Memikirkan saran..." : "💬 Minta Saran"}
        </button>
      </form>

      {state.error ? (
        <Card className="p-5 mt-5 text-center">
          <p className="font-bold text-danger">{state.error}</p>
        </Card>
      ) : null}
      </div>

      {result ? (
        <div className="space-y-4">
          <Card className="p-5 bg-secondary-soft border-secondary/40">
            <p className="text-sm leading-relaxed font-bold">{result.empathy_opener}</p>
          </Card>
          <Card className="p-5">
            <ListBlock title="✅ Lakukan sekarang" items={result.do_now} />
          </Card>
          <Card className="p-5 bg-primary-soft border-primary/30">
            <h4 className="text-sm font-extrabold mb-2">🗣 Kalimat yang bisa diucapkan</h4>
            <ul className="space-y-2">
              {result.scripts.map((s, i) => (
                <li key={i} className="text-sm italic leading-relaxed">
                  “{s}”
                </li>
              ))}
            </ul>
          </Card>
          <Card className="p-5">
            <ListBlock title="👀 Yang perlu diamati" items={result.observe} />
            <ListBlock title="🚫 Hindari" items={result.avoid} tone="danger" />
            <div>
              <h4 className="text-sm font-extrabold mb-1.5">🤝 Kapan perlu bantuan lebih lanjut</h4>
              <p className="text-sm leading-relaxed">{result.escalation}</p>
            </div>
          </Card>
        </div>
      ) : (
        <Card className="p-8 hidden xl:flex items-center justify-center text-center min-h-[280px]">
          <div>
            <p className="text-4xl mb-3" aria-hidden>
              💬
            </p>
            <p className="font-extrabold">Saran akan muncul di sini</p>
            <p className="text-sm text-ink-muted mt-1">Ceritakan situasinya, atau pilih contoh di sebelah kiri.</p>
          </div>
        </Card>
      )}
      </div>
    </main>
  );
}
