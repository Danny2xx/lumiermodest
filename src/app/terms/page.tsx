import Link from "next/link";
import ContentPage, {
  SectionHeading,
  NeedHelp,
} from "@/components/ContentPage";

export const metadata = { title: "Terms — LumierModest" };

export default function TermsPage() {
  return (
    <ContentPage title="Terms">
      <p>
        These are the terms you agree to when you buy from LumierModest. They
        sit alongside your legal rights as a consumer — they don&apos;t replace
        them.
      </p>

      <SectionHeading>Placing an order</SectionHeading>
      <p>
        When you pay, you&apos;re making an offer to buy. The agreement between
        us starts when we confirm your order. Very occasionally we may not be
        able to accept one — if a piece has sold out, or a price was listed
        incorrectly — and if that happens we&apos;ll tell you and refund you in
        full.
      </p>

      <SectionHeading>Prices</SectionHeading>
      <p>
        Prices are in pounds sterling and are what you pay for the pieces
        themselves. Delivery is added at the payment step, and the total is
        shown before you confirm.
      </p>
      <p>
        Prices can change, but never after you&apos;ve ordered: what you saw at
        the moment you paid is what you pay.
      </p>

      <SectionHeading>Payment</SectionHeading>
      <p>
        Payments are handled by Stripe on their own secure page. We never see
        or store your card details.
      </p>

      <SectionHeading>Delivery</SectionHeading>
      <p>
        We deliver within the United Kingdom. Times and costs are on the{" "}
        <Link href="/shipping" className="underline hover:text-gold-ink">
          delivery page
        </Link>
        . We&apos;ll always do our best to hit those times, though once a
        parcel is with the courier its progress is in their hands.
      </p>

      <SectionHeading>Returns</SectionHeading>
      <p>
        You can change your mind within 14 days of your order arriving. The{" "}
        <Link href="/returns" className="underline hover:text-gold-ink">
          returns page
        </Link>{" "}
        explains how, who pays the postage, and how refunds work.
      </p>

      <SectionHeading>Your account</SectionHeading>
      <p>
        If you create an account, keep your password to yourself and let us
        know if you think someone else has it. You can close your account
        whenever you like by asking us.
      </p>

      <SectionHeading>Our photographs and words</SectionHeading>
      <p>
        The photography, writing and design on this site belong to
        LumierModest. Please don&apos;t reuse them commercially without asking
        — though we&apos;re always glad to be tagged when you share.
      </p>

      <SectionHeading>If something goes wrong</SectionHeading>
      <p>
        If we fail to meet our side of this, we&apos;ll put it right. We&apos;re
        responsible for losses that are a foreseeable result of us breaking
        these terms, but not for anything unforeseeable. Nothing here limits
        our responsibility for death or personal injury caused by our
        negligence, or for fraud.
      </p>

      <SectionHeading>Which law applies</SectionHeading>
      <p>
        These terms are governed by the law of England and Wales, and disputes
        can be brought before its courts.
      </p>

      <SectionHeading>Changes</SectionHeading>
      <p>
        We may update these terms as the shop grows. The version that applies
        to your order is the one published on the day you ordered.
      </p>

      <NeedHelp>
        If anything here is unclear, ask us on the{" "}
        <Link href="/contact" className="underline hover:text-gold-ink">
          contact page
        </Link>{" "}
        before you order.
      </NeedHelp>
    </ContentPage>
  );
}
