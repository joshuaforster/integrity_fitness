"use client";

import Image from "next/image";

const STATS = [
  { type: "text", value: "1:1", label: "Learning" },
  {
    type: "image",
    value: "/activeiq.png",
    label: "Qualified",
    width: 1024,
    height: 219,
    alt: "Active IQ",
  },
  {
    type: "image",
    value: "/cimspa.webp",
    label: "Accredited",
    width: 1580,
    height: 1720,
    alt: "CIMSPA",
  },
] as const;

export default function HeroStats() {
  return (
    <div className="w-full mt-12 max-w-3xl border border-white/20 bg-black/20 backdrop-blur-sm p-4 md:p-6 rounded-sm">
      <dl className="grid grid-cols-3 divide-x divide-white/20 text-center">
        {STATS.map((stat, index) => (
          <div
            key={stat.label}
            className={`flex flex-col-reverse items-center ${index === 0 ? "" : "pl-3 md:pl-6"}`}
          >
            <dt className="text-[9px] md:text-[10px] text-zinc-400 uppercase tracking-[2px] mt-2 font-semibold">
              {stat.label}
            </dt>
            <dd className="m-0">
              {stat.type === "image" ? (
                <div className="h-7 w-20 md:h-8 md:w-24 relative">
                  <Image
                    src={stat.value}
                    alt={stat.alt}
                    width={stat.width}
                    height={stat.height}
                    priority
                    className="h-full w-full object-contain brightness-0 invert"
                  />
                </div>
              ) : (
                <span className="text-xl md:text-3xl font-extrabold text-white tracking-tight leading-none">
                  {stat.value}
                </span>
              )}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
