"use client";

import { useState } from "react";
import { buttonStyles } from "@/components/ui";

// Mode "Mulai": satu langkah per layar, lebih berguna daripada teks panjang.
export function StepMode({ steps, title }: { steps: string[]; title: string }) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  if (steps.length === 0) return null;

  if (!open) {
    return (
      <button type="button" onClick={() => setOpen(true)} className={`${buttonStyles.primary} w-full`}>
        ▶ Mulai Kegiatan
      </button>
    );
  }

  const isLast = index === steps.length - 1;

  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col" role="dialog" aria-modal="true" aria-label={`Mode langkah: ${title}`}>
      <div className="flex items-center justify-between px-5 pt-5">
        <p className="text-sm font-black text-primary-strong uppercase tracking-wide">
          Langkah {index + 1} dari {steps.length}
        </p>
        <button
          type="button"
          onClick={() => {
            setOpen(false);
            setIndex(0);
          }}
          className="min-h-12 min-w-12 text-2xl text-ink-muted"
          aria-label="Tutup mode langkah"
        >
          ✕
        </button>
      </div>
      <div className="flex-1 flex items-center justify-center px-6">
        <p className="text-2xl font-bold leading-relaxed text-center max-w-md">{steps[index]}</p>
      </div>
      <div className="p-5 pb-8 flex gap-3 max-w-md w-full mx-auto">
        <button
          type="button"
          onClick={() => setIndex((i) => Math.max(0, i - 1))}
          disabled={index === 0}
          className={`${buttonStyles.outline} flex-1`}
        >
          ‹ Sebelumnya
        </button>
        {isLast ? (
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              setIndex(0);
            }}
            className={`${buttonStyles.primary} flex-1`}
          >
            Selesai 🎉
          </button>
        ) : (
          <button type="button" onClick={() => setIndex((i) => i + 1)} className={`${buttonStyles.primary} flex-1`}>
            Berikutnya ›
          </button>
        )}
      </div>
    </div>
  );
}
