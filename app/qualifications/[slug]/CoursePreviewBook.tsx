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
import { createPortal } from "react-dom";
import HTMLFlipBook from "react-pageflip";
import Image from "next/image";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const FlipBook = HTMLFlipBook as any;

type Module = { title: string; topics: string[] };

type Props = {
  qualTitle: string;
  modules: Module[];
};

type Slide =
  | { kind: "cover" }
  | { kind: "module"; mod: Module; idx: number }
  | { kind: "back" };

const PAGE_W = 440;
const PAGE_H = 580;

function padNum(n: number) {
  return String(n).padStart(2, "0");
}

// ─── Premium Textures Book Page Frame ────────────────────────────────────────
const BookPage = forwardRef<HTMLDivElement, { children: React.ReactNode }>(
  ({ children }, ref) => (
    <div
      ref={ref}
      className="w-full h-full bg-gradient-to-r from-zinc-50 via-white to-zinc-50/90 select-none shadow-[inset_0_0_50px_rgba(0,0,0,0.03),0_4px_20px_rgba(0,0,0,0.08)] overflow-hidden relative"
    >
      {/* Subtle organic fiber paper texture overlay simulation */}
      <div className="absolute inset-0 opacity-[0.015] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
      {children}
    </div>
  ),
);
BookPage.displayName = "BookPage";

// ─── Precise Viewport Chassis ────────────────────────────────────────────────
function ScreenshotChassis({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="w-full relative bg-zinc-950 rounded-sm shadow-[0_12px_30px_rgba(0,0,0,0.25)] border border-zinc-800/40 overflow-hidden aspect-[16/10]">
      <div className="h-5 bg-zinc-900 border-b border-zinc-800/80 flex items-center px-2.5 gap-1.5 flex-shrink-0">
        <div className="w-2 h-2 rounded-full bg-zinc-800" />
        <div className="w-2 h-2 rounded-full bg-zinc-800" />
        <div className="w-2 h-2 rounded-full bg-zinc-800" />
      </div>
      <div className="relative w-full h-full flex-1 bg-zinc-900">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 1024px) 100vw, 440px"
          className="object-cover object-top filter contrast-[1.04] brightness-[0.98]"
        />
      </div>
    </div>
  );
}

// ─── Front Booklet Cover ─────────────────────────────────────────────────────
function CoverContent({ qualTitle }: { qualTitle: string }) {
  return (
    <div className="h-full flex flex-col justify-between p-12 bg-gradient-to-b from-zinc-100 via-zinc-50 to-zinc-100/50 relative">
      {/* Heavy paper card right gutter shadow edge */}
      <div className="absolute inset-y-0 right-0 w-6 bg-gradient-to-l from-zinc-300/20 to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 left-0 w-[1px] bg-white/60 pointer-events-none" />

      <div>
        <div className="flex items-center gap-3 mb-10">
          <div className="w-8 h-[2px] bg-[#CE1A19]" aria-hidden="true" />
          <p className="text-[#CE1A19] text-[10px] font-black desert-track-wider uppercase tracking-[4px]">
            Prospectus
          </p>
        </div>

        <p className="text-zinc-400 text-[10px] font-black tracking-[3px] uppercase mb-3">
          Integrity Fitness Education
        </p>
        <h3 className="text-zinc-950 text-3xl font-black uppercase tracking-tight leading-none max-w-sm">
          {qualTitle}
        </h3>
        <div className="w-16 h-1 bg-[#CE1A19] mt-6 mb-8" aria-hidden="true" />
      </div>

      <div className="my-auto py-2">
        <ScreenshotChassis
          src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=600&q=80"
          alt="Active IQ Digital Portal Interface Layout"
        />
      </div>

      <div className="pt-6 border-t border-zinc-200 flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-zinc-950 text-[10px] font-black tracking-[2px] uppercase">
            Active IQ Approved
          </p>
          <p className="text-zinc-500 text-[9px] font-bold tracking-[1.5px] uppercase">
            CIMSPA Professional Standard
          </p>
        </div>
        <span className="text-zinc-300 text-xs font-mono tracking-wider">
          MXXVI
        </span>
      </div>
    </div>
  );
}

