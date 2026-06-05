"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { type Qualification } from "@/app/data/qualifications";

const gridVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const cardVariant: Variants = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut" } },
};

function levelWatermark(level: string): string {
  return level.replace("Level ", "").replace(" & ", "+");
}

export default function PTCourseList({ courses }: { courses: Qualification[] }) {
  return (
    <motion.div
      className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full"
      variants={gridVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      {courses.map((q) => {
        const mark = levelWatermark(q.level);
        return (
          <motion.div
            key={q.slug}
            variants={cardVariant}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.97 }}
            className="flex"
          >
            <a
              href={`/qualifications/${q.slug}`}
              className="relative flex flex-col h-full bg-white rounded-2xl overflow-hidden border border-zinc-200 shadow-[0_2px_8px_rgba(0,0,0,0.05),0_8px_28px_rgba(0,0,0,0.07)] hover:shadow-[0_4px_16px_rgba(206,26,25,0.14),0_20px_52px_rgba(0,0,0,0.13)] hover:border-[#CE1A19] transition-all duration-300 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CE1A19] focus-visible:ring-offset-2 w-full"
            >
              {/* Red accent bar */}
              <div className="h-[3px] w-full bg-[#CE1A19] flex-shrink-0" aria-hidden="true" />

              {/* Level watermark */}
              <span
                aria-hidden="true"
                className="absolute -bottom-3 -right-2 text-[88px] font-black leading-none select-none pointer-events-none text-zinc-100 tracking-tight group-hover:text-[#CE1A19]/10 transition-colors duration-300"
              >
                {mark}
              </span>

              <div className="relative flex flex-col h-full p-6 pt-5">
                {/* Level + badge */}
                <div className="flex items-center justify-between gap-2 mb-5">
                  <span className="text-[#CE1A19] text-[10px] font-black uppercase tracking-[0.18em] leading-none">
                    {q.level}
                  </span>
                  {q.badge && (
                    <span className="bg-[#CE1A19] text-white text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full shrink-0 leading-none">
                      {q.badge}
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-[1.1rem] font-black text-zinc-950 leading-tight mb-3 group-hover:text-[#CE1A19] transition-colors duration-300">
                  {q.title}
                </h3>

                {/* Tagline */}
                <p className="text-zinc-500 text-[13px] leading-relaxed flex-1 mb-5">
                  {q.tagline}
                </p>

                {/* CTA row */}
                <div className="flex items-center justify-between pt-4 border-t border-zinc-100 mt-auto">
                  <span className="text-[10px] font-black text-zinc-700 uppercase tracking-[0.18em] group-hover:text-[#CE1A19] transition-colors duration-200">
                    View Course
                  </span>
                  <div className="flex items-center gap-2.5">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="https://pub-6e6bb53af6c34756a861d2c0a8259e84.r2.dev/General/activeiq.png"
                      alt="Active IQ"
                      className="h-4 w-auto object-contain opacity-20 group-hover:opacity-70 transition-opacity duration-300"
                    />
                    <span className="w-8 h-8 rounded-full border border-zinc-200 flex items-center justify-center shrink-0 group-hover:bg-[#CE1A19] group-hover:border-[#CE1A19] transition-all duration-200">
                      <ArrowRightIcon className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white group-hover:translate-x-px transition-all duration-200" />
                    </span>
                  </div>
                </div>
              </div>
            </a>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
