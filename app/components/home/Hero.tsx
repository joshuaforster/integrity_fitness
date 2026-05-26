"use client";

import { useEffect, useRef } from "react";
import { motion, type Variants } from "framer-motion";
import Button from "@/app/components/Button";
import HeroStats from "./HeroStats";

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
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      videoRef.current?.pause();
    }
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
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source
            src="https://pub-6e6bb53af6c34756a861d2c0a8259e84.r2.dev/5319998-uhd_3840_2160_25fps.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 pt-24 pb-16 md:pt-32">
          <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
          >
            <motion.p
              variants={fadeUp}
              className="flex items-center gap-3 text-white text-xs font-semibold tracking-[4px] uppercase mb-4"
            >
              <span className="w-6 h-px bg-[#CE1A19] flex-shrink-0" />
              Integrity Fitness Education · Norwich, Norfolk
            </motion.p>

            <motion.h1
              variants={fadeUp}
              id="hero-heading"
              className="text-4xl md:text-5xl font-bold leading-tight max-w-2xl mb-4 text-white"
            >
              Raising The Standards Of Personal Training Qualifications
            </motion.h1>

            <motion.div
              variants={fadeIn}
              className="w-14 h-1 bg-[#CE1A19] mb-6"
              aria-hidden="true"
            />

            <motion.p
              variants={fadeUp}
              className="text-white max-w-lg leading-relaxed mb-8 text-base md:text-lg opacity-95"
            >
              One-to-one learning like no other. We prepare the next generation of
              personal trainers to enter the fitness industry with confidence.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4">
              <Button
                href="#courses"
                variant="outline-hero"
                className="w-full sm:w-auto bg-[#CE1A19]"
              >
                Become A Personal Trainer
              </Button>
              <Button
                href="#qualifications"
                variant="outline-hero"
                className="w-full sm:w-auto"
              >
                View Qualifications
              </Button>
            </motion.div>
          </motion.div>

          <HeroStats />
        </div>
      </div>
    </section>
  );
}