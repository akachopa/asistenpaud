"use client";

import { useState, useTransition } from "react";
import { toggleSaveAction, markUsedAction } from "@/app/app/actions";
import { buttonStyles } from "@/components/ui";

export function SaveButton({ contentId, initialSaved }: { contentId: string; initialSaved: boolean }) {
  const [saved, setSaved] = useState(initialSaved);
  const [pending, startTransition] = useTransition();
  return (
    <button
      type="button"
      disabled={pending}
      onClick={() =>
        startTransition(async () => {
          const res = await toggleSaveAction(contentId);
          setSaved(res.saved);
        })
      }
      className={saved ? buttonStyles.secondary : buttonStyles.outline}
      aria-pressed={saved}
    >
      {saved ? "★ Tersimpan" : "☆ Simpan"}
    </button>
  );
}

export function MarkUsedButton({ contentId, title }: { contentId: string; title: string }) {
  const [done, setDone] = useState(false);
  const [pending, startTransition] = useTransition();
  return (
    <button
      type="button"
      disabled={pending || done}
      onClick={() =>
        startTransition(async () => {
          await markUsedAction(contentId, title);
          setDone(true);
        })
      }
      className={done ? buttonStyles.secondary : buttonStyles.outline}
    >
      {done ? "✓ Tercatat digunakan" : "Saya Gunakan"}
    </button>
  );
}
