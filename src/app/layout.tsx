import type { Metadata } from "next";
import { Cormorant_Garamond, Jost, Parisienne } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { CartProvider } from "@/components/CartContext";
import CartDrawer from "@/components/CartDrawer";
import { WishlistProvider } from "@/components/WishlistContext";
import WishlistDrawer from "@/components/WishlistDrawer";
import NewsletterModal from "@/components/NewsletterModal";
import AnnouncementBar from "@/components/AnnouncementBar";
import TrustBadges from "@/components/TrustBadges";
import WhatsAppButton from "@/components/WhatsAppButton";
import { getAllCategories } from "@/lib/categories";

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
  metadataBase: new URL("https://lumiermodest.com"),
  title: "LumierModest — Timeless Modesty. Elevated Elegance.",
  description:
    "Abayas and hijabs designed in the UK for timeless modesty and elevated elegance.",
  openGraph: {
    title: "LumierModest — Timeless Modesty. Elevated Elegance.",
    description:
      "Abayas and hijabs designed in the UK for timeless modesty and elevated elegance.",
    url: "https://lumiermodest.com",
    siteName: "LumierModest",
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LumierModest — Timeless Modesty. Elevated Elegance.",
    description:
      "Abayas and hijabs designed in the UK for timeless modesty and elevated elegance.",
  },
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const categories = await getAllCategories();
  const navLinks = [
    ...categories.map((c) => ({ href: `/${c.slug}`, label: c.name })),
    { href: "/last-chance", label: "Last Chance" },
    { href: "/about", label: "About" },
  ];

  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${jost.variable} ${parisienne.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream text-espresso">
        <CartProvider>
          <WishlistProvider>
            <AnnouncementBar />
            <Nav links={navLinks} />
            <main className="flex-1">{children}</main>
            <TrustBadges />
            <Footer />
            <CartDrawer />
            <WishlistDrawer />
            <NewsletterModal />
            <WhatsAppButton />
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
