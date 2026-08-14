import type { Metadata } from "next";
import Link from "next/link";
import { RegisterForm } from "./register-form";

export const metadata: Metadata = { title: "Daftar" };

export default function RegisterPage() {
  return (
    <main className="flex-1 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-sm">
        <Link href="/" className="flex items-center justify-center gap-2 font-black text-2xl text-primary-strong mb-8">
          <span aria-hidden>🧸</span> TemanPAUD
        </Link>
        <h1 className="text-2xl font-black text-center mb-1">Buat akun gratis</h1>
        <p className="text-sm text-ink-muted text-center mb-8">Satu menit saja, lalu langsung dapat ide pertama.</p>
        <RegisterForm />
        <p className="text-sm text-center text-ink-muted mt-6">
          Sudah punya akun?{" "}
          <Link href="/login" className="font-bold text-primary-strong">
            Masuk
          </Link>
        </p>
      </div>
    </main>
  );
}
