import Link from "next/link";
import ContentPage, {
  SectionHeading,
  NeedHelp,
} from "@/components/ContentPage";

export const metadata = { title: "Refund Policy — LumierModest" };

export default function ReturnsPage() {
  return (
    <ContentPage title="Refund Policy">
      <p>We want you to love your purchase. If something isn&apos;t right, we&apos;re here to help.</p>

      <SectionHeading>Eligibility</SectionHeading>
      <p>
        Under UK Consumer Contracts Regulations, you have the right to
        cancel your order within 14 days of receiving it, without giving a
        reason. Items must be returned unworn, unwashed, and with original
        tags attached.
      </p>

      <SectionHeading>How to Start a Return</SectionHeading>
      <p>
        Contact us via our{" "}
        <Link href="/contact" className="underline">
          contact page
        </Link>{" "}
        with your order number, and we&apos;ll send you next steps.
      </p>

      <SectionHeading>Refunds</SectionHeading>
      <p>
        Once we receive and inspect your return, we&apos;ll process your
        refund to the original payment method. Please allow 5–10 business
        days for it to appear on your statement. Original shipping costs are
        not refunded.
      </p>

      <SectionHeading>Exchanges</SectionHeading>
      <p>
        If you&apos;d like a different size or colour, place a new order for
        the item you want and request a return for the original.
      </p>

      <SectionHeading>Return Shipping Costs</SectionHeading>
      <p>
        Customers are responsible for return shipping costs, including on
        orders that originally qualified for free delivery.
      </p>

      <SectionHeading>Exceptions</SectionHeading>
      <p>
        Items marked{" "}
        <Link href="/last-chance" className="underline">
          Last Chance
        </Link>{" "}
        are final sale and not eligible for return or exchange.
      </p>

      <SectionHeading>Damaged Items</SectionHeading>
      <p>
        Contact us within 5 days of receiving a damaged item, with your
        order number and photos. Claims made outside this window may not be
        accepted.
      </p>

      <p className="text-xs text-espresso/50">
        Placeholder policy — have this reviewed against current UK consumer
        law before launch.
      </p>

      <NeedHelp>
        For any questions about returns, reach out via our{" "}
        <Link href="/contact" className="underline">
          contact page
        </Link>
        . Our team will take care of you.
      </NeedHelp>
    </ContentPage>
  );
}
