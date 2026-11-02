/** Shared easing + timing so every animation on the site feels like one system. */
export const EASE = [0.22, 1, 0.36, 1] as const;
export const EASE_IN_OUT = [0.76, 0, 0.24, 1] as const;

export const DURATION = {
  fast: 0.25,
  base: 0.6,
  slow: 0.9,
} as const;

export const SPRING = {
  drawer: { type: "spring", stiffness: 320, damping: 34, mass: 0.9 },
  pop: { type: "spring", stiffness: 500, damping: 26 },
  soft: { type: "spring", stiffness: 220, damping: 26 },
} as const;

/** Fired by the Preloader the moment its curtain starts lifting. */
export const INTRO_DONE_EVENT = "lm:intro-done";
export const INTRO_STORAGE_KEY = "lm-intro";
