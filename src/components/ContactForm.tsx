"use client";

import { useState } from "react";

const SUPPORT_EMAIL = "hello@lumiermodest.com";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [comment, setComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `Website enquiry from ${name || "a customer"}`;
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      phone ? `Phone: ${phone}` : null,
      "",
      comment,
    ]
      .filter(Boolean)
      .join("\n");
    window.location.href = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <input
          type="text"
          placeholder="Name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-taupe/30 bg-transparent px-4 py-3 font-sans text-sm focus:outline-none focus:border-taupe"
        />
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-taupe/30 bg-transparent px-4 py-3 font-sans text-sm focus:outline-none focus:border-taupe"
        />
      </div>
      <input
        type="tel"
        placeholder="Phone (optional)"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="border border-taupe/30 bg-transparent px-4 py-3 font-sans text-sm focus:outline-none focus:border-taupe"
      />
      <textarea
        placeholder="Message"
        rows={5}
        required
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="border border-taupe/30 bg-transparent px-4 py-3 font-sans text-sm focus:outline-none focus:border-taupe"
      />
      <button
        type="submit"
        className="bg-taupe-dark py-3 font-sans text-xs uppercase tracking-[0.18em] text-cream transition-colors hover:bg-espresso"
      >
        Send Message
      </button>
      <p className="font-sans text-xs text-espresso/50">
        Sending opens your email app with this message pre-filled to{" "}
        {SUPPORT_EMAIL}.
      </p>
    </form>
  );
}
