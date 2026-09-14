"use client";

export default function DeleteButton({
  action,
  confirmMessage,
}: {
  action: () => Promise<void>;
  confirmMessage: string;
}) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!confirm(confirmMessage)) {
          e.preventDefault();
        }
      }}
    >
      <button
        type="submit"
        className="font-sans text-xs uppercase tracking-wide text-red-700/70 underline hover:text-red-700"
      >
        Delete
      </button>
    </form>
  );
}
