// Validator keamanan output AI: memblokir konten yang melanggar
// pedoman pedagogis PAUD (hukuman, label negatif, diagnosis, aktivitas berbahaya).

const BANNED_OUTPUT_PATTERNS: { pattern: RegExp; reason: string }[] = [
  { pattern: /hukum(an)?\s+(fisik|badan)|pukul|cubit|jewer|sabet/i, reason: "hukuman fisik" },
  { pattern: /permaluk|dipermalukan|mengolok/i, reason: "mempermalukan anak" },
  { pattern: /anak\s+(nakal|bodoh|malas|bandel)/i, reason: "label negatif pada anak" },
  { pattern: /\b(autis|adhd|hiperaktif\s+klinis|keterlambatan\s+perkembangan|gangguan\s+jiwa)\b/i, reason: "diagnosis kondisi" },
  { pattern: /pisau\s+tajam|silet|cutter\s+untuk\s+anak/i, reason: "benda tajam untuk anak" },
  { pattern: /korek\s+api|menyalakan\s+api|lilin\s+menyala\s+dipegang\s+anak/i, reason: "aktivitas dengan api" },
  { pattern: /bahan\s+kimia\s+keras|pemutih|deterjen\s+murni/i, reason: "bahan kimia berbahaya" },
  { pattern: /jalan\s+raya\s+tanpa\s+pengawasan/i, reason: "risiko jalan raya" },
  { pattern: /kunci\s+di\s+(kamar|ruangan)|isolasi\s+sendirian/i, reason: "isolasi tidak aman" },
];

const INJECTION_PATTERNS = [
  /ignore\s+(all\s+)?previous\s+instructions/i,
  /system\s+prompt/i,
  /abaikan\s+(semua\s+)?instruksi/i,
  /jailbreak/i,
];

export interface SafetyResult {
  ok: boolean;
  reasons: string[];
}

export function checkOutputSafety(output: unknown): SafetyResult {
  const text = JSON.stringify(output);
  const reasons: string[] = [];
  for (const { pattern, reason } of BANNED_OUTPUT_PATTERNS) {
    if (pattern.test(text)) reasons.push(reason);
  }
  return { ok: reasons.length === 0, reasons };
}

export function sanitizeInput(text: string): string {
  let clean = text;
  for (const pattern of INJECTION_PATTERNS) {
    clean = clean.replace(pattern, "");
  }
  return clean.trim().slice(0, 2000);
}
