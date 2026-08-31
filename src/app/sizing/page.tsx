import ContentPage from "@/components/ContentPage";

export const metadata = { title: "Sizing Guide — LumierModest" };

export default function SizingPage() {
  return (
    <ContentPage title="Sizing Guide">
      <p>
        Our abayas are designed with a relaxed, flowing fit. If you are
        between sizes, we recommend sizing up for extra coverage and ease of
        movement.
      </p>
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="border-b border-taupe/20">
            <th className="py-2">Size</th>
            <th className="py-2">UK Dress Size</th>
            <th className="py-2">Length (cm)</th>
          </tr>
        </thead>
        <tbody>
          {[
            ["XS", "6–8", "135"],
            ["S", "8–10", "138"],
            ["M", "10–12", "140"],
            ["L", "12–14", "143"],
            ["XL", "14–16", "146"],
          ].map(([size, uk, len]) => (
            <tr key={size} className="border-b border-taupe/10">
              <td className="py-2">{size}</td>
              <td className="py-2">{uk}</td>
              <td className="py-2">{len}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="text-xs text-espresso/50">
        Placeholder measurements — replace with your own fit specs before
        launch.
      </p>
    </ContentPage>
  );
}
