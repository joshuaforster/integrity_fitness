"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const TOOLS = [
  {
    id: "transition",
    label: "Career Planning",
    title: "Can I Go Full-Time?",
    tagline:
      "Your month-by-month path from employed to self-employed. See the dip, the break-even, and the exact month you beat your old salary — before you hand in your notice.",
    href: "/transition",
    badge: "New",
  },
  {
    id: "income",
    label: "Business",
    title: "PT Income & Tax Calculator",
    tagline:
      "Model your take-home pay across 1-to-1 sessions, online coaching and group classes. Uses live UK tax rates, updated each Budget automatically.",
    href: "/income",
    badge: "Live UK Rates",
  },
  {
    id: "study-time",
    label: "Course Planning",
    title: "Course Timeline Estimator",
    tagline:
      "Find out how long your qualification will realistically take. Dial in your work hours, family situation, and study time to get a personalised estimate.",
    href: "/study-time",
    badge: null,
  },
  {
    id: "niche",
    label: "Career Strategy",
    title: "Find Your Fitness Niche",
    tagline:
      "10 questions. 18 niches. Most PTs pick their niche by accident — this tool helps you pick it on purpose, surfacing opportunities most PTs never discover.",
    href: "/niche",
    badge: "New",
  },
  {
    id: "blog",
    label: "Knowledge",
    title: "Blog & Articles",
    tagline:
      "Advice, perspectives and real stories from the world of fitness education. Read insights from the IFE team on training, nutrition and career development.",
    href: "/blog",
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

export default function BusinessTools() {
  return (
    <section
      aria-labelledby="knowledge-heading"
      className="bg-[#18181B] texture-dots-dark angle-tl pb-20 md:pb-28 pt-[132px] md:pt-[164px]"
    >
      <div className="reveal mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-14 md:mb-20">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 lg:gap-20 mb-12">
            <div>
              <p className="text-[#CE1A19] text-xs font-black tracking-widest uppercase mb-4">
                Business & Knowledge
              </p>
              <h2
                id="knowledge-heading"
                className="text-3xl md:text-5xl font-black text-white tracking-tight uppercase leading-none"
              >
                Earn More. Know
                <br />
                <span className="text-white">More.</span>
              </h2>
              <div className="w-12 h-[3px] bg-[#ffffff] mt-6" aria-hidden="true" />
            </div>
            <p className="text-white text-base leading-relaxed max-w-sm lg:pb-2">
              Plan your finances before you step on the gym floor. Then keep learning with articles from the IFE team on training, nutrition and career development.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-2xl bg-white/[0.04] border border-white/[0.07] p-7 hover:border-white/[0.12] transition-colors duration-300">
              <div className="flex items-center gap-3 mb-4">
                <h3 className="text-xs font-black uppercase tracking-wider text-white">
                  Plan your income
                </h3>
              </div>
              <p className="text-white text-sm leading-relaxed">
                Most new PTs are surprised by self-employment tax. Understanding your National Insurance and Income Tax position before you set your rates means you can price with confidence from day one.
              </p>
            </div>

            <div className="rounded-2xl bg-white/[0.04] border border-white/[0.07] p-7 hover:border-white/[0.12] transition-colors duration-300">
              <div className="flex items-center gap-3 mb-4">
                <h3 className="text-xs font-black uppercase tracking-wider text-white">
                  Keep learning
                </h3>
              </div>
              <p className="text-white text-sm leading-relaxed">
                The IFE blog covers training science, nutrition, career advice and real graduate stories. Read it alongside your qualification to build context that goes beyond the textbook.
              </p>
            </div>
          </div>
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {TOOLS.map((tool) => (
            <motion.div
              key={tool.id}
              variants={cardVariant}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.97 }}
              className="flex"
            >
              <Link
                href={tool.href}
                className="relative flex flex-col h-full bg-white/[0.06] rounded-2xl overflow-hidden border border-white/[0.10] hover:border-[#CE1A19] hover:bg-white/[0.09] transition-all duration-300 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CE1A19] focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900 w-full"
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

                  <h3 className="text-base font-black text-white leading-tight mb-3 group-hover:text-[#CE1A19] transition-colors duration-300">
                    {tool.title}
                  </h3>

                  <p className="text-white/60 text-sm leading-relaxed flex-1 mb-5">
                    {tool.tagline}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-white/[0.10] mt-auto">
                    <span className="text-xs font-black text-white/60 uppercase tracking-[0.18em] group-hover:text-[#CE1A19] transition-colors duration-200">
                      Open Tool
                    </span>
                    <span className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center shrink-0 group-hover:bg-[#CE1A19] group-hover:border-[#CE1A19] transition-all duration-200">
                      <ArrowRightIcon className="w-3.5 h-3.5 text-white/40 group-hover:text-white group-hover:translate-x-px transition-all duration-200" />
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
