"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CyclingTextProps {
  phrases: string[];
  interval?: number;
  className?: string;
}

export default function CyclingText({ phrases, interval = 2600, className = "" }: CyclingTextProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % phrases.length), interval);
    return () => clearInterval(id);
  }, [phrases.length, interval]);

  return (
    <span className={`relative inline-block overflow-hidden ${className}`} aria-live="polite">
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
          className="block"
        >
          {phrases[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
