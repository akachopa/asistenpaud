import { db } from "@/lib/db";
import { Chip } from "@/components/ui";
import { setUserStatusAction } from "../actions";
import { relativeTime } from "@/lib/utils";

export const metadata = { title: "Pengguna" };

export default async function AdminUsersPage() {
  const users = await db.user.findMany({ orderBy: { createdAt: "desc" }, take: 200 });

  return (
    <div>
      <h1 className="text-2xl font-black mb-6">Pengguna</h1>
      <div className="overflow-x-auto bg-surface border border-line rounded-(--radius-card)">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-line text-left">
              <th className="p-3.5 font-extrabold">Nama</th>
              <th className="p-3.5 font-extrabold">Email</th>
              <th className="p-3.5 font-extrabold">Peran</th>
              <th className="p-3.5 font-extrabold">Status</th>
              <th className="p-3.5 font-extrabold">Terdaftar</th>
              <th className="p-3.5 font-extrabold">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-b border-line last:border-0">
                <td className="p-3.5 font-bold">{u.name}</td>
                <td className="p-3.5 text-ink-muted">{u.email}</td>
                <td className="p-3.5">
                  <Chip tone={u.role === "ADMIN" ? "accent" : u.role === "STUDENT" ? "secondary" : "primary"}>{u.role}</Chip>
                </td>
                <td className="p-3.5">
                  <Chip tone={u.status === "ACTIVE" ? "success" : "danger"}>{u.status}</Chip>
                </td>
                <td className="p-3.5 text-ink-muted">{relativeTime(u.createdAt)}</td>
                <td className="p-3.5">
                  {u.role !== "ADMIN" ? (
                    <form
                      action={setUserStatusAction.bind(null, u.id, u.status === "ACTIVE" ? "SUSPENDED" : "ACTIVE")}
                    >
                      <button type="submit" className="text-xs font-bold text-primary-strong hover:underline">
                        {u.status === "ACTIVE" ? "Nonaktifkan" : "Aktifkan"}
                      </button>
                    </form>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
