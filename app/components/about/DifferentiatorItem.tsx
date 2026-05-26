"use client";

import { motion, type Variants } from "framer-motion";

export type Differentiator = {
  title: string;
  description: string;
};

const dotVariant: Variants = {
  hidden: { scale: 0, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 0.35, ease: "easeOut" } },
};

const contentVariant: Variants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: "easeOut", delay: 0.12 } },
};

export default function DifferentiatorItem({ item }: { item: Differentiator }) {
  return (
    <div className="flex items-start gap-4 group">
      <motion.span
        className="w-2 h-2 bg-[#CE1A19] mt-1.5 flex-shrink-0 rounded-sm"
        aria-hidden="true"
        variants={dotVariant}
      />
      <motion.div variants={contentVariant}>
        <h3 className="text-sm font-extrabold text-zinc-950 tracking-wide uppercase mb-1">
          {item.title}
        </h3>
        <p className="text-zinc-600 text-sm md:text-base leading-relaxed">
          {item.description}
        </p>
      </motion.div>
    </div>
  );
}
