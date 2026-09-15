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
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link
            href="/admin"
            className="font-serif italic text-2xl text-taupe-dark"
          >
            LumierModest — Admin
          </Link>
          <div className="flex items-center gap-6 font-sans text-xs uppercase tracking-[0.14em] text-espresso/70">
            <Link href="/admin" className="hover:text-gold">
              Products
            </Link>
            <Link href="/admin/subscribers" className="hover:text-gold">
              Subscribers
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
