"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

export interface TestimonialItem {
  name: string;
  body: string;
  date?: string;
  subtitle?: string;
}

const DEFAULT_TESTIMONIALS: readonly TestimonialItem[] = [
  {
    name: "Grace Sandford",
    body: "I am a fairly new client/student at Integrity Fitness Education but I already feel so well supported. The information I need is easily accessible and support sessions are also available when needed. It works well as I am able to study alongside work and I'm excited about the progress that I've made so far already and that's all thanks to Harry and Paris. If you are looking to get your level 2 & 3 qualifications, I couldn't recommend them enough!",
    subtitle: "Recent Student",
  },
  {
    name: "Charlie Wade",
    body: "When it comes to tutoring you expect a top standard that not only delivers academic results but also people management for getting them through the course on what's bespoke for the student. Integrity fitness education does that amazingly and goes beyond that. Harry and Paris have only been an essential part of my education. I cannot thank the team enough. Without this company I wouldn't be doing so well in my PT business.",
    subtitle: "PT Business Owner",
  },
  {
    name: "Viktoria Fitt",
    body: "I recently gained my Level 3 Personal Trainer qualification with Integrity Fitness Education, and couldn't recommend them more. Throughout the entire course I felt completely supported and was provided with a wealth of additional resources.",
    subtitle: "Level 3 Graduate",
  },
  {
    name: "Megan Brown",
    body: "Highly recommend Integrity Fitness to gain your qualification of becoming a personal trainer, through to additional qualifications to better yourself and what you can offer as a PT. Harry and Paris offer fantastic knowledge and support throughout and provide a genuine service. Highly recommend them!",
    subtitle: "Alumni Coach",
  },
  {
    name: "Poppy Hawkins",
    body: "Both Paris and Harry were amazing when it came to helping me to complete my Level 3 Personal Training qualification. They always made sure to answer any questions I had and made an effort to reach out and speak to me one on one about my progress.",
    subtitle: "Level 3 Graduate",
  },
  {
    name: "Aine Kuzeviciute",
    body: "Integrity Fitness Education have been brilliant. The content they provide has an incredible amount of information, the videos which help fill out the coursework and get ready for practical exams are also incredibly helpful. All the content is exceptional.",
    subtitle: "Course Student",
  },
  {
    name: "Sandrine Modesti",
    body: "Really enjoying the course! Paris and Harry are both friendly, very knowledgeable, obviously love what they do, and are great at sharing their passion for the benefits of exercise and Personal Training. The course material is well structured.",
    subtitle: "Current Student",
  },
  {
    name: "Hannah Lev",
    body: "Amazing experience! Both Paris and Harry have been super helpful throughout the whole course! They allowed me to go at my pace as I had a time frame before moving country and they were excellent in making sure I was able to achieve that!",
    subtitle: "Level 3 Graduate",
  },
] as const;

