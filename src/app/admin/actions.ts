"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { requireRole } from "@/lib/auth";

async function audit(actorId: string, action: string, target: string, detail?: string) {
  await db.auditLog.create({ data: { actorId, action, target, detail } });
}

export async function setUserStatusAction(userId: string, status: "ACTIVE" | "SUSPENDED"): Promise<void> {
  const admin = await requireRole("ADMIN");
  if (userId === admin.id) return;
  await db.user.update({ where: { id: userId }, data: { status } });
  await audit(admin.id, "user.status", userId, status);
  revalidatePath("/admin/users");
}

export async function setContentStatusAction(contentId: string, status: string): Promise<void> {
  const admin = await requireRole("ADMIN");
  const allowed = ["DRAFT", "PENDING_REVIEW", "APPROVED", "REJECTED", "ARCHIVED"];
  if (!allowed.includes(status)) return;
  await db.contentItem.update({
    where: { id: contentId },
    data: { status, publishedAt: status === "APPROVED" ? new Date() : undefined },
  });
  await audit(admin.id, "content.status", contentId, status);
  revalidatePath("/admin/content");
}
