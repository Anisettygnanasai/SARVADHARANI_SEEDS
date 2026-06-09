import { Variants } from 'framer-motion';

// ─── Fade Up Variants ─────────────────────────────────────────────────────────
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

// ─── Fade In ───────────────────────────────────────────────────────────────────
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
  },
};

// ─── Scale In ─────────────────────────────────────────────────────────────────
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.34, 1.56, 0.64, 1] },
  },
};

// ─── Slide In From Left ───────────────────────────────────────────────────────
export const slideLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

// ─── Slide In From Right ──────────────────────────────────────────────────────
export const slideRight: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

// ─── Stagger Container ────────────────────────────────────────────────────────
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

// ─── Stagger Container Fast ───────────────────────────────────────────────────
export const staggerContainerFast: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
};

// ─── Card Hover ───────────────────────────────────────────────────────────────
export const cardHover = {
  rest: { scale: 1, y: 0 },
  hover: {
    scale: 1.02,
    y: -8,
    transition: { duration: 0.4, ease: [0.34, 1.56, 0.64, 1] },
  },
};

// ─── Button Tap ───────────────────────────────────────────────────────────────
export const buttonTap = {
  tap: { scale: 0.97 },
};

// ─── Word Reveal (for headline animations) ────────────────────────────────────
export const wordReveal: Variants = {
  hidden: { y: '110%', opacity: 0 },
  visible: (i: number) => ({
    y: '0%',
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
      delay: i * 0.08,
    },
  }),
};

// ─── Number Counter ───────────────────────────────────────────────────────────
export const counterVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
      delay: i * 0.15,
    },
  }),
};

// ─── Page Transition ──────────────────────────────────────────────────────────
export const pageTransition: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
  },
};

// ─── Floating Animation ───────────────────────────────────────────────────────
export const floatAnimation = {
  y: [0, -20, 0],
  transition: {
    duration: 6,
    repeat: Infinity,
    ease: 'easeInOut',
  },
};

// ─── Sway Animation ───────────────────────────────────────────────────────────
export const swayAnimation = (delay = 0) => ({
  rotate: [-2, 2, -2],
  transition: {
    duration: 5 + delay,
    repeat: Infinity,
    ease: 'easeInOut',
    delay,
  },
});

// ─── Modal Open/Close ─────────────────────────────────────────────────────────
export const modalVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.34, 1.56, 0.64, 1] },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 20,
    transition: { duration: 0.25, ease: [0.4, 0, 0.2, 1] },
  },
};

export const backdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};
