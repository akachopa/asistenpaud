"use client";

import { useActionState, useState } from "react";
import { generateStoryAction, type GenerateStoryState } from "../../actions";
import { buttonStyles, Card, ListBlock } from "@/components/ui";

const AGE_CHOICES = ["3–4 tahun", "4–5 tahun", "5–6 tahun"];
const inputClass =
  "w-full rounded-2xl border-2 border-line bg-surface px-4 py-3 text-base focus:border-primary focus:outline-none";

export function StoryGenerator() {
  const [state, formAction, pending] = useActionState<GenerateStoryState, FormData>(generateStoryAction, {});
  const [age, setAge] = useState("4–5 tahun");
  const [revealed, setRevealed] = useState(0);

  const chip = (active: boolean) =>
    `rounded-full border-2 px-4 py-2 text-sm font-bold transition-colors ${
      active ? "border-primary bg-primary-soft text-primary-strong" : "border-line bg-surface text-ink-muted"
    }`;

  const result = state.result;

  return (
    <main>
      <h1 className="text-2xl font-black mt-2">Buat Cerita 📖</h1>
      <p className="text-ink-muted mt-1 mb-5">Cerita interaktif dengan tokoh original, siap dibawakan.</p>

      <form
        action={(fd) => {
          setRevealed(0);
          formAction(fd);
        }}
        className="space-y-4"
      >
        <div>
          <p className="text-sm font-extrabold mb-2">Usia anak</p>
          <input type="hidden" name="ageRange" value={age} />
          <div className="flex flex-wrap gap-2">
            {AGE_CHOICES.map((a) => (
              <button key={a} type="button" onClick={() => setAge(a)} className={chip(age === a)}>
                {a}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label htmlFor="theme" className="text-sm font-extrabold block mb-2">
            Tema cerita
          </label>
          <input id="theme" name="theme" required placeholder="mis. kupu-kupu, berbagi makanan, hujan" className={inputClass} />
        </div>
        <div>
          <label htmlFor="value" className="text-sm font-extrabold block mb-2">
            Nilai / karakter <span className="font-normal text-ink-muted">(opsional)</span>
          </label>
          <input id="value" name="value" placeholder="mis. keberanian, tolong-menolong" className={inputClass} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="characterName" className="text-sm font-extrabold block mb-2">
              Nama tokoh <span className="font-normal text-ink-muted">(opsional)</span>
            </label>
            <input id="characterName" name="characterName" placeholder="mis. Kiko" className={inputClass} />
          </div>
          <div>
            <label htmlFor="setting" className="text-sm font-extrabold block mb-2">
              Latar <span className="font-normal text-ink-muted">(opsional)</span>
            </label>
            <input id="setting" name="setting" placeholder="mis. kebun" className={inputClass} />
          </div>
        </div>
        <button type="submit" disabled={pending} className={`${buttonStyles.primary} w-full text-lg`}>
          {pending ? "Merangkai cerita..." : "🪄 Buatkan Cerita"}
        </button>
      </form>

      {state.error ? (
        <Card className="p-5 mt-5 text-center">
          <p className="font-bold text-danger">{state.error}</p>
        </Card>
      ) : null}

      {result ? (
        <div className="mt-6">
          <Card className="p-5">
            <h2 className="text-xl font-black">{result.title}</h2>
            <p className="text-sm font-bold text-primary-strong mt-2">Pertanyaan pembuka:</p>
            <p className="text-sm italic">“{result.opening_question}”</p>
          </Card>

          <Card className="p-5 mt-4">
            <h3 className="font-extrabold mb-3">Mode bercerita 🎭</h3>
            <div className="space-y-4">
              {result.story_parts.slice(0, revealed + 1).map((part, i) => (
                <div key={i}>
                  <p className="text-sm leading-relaxed">{part.text}</p>
                  {part.interaction ? (
                    <p className="text-sm font-bold text-primary-strong mt-2 bg-primary-soft rounded-xl px-3 py-2">
                      💬 Tanya anak: “{part.interaction}”
                    </p>
                  ) : null}
                </div>
              ))}
            </div>
            {revealed < result.story_parts.length - 1 ? (
              <button type="button" onClick={() => setRevealed((r) => r + 1)} className={`${buttonStyles.primary} w-full mt-4`}>
                Lanjutkan cerita ▶
              </button>
            ) : (
              <p className="text-center font-bold text-primary-strong mt-4">🎉 Cerita selesai!</p>
            )}
          </Card>

          <Card className="p-5 mt-4">
            <ListBlock title="🎭 Ekspresi & gerakan guru" items={result.gestures} />
            <ListBlock title="❓ Pertanyaan setelah cerita" items={result.closing_questions} />
            <div className="mb-4">
              <h4 className="text-sm font-extrabold mb-1.5">💛 Pesan cerita</h4>
              <p className="text-sm">{result.message}</p>
            </div>
            <div>
              <h4 className="text-sm font-extrabold mb-1.5">➡️ Aktivitas lanjutan</h4>
              <p className="text-sm">{result.follow_up_activity}</p>
            </div>
          </Card>
        </div>
      ) : null}
    </main>
  );
}
