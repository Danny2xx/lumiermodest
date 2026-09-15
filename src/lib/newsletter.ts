"use server";

import { prisma } from "@/lib/db";

type FormState = { success: true } | { error: string } | null;

export async function subscribeToNewsletter(
  source: "modal" | "footer",
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const email = (formData.get("email") as string)?.trim().toLowerCase();

  if (!email) {
    return { error: "Please enter your email." };
  }

  try {
    await prisma.subscriber.upsert({
      where: { email },
      update: {},
      create: { email, source },
    });
  } catch {
    return { error: "Something went wrong. Please try again." };
  }

  return { success: true };
}
