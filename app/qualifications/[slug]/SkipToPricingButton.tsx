"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SkipToPricingButton() {
  const [show, setShow] = useState(false);
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

    const onScroll = () => setShow(window.scrollY > 250);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const scrollToPricing = () => {
    document.getElementById("pricing-section")?.scrollIntoView({ behavior: "smooth" });
  };

  const label = hasSeenPricing ? "Pricing" : "Skip to Pricing";

  return (
    <AnimatePresence>
      {show && !inPricing && (
        <motion.button
          key="skip-pricing"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 6 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
          onClick={scrollToPricing}
          aria-label="Jump to pricing section"
          className="fixed bottom-7 right-6 z-50 flex items-center gap-2 px-4 py-2.5 [backdrop-filter:blur(20px)_saturate(140%)] bg-zinc-950/[0.88] border border-white/[0.14] rounded-full shadow-[0_8px_24px_rgba(0,0,0,0.3)] text-white text-[11px] font-bold uppercase tracking-wider hover:bg-zinc-950 transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-[#CE1A19] focus-visible:ring-offset-2"
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
