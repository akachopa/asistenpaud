import type { Metadata } from "next";
import Link from "next/link";
import { LoginForm } from "./login-form";

export const metadata: Metadata = { title: "Masuk" };

export default function LoginPage() {
  return (
    <main className="flex-1 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-sm">
        <Link href="/" className="flex items-center justify-center gap-2 font-black text-2xl text-primary-strong mb-8">
          <span aria-hidden>🧸</span> TemanPAUD
        </Link>
        <h1 className="text-2xl font-black text-center mb-1">Selamat datang kembali!</h1>
        <p className="text-sm text-ink-muted text-center mb-8">Anak-anak sudah menunggu ide serumu.</p>
        <LoginForm />
        <p className="text-sm text-center text-ink-muted mt-6">
          Belum punya akun?{" "}
          <Link href="/register" className="font-bold text-primary-strong">
            Daftar gratis
          </Link>
        </p>
      </div>
    </main>
  );
}
