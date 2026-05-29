"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface PageHeroProps {
  image?: string;
  images?: string[];
  label: string;
  title: React.ReactNode;
  subtitle: string;
  minHeight?: "screen" | "60vh" | "55vh" | "45vh";
  scrollIndicator?: boolean;
  compact?: boolean;
  imagePosition?: "center" | "top" | "bottom";
  interval?: number;
  /** Carve a concave quarter-circle from the bottom-right corner.
   *  Pass the CSS background-color of the section immediately below. */
  concaveCorner?: boolean;
  concaveCornerColor?: string;
}

const MIN_HEIGHT_CLASSES: Record<NonNullable<PageHeroProps["minHeight"]>, string> = {
  screen: "min-h-screen",
  "60vh": "min-h-[55vh] sm:min-h-[60vh]",
  "55vh": "min-h-[45vh] sm:min-h-[55vh]",
  "45vh": "min-h-[40vh] sm:min-h-[45vh]",
};

const POSITION_CLASSES: Record<NonNullable<PageHeroProps["imagePosition"]>, string> = {
  center: "object-center",
  top: "object-top",
  bottom: "object-bottom",
};

const H1_CLASSES =
  "text-4xl sm:text-5xl md:text-6xl font-black text-white leading-none uppercase tracking-tight max-w-4xl [text-shadow:0_2px_16px_rgba(0,0,0,0.7),0_1px_4px_rgba(0,0,0,0.5)]";

export default function PageHero({
  image,
  images,
  label,
  title,
  subtitle,
  minHeight = "60vh",
  scrollIndicator = false,
  compact = false,
  imagePosition = "center",
  interval = 6000,
  concaveCorner = false,
  concaveCornerColor = "#fafafa",
}: PageHeroProps) {
  const allImages = images ?? (image ? [image] : []);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    if (allImages.length <= 1) return;
    const id = setInterval(
      () => setActiveIdx((i) => (i + 1) % allImages.length),
      interval,
    );
    return () => clearInterval(id);
  }, [allImages.length, interval]);

  const words = typeof title === "string" ? title.split(" ") : null;
  const positionClass = POSITION_CLASSES[imagePosition];

  return (
    <section
      className={`relative ${MIN_HEIGHT_CLASSES[minHeight]} bg-zinc-950 overflow-hidden flex items-center justify-center`}
    >
      {/* Background images — all eager-loaded so they're ready before they become active */}
      <div className="absolute inset-0" aria-hidden="true">
        {allImages.map((src, i) => (
          <Image
            key={i}
            src={src}
            alt=""
            fill
            sizes="100vw"
            priority={i === 0}
            loading="eager"
            className={`object-cover ${positionClass} select-none pointer-events-none transition-opacity duration-[1500ms] ease-in-out`}
            style={{ opacity: i === activeIdx ? 0.8 : 0, willChange: "opacity" }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/70 to-zinc-950/20 z-[1]" />
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/10 to-transparent z-[2]" />
      </div>

      <div className="relative z-10 w-full flex-1 flex items-center">
        <div
          className={`mx-auto max-w-7xl px-6 lg:px-8 w-full ${
            compact ? "pb-12 pt-24" : "py-24 md:py-32 lg:py-36"
          }`}
        >
          <motion.p
            className="text-[#CE1A19] text-xs font-bold tracking-[4px] uppercase mb-4 [text-shadow:0_1px_8px_rgba(0,0,0,0.6)]"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1, ease: "easeOut" }}
          >
            {label}
          </motion.p>

          {words ? (
            <h1 className={H1_CLASSES}>
              {words.map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.22 + i * 0.07, duration: 0.52, ease: "easeOut" }}
                  className="inline-block mr-[0.25em]"
                >
                  {word}
                </motion.span>
              ))}
            </h1>
          ) : (
            <motion.h1
              className={H1_CLASSES}
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.22, ease: "easeOut" }}
            >
              {title}
            </motion.h1>
          )}

          <motion.div
            className="w-14 h-1 bg-[#CE1A19] mt-6 mb-6 origin-left"
            aria-hidden="true"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.55, delay: 0.55, ease: "easeOut" }}
          />

          <motion.p
            className="text-white text-base md:text-lg max-w-xl leading-relaxed [text-shadow:0_1px_8px_rgba(0,0,0,0.6)]"
            initial={{ opacity: 1, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
          >
            {subtitle}
          </motion.p>
        </div>
      </div>

      {scrollIndicator && (
        <motion.div
          className="absolute bottom-0 left-0 right-0 z-10 flex justify-center pb-8"
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.6 }}
        >
          <div className="flex flex-col items-center gap-1.5 animate-bounce text-white">
            <span className="text-[9px] tracking-[3px] uppercase font-bold">Scroll</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </motion.div>
      )}

      {concaveCorner && (
        <div
          aria-hidden="true"
          className="absolute bottom-0 right-0 z-20 w-24 h-24"
          style={{ backgroundColor: concaveCornerColor, borderTopLeftRadius: "100%" }}
        />
      )}
    </section>
  );
}
