"use client";

import {
  useState,
  useEffect,
  useLayoutEffect,
  useCallback,
  useRef,
  forwardRef,
  useSyncExternalStore,
} from "react";
import { motion } from "framer-motion";
import { createPortal } from "react-dom";
import HTMLFlipBook from "react-pageflip";
import Image from "next/image";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const FlipBook = HTMLFlipBook as any;

type Props = {
  qualTitle: string;
  bookletFolder?: string;
  bookletPageCount?: number;
  bookletPdfPath?: string;
};

const PAGE_W = 440;
const PAGE_H = 580;

// react-pageflip requires a forwardRef wrapper for each page
const BookPage = forwardRef<HTMLDivElement, { src: string; alt: string }>(
  ({ src, alt }, ref) => (
    <div ref={ref} className="w-full h-full overflow-hidden select-none bg-white relative">
      <Image src={src} alt={alt} fill sizes="440px" className="object-cover object-top" priority={false} />
      {/* Left-edge inner shadow — simulates page depth on the gutter side */}
      <div className="absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-black/10 to-transparent pointer-events-none" />
      {/* Right-edge inner shadow */}
      <div className="absolute inset-y-0 right-0 w-6 bg-gradient-to-l from-black/10 to-transparent pointer-events-none" />
    </div>
  ),
);
BookPage.displayName = "BookPage";