function Stars() {
  return (
    <div className="flex gap-0.5 mb-4" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className="w-4 h-4 text-amber-400"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
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

const textBlockContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const textChildElement: Variants = {
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
  const touchStartX = useRef<number | null>(null);

  function handleNext() {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  }

  function handlePrev() {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  }

  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }

  function handleTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null) return;
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 40) {
      delta > 0 ? handleNext() : handlePrev();
    }
    touchStartX.current = null;
  }

  if (items.length === 0) return null;

  return (
    <section
      className="py-16 md:py-24 lg:py-28 bg-zinc-50 border-y border-zinc-200/80 overflow-hidden w-full"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column: Headings & Navigation Controls */}
        <div className="lg:col-span-5 text-left flex flex-col items-start w-full">
          <div className="inline-flex items-center gap-2.5 bg-white border border-zinc-200/80 rounded-full py-1.5 px-3.5 mb-6 shadow-xs select-none">
            <GoogleIcon className="w-4 h-4 shrink-0" />
            <span className="text-zinc-800 text-xs font-black uppercase tracking-wider font-mono">
              5.0 Star Google Reviews
            </span>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={textBlockContainer}
            className="w-full"
          >
            <motion.p
              variants={textChildElement}
              className="text-[#CE1A19] text-xs font-bold tracking-[4px] uppercase mb-4"
            >
              Student Validation
            </motion.p>
            <motion.h2
              variants={textChildElement}
              className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-zinc-950 uppercase leading-[1.1] max-w-sm"
            >
              Stories From <br />
              Our Cohorts.
            </motion.h2>
            <motion.div
              variants={{
                hidden: { scaleX: 0 },
                visible: { scaleX: 1, transition: { duration: 0.5 } },
              }}
              className="w-14 h-1 bg-[#CE1A19] mt-5 mb-6 origin-left"
              aria-hidden="true"
            />
            <motion.p
              variants={textChildElement}
              className="text-zinc-600 text-sm md:text-base leading-relaxed font-medium max-w-md"
            >
              Review real training insights directly from students working
              across the local Norwich fitness network.
            </motion.p>
          </motion.div>

          <div className="flex items-center gap-3 mt-8 lg:mt-10">
            <button
              type="button"
              onClick={handlePrev}
              className="w-12 h-12 flex items-center justify-center border border-zinc-200 bg-white text-zinc-700 hover:border-zinc-950 hover:text-zinc-950 rounded-sm shadow-xs transition-all active:scale-95 outline-none cursor-pointer"
              aria-label="View previous review card"
            >
              <ChevronLeftIcon className="w-5 h-5 stroke-[2.5]" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="w-12 h-12 flex items-center justify-center border border-zinc-200 bg-white text-zinc-700 hover:border-zinc-950 hover:text-zinc-950 rounded-sm shadow-xs transition-all active:scale-95 outline-none cursor-pointer"
              aria-label="View next review card"
            >
              <ChevronRightIcon className="w-5 h-5 stroke-[2.5]" />
            </button>
          </div>
        </div>

        {/* Right Column: Mobile-Ready Defensively Boxed Stack Arena */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center relative w-full max-w-md mx-auto lg:max-w-none">
          {/* Locked height boundaries protect alignment across screen splits */}
          <div className="relative w-full h-[340px] sm:h-[300px] flex items-center justify-center">
            <AnimatePresence mode="popLayout">
              {Array.from({ length: Math.min(items.length, 3) }).map(
                (_, stackIdx) => {
                  const itemIdx = (currentIndex + stackIdx) % items.length;
                  const t = items[itemIdx];

                  const positionY = stackIdx * 14;
                  const positionScale = 1 - stackIdx * 0.04;
                  const positionZ = 30 - stackIdx;
                  const isTopCard = stackIdx === 0;

                  const skewAngle = stackIdx * (itemIdx % 2 === 0 ? 2.5 : -2.5);
                  const shadowBlur = isTopCard ? "35px" : "15px";
                  const shadowOpacity = isTopCard ? "0.06" : "0.015";

                  return (
                    <motion.div
                      key={t.name}
                      style={{
                        zIndex: positionZ,
                        transformOrigin: "bottom center",
                        boxShadow: `0 20px ${shadowBlur} rgba(24,24,27,${shadowOpacity})`,
                      }}
                      initial={isTopCard ? { x: 80, opacity: 0 } : false}
                      animate={{
                        y: positionY,
                        scale: positionScale,
                        rotate: isTopCard ? 0 : skewAngle,
                        opacity: 1 - stackIdx * 0.32,
                      }}
                      exit={{
                        x: -340,
                        opacity: 0,
                        rotate: -8,
                        transition: { duration: 0.38, ease: "easeInOut" },
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 280,
                        damping: 25,
                      }}
                      className="absolute w-full h-[300px] sm:h-[260px] bg-white border border-zinc-200/90 p-5 sm:p-6 md:p-8 rounded-sm flex flex-col justify-between overflow-hidden select-none"
                    >
                      {/* Anchored Brand Logo Token */}
                      <div
                        className="absolute top-5 right-5 md:top-7 md:right-7 opacity-20"
                        aria-hidden="true"
                      >
                        <GoogleIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>

                      <div className="w-full">
                        <Stars />
                        {/* Responsive clamp boundaries prevent long blocks from pushing content lines down */}
                        <p className="text-zinc-700 text-xs sm:text-sm md:text-base leading-relaxed tracking-wide font-medium line-clamp-5 sm:line-clamp-4 pr-3">
                          &ldquo;{t.body}&rdquo;
                        </p>
                      </div>

                      <div className="flex items-center gap-3 pt-3.5 border-t border-zinc-100 mt-auto w-full">
                        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-zinc-50 border border-zinc-200 flex items-center justify-center text-xs font-black text-zinc-800 font-mono shrink-0">
                          {t.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs sm:text-sm font-black text-zinc-950 tracking-wide leading-none truncate">
                            {t.name}
                          </p>
                          <p className="text-[#CE1A19] text-[9px] sm:text-[10px] font-bold uppercase tracking-wider mt-1 sm:mt-1.5 truncate">
                            {t.subtitle}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  );
                },
              )}
            </AnimatePresence>
          </div>

          {/* Fractional Index Row Layout Wrapper */}
          <div className="w-full flex items-center justify-between px-1 sm:px-2 mt-4 select-none">
            <span className="font-mono text-[11px] sm:text-xs font-bold uppercase tracking-wider text-zinc-400">
              0{currentIndex + 1}{" "}
              <span className="mx-0.5 text-zinc-300">/</span> 0{items.length}
            </span>

            <div
              className="flex gap-1.5 sm:gap-2"
              role="tablist"
              aria-label="Review stack metrics indicators"
            >
              {items.map((_, i) => {
                const isActive = i === currentIndex;
                return (
                  <button
                    key={i}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setCurrentIndex(i)}
                    className={`h-1 rounded-full transition-all duration-300 outline-none cursor-pointer ${
                      isActive
                        ? "bg-[#CE1A19] w-4 sm:w-5"
                        : "w-1.5 bg-zinc-200 hover:bg-zinc-300"
                    }`}
                    aria-label={`Jump inside stack deck to index card view number ${i + 1}`}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
