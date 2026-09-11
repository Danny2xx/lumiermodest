import { getProductsByCategory } from "@/lib/products";
import CollectionHeader from "@/components/CollectionHeader";
import CategoryProductGrid from "@/components/CategoryProductGrid";

export const metadata = { title: "Hijabs — LumierModest" };
export const revalidate = 60;

export default async function HijabsPage() {
  const hijabs = await getProductsByCategory("hijabs");

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <CollectionHeader
        eyebrow="The Collection"
        title="everyday grace"
        subtitle="Hijabs made for comfort, styled for elegance."
      />
      <CategoryProductGrid products={hijabs} />
    </div>
  );
}
