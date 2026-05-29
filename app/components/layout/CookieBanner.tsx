"use client";

import { useState, useEffect } from "react";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem("ife-cookies-v1")) {
        const t = setTimeout(() => setVisible(true), 1500);
        return () => clearTimeout(t);
      }
    } catch {}
  }, []);

  useEffect(() => {
    if (visible) {
      const t = setTimeout(() => setAnimateIn(true), 16);
      return () => clearTimeout(t);
    }
  }, [visible]);

  function accept() {
    setAnimateIn(false);
    setTimeout(() => {
      try { localStorage.setItem("ife-cookies-v1", "1"); } catch {}
      setVisible(false);
    }, 280);
  }

  if (!visible) return null;

  return (
    <aside
      role="dialog"
      aria-label="Cookie consent"
      aria-modal="false"
      style={{
        transition: "opacity 0.28s ease, transform 0.28s ease",
        opacity: animateIn ? 1 : 0,
        transform: animateIn ? "translateY(0)" : "translateY(14px)",
      }}
      className="fixed bottom-6 right-6 z-[9997] w-[340px] max-w-[calc(100vw-2rem)] [backdrop-filter:blur(40px)_saturate(140%)] bg-zinc-950/70 border border-white/[0.12] rounded-2xl overflow-hidden shadow-[0_16px_48px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.08)]"
    >
      <div className="px-6 pt-7 pb-5">

        {/* Emoji row */}
        <style>{`
          @keyframes cookie-rock {
            0%, 100% { transform: rotate(-6deg); }
            50%       { transform: rotate(6deg);  }
          }
          @keyframes milk-bob {
            0%, 100% { transform: translateY(0);   }
            50%       { transform: translateY(-6px); }
          }
        `}</style>
        <div className="flex justify-center items-end gap-6 mb-5">
          <span
            className="select-none leading-none flex-shrink-0"
            style={{ fontSize: "62px", animation: "cookie-rock 3s ease-in-out infinite" }}
            aria-hidden="true"
          >
            🍪
          </span>
          <span
            className="select-none leading-none flex-shrink-0"
            style={{ fontSize: "54px", animation: "milk-bob 2.8s ease-in-out infinite 0.5s" }}
            aria-hidden="true"
          >
            🥛
          </span>
        </div>

        {/* Title */}
        <div className="text-center mb-4">
          <p className="text-[#CE1A19] text-base font-black uppercase tracking-[3px]">
            Cookie Policy
          </p>
          <div className="mt-2 mx-auto w-8 h-[2px] rounded-full bg-[#CE1A19]/50" />
        </div>

        {/* Copy */}
        <p className="text-white/90 text-sm leading-relaxed text-center mb-6">
          We use cookies 🍪 — and as any good PT will tell you, all foods
          can be part of a{" "}
          <span className="font-bold text-white">healthy, balanced diet.</span>
          {" "}
          <a
            href="https://www.tandfonline.com/doi/full/10.1186/s12970-021-00452-2#d1e920"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white underline underline-offset-2 decoration-white/50 hover:decoration-white transition-all duration-200"
          >
            Don&apos;t just take our word orit.
          </a>
        </p>

        {/* CTA */}
        <button
          type="button"
          onClick={accept}
          className="w-full bg-[#CE1A19] hover:bg-red-700 active:scale-[0.97] text-white text-[11px] font-bold uppercase tracking-widest py-3.5 rounded-sm transition-all duration-150 outline-none focus-visible:ring-2 focus-visible:ring-[#CE1A19] focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
        >
          I&apos;ll allow it (just this once) 😄
        </button>

        {/* Decline */}
        <button
          type="button"
          onClick={accept}
          className="w-full mt-3 py-2.5 border border-white/20 text-white/50 hover:border-white/50 hover:text-white/80 text-[10px] font-bold uppercase tracking-widest rounded-sm transition-all duration-200 active:scale-[0.97] outline-none focus-visible:ring-1 focus-visible:ring-white"
        >
          Decline
        </button>
      </div>
    </aside>
  );
}
