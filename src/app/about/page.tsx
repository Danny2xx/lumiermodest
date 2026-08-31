export const metadata = { title: "About — LumierModest" };

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <h1 className="font-serif text-4xl text-taupe-dark">About LumierModest</h1>
      <p className="mt-3 font-script text-2xl text-taupe">
        Timeless modesty. Elevated elegance.
      </p>
      <div className="mt-8 space-y-5 font-sans text-sm leading-relaxed text-espresso/80">
        <p>
          LumierModest was founded with a simple belief: modest fashion
          deserves the same care, craftsmanship, and elegance as any other
          design house. Every abaya and hijab in our collection is chosen and
          finished with that standard in mind.
        </p>
        <p>
          We design for the everyday and the occasion — pieces meant to be
          worn, loved, and remembered. Based in the UK, we ship nationwide
          with care.
        </p>
      </div>
    </div>
  );
}
