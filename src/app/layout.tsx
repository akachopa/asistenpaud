import type { Metadata, Viewport } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { SWRegister } from "@/components/sw-register";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: {
    default: "TemanPAUD — Teman Mengajar Guru PAUD",
    template: "%s | TemanPAUD",
  },
  description:
    "Asisten mengajar untuk guru PAUD dan mahasiswa PGPAUD/PIAUD: ide kegiatan, games, cerita, tips, simulasi mengajar, dan bantuan AI yang aman untuk anak.",
  manifest: "/manifest.webmanifest",
  appleWebApp: { capable: true, title: "TemanPAUD", statusBarStyle: "default" },
};

export const viewport: Viewport = {
  themeColor: "#0e9488",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="id" className={`${nunito.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        {children}
        <SWRegister />
      </body>
    </html>
  );
}
