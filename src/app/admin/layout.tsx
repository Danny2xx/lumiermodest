import Link from "next/link";
import { requireAdmin } from "@/lib/auth/admin";

export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdmin();

  return (
    <div className="min-h-screen bg-cream">
      <div className="border-b border-taupe/15 bg-sand">
        <div className="mx-auto flex max-w-5xl flex-col gap-3 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/admin"
            className="font-serif italic text-2xl text-taupe-dark"
          >
            LumierModest — Admin
          </Link>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 font-sans text-xs uppercase tracking-[0.14em] text-espresso/70">
            <Link href="/admin" className="hover:text-gold">
              Products
            </Link>
            <Link href="/admin/categories" className="hover:text-gold">
              Categories
            </Link>
            <Link href="/admin/subscribers" className="hover:text-gold">
              Subscribers
            </Link>
            <Link href="/admin/users" className="hover:text-gold">
              Team
            </Link>
            <Link href="/" className="hover:text-gold">
              View store
            </Link>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-5xl px-6 py-10">{children}</div>
    </div>
  );
}
