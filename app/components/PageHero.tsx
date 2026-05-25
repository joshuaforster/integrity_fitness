"use client";

import Image from "next/image";

interface PageHeroProps {
  image: string;
  label: string;
  title: React.ReactNode;
  subtitle: string;
  minHeight?: "screen" | "60vh" | "55vh" | "45vh";
  scrollIndicator?: boolean;
  compact?: boolean;
}

const minHeightClass: Record<
  NonNullable<PageHeroProps["minHeight"]>,
  string
> = {
  screen: "min-h-screen",
  "60vh": "min-h-[55vh] sm:min-h-[60vh]",
  "55vh": "min-h-[45vh] sm:min-h-[55vh]",
  "45vh": "min-h-[40vh] sm:min-h-[45vh]",
};

export default function PageHero({
  image,
  label,
  title,
  subtitle,
  minHeight = "60vh",
  scrollIndicator = false,
  compact = false,
}: PageHeroProps) {
  return (
    <section
      className={`relative ${minHeightClass[minHeight]} bg-zinc-950 overflow-hidden flex flex-col justify-end `}
    >
      {/* Background Media Engine Frame */}
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src={image}
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center opacity-85"
          priority
        />
        {/* Hardware-accelerated split-shroud overlay matrix */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-zinc-950/40 z-[1]" />
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/80 to-transparent z-[2]" />
      </div>

      {/* Hero Content Grid Wrap */}
      <div className="relative z-10 w-full mt-auto">
        <div
          className={`mx-auto max-w-7xl px-6 lg:px-8 ${compact ? "pb-12 pt-28" : "pb-16 md:pb-20 pt-40"}`}
        >
          <p className="text-[#CE1A19] text-xs font-bold tracking-[4px] uppercase mb-4">
            {label}
          </p>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-none uppercase tracking-tight max-w-4xl">
            {title}
          </h1>

          <div className="w-14 h-1 bg-[#CE1A19] mt-6 mb-6" aria-hidden="true" />

          <p className="text-zinc-200 text-base md:text-lg max-w-xl leading-relaxed opacity-95">
            {subtitle}
          </p>
        </div>
      </div>

      {/* Contextual Visual Scroll Indicator */}
      {scrollIndicator && (
        <div
          className="relative z-10 flex justify-center pb-8"
          aria-hidden="true"
        >
          <div className="flex flex-col items-center gap-1.5 animate-bounce text-zinc-500 hover:text-white transition-colors duration-200">
            <span className="text-[9px] tracking-[3px] uppercase font-bold">
              Scroll
            </span>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      )}
    </section>
  );
}