// ─── Inside Left or Right Layout Sheet ────────────────────────────────────────
function ModuleContent({ mod, index }: { mod: Module; index: number }) {
  const isEvenPage = index % 2 === 0;

  return (
    <div className="h-full flex flex-col justify-between p-12 relative bg-white">
      {/* Dynamic tactile depth shadow dependent on left vs right side location orientation */}
      {isEvenPage ? (
        <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-zinc-200/40 via-zinc-100/10 to-transparent pointer-events-none z-30" />
      ) : (
        <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-zinc-200/40 via-zinc-100/10 to-transparent pointer-events-none z-30" />
      )}

      <div>
        <div className="flex items-baseline justify-between mb-4 pb-3 border-b border-zinc-100">
          <span className="text-[#CE1A19] text-[10px] font-black tracking-[3px] uppercase">
            Syllabus Core / 0{index + 1}
          </span>
          <span className="text-zinc-400 text-[9px] font-black uppercase tracking-[2px]">
            Unit Architecture
          </span>
        </div>

        <h4 className="text-zinc-950 text-lg font-black uppercase tracking-tight leading-tight mb-6">
          {mod.title}
        </h4>

        <div className="mb-6">
          <ScreenshotChassis
            src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=600&q=80"
            alt={`Active IQ Module Information detailing ${mod.title}`}
          />
        </div>

        <p className="text-zinc-950 text-[10px] font-black tracking-[2px] uppercase mb-4">
          Key Curricular Competencies:
        </p>

        <ul className="space-y-3" role="list">
          {mod.topics.slice(0, 5).map((topic) => (
            <li key={topic} className="flex items-start gap-3.5 group">
              <span
                className="w-1.5 h-1.5 bg-[#CE1A19] mt-1.5 flex-shrink-0 rounded-xs"
                aria-hidden="true"
              />
              <span className="text-zinc-600 text-xs font-semibold leading-relaxed tracking-wide">
                {topic}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="pt-4 border-t border-zinc-100 flex justify-between items-center text-zinc-400 text-[9px] font-black uppercase tracking-[2px]">
        <span>Integrity Fitness Education</span>
        <span className="font-mono text-zinc-300">P. {padNum(index + 2)}</span>
      </div>
    </div>
  );
}

// ─── Rear Pamphlet Back Cover ────────────────────────────────────────────────
function BackCoverContent() {
  return (
    <div className="h-full flex flex-col items-center justify-center bg-zinc-950 p-12 text-center relative border-l border-zinc-900">
      <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-black/60 to-transparent pointer-events-none" />

      <div className="w-12 h-[2px] bg-[#CE1A19] mb-6" aria-hidden="true" />
      <h3 className="text-white font-black text-xl uppercase tracking-[6px] leading-none mb-2">
        Integrity
      </h3>
      <p className="text-zinc-500 text-[10px] font-black tracking-[4px] uppercase mb-10">
        Fitness Education
      </p>

      <div className="w-16 h-[1px] bg-zinc-800" aria-hidden="true" />
      <p className="text-zinc-600 text-[9px] font-black tracking-[3px] uppercase mt-6 leading-relaxed">
        Complete Fitness Gym <br /> Whiffler Road, Norwich
      </p>
    </div>
  );
}

// ─── Mobile Fallback View Sheet ──────────────────────────────────────────────
function MobileCard({
  slide,
  qualTitle,
  total,
  current,
}: {
  slide: Slide;
  qualTitle: string;
  total: number;
  current: number;
}) {
  return (
    <div className="bg-white border border-zinc-200 w-full max-w-sm mx-auto min-h-[480px] flex flex-col justify-between p-8 rounded-sm shadow-xl">
      <div className="flex items-center justify-between border-b border-zinc-100 pb-3 mb-4">
        <span className="text-zinc-400 text-[10px] font-black uppercase tracking-widest">
          Prospectus Preview
        </span>
        <span className="text-zinc-500 font-mono text-xs">
          {current + 1} &middot; {total}
        </span>
      </div>

      {slide.kind === "cover" && (
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <p className="text-zinc-400 text-[9px] font-black tracking-[2px] uppercase mb-1">
              Integrity Fitness Education
            </p>
            <h3 className="text-zinc-950 text-xl font-black uppercase tracking-tight leading-tight mb-4">
              {qualTitle}
            </h3>
            <div className="w-12 h-0.5 bg-[#CE1A19]" aria-hidden="true" />
          </div>
          <div className="my-4">
            <ScreenshotChassis
              src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=600&q=80"
              alt="Cover Visual Summary"
            />
          </div>
          <p className="text-zinc-500 text-[10px] font-black uppercase tracking-wider">
            Active IQ Approved &bull; CIMSPA Mapped
          </p>
        </div>
      )}

      {slide.kind === "module" && (
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <p className="text-[#CE1A19] text-[10px] font-black tracking-[2px] uppercase mb-1">
              Unit 0{slide.idx + 1}
            </p>
            <h4 className="text-zinc-950 text-base font-black uppercase tracking-tight leading-tight mb-3">
              {slide.mod.title}
            </h4>
          </div>
          <div className="my-2">
            <ScreenshotChassis
              src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=600&q=80"
              alt="Syllabus detail view"
            />
          </div>
          <ul className="space-y-2 my-3" role="list">
            {slide.mod.topics.slice(0, 4).map((topic) => (
              <li key={topic} className="flex items-start gap-2.5">
                <span
                  className="w-1.5 h-1.5 bg-[#CE1A19] mt-1.5 flex-shrink-0 rounded-xs"
                  aria-hidden="true"
                />
                <span className="text-zinc-600 text-xs font-semibold leading-tight">
                  {topic}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {slide.kind === "back" && (
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <div className="w-12 h-0.5 bg-[#CE1A19] mb-4" aria-hidden="true" />
          <p className="text-zinc-950 font-black text-base uppercase tracking-[4px] mb-1">
            Integrity
          </p>
          <p className="text-zinc-400 text-xs font-black uppercase tracking-widest mb-6">
            Fitness Education
          </p>
          <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-wider">
            Norwich, Norfolk Portfolio
          </p>
        </div>
      )}

      <div className="mt-4 pt-3 border-t border-zinc-100 text-zinc-400 text-[9px] font-black uppercase tracking-[2px] flex justify-between">
        <span>Syllabus Guide</span>
        <span>activeiq.co.uk</span>
      </div>
    </div>
  );
}

// ─── Main Controller Hub ─────────────────────────────────────────────────────
export default function CoursePreviewBook({ qualTitle, modules }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [mobileCard, setMobileCard] = useState(0);
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const bookWrapRef = useRef<HTMLDivElement>(null);

  const slides: Slide[] = [
    { kind: "cover" },
    ...modules.map((mod, i) => ({ kind: "module" as const, mod, idx: i })),
    { kind: "back" },
  ];

  const applyScale = useCallback(() => {
    const el = bookWrapRef.current;
    if (!el) return;
    const availH = window.innerHeight - 200;
    const availW = window.innerWidth - 100;
    const s = Math.min(availH / PAGE_H, availW / (PAGE_W * 2), 1.4);
    el.style.transform = `scale(${Math.max(s, 0.55)})`;
  }, []);

  const open = () => {
    setMobileCard(0);
    setIsOpen(true);
    requestAnimationFrame(() =>
      requestAnimationFrame(() => setIsVisible(true)),
    );
  };

  const _close = useCallback(() => {
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
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") _close();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, _close]);

  const pages = [
    <BookPage key="cover">
      <CoverContent qualTitle={qualTitle} />
    </BookPage>,
    ...modules.map((mod, i) => (
      <BookPage key={`module-${i}`}>
        <ModuleContent mod={mod} index={i} />
      </BookPage>
    )),
    <BookPage key="back">
      <BackCoverContent />
    </BookPage>,
  ];

  const renderModalContent = () => (
    <div
      className={`fixed inset-0 z-[9999] bg-zinc-950/98 backdrop-blur-md flex flex-col transition-opacity duration-[240ms] ease-out ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      role="dialog"
      aria-modal="true"
      aria-label="Interactive syllabus book overview"
    >
      <div
        className={`flex flex-col w-full h-full transition-transform duration-[280ms] ease-out ${isVisible ? "translate-y-0" : "translate-y-4"}`}
      >
        {/* Modal Top Nav Bar Bar */}
        <div className="flex-shrink-0 flex items-center justify-between px-6 py-5 border-b border-zinc-900 bg-zinc-950">
          <div>
            <p className="text-[#CE1A19] text-[10px] font-black tracking-[4px] uppercase mb-0.5">
              Syllabus Architecture
            </p>
            <h2 className="text-white text-sm font-black uppercase tracking-wider max-w-md truncate">
              {qualTitle}
            </h2>
          </div>
          <button
            type="button"
            onClick={_close}
            className="w-9 h-9 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors rounded-sm outline-none focus-visible:ring-1 focus-visible:ring-[#CE1A19]"
            aria-label="Close prospectus view"
          >
            <svg
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Desktop Presentation Environment Canvas */}
        <div className="hidden lg:flex flex-1 items-center justify-center overflow-hidden bg-[radial-gradient(#1e1e24_1px,transparent_1px)] [background-size:24px_24px] p-12">
          <div
            ref={bookWrapRef}
            className="origin-center transition-transform duration-150 ease-out will-change-transform"
          >
            {/* Soft global ambient drop-shadow beneath the book spread structure */}
            <div className="shadow-[0_30px_100px_rgba(0,0,0,0.8)] rounded-sm">
              <FlipBook
                width={PAGE_W}
                height={PAGE_H}
                showCover={true}
                drawShadow={true}
                maxShadowOpacity={0.25}
                flippingTime={700}
                usePortrait={false}
                mobileScrollSupport={false}
                useMouseEvents={true}
                size="fixed"
                minWidth={PAGE_W}
                maxWidth={PAGE_W}
                minHeight={PAGE_H}
                maxHeight={PAGE_H}
                startPage={0}
              >
                {pages}
              </FlipBook>
            </div>
          </div>
        </div>

        {/* Mobile View Layer */}
        <div className="lg:hidden flex flex-col flex-1 min-h-0 p-6 justify-between bg-zinc-900/40">
          <div className="flex-1 flex items-center justify-center">
            <MobileCard
              slide={slides[mobileCard]}
              qualTitle={qualTitle}
              total={slides.length}
              current={mobileCard}
            />
          </div>

          <div className="flex-shrink-0 flex items-center justify-between pt-5 border-t border-zinc-800/80 mt-4">
            <button
              type="button"
              onClick={() => setMobileCard((c) => Math.max(0, c - 1))}
              disabled={mobileCard === 0}
              className="flex items-center gap-1 text-xs font-black tracking-widest uppercase text-zinc-400 hover:text-white disabled:opacity-20 transition-colors"
            >
              &larr; Prev
            </button>
            <div className="flex gap-2">
              {slides.map((_, i) => (
                <span
                  key={i}
                  className={`h-1 transition-all duration-200 rounded-full ${i === mobileCard ? "bg-[#CE1A19] w-4" : "bg-zinc-800 w-1"}`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() =>
                setMobileCard((c) => Math.min(slides.length - 1, c + 1))
              }
              disabled={mobileCard === slides.length - 1}
              className="flex items-center gap-1 text-xs font-black tracking-widest uppercase text-zinc-400 hover:text-white disabled:opacity-20 transition-colors"
            >
              Next &rarr;
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <button
        type="button"
        onClick={open}
        className="mt-6 inline-flex items-center gap-2.5 border border-zinc-950 text-zinc-950 px-6 py-3.5 text-xs font-bold tracking-[3px] uppercase hover:bg-zinc-950 hover:text-white transition-all duration-200 rounded-sm shadow-xs group"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          className="transform group-hover:scale-105 transition-transform"
        >
          <path d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
        </svg>
        <span>Sneak Peek Inside Course</span>
      </button>

      {isOpen && mounted && createPortal(renderModalContent(), document.body)}
    </>
  );
}
