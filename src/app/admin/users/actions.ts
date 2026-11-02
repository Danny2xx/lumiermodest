"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth/server";
import { requireAdmin } from "@/lib/auth/admin";

export type RoleResult = { success: true } | { error: string };

export async function setUserRole(
  userId: string,
  role: "admin" | "user"
): Promise<RoleResult> {
  // Server Actions are reachable by direct POST, so re-check on every call
  // rather than relying on the /admin layout's gate.
  const session = await requireAdmin();

  if (role !== "admin" && role !== "user") {
    return { error: "Unknown role." };
  }

  // Losing your own access here would mean nobody could hand it back.
  if (userId === session.user.id && role === "user") {
    return {
      error:
        "You can't remove your own admin access — ask another admin to do it.",
    };
  }

  const { error } = await auth.admin.setRole({ userId, role });
  if (error) {
    return { error: error.message || "Couldn't update that account." };
  }

  revalidatePath("/admin/users");
  return { success: true };
}
