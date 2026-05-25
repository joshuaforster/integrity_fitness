"use client";

import { useState } from "react";
import Image from "next/image";

// swap for real Active IQ screenshots
const PLACEHOLDER_IMAGES = [
  "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=800&q=80",
];

type Props = { modules: { title: string; topics: string[] }[] };

function fmt(n: number) {
  return String(n + 1).padStart(2, "0");
}

function MockupPanel({
  mod,
  index,
}: {
  mod: { title: string; topics: string[] };
  index: number;
}) {
  return (
    <div className="bg-zinc-950 border border-zinc-800 overflow-hidden shadow-2xl">
      {/* Fake browser chrome */}
      <div className="bg-zinc-900 px-4 py-3 flex items-center gap-3 border-b border-zinc-800">
        <div className="flex gap-1.5 flex-shrink-0" aria-hidden="true">
          <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
          <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
          <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
        </div>
        <div className="flex-1 bg-zinc-950 px-3 py-1.5 text-zinc-500 text-xs font-mono truncate">
          portal.activeiq.co.uk
        </div>
        <span className="text-[9px] font-black tracking-[2px] uppercase text-white bg-[#CE1A19] px-2 py-1 flex-shrink-0">
          Active IQ
        </span>
      </div>

      {/* Image with overlay */}
      <div className="relative h-44 overflow-hidden">
        <Image
          src={PLACEHOLDER_IMAGES[index % PLACEHOLDER_IMAGES.length]}
          alt={mod.title}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/50 to-transparent" />
        <div className="absolute bottom-4 left-5">
          <p className="text-[#CE1A19] text-[10px] font-black tracking-[3px] uppercase mb-0.5">
            Module {fmt(index)}
          </p>
          <h3 className="text-white text-xl font-black uppercase tracking-tight leading-tight">
            {mod.title}
          </h3>
        </div>
      </div>

      {/* Topics */}
      <div className="px-5 pt-5 pb-4">
        <p className="text-zinc-500 text-[10px] font-black tracking-[3px] uppercase mb-4">
          What you&apos;ll cover
        </p>
        <ul className="space-y-3" role="list">
          {mod.topics.map((topic) => (
            <li key={topic} className="flex items-start gap-3">
              <span
                className="w-1.5 h-1.5 bg-[#CE1A19] mt-1.5 flex-shrink-0 rounded-full"
                aria-hidden="true"
              />
              <span className="text-zinc-300 text-sm leading-snug">{topic}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Footer */}
      <div className="px-5 py-3 border-t border-zinc-900">
        <p className="text-zinc-600 text-[10px] font-bold tracking-[2px] uppercase">
          Integrity Fitness Education · CIMSPA Accredited
        </p>
      </div>
    </div>
  );
}

export default function ModulesAccordion({ modules }: Props) {
  const [active, setActive] = useState(0);
  const [mobileOpen, setMobileOpen] = useState<number | null>(0);

  const handleClick = (i: number) => {
    setActive(i);
    setMobileOpen((prev) => (prev === i ? null : i));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-12 xl:gap-16 items-start">
      {/* Left: clickable module list */}
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
              {/* Module number */}
              <span
                className={`text-xs font-black tabular-nums tracking-widest w-6 flex-shrink-0 transition-colors duration-150 ${
                  i === active ? "text-[#CE1A19]" : "text-zinc-600"
                }`}
              >
                {fmt(i)}
              </span>

              {/* Title */}
              <span
                className={`flex-1 text-left text-sm font-bold tracking-wide uppercase transition-colors duration-150 ${
                  i === active
                    ? "text-white"
                    : "text-zinc-400 group-hover:text-zinc-200"
                }`}
              >
                {mod.title}
              </span>

              {/* Chevron in circle */}
              <span
                className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 border transition-all duration-200 ${
                  i === active
                    ? "bg-[#CE1A19] border-[#CE1A19]"
                    : "bg-transparent border-zinc-700 hover:border-zinc-500"
                }`}
              >
                <svg
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    i === active ? "text-white" : "text-zinc-500"
                  } ${mobileOpen === i ? "rotate-90 lg:rotate-0" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </span>
            </button>

            {/* Mobile accordion: topics expand inline */}
            <div
              className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
                mobileOpen === i ? "max-h-[600px] pb-5" : "max-h-0"
              }`}
            >
              <div className="pl-10 pr-1 pt-1">
                <p className="text-zinc-500 text-[10px] font-black tracking-[3px] uppercase mb-3">
                  What you&apos;ll cover
                </p>
                <ul className="space-y-2.5" role="list">
                  {mod.topics.map((topic) => (
                    <li key={topic} className="flex items-start gap-3">
                      <span
                        className="w-1.5 h-1.5 bg-[#CE1A19] mt-1.5 flex-shrink-0 rounded-full"
                        aria-hidden="true"
                      />
                      <span className="text-zinc-400 text-sm leading-snug">
                        {topic}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Right: sticky mockup panel — desktop only */}
      <div className="hidden lg:block">
        <div className="sticky top-28">
          {/*
            All panels are absolutely stacked; min-h keeps the container tall
            enough that layout never shifts when switching modules.
          */}
          <div className="relative min-h-[480px]">
            {modules.map((mod, i) => (
              <div
                key={i}
                className={`absolute top-0 left-0 right-0 transition-all duration-300 ease-out ${
                  i === active
                    ? "opacity-100 translate-y-0 z-10"
                    : "opacity-0 translate-y-2 pointer-events-none z-0"
                }`}
              >
                <MockupPanel mod={mod} index={i} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
