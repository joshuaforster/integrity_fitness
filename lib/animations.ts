import { type Variants } from "framer-motion";

// Stagger container — wrap a list of animated children
export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

// Slide-in-from-left child — use inside staggerContainer
export const slideInItem: Variants = {
  hidden: { opacity: 0, x: -12 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

// Cards that fade up with a per-card stagger delay (pass index as `custom` prop)
export const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: i * 0.14, ease: "easeOut" },
  }),
};

// Simple scroll-triggered fade up — for section headers and body blocks
export const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: false as const, amount: 0.2 as const },
  transition: { duration: 0.7, ease: "easeOut" as const },
} as const;
