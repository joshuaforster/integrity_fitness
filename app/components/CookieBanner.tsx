"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Phase = "idle" | "eating" | "gone";

type Bite = {
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  width: number;
  height: number;
  delay: number;
};

const BITES: Bite[] = [
  { top: "8%",  right: "12%", width: 26, height: 24, delay: 0.08 },
  { top: "38%", right: "4%",  width: 20, height: 20, delay: 0.32 },
  { bottom: "16%", left: "8%", width: 22, height: 20, delay: 0.58 },
];

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [phase, setPhase] = useState<Phase>("idle");

  useEffect(() => {
    try {
      if (!localStorage.getItem("ife-cookies-v1")) {
        const t = setTimeout(() => setVisible(true), 1500);
        return () => clearTimeout(t);
      }
    } catch {}
  }, []);

  function accept() {
    setPhase("eating");
    setTimeout(() => {
      try { localStorage.setItem("ife-cookies-v1", "1"); } catch {}
      setPhase("gone");
      setTimeout(() => setVisible(false), 380);
    }, 1800);
  }

  const eating = phase !== "idle";

  return (
    <AnimatePresence>
      {visible && (
        <motion.aside
          role="dialog"
          aria-label="Cookie consent"
          aria-modal="false"
          initial={{ opacity: 0, y: 28, scale: 0.95 }}
          animate={{ opacity: eating && phase === "gone" ? 0 : 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 18, scale: 0.93 }}
          transition={{ type: "spring", stiffness: 360, damping: 32 }}
          className="fixed bottom-6 right-6 z-[9997] w-[340px] max-w-[calc(100vw-2rem)] [backdrop-filter:blur(40px)_saturate(180%)_brightness(1.1)] bg-white/[0.12] border border-white/[0.28] rounded-2xl overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.10),inset_0_1px_0_rgba(255,255,255,0.65),inset_0_-1px_0_rgba(255,255,255,0.12)]"
        >
          {/* Brand red top bar */}
          <div className="h-[2px] bg-[#CE1A19]" aria-hidden="true" />

          <div className="px-6 pt-6 pb-5">

            {/* Emoji row */}
            <div
              className="flex justify-center items-end gap-5 mb-5"
              style={{ perspective: "900px" }}
            >
              {/* Cookie with bite overlays */}
              <div className="relative flex-shrink-0" style={{ width: 72, height: 72 }}>
                <motion.span
                  animate={eating
                    ? { rotateY: 0, rotateX: [0, -8, 0] }
                    : { rotateY: 360, rotateX: [0, 8, 0, -8, 0] }
                  }
                  transition={eating
                    ? { rotateY: { duration: 0.2 }, rotateX: { duration: 0.25 } }
                    : {
                        rotateY: { duration: 5, repeat: Infinity, ease: "linear" },
                        rotateX: { duration: 3.5, repeat: Infinity, ease: "easeInOut" },
                      }
                  }
                  className="select-none leading-none absolute inset-0 flex items-center justify-center"
                  style={{ fontSize: "64px", transformStyle: "preserve-3d" }}
                  aria-hidden="true"
                >
                  🍪
                </motion.span>

                {/* Bite marks — glass-coloured circles that pop over the cookie */}
                {BITES.map((bite, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={eating
                      ? { scale: 1, opacity: 1 }
                      : { scale: 0, opacity: 0 }
                    }
                    transition={{
                      type: "spring",
                      stiffness: 520,
                      damping: 20,
                      delay: bite.delay,
                    }}
                    className="absolute rounded-full [backdrop-filter:blur(8px)] bg-white/[0.70] border border-white/[0.55]"
                    style={{
                      width: bite.width,
                      height: bite.height,
                      top: bite.top,
                      bottom: bite.bottom,
                      left: bite.left,
                      right: bite.right,
                    }}
                    aria-hidden="true"
                  />
                ))}
              </div>

              {/* Glass of milk — drains away when eaten */}
              <motion.span
                animate={eating
                  ? { scaleY: 0, opacity: 0, y: 8 }
                  : { scaleY: 1, opacity: 1, y: 0 }
                }
                transition={{
                  duration: 1.0,
                  delay: eating ? 0.55 : 0,
                  ease: [0.4, 0, 0.8, 1],
                }}
                className="block select-none leading-none flex-shrink-0"
                style={{ fontSize: "56px", transformOrigin: "bottom center" }}
                aria-hidden="true"
              >
                🥛
              </motion.span>
            </div>

            {/* Label */}
            <p className="text-[#CE1A19] text-[9px] font-black uppercase tracking-[4px] text-center mb-3">
              Cookie Policy
            </p>

            {/* Copy */}
            <p className="text-zinc-900 text-sm leading-relaxed text-center mb-6">
              We use cookies. And as any good PT will tell you, all foods&nbsp;—
              including cookies&nbsp;— can be part of a{" "}
              <span className="font-bold text-zinc-950">healthy, balanced diet.</span>
            </p>

            {/* CTA — matches site Button primary exactly */}
            <motion.button
              type="button"
              whileHover={eating ? {} : { scale: 1.03 }}
              whileTap={eating ? {} : { scale: 0.96 }}
              onClick={accept}
              disabled={eating}
              className="w-full bg-[#CE1A19] hover:bg-red-700 disabled:bg-[#CE1A19]/70 text-white text-[11px] font-bold uppercase tracking-widest py-3.5 rounded-sm transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-[#CE1A19] focus-visible:ring-offset-2"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={eating ? "eating" : "idle"}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.18 }}
                  className="block"
                >
                  {eating ? "Enjoying…" : "I'll allow it (just this once) 😄"}
                </motion.span>
              </AnimatePresence>
            </motion.button>

            {/* Decline — site outline-dark tone adapted for light glass */}
            <button
              type="button"
              onClick={accept}
              disabled={eating}
              className="w-full mt-3 py-2.5 border border-zinc-300/70 hover:border-zinc-400 text-zinc-400 hover:text-zinc-600 text-[10px] font-bold uppercase tracking-widest rounded-sm transition-all duration-200 disabled:opacity-40 disabled:pointer-events-none outline-none focus-visible:ring-1 focus-visible:ring-zinc-400"
            >
              Decline
            </button>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
