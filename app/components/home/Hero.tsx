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
      className="relative bg-black overflow-hidden flex items-center pt-26 -mt-[120px] min-h-screen"
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
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 to-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 pt-32 pb-16">

          <p className="hero-animate [animation-delay:100ms] text-[#CE1A19] text-xs font-semibold tracking-[4px] uppercase mb-4">
            Integrity Fitness Education · Norwich, Norfolk
          </p>

          <h1
            id="hero-heading"
            className="hero-animate [animation-delay:200ms] text-4xl md:text-6xl font-bold leading-tight max-w-2xl mb-4 text-white"
          >
            Raising The Standards Of Personal Training Qualifications
          </h1>

          <div
            className="hero-animate [animation-delay:300ms] w-14 h-1 bg-[#CE1A19] mb-6"
            aria-hidden="true"
          />

          <p className="hero-animate [animation-delay:400ms] text-white/80 text-base max-w-lg leading-relaxed mb-8">
            One-to-one learning like no other. We prepare the next generation of
            personal trainers to enter the fitness industry with confidence.
          </p>

          <div className="hero-animate [animation-delay:500ms] flex flex-wrap gap-4">
            <a
              href="#courses"
              className="inline-block bg-[#CE1A19] text-white px-8 py-3.5 text-sm font-semibold tracking-widest uppercase hover:bg-red-700 active:scale-[0.97] transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Become A Personal Trainer
            </a>
            <a
              href="#qualifications"
              className="inline-block border-2 border-white/40 text-white px-8 py-3.5 text-sm font-semibold tracking-widest uppercase hover:border-white hover:bg-white/10 active:scale-[0.97] transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              View Qualifications
            </a>
          </div>

          <dl className="hero-animate [animation-delay:600ms] flex flex-wrap gap-8 mt-12 pt-8 border-t border-white/10">
            {STATS.map((stat) => (
              <div key={stat.label} className="flex flex-col-reverse gap-1">
                <dt className="text-xs text-white/50 uppercase tracking-[2px]">
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

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 hero-animate [animation-delay:900ms]"
        aria-hidden="true"
      >
        <span className="text-[9px] uppercase tracking-[3px]">Scroll</span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          className="animate-bounce"
        >
          <path
            d="M8 3L8 13M8 13L4 9M8 13L12 9"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </section>
  );
}
