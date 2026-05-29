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
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 12 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          onClick={scrollToPricing}
          aria-label="Jump to pricing section"
          className="fixed top-24 right-5 z-40 flex items-center gap-2 px-4 py-2 [backdrop-filter:blur(20px)_saturate(140%)] bg-zinc-950/[0.82] border border-white/[0.12] rounded-full shadow-[0_4px_16px_rgba(0,0,0,0.25)] text-white text-[10px] font-bold uppercase tracking-widest hover:bg-zinc-950/[0.95] transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-[#CE1A19]"
        >
          <svg
            className="w-2.5 h-2.5 text-[#CE1A19] flex-shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
          <span>{label}</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
