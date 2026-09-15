"use client";

import { useState, useTransition } from "react";
import { deleteCategory } from "./actions";

export default function DeleteCategoryButton({
  id,
  name,
}: {
  id: string;
  name: string;
}) {
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    if (!confirm(`Delete "${name}"?`)) return;
    setError("");
    startTransition(async () => {
      const result = await deleteCategory(id);
      if ("error" in result) {
        setError(result.error);
      }
    });
  };

  return (
    <div className="text-right">
      <button
        onClick={handleClick}
        disabled={isPending}
        className="font-sans text-xs uppercase tracking-wide text-red-700/70 underline hover:text-red-700 disabled:opacity-50"
      >
        Delete
      </button>
      {error && (
        <p className="mt-1 max-w-xs font-sans text-xs text-red-700">{error}</p>
      )}
    </div>
  );
}
