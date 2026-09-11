import { getProductsByCategory } from "@/lib/products";
import CollectionHeader from "@/components/CollectionHeader";
import CategoryProductGrid from "@/components/CategoryProductGrid";

export const metadata = { title: "Abayas — LumierModest" };
export const revalidate = 60;

export default async function AbayasPage() {
  const abayas = await getProductsByCategory("abayas");

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <CollectionHeader
        eyebrow="The Collection"
        title="effortless elegance"
        subtitle="Abayas designed to be lived in, not just worn."
      />
      <CategoryProductGrid products={abayas} />
    </div>
  );
}