export default function CoursePreviewBook({ qualTitle, bookletFolder, bookletPageCount, bookletPdfPath }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [mobilePage, setMobilePage] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const bookWrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  const R2_BASE = "https://pub-6e6bb53af6c34756a861d2c0a8259e84.r2.dev";
  const total = bookletPageCount ?? 0;
  const pages = Array.from({ length: total }, (_, i) => {
    const n = String(i + 1).padStart(2, "0");
    return `${R2_BASE}/booklet-images/${bookletFolder}/page_${n}.jpg`;
  });

  // Scale the book to fill the actual measured canvas container
  const applyScale = useCallback(() => {
    const el = bookWrapRef.current;
    const canvas = canvasRef.current;
    if (!el || !canvas) return;
    const availH = canvas.clientHeight - 32;
    const availW = canvas.clientWidth - 48;
    const s = Math.min(availH / PAGE_H, availW / (PAGE_W * 2));
    el.style.transform = `scale(${Math.max(s, 0.3)})`;
  }, []);

  function open() {
    setMobilePage(0);
    setCurrentPage(0);
    setIsOpen(true);
    requestAnimationFrame(() => requestAnimationFrame(() => setIsVisible(true)));
  }

  const close = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => setIsOpen(false), 240);
  }, []);

  useLayoutEffect(() => {
    if (!isOpen) return;
    applyScale();
    window.addEventListener("resize", applyScale);
    return () => window.removeEventListener("resize", applyScale);
  }, [isOpen, applyScale]);

  useEffect(() => {
    if (!isOpen) return;
    function onKey(e: KeyboardEvent) { if (e.key === "Escape") close(); }
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, close]);

  // Spread display: page 0 = cover alone, then pairs
  const leftPage = currentPage + 1;
  const rightPage = Math.min(currentPage + 2, total);
  const progressPct = total > 1 ? Math.round((currentPage / (total - 1)) * 100) : 0;

  function renderModal() { return (
    <div
      className={`fixed inset-0 z-[9999] bg-zinc-950 flex flex-col transition-opacity duration-[240ms] ease-out ${isVisible ? "opacity-100" : "opacity-0"}`}
      role="dialog"
      aria-modal="true"
      aria-label={`${qualTitle} course booklet`}
    >
      <div className={`flex flex-col w-full h-full transition-transform duration-[280ms] ease-out ${isVisible ? "translate-y-0" : "translate-y-4"}`}>

        {/* ── Header bar ── */}
        <div className="flex-shrink-0 flex items-center justify-between px-6 py-4 border-b border-zinc-900 bg-zinc-950">
          <div>
            <p className="text-[#CE1A19] text-[10px] font-black tracking-[4px] uppercase mb-0.5">Course Booklet</p>
            <h2 className="text-white text-sm font-black uppercase tracking-wider max-w-md truncate">{qualTitle}</h2>
          </div>
          <div className="flex items-center gap-2">
            {bookletPdfPath && (
              <a
                href={bookletPdfPath}
                download
                className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-black tracking-[2px] uppercase text-white hover:bg-zinc-900 transition-colors rounded-lg outline-none focus-visible:ring-1 focus-visible:ring-[#CE1A19]"
                aria-label="Download PDF"
              >
                <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="M12 3v13m0 0l-4-4m4 4l4-4M3 21h18" />
                </svg>
                <span className="hidden sm:inline">Download PDF</span>
              </a>
            )}
            <button
              type="button"
              onClick={close}
              className="w-9 h-9 flex items-center justify-center text-white hover:bg-zinc-900 transition-colors rounded-lg outline-none focus-visible:ring-1 focus-visible:ring-[#CE1A19]"
              aria-label="Close booklet"
            >
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* ── Desktop flipbook ── */}
        <div className="hidden lg:flex flex-col flex-1 min-h-0 overflow-hidden">

          {/* Progress / page info strip */}
          <div className="flex-shrink-0 flex items-center justify-between px-8 py-3 bg-zinc-950 border-b border-zinc-900/60">
            <span className="text-white text-[10px] font-bold tracking-[2px] uppercase">
              Active IQ — Official Qualification Guide
            </span>
            <div className="flex items-center gap-4">
              {/* Mini progress bar */}
              <div className="w-32 h-[3px] bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#CE1A19] rounded-full transition-all duration-300"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
              <span className="text-white font-mono text-xs tabular-nums">
                {currentPage === 0
                  ? `Cover · ${total} pages`
                  : `${leftPage}–${rightPage} of ${total}`}
              </span>
            </div>
          </div>

          {/* Book canvas */}
          <div
            ref={canvasRef}
            className="flex flex-col flex-1 items-center justify-center min-h-0 overflow-hidden bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,#27272a,#09090b)] py-4 px-6"
          >
            <div
              ref={bookWrapRef}
              className="origin-center transition-transform duration-150 ease-out will-change-transform flex-shrink-0"
            >
              {/* Outer glow + shadow gives the book real depth */}
              <div className="relative shadow-[0_40px_120px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.04)] rounded-[1px]">
                <FlipBook
                  width={PAGE_W}
                  height={PAGE_H}
                  showCover={true}
                  drawShadow={true}
                  maxShadowOpacity={0.4}
                  flippingTime={650}
                  usePortrait={false}
                  mobileScrollSupport={false}
                  useMouseEvents={true}
                  size="fixed"
                  minWidth={PAGE_W}
                  maxWidth={PAGE_W}
                  minHeight={PAGE_H}
                  maxHeight={PAGE_H}
                  startPage={0}
                  onFlip={(e: { data: number }) => setCurrentPage(e.data)}
                >
                  {pages.map((src, i) => (
                    <BookPage key={src} src={src} alt={`Page ${i + 1}`} />
                  ))}
                </FlipBook>

                {/* Spine — faint centre line between left and right pages */}
                <div
                  className="absolute inset-y-0 left-[439px] w-[2px] pointer-events-none"
                  aria-hidden="true"
                >
                  <div className="w-full h-full bg-gradient-to-b from-black/60 via-black/20 to-black/60" />
                </div>

                {/* Bottom edge page-stack illusion */}
                <div
                  className="absolute left-0 right-0 top-[580px] h-1 pointer-events-none"
                  aria-hidden="true"
                >
                  <div className="w-full h-full bg-gradient-to-b from-zinc-400/30 to-transparent" />
                </div>
              </div>
            </div>

            {/* Hint text outside the scaled div so it doesn't affect scale calculation */}
            <div className="flex flex-col items-center gap-2 mt-4 flex-shrink-0">
              {/* Animated hand that taps then drags left */}
              <div className="flex items-center gap-4">
                {/* Tap gesture */}
                <div className="flex flex-col items-center gap-1">
                  <motion.div
                    className="w-5 h-5 rounded-full border-2 border-white/50 bg-white/15"
                    animate={{ scale: [1, 0.65, 1, 1], y: [0, 3, 0, 0] }}
                    transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 1.5, times: [0, 0.25, 0.45, 1], ease: "easeInOut" }}
                  />
                  <span className="text-zinc-600 text-[8px] font-bold tracking-[1px] uppercase">Click</span>
                </div>
                <span className="text-zinc-700 text-xs">·</span>
                {/* Drag gesture */}
                <div className="flex flex-col items-center gap-1">
                  <div className="relative h-5 w-14 flex items-center">
                    <motion.div
                      className="absolute w-4 h-4 rounded-full border-2 border-white/50 bg-white/15"
                      animate={{ x: [0, 32, 32, 0], opacity: [1, 1, 0, 0] }}
                      transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 1.5, times: [0, 0.5, 0.6, 1], ease: "easeInOut" }}
                    />
                    {/* Trail arrow */}
                    <motion.svg
                      width="32" height="12" viewBox="0 0 32 12" fill="none"
                      className="absolute right-0"
                      animate={{ opacity: [0, 0, 0.6, 0] }}
                      transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 1.5, times: [0, 0.3, 0.55, 1] }}
                    >
                      <path d="M0 6 L24 6 M20 2 L26 6 L20 10" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
                    </motion.svg>
                  </div>
                  <span className="text-zinc-600 text-[8px] font-bold tracking-[1px] uppercase">Drag</span>
                </div>
              </div>
              <p className="text-center text-white text-[9px] font-bold tracking-[2px] uppercase">
                Click pages to turn · Drag to flip
              </p>
            </div>
          </div>
        </div>

        {/* ── Mobile swiper ── */}
        <div className="lg:hidden flex flex-col flex-1 min-h-0 bg-zinc-900">
          {/* Mobile progress strip */}
          <div className="flex-shrink-0 flex items-center justify-between px-5 py-3 border-b border-zinc-800">
            <span className="text-white text-[10px] font-bold tracking-widest uppercase">
              {mobilePage === 0 ? "Cover" : `Page ${mobilePage + 1}`}
            </span>
            <div className="flex items-center gap-3">
              <div className="w-24 h-[3px] bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#CE1A19] rounded-full transition-all duration-300"
                  style={{ width: `${Math.round(((mobilePage + 1) / total) * 100)}%` }}
                />
              </div>
              <span className="text-white font-mono text-[11px] tabular-nums">
                {mobilePage + 1} / {total}
              </span>
            </div>
          </div>

          {/* Page image — touch left/right to swipe pages */}
          <div
            className="flex-1 flex items-center justify-center p-5"
            onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
            onTouchEnd={(e) => {
              if (touchStartX.current === null) return;
              const dx = e.changedTouches[0].clientX - touchStartX.current;
              touchStartX.current = null;
              if (dx < -40) setMobilePage((p) => Math.min(total - 1, p + 1));
              else if (dx > 40) setMobilePage((p) => Math.max(0, p - 1));
            }}
          >
            <div className="relative w-full max-w-xs shadow-[0_20px_60px_rgba(0,0,0,0.8)] rounded-[1px] overflow-hidden aspect-[440/580]"
            >
              <Image
                src={pages[mobilePage]}
                alt={`Page ${mobilePage + 1}`}
                fill
                sizes="320px"
                className="object-cover object-top"
              />
              {/* Left and right page-edge inner shadows */}
              <div className="absolute inset-y-0 left-0 w-5 bg-gradient-to-r from-black/20 to-transparent pointer-events-none" />
              <div className="absolute inset-y-0 right-0 w-5 bg-gradient-to-l from-black/20 to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Mobile navigation */}
          <div className="flex-shrink-0 flex items-center justify-between px-6 py-4 border-t border-zinc-800">
            <button
              type="button"
              onClick={() => setMobilePage((p) => Math.max(0, p - 1))}
              disabled={mobilePage === 0}
              className="flex items-center gap-2 text-xs font-black tracking-widest uppercase text-zinc-400 hover:text-white disabled:opacity-20 transition-colors"
            >
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" /></svg>
              Prev
            </button>
            {/* Dot strip — show up to 9 dots, else just numbers */}
            {total <= 9 ? (
              <div className="flex gap-1.5">
                {pages.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setMobilePage(i)}
                    className={`rounded-full transition-all duration-200 ${i === mobilePage ? "bg-[#CE1A19] w-4 h-1.5" : "bg-zinc-700 w-1.5 h-1.5"}`}
                    aria-label={`Go to page ${i + 1}`}
                  />
                ))}
              </div>
            ) : (
              <span className="text-white font-mono text-xs">{mobilePage + 1} / {total}</span>
            )}
            <button
              type="button"
              onClick={() => setMobilePage((p) => Math.min(total - 1, p + 1))}
              disabled={mobilePage === total - 1}
              className="flex items-center gap-2 text-xs font-black tracking-widest uppercase text-zinc-400 hover:text-white disabled:opacity-20 transition-colors"
            >
              Next
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        </div>

      </div>
    </div>
  ); }

  if (!bookletFolder || !bookletPageCount) return null;

  return (
    <>
      <div className="mt-6 flex flex-col sm:flex-row gap-3">
        <button
          type="button"
          onClick={open}
          className="inline-flex items-center gap-2.5 border border-zinc-950 text-zinc-950 px-6 py-3.5 text-xs font-bold tracking-[3px] uppercase hover:bg-zinc-950 hover:text-white transition-all duration-200 rounded-lg shadow-xs group"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="transform group-hover:scale-105 transition-transform">
            <path d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
          </svg>
          <span>Sneak Peek Inside Course</span>
        </button>

        {bookletPdfPath && (
          <a
            href={bookletPdfPath}
            download
            className="inline-flex items-center gap-2.5 border border-zinc-300 text-zinc-600 px-6 py-3.5 text-xs font-bold tracking-[3px] uppercase hover:border-zinc-950 hover:text-zinc-950 transition-all duration-200 rounded-lg shadow-xs group"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="transform group-hover:translate-y-0.5 transition-transform">
              <path d="M12 3v13m0 0l-4-4m4 4l4-4M3 21h18" />
            </svg>
            <span>Download Course Guide</span>
          </a>
        )}
      </div>

      {isOpen && mounted && createPortal(renderModal(), document.body)}
    </>
  );
}
