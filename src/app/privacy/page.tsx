import Link from "next/link";
import ContentPage, {
  SectionHeading,
  NeedHelp,
} from "@/components/ContentPage";

export const metadata = { title: "Privacy — LumierModest" };

export default function PrivacyPage() {
  return (
    <ContentPage title="Privacy">
      <p>
        This explains what we do with your information when you shop with us.
        We&apos;ve tried to write it the way we&apos;d explain it in person.
      </p>

      <SectionHeading>What we collect</SectionHeading>
      <p>
        <strong>When you order:</strong> your email address, what you bought,
        the sizes and prices, and your order status. Your delivery address is
        collected by Stripe, who handle our payments.
      </p>
      <p>
        <strong>When you create an account:</strong> your name, email address
        and password. Passwords are stored by our sign-in provider and
        aren&apos;t visible to us.
      </p>
      <p>
        <strong>When you join the mailing list:</strong> your email address and
        the date you joined.
      </p>
      <p>
        <strong>When you message us:</strong> whatever you send us, through
        email or WhatsApp.
      </p>
      <p>
        <strong>Card details never reach us.</strong> Payment happens on
        Stripe&apos;s own secure page. We only ever see that a payment
        succeeded, and the last part of your order record.
      </p>

      <SectionHeading>Why we hold it</SectionHeading>
      <p>
        To send you what you ordered and deal with returns, because that&apos;s
        the agreement between us. To email you about new pieces, but only if
        you asked us to. And to keep sales records, because the law requires
        businesses to keep them.
      </p>

      <SectionHeading>Who else is involved</SectionHeading>
      <p>
        We use a small number of companies to run the shop: Stripe for
        payments, Neon for our database and sign-in, and Vercel for hosting
        the website. Each of them only receives what they need to do their
        part. We don&apos;t sell your information to anyone, and we never will.
      </p>

      <SectionHeading>Cookies and your browser</SectionHeading>
      <p>
        Your bag and saved items are kept in your own browser, not on our
        servers — which is why they survive if you close the tab. If you sign
        in, we set a cookie so you stay signed in.
      </p>
      <p>
        We don&apos;t use advertising or analytics trackers. Nothing follows
        you around the internet after you leave.
      </p>

      <SectionHeading>How long we keep it</SectionHeading>
      <p>
        Order records are kept for six years, which is what tax rules require.
        Mailing list details are kept until you unsubscribe. Account details
        are kept until you ask us to close the account.
      </p>

      <SectionHeading>Your rights</SectionHeading>
      <p>
        You can ask for a copy of what we hold about you, ask us to correct it,
        or ask us to delete it. You can tell us to stop emailing you at any
        time. We&apos;ll always answer within a month.
      </p>
      <p>
        If we get something wrong and can&apos;t put it right, you can complain
        to the Information Commissioner&apos;s Office at ico.org.uk.
      </p>

      <NeedHelp>
        For anything about your information, message us on the{" "}
        <Link href="/contact" className="underline hover:text-gold-ink">
          contact page
        </Link>
        .
      </NeedHelp>
    </ContentPage>
  );
}
