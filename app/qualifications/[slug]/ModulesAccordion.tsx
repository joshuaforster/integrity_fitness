"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

type Module = { title: string; topics: string[] };

type Props = {
  modules: Module[];
  bookletFolder?: string;
  bookletPageCount?: number;
};

function fmt(n: number) {
  return String(n + 1).padStart(2, "0");
}

function TabletMockup({
  active,
  modules,
  bookletFolder,
  bookletPageCount,
}: {
  active: number;
  modules: Module[];
  bookletFolder?: string;
  bookletPageCount?: number;
}) {
  const total = bookletPageCount ?? 0;
  const hasBooklet = !!(bookletFolder && total > 0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  const pages = hasBooklet
    ? Array.from({ length: total }, (_, i) => {
        const n = String(i + 1).padStart(2, "0");
        return `/booklet-images/${bookletFolder}/page_${n}.jpg`;
      })
    : [];

  // Divide pages evenly across modules so clicking a module scrolls to its section
  const pagesPerModule = total > 0 ? Math.ceil(total / modules.length) : 0;

  useEffect(() => {
    const section = sectionRefs.current[active];
    const container = scrollRef.current;
    if (!section || !container) return;
    const sectionTop = section.getBoundingClientRect().top;
    const containerTop = container.getBoundingClientRect().top;
    const target = container.scrollTop + (sectionTop - containerTop);
    container.scrollTo({ top: target, behavior: "smooth" });
  }, [active]);

  return (
    // Centred wrapper
    <div className="flex justify-center">
      <div className="relative w-[300px]">

        {/* ── Hardware buttons ── */}
        {/* Power — right edge */}
        <div className="absolute right-[-4px] top-[76px] w-[4px] h-9 bg-zinc-800 rounded-r-sm z-20" />
        {/* Volume up — left edge */}
        <div className="absolute left-[-4px] top-[64px] w-[4px] h-7 bg-zinc-800 rounded-l-sm z-20" />
        {/* Volume down — left edge */}
        <div className="absolute left-[-4px] top-[100px] w-[4px] h-7 bg-zinc-800 rounded-l-sm z-20" />
        {/* Mute / silent switch — left edge */}
        <div className="absolute left-[-4px] top-[46px] w-[4px] h-4 bg-zinc-800 rounded-l-sm z-20" />

        {/* ── Device shell ── */}
        <div className="relative bg-zinc-950 rounded-[30px] overflow-visible h-[430px] shadow-[0_40px_80px_rgba(0,0,0,0.85),0_0_0_1px_rgba(255,255,255,0.07),inset_0_0_0_1px_rgba(255,255,255,0.03)]">
          {/* Front camera */}
          <div className="absolute top-[14px] left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-zinc-800 z-20" />

          {/* ── Screen ── */}
          <div className="absolute inset-[12px] rounded-[22px] overflow-hidden flex flex-col bg-black">

            {/* Status bar */}
            <div className="flex-shrink-0 h-6 bg-black flex items-center justify-between px-4 z-10">
              <span className="text-white text-[8px] font-bold tracking-wide">9:41</span>
              <div className="flex items-center gap-1.5" aria-hidden="true">
                {/* WiFi icon */}
                <svg width="11" height="8" viewBox="0 0 20 14" fill="none" className="text-white">
                  <path d="M1 5a13 13 0 0118 0" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
                  <path d="M4 8.5a8 8 0 0112 0" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
                  <path d="M7.5 12a3 3 0 015 0" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
                </svg>
                {/* Battery */}
                <div className="flex items-center">
                  <div className="w-5 h-2.5 rounded-[2px] border border-white/50 p-[1.5px]">
                    <div className="h-full w-3/4 bg-white rounded-[1px]" />
                  </div>
                  <div className="w-[2px] h-1.5 bg-white/40 rounded-r-[1px] ml-[1px]" />
                </div>
              </div>
            </div>

            {/* App header strip */}
            <div className="flex-shrink-0 flex items-center justify-between px-3 py-1.5 bg-zinc-950 border-b border-zinc-900">
              <div className="flex items-center gap-1.5">
                <span className="text-[#CE1A19] text-[7px] font-black tracking-[3px] uppercase">Active IQ</span>
              </div>
              <span className="text-zinc-500 text-[7px] font-bold tracking-widest uppercase">Course Guide</span>
            </div>

            {/* Scrollable booklet pages */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto overflow-x-hidden relative [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >

              {hasBooklet ? (
                modules.map((mod, i) => {
                  const startPage = i * pagesPerModule;
                  const endPage = Math.min(startPage + pagesPerModule, total);
                  const modulePages = pages.slice(startPage, endPage);

                  return (
                    <div
                      key={i}
                      ref={(el) => { sectionRefs.current[i] = el; }}
                    >
                      {/* Module label chip */}
                      <div className="flex items-center gap-2 px-3 py-1.5 bg-zinc-950 border-b border-zinc-900/80 sticky top-0 z-10">
                        <span className="text-[#CE1A19] text-[7px] font-black tracking-[2px] uppercase tabular-nums">
                          {fmt(i)}
                        </span>
                        <span className="text-zinc-400 text-[7px] font-bold tracking-wide uppercase truncate">
                          {mod.title}
                        </span>
                      </div>

                      {/* Pages for this module */}
                      {modulePages.map((src, j) => (
                        <div
                          key={j}
                          className="relative w-full aspect-[1/1.414]"
                        >
                          <Image
                            src={src}
                            alt={`${mod.title} — page ${startPage + j + 1}`}
                            fill
                            sizes="276px"
                            className="object-cover object-top"
                          />
                        </div>
                      ))}
                    </div>
                  );
                })
              ) : (
                <div className="flex flex-col items-center justify-center h-full gap-3 text-zinc-700 px-6 text-center">
                  <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                  </svg>
                  <span className="text-[10px] font-bold uppercase tracking-widest">No preview available</span>
                </div>
              )}
            </div>

            {/* Home indicator */}
            <div className="flex-shrink-0 flex justify-center items-center h-4 bg-black">
              <div className="w-14 h-1 bg-zinc-700 rounded-full" />
            </div>
          </div>
        </div>

        {/* Scroll hint — lives outside the scaled shell */}
        <p className="text-center text-zinc-600 text-[9px] font-bold tracking-[2px] uppercase mt-4">
          Tap a module to navigate · Scroll to browse
        </p>
      </div>
    </div>
  );
}

export default function ModulesAccordion({ modules, bookletFolder, bookletPageCount }: Props) {
  const [active, setActive] = useState(0);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleClick = (i: number) => {
    setActive(i);
    setOpenIndex((prev) => (prev === i ? null : i));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-12 xl:gap-16 items-center">

      {/* ── Left: clickable module list ── */}
      <div className="divide-y divide-zinc-800 border-t border-zinc-800">
        {modules.map((mod, i) => (
          <div key={i}>
            <button
              type="button"
              onClick={() => handleClick(i)}
              className={`w-full flex items-center gap-4 py-5 px-1 transition-colors duration-150 ${
                i === active ? "cursor-default" : "hover:bg-zinc-800/30"
              }`}
            >
              <span
                className={`text-xs font-black tabular-nums tracking-widest w-6 flex-shrink-0 transition-colors duration-150 ${
                  i === active ? "text-[#CE1A19]" : "text-zinc-600"
                }`}
              >
                {fmt(i)}
              </span>

              <span
                className={`flex-1 text-left text-sm font-bold tracking-wide uppercase transition-colors duration-150 ${
                  i === active ? "text-white" : "text-zinc-400"
                }`}
              >
                {mod.title}
              </span>

              <span
                className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 border transition-all duration-200 ${
                  i === active
                    ? "bg-[#CE1A19] border-[#CE1A19]"
                    : "bg-transparent border-zinc-700 hover:border-zinc-500"
                }`}
              >
                <svg
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    i === active ? "text-white rotate-90" : "text-zinc-500"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </span>
            </button>

            {/* Topics panel — expands below the button on all screen sizes */}
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                openIndex === i ? "max-h-[600px] pb-5" : "max-h-0"
              }`}
            >
              <div className="pl-10 pr-1 pt-2 pb-1">
                <p className="text-zinc-500 text-[10px] font-black tracking-[3px] uppercase mb-3">
                  What you&apos;ll cover
                </p>
                <ul className="space-y-2.5" role="list">
                  {mod.topics.map((topic) => (
                    <li key={topic} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 bg-[#CE1A19] mt-1.5 flex-shrink-0 rounded-full" aria-hidden="true" />
                      <span className="text-zinc-300 text-sm leading-snug">{topic}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Right: sticky tablet mockup — desktop only ── */}
      <div className="hidden lg:flex justify-center">
        <div className="sticky top-28">
          <TabletMockup
            active={active}
            modules={modules}
            bookletFolder={bookletFolder}
            bookletPageCount={bookletPageCount}
          />
        </div>
      </div>

    </div>
  );
}
