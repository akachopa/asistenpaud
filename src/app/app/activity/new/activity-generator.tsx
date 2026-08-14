"use client";

import { useActionState, useState, useTransition } from "react";
import Link from "next/link";
import {
  generateActivityAction,
  saveGeneratedActivityAction,
  type GenerateActivityState,
} from "../../actions";
import { buttonStyles, Card, Chip, ListBlock } from "@/components/ui";
import { StepMode } from "@/components/step-mode";

const AGE_CHOICES = ["2–3 tahun", "3–4 tahun", "4–5 tahun", "5–6 tahun"];
const DURATION_CHOICES = [5, 15, 30, 60];

const inputClass =
  "w-full rounded-2xl border-2 border-line bg-surface px-4 py-3 text-base focus:border-primary focus:outline-none";

export function ActivityGenerator({ quickwin }: { quickwin: boolean }) {
  const [state, formAction, pending] = useActionState<GenerateActivityState, FormData>(generateActivityAction, {});
  const [advanced, setAdvanced] = useState(false);
  const [age, setAge] = useState("4–5 tahun");
  const [duration, setDuration] = useState(15);
  const [savedSlug, setSavedSlug] = useState<string>("");
  const [saving, startSaving] = useTransition();

  const chip = (active: boolean) =>
    `rounded-full border-2 px-4 py-2 text-sm font-bold transition-colors ${
      active ? "border-primary bg-primary-soft text-primary-strong" : "border-line bg-surface text-ink-muted"
    }`;

  const result = state.result;

  return (
    <main>
      {quickwin ? (
        <p className="bg-secondary-soft text-warning font-bold text-sm rounded-2xl px-4 py-3 mt-2">
          🎉 Akunmu siap! Sekarang buat kegiatan pertamamu — cukup 3 isian.
        </p>
      ) : null}
      <h1 className="text-2xl font-black mt-3">Buat Kegiatan ✨</h1>
      <p className="text-ink-muted mt-1 mb-5">Besok atau hari ini mau mengajar apa?</p>

      <form action={formAction} className="space-y-4">
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
          <p className="text-sm font-extrabold mb-2">Waktu</p>
          <input type="hidden" name="durationMinutes" value={duration} />
          <div className="flex flex-wrap gap-2">
            {DURATION_CHOICES.map((d) => (
              <button key={d} type="button" onClick={() => setDuration(d)} className={chip(duration === d)}>
                {d} menit
              </button>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="theme" className="text-sm font-extrabold block mb-2">
            Tema / tujuan
          </label>
          <input id="theme" name="theme" required placeholder="mis. binatang, mengenal warna, motorik kasar" className={inputClass} />
        </div>

        <button type="button" onClick={() => setAdvanced(!advanced)} className="text-sm font-bold text-primary-strong">
          {advanced ? "▲ Sembunyikan opsi lanjutan" : "▼ Opsi lanjutan (jumlah anak, lokasi, alat...)"}
        </button>

        {advanced ? (
          <div className="space-y-4 border-t border-line pt-4">
            <div>
              <label htmlFor="childCount" className="text-sm font-extrabold block mb-2">
                Jumlah anak
              </label>
              <input id="childCount" name="childCount" type="number" min={1} max={60} defaultValue={15} className={inputClass} />
            </div>
            <div>
              <p className="text-sm font-extrabold mb-2">Lokasi</p>
              <div className="flex gap-3">
                <label className="flex items-center gap-2 text-sm font-bold">
                  <input type="radio" name="location" value="INDOOR" defaultChecked /> Indoor
                </label>
                <label className="flex items-center gap-2 text-sm font-bold">
                  <input type="radio" name="location" value="OUTDOOR" /> Outdoor
                </label>
              </div>
            </div>
            <label className="flex items-center gap-2 text-sm font-bold">
              <input type="checkbox" name="noTools" /> Tanpa alat sama sekali
            </label>
            <div>
              <label htmlFor="materials" className="text-sm font-extrabold block mb-2">
                Alat yang tersedia
              </label>
              <input id="materials" name="materials" placeholder="mis. kertas, krayon, bola kecil" className={inputClass} />
            </div>
            <div>
              <label htmlFor="goal" className="text-sm font-extrabold block mb-2">
                Tujuan khusus
              </label>
              <input id="goal" name="goal" placeholder="mis. melatih kerja sama" className={inputClass} />
            </div>
            <div>
              <label htmlFor="notes" className="text-sm font-extrabold block mb-2">
                Catatan kelas
              </label>
              <textarea id="notes" name="notes" rows={2} placeholder="mis. ada anak yang sangat pemalu" className={inputClass} />
            </div>
          </div>
        ) : null}

        <button type="submit" disabled={pending} className={`${buttonStyles.primary} w-full text-lg`}>
          {pending ? "Menyiapkan kegiatan..." : "🪄 Buatkan Aktivitas"}
        </button>
      </form>

      {state.error ? (
        <Card className="p-5 mt-5 text-center">
          <p className="font-bold text-danger">{state.error}</p>
          <Link href="/app/activities" className="text-sm font-bold text-primary-strong mt-2 inline-block">
            Lihat ide dari library →
          </Link>
        </Card>
      ) : null}

      {result ? (
        <div className="mt-6">
          <Card className="p-5">
            <div className="flex flex-wrap gap-1.5 mb-2">
              <Chip tone="primary">{result.age_range}</Chip>
              <Chip>{result.duration_minutes} menit</Chip>
              <Chip>{result.group_size}</Chip>
              {result.materials.length === 0 ? <Chip tone="success">Tanpa alat</Chip> : null}
            </div>
            <h2 className="text-xl font-black">{result.title}</h2>
            <p className="text-sm text-ink-muted mt-1.5">{result.summary}</p>

            <div className="mt-4 space-y-2.5">
              <StepMode
                steps={[...result.opening, ...result.main_activities, ...result.closing]}
                title={result.title}
              />
              <button
                type="button"
                disabled={saving || Boolean(savedSlug)}
                onClick={() =>
                  startSaving(async () => {
                    const res = await saveGeneratedActivityAction(result);
                    if (res.slug) setSavedSlug(res.slug);
                  })
                }
                className={`${savedSlug ? buttonStyles.secondary : buttonStyles.outline} w-full`}
              >
                {savedSlug ? "★ Tersimpan di koleksi" : saving ? "Menyimpan..." : "☆ Simpan ke Koleksi"}
              </button>
            </div>
          </Card>

          <Card className="p-5 mt-4">
            <ListBlock title="🎯 Tujuan" items={result.objectives} />
            <ListBlock title="🧺 Alat & bahan" items={result.materials.length ? result.materials : ["Tanpa alat!"]} />
            <ListBlock title="🛠 Persiapan" items={result.preparation} />
            <ListBlock title="👋 Pembukaan" items={result.opening} />
            <ListBlock title="⭐ Kegiatan inti" items={result.main_activities} />
            <ListBlock title="🌙 Penutup" items={result.closing} />
          </Card>

          {result.teacher_script.length ? (
            <Card className="p-5 mt-4 bg-primary-soft border-primary/30">
              <h4 className="text-sm font-extrabold mb-2">🗣 Kalimat guru</h4>
              <ul className="space-y-2">
                {result.teacher_script.map((s, i) => (
                  <li key={i} className="text-sm italic leading-relaxed">
                    “{s}”
                  </li>
                ))}
              </ul>
            </Card>
          ) : null}

          <Card className="p-5 mt-4">
            <ListBlock title="👀 Yang diamati" items={result.observation_points} />
            <ListBlock title="🔄 Adaptasi" items={result.adaptations} />
            <ListBlock title="⚠️ Keamanan" items={result.safety_notes} tone="danger" />
            {result.no_tool_alternative.length ? <ListBlock title="🙌 Alternatif tanpa alat" items={result.no_tool_alternative} /> : null}
            <ListBlock title="🪞 Refleksi guru" items={result.reflection_questions} />
          </Card>
        </div>
      ) : null}
    </main>
  );
}
