"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface SectionHeaderProps {
  label: string;
  heading: ReactNode;
  id?: string;
  theme?: "light" | "dark";
  align?: "left" | "center";
  headingSize?: "xs" | "sm" | "md" | "lg";
  bar?: boolean;
  labelColor?: string;
}

const headingSizeMap = {
  xs: "text-2xl md:text-3xl",
  sm: "text-3xl md:text-4xl",
  md: "text-3xl md:text-5xl",
  lg: "text-4xl md:text-5xl",
};

export default function SectionHeader({
  label,
  heading,
  id,
  theme = "light",
  align = "left",
  headingSize = "md",
  bar = true,
  labelColor = "text-[#CE1A19]",
}: SectionHeaderProps) {
  const centered = align === "center";
  const headingColor = theme === "dark" ? "text-white" : "text-zinc-950";

  return (
    <motion.div
      className={centered ? "text-center" : undefined}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.4 }}
      transition={{ duration: 0.75, ease: "easeOut" }}
    >
      <p className={`text-xs font-bold tracking-[4px] uppercase mb-4 ${labelColor}`}>
        {label}
      </p>
      <h2
        id={id}
        className={`${headingSizeMap[headingSize]} font-black tracking-tight leading-tight uppercase ${headingColor}`}
      >
        {heading}
      </h2>
      {bar && (
        <motion.div
          className={`h-1 bg-[#CE1A19] mt-6 origin-left ${centered ? "mx-auto" : ""}`}
          style={{ width: "3.5rem" }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
          aria-hidden="true"
        />
      )}
    </motion.div>
  );
}
