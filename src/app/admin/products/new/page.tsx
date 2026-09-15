import ProductForm from "../../ProductForm";
import { createProduct } from "../../actions";
import { getAllCategories } from "@/lib/categories";

export const metadata = { title: "Add Product — Admin" };

export default async function NewProductPage() {
  const categories = await getAllCategories();

  return (
    <div>
      <h1 className="font-serif text-3xl text-taupe-dark">Add a product</h1>
      <ProductForm
        categories={categories}
        action={createProduct}
        submitLabel="Create Product"
      />
    </div>
  );
}
