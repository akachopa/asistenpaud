"use client";

import { useActionState } from "react";
import { loginAction, type AuthFormState } from "../actions";
import { buttonStyles } from "@/components/ui";

const inputClass =
  "w-full rounded-2xl border-2 border-line bg-surface px-4 py-3 text-base focus:border-primary focus:outline-none";

export function LoginForm() {
  const [state, formAction, pending] = useActionState<AuthFormState, FormData>(loginAction, {});
  return (
    <form action={formAction} className="space-y-4">
      {state.error ? (
        <p role="alert" className="rounded-2xl bg-danger-soft text-danger text-sm font-bold px-4 py-3">
          {state.error}
        </p>
      ) : null}
      <div>
        <label htmlFor="email" className="block text-sm font-bold mb-1.5">
          Email
        </label>
        <input id="email" name="email" type="email" autoComplete="email" required className={inputClass} />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-bold mb-1.5">
          Kata sandi
        </label>
        <input id="password" name="password" type="password" autoComplete="current-password" required className={inputClass} />
      </div>
      <button type="submit" disabled={pending} className={`${buttonStyles.primary} w-full`}>
        {pending ? "Memeriksa..." : "Masuk"}
      </button>
    </form>
  );
}
