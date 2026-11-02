import Hero from "@/components/Hero";
import { getAllCategories } from "@/lib/categories";
import FeaturedGrid from "@/components/FeaturedGrid";
import BrandStory from "@/components/BrandStory";
import FAQSection from "@/components/FAQSection";
import CommunityBand from "@/components/CommunityBand";
import NewCollection from "@/components/NewCollection";
import { getAllProducts } from "@/lib/products";

export const revalidate = 60;

export default async function Home() {
  // Point the hero at a category that actually exists, rather than assuming
  // abayas will always be the first thing she sells.
  const categories = await getAllCategories();
  const shopHref = categories[0] ? `/${categories[0].slug}` : "/";

  // Only point the launch section at categories with something in them.
  const stocked = new Set((await getAllProducts()).map((p) => p.category));
  const collectionLinks = categories
    .filter((c) => stocked.has(c.slug))
    .slice(0, 2)
    .map((c) => ({ href: `/${c.slug}`, label: `Shop ${c.name.toLowerCase()}` }));

  return (
    <>
      <Hero shopHref={shopHref} />
      <NewCollection links={collectionLinks} />
      <FeaturedGrid />
      <BrandStory />
      <FAQSection />
      <CommunityBand />
    </>
  );
}
