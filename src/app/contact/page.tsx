import BrandStamp from "@/components/BrandStamp";
import ContactForm from "@/components/ContactForm";
import Flourish from "@/components/Flourish";

export const metadata = { title: "Contact — LumierModest" };

export default function ContactPage() {
  return (
    <div className="relative mx-auto max-w-xl px-6 py-20 text-center">
      <BrandStamp className="absolute right-6 top-4" />

      <h1 className="font-serif italic tracking-tight text-5xl text-taupe-dark">
        Contact us
      </h1>
      <Flourish className="mt-4" />
      <p className="mt-6 font-sans text-sm leading-relaxed text-espresso/80">
        We&apos;d love to hear from you. Whether it&apos;s about your order,
        sizing, or a collaboration — our team is here to help and will get
        back to you within 1–2 business days.
      </p>

      <div className="mt-6 font-sans text-sm text-espresso/80">
        <p>Email us: hello@lumiermodest.com</p>
        <p>Instagram: @lumiermodest</p>
        <p>TikTok: @lumier.modest</p>
      </div>

      <h2 className="mt-14 font-serif italic text-3xl text-taupe">
        Contact form
      </h2>
      <p className="mt-2 font-sans text-sm text-espresso/70">
        You can also reach us directly through the form below.
      </p>

      <div className="text-left">
        <ContactForm />
      </div>
    </div>
  );
}
