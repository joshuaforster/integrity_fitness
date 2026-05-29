"use client";

import { useState, useRef, useEffect, useCallback, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import Image from "next/image";

const topicContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const topicItem: Variants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

const checkCircle: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: { pathLength: 1, opacity: 1, transition: { duration: 0.7, ease: "easeInOut" } },
};

const checkMark: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: { pathLength: 1, opacity: 1, transition: { duration: 0.45, ease: "easeInOut", delay: 0.55 } },
};

function TopicCheck() {
  return (
    <motion.svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className="flex-shrink-0 mt-0.5"
    >
      <motion.circle cx="8" cy="8" r="7" stroke="#16a34a" strokeWidth="1.5" fill="none" variants={checkCircle} />
      <motion.path d="M5 8L7.2 10.2L11 6" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" variants={checkMark} />
    </motion.svg>
  );
}

type Module = { title: string; topics: string[] };
type Props = { modules: Module[]; bookletFolder?: string; bookletPageCount?: number };

function fmt(n: number) { return String(n + 1).padStart(2, "0"); }

function easeScroll(container: HTMLDivElement, target: number, duration = 750) {
  const start = container.scrollTop;
  const distance = target - start;
  if (Math.abs(distance) < 2) return () => {};
  const startTime = performance.now();
  let raf: number;
  function step(now: number) {
    const p = Math.min((now - startTime) / duration, 1);
    const ease = 1 - Math.pow(1 - p, 3);
    container.scrollTop = start + distance * ease;
    if (p < 1) raf = requestAnimationFrame(step);
  }
  raf = requestAnimationFrame(step);
  return () => cancelAnimationFrame(raf);
}

function BookletPages({ active, modules, pages, pagesPerModule, scrollRef, sectionRefs, imgSizes }: {
  active: number; modules: Module[]; pages: string[]; pagesPerModule: number;
  scrollRef: React.RefObject<HTMLDivElement | null>; sectionRefs: React.RefObject<(HTMLDivElement | null)[]>; imgSizes: string;
}) {
  useEffect(() => {
    const section = sectionRefs.current?.[active];
    const container = scrollRef.current;
    if (!section || !container) return;
    const sectionTop = section.getBoundingClientRect().top;
    const containerTop = container.getBoundingClientRect().top;
    const target = container.scrollTop + (sectionTop - containerTop);
    return easeScroll(container, target, 750);
  }, [active, scrollRef, sectionRefs]);

  if (pages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-3 text-zinc-600 px-6 text-center">
        <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
        </svg>
        <span className="text-[10px] font-bold uppercase tracking-widest">No preview available</span>
      </div>
    );
  }

  return (
    <>
      {modules.map((mod, i) => {
        const start = i * pagesPerModule;
        const modulePages = pages.slice(start, Math.min(start + pagesPerModule, pages.length));
        return (
          <div key={i} ref={(el) => { if (sectionRefs.current) sectionRefs.current[i] = el; }}>
            {modulePages.map((src, j) => (
              <div key={j} className="relative w-full aspect-[1/1.414]">
                <Image src={src} alt={`${mod.title} — page ${start + j + 1}`} fill sizes={imgSizes} className="object-cover object-top" />
              </div>
            ))}
          </div>
        );
      })}
    </>
  );
}

function CompactTablet({ active, modules, pages, pagesPerModule, onExpand }: {
  active: number; modules: Module[]; pages: string[]; pagesPerModule: number; onExpand: () => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="relative w-[300px]">
        <div className="absolute right-[-4px] top-[76px] w-[4px] h-9 bg-zinc-800 rounded-r-sm z-20" />
        <div className="absolute left-[-4px] top-[64px] w-[4px] h-7 bg-zinc-800 rounded-l-sm z-20" />
        <div className="absolute left-[-4px] top-[100px] w-[4px] h-7 bg-zinc-800 rounded-l-sm z-20" />
        <div className="absolute left-[-4px] top-[46px] w-[4px] h-4 bg-zinc-800 rounded-l-sm z-20" />
        <div className="relative bg-zinc-950 rounded-[30px] h-[430px] shadow-[0_40px_80px_rgba(0,0,0,0.85),0_0_0_1px_rgba(255,255,255,0.07),inset_0_0_0_1px_rgba(255,255,255,0.03)]">
          <div className="absolute top-[14px] left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-zinc-800 z-20" />
          <div className="absolute inset-[12px] rounded-[22px] overflow-hidden bg-white">
            <div ref={scrollRef} className="w-full h-full overflow-y-auto overflow-x-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <BookletPages active={active} modules={modules} pages={pages} pagesPerModule={pagesPerModule} scrollRef={scrollRef} sectionRefs={sectionRefs} imgSizes="276px" />
            </div>
          </div>
        </div>
      </div>
      <button
        type="button"
        onClick={onExpand}
        className="inline-flex items-center gap-2 [backdrop-filter:blur(12px)_saturate(130%)] bg-white/[0.06] border border-white/[0.14] hover:border-white/[0.30] hover:bg-white/[0.10] text-white px-5 py-2.5 text-[9px] font-black tracking-[3px] uppercase transition-all duration-200 rounded-full group shadow-[0_4px_16px_rgba(0,0,0,0.3)]"
      >
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="group-hover:scale-110 transition-transform" aria-hidden="true">
          <path d="M8 3H5a2 2 0 00-2 2v3m18 0V5a2 2 0 00-2-2h-3m0 18h3a2 2 0 002-2v-3M3 16v3a2 2 0 002 2h3" />
        </svg>
        View Fullscreen
      </button>
    </div>
  );
}

