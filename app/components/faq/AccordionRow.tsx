"use client";

import { useState } from "react";

export type FAQItem = { q: string; a: string };

export default function AccordionRow({ q, a }: FAQItem) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-zinc-200 last:border-0">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between py-5 md:py-6 text-left gap-6 group outline-none"
      >
        <span className="text-zinc-950 font-extrabold text-sm md:text-base leading-snug group-hover:text-[#CE1A19] transition-colors duration-200">
          {q}
        </span>
        <span
          className="w-5 h-5 flex items-center justify-center text-[#CE1A19] flex-shrink-0 relative"
          aria-hidden="true"
        >
          <span className="absolute w-3.5 h-0.5 bg-currentColor" />
          <span
            className={`absolute w-0.5 h-3.5 bg-currentColor transition-transform duration-200 ease-out ${isOpen ? "rotate-90" : ""}`}
          />
        </span>
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-[300px] pb-6" : "max-h-0"}`}
      >
        <p className="text-zinc-600 text-sm md:text-base leading-relaxed pl-4 border-l-2 border-[#CE1A19]">
          {a}
        </p>
      </div>
    </div>
  );
}
