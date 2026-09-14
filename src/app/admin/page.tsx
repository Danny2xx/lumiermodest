import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/db";
import { deleteProduct } from "./actions";
import DeleteButton from "./DeleteButton";

export const metadata = { title: "Admin — LumierModest" };

export default async function AdminDashboard() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-3xl text-taupe-dark">Products</h1>
        <Link
          href="/admin/products/new"
          className="bg-taupe-dark px-6 py-2.5 font-sans text-xs uppercase tracking-[0.18em] text-cream transition-all duration-200 hover:scale-[1.02] hover:bg-espresso"
        >
          + Add Product
        </Link>
      </div>

      <div className="mt-8 divide-y divide-taupe/15 border-y border-taupe/15">
        {products.length === 0 && (
          <p className="py-10 text-center font-sans text-sm text-espresso/60">
            No products yet.
          </p>
        )}
        {products.map((p) => (
          <div key={p.id} className="flex items-center gap-4 py-4">
            <div className="relative h-16 w-14 flex-shrink-0 overflow-hidden bg-sand">
              {p.images[0] && (
                <Image
                  src={p.images[0]}
                  alt={p.name}
                  fill
                  sizes="56px"
                  className="object-cover"
                />
              )}
            </div>
            <div className="flex-1">
              <p className="font-serif text-lg text-espresso">{p.name}</p>
              <p className="font-sans text-xs uppercase tracking-wide text-espresso/50">
                {p.category} · £{p.price.toString()}
                {p.originalPrice ? ` (was £${p.originalPrice.toString()})` : ""}
                {!p.inStock ? " · Sold out" : ""}
              </p>
            </div>
            <Link
              href={`/admin/products/${p.id}/edit`}
              className="font-sans text-xs uppercase tracking-wide text-espresso/70 underline hover:text-gold"
            >
              Edit
            </Link>
            <DeleteButton
              action={async () => {
                "use server";
                await deleteProduct(p.id);
              }}
              confirmMessage={`Delete "${p.name}"? This can't be undone.`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
