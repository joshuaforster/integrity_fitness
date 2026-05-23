"use client";

import { useEffect, useRef } from "react";

const STATS = [
  { value: "1:1", label: "Learning" },
  { value: "100%", label: "Pass Rate" },
  { value: "Level 3", label: "Qualified" },
] as const;

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
      className="relative bg-black overflow-hidden flex items-center min-h-[110vh] md:min-h-screen"
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
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 pt-16 md:pt-32 pb-16">

          <p className="flex items-center gap-3 text-white text-xs font-semibold tracking-[4px] uppercase mb-4">
            <span className="w-6 h-px bg-[#CE1A19] flex-shrink-0" />
            Integrity Fitness Education · Norwich, Norfolk
          </p>

          <h1
            id="hero-heading"
            className="text-4xl md:text-6xl font-bold leading-tight max-w-2xl mb-4 text-white"
          >
            Raising The Standards Of Personal Training Qualifications
          </h1>

          <div
            className="w-14 h-1 bg-[#CE1A19] mb-6"
            aria-hidden="true"
          />

          <p className="text-white text-base max-w-lg leading-relaxed mb-6">
            One-to-one learning like no other. We prepare the next generation of
            personal trainers to enter the fitness industry with confidence.
          </p>

          <p className="flex items-center gap-2 text-white/60 text-xs tracking-[3px] uppercase mb-8">
            <span className="w-4 h-px bg-[#CE1A19] flex-shrink-0" />
            Defined by honesty &amp; strong moral principles
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#courses"
              className="block text-center w-full sm:w-auto bg-[#CE1A19] text-white px-8 py-3.5 text-sm font-semibold tracking-widest uppercase hover:bg-red-700 active:scale-[0.97] transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Become A Personal Trainer
            </a>
            <a
              href="#qualifications"
              className="block text-center w-full sm:w-auto border-2 border-white/40 text-white px-8 py-3.5 text-sm font-semibold tracking-widest uppercase hover:border-white hover:bg-white/10 active:scale-[0.97] transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              View Qualifications
            </a>
          </div>

          <dl className="flex flex-wrap gap-8 mt-12 pt-8 border-t border-white/10">
            {STATS.map((stat) => (
              <div key={stat.label} className="flex flex-col-reverse gap-1">
                <dt className="text-xs text-white uppercase tracking-[2px]">
                  {stat.label}
                </dt>
                <dd className="text-2xl font-bold text-[#CE1A19] m-0">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
