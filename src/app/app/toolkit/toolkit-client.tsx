"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { buttonStyles, Card } from "@/components/ui";

type Tool = "timer" | "picker" | "group" | "wheel";

export function ToolkitClient() {
  const [tool, setTool] = useState<Tool>("timer");
  const tabs: { id: Tool; label: string; icon: string }[] = [
    { id: "timer", label: "Timer", icon: "⏱" },
    { id: "picker", label: "Pilih Acak", icon: "🎯" },
    { id: "group", label: "Kelompok", icon: "👥" },
    { id: "wheel", label: "Roda", icon: "🎡" },
  ];

  return (
    <main>
      <h1 className="text-2xl font-black mt-2 mb-1">Classroom Toolkit 🧰</h1>
      <p className="text-ink-muted text-sm mb-4">Alat bantu kelas — tetap bisa dipakai saat offline.</p>
      <div className="grid grid-cols-4 gap-2 mb-5" role="tablist" aria-label="Pilih alat">
        {tabs.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={tool === t.id}
            onClick={() => setTool(t.id)}
            className={`flex flex-col items-center gap-1 rounded-2xl border-2 p-2.5 text-xs font-bold transition-colors ${
              tool === t.id ? "border-primary bg-primary-soft text-primary-strong" : "border-line bg-surface text-ink-muted"
            }`}
          >
            <span className="text-xl" aria-hidden>
              {t.icon}
            </span>
            {t.label}
          </button>
        ))}
      </div>
      {tool === "timer" ? <Timer /> : null}
      {tool === "picker" ? <RandomPicker /> : null}
      {tool === "group" ? <GroupMaker /> : null}
      {tool === "wheel" ? <Wheel /> : null}
    </main>
  );
}

function Timer() {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (running && seconds > 0) {
      intervalRef.current = setInterval(() => {
        setSeconds((s) => {
          if (s <= 1) {
            setRunning(false);
            return 0;
          }
          return s - 1;
        });
      }, 1000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running, seconds > 0]); // eslint-disable-line react-hooks/exhaustive-deps

  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");
  const finished = seconds === 0 && !running;

  return (
    <Card className="p-6 text-center">
      <p
        className={`text-7xl font-black tabular-nums ${seconds > 0 && seconds <= 10 ? "text-danger" : "text-ink"}`}
        role="timer"
        aria-live="polite"
      >
        {mm}:{ss}
      </p>
      <div className="flex flex-wrap justify-center gap-2 mt-5">
        {[1, 3, 5, 10].map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => {
              setSeconds(m * 60);
              setRunning(true);
            }}
            className={buttonStyles.outline}
          >
            {m} menit
          </button>
        ))}
      </div>
      <div className="flex justify-center gap-2 mt-3">
        <button
          type="button"
          onClick={() => setRunning(!running)}
          disabled={seconds === 0}
          className={buttonStyles.primary}
        >
          {running ? "⏸ Jeda" : "▶ Lanjut"}
        </button>
        <button
          type="button"
          onClick={() => {
            setRunning(false);
            setSeconds(0);
          }}
          className={buttonStyles.outline}
        >
          ↺ Reset
        </button>
      </div>
      {finished ? <p className="mt-4 font-black text-primary-strong text-xl">⏰ Waktu habis!</p> : null}
    </Card>
  );
}

function useNames() {
  const [namesText, setNamesText] = useState("");
  const names = useMemo(
    () =>
      namesText
        .split(/[\n,]/)
        .map((n) => n.trim())
        .filter(Boolean),
    [namesText],
  );
  return { namesText, setNamesText, names };
}

const namesInputClass =
  "w-full rounded-2xl border-2 border-line bg-surface px-4 py-3 text-base focus:border-primary focus:outline-none";

