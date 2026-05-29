"use client";

import Image from "next/image";
import SectionWrapper from "@/app/components/ui/SectionWrapper";

const STATS = [
  { type: "text" as const, value: "1:1", label: "Personalised Tuition" },
  {
    type: "image" as const,
    src: "https://pub-6e6bb53af6c34756a861d2c0a8259e84.r2.dev/General/activeiq.png",
    alt: "Active IQ",
    width: 130,
    height: 28,
    label: "Approved Centre",
  },
  {
    type: "image" as const,
    src: "https://pub-6e6bb53af6c34756a861d2c0a8259e84.r2.dev/cimspa-logo-navy-box%20copy.png",
    alt: "CIMSPA",
    width: 130,
    height: 28,
    label: "Accredited Partner",
  },
] as const;

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
              <p className="text-xs text-zinc-600 uppercase tracking-[2px] mt-4 font-bold order-last">
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
