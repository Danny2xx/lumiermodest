import ProductForm from "../../ProductForm";
import { createProduct } from "../../actions";

export const metadata = { title: "Add Product — Admin" };

export default function NewProductPage() {
  return (
    <div>
      <h1 className="font-serif text-3xl text-taupe-dark">Add a product</h1>
      <ProductForm action={createProduct} submitLabel="Create Product" />
    </div>
  );
}
