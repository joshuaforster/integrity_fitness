"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { type Qualification } from "@/app/data/qualifications";
import { cardVariants } from "@/lib/animations";

export default function RelatedCourseCard({ q, index }: { q: Qualification; index: number }) {
  const startPrice =
    typeof q.pricing[0].price === "number"
      ? q.pricing[0].price
      : (q.pricing[0].price as { yearly: number }).yearly;

  return (
    <motion.div
      variants={cardVariants}
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      className="group relative flex flex-col rounded-2xl overflow-hidden bg-white border border-zinc-200 hover:border-[#CE1A19] shadow-[0_2px_8px_rgba(0,0,0,0.05),0_8px_28px_rgba(0,0,0,0.07)] hover:shadow-[0_4px_16px_rgba(206,26,25,0.14),0_20px_52px_rgba(0,0,0,0.13)] transition-all duration-300"
    >
      <div className="h-[3px] w-full bg-[#CE1A19] flex-shrink-0" aria-hidden="true" />
      <div className="relative h-32 flex-shrink-0 overflow-hidden">
        <Image
          src={q.heroImage}
          alt={q.title}
          fill
          sizes="(max-width:768px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 to-transparent" />
        <span className="absolute top-3 left-3 text-[10px] font-black uppercase tracking-widest bg-zinc-950/70 text-zinc-400 border border-white/10 px-2 py-0.5 rounded-full">
          {q.level}
        </span>
      </div>
      <div className="flex flex-col flex-1 p-4">
        <p className="text-zinc-950 font-bold text-sm leading-snug mb-1 group-hover:text-[#CE1A19] transition-colors duration-300">{q.title}</p>
        <p className="text-zinc-500 text-xs leading-relaxed flex-1 mb-4 line-clamp-2">{q.tagline}</p>
        <div className="flex items-center justify-between pt-3 border-t border-zinc-100">
          <span className="text-zinc-950 font-black">
            £{startPrice}
            {q.hasBillingToggle && <span className="text-xs text-zinc-500 font-bold">+</span>}
          </span>
          <Link
            href={`/courses/${q.slug}`}
            className="text-xs font-bold uppercase tracking-wider text-[#CE1A19] hover:text-red-400 transition-colors"
          >
            Enrol →
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
