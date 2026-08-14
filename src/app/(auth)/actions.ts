"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { db } from "@/lib/db";
import {
  createSession,
  destroySession,
  hashPassword,
  homePathFor,
  verifyPassword,
  type Role,
} from "@/lib/auth";

const registerSchema = z.object({
  name: z.string().min(2, "Nama minimal 2 karakter").max(80),
  email: z.string().email("Email tidak valid").toLowerCase(),
  password: z.string().min(8, "Kata sandi minimal 8 karakter").max(100),
  role: z.enum(["TEACHER", "STUDENT"]),
});

export interface AuthFormState {
  error?: string;
}

export async function registerAction(_prev: AuthFormState, formData: FormData): Promise<AuthFormState> {
  const parsed = registerSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    role: formData.get("role"),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Data tidak valid" };
  }
  const { name, email, password, role } = parsed.data;

  const existing = await db.user.findUnique({ where: { email } });
  if (existing) return { error: "Email sudah terdaftar. Silakan masuk." };

  const user = await db.user.create({
    data: {
      name,
      email,
      passwordHash: await hashPassword(password),
      role,
      profile: { create: { userType: role } },
    },
  });
  await createSession(user.id);
  redirect("/onboarding");
}

const loginSchema = z.object({
  email: z.string().email("Email tidak valid").toLowerCase(),
  password: z.string().min(1, "Isi kata sandi"),
});

export async function loginAction(_prev: AuthFormState, formData: FormData): Promise<AuthFormState> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Data tidak valid" };
  }

  const user = await db.user.findUnique({
    where: { email: parsed.data.email },
    include: { profile: true },
  });
  if (!user || !(await verifyPassword(parsed.data.password, user.passwordHash))) {
    return { error: "Email atau kata sandi salah." };
  }
  if (user.status !== "ACTIVE") {
    return { error: "Akun ini sedang dinonaktifkan. Hubungi admin." };
  }

  await createSession(user.id);
  if (!user.profile?.onboardingCompleted && user.role !== "ADMIN") {
    redirect("/onboarding");
  }
  redirect(homePathFor(user.role as Role));
}

export async function logoutAction(): Promise<void> {
  await destroySession();
  redirect("/login");
}
