import CategoryForm from "../CategoryForm";
import { createCategory } from "../actions";

export const metadata = { title: "Add Category — Admin" };

export default function NewCategoryPage() {
  return (
    <div>
      <h1 className="font-serif text-3xl text-taupe-dark">Add a category</h1>
      <CategoryForm action={createCategory} submitLabel="Create Category" />
    </div>
  );
}
