"use client";

import { useState, useTransition } from "react";
import { setUserRole } from "./actions";

export default function RoleButton({
  userId,
  name,
  isAdmin,
}: {
  userId: string;
  name: string;
  isAdmin: boolean;
}) {
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    const message = isAdmin
      ? `Remove admin access from ${name}? They'll keep their account but lose the admin panel.`
      : `Give ${name} full admin access? They'll be able to add, edit, and delete products.`;
    if (!confirm(message)) return;

    setError("");
    startTransition(async () => {
      const result = await setUserRole(userId, isAdmin ? "user" : "admin");
      if ("error" in result) setError(result.error);
    });
  };

  return (
    <div className="text-right">
      <button
        onClick={handleClick}
        disabled={isPending}
        className={
          isAdmin
            ? "font-sans text-xs uppercase tracking-wide text-red-700/70 underline hover:text-red-700 disabled:opacity-50"
            : "bg-taupe-dark px-4 py-2 font-sans text-xs uppercase tracking-[0.14em] text-cream transition-all duration-200 hover:scale-[1.02] hover:bg-espresso disabled:opacity-50 disabled:hover:scale-100"
        }
      >
        {isPending ? "Saving…" : isAdmin ? "Remove Admin" : "Make Admin"}
      </button>
      {error && (
        <p className="mt-1 max-w-xs font-sans text-xs text-red-700">{error}</p>
      )}
    </div>
  );
}
