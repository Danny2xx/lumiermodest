"use server";

import { auth } from "@/lib/auth/server";
import { redirect } from "next/navigation";

type FormState = { error: string } | null;

export async function resetPassword(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const token = formData.get("token") as string;
  const newPassword = formData.get("newPassword") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!token) {
    return { error: "This reset link is invalid or has expired." };
  }
  if (!newPassword || newPassword.length < 8) {
    return { error: "Password must be at least 8 characters." };
  }
  if (newPassword !== confirmPassword) {
    return { error: "Passwords don't match." };
  }

  const { error } = await auth.resetPassword({ newPassword, token });

  if (error) {
    return {
      error:
        error.message ||
        "This reset link is invalid or has expired. Request a new one.",
    };
  }

  redirect("/auth/sign-in");
}
