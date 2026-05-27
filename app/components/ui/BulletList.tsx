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
          <AnimatedCheck size={16} delay={0} color={bulletColor === "red" ? "#CE1A19" : "#a1a1aa"} />
          <p className={`text-sm md:text-base leading-relaxed ${textColor}`}>{item}</p>
        </motion.li>
      ))}
    </motion.ul>
  );
}
