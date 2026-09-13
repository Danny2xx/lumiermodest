"use server";

import { auth } from "@/lib/auth/server";
import { redirect } from "next/navigation";

type FormState = { error: string } | null;

export async function signUpWithEmail(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const name = (formData.get("name") as string)?.trim();
  const email = (formData.get("email") as string)?.trim();
  const password = formData.get("password") as string;

  if (!name || !email || !password) {
    return { error: "Please fill in every field." };
  }
  if (password.length < 8) {
    return { error: "Password must be at least 8 characters." };
  }

  const { error } = await auth.signUp.email({ name, email, password });

  if (error?.code === "NETWORK_DNS") {
    return { error: "Check NEON_AUTH_BASE_URL in .env.local" };
  }
  if (error) {
    return { error: error.message || "Failed to create account." };
  }

  redirect("/account");
}
