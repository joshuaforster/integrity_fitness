"use client";

import Image from "next/image";
import Button from "@/app/components/Button";

export default function Mission() {
  return (
    <section className="bg-white texture-grid-light py-20 md:py-28 border-t border-zinc-100">
      <div className="reveal mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Left Column — Content Statement (Spans 5 Columns on Large Screen) */}
          <div className="lg:col-span-6 xl:col-span-5">
            <p className="text-[#CE1A19] text-xs font-bold tracking-[4px] uppercase mb-4">
              Who We Are
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-zinc-950 tracking-tight leading-tight mb-6">
              One To One Learning Like No Other
            </h2>
            <div className="w-14 h-1 bg-[#CE1A19] mb-8" aria-hidden="true" />
            
            <div className="space-y-6 text-zinc-600 text-base md:text-lg leading-relaxed mb-10">
              <p>
                At Integrity, we take pride in giving the best possible experience
                by preparing our students to enter the fitness industry confidently
                and ready to thrive.
              </p>
              <p>
                Our team bring the course to life with plenty of professional
                experience and real, applicable tips and tricks that they have
                picked up over the years.
              </p>
            </div>

            <Button href="/about" variant="primary" className="w-full sm:w-auto px-8">
              About Us
            </Button>
          </div>

          {/* Right Column — Testimonial Image Block (Spans 6 Columns on Large Screen) */}
          <div className="lg:col-span-6 xl:col-span-7 relative overflow-hidden min-h-[460px] bg-zinc-950 border border-zinc-900 rounded-sm shadow-sm group">
            <Image
              src="/harry.png"
              alt="Instructor leading a personal training lesson"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
              className="object-cover opacity-80 transition-transform duration-700 ease-out group-hover:scale-[1.02]"
              priority={false}
            />
            {/* Split gradient overlay: Richer black on the left text-anchor side */}
            <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/90 via-zinc-950/75 to-zinc-950/50" />
            
            <div className="relative z-10 p-8 md:p-14 flex flex-col justify-between min-h-[460px] h-full">
              {/* Decorative Quote Mark */}
              <span className="text-6xl text-[#CE1A19] font-serif leading-none select-none" aria-hidden="true">
                &ldquo;
              </span>
              
              <div className="my-auto max-w-md">
                <blockquote className="text-white text-lg md:text-xl font-medium leading-relaxed tracking-wide mb-6">
                  Develop a passion for learning. If you do, you will never cease to grow.
                </blockquote>
                <cite className="text-zinc-400 text-xs tracking-[2px] uppercase font-semibold not-italic block">
                  — Anthony J. D&apos;Angelo
                </cite>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}