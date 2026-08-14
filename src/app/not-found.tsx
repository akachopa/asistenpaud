import { EmptyState, LinkButton } from "@/components/ui";

export default function NotFound() {
  return (
    <main className="flex-1 flex items-center justify-center">
      <EmptyState
        emoji="🧩"
        title="Halaman tidak ditemukan"
        description="Sepertinya halaman ini sedang bermain petak umpet. Yuk kembali ke beranda."
        action={<LinkButton href="/">Ke Beranda</LinkButton>}
      />
    </main>
  );
}
