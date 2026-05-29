"use client";

import { useState, useEffect } from "react";

export default function SkipToPricingButton() {
  const [inPricing, setInPricing] = useState(false);
  const [hasSeenPricing, setHasSeenPricing] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 500);
    return () => clearTimeout(t);
  }, []);

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
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const show = visible && !inPricing;

  return (
    <button
      type="button"
      onClick={scrollToPricing}
      aria-label="Scroll to pricing section"
      style={{
        position: "fixed",
        bottom: "max(1.5rem, calc(env(safe-area-inset-bottom) + 1rem))",
        right: 24,
        zIndex: 150,
        transition: "opacity 0.25s ease, transform 0.25s ease",
        opacity: show ? 1 : 0,
        transform: show ? "translateY(0)" : "translateY(12px)",
        pointerEvents: show ? "auto" : "none",
      }}
      className="flex items-center gap-2 px-4 py-2.5 [backdrop-filter:blur(20px)_saturate(140%)] bg-zinc-950/[0.88] border border-white/[0.12] rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.35)] text-white text-[10px] font-bold uppercase tracking-widest hover:bg-zinc-950 active:scale-95 transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-[#CE1A19]"
    >
      <span>{hasSeenPricing ? "Pricing" : "Skip to Pricing"}</span>
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
    </button>
  );
}
