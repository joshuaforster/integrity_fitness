"use client";

import Image from "next/image";
import Button from "@/app/components/Button";

export default function Stats() {
  return (
    <section className="bg-zinc-900 py-24 md:py-32 border-y border-zinc-800/60">
      <div className="reveal mx-auto max-w-7xl px-6 lg:px-8">
        {/* Asymmetric Split Layout Grid — items-center handles desktop vertical alignment */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Left Column — Context and Header (Spans 5 Columns) */}
          <div className="lg:col-span-5 flex flex-col items-start text-left">
            <p className="text-[#CE1A19] text-xs font-bold tracking-[4px] uppercase mb-4">
              By The Numbers
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight mb-6">
              Built On A Decade Of Experience
            </h2>
            <div className="w-14 h-1 bg-[#CE1A19] mb-8" aria-hidden="true" />
            <p className="text-zinc-400 text-base md:text-lg leading-relaxed mb-8 max-w-md">
              A track record built on transparency and regulatory excellence. We
              deliver premium, recognised qualifications that carry weight in
              the industry.
            </p>
            <Button
              href="/contact"
              variant="primary"
              className="w-full sm:w-auto px-8 py-3.5"
            >
              Start Your Journey
            </Button>
          </div>

          {/* Right Column — Elegant Floating Stats & Logos (Spans 7 Columns) */}
          <div className="lg:col-span-7 w-full lg:pl-8">
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-12 md:gap-y-16">
              {/* Stat 1: Established */}
              <div className="flex flex-col items-start border-l-2 border-zinc-800 pl-6">
                <dd className="text-4xl md:text-5xl font-black text-white tracking-tight m-0 leading-none">
                  2015
                </dd>
                <dt className="text-xs text-zinc-400 uppercase tracking-[2px] mt-3 font-bold">
                  Established
                </dt>
              </div>

              {/* Stat 2: Qualifications */}
              <div className="flex flex-col items-start border-l-2 border-zinc-800 pl-6">
                <dd className="text-4xl md:text-5xl font-black text-white tracking-tight m-0 leading-none">
                  6
                </dd>
                <dt className="text-xs text-zinc-400 uppercase tracking-[2px] mt-3 font-bold">
                  Qualifications Offered
                </dt>
              </div>

              {/* Stat 3: Active IQ Logo Box (Inverted White) */}
              <div className="flex flex-col items-start border-l-2 border-zinc-800 pl-6">
                <div className="h-8 w-auto relative flex items-center">
                  <Image
                    src="/activeiq.png"
                    alt="Active IQ"
                    width={136}
                    height={29}
                    priority
                    className="h-full w-auto object-contain brightness-0 invert"
                  />
                </div>
                <dt className="text-xs text-zinc-400 uppercase tracking-[2px] mt-3 font-bold">
                  Approved Centre
                </dt>
              </div>

              {/* Stat 4: CIMSPA Logo Box (Inverted White) */}
              <div className="flex flex-col items-start border-l-2 border-zinc-800 pl-6">
                <div className="h-8 w-auto relative flex items-center">
                  <Image
                    src="/cimspa.webp"
                    alt="CIMSPA"
                    width={136}
                    height={29}
                    priority
                    className="h-full w-auto object-contain brightness-0 invert"
                  />
                </div>
                <dt className="text-xs text-zinc-400 uppercase tracking-[2px] mt-3 font-bold">
                  Accredited Partner
                </dt>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