function RandomPicker() {
  const { namesText, setNamesText, names } = useNames();
  const [picked, setPicked] = useState<string>("");
  const [used, setUsed] = useState<string[]>([]);

  const remaining = names.filter((n) => !used.includes(n));

  return (
    <Card className="p-5">
      <label htmlFor="names" className="text-sm font-extrabold block mb-2">
        Nama anak (pisahkan dengan koma atau baris baru)
      </label>
      <textarea id="names" rows={3} value={namesText} onChange={(e) => setNamesText(e.target.value)} placeholder="Alya, Bima, Citra, Dodo..." className={namesInputClass} />
      {picked ? (
        <p className="text-center text-4xl font-black text-primary-strong my-5" aria-live="polite">
          🎉 {picked}
        </p>
      ) : null}
      <div className="flex gap-2 mt-3">
        <button
          type="button"
          disabled={remaining.length === 0}
          onClick={() => {
            const choice = remaining[Math.floor(Math.random() * remaining.length)];
            setPicked(choice);
            setUsed((u) => [...u, choice]);
          }}
          className={`${buttonStyles.primary} flex-1`}
        >
          🎯 Pilih ({remaining.length})
        </button>
        <button
          type="button"
          onClick={() => {
            setUsed([]);
            setPicked("");
          }}
          className={buttonStyles.outline}
        >
          ↺ Reset
        </button>
      </div>
      {used.length > 0 ? (
        <p className="text-xs text-ink-muted mt-3">Sudah terpilih: {used.join(", ")}</p>
      ) : null}
    </Card>
  );
}

function GroupMaker() {
  const { namesText, setNamesText, names } = useNames();
  const [groupCount, setGroupCount] = useState(2);
  const [groups, setGroups] = useState<string[][]>([]);

  return (
    <Card className="p-5">
      <label htmlFor="group-names" className="text-sm font-extrabold block mb-2">
        Nama anak
      </label>
      <textarea id="group-names" rows={3} value={namesText} onChange={(e) => setNamesText(e.target.value)} placeholder="Alya, Bima, Citra, Dodo..." className={namesInputClass} />
      <label htmlFor="group-count" className="text-sm font-extrabold block mt-3 mb-2">
        Jumlah kelompok
      </label>
      <input
        id="group-count"
        type="number"
        min={2}
        max={10}
        value={groupCount}
        onChange={(e) => setGroupCount(Number(e.target.value))}
        className={namesInputClass}
      />
      <button
        type="button"
        disabled={names.length < groupCount}
        onClick={() => {
          const shuffled = [...names].sort(() => Math.random() - 0.5);
          const result: string[][] = Array.from({ length: groupCount }, () => []);
          shuffled.forEach((name, i) => result[i % groupCount].push(name));
          setGroups(result);
        }}
        className={`${buttonStyles.primary} w-full mt-4`}
      >
        👥 Bagi Kelompok
      </button>
      {groups.length > 0 ? (
        <div className="grid grid-cols-2 gap-3 mt-4">
          {groups.map((g, i) => (
            <div key={i} className="rounded-2xl bg-primary-soft p-3">
              <p className="font-extrabold text-sm text-primary-strong mb-1">Kelompok {i + 1}</p>
              <p className="text-sm">{g.join(", ")}</p>
            </div>
          ))}
        </div>
      ) : null}
    </Card>
  );
}

function Wheel() {
  const { namesText, setNamesText, names } = useNames();
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState("");
  const [display, setDisplay] = useState("");

  const spin = () => {
    if (names.length < 2 || spinning) return;
    setSpinning(true);
    setResult("");
    let ticks = 0;
    const maxTicks = 20 + Math.floor(Math.random() * 10);
    const interval = setInterval(() => {
      ticks += 1;
      setDisplay(names[ticks % names.length]);
      if (ticks >= maxTicks) {
        clearInterval(interval);
        const final = names[maxTicks % names.length];
        setResult(final);
        setDisplay(final);
        setSpinning(false);
      }
    }, 90);
  };

  return (
    <Card className="p-5">
      <label htmlFor="wheel-items" className="text-sm font-extrabold block mb-2">
        Isi roda (nama, games, topik, aktivitas...)
      </label>
      <textarea id="wheel-items" rows={3} value={namesText} onChange={(e) => setNamesText(e.target.value)} placeholder="Tepuk angka, Bernyanyi, Menari, Cerita..." className={namesInputClass} />
      <div className="text-center my-6" aria-live="polite">
        <p className={`text-3xl font-black ${result ? "text-primary-strong" : "text-ink-muted"}`}>
          {result ? `🎉 ${result}` : display || "🎡"}
        </p>
      </div>
      <button type="button" disabled={names.length < 2 || spinning} onClick={spin} className={`${buttonStyles.primary} w-full`}>
        {spinning ? "Berputar..." : "🎡 Putar Roda!"}
      </button>
    </Card>
  );
}
