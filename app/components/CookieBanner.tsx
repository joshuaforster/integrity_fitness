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
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 360, damping: 32 }}
          className="fixed bottom-6 right-6 z-[9997] w-[340px] max-w-[calc(100vw-2rem)] [backdrop-filter:blur(40px)_saturate(130%)_brightness(0.88)] bg-zinc-950/[0.92] border border-white/[0.14] rounded-2xl overflow-hidden shadow-[0_16px_48px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.08)]"
        >
          {/* Brand-red top line */}
          <div className="h-[2px] bg-[#CE1A19]" aria-hidden="true" />

          <div className="px-6 pt-6 pb-5 relative">

            {/* Faint red ambient — kept very subtle */}
            <div
              className="absolute top-4 left-1/2 -translate-x-1/2 w-32 h-16 bg-[#CE1A19]/[0.08] rounded-full blur-2xl pointer-events-none"
              aria-hidden="true"
            />

            {/* 3D spinning cookie */}
            <div
              className="flex justify-center mb-4 relative z-10"
              style={{ perspective: "900px" }}
            >
              <motion.span
                animate={{
                  rotateY: 360,
                  rotateX: [0, 10, 0, -10, 0],
                }}
                transition={{
                  rotateY: { duration: 5, repeat: Infinity, ease: "linear" },
                  rotateX: { duration: 3.5, repeat: Infinity, ease: "easeInOut" },
                }}
                className="block select-none leading-none"
                style={{ fontSize: "64px", transformStyle: "preserve-3d" }}
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
            <p className="text-white/80 text-sm leading-relaxed text-center mb-6">
              We use cookies. And as any good PT will tell you, all foods&nbsp;—
              including cookies&nbsp;— can be part of a{" "}
              <span className="text-white font-bold">healthy, balanced diet.</span>
            </p>

            {/* CTA — matches site Button primary */}
            <motion.button
              type="button"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              onClick={accept}
              className="w-full bg-[#CE1A19] hover:bg-red-700 text-white text-[11px] font-bold uppercase tracking-widest py-3.5 rounded-sm transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
            >
              I&apos;ll allow it (just this once) 😄
            </motion.button>

            {/* Decline — matches site outline-dark tone */}
            <button
              type="button"
              onClick={accept}
              className="w-full text-center border border-white/[0.10] hover:border-white/[0.22] text-white/40 hover:text-white/70 text-[10px] font-bold uppercase tracking-widest mt-3 py-2.5 rounded-sm transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-white/30"
            >
              Decline
            </button>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
