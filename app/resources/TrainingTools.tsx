"use client";

import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const CATEGORIES = ["All", "Body Composition", "Nutrition", "Performance"] as const;
type Category = (typeof CATEGORIES)[number];

const TOOLS = [
  {
    id: "bmi",
    category: "Body Composition" as Category,
    label: "Body Composition",
    title: "Contextual BMI & Composition",
    tagline:
      "Go beyond standard BMI. Account for muscle mass and body fat to understand what your numbers actually mean.",
    href: "/bmi",
    badge: null,
  },
  {
    id: "tdee",
    category: "Nutrition" as Category,
    label: "Nutrition",
    title: "TDEE & Macro Calculator",
    tagline:
      "Calculate your Total Daily Energy Expenditure and build a macro protocol matched to your goal.",
    href: "/tdee",
    badge: null,
  },
  {
    id: "protein",
    category: "Nutrition" as Category,
    label: "Nutrition",
    title: "Protein Distribution Planner",
    tagline:
      "Find out how to spread your daily protein across meals to maximise muscle protein synthesis.",
    href: "/protein",
    badge: null,
  },
  {
    id: "rm",
    category: "Performance" as Category,
    label: "Performance",
    title: "1RM Strength Estimator",
    tagline:
      "Estimate your one-rep max using the Epley formula and generate percentage-based intensity targets.",
    href: "/rm",
    badge: null,
  },
];

const gridVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariant: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

export default function TrainingTools() {
  const [active, setActive] = useState<Category>("All");

  const filtered =
    active === "All" ? TOOLS : TOOLS.filter((t) => t.category === active);

  return (
    <section
      aria-labelledby="training-tools-heading"
      className="py-20 md:py-28 border-b border-zinc-200/60"
    >
      <div className="reveal mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-10 md:mb-12">
          <p className="text-[#CE1A19] text-xs font-bold tracking-widest uppercase mb-4">
            Training Tools
          </p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <h2
                id="training-tools-heading"
                className="text-2xl md:text-4xl font-black text-zinc-950 tracking-tight uppercase leading-none"
              >
                Body, Nutrition &amp; Performance
              </h2>
              <div className="w-14 h-1 bg-[#CE1A19] mt-5" aria-hidden="true" />
            </div>
            <div className="border-l-2 border-zinc-200 pl-5 max-w-md">
              <p className="text-zinc-600 text-base leading-relaxed">
                Tools built around the science your personal trainer uses every day. Use them to understand your body, plan your nutrition, and programme your training.
              </p>
            </div>
          </div>
        </div>

        {/* Category filter */}
        <div className="mb-8">
          {/* Desktop: pill buttons */}
          <div className="hidden sm:flex gap-2 flex-wrap">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActive(cat)}
                className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-200 ${
                  active === cat
                    ? "bg-[#CE1A19] text-white shadow-[0_2px_12px_rgba(206,26,25,0.3)]"
                    : "bg-white border border-zinc-200 text-zinc-600 hover:border-[#CE1A19] hover:text-[#CE1A19]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Mobile: dropdown */}
          <div className="sm:hidden">
            <label htmlFor="training-category" className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">
              Filter by category
            </label>
            <select
              id="training-category"
              value={active}
              onChange={(e) => setActive(e.target.value as Category)}
              className="w-full border border-zinc-200 rounded-lg px-4 py-3 text-sm font-medium text-zinc-950 bg-white focus:outline-none focus:ring-2 focus:ring-[#CE1A19] focus:border-[#CE1A19]"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        <motion.div
          key={active}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          variants={gridVariants}
          initial="hidden"
          animate="visible"
        >
          {filtered.map((tool) => (
            <motion.div
              key={tool.id}
              variants={cardVariant}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.97 }}
              className="flex"
            >
              <Link
                href={tool.href}
                className="relative flex flex-col h-full bg-white rounded-2xl overflow-hidden border border-zinc-200 shadow-[0_2px_8px_rgba(0,0,0,0.05),0_8px_28px_rgba(0,0,0,0.07)] hover:shadow-[0_4px_16px_rgba(206,26,25,0.14),0_20px_52px_rgba(0,0,0,0.13)] hover:border-[#CE1A19] transition-all duration-300 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CE1A19] focus-visible:ring-offset-2 w-full"
              >
                <div className="h-[3px] w-full bg-[#CE1A19] flex-shrink-0" aria-hidden="true" />

                <div className="relative flex flex-col h-full p-6 pt-5">
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-[#CE1A19] text-xs font-black uppercase tracking-[0.18em] leading-none">
                      {tool.label}
                    </span>
                    {tool.badge && (
                      <span className="bg-[#CE1A19] text-white text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full shrink-0 leading-none">
                        {tool.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-black text-zinc-950 leading-tight mb-3 group-hover:text-[#CE1A19] transition-colors duration-300">
                    {tool.title}
                  </h3>

                  <p className="text-zinc-600 text-sm leading-relaxed flex-1 mb-5">
                    {tool.tagline}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-zinc-100 mt-auto">
                    <span className="text-xs font-black text-zinc-700 uppercase tracking-[0.18em] group-hover:text-[#CE1A19] transition-colors duration-200">
                      Open Tool
                    </span>
                    <span className="w-8 h-8 rounded-full border border-zinc-200 flex items-center justify-center shrink-0 group-hover:bg-[#CE1A19] group-hover:border-[#CE1A19] transition-all duration-200">
                      <ArrowRightIcon className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white group-hover:translate-x-px transition-all duration-200" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
