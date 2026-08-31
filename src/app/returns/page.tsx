import ContentPage from "@/components/ContentPage";

export const metadata = { title: "Refund Policy — LumierModest" };

export default function ReturnsPage() {
  return (
    <ContentPage title="Refund Policy">
      <p>
        Under UK Consumer Contracts Regulations, you have the right to cancel
        your order within 14 days of receiving it, without giving a reason.
      </p>
      <p>
        Items must be returned unworn, unwashed, and with original tags
        attached, within 14 days of your cancellation notice. Once we receive
        and inspect your return, we will process your refund to the original
        payment method within 14 days.
      </p>
      <p>Sale items marked &quot;Last Chance&quot; are final sale and not eligible for return.</p>
      <p className="text-xs text-espresso/50">
        Placeholder policy — have this reviewed against current UK consumer
        law before launch.
      </p>
    </ContentPage>
  );
}
