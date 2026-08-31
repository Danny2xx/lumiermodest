import type { Metadata } from "next";
import { Cormorant_Garamond, Jost, Parisienne } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { CartProvider } from "@/components/CartContext";
import CartDrawer from "@/components/CartDrawer";
import NewsletterModal from "@/components/NewsletterModal";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

const parisienne = Parisienne({
  variable: "--font-parisienne",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "LumierModest — Timeless Modesty. Elevated Elegance.",
  description:
    "Abayas and hijabs designed in the UK for timeless modesty and elevated elegance.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${jost.variable} ${parisienne.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream text-espresso">
        <CartProvider>
          <Nav />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
          <NewsletterModal />
        </CartProvider>
      </body>
    </html>
  );
}
