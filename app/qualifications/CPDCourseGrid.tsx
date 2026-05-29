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
            className="flex flex-col justify-between p-6 md:p-8 [backdrop-filter:blur(40px)_saturate(130%)_brightness(0.85)] bg-zinc-950/[0.80] border border-white/[0.10] hover:border-white/[0.24] hover:shadow-[0_12px_40px_rgba(0,0,0,0.55)] transition-all duration-300 group rounded-xl h-full outline-none focus-visible:ring-2 focus-visible:ring-[#CE1A19]"
          >
            <div>
              <span className="text-[#CE1A19] text-xs font-bold tracking-wider uppercase">
                {q.level}
              </span>
              <h3 className="text-white font-black text-lg tracking-tight mt-3 mb-2 leading-tight">
                {q.title}
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed mb-8">{q.tagline}</p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-white/[0.08] mt-auto">
              <span className="text-zinc-500 text-xs font-bold tracking-wide uppercase">
                {q.duration}
              </span>
              <span
                className="text-zinc-500 group-hover:text-white transform transition-all duration-300 group-hover:translate-x-1.5 text-sm"
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
