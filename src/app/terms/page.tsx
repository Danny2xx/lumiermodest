import ContentPage from "@/components/ContentPage";

export const metadata = { title: "Terms of Service — LumierModest" };

export default function TermsPage() {
  return (
    <ContentPage title="Terms of Service">
      <p>
        By using this website and placing an order, you agree to these
        terms. All prices are listed in GBP and include VAT where
        applicable. We reserve the right to refuse or cancel any order.
      </p>
      <p className="text-xs text-espresso/50">
        Placeholder terms — replace with full terms reviewed for your
        business before launch.
      </p>
    </ContentPage>
  );
}
