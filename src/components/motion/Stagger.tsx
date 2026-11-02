"use client";

import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";
import { DURATION, EASE, TEMPO } from "./config";

type Tag = "div" | "section" | "ul" | "ol" | "li" | "span" | "nav";

const itemVariants: Record<"up" | "fade" | "scale", Variants> = {
  up: {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: DURATION.base * TEMPO, ease: EASE } },
  },
  fade: {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: DURATION.base * TEMPO, ease: EASE } },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.94 },
    show: { opacity: 1, scale: 1, transition: { duration: DURATION.base * TEMPO, ease: EASE } },
  },
};

/**
 * Parent that cascades a reveal through its StaggerItem children.
 * Usable from Server Components: pass any children, including async ones.
 */
export function Stagger({
  children,
  as = "div",
  className,
  mode = "inView",
  active = true,
  delay = 0.05,
  stagger = 0.09,
  amount = 0.12,
  once = true,
}: {
  children: ReactNode;
  as?: Tag;
  className?: string;
  mode?: "inView" | "mount";
  active?: boolean;
  delay?: number;
  stagger?: number;
  amount?: number;
  once?: boolean;
}) {
  const Tag = motion[as] as typeof motion.div;
  const animateProps =
    mode === "mount"
      ? { animate: active ? "show" : "hidden" }
      : { whileInView: "show", viewport: { once, amount, margin: "0px 0px -6% 0px" } };

  return (
    <Tag
      initial="hidden"
      {...animateProps}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger * TEMPO, delayChildren: delay * TEMPO } },
      }}
      className={className}
    >
      {children}
    </Tag>
  );
}

export function StaggerItem({
  children,
  as = "div",
  variant = "up",
  className,
}: {
  children: ReactNode;
  as?: Tag;
  variant?: "up" | "fade" | "scale";
  className?: string;
}) {
  const Tag = motion[as] as typeof motion.div;
  return (
    <Tag variants={itemVariants[variant]} className={className}>
      {children}
    </Tag>
  );
}
