import Hero from "@/components/Hero";
import { getAllCategories } from "@/lib/categories";
import FeaturedGrid from "@/components/FeaturedGrid";
import BrandStory from "@/components/BrandStory";
import FAQSection from "@/components/FAQSection";
import CommunityBand from "@/components/CommunityBand";

export const revalidate = 60;

export default async function Home() {
  // Point the hero at a category that actually exists, rather than assuming
  // abayas will always be the first thing she sells.
  const categories = await getAllCategories();
  const shopHref = categories[0] ? `/${categories[0].slug}` : "/";

  return (
    <>
      <Hero shopHref={shopHref} />
      <FeaturedGrid />
      <BrandStory />
      <FAQSection />
      <CommunityBand />
    </>
  );
}
