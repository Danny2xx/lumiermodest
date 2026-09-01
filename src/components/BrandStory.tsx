import Image from "next/image";

export default function BrandStory() {
  return (
    <section className="relative flex h-[50vh] min-h-[320px] items-end">
      <Image
        src="/campaign/gold-thread.jpg"
        alt="Gold thread detail"
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-espresso/50" />
      <p className="relative z-10 px-8 pb-12 font-serif italic tracking-tight text-3xl text-cream sm:text-4xl">
        Made with care, made to be remembered.
      </p>
    </section>
  );
}
