"use client";

import { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";

const topicContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const topicItem: Variants = {
  hidden: { opacity: 0, x: -8 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const checkCircle: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: { pathLength: 1, opacity: 1, transition: { duration: 0.8, ease: "easeInOut" } },
};

const checkMark: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: { pathLength: 1, opacity: 1, transition: { duration: 0.5, ease: "easeInOut", delay: 0.6 } },
};

function TopicCheck() {
  return (
    <motion.svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="flex-shrink-0 mt-0.5">
      <motion.circle cx="8" cy="8" r="7" stroke="#16a34a" strokeWidth="1.5" fill="none" variants={checkCircle} />
      <motion.path d="M5 8L7.2 10.2L11 6" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" variants={checkMark} />
    </motion.svg>
  );
}

type Module = { title: string; topics: string[] };

function fmt(n: number) { return String(n + 1).padStart(2, "0"); }

export default function ModulesAccordion({ modules }: { modules: Module[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-2">
      {modules.map((mod, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 0.6, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
          className={`rounded-lg border overflow-hidden transition-all duration-300 ${
            openIndex === i
              ? "bg-white border-zinc-300 shadow-sm"
              : "border-zinc-200 hover:border-zinc-300"
          }`}
        >
          <button
            type="button"
            onClick={() => setOpenIndex((prev) => (prev === i ? null : i))}
            className="w-full flex items-center gap-4 py-4 px-5 text-left group"
            aria-expanded={openIndex === i}
          >
            <motion.span
              className="text-xs font-black tabular-nums tracking-wider w-6 flex-shrink-0"
              animate={{ color: openIndex === i ? "#CE1A19" : "#d4d4d8" }}
              transition={{ duration: 0.3 }}
            >
              {fmt(i)}
            </motion.span>

            <span className={`flex-1 text-sm font-bold tracking-wide uppercase transition-colors duration-200 ${
              openIndex === i ? "text-zinc-950" : "text-zinc-500 group-hover:text-zinc-700"
            }`}>
              {mod.title}
            </span>

            <motion.span
              animate={{
                backgroundColor: openIndex === i ? "#09090b" : "transparent",
                borderColor: openIndex === i ? "#09090b" : "#e4e4e7",
              }}
              transition={{ duration: 0.25 }}
              className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 border"
            >
              <svg
                className={`w-3 h-3 transition-transform duration-300 ${openIndex === i ? "rotate-90 text-white" : "text-zinc-400"}`}
                fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </motion.span>
          </button>

          <AnimatePresence initial={false}>
            {openIndex === i && (
              <motion.div
                key="panel"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <div className="px-5 pt-3 pb-5 border-t border-zinc-100">
                  <p className="text-[#CE1A19] text-xs font-black tracking-widest uppercase mb-4">
                    What you&apos;ll cover
                  </p>
                  <motion.ul
                    className="space-y-3"
                    role="list"
                    variants={topicContainer}
                    initial="hidden"
                    animate="visible"
                  >
                    {mod.topics.map((topic) => (
                      <motion.li key={topic} variants={topicItem} className="flex items-start gap-3">
                        <TopicCheck />
                        <span className="text-zinc-600 text-sm leading-snug">{topic}</span>
                      </motion.li>
                    ))}
                  </motion.ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
}
