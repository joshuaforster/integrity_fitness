"use client";

import { motion } from "framer-motion";
import React from "react";

export type Value = {
  icon: React.ComponentType;
  title: string;
  description: string;
};

export default function ValueCard({ value }: { value: Value }) {
  return (
    <div className="flex flex-col items-start text-left border-l-2 border-zinc-200 pl-6 first:border-l-0 first:pl-0">
      <motion.div
        className="w-12 h-12 flex items-center justify-center text-[#CE1A19] mb-5"
        aria-hidden="true"
        whileHover={{ scale: 1.15 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
      >
        <value.icon />
      </motion.div>
      <h3 className="text-zinc-950 text-sm font-extrabold uppercase tracking-[2px] mb-3">
        {value.title}
      </h3>
      <p className="text-zinc-600 text-sm md:text-base leading-relaxed">
        {value.description}
      </p>
    </div>
  );
}
