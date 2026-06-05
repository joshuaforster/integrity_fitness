"use client";

import { motion, type Variants } from "framer-motion";
import Link from "next/link";
import { type Qualification } from "@/app/data/qualifications";

const gridVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18 } },
};

const cardVariant: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: "easeOut" } },
};

export default function CPDCourseGrid({ courses }: { courses: Qualification[] }) {
  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      variants={gridVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      {courses.map((q) => (
        <motion.div
          key={q.slug}
          variants={cardVariant}
          whileHover={{ y: -6, transition: { duration: 0.22 } }}
          whileTap={{ scale: 0.97 }}
        >
          <Link
            href={`/qualifications/${q.slug}`}
            className="relative flex flex-col bg-white border border-zinc-200 hover:border-[#CE1A19] shadow-[0_2px_8px_rgba(0,0,0,0.05),0_8px_28px_rgba(0,0,0,0.07)] hover:shadow-[0_4px_16px_rgba(206,26,25,0.14),0_20px_52px_rgba(0,0,0,0.13)] transition-all duration-300 group rounded-2xl h-full overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-[#CE1A19]"
          >
            <div className="h-[3px] w-full bg-[#CE1A19] flex-shrink-0" aria-hidden="true" />
            <div className="flex flex-col flex-1 justify-between p-6 md:p-8">
            <div>
              <span className="text-[#CE1A19] text-xs font-bold tracking-wider uppercase">
                {q.level}
              </span>
              <h3 className="text-zinc-900 font-black text-lg tracking-tight mt-3 mb-2 leading-tight group-hover:text-[#CE1A19] transition-colors duration-300">
                {q.title}
              </h3>
              <p className="text-zinc-600 text-sm leading-relaxed mb-8">{q.tagline}</p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-zinc-100 mt-auto">
              <span className="text-zinc-500 text-xs font-bold tracking-wide uppercase">
                {q.duration}
              </span>
              <span
                className="text-zinc-400 group-hover:text-[#CE1A19] transform transition-all duration-300 group-hover:translate-x-1.5 text-sm"
                aria-hidden="true"
              >
                →
              </span>
            </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}
