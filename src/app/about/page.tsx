import BrandStamp from "@/components/BrandStamp";

export const metadata = { title: "About — LumierModest" };

export default function AboutPage() {
  return (
    <div className="relative mx-auto max-w-3xl px-6 py-20">
      <BrandStamp className="absolute right-6 top-16" />

      <h1 className="font-script text-6xl text-taupe-dark">About</h1>

      <div className="mt-8 space-y-5 font-sans text-sm leading-relaxed text-espresso/80">
        <p>
          LumierModest started with a simple frustration: modest fashion in
          the UK was either an afterthought bolted onto a mainstream
          collection, or beautiful but out of reach, shipped from halfway
          across the world with a six-week wait and a customs bill at the
          door.
        </p>
        <p>
          We wanted something different — abayas and hijabs designed with
          the same care as any London fashion label, cut for how women here
          actually move through their day, and in your hands within days,
          not months.
        </p>
        <p>
          Every piece is chosen to do two things at once:{" "}
          <em>disappear into the everyday</em> and{" "}
          <em>hold up in a room full of people dressed to impress</em>.
          That&apos;s the whole idea behind &quot;timeless modesty,
          elevated elegance&quot; — pieces you reach for without thinking,
          that never feel like a compromise.
        </p>
        <p>
          We&apos;re just getting started, and we&apos;re building this
          label in the open — new colourways, new silhouettes, and better
          fabrics as we learn what you actually wear on repeat.
        </p>
        <p>Thank you for being here.</p>
      </div>

      <p className="mt-10 font-script text-3xl text-taupe">
        With warmth, LumierModest
      </p>
    </div>
  );
}
