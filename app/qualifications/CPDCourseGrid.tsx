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
      viewport={{ once: false, amount: 0.1 }}
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
            className="flex flex-col justify-between p-6 md:p-8 bg-zinc-50 border border-zinc-200/80 hover:border-zinc-400 hover:shadow-lg transition-all duration-300 group rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-[#CE1A19] h-full"
          >
            <div>
              <span className="text-[#CE1A19] text-xs font-bold tracking-wider uppercase">
                {q.level}
              </span>
              <h3 className="text-zinc-950 font-black text-lg tracking-tight mt-3 mb-2 leading-tight">
                {q.title}
              </h3>
              <p className="text-zinc-600 text-sm leading-relaxed mb-8">{q.tagline}</p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-zinc-200 mt-auto">
              <span className="text-zinc-500 text-xs font-bold tracking-wide uppercase">
                {q.duration}
              </span>
              <span
                className="text-zinc-400 group-hover:text-zinc-950 transform transition-transform duration-300 group-hover:translate-x-1.5 text-sm"
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
