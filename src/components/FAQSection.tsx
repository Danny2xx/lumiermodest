import Link from "next/link";
import Accordion from "./Accordion";
import Flourish from "./Flourish";

const faqs = [
  {
    q: "How do I know what size to order?",
    a: (
      <>
        Check our{" "}
        <Link href="/sizing" className="underline">
          Sizing Guide
        </Link>{" "}
        for height and body measurement charts. If you&apos;re between
        sizes, we recommend sizing up for a comfortable, relaxed fit.
      </>
    ),
  },
  {
    q: "How long does delivery take?",
    a: (
      <>
        Standard UK delivery takes 3–5 working days, with free shipping on
        orders over £75. See our{" "}
        <Link href="/shipping" className="underline">
          Shipping Policy
        </Link>{" "}
        for full details.
      </>
    ),
  },
  {
    q: "What's your returns policy?",
    a: (
      <>
        Returns are accepted within 14 days of delivery, as long as items
        are unworn and unwashed with tags attached. Full details in our{" "}
        <Link href="/returns" className="underline">
          Refund Policy
        </Link>
        .
      </>
    ),
  },
  {
    q: "Do you ship outside the UK?",
    a: "Not yet — we currently ship within the UK only. Join our mailing list to hear when that changes.",
  },
];

export default function FAQSection() {
  return (
    <section className="bg-cream py-16">
      <div className="mx-auto max-w-2xl px-6">
        <p className="mb-2 text-center font-sans text-xs uppercase tracking-[0.3em] text-taupe">
          Questions
        </p>
        <h2 className="text-center font-serif italic tracking-tight text-4xl text-taupe-dark">
          Frequently Asked
        </h2>
        <Flourish className="mt-6 mb-8" />
        <div>
          {faqs.map((faq) => (
            <Accordion key={faq.q} title={faq.q}>
              <p>{faq.a}</p>
            </Accordion>
          ))}
        </div>
      </div>
    </section>
  );
}
