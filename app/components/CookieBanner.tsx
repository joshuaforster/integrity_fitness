"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Phase = "idle" | "eating" | "gone";

type Crumb = { x: number; y: number; rotate: number; delay: number; size: number };

const CRUMBS: Crumb[] = [
  { x:  42, y: 55,  rotate: 120,  delay: 0.04, size: 10 },
  { x: -38, y: 72,  rotate: -85,  delay: 0.36, size: 8  },
  { x:  28, y: 95,  rotate: 200,  delay: 0.68, size: 7  },
  { x: -18, y: 110, rotate: -40,  delay: 1.00, size: 5  },
];

// Cookie scale: full → big bite wobble → smaller → another bite wobble → gone
const COOKIE_KEYS  = [1, 1.12, 0.75, 1.08, 0.48, 1.04, 0.18, 0];
const COOKIE_TIMES = [0, 0.06, 0.18, 0.40, 0.52, 0.72, 0.88, 1 ];

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
    }, 2000);
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
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 18, scale: 0.93 }}
          transition={{ type: "spring", stiffness: 360, damping: 32 }}
          className="fixed bottom-6 right-6 z-[9997] w-[340px] max-w-[calc(100vw-2rem)] [backdrop-filter:blur(40px)_saturate(130%)_brightness(0.88)] bg-zinc-950/[0.88] border border-white/[0.12] rounded-2xl overflow-hidden shadow-[0_16px_48px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.08)]"
        >
          <div className="px-6 pt-7 pb-5 relative">

            {/* Emoji row */}
            <div
              className="flex justify-center items-end gap-6 mb-5"
              style={{ perspective: "900px" }}
            >
              {/* Cookie — shrinks in bite-sized steps, crumbs fly out */}
              <div className="relative flex-shrink-0" style={{ width: 72, height: 72 }}>

                <motion.span
                  animate={
                    eating
                      ? { scale: COOKIE_KEYS, rotateY: 0 }
                      : { rotateY: 360, rotateX: [0, 8, 0, -8, 0] }
                  }
                  transition={
                    eating
                      ? { duration: 1.85, times: COOKIE_TIMES, ease: "easeInOut" }
                      : {
                          rotateY: { duration: 5, repeat: Infinity, ease: "linear" },
                          rotateX: { duration: 3.5, repeat: Infinity, ease: "easeInOut" },
                        }
                  }
                  className="select-none leading-none absolute inset-0 flex items-center justify-center"
                  style={{ fontSize: "62px", transformStyle: "preserve-3d" }}
                  aria-hidden="true"
                >
                  🍪
                </motion.span>

                {/* Crumbs — fly downward staying within card */}
                {CRUMBS.map((c, i) => (
                  <motion.span
                    key={i}
                    initial={{ x: 0, y: 0, opacity: 0, rotate: 0, scale: 0 }}
                    animate={
                      eating
                        ? {
                            x: c.x,
                            y: c.y,
                            opacity: [0, 0.9, 0.9, 0],
                            rotate: c.rotate,
                            scale: [0, 1, 1, 0],
                          }
                        : { x: 0, y: 0, opacity: 0, rotate: 0, scale: 0 }
                    }
                    transition={{
                      duration: 0.75,
                      delay: c.delay,
                      ease: "easeOut",
                      opacity: { times: [0, 0.08, 0.65, 1] },
                      scale:   { times: [0, 0.08, 0.65, 1] },
                    }}
                    className="absolute rounded-full bg-amber-800 pointer-events-none select-none"
                    style={{
                      width: c.size,
                      height: c.size,
                      top: "50%",
                      left: "50%",
                      marginTop: -(c.size / 2),
                      marginLeft: -(c.size / 2),
                    }}
                    aria-hidden="true"
                  />
                ))}
              </div>

              {/* Milk — drains from the bottom up */}
              <motion.span
                animate={
                  eating
                    ? { scaleY: 0, opacity: 0, y: 6 }
                    : { scaleY: 1, opacity: 1, y: 0 }
                }
                transition={{
                  duration: 1.1,
                  delay: eating ? 0.55 : 0,
                  ease: [0.4, 0, 0.8, 1],
                }}
                className="block select-none leading-none flex-shrink-0"
                style={{ fontSize: "54px", transformOrigin: "bottom center" }}
                aria-hidden="true"
              >
                🥛
              </motion.span>
            </div>

            {/* Label */}
            <p className="text-[#CE1A19] text-[9px] font-black uppercase tracking-[4px] text-center mb-3">
              Cookie Policy
            </p>

            {/* Copy — full white */}
            <p className="text-white/75 text-sm leading-relaxed text-center mb-6">
              We use cookies. And as any good PT will tell you, all foods&nbsp;—
              including cookies&nbsp;— can be part of a{" "}
              <span className="text-white font-bold">healthy, balanced diet.</span>
            </p>

            {/* CTA */}
            <motion.button
              type="button"
              whileHover={eating ? {} : { scale: 1.03 }}
              whileTap={eating ? {} : { scale: 0.96 }}
              onClick={accept}
              disabled={eating}
              className="w-full bg-[#CE1A19] hover:bg-red-700 disabled:bg-[#CE1A19]/60 text-white text-[11px] font-bold uppercase tracking-widest py-3.5 rounded-sm transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-[#CE1A19] focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={eating ? "e" : "i"}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.15 }}
                  className="block"
                >
                  {eating ? "Enjoying…" : "I'll allow it (just this once) 😄"}
                </motion.span>
              </AnimatePresence>
            </motion.button>

            {/* Decline */}
            <button
              type="button"
              onClick={accept}
              disabled={eating}
              className="w-full mt-3 py-2.5 border border-white/[0.10] hover:border-white/[0.22] text-white/35 hover:text-white/60 text-[10px] font-bold uppercase tracking-widest rounded-sm transition-all duration-200 disabled:opacity-30 disabled:pointer-events-none outline-none focus-visible:ring-1 focus-visible:ring-white/30"
            >
              Decline
            </button>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
