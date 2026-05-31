"use client";

import { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import {
  type TestimonialItem,
  testimonials as DEFAULT_TESTIMONIALS,
} from "@/app/content/testimonials";
import { testimonialsSection as SECTION } from "@/app/content/shared";

function Stars() {
  return (
    <div className="flex gap-0.5 mb-3" role="img" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className="w-4 h-4 text-amber-400"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.47 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

function Avatar({
  name,
  photo,
  size = "md",
}: {
  name: string;
  photo?: string;
  size?: "sm" | "md" | "lg";
}) {
  const sizeClass =
    size === "sm" ? "w-10 h-10" : size === "lg" ? "w-20 h-20" : "w-14 h-14";
  const textSize =
    size === "sm" ? "text-xs" : size === "lg" ? "text-xl" : "text-sm";
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  if (photo) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={photo}
        alt={name}
        className={`${sizeClass} border border-zinc-200 bg-zinc-100 rounded-full shrink-0 object-cover`}
      />
    );
  }

  return (
    <div
      className={`${sizeClass} border border-zinc-200 bg-zinc-100 rounded-full shrink-0 flex items-center justify-center`}
      aria-label={name}
    >
      <span className={`${textSize} font-black text-zinc-500 select-none`}>
        {initials}
      </span>
    </div>
  );
}

const textBlock: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const textChild: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.215, 0.61, 0.355, 1] },
  },
};

