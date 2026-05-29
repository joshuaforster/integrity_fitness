"use client";

import { motion, type Variants } from "framer-motion";
import Link from "next/link";
import { type Qualification } from "@/app/data/qualifications";

const listVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18 } },
};

const itemVariant: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: "easeOut" } },
};

export default function PTCourseList({ courses }: { courses: Qualification[] }) {
  return (
    <motion.div
      className="lg:col-span-8 space-y-4 w-full"
      variants={listVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.1 }}
    >
      {courses.map((q) => (
        <motion.div
          key={q.slug}
          variants={itemVariant}
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          whileTap={{ scale: 0.98 }}
        >
          <Link
            href={`/qualifications/${q.slug}`}
            className="flex flex-col sm:flex-row sm:items-center justify-between p-6 md:p-8 bg-white border border-zinc-200/60 hover:border-zinc-400 hover:shadow-md transition-all duration-300 group rounded-lg shadow-xs outline-none focus-visible:ring-2 focus-visible:ring-[#CE1A19]"
          >
            <div className="flex-1 max-w-2xl pr-4">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-zinc-500 text-xs font-bold tracking-wider uppercase">
                  {q.level}
                </span>
                {q.badge && (
                  <span className="text-[9px] uppercase tracking-widest text-[#CE1A19] border border-[#CE1A19]/20 bg-[#CE1A19]/5 px-2 py-0.5 font-black rounded-xs">
                    {q.badge}
                  </span>
                )}
              </div>
              <h4 className="text-zinc-950 font-black text-lg md:text-xl group-hover:text-[#CE1A19] transition-colors duration-200">
                {q.title}
              </h4>
              <p className="text-zinc-600 text-sm mt-1.5 leading-relaxed">{q.tagline}</p>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-6 flex-shrink-0 mt-6 sm:mt-0 pt-4 sm:pt-0 border-t sm:border-t-0 border-zinc-100">
              <span className="text-zinc-500 text-xs font-bold tracking-wider uppercase bg-zinc-100 px-3 py-1.5 rounded-lg">
                {q.duration}
              </span>
              <span
                className="text-zinc-400 group-hover:text-zinc-950 transform transition-transform duration-300 group-hover:translate-x-2 text-xl"
                aria-hidden="true"
              >
                →
              </span>
            </div>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}
