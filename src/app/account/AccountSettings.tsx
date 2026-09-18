"use client";

import { useActionState } from "react";
import { updateDisplayName, changeAccountPassword } from "./actions";

const inputClass =
  "w-full border border-taupe/40 bg-transparent px-4 py-3 font-sans text-sm text-espresso focus:border-taupe focus:outline-none";
const labelClass =
  "font-sans text-xs uppercase tracking-[0.14em] text-espresso";
const buttonClass =
  "self-start bg-taupe-dark px-8 py-3 font-sans text-xs uppercase tracking-[0.18em] text-cream transition-all duration-200 hover:scale-[1.02] hover:bg-espresso disabled:opacity-60 disabled:hover:scale-100";

function Message({
  state,
}: {
  state: { ok: string } | { error: string } | null;
}) {
  if (!state) return null;
  const isError = "error" in state;
  return (
    <p
      role="status"
      className={`font-sans text-sm ${
        isError ? "text-red-700" : "text-taupe-dark"
      }`}
    >
      {isError ? state.error : state.ok}
    </p>
  );
}

export default function AccountSettings({
  name,
  email,
}: {
  name: string;
  email: string;
}) {
  const [nameState, nameAction, savingName] = useActionState(
    updateDisplayName,
    null
  );
  const [passwordState, passwordAction, savingPassword] = useActionState(
    changeAccountPassword,
    null
  );

  return (
    <div className="mt-14">
      <h2 className="font-serif text-2xl text-taupe-dark">Your details</h2>

      <form action={nameAction} className="mt-6 flex flex-col gap-3">
        <label htmlFor="account-name" className={labelClass}>
          Name
        </label>
        <input
          id="account-name"
          name="name"
          type="text"
          defaultValue={name}
          maxLength={80}
          required
          className={inputClass}
        />
        <Message state={nameState} />
        <button type="submit" disabled={savingName} className={buttonClass}>
          {savingName ? "Saving…" : "Save name"}
        </button>
      </form>

      <div className="mt-8">
        <p className={labelClass}>Email</p>
        <p className="mt-2 font-sans text-sm text-espresso">{email}</p>
        <p className="mt-1 font-sans text-xs text-espresso/80">
          Your orders are tied to this address. If you need it changed, message
          us and we&apos;ll sort it for you.
        </p>
      </div>

      <form action={passwordAction} className="mt-10 flex flex-col gap-3">
        <h3 className="font-serif text-xl text-taupe-dark">Change password</h3>
        <label htmlFor="current-password" className={labelClass}>
          Current password
        </label>
        <input
          id="current-password"
          name="currentPassword"
          type="password"
          autoComplete="current-password"
          required
          className={inputClass}
        />
        <label htmlFor="new-password" className={labelClass}>
          New password
        </label>
        <input
          id="new-password"
          name="newPassword"
          type="password"
          autoComplete="new-password"
          minLength={8}
          required
          className={inputClass}
        />
        <label htmlFor="confirm-password" className={labelClass}>
          Repeat new password
        </label>
        <input
          id="confirm-password"
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          minLength={8}
          required
          className={inputClass}
        />
        <p className="font-sans text-xs text-espresso/80">
          At least 8 characters. Changing it signs you out on any other device.
        </p>
        <Message state={passwordState} />
        <button type="submit" disabled={savingPassword} className={buttonClass}>
          {savingPassword ? "Changing…" : "Change password"}
        </button>
      </form>
    </div>
  );
}