export default function StackedTestimonials({
  testimonials,
}: {
  testimonials?: TestimonialItem[];
}) {
  const items = testimonials ?? DEFAULT_TESTIMONIALS;
  const [currentIndex, setCurrentIndex] = useState(0);

  function handleNext() {
    setCurrentIndex((p) => (p + 1) % items.length);
  }
  function handlePrev() {
    setCurrentIndex((p) => (p - 1 + items.length) % items.length);
  }

  if (items.length === 0) return null;

  const current = items[currentIndex];

  return (
    <section className="relative pt-[152px] md:pt-[168px] pb-16 md:pb-24 bg-zinc-50 texture-grid-light angle-tl-lg overflow-hidden w-full">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative">
        {/* Left: heading */}
        <div className="lg:col-span-5 text-left flex flex-col items-start w-full">
          <div className="inline-flex items-center gap-2.5 bg-zinc-100 border border-zinc-200 rounded-full py-1.5 px-3.5 mb-6 select-none">
            <GoogleIcon className="w-4 h-4 shrink-0" />
            <span className="text-zinc-600 text-xs font-black uppercase tracking-wider font-mono">
              {SECTION.googleBadge}
            </span>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={textBlock}
            className="w-full"
          >
            <motion.p
              variants={textChild}
              className="text-[#CE1A19] text-xs font-bold tracking-widest uppercase mb-4"
            >
              {SECTION.label}
            </motion.p>
            <motion.h2
              variants={textChild}
              className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-zinc-900 uppercase leading-[1.1] max-w-sm"
            >
              {SECTION.heading}
            </motion.h2>
            <motion.div
              variants={{
                hidden: { scaleX: 0 },
                visible: { scaleX: 1, transition: { duration: 0.5 } },
              }}
              className="w-14 h-1 bg-[#CE1A19] mt-5 mb-6 origin-left"
              aria-hidden
            />
            <motion.p
              variants={textChild}
              className="text-zinc-600 text-sm md:text-base leading-relaxed font-medium max-w-md"
            >
              {SECTION.body}
            </motion.p>
          </motion.div>

          {/* Name attribution — transitions with the card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4 }}
              className="mt-8 hidden lg:flex items-center gap-3"
            >
              <Avatar name={current.name} photo={current.photo} size="sm" />
              <div>
                <p className="text-zinc-900 text-sm font-black tracking-wide leading-none">
                  {current.name}
                </p>
                <p className="text-[#CE1A19] text-xs font-bold uppercase tracking-wider mt-1">
                  {current.subtitle}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Nav buttons — desktop */}
          <div className="hidden lg:flex items-center gap-3 mt-6">
            <button
              type="button"
              onClick={handlePrev}
              className="w-12 h-12 flex items-center justify-center border border-zinc-200 bg-zinc-100 text-zinc-500 hover:border-zinc-400 hover:text-zinc-900 rounded-lg transition-all active:scale-95 outline-none cursor-pointer"
              aria-label="Previous review"
            >
              <ChevronLeftIcon className="w-5 h-5 stroke-[2.5]" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="w-12 h-12 flex items-center justify-center border border-zinc-200 bg-zinc-100 text-zinc-500 hover:border-zinc-400 hover:text-zinc-900 rounded-lg transition-all active:scale-95 outline-none cursor-pointer"
              aria-label="Next review"
            >
              <ChevronRightIcon className="w-5 h-5 stroke-[2.5]" />
            </button>
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-400 ml-1">
              0{currentIndex + 1} / 0{items.length}
            </span>
          </div>
        </div>

        {/* Right: decorative background quote + card stack */}
        <div className="lg:col-span-7 flex flex-col w-full">
          {/* Desktop-only: large faded review text — sits above the cards, never overlapped */}
          <div className="hidden lg:block w-full overflow-hidden mb-6 px-1" aria-hidden>
            <AnimatePresence mode="wait">
              <motion.p
                key={currentIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
                className="text-4xl xl:text-5xl font-black text-zinc-200 leading-tight line-clamp-2 tracking-tight italic select-none"
              >
                &ldquo;{current.body}&rdquo;
              </motion.p>
            </AnimatePresence>
          </div>

          <div className="flex flex-col items-center w-full max-w-md mx-auto lg:max-w-none">
            {/* Decorative quote mark (mobile only) */}
            <div className="flex justify-start w-full mb-1 pl-1 lg:hidden" aria-hidden>
              <span className="text-5xl font-black text-[#CE1A19] leading-none select-none">
                &ldquo;
              </span>
            </div>

            {/* Card stack: 2 static ghost cards + 1 animated front card */}
            <div className="relative w-full h-[380px]">
              {/* Ghost card 2 (furthest back) */}
              <div
                aria-hidden
                className="absolute inset-0 bg-white border border-zinc-200 rounded-2xl pointer-events-none select-none"
                style={{
                  transform: "translateY(28px) scale(0.88) rotate(2deg)",
                  opacity: 0.3,
                  zIndex: 0,
                }}
              />
              {/* Ghost card 1 */}
              <div
                aria-hidden
                className="absolute inset-0 bg-white border border-zinc-200 rounded-2xl pointer-events-none select-none"
                style={{
                  transform: "translateY(14px) scale(0.94) rotate(-1.5deg)",
                  opacity: 0.55,
                  zIndex: 1,
                }}
              />

              {/* Active card — only this one animates */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  style={{
                    zIndex: 10,
                    boxShadow:
                      "0 24px 48px rgba(0,0,0,0.10), 0 4px 12px rgba(0,0,0,0.06)",
                  }}
                  initial={{ x: 60, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -80, opacity: 0, rotate: -4 }}
                  transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.18}
                  onDragEnd={(
                    _: unknown,
                    info: { offset: { x: number } },
                  ) => {
                    if (info.offset.x < -80) handleNext();
                    else if (info.offset.x > 80) handlePrev();
                  }}
                  className="absolute inset-0 bg-white border border-zinc-200 p-5 sm:p-6 md:p-8 rounded-2xl flex flex-col justify-start gap-4 overflow-hidden cursor-grab active:cursor-grabbing"
                >
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#CE1A19] rounded-t-2xl" />

                  <div
                    className="absolute top-5 right-5 md:top-7 md:right-7 opacity-25"
                    aria-hidden
                  >
                    <GoogleIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>

                  <div className="w-full">
                    <Stars />
                    <p className="text-zinc-700 text-xs sm:text-sm md:text-base leading-relaxed tracking-wide font-medium pr-3">
                      {current.body}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 pt-4 border-t border-zinc-100 w-full">
                    <Avatar name={current.name} photo={current.photo} size="lg" />
                    <div className="min-w-0">
                      <p className="text-sm font-black text-zinc-900 tracking-wide leading-none truncate">
                        {current.name}
                      </p>
                      <p className="text-[#CE1A19] text-xs font-bold uppercase tracking-wider mt-1.5 truncate">
                        {current.subtitle}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Counter + dots + mobile nav */}
            <div className="w-full flex items-center justify-between px-1 sm:px-2 mt-4 select-none">
              <span className="font-mono text-xs sm:text-xs font-bold uppercase tracking-wider text-zinc-400">
                0{currentIndex + 1}{" "}
                <span className="mx-0.5 text-zinc-300">/</span> 0{items.length}
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="lg:hidden w-10 h-10 flex items-center justify-center border border-zinc-200 bg-zinc-100 text-zinc-500 hover:text-zinc-900 rounded-lg transition-all active:scale-95 outline-none"
                  aria-label="Previous review"
                >
                  <ChevronLeftIcon className="w-4 h-4 stroke-[2.5]" />
                </button>

                <div
                  className="flex gap-1.5 sm:gap-2"
                  role="tablist"
                  aria-label="Review indicators"
                >
                  {items.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      role="tab"
                      aria-selected={i === currentIndex}
                      onClick={() => setCurrentIndex(i)}
                      className="flex items-center justify-center w-6 h-6 outline-none cursor-pointer touch-manipulation"
                      aria-label={`Go to review ${i + 1}`}
                    >
                      <span
                        className={`block rounded-full transition-all duration-300 ${i === currentIndex ? "bg-[#CE1A19] w-4 sm:w-5 h-1" : "w-1.5 h-1.5 bg-zinc-300 hover:bg-zinc-400"}`}
                      />
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={handleNext}
                  className="lg:hidden w-10 h-10 flex items-center justify-center border border-zinc-200 bg-zinc-100 text-zinc-500 hover:text-zinc-900 rounded-lg transition-all active:scale-95 outline-none"
                  aria-label="Next review"
                >
                  <ChevronRightIcon className="w-4 h-4 stroke-[2.5]" />
                </button>
              </div>
            </div>

            <p className="lg:hidden text-zinc-400 text-xs font-medium tracking-wider mt-3 text-center select-none">
              Drag or swipe to browse
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
