import { db } from "@/lib/db";
import { formatDate } from "@/lib/utils";
import { PageHeader } from "@/components/page-header";
import { UsersTable } from "./users-table";

export const metadata = { title: "Pengguna" };

export default async function AdminUsersPage() {
  const users = await db.user.findMany({ orderBy: { createdAt: "desc" }, take: 500 });

  return (
    <div className="w-full">
      <PageHeader title="Pengguna" description={`${users.length} akun terdaftar. Cari, urutkan, dan kelola status.`} />
      <UsersTable
        rows={users.map((u) => ({
          id: u.id,
          name: u.name,
          email: u.email,
          role: u.role,
          status: u.status,
          createdAt: formatDate(u.createdAt),
        }))}
      />
    </div>
  );
}
