"use client";
import { motion } from "framer-motion";

interface CalcLoadingStateProps {
  fact: string;
}

export function CalcLoadingState({ fact }: CalcLoadingStateProps) {
  return (
    <div className="bg-white px-8 py-14 flex flex-col items-center text-center">
      <div className="relative w-14 h-14 mb-7">
        <svg
          className="w-14 h-14 text-zinc-100"
          viewBox="0 0 56 56"
          fill="none"
          aria-hidden="true"
        >
          <circle cx="28" cy="28" r="24" stroke="currentColor" strokeWidth="5" />
        </svg>
        <svg
          className="w-14 h-14 absolute inset-0 animate-spin text-[#CE1A19]"
          viewBox="0 0 56 56"
          fill="none"
          style={{ animationDuration: "0.9s" }}
          aria-hidden="true"
        >
          <circle
            cx="28"
            cy="28"
            r="24"
            stroke="currentColor"
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray="38 114"
          />
        </svg>
      </div>
      <p className="text-xs font-bold tracking-widest uppercase text-[#CE1A19] mb-2">
        Did you know?
      </p>
      <motion.p
        className="text-sm text-zinc-600 max-w-sm leading-relaxed"
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {fact}
      </motion.p>
    </div>
  );
}
