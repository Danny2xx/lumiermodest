"use client";

import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";
import { DURATION, EASE, TEMPO } from "./config";

type Tag = "div" | "section" | "p" | "h1" | "h2" | "h3" | "span" | "li" | "figure" | "header";
type Variant = "up" | "down" | "fade" | "scale" | "blur" | "left" | "right";

const variants: Record<Variant, Variants> = {
  up: { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0 } },
  down: { hidden: { opacity: 0, y: -20 }, show: { opacity: 1, y: 0 } },
  fade: { hidden: { opacity: 0 }, show: { opacity: 1 } },
  scale: { hidden: { opacity: 0, scale: 0.95 }, show: { opacity: 1, scale: 1 } },
  blur: {
    hidden: { opacity: 0, filter: "blur(10px)" },
    show: { opacity: 1, filter: "blur(0px)" },
  },
  left: { hidden: { opacity: 0, x: -32 }, show: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: 32 }, show: { opacity: 1, x: 0 } },
};

export type RevealProps = {
  children: ReactNode;
  as?: Tag;
  variant?: Variant;
  /** inView animates when scrolled into view; mount animates immediately. */
  mode?: "inView" | "mount";
  /** With mode="mount", hold in the hidden state until this becomes true. */
  active?: boolean;
  delay?: number;
  duration?: number;
  once?: boolean;
  /** Fraction of the element that must be visible before it plays. */
  amount?: number;
  className?: string;
};

export default function Reveal({
  children,
  as = "div",
  variant = "up",
  mode = "inView",
  active = true,
  delay = 0,
  duration = DURATION.base,
  once = true,
  amount = 0.2,
  className,
}: RevealProps) {
  const Tag = motion[as] as typeof motion.div;
  const animateProps =
    mode === "mount"
      ? { animate: active ? "show" : "hidden" }
      : {
          whileInView: "show",
          viewport: { once, amount, margin: "0px 0px -6% 0px" },
        };

  return (
    <Tag
      initial="hidden"
      {...animateProps}
      variants={variants[variant]}
      transition={{ duration: duration * TEMPO, delay: delay * TEMPO, ease: EASE }}
      className={className}
    >
      {children}
    </Tag>
  );
}
