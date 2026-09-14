import "server-only";
import { redirect } from "next/navigation";
import { auth } from "./server";

export async function requireAdmin() {
  const { data: session } = await auth.getSession();

  if (!session?.user) {
    redirect("/auth/sign-in");
  }
  if (session.user.role !== "admin") {
    redirect("/account");
  }

  return session;
}
