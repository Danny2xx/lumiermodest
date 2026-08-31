import PlaceholderImage from "./PlaceholderImage";

export default function BrandStory() {
  return (
    <section className="relative flex h-[50vh] min-h-[320px] items-end">
      <PlaceholderImage
        swatch={["#3c2c20", "#000000"]}
        className="absolute inset-0 h-full w-full"
      />
      <div className="absolute inset-0 bg-espresso/30" />
      <p className="relative z-10 px-8 pb-12 font-script text-3xl text-cream sm:text-4xl">
        Made with care, made to be remembered.
      </p>
    </section>
  );
}
