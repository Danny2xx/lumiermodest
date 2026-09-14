"use client";

import { useActionState, useState, useRef } from "react";
import Image from "next/image";
import type { Product } from "@prisma/client";
import { uploadProductImage, deleteProductImage } from "./actions";

const inputClass =
  "w-full border border-taupe/30 bg-transparent px-4 py-3 font-sans text-sm focus:outline-none focus:border-taupe";
const labelClass =
  "mb-1.5 block font-sans text-xs uppercase tracking-wide text-espresso/60";

export default function ProductForm({
  product,
  action,
  submitLabel,
}: {
  product?: Product;
  action: (
    state: { error: string } | null,
    formData: FormData
  ) => Promise<{ error: string } | null>;
  submitLabel: string;
}) {
  const [state, formAction, isPending] = useActionState(action, null);
  const [images, setImages] = useState<string[]>(product?.images ?? []);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    setUploading(true);
    setUploadError("");

    for (const file of Array.from(files)) {
      const fd = new FormData();
      fd.set("file", file);
      const result = await uploadProductImage(fd);
      if (result.error) {
        setUploadError(result.error);
      } else if (result.url) {
        setImages((prev) => [...prev, result.url!]);
      }
    }

    setUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  async function removeImage(url: string) {
    setImages((prev) => prev.filter((u) => u !== url));
    await deleteProductImage(url);
  }

  return (
    <form action={formAction} className="mt-8 flex flex-col gap-5">
      <div>
        <label className={labelClass}>Photos</label>
        <div className="flex flex-wrap gap-3">
          {images.map((url) => (
            <div key={url} className="group relative h-24 w-20 flex-shrink-0">
              <Image
                src={url}
                alt=""
                fill
                sizes="80px"
                className="object-cover"
              />
              <button
                type="button"
                onClick={() => removeImage(url)}
                className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-espresso text-cream"
                aria-label="Remove photo"
              >
                ×
              </button>
              <input type="hidden" name="images" value={url} />
            </div>
          ))}
          <label className="flex h-24 w-20 flex-shrink-0 cursor-pointer flex-col items-center justify-center border border-dashed border-taupe/40 font-sans text-xs text-espresso/50 hover:border-taupe">
            {uploading ? "Uploading…" : "+ Add"}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              disabled={uploading}
              onChange={(e) => handleFiles(e.target.files)}
            />
          </label>
        </div>
        {uploadError && (
          <p className="mt-2 font-sans text-xs text-red-700">{uploadError}</p>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Name</label>
          <input
            name="name"
            type="text"
            required
            defaultValue={product?.name}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Category</label>
          <select
            name="category"
            required
            defaultValue={product?.category ?? "abayas"}
            className={inputClass}
          >
            <option value="abayas">Abayas</option>
            <option value="hijabs">Hijabs</option>
          </select>
        </div>
        <div>
          <label className={labelClass}>Price (£)</label>
          <input
            name="price"
            type="number"
            step="0.01"
            min="0"
            required
            defaultValue={
              product?.price !== undefined ? String(product.price) : undefined
            }
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Sale price (£, optional)</label>
          <input
            name="originalPrice"
            type="number"
            step="0.01"
            min="0"
            placeholder="Leave blank if not on sale"
            defaultValue={
              product?.originalPrice !== undefined &&
              product?.originalPrice !== null
                ? String(product.originalPrice)
                : undefined
            }
            className={inputClass}
          />
          <p className="mt-1 font-sans text-xs text-espresso/50">
            The original (higher) price — the price above becomes the sale
            price.
          </p>
        </div>
      </div>

      <div>
        <label className={labelClass}>Description</label>
        <textarea
          name="description"
          rows={3}
          required
          defaultValue={product?.description}
          className={inputClass}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Fabric</label>
          <input
            name="fabric"
            type="text"
            required
            defaultValue={product?.fabric}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Care instructions</label>
          <input
            name="care"
            type="text"
            required
            defaultValue={product?.care}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label className={labelClass}>Sizes</label>
        <input
          name="sizes"
          type="text"
          required
          placeholder="e.g. XS, S, M, L, XL — or One Size"
          defaultValue={product?.sizes?.join(", ")}
          className={inputClass}
        />
      </div>

      <label className="flex items-center gap-2 font-sans text-sm text-espresso/80">
        <input
          type="checkbox"
          name="inStock"
          defaultChecked={product?.inStock ?? true}
        />
        In stock
      </label>

      {state?.error && (
        <p className="font-sans text-xs text-red-700">{state.error}</p>
      )}

      <button
        type="submit"
        disabled={isPending || uploading}
        className="mt-2 bg-taupe-dark py-3 font-sans text-xs uppercase tracking-[0.18em] text-cream transition-all duration-200 hover:scale-[1.02] hover:bg-espresso disabled:opacity-60 disabled:hover:scale-100"
      >
        {isPending ? "Saving…" : submitLabel}
      </button>
    </form>
  );
}
