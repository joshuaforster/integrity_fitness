"use client";

import { useEffect, useRef } from "react";
import Button from "@/app/components/Button";
import HeroStats from "./HeroStats";

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
          <p className="flex items-center gap-3 text-white text-xs font-semibold tracking-[4px] uppercase mb-4">
            <span className="w-6 h-px bg-[#CE1A19] flex-shrink-0" />
            Integrity Fitness Education · Norwich, Norfolk
          </p>

          <h1
            id="hero-heading"
            className="text-4xl md:text-5xl font-bold leading-tight max-w-2xl mb-4 text-white"
          >
            Raising The Standards Of Personal Training Qualifications
          </h1>

          <div className="w-14 h-1 bg-[#CE1A19] mb-6" aria-hidden="true" />

          <p className="text-white max-w-lg leading-relaxed mb-8 text-base md:text-lg opacity-95">
            One-to-one learning like no other. We prepare the next generation of
            personal trainers to enter the fitness industry with confidence.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
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
          </div>

          {/* Rendered directly within the content container over video background */}
          <HeroStats />
        </div>
      </div>
    </section>
  );
}