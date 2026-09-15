"use server";

import { auth } from "@/lib/auth/server";
import { headers } from "next/headers";

type FormState = { sent: true } | { error: string } | null;

export async function requestPasswordReset(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const email = (formData.get("email") as string)?.trim();

  if (!email) {
    return { error: "Please enter your email." };
  }

  const headerList = await headers();
  const host = headerList.get("host") ?? "";
  const protocol = headerList.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const origin = process.env.NEXT_PUBLIC_SITE_URL ?? `${protocol}://${host}`;

  const { error } = await auth.requestPasswordReset({
    email,
    redirectTo: `${origin}/auth/reset-password`,
  });

  // Don't reveal whether the email exists — always show the same success state.
  if (error && error.code === "NETWORK_DNS") {
    return { error: "Check NEON_AUTH_BASE_URL in .env.local" };
  }

  return { sent: true };
}
