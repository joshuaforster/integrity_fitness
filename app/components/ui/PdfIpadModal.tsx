"use client";

import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";

type Props = { src: string; onClose: () => void };

function IpadOverlay({ src, onClose }: Props) {
  const [visible, setVisible] = useState(false);
  const close = useCallback(() => { setVisible(false); setTimeout(onClose, 260); }, [onClose]);

  useEffect(() => {
    requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) { if (e.key === "Escape") close(); }
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [close]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Research paper"
      onClick={(e) => { if (e.target === e.currentTarget) close(); }}
      className={`fixed inset-0 z-[9999] flex items-center justify-center transition-opacity duration-[260ms] ease-out bg-zinc-950/95 [backdrop-filter:blur(8px)] ${visible ? "opacity-100" : "opacity-0"}`}
    >
      <button
        type="button"
        onClick={close}
        aria-label="Close"
        className="absolute top-6 right-6 flex items-center gap-2 text-white/50 hover:text-white transition-colors text-xs font-bold tracking-wider uppercase outline-none focus-visible:ring-1 focus-visible:ring-[#CE1A19]"
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
          <path d="M6 18L18 6M6 6l12 12" />
        </svg>
        Close
      </button>

      <div
        className={`relative transition-all duration-[280ms] ease-out ${visible ? "scale-100 translate-y-0" : "scale-95 translate-y-3"}`}
        style={{ height: "90vh", width: "min(calc(90vh * 0.73), calc(100vw - 40px))" }}
      >
        {/* Physical buttons */}
        <div className="absolute right-[-5px] top-[18%] h-[8%] w-1.5 bg-zinc-800 rounded-r-sm z-20" />
        <div className="absolute left-[-5px] top-[15%] h-[6.5%] w-1.5 bg-zinc-800 rounded-l-sm z-20" />
        <div className="absolute left-[-5px] top-[24%] h-[6.5%] w-1.5 bg-zinc-800 rounded-l-sm z-20" />
        <div className="absolute left-[-5px] top-[10%] h-[3.5%] w-1.5 bg-zinc-800 rounded-l-sm z-20" />

        {/* Body */}
        <div className="relative bg-zinc-950 rounded-[44px] h-full shadow-[0_48px_100px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.07),inset_0_0_0_1px_rgba(255,255,255,0.03)]">
          <div className="absolute top-[18px] left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-zinc-800 z-20" />
          <div className="absolute inset-[18px] rounded-[30px] overflow-hidden bg-white">
            <iframe src={src} className="w-full h-full border-0" title="Research paper" />
          </div>
        </div>
      </div>

      <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/20 text-xs font-bold tracking-widest uppercase select-none pointer-events-none">
        Scroll to read · Press Esc to close
      </p>
    </div>
  );
}

export default function PdfIpadModal({ src, onClose }: Props) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return createPortal(<IpadOverlay src={src} onClose={onClose} />, document.body);
}