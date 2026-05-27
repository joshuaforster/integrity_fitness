"use client";

import { motion, type Variants } from "framer-motion";
import AnimatedCheck from "@/app/components/ui/AnimatedCheck";

export type Differentiator = {
  title: string;
  description: string;
};

const contentVariant: Variants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: "easeOut", delay: 0.12 } },
};

export default function DifferentiatorItem({ item }: { item: Differentiator }) {
  return (
    <div className="flex items-start gap-4 group">
      <AnimatedCheck size={18} delay={0} />
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
