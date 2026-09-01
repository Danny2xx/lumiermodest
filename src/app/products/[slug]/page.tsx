import { notFound } from "next/navigation";
import { getProductBySlug, getRelatedProducts, products } from "@/lib/products";
import ProductDetail from "@/components/ProductDetail";
import RelatedProducts from "@/components/RelatedProducts";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  return (
    <>
      <ProductDetail product={product} />
      <RelatedProducts products={getRelatedProducts(product)} />
    </>
  );
}
