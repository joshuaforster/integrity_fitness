"use client";

import { useState, useEffect } from "react";
import PdfIpadModal from "@/app/components/ui/PdfIpadModal";

const KEY = "ife-cookies-v1";

function CookieText({ onOpenPdf }: { onOpenPdf: () => void }) {
  return (
    <>
      We use cookies 🍪 — and as any good PT will tell you, all foods can be part of a{" "}
      <span className="font-bold text-white">healthy, balanced diet.</span>{" "}
      <button
        type="button"
        onClick={onOpenPdf}
        className="text-white underline underline-offset-2 decoration-white/50 hover:decoration-white transition-colors duration-200"
      >
        Don&apos;t just take our word for it.
      </button>
    </>
  );
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);
  const [pdfOpen, setPdfOpen] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) {
        const t = setTimeout(() => setVisible(true), 1200);
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

  function dismiss(choice: "accepted" | "declined") {
    setAnimateIn(false);
    setTimeout(() => {
      try { localStorage.setItem(KEY, choice); } catch {}
      setVisible(false);
    }, 300);
  }

  if (!visible) return null;

  return (
    <>
      {/* Mobile: full-width bottom bar */}
      <div
        role="dialog"
        aria-label="Cookie consent"
        aria-modal="false"
        style={{
          transition: "opacity 0.3s ease, transform 0.3s ease",
          opacity: animateIn ? 1 : 0,
          transform: animateIn ? "translateY(0)" : "translateY(20px)",
        }}
        className="md:hidden fixed bottom-0 left-0 right-0 z-[9997] [backdrop-filter:blur(40px)_saturate(140%)] bg-zinc-950/90 border-t border-white/[0.10] shadow-[0_-8px_40px_rgba(0,0,0,0.6)]"
      >
        <div className="px-5 py-4 flex flex-col gap-3 max-w-screen-sm mx-auto">
          <div className="flex items-start gap-3">
            <span className="text-2xl select-none leading-none flex-shrink-0 mt-0.5" aria-hidden="true">🍪</span>
            <div className="min-w-0">
              <p className="text-white text-xs font-black uppercase tracking-widest mb-1">Cookie Policy</p>
              <p className="text-white/75 text-xs leading-relaxed"><CookieText onOpenPdf={() => setPdfOpen(true)} /></p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => dismiss("accepted")}
              className="flex-1 bg-[#CE1A19] hover:bg-red-700 active:scale-[0.97] text-white text-xs font-black uppercase tracking-widest py-3 rounded-lg transition-all duration-150 outline-none focus-visible:ring-2 focus-visible:ring-[#CE1A19] focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
            >
              Accept All
            </button>
            <button
              type="button"
              onClick={() => dismiss("declined")}
              className="flex-1 border border-white/20 hover:border-white/40 text-white/60 hover:text-white/90 active:scale-[0.97] text-xs font-black uppercase tracking-widest py-3 rounded-lg transition-all duration-150 outline-none focus-visible:ring-1 focus-visible:ring-white"
            >
              Essential Only
            </button>
          </div>
        </div>
      </div>

      {/* Desktop: floating card (bottom-right) */}
      <div
        role="dialog"
        aria-label="Cookie consent"
        aria-modal="false"
        style={{
          transition: "opacity 0.3s ease, transform 0.3s ease",
          opacity: animateIn ? 1 : 0,
          transform: animateIn ? "translateY(0)" : "translateY(16px)",
        }}
        className="hidden md:block fixed bottom-6 right-6 z-[9997] w-[340px] [backdrop-filter:blur(40px)_saturate(150%)] bg-zinc-900/80 border border-white/[0.12] rounded-lg overflow-hidden shadow-[0_16px_48px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.07)]"
      >
        <div className="px-6 pt-6 pb-5">

          <style>{`
            @keyframes cookie-rock {
              0%, 100% { transform: rotate(-6deg); }
              50%       { transform: rotate(6deg);  }
            }
            @keyframes milk-bob {
              0%, 100% { transform: translateY(0);   }
              50%       { transform: translateY(-5px); }
            }
          `}</style>

          <div className="flex justify-center items-end gap-5 mb-4">
            <span
              className="select-none leading-none flex-shrink-0"
              style={{ fontSize: "54px", animation: "cookie-rock 3s ease-in-out infinite" }}
              aria-hidden="true"
            >🍪</span>
            <span
              className="select-none leading-none flex-shrink-0"
              style={{ fontSize: "46px", animation: "milk-bob 2.8s ease-in-out infinite 0.5s" }}
              aria-hidden="true"
            >🥛</span>
          </div>

          <div className="text-center mb-3">
            <p className="text-[#CE1A19] text-sm font-black uppercase tracking-widest">Cookie Policy</p>
            <div className="mt-2 mx-auto w-8 h-0.5 rounded-full bg-[#CE1A19]/40" />
          </div>

          <p className="text-white/80 text-sm leading-relaxed text-center mb-5"><CookieText onOpenPdf={() => setPdfOpen(true)} /></p>

          <div className="flex flex-col gap-2">
            <button
              type="button"
              onClick={() => dismiss("accepted")}
              className="w-full bg-[#CE1A19] hover:bg-red-700 active:scale-[0.97] text-white text-xs font-black uppercase tracking-widest py-3.5 rounded-lg transition-all duration-150 outline-none focus-visible:ring-2 focus-visible:ring-[#CE1A19] focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
            >
              Accept All Cookies
            </button>
            <button
              type="button"
              onClick={() => dismiss("declined")}
              className="w-full border border-white/[0.18] hover:border-white/40 text-white/50 hover:text-white/80 active:scale-[0.97] text-xs font-black uppercase tracking-widest py-3 rounded-lg transition-all duration-200 outline-none focus-visible:ring-1 focus-visible:ring-white"
            >
              Essential Only
            </button>
          </div>

          <p className="text-white/20 text-xs text-center mt-4 leading-relaxed">
            Essential cookies are always active and required for the site to function.
          </p>
        </div>
      </div>

      {pdfOpen && (
        <PdfIpadModal src="/pubmed.pdf" onClose={() => setPdfOpen(false)} />
      )}
    </>
  );
}