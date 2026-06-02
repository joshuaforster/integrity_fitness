"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import Button from "@/app/components/ui/Button";
import HeroStats from "./HeroStats";
import { hero } from "@/app/content/home";

// Replace logoUrl values when Harry has the real hosted logo images.
// If logoUrl is absent the gym name is shown as styled text.
const GYMS: { name: string; logoUrl?: string }[] = [
  { name: "PureGym" },
  { name: "David Lloyd" },
  { name: "Nuffield Health" },
  { name: "Anytime Fitness" },
  { name: "The Gym Group" },
  { name: "Bannatyne's" },
  { name: "Virgin Active" },
  { name: "Everyone Active" },
];

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
      className="relative bg-black overflow-hidden flex items-center min-h-[85vh]"
    >
      {/* Video background */}
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
          <source src={hero.videoSrc} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.88)_0%,rgba(0,0,0,0.75)_35%,rgba(0,0,0,0.18)_65%,transparent_85%)]" />
      </div>

      {/* Content — pb-24 leaves room above the logo strip */}
      <div className="relative z-10 w-full">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 pt-32 pb-24 md:pt-32">
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

            <p className="text-white max-w-lg leading-relaxed mb-8 text-base md:text-lg">
              {hero.body}
            </p>

            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4">
              <Button href={hero.primaryButton.href} variant="outline-hero" responsive className="bg-[#CE1A19]">
                {hero.primaryButton.label}
              </Button>
              <Button href={hero.secondaryButton.href} variant="outline-hero" responsive>
                {hero.secondaryButton.label}
              </Button>
            </motion.div>
          </motion.div>

          <HeroStats />
        </div>
      </div>

      {/* Graduate gyms — glass marquee strip */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 inset-x-0 z-10 border-t border-white/[0.08] select-none overflow-hidden"
        style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(12px) saturate(140%)" }}
      >
        <div className="flex items-center">
          {/* Fixed label */}
          <div className="shrink-0 pl-5 pr-4 py-3 flex items-center gap-3 border-r border-white/[0.08]">
            <p className="text-white/30 text-[9px] font-black uppercase tracking-[0.18em] whitespace-nowrap leading-none">
              Graduates<br />work at
            </p>
          </div>

          {/* Scrolling logos */}
          <div className="flex-1 overflow-hidden relative">
            {/* Edge fades */}
            <div className="absolute inset-y-0 left-0 w-8 pointer-events-none z-10" style={{ background: "linear-gradient(to right, rgba(0,0,0,0.45), transparent)" }} />
            <div className="absolute inset-y-0 right-0 w-16 pointer-events-none z-10" style={{ background: "linear-gradient(to left, rgba(0,0,0,0.45), transparent)" }} />

            <div className="flex whitespace-nowrap min-w-full">
              <div className="flex animate-marquee shrink-0 items-center min-w-full gap-2.5 py-3 pr-2.5">
                {[...GYMS, ...GYMS].map((gym, i) => (
                  <div
                    key={i}
                    className="flex-shrink-0 flex items-center justify-center px-4 py-2 rounded-full border border-white/[0.12]"
                    style={{ background: "rgba(255,255,255,0.07)", backdropFilter: "blur(16px) saturate(120%)" }}
                  >
                    {gym.logoUrl ? (
                      <Image
                        src={gym.logoUrl}
                        alt={gym.name}
                        width={80}
                        height={16}
                        className="h-4 w-auto object-contain brightness-0 invert opacity-50"
                      />
                    ) : (
                      <span className="text-white/50 text-[10px] font-bold uppercase tracking-widest whitespace-nowrap">
                        {gym.name}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