function LargeTablet({ active, modules, pages, pagesPerModule }: {
  active: number; modules: Module[]; pages: string[]; pagesPerModule: number;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  return (
    <div className="relative w-[440px]">
      <div className="absolute right-[-6px] top-[112px] w-[6px] h-[53px] bg-zinc-800 rounded-r-sm z-20" />
      <div className="absolute left-[-6px] top-[94px] w-[6px] h-[41px] bg-zinc-800 rounded-l-sm z-20" />
      <div className="absolute left-[-6px] top-[147px] w-[6px] h-[41px] bg-zinc-800 rounded-l-sm z-20" />
      <div className="absolute left-[-6px] top-[67px] w-[6px] h-[23px] bg-zinc-800 rounded-l-sm z-20" />
      <div className="relative bg-zinc-950 rounded-[42px] h-[620px] shadow-[0_48px_100px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.07),inset_0_0_0_1px_rgba(255,255,255,0.03)]">
        <div className="absolute top-[21px] left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-zinc-800 z-20" />
        <div className="absolute inset-[16px] rounded-[30px] overflow-hidden bg-white">
          <div ref={scrollRef} className="w-full h-full overflow-y-auto overflow-x-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <BookletPages active={active} modules={modules} pages={pages} pagesPerModule={pagesPerModule} scrollRef={scrollRef} sectionRefs={sectionRefs} imgSizes="408px" />
          </div>
        </div>
      </div>
    </div>
  );
}

function FullscreenOverlay({ active, modules, pages, pagesPerModule, onClose }: {
  active: number; modules: Module[]; pages: string[]; pagesPerModule: number; onClose: () => void;
}) {
  const [visible, setVisible] = useState(false);
  const close = useCallback(() => { setVisible(false); setTimeout(onClose, 260); }, [onClose]);

  useEffect(() => { requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true))); }, []);
  useEffect(() => {
    function onKey(e: KeyboardEvent) { if (e.key === "Escape") close(); }
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [close]);

  return (
    <div
      role="dialog" aria-modal="true" aria-label="Fullscreen tablet view"
      onClick={(e) => { if (e.target === e.currentTarget) close(); }}
      className={`fixed inset-0 z-[9999] flex items-center justify-center transition-opacity duration-[260ms] ease-out bg-[radial-gradient(ellipse_80%_70%_at_50%_50%,#18181b,#09090b)] ${visible ? "opacity-100" : "opacity-0"}`}
    >
      <button
        type="button" onClick={close} aria-label="Close fullscreen"
        className="absolute top-6 right-6 flex items-center gap-2 text-white/50 hover:text-white transition-colors text-[9px] font-bold tracking-[2px] uppercase outline-none focus-visible:ring-1 focus-visible:ring-[#CE1A19]"
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
          <path d="M6 18L18 6M6 6l12 12" />
        </svg>
        Close
      </button>
      <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/20 text-[9px] font-bold tracking-[3px] uppercase select-none pointer-events-none">
        Scroll to browse · Press Esc to close
      </p>
      <div className={`transition-all duration-[280ms] ease-out ${visible ? "scale-100 translate-y-0" : "scale-95 translate-y-3"}`}>
        <LargeTablet active={active} modules={modules} pages={pages} pagesPerModule={pagesPerModule} />
      </div>
    </div>
  );
}

