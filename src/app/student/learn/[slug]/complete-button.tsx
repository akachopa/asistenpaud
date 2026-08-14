"use client";

import { useState, useTransition } from "react";
import { completeModuleAction } from "../../actions";
import { buttonStyles } from "@/components/ui";

export function CompleteModuleButton({ moduleId, initialDone }: { moduleId: string; initialDone: boolean }) {
  const [done, setDone] = useState(initialDone);
  const [pending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={pending || done}
      onClick={() =>
        startTransition(async () => {
          await completeModuleAction(moduleId);
          setDone(true);
        })
      }
      className={`${done ? buttonStyles.secondary : buttonStyles.primary} w-full`}
    >
      {done ? "✓ Modul selesai" : pending ? "Menyimpan..." : "Tandai Selesai (+15 XP)"}
    </button>
  );
}
