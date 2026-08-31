import ContentPage from "@/components/ContentPage";

export const metadata = { title: "Privacy Policy — LumierModest" };

export default function PrivacyPage() {
  return (
    <ContentPage title="Privacy Policy">
      <p>
        LumierModest collects the personal information you provide when
        placing an order or signing up for updates — including your name,
        email, delivery address, and payment details — in order to fulfil
        your order and communicate with you.
      </p>
      <p>
        We do not sell your data to third parties. Payment is processed
        securely by our payment provider; we never store your full card
        details on our servers.
      </p>
      <p className="text-xs text-espresso/50">
        Placeholder policy — this must be replaced with a full UK GDPR
        compliant policy before launch.
      </p>
    </ContentPage>
  );
}
