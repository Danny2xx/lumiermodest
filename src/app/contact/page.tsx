export const metadata = { title: "Contact — LumierModest" };

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-xl px-6 py-20">
      <h1 className="font-serif text-4xl text-taupe-dark">Contact Us</h1>
      <p className="mt-4 font-sans text-sm text-espresso/80">
        Have a question about an order, sizing, or anything else? Reach out
        and we&apos;ll get back to you within 1–2 business days.
      </p>
      <form className="mt-8 flex flex-col gap-4">
        <input
          type="text"
          placeholder="Name"
          className="border border-taupe/30 bg-transparent px-4 py-3 font-sans text-sm focus:outline-none focus:border-taupe"
        />
        <input
          type="email"
          placeholder="Email"
          className="border border-taupe/30 bg-transparent px-4 py-3 font-sans text-sm focus:outline-none focus:border-taupe"
        />
        <textarea
          placeholder="Message"
          rows={5}
          className="border border-taupe/30 bg-transparent px-4 py-3 font-sans text-sm focus:outline-none focus:border-taupe"
        />
        <button
          type="submit"
          className="bg-taupe-dark py-3 font-sans text-xs uppercase tracking-[0.18em] text-cream transition-colors hover:bg-espresso"
        >
          Send Message
        </button>
      </form>
    </div>
  );
}
