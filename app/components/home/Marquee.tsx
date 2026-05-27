"use client";

const ITEMS = [
  "CIMSPA Accredited",
  "1:1 Learning",
  "Active IQ",
  "Norwich, Norfolk",
  "Real Results",
  "Industry Leading",
  "Career Ready",
] as const;

export default function Marquee() {
  return (
    <div
      aria-hidden="true"
      className="relative bg-[#CE1A19] py-4 border-y border-red-700/20 overflow-hidden select-none"
    >
      {/* Edge feathering gradient overlays to smooth the text entry/exit transitions */}
      <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#CE1A19] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#CE1A19] to-transparent z-10 pointer-events-none" />

      {/* Outer flex container tracking hardware-accelerated scroll keyframes */}
      <div className="flex whitespace-nowrap min-w-full">
        <div className="flex animate-marquee shrink-0 items-center min-w-full gap-8 pr-8">
          {[...ITEMS, ...ITEMS].map((item, i) => (
            <span
              key={i}
              className="inline-flex items-center text-white text-xs font-black uppercase tracking-[3px]"
            >
              <span>{item}</span>
              <span className="ml-8 text-white/40 text-[9px] antialiased">
                ◆
              </span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
