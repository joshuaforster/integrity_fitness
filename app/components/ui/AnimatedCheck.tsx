"use client";

import { motion } from "framer-motion";

interface Props {
  color?: string;
  size?: number;
  delay?: number;
}

export default function AnimatedCheck({ color = "#CE1A19", size = 16, delay = 0 }: Props) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className="flex-shrink-0 mt-0.5"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.5 }}
    >
      <motion.circle
        cx="8"
        cy="8"
        r="7"
        stroke={color}
        strokeWidth="1.5"
        fill="none"
        variants={{
          hidden: { pathLength: 0, opacity: 0 },
          visible: {
            pathLength: 1,
            opacity: 1,
            transition: { duration: 0.5, delay, ease: "easeInOut" },
          },
        }}
      />
      <motion.path
        d="M5 8L7.2 10.2L11 6"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        variants={{
          hidden: { pathLength: 0, opacity: 0 },
          visible: {
            pathLength: 1,
            opacity: 1,
            transition: { duration: 0.3, delay: delay + 0.38, ease: "easeInOut" },
          },
        }}
      />
    </motion.svg>
  );
}
