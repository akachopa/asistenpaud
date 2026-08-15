"use client";

import { useActionState, useState } from "react";
import { registerAction, type AuthFormState } from "../actions";
import { buttonStyles } from "@/components/ui";

const inputClass =
  "w-full rounded-2xl border-2 border-line bg-surface px-4 py-3 text-base focus:border-primary focus:outline-none";

const ROLES = [
  { value: "TEACHER", icon: "🍎", title: "Saya Guru PAUD/TK", desc: "Butuh ide kegiatan, games, dan cerita untuk kelas" },
  { value: "STUDENT", icon: "🎓", title: "Saya Mahasiswa PGPAUD/PIAUD", desc: "Mau latihan jadi guru: simulasi, microteaching, feedback" },
] as const;

export function RegisterForm() {
  const [state, formAction, pending] = useActionState<AuthFormState, FormData>(registerAction, {});
  const [role, setRole] = useState<string>("TEACHER");

  return (
    <form action={formAction} className="space-y-4">
      {state.error ? (
        <p role="alert" className="rounded-2xl bg-danger-soft text-danger text-sm font-bold px-4 py-3">
          {state.error}
        </p>
      ) : null}

      <fieldset>
        <legend className="block text-sm font-bold mb-2">Peran kamu</legend>
        <div className="space-y-2">
          {ROLES.map((r) => (
            <label
              key={r.value}
              className={`flex items-start gap-3 rounded-2xl border-2 p-3.5 cursor-pointer transition-colors ${
                role === r.value ? "border-primary bg-primary-soft" : "border-line bg-surface"
              }`}
            >
              <input
                type="radio"
                name="role"
                value={r.value}
                checked={role === r.value}
                onChange={() => setRole(r.value)}
                className="sr-only"
              />
              <span className="text-2xl" aria-hidden>
                {r.icon}
              </span>
              <span>
                <span className="block font-extrabold text-sm">{r.title}</span>
                <span className="block text-xs text-ink-muted mt-0.5">{r.desc}</span>
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor="name" className="block text-sm font-bold mb-1.5">
          Nama
        </label>
        <input id="name" name="name" type="text" autoComplete="name" required minLength={2} className={inputClass} />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-bold mb-1.5">
          Email
        </label>
        <input id="email" name="email" type="email" autoComplete="email" required className={inputClass} />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-bold mb-1.5">
          Kata sandi <span className="font-normal text-ink-muted">(min. 8 karakter)</span>
        </label>
        <input id="password" name="password" type="password" autoComplete="new-password" required minLength={8} className={inputClass} />
      </div>
      <button type="submit" disabled={pending} className={`${buttonStyles.primary} w-full`}>
        {pending ? "Membuat akun..." : "Daftar & Mulai"}
      </button>
    </form>
  );
}
