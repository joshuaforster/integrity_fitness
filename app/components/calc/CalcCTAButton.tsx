"use client";
import { motion, AnimatePresence } from "framer-motion";

interface CalcCTAButtonProps {
  calcState: "idle" | "loading" | "done";
  onClick: () => void;
  idleLabel?: string;
  doneLabel?: string;
  loadingLabel?: string;
  className?: string;
}

export function CalcCTAButton({
  calcState,
  onClick,
  idleLabel = "Calculate",
  doneLabel = "Recalculate",
  loadingLabel = "Analysing…",
  className = "",
}: CalcCTAButtonProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={calcState === "loading"}
      whileHover={calcState !== "loading" ? { scale: 1.02 } : {}}
      whileTap={calcState !== "loading" ? { scale: 0.97 } : {}}
      transition={{ duration: 0.15, ease: "easeOut" }}
      className={`relative overflow-hidden bg-[#CE1A19] hover:bg-red-700 disabled:bg-red-400 text-white font-bold uppercase tracking-widest text-sm px-10 py-3.5 rounded-lg shadow-[0_2px_12px_rgba(206,26,25,0.3)] hover:shadow-[0_4px_20px_rgba(206,26,25,0.45)] transition-all duration-200 flex items-center justify-center gap-3 ${className}`}
    >
      <AnimatePresence mode="wait">
        {calcState === "loading" ? (
          <motion.span
            key="loading"
            className="flex items-center gap-2"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            <svg
              className="w-4 h-4 animate-spin"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="3"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4l3-3-3-3V0a12 12 0 00-12 12h4z"
              />
            </svg>
            {loadingLabel}
          </motion.span>
        ) : calcState === "done" ? (
          <motion.span
            key="done"
            className="flex items-center gap-2"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            <svg
              className="w-4 h-4"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M3 8l3.5 3.5L13 4.5" />
            </svg>
            {doneLabel}
          </motion.span>
        ) : (
          <motion.span
            key="idle"
            className="flex items-center gap-2"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            {idleLabel}
            <svg
              className="w-4 h-4"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </motion.span>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {calcState === "loading" && (
          <motion.span
            key="shimmer"
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            initial={{ x: "-100%" }}
            animate={{ x: "200%" }}
            transition={{ duration: 0.75, ease: "easeInOut", repeat: Infinity }}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>
    </motion.button>
  );
}
