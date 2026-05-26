"use client";

import { motion, type Variants } from "framer-motion";
import AnimatedCheck from "./AnimatedCheck";

interface BulletListProps {
  items: string[];
  bulletColor?: "red" | "zinc";
  textColor?: string;
}

const listVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const dotVariants: Variants = {
  hidden: { scale: 0, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 0.35, ease: "backOut" } },
};

export default function BulletList({
  items,
  bulletColor = "red",
  textColor = "text-zinc-600",
}: BulletListProps) {
  return (
    <motion.ul
      className="space-y-4"
      role="list"
      variants={listVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.1 }}
    >
      {items.map((item) => (
        <motion.li key={item} className="flex items-start gap-3" variants={itemVariants}>
          {bulletColor === "red" ? (
            <AnimatedCheck size={16} delay={0} />
          ) : (
            <motion.span
              className="w-1.5 h-1.5 mt-2 flex-shrink-0 rounded-xs bg-zinc-300"
              aria-hidden="true"
              variants={dotVariants}
            />
          )}
          <p className={`text-sm md:text-base leading-relaxed ${textColor}`}>{item}</p>
        </motion.li>
      ))}
    </motion.ul>
  );
}
