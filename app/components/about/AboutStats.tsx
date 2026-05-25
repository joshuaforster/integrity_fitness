"use client";

import Image from "next/image";

type StatItem =
  | { type: "text"; value: string; label: string }
  | {
      type: "image";
      src: string;
      alt: string;
      width: number;
      height: number;
      label: string;
    };

const STATS: readonly StatItem[] = [
  {
    type: "text",
    value: "1:1",
    label: "Personalised Tuition",
  },
  {
    type: "image",
    src: "/activeiq.png",
    alt: "Active IQ",
    width: 130,
    height: 28,
    label: "Approved Centre",
  },
  {
    type: "image",
    src: "/cimspa.webp",
    alt: "CIMSPA",
    width: 130,
    height: 28,
    label: "Accredited Partner",
  },
] as const;

export default function AboutStats() {
  return (
    <section className="bg-zinc-50 py-16 md:py-20 border-y border-zinc-200/80">
      <div className="reveal mx-auto max-w-7xl px-6 lg:px-8">
        {/* Balanced 3-column description list grid */}
        <dl className="grid grid-cols-1 sm:grid-cols-3 gap-x-12 gap-y-12 sm:gap-y-0">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-start border-l-2 border-zinc-200 pl-6"
            >
              {/* Fixed-height anchor container handles the baseline alignment perfectly */}
              <div className="h-12 flex items-end w-auto relative">
                {stat.type === "image" ? (
                  <Image
                    src={stat.src}
                    alt={stat.alt}
                    width={stat.width}
                    height={stat.height}
                    priority
                    className="h-7 w-auto object-contain block"
                  />
                ) : (
                  <dd className="text-4xl md:text-5xl font-black text-zinc-950 tracking-tight m-0 p-0 leading-none select-all">
                    {stat.value}
                  </dd>
                )}
              </div>

              <dt className="text-xs text-zinc-600 uppercase tracking-[2px] mt-4 font-bold">
                {stat.label}
              </dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
