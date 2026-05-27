"use client";

import { motion, type Variants } from "framer-motion";
import Link from "next/link";

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut" } },
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-6 texture-grid-dark">
      <motion.div
        className="text-center max-w-lg"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {/* Big 404 */}
        <motion.div variants={item} className="relative mb-8 select-none">
          <span
            className="text-[clamp(7rem,20vw,14rem)] font-black text-zinc-950 leading-none"
            style={{ WebkitTextStroke: "2px #CE1A19" }}
            aria-hidden="true"
          >
            404
          </span>
          {/* Floating badge */}
          <motion.span
            className="absolute top-4 right-0 md:right-[-2rem] bg-[#CE1A19] text-white text-[9px] font-black uppercase tracking-[2px] px-2.5 py-1.5 rounded-sm"
            animate={{ y: [0, -6, 0], rotate: [0, -2, 0, 2, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          >
            DNF
          </motion.span>
        </motion.div>

        {/* Label */}
        <motion.p
          variants={item}
          className="text-[#CE1A19] text-xs font-bold tracking-[4px] uppercase mb-4"
        >
          Page Not Found
        </motion.p>

        {/* Heading */}
        <motion.h1
          variants={item}
          className="text-white text-2xl md:text-4xl font-black uppercase tracking-tight leading-tight mb-6"
        >
          This page didn&apos;t<br />pass its assessment.
        </motion.h1>

        {/* Subtext */}
        <motion.p variants={item} className="text-zinc-500 text-sm md:text-base leading-relaxed mb-10">
          Looks like this URL dropped out early. The page you&apos;re looking for doesn&apos;t exist — but your fitness career still can.
        </motion.p>

        {/* Animated divider */}
        <motion.div
          variants={item}
          className="flex items-center justify-center gap-3 mb-10"
        >
          <motion.div
            className="h-px bg-[#CE1A19] origin-left"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
            style={{ width: 48 }}
          />
          <motion.span
            className="text-[#CE1A19] text-lg"
            animate={{ rotate: [0, 15, 0, -15, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1, ease: "easeInOut" }}
          >
            ★
          </motion.span>
          <motion.div
            className="h-px bg-[#CE1A19] origin-right"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
            style={{ width: 48 }}
          />
        </motion.div>

        {/* CTAs */}
        <motion.div variants={item} className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-[#CE1A19] text-white text-xs font-black uppercase tracking-[2px] px-7 py-4 rounded-sm hover:bg-[#b01616] transition-colors duration-200"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Back to Home
          </Link>
          <Link
            href="/qualifications"
            className="inline-flex items-center justify-center gap-2 border border-zinc-700 text-zinc-300 text-xs font-black uppercase tracking-[2px] px-7 py-4 rounded-sm hover:border-zinc-500 hover:text-white transition-colors duration-200"
          >
            View Qualifications
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
