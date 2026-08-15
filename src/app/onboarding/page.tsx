import type { Metadata } from "next";
import { requireUser } from "@/lib/auth";
import { completeOnboardingAction } from "./actions";
import { buttonStyles, Card } from "@/components/ui";

export const metadata: Metadata = { title: "Selamat Datang" };

const AGE_OPTIONS = [
  { value: "24-36", label: "2–3 tahun" },
  { value: "36-48", label: "3–4 tahun" },
  { value: "48-60", label: "4–5 tahun" },
  { value: "60-72", label: "5–6 tahun" },
];

const TEACHER_GOALS = ["Cari ide mengajar", "Games", "Cerita", "Membuat lesson plan", "Observasi", "Tips situasi kelas"];
const STUDENT_GOALS = ["Microteaching", "Belajar metode", "Simulasi kelas", "Tugas kuliah", "Portofolio"];

const chipLabel =
  "cursor-pointer rounded-full border-2 border-line bg-surface px-4 py-2.5 text-sm font-bold has-checked:border-primary has-checked:bg-primary-soft has-checked:text-primary-strong transition-colors inline-flex";

export default async function OnboardingPage() {
  const user = await requireUser();
  const isTeacher = user.role !== "STUDENT";
  const goals = isTeacher ? TEACHER_GOALS : STUDENT_GOALS;

  return (
    <main className="flex-1 px-6 py-10">
      <div className="mx-auto max-w-md">
        <h1 className="text-2xl font-black">Halo, {user.name.split(" ")[0]}! 👋</h1>
        <p className="text-ink-muted mt-1 mb-8">
          {isTeacher
            ? "Ceritakan sedikit tentang kelasmu agar ide yang kami siapkan pas untukmu."
            : "Ceritakan sedikit tentang kuliahmu agar latihannya pas untukmu."}
        </p>

        <form action={completeOnboardingAction} className="space-y-6">
          <Card className="p-5">
            <fieldset>
              <legend className="font-extrabold mb-3">
                {isTeacher ? "Kelompok usia yang kamu ajar" : "Kelompok usia yang paling ingin kamu dalami"}
              </legend>
              <div className="flex flex-wrap gap-2">
                {AGE_OPTIONS.map((opt) => (
                  <label key={opt.value} className={chipLabel}>
                    <input type="radio" name="agePreference" value={opt.value} className="sr-only" />
                    {opt.label}
                  </label>
                ))}
              </div>
            </fieldset>
          </Card>

          {isTeacher ? (
            <Card className="p-5 space-y-4">
              <fieldset>
                <legend className="font-extrabold mb-3">Jenis satuan</legend>
                <div className="flex flex-wrap gap-2">
                  {["TK", "PAUD", "KB", "TPA", "Lainnya"].map((t) => (
                    <label key={t} className={chipLabel}>
                      <input type="radio" name="institutionType" value={t} className="sr-only" />
                      {t}
                    </label>
                  ))}
                </div>
              </fieldset>
              <div>
                <label htmlFor="classSize" className="font-extrabold block mb-2">
                  Rata-rata jumlah anak di kelas
                </label>
                <input
                  id="classSize"
                  name="classSize"
                  type="number"
                  min={1}
                  max={60}
                  placeholder="mis. 15"
                  className="w-full rounded-2xl border-2 border-line px-4 py-3 focus:border-primary focus:outline-none"
                />
              </div>
            </Card>
          ) : (
            <Card className="p-5">
              <label htmlFor="semester" className="font-extrabold block mb-2">
                Semester berapa sekarang?
              </label>
              <input
                id="semester"
                name="semester"
                type="number"
                min={1}
                max={14}
                placeholder="mis. 5"
                className="w-full rounded-2xl border-2 border-line px-4 py-3 focus:border-primary focus:outline-none"
              />
            </Card>
          )}

          <Card className="p-5">
            <fieldset>
              <legend className="font-extrabold mb-3">Apa yang paling kamu butuhkan? (boleh lebih dari satu)</legend>
              <div className="flex flex-wrap gap-2">
                {goals.map((goal) => (
                  <label key={goal} className={chipLabel}>
                    <input type="checkbox" name="goals" value={goal} className="sr-only" />
                    {goal}
                  </label>
                ))}
              </div>
            </fieldset>
          </Card>

          <button type="submit" className={`${buttonStyles.primary} w-full`}>
            {isTeacher ? "Lanjut — Buat Kegiatan Pertamamu ✨" : "Lanjut — Coba Simulasi Mengajar 🎭"}
          </button>
        </form>
      </div>
    </main>
  );
}
