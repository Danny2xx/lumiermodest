import "server-only";
import { auth } from "./server";

export type ManagedUser = {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  createdAt: Date | null;
};

export type ListUsersResult =
  | { users: ManagedUser[]; total: number }
  | { error: string };

/** Better Auth returns these over HTTP, so nothing here is guaranteed. */
type RawUser = {
  id?: unknown;
  name?: unknown;
  email?: unknown;
  role?: unknown;
  createdAt?: unknown;
};

function toManagedUser(raw: RawUser): ManagedUser | null {
  if (typeof raw?.id !== "string" || typeof raw?.email !== "string") {
    return null;
  }
  const createdAt = raw.createdAt ? new Date(raw.createdAt as string) : null;

  return {
    id: raw.id,
    name: typeof raw.name === "string" && raw.name ? raw.name : raw.email,
    email: raw.email,
    // The admin plugin stores role as a comma-separated string.
    isAdmin:
      typeof raw.role === "string" &&
      raw.role.split(",").some((r) => r.trim() === "admin"),
    createdAt:
      createdAt && !Number.isNaN(createdAt.getTime()) ? createdAt : null,
  };
}

export async function listRegisteredUsers(limit = 200): Promise<ListUsersResult> {
  const { data, error } = await auth.admin.listUsers({
    query: { limit, sortBy: "createdAt", sortDirection: "desc" },
  });

  if (error) {
    return { error: error.message || "Couldn't load the list of accounts." };
  }

  const payload = data as { users?: RawUser[]; total?: number } | null;
  const users = (payload?.users ?? [])
    .map(toManagedUser)
    .filter((u): u is ManagedUser => u !== null);

  return { users, total: payload?.total ?? users.length };
}