function ScrollSquiggle() {
  return (
    <motion.div className="flex flex-col items-center gap-2 mt-5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8, duration: 0.6 }}>
      <svg width="44" height="52" viewBox="0 0 44 52" fill="none" aria-hidden="true">
        <motion.path
          d="M22 48 Q6 40 22 30 Q38 20 22 10 Q10 4 22 2"
          stroke="#CE1A19" strokeWidth="1.8" strokeLinecap="round" fill="none"
          initial={{ pathLength: 0, opacity: 0.8 }}
          animate={{ pathLength: [0, 1, 1, 0], opacity: [0.8, 1, 0.9, 0] }}
          transition={{ duration: 2.2, times: [0, 0.55, 0.78, 1], repeat: Infinity, repeatDelay: 2, ease: "easeInOut" }}
        />
        <motion.path
          d="M17 6 L22 2 L27 6" stroke="#CE1A19" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0, 1, 0] }}
          transition={{ duration: 2.2, times: [0, 0.52, 0.7, 1], repeat: Infinity, repeatDelay: 2 }}
        />
      </svg>
      <span className="text-white/35 text-[9px] font-bold tracking-[2px] uppercase">Scroll to browse modules</span>
    </motion.div>
  );
}

export default function ModulesAccordion({ modules, bookletFolder, bookletPageCount }: Props) {
  const [active, setActive] = useState(0);
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [fsOpen, setFsOpen] = useState(false);

  const mounted = useSyncExternalStore(() => () => {}, () => true, () => false);

  const total = bookletPageCount ?? 0;
  const pages = bookletFolder && total > 0
    ? Array.from({ length: total }, (_, i) => `/booklet-images/${bookletFolder}/page_${String(i + 1).padStart(2, "0")}.jpg`)
    : [];
  const pagesPerModule = total > 0 ? Math.ceil(total / modules.length) : 0;

  function handleClick(i: number) {
    setActive(i);
    setOpenIndex((prev) => (prev === i ? null : i));
  }

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 xl:gap-20 items-center">

        {/* Module list */}
        <div className="space-y-2">
          {modules.map((mod, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.1 }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: "easeOut" }}
              className={`rounded-xl border overflow-hidden transition-all duration-300 ${
                i === active
                  ? "[backdrop-filter:blur(32px)_saturate(160%)_brightness(0.95)] bg-white/[0.07] border-white/[0.18] shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.08)]"
                  : "bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.04] hover:border-white/[0.10]"
              }`}
            >
              <button
                type="button"
                onClick={() => handleClick(i)}
                className="w-full flex items-center gap-4 py-4 px-5 text-left group"
                aria-expanded={openIndex === i}
              >
                <motion.span
                  className="text-[10px] font-black tabular-nums tracking-[2px] w-6 flex-shrink-0"
                  animate={{ color: i === active ? "#CE1A19" : "rgba(255,255,255,0.25)" }}
                  transition={{ duration: 0.3 }}
                >
                  {fmt(i)}
                </motion.span>

                <span className={`flex-1 text-sm font-bold tracking-wide uppercase transition-colors duration-200 ${
                  i === active ? "text-white" : "text-white/65 group-hover:text-white/90"
                }`}>
                  {mod.title}
                </span>

                <motion.span
                  animate={{
                    backgroundColor: i === active ? "#CE1A19" : "rgba(255,255,255,0.05)",
                    borderColor: i === active ? "#CE1A19" : "rgba(255,255,255,0.12)",
                  }}
                  transition={{ duration: 0.25 }}
                  className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 border"
                >
                  <svg
                    className={`w-3 h-3 transition-transform duration-300 text-white ${i === active ? "rotate-90" : ""}`}
                    fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </motion.span>
              </button>

              {/* Topics panel */}
              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.div
                    key="panel"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pt-3 pb-5 border-t border-white/[0.08]">
                      <p className="text-[#CE1A19] text-[9px] font-black tracking-[3px] uppercase mb-4">
                        What you&apos;ll cover
                      </p>
                      <motion.ul
                        className="space-y-3"
                        role="list"
                        variants={topicContainer}
                        initial="hidden"
                        animate="visible"
                      >
                        {mod.topics.map((topic) => (
                          <motion.li key={topic} variants={topicItem} className="flex items-start gap-3">
                            <TopicCheck />
                            <span className="text-white text-sm leading-snug">{topic}</span>
                          </motion.li>
                        ))}
                      </motion.ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Tablet — desktop only */}
        <div className="hidden lg:flex justify-center">
          <div className="sticky top-28">
            <CompactTablet
              active={active}
              modules={modules}
              pages={pages}
              pagesPerModule={pagesPerModule}
              onExpand={() => setFsOpen(true)}
            />
            <ScrollSquiggle />
          </div>
        </div>

      </div>

      {fsOpen && mounted && createPortal(
        <FullscreenOverlay
          active={active}
          modules={modules}
          pages={pages}
          pagesPerModule={pagesPerModule}
          onClose={() => setFsOpen(false)}
        />,
        document.body,
      )}
    </>
  );
}
