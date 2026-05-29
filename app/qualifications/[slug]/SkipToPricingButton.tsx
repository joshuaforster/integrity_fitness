"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SkipToPricingButton() {
  const [inPricing, setInPricing] = useState(false);
  const [hasSeenPricing, setHasSeenPricing] = useState(false);

  useEffect(() => {
    const pricingEl = document.getElementById("pricing-section");
    if (!pricingEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInPricing(entry.isIntersecting);
        if (entry.isIntersecting) setHasSeenPricing(true);
      },
      { threshold: 0.1 }
    );
    observer.observe(pricingEl);
    return () => observer.disconnect();
  }, []);

  function scrollToPricing() {
    const el = document.getElementById("pricing-section");
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 88;
    window.scrollTo({ top, behavior: "smooth" });
  }

  const label = hasSeenPricing ? "Pricing" : "Skip to Pricing";

  return (
    <AnimatePresence>
      {!inPricing && (
        <motion.button
          key="skip-pricing"
          type="button"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.28, ease: "easeOut", delay: 0.5 }}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.93 }}
          onClick={scrollToPricing}
          aria-label="Scroll to pricing section"
          style={{
            bottom: "max(5.25rem, calc(env(safe-area-inset-bottom) + 4.75rem))",
          }}
          className="fixed right-6 z-[140] flex items-center gap-2 px-4 py-2.5 [backdrop-filter:blur(20px)_saturate(140%)] bg-zinc-950/[0.88] border border-white/[0.12] rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.35)] text-white text-[10px] font-bold uppercase tracking-widest hover:bg-zinc-950 transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-[#CE1A19]"
        >
          <span>{label}</span>
          <svg
            className="w-3 h-3 text-[#CE1A19] flex-shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
