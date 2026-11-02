import ParallaxImage from "./motion/ParallaxImage";
import SplitText from "./motion/SplitText";

export default function BrandStory() {
  return (
    <section className="relative flex h-[50vh] min-h-[320px] items-end overflow-hidden">
      {/* The banner is wide on desktop but nearly square on phones, where a
          centred crop of the pair would show only the curtain between them. */}
      <ParallaxImage
        src="/campaign/story-wide.jpg"
        alt="Two women seated in the Yasmin abaya"
        className="hidden md:block"
      />
      <ParallaxImage
        src="/campaign/story-mobile.jpg"
        alt="A woman seated in the Yasmin abaya"
        className="md:hidden"
      />
      <div className="absolute inset-0 bg-espresso/50" />
      <SplitText
        text="Made with care, made to be remembered."
        as="p"
        stagger={0.06}
        className="relative z-10 px-8 pb-12 font-serif italic tracking-tight text-3xl text-cream sm:text-4xl"
      />
    </section>
  );
}
