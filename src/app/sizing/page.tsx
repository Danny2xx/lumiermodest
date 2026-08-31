import Link from "next/link";
import ContentPage, {
  SectionHeading,
  NeedHelp,
} from "@/components/ContentPage";

export const metadata = { title: "Sizing Guide — LumierModest" };

const lengthTable = [
  ["XS", "4'10\" – 5'2\"", "135 cm"],
  ["S", "5'2\" – 5'4\"", "138 cm"],
  ["M", "5'4\" – 5'6\"", "140 cm"],
  ["L", "5'6\" – 5'8\"", "143 cm"],
  ["XL", "5'8\" – 5'10\"", "146 cm"],
];

const measurementTable = [
  ["XS", "32–34\"", "26–28\"", "34–36\""],
  ["S", "34–36\"", "28–30\"", "36–38\""],
  ["M", "36–38\"", "30–32\"", "38–40\""],
  ["L", "38–40\"", "32–34\"", "40–42\""],
  ["XL", "40–42\"", "34–36\"", "42–44\""],
];

export default function SizingPage() {
  return (
    <ContentPage title="Sizing Guide">
      <p>
        Confused about abaya sizing? You&apos;re not alone. Our abayas are
        designed with a relaxed, flowing fit — here&apos;s everything you
        need to find your perfect size.
      </p>

      <SectionHeading>Find your fit by height</SectionHeading>
      <p>
        Our sizing corresponds primarily to your height, since abaya length
        is the fit that matters most for a comfortable, modest silhouette.
        If you&apos;re between sizes, we recommend sizing up.
      </p>
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="border-b border-taupe/20">
            <th className="py-2">Size</th>
            <th className="py-2">Your Height</th>
            <th className="py-2">Garment Length</th>
          </tr>
        </thead>
        <tbody>
          {lengthTable.map(([size, height, len]) => (
            <tr key={size} className="border-b border-taupe/10">
              <td className="py-2">{size}</td>
              <td className="py-2">{height}</td>
              <td className="py-2">{len}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <SectionHeading>Find your fit by body measurements</SectionHeading>
      <p>
        The table above helps you choose your <em>length</em>; the table
        below is for your <em>body measurements</em>, to make sure the fit
        through the shoulders and sleeves feels right too.
      </p>
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="border-b border-taupe/20">
            <th className="py-2">Size</th>
            <th className="py-2">Bust</th>
            <th className="py-2">Waist</th>
            <th className="py-2">Hip</th>
          </tr>
        </thead>
        <tbody>
          {measurementTable.map(([size, bust, waist, hip]) => (
            <tr key={size} className="border-b border-taupe/10">
              <td className="py-2">{size}</td>
              <td className="py-2">{bust}</td>
              <td className="py-2">{waist}</td>
              <td className="py-2">{hip}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="text-xs text-espresso/50">
        Placeholder measurements — replace with your own fit specs before
        launch.
      </p>

      <NeedHelp>
        Still not sure which size to pick? Send us a message via our{" "}
        <Link href="/contact" className="underline">
          contact page
        </Link>{" "}
        and we&apos;ll help you find your fit.
      </NeedHelp>
    </ContentPage>
  );
}
