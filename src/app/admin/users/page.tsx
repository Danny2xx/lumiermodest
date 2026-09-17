import { requireAdmin } from "@/lib/auth/admin";
import { listRegisteredUsers } from "@/lib/auth/users";
import RoleButton from "./RoleButton";

export const metadata = { title: "Team — Admin" };

const dateFormat = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

export default async function UsersPage() {
  const session = await requireAdmin();
  const result = await listRegisteredUsers();

  if ("error" in result) {
    return (
      <div>
        <h1 className="font-serif text-3xl text-taupe-dark">Team</h1>
        <p className="mt-8 border border-red-700/30 bg-red-50 p-6 font-sans text-sm text-red-700">
          {result.error}
        </p>
      </div>
    );
  }

  const { users, total } = result;
  const adminCount = users.filter((u) => u.isAdmin).length;

  return (
    <div>
      <h1 className="font-serif text-3xl text-taupe-dark">Team</h1>
      <p className="mt-2 font-sans text-sm text-espresso/60">
        Everyone who has registered on the site. Admins can manage products,
        categories, and this list.
      </p>

      <div className="mt-8 divide-y divide-taupe/15 border-y border-taupe/15">
        {users.length === 0 && (
          <p className="py-10 text-center font-sans text-sm text-espresso/60">
            Nobody has registered yet.
          </p>
        )}
        {users.map((user) => {
          const isYou = user.id === session.user.id;

          return (
            <div key={user.id} className="flex items-center gap-4 py-4">
              <div className="flex-1">
                <p className="font-serif text-lg text-espresso">
                  {user.name}
                  {isYou && (
                    <span className="ml-2 font-sans text-xs uppercase tracking-wide text-espresso/40">
                      you
                    </span>
                  )}
                </p>
                <p className="font-sans text-xs text-espresso/50">
                  {user.email}
                  {user.createdAt &&
                    ` · joined ${dateFormat.format(user.createdAt)}`}
                </p>
              </div>

              <span
                className={
                  user.isAdmin
                    ? "border border-gold px-3 py-1 font-sans text-xs uppercase tracking-[0.14em] text-gold"
                    : "font-sans text-xs uppercase tracking-[0.14em] text-espresso/40"
                }
              >
                {user.isAdmin ? "Admin" : "Customer"}
              </span>

              <RoleButton
                userId={user.id}
                name={user.name}
                isAdmin={user.isAdmin}
              />
            </div>
          );
        })}
      </div>

      <p className="mt-6 font-sans text-xs text-espresso/50">
        {total} account{total === 1 ? "" : "s"} · {adminCount} admin
        {adminCount === 1 ? "" : "s"}
      </p>
    </div>
  );
}
