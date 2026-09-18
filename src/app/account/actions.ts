"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth/server";

export type AccountFormState = { ok: string } | { error: string } | null;

export async function signOut() {
  await auth.signOut();
  redirect("/auth/sign-in");
}

export async function updateDisplayName(
  _prevState: AccountFormState,
  formData: FormData
): Promise<AccountFormState> {
  // Server Actions are reachable by direct POST, so never trust the caller.
  // These only ever act on the session's own account.
  const { data: session } = await auth.getSession();
  if (!session?.user) {
    return { error: "You've been signed out. Please sign in again." };
  }

  const name = (formData.get("name") as string)?.trim();
  if (!name) {
    return { error: "Please tell us what to call you." };
  }
  if (name.length > 80) {
    return { error: "That name is a little too long." };
  }
  if (name === session.user.name) {
    return { ok: "That's already your name." };
  }

  const { error } = await auth.updateUser({ name });
  if (error) {
    return { error: error.message || "We couldn't save that just now." };
  }

  revalidatePath("/account");
  return { ok: "Saved." };
}

export async function changeAccountPassword(
  _prevState: AccountFormState,
  formData: FormData
): Promise<AccountFormState> {
  const { data: session } = await auth.getSession();
  if (!session?.user) {
    return { error: "You've been signed out. Please sign in again." };
  }

  const currentPassword = formData.get("currentPassword") as string;
  const newPassword = formData.get("newPassword") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!currentPassword || !newPassword) {
    return { error: "Please fill in both password fields." };
  }
  if (newPassword.length < 8) {
    return { error: "Your new password needs at least 8 characters." };
  }
  if (newPassword !== confirmPassword) {
    return { error: "Those two new passwords don't match." };
  }
  if (newPassword === currentPassword) {
    return { error: "Your new password is the same as your old one." };
  }

  const { error } = await auth.changePassword({
    currentPassword,
    newPassword,
    // A password change usually means "someone else may have had access",
    // so sign out anywhere else that's still logged in.
    revokeOtherSessions: true,
  });

  if (error) {
    // Better Auth reports a wrong current password as an auth failure; say so
    // plainly rather than passing through its wording.
    if (error.status === 400 || error.status === 401) {
      return { error: "That current password doesn't match." };
    }
    return { error: error.message || "We couldn't change it just now." };
  }

  return { ok: "Password changed. You're still signed in here." };
}
