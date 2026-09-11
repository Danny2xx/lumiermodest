import Hero from "@/components/Hero";
import FeaturedGrid from "@/components/FeaturedGrid";
import BrandStory from "@/components/BrandStory";
import FAQSection from "@/components/FAQSection";
import CommunityBand from "@/components/CommunityBand";

export const revalidate = 60;

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedGrid />
      <BrandStory />
      <FAQSection />
      <CommunityBand />
    </>
  );
}
