"use client";

import Image from "next/image";
import SectionWrapper from "@/app/components/ui/SectionWrapper";

import { aboutStats as STATS } from "@/app/content/about";

export default function AboutStats() {
  return (
    <section className="bg-zinc-50 texture-dots-light angle-tl pb-16 md:pb-20 pt-[116px] md:pt-[132px]">
      <SectionWrapper reveal>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-12 gap-y-12 sm:gap-y-0">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className={`flex flex-col items-start pl-6 ${stat.label !== "Accredited Partner" ? "border-l-2 border-zinc-200" : ""}`}
            >
              <p className="text-xs text-zinc-600 uppercase tracking-wider mt-4 font-bold order-last">
                {stat.label}
              </p>
              {stat.type === "image" ? (
                <div className="h-12 flex items-end w-auto relative order-first">
                  <Image
                    src={stat.src}
                    alt={stat.alt}
                    width={stat.width}
                    height={stat.height}
                    priority
                    className={`${stat.alt === "CIMSPA" ? "h-12" : "h-7"} w-auto object-contain block`}
                  />
                </div>
              ) : (
                <p className="text-4xl md:text-5xl font-black text-zinc-950 tracking-tight m-0 p-0 leading-none select-all order-first">
                  {stat.value}
                </p>
              )}
            </div>
          ))}
        </div>
      </SectionWrapper>
    </section>
  );
}
