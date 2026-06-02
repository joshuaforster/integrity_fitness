"use client";

import { useEffect, useRef } from "react";
import { motion, type Variants } from "framer-motion";
import Button from "@/app/components/ui/Button";
import HeroStats from "./HeroStats";
import { hero } from "@/app/content/home";

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
};

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const el = video;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.pause();
    }

    function skipIntro() { el.currentTime = 8.5; }
    function skipLastFive() {
      if (el.duration && el.currentTime > el.duration - 9) {
        el.currentTime = 8.5;
      }
    }

    if (el.readyState >= 1) {
      skipIntro();
    } else {
      el.addEventListener("loadedmetadata", skipIntro, { once: true });
    }
    el.addEventListener("timeupdate", skipLastFive);
    return () => el.removeEventListener("timeupdate", skipLastFive);
  }, []);

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative bg-black overflow-hidden flex items-center min-h-screen"
    >
      {/* Decorative background */}
      <div className="absolute inset-0" aria-hidden="true">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          tabIndex={-1}
          className="absolute inset-0 w-full h-full object-cover [filter:contrast(1.08)_saturate(1.15)_brightness(1.02)]"
        >
          <source
            src={hero.videoSrc}
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.88)_0%,rgba(0,0,0,0.75)_35%,rgba(0,0,0,0.18)_65%,transparent_85%)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 pt-32 pb-16 md:pt-32">
          <motion.div variants={container} initial="hidden" animate="visible">
            <motion.p
              variants={fadeUp}
              className="flex items-center gap-3 text-white text-xs font-semibold tracking-widest uppercase mb-4"
            >
              <span className="w-6 h-px bg-[#CE1A19] flex-shrink-0" />
              {hero.eyebrow}
            </motion.p>

            <h1
              id="hero-heading"
              className="text-4xl md:text-5xl font-bold leading-tight max-w-2xl mb-4 text-white"
            >
              {hero.heading}
            </h1>

            <motion.div
              variants={fadeIn}
              className="w-14 h-1 bg-[#CE1A19] mb-6"
              aria-hidden="true"
            />

            <p
              className="text-white max-w-lg leading-relaxed mb-8 text-base md:text-lg"
            >
              {hero.body}
            </p>

            <motion.div
              variants={fadeUp}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                href={hero.primaryButton.href}
                variant="outline-hero"
                responsive
                className="bg-[#CE1A19]"
              >
                {hero.primaryButton.label}
              </Button>
              <Button
                href={hero.secondaryButton.href}
                variant="outline-hero"
                responsive
              >
                {hero.secondaryButton.label}
              </Button>
            </motion.div>
          </motion.div>

          <HeroStats />
        </div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 pointer-events-none select-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.7 }}
      >
        <span className="text-white/30 text-[10px] font-mono uppercase tracking-[0.15em]">scroll</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          className="w-5 h-5 border border-white/20 rounded-full flex items-center justify-center"
        >
          <svg width="8" height="6" viewBox="0 0 8 6" fill="none" className="text-white/40" aria-hidden>
            <path d="M1 1.5L4 4.5L7 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}