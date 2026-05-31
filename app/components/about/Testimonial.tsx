"use client";

import { testimonialSection } from "@/app/content/about";

export default function Testimonial() {
  return (
    <section
      aria-label="Featured graduate testimonial"
      className="bg-zinc-900 texture-dots-dark angle-tr-lg pb-20 md:pb-28 pt-[152px] md:pt-[184px] relative overflow-hidden"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 text-zinc-950 font-black text-[12rem] md:text-[16rem] select-none opacity-20 pointer-events-none leading-none z-0">
        &ldquo;
      </div>

      <div className="reveal mx-auto max-w-4xl px-6 lg:px-8 text-center relative z-10">
        <p className="text-[#CE1A19] text-xs font-bold tracking-widest uppercase mb-10">
          {testimonialSection.label}
        </p>

        <blockquote className="m-0 p-0">
          <p className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-relaxed max-w-3xl mx-auto mb-10">
            &ldquo;{testimonialSection.quote}&rdquo;
          </p>

          <div className="w-14 h-1 bg-[#CE1A19] mx-auto mb-8" aria-hidden="true" />

          <footer className="mt-6">
            <cite className="not-italic text-white text-xs font-bold tracking-widest uppercase">
              {testimonialSection.name} <span className="text-white">&middot;</span> {testimonialSection.role}
            </cite>
          </footer>
        </blockquote>
      </div>
    </section>
  );
}
