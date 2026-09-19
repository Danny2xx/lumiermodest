import Link from "next/link";
import ContentPage, {
  SectionHeading,
  NeedHelp,
} from "@/components/ContentPage";

export const metadata = { title: "Returns — LumierModest" };

export default function ReturnsPage() {
  return (
    <ContentPage title="Returns">
      <p>
        We want you to love what you ordered. If it isn&apos;t right, you can
        send it back — here&apos;s exactly how that works.
      </p>

      <SectionHeading>Changing your mind</SectionHeading>
      <p>
        You have 14 days from the day your order arrives to tell us you&apos;d
        like to cancel it, for any reason at all. Once you&apos;ve told us, you
        have a further 14 days to send the pieces back.
      </p>
      <p>
        This applies to everything we sell, including anything bought in a
        sale or from Last Chance.
      </p>

      <SectionHeading>Condition</SectionHeading>
      <p>
        Please return pieces unworn and unwashed, with their tags still
        attached. You&apos;re welcome to try something on the way you would in
        a fitting room — but if a piece comes back showing more wear than
        that, we may reduce your refund to reflect its condition.
      </p>

      <SectionHeading>Starting a return</SectionHeading>
      <p>
        Message us through the{" "}
        <Link href="/contact" className="underline hover:text-gold-ink">
          contact page
        </Link>{" "}
        or on WhatsApp with your order reference, which is on your receipt and
        in{" "}
        <Link href="/account" className="underline hover:text-gold-ink">
          your account
        </Link>
        . We&apos;ll reply with the return address and what to do next.
      </p>

      <SectionHeading>Who pays the postage</SectionHeading>
      <p>
        You cover the cost of sending a piece back to us when you&apos;ve
        changed your mind, including on orders that had free delivery. We
        recommend a tracked service — until it reaches us, it&apos;s still your
        parcel.
      </p>
      <p>
        If something is faulty or we sent the wrong thing, we pay the return
        postage. You&apos;ll never be out of pocket for our mistake.
      </p>

      <SectionHeading>Your refund</SectionHeading>
      <p>
        We refund to the card you paid with, within 14 days of your return
        reaching us. Your bank usually takes a few more days to show it.
      </p>
      <p>
        When you cancel a whole order within the 14 days, we also refund what
        you paid for standard delivery. If you chose express delivery, we
        refund the standard rate and keep the difference for the upgrade. When
        you keep part of an order, delivery isn&apos;t refunded.
      </p>

      <SectionHeading>Faulty or damaged</SectionHeading>
      <p>
        If a piece arrives damaged or develops a fault, tell us as soon as you
        can and send a photo if you&apos;re able. Within 30 days of delivery
        you&apos;re entitled to a full refund. After that we&apos;ll repair or
        replace it, and if neither is possible you can still have your money
        back.
      </p>

      <SectionHeading>Exchanges</SectionHeading>
      <p>
        The quickest way to swap a size is to order the one you want and
        return the original — that way the piece you need is reserved for you
        rather than waiting on the post.
      </p>

      <NeedHelp>
        Not sure about any of this? Ask us on the{" "}
        <Link href="/contact" className="underline hover:text-gold-ink">
          contact page
        </Link>{" "}
        — we&apos;d rather sort it out than have you guessing. Nothing here
        affects your legal rights.
      </NeedHelp>
    </ContentPage>
  );
}
