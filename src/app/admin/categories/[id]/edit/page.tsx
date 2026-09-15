import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import CategoryForm from "../../CategoryForm";
import { updateCategory } from "../../actions";

export const metadata = { title: "Edit Category — Admin" };

export default async function EditCategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const category = await prisma.category.findUnique({ where: { id } });
  if (!category) notFound();

  return (
    <div>
      <h1 className="font-serif text-3xl text-taupe-dark">Edit category</h1>
      <CategoryForm
        category={category}
        action={updateCategory.bind(null, category.id)}
        submitLabel="Save Changes"
      />
    </div>
  );
}
