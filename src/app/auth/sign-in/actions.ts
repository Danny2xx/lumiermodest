"use server";

import { auth } from "@/lib/auth/server";
import { redirect } from "next/navigation";

type FormState = { error: string } | null;

export async function signInWithEmail(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const email = (formData.get("email") as string)?.trim();
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Please fill in every field." };
  }

  const { error } = await auth.signIn.email({ email, password });

  if (error?.code === "NETWORK_DNS") {
    return { error: "Check NEON_AUTH_BASE_URL in .env.local" };
  }
  if (error) {
    return { error: error.message || "Failed to sign in. Try again." };
  }

  redirect("/account");
}
