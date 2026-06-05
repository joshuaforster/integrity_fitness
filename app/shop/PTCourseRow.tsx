"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { type Qualification } from "@/app/data/qualifications";
import Button from "@/app/components/ui/Button";
import { lowestPrice } from "./shopUtils";

export const ptListVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18 } },
};

const ptItemVariant: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: "easeOut" } },
};

export default function PTCourseRow({ q }: { q: Qualification }) {
  const { oneOff, monthly } = lowestPrice(q);

  return (
    <motion.div
      variants={ptItemVariant}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
    >
      <div className="relative flex flex-col sm:flex-row sm:items-center justify-between bg-white border border-zinc-200 hover:border-[#CE1A19] rounded-2xl overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.05),0_8px_28px_rgba(0,0,0,0.07)] hover:shadow-[0_4px_16px_rgba(206,26,25,0.14),0_20px_52px_rgba(0,0,0,0.13)] transition-all duration-300 group">
        <div className="h-[3px] w-full bg-[#CE1A19] absolute top-0 left-0 right-0" aria-hidden="true" />
        <div className="flex flex-col sm:flex-row sm:items-center justify-between w-full p-6 md:p-8 pt-7 md:pt-9">

        <div className="flex-1 max-w-xl pr-4">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-zinc-600 text-xs font-bold tracking-wider uppercase">
              {q.level}
            </span>
            {q.badge && (
              <span className="text-xs uppercase tracking-widest text-[#CE1A19] border border-[#CE1A19]/20 bg-[#CE1A19]/5 px-2 py-0.5 font-black rounded-sm">
                {q.badge}
              </span>
            )}
          </div>
          <h3 className="text-zinc-950 font-black text-lg md:text-xl group-hover:text-[#CE1A19] transition-colors duration-200 mb-1.5">
            {q.title}
          </h3>
          <p className="text-zinc-600 text-sm leading-relaxed">{q.tagline}</p>
        </div>

        <div className="flex flex-col sm:items-end gap-4 flex-shrink-0 mt-6 sm:mt-0 pt-4 sm:pt-0 border-t sm:border-t-0 border-zinc-100">
          <div className="sm:text-right">
            <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-1">From</p>
            <div className="flex items-baseline gap-2 sm:justify-end flex-wrap">
              {monthly !== null && (
                <>
                  <span className="text-xl font-black text-zinc-950 leading-none">
                    £{monthly}
                    <span className="text-sm font-bold text-zinc-500">/mo</span>
                  </span>
                  <span className="text-zinc-400 text-xs">or</span>
                </>
              )}
              <span className={`font-black leading-none ${monthly ? "text-base text-zinc-500" : "text-xl text-zinc-950"}`}>
                £{oneOff}{monthly ? " upfront" : ""}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button href={`/courses/${q.slug}`} variant="primary" size="sm">
              Enrol Now
            </Button>
            <Link
              href={`/qualifications/${q.slug}`}
              className="text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-zinc-950 transition-colors"
            >
              Details →
            </Link>
          </div>
        </div>
        </div>
      </div>
    </motion.div>
  );
}
