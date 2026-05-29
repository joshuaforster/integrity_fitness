"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem("ife-cookies-v1")) {
        const t = setTimeout(() => setVisible(true), 1500);
        return () => clearTimeout(t);
      }
    } catch {}
  }, []);

  function accept() {
    try { localStorage.setItem("ife-cookies-v1", "1"); } catch {}
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.aside
          role="dialog"
          aria-label="Cookie consent"
          aria-modal="false"
          initial={{ opacity: 0, y: 40, scale: 0.92, x: 12 }}
          animate={{ opacity: 1, y: 0, scale: 1, x: 0 }}
          exit={{ opacity: 0, scale: 0.88, y: 20, x: 20 }}
          transition={{ type: "spring", stiffness: 340, damping: 28 }}
          className="fixed bottom-6 right-6 z-[9997] w-[360px] max-w-[calc(100vw-2rem)] [backdrop-filter:blur(56px)_saturate(180%)_brightness(0.82)] bg-zinc-950/[0.94] border border-white/[0.14] rounded-3xl overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.75),0_8px_32px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.09),inset_0_-1px_0_rgba(255,255,255,0.03)]"
        >
          {/* Top gradient accent */}
          <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#CE1A19] to-transparent" aria-hidden="true" />

          <div className="px-7 pt-7 pb-6 relative">

            {/* Ambient red glow behind cookie */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 w-40 h-20 bg-[#CE1A19]/[0.12] rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

            {/* 3D spinning cookie */}
            <div
              className="flex justify-center mb-5 relative z-10"
              style={{ perspective: "900px" }}
            >
              <motion.span
                animate={{
                  rotateY: 360,
                  rotateX: [0, 8, 0, -8, 0],
                }}
                transition={{
                  rotateY: { duration: 5, repeat: Infinity, ease: "linear" },
                  rotateX: { duration: 3.5, repeat: Infinity, ease: "easeInOut" },
                }}
                className="block select-none leading-none"
                style={{
                  fontSize: "72px",
                  transformStyle: "preserve-3d",
                  filter: "drop-shadow(0 8px 28px rgba(0,0,0,0.6)) drop-shadow(0 2px 8px rgba(206,26,25,0.15))",
                }}
                aria-hidden="true"
              >
                🍪
              </motion.span>
            </div>

            {/* Label */}
            <p className="text-[#CE1A19] text-[9px] font-black uppercase tracking-[4px] text-center mb-3">
              Cookie Policy
            </p>

            {/* Copy */}
            <p className="text-white text-[13px] leading-[1.65] font-medium text-center mb-6">
              We use cookies. And as any good PT will tell you, all foods&nbsp;—
              including cookies&nbsp;— can be part of a{" "}
              <span className="text-white font-bold">healthy, balanced diet.</span>
            </p>

            {/* CTA */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
              onClick={accept}
              className="w-full bg-[#CE1A19] hover:bg-red-700 text-white text-[11px] font-black uppercase tracking-widest py-3.5 rounded-xl transition-colors duration-200 shadow-[0_6px_20px_rgba(206,26,25,0.45),0_2px_8px_rgba(206,26,25,0.3)] outline-none focus-visible:ring-2 focus-visible:ring-white/50"
            >
              I&apos;ll allow it (just this once) 😄
            </motion.button>

            {/* Dismiss */}
            <button
              type="button"
              onClick={accept}
              className="w-full text-center text-white/30 hover:text-white/55 text-[9px] font-bold uppercase tracking-[3px] mt-3 transition-colors duration-200 outline-none focus-visible:text-white/60"
            >
              Decline
            </button>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
