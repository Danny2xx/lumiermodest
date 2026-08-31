import ContentPage from "@/components/ContentPage";

export const metadata = { title: "Shipping Policy — LumierModest" };

export default function ShippingPage() {
  return (
    <ContentPage title="Shipping Policy">
      <p>We currently ship across the United Kingdom.</p>
      <ul className="list-disc space-y-2 pl-5">
        <li>Standard delivery (3–5 working days) — £3.95</li>
        <li>Free standard delivery on orders over £75</li>
        <li>Express delivery (1–2 working days) — £6.95</li>
      </ul>
      <p>
        Orders are processed within 1–2 business days. You will receive a
        tracking link by email once your order has shipped.
      </p>
      <p className="text-xs text-espresso/50">
        Placeholder rates — confirm real carrier pricing before launch.
      </p>
    </ContentPage>
  );
}
