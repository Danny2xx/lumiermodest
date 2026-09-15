"use client";

import { useActionState } from "react";
import type { Category } from "@/lib/categories";

const inputClass =
  "w-full border border-taupe/30 bg-transparent px-4 py-3 font-sans text-sm focus:outline-none focus:border-taupe";
const labelClass =
  "mb-1.5 block font-sans text-xs uppercase tracking-wide text-espresso/60";

export default function CategoryForm({
  category,
  action,
  submitLabel,
}: {
  category?: Category;
  action: (
    state: { error: string } | null,
    formData: FormData
  ) => Promise<{ error: string } | null>;
  submitLabel: string;
}) {
  const [state, formAction, isPending] = useActionState(action, null);

  return (
    <form action={formAction} className="mt-8 flex flex-col gap-4">
      <div>
        <label className={labelClass}>Name</label>
        <input
          name="name"
          type="text"
          required
          placeholder="e.g. Street Wear"
          defaultValue={category?.name}
          className={inputClass}
        />
        {category && (
          <p className="mt-1 font-sans text-xs text-espresso/50">
            URL: /{category.slug} (can&apos;t be changed after creation)
          </p>
        )}
      </div>

      <div>
        <label className={labelClass}>Subtitle (shown under the title)</label>
        <input
          name="subtitle"
          type="text"
          placeholder="e.g. Modest streetwear for everyday movement."
          defaultValue={category?.subtitle ?? ""}
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>Order in menu (0 = first)</label>
        <input
          name="sortOrder"
          type="number"
          defaultValue={category?.sortOrder ?? 0}
          className={inputClass}
        />
      </div>

      {state?.error && (
        <p className="font-sans text-xs text-red-700">{state.error}</p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="mt-2 bg-taupe-dark py-3 font-sans text-xs uppercase tracking-[0.18em] text-cream transition-all duration-200 hover:scale-[1.02] hover:bg-espresso disabled:opacity-60 disabled:hover:scale-100"
      >
        {isPending ? "Saving…" : submitLabel}
      </button>
    </form>
  );
}
