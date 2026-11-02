"use client";

import { motion } from "motion/react";

const PATHS = [
  "M2 38C18 34 30 24 34 2",
  "M8 34C10 30 10 27 8 24",
  "M14 28C16 24 16 21 14 18",
  "M20 21C22 17 22 14 20 11",
  "M26 13C28 10 28 7 26 4",
];

export default function Laurel({
  flip = false,
  className = "",
  draw = false,
  delay = 0,
}: {
  flip?: boolean;
  className?: string;
  /** Stroke the leaves in when scrolled into view. */
  draw?: boolean;
  delay?: number;
}) {
  const svgProps = {
    viewBox: "0 0 60 40",
    className: `${flip ? "-scale-x-100" : ""} ${className}`,
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.3,
    strokeLinecap: "round" as const,
    "aria-hidden": true,
  };

  if (!draw) {
    return (
      <svg {...svgProps}>
        {PATHS.map((d) => (
          <path key={d} d={d} />
        ))}
      </svg>
    );
  }

  return (
    <motion.svg
      {...svgProps}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.6 }}
    >
      {PATHS.map((d, i) => (
        <motion.path
          key={d}
          d={d}
          custom={i}
          variants={{
            hidden: { pathLength: 0, opacity: 0 },
            show: (index: number) => ({
              pathLength: 1,
              opacity: 1,
              transition: {
                duration: index === 0 ? 1 : 0.6,
                delay: delay + index * 0.12,
                ease: "easeOut",
              },
            }),
          }}
        />
      ))}
    </motion.svg>
  );
}
