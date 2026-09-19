import Link from "next/link";
import Accordion from "./Accordion";
import Flourish from "./Flourish";

const faqs = [
  {
    q: "How do I know what size to order?",
    a: (
      <>
        Check our{" "}
        <Link href="/sizing" className="underline hover:text-gold-ink">
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
        Standard delivery takes 3–5 working days and costs £3.95, or
        it&apos;s free once you spend over £75. Express is 1–2 working days.
        Full details are on the{" "}
        <Link href="/shipping" className="underline hover:text-gold-ink">
          delivery page
        </Link>
        .
      </>
    ),
  },
  {
    q: "What's your returns policy?",
    a: (
      <>
        You have 14 days from your order arriving to tell us you&apos;d like
        to send something back, and another 14 to post it, as long as
        it&apos;s unworn with tags on. That includes sale pieces. The{" "}
        <Link href="/returns" className="underline hover:text-gold-ink">
          returns page
        </Link>{" "}
        has the rest.
      </>
    ),
  },
  {
    q: "Do you ship outside the UK?",
    a: "Not yet — we deliver within the UK only for now. Join the mailing list in the footer and we\u2019ll tell you when that changes.",
  },
];

export default function FAQSection() {
  return (
    <section className="bg-cream py-16">
      <div className="mx-auto max-w-2xl px-6">
        <h2 className="text-center font-serif italic tracking-tight text-4xl text-taupe-dark">
          Before you order
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
