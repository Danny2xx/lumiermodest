"use client";

import { motion } from "motion/react";
import { DURATION, EASE } from "./config";

type Tag = "h1" | "h2" | "h3" | "p" | "span" | "div";

const NBSP = String.fromCharCode(160);

/**
 * Editorial text reveal: each word (or character) rises out of a mask.
 * Screen readers get the full string via aria-label; the fragments are hidden.
 */
export default function SplitText({
  text,
  as = "span",
  by = "word",
  mode = "inView",
  active = true,
  delay = 0,
  stagger = 0.08,
  duration = DURATION.slow,
  once = true,
  className,
}: {
  text: string;
  as?: Tag;
  by?: "word" | "char";
  mode?: "inView" | "mount";
  active?: boolean;
  delay?: number;
  stagger?: number;
  duration?: number;
  once?: boolean;
  className?: string;
}) {
  const Tag = motion[as] as typeof motion.span;
  const words = text.split(" ");
  const animateProps =
    mode === "mount"
      ? { animate: active ? "show" : "hidden" }
      : { whileInView: "show", viewport: { once, amount: 0.6 } };

  const piece = (content: string, key: string) => (
    <span
      key={key}
      aria-hidden
      className="inline-block overflow-hidden align-bottom pb-[0.14em] -mb-[0.14em] px-[0.06em] -mx-[0.06em]"
    >
      <motion.span
        className="inline-block"
        variants={{
          hidden: { y: "120%", opacity: 0, rotate: 2 },
          show: { y: 0, opacity: 1, rotate: 0 },
        }}
        transition={{ duration, ease: EASE }}
      >
        {content}
      </motion.span>
    </span>
  );

  return (
    <Tag
      aria-label={text}
      initial="hidden"
      {...animateProps}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
      className={className}
    >
      {words.map((word, wi) => (
        <span key={`${word}-${wi}`} className="inline-block whitespace-nowrap">
          {by === "char"
            ? Array.from(word).map((ch, ci) => piece(ch, `${wi}-${ci}`))
            : piece(word, `${wi}`)}
          {wi < words.length - 1 ? (
            <span aria-hidden className="inline-block">
              {NBSP}
            </span>
          ) : null}
        </span>
      ))}
    </Tag>
  );
}
