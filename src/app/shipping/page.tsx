import ContentPage, {
  SectionHeading,
  NeedHelp,
} from "@/components/ContentPage";

export const metadata = { title: "Shipping Policy — LumierModest" };

export default function ShippingPage() {
  return (
    <ContentPage title="Shipping Policy">
      <SectionHeading>Where We Ship</SectionHeading>
      <p>
        We currently ship across the United Kingdom only. We&apos;re working
        on expanding beyond the UK — join our mailing list in the footer to
        hear when that changes.
      </p>

      <SectionHeading>Processing Time</SectionHeading>
      <p>
        Orders are processed within 1–2 business days after payment
        confirmation. You&apos;ll receive an email with tracking information
        once your order has shipped.
      </p>

      <SectionHeading>Shipping Rates & Delivery Times</SectionHeading>
      <ul className="list-disc space-y-2 pl-5">
        <li>Standard delivery (3–5 working days) — £3.95</li>
        <li>Express delivery (1–2 working days) — £6.95</li>
      </ul>

      <SectionHeading>Free Shipping</SectionHeading>
      <p>
        Free standard delivery is automatically applied on orders over £75 —
        no code needed.
      </p>

      <SectionHeading>Order Tracking</SectionHeading>
      <p>
        Once your order ships, you&apos;ll receive an email with a tracking
        link. If a package is marked as delivered but you can&apos;t locate
        it, please contact the courier directly — they handle the
        delivery investigation, and we&apos;re happy to help coordinate.
      </p>

      <p className="text-xs text-espresso/50">
        Placeholder rates — confirm real carrier pricing before launch.
      </p>

      <NeedHelp>
        If you have any questions about shipping, reach out via our{" "}
        <a href="/contact" className="underline">
          contact page
        </a>
        . We&apos;re happy to assist.
      </NeedHelp>
    </ContentPage>
  );
}
