import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import ProductForm from "../../../ProductForm";
import { updateProduct } from "../../../actions";
import { getAllCategories } from "@/lib/categories";

export const metadata = { title: "Edit Product — Admin" };

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) notFound();
  const categories = await getAllCategories();

  return (
    <div>
      <h1 className="font-serif text-3xl text-taupe-dark">Edit product</h1>
      <ProductForm
        product={product}
        categories={categories}
        action={updateProduct.bind(null, product.id)}
        submitLabel="Save Changes"
      />
    </div>
  );
}
