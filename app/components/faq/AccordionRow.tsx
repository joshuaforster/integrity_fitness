"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

import { type FAQItem } from "@/app/content/faqs";
export type { FAQItem } from "@/app/content/faqs";

export default function AccordionRow({ q, a, link }: FAQItem) {
  const [isOpen, setIsOpen] = useState(false);
  const panelId = `faq-panel-${q.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 40)}`;

  return (
    <div className="border-b border-zinc-200 last:border-0">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={panelId}
        className="w-full flex items-center justify-between py-5 md:py-6 text-left gap-6 group outline-none focus-visible:ring-2 focus-visible:ring-[#CE1A19] focus-visible:ring-inset"
      >
        <span className="text-zinc-950 font-extrabold text-sm md:text-base leading-snug group-hover:text-[#CE1A19] transition-colors duration-200">
          {q}
        </span>
        <motion.span
          className="w-7 h-7 flex items-center justify-center text-[#CE1A19] flex-shrink-0 rounded-full border border-[#CE1A19]/25"
          animate={{
            rotate: isOpen ? 45 : 0,
            backgroundColor: isOpen ? "rgba(206,26,25,0.08)" : "rgba(206,26,25,0)",
          }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          aria-hidden="true"
        >
          <span className="absolute w-3 h-px bg-[#CE1A19]" />
          <span className="absolute w-px h-3 bg-[#CE1A19]" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={panelId}
            key="panel"
            initial={{ height: 0, opacity: 0, y: -4 }}
            animate={{ height: "auto", opacity: 1, y: 0 }}
            exit={{ height: 0, opacity: 0, y: -4 }}
            transition={{ duration: 0.32, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pl-4 border-l-2 border-[#CE1A19] pb-6">
              <p className="text-zinc-600 text-sm md:text-base leading-relaxed">
                {a}
              </p>
              {link && (
                <Link
                  href={link.href}
                  className="inline-flex items-center gap-1.5 mt-3 text-[#CE1A19] text-xs font-black uppercase tracking-wider hover:underline"
                >
                  {link.label}
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
