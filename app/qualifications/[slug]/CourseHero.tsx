"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import Button from "@/app/components/ui/Button";
import { type Qualification } from "@/app/data/qualifications";

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.7, ease: "easeOut" } },
};

export default function CourseHero({ qual }: { qual: Qualification }) {
  return (
    <section className="relative min-h-[65vh] md:min-h-[70vh] flex items-end bg-zinc-950 overflow-hidden">
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src={qual.heroImage}
          alt=""
          fill
          className="object-cover opacity-85"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-zinc-950/40 z-[1]" />
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/80 to-transparent z-[2]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 pb-16 md:pb-20 pt-40 w-full mt-auto">
        <motion.div variants={container} initial="hidden" animate="visible">
          <motion.div variants={fadeUp} className="flex items-center flex-wrap gap-2.5 mb-4">
            <span className="text-[#CE1A19] text-xs font-bold tracking-[3px] uppercase">
              {qual.awardingBody}
            </span>
            <span className="w-1 h-1 rounded-full bg-zinc-700" />
            <span className="text-white text-xs font-bold tracking-[2px] uppercase">
              {qual.level}
            </span>
            {qual.badge && (
              <>
                <span className="w-1 h-1 rounded-full bg-zinc-700" />
                <span className="text-[9px] uppercase tracking-widest text-white border border-white/20 bg-white/5 px-2 py-0.5 font-bold rounded-xs">
                  {qual.badge}
                </span>
              </>
            )}
          </motion.div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-none uppercase tracking-tight max-w-4xl mb-4">
            {qual.title.split(" ").map((word: string, i: number) => (
              <motion.span
                key={i}
                variants={fadeUp}
                className="inline-block mr-[0.22em]"
              >
                {word}
              </motion.span>
            ))}
          </h1>

          <motion.div variants={fadeIn} className="w-14 h-1 bg-[#CE1A19] mb-6 origin-left" />

          <motion.p
            variants={fadeUp}
            className="text-white text-base md:text-xl max-w-2xl leading-relaxed mb-10"
          >
            {qual.tagline}
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <Button href="/contact" variant="primary" size="md" className="w-full sm:w-auto px-8 shadow-md">
              Enquire Now
            </Button>
            <Button href="/qualifications" variant="outline-dark" size="md" className="w-full sm:w-auto px-8">
              All Qualifications
            </Button>
          </motion.div>

          {/* Accreditation strip */}
          <motion.div
            variants={fadeUp}
            className="mt-8 inline-flex items-center gap-3.5 px-5 py-3 rounded-full [backdrop-filter:blur(16px)_saturate(120%)] bg-white/[0.07] border border-white/[0.12]"
            aria-label="Approved by Active IQ and CIMSPA"
          >
            <span className="text-white/50 text-[9px] font-bold uppercase tracking-[2.5px] whitespace-nowrap">
              Approved by
            </span>
            <div className="w-px h-4 bg-white/20" aria-hidden="true" />
            <Image
              src="https://pub-6e6bb53af6c34756a861d2c0a8259e84.r2.dev/General/activeiq.png"
              alt="Active IQ"
              width={64}
              height={20}
              className="object-contain h-5 w-auto brightness-0 invert opacity-80"
            />
            <div className="w-px h-4 bg-white/20" aria-hidden="true" />
            <Image
              src="https://pub-6e6bb53af6c34756a861d2c0a8259e84.r2.dev/cimspa-logo-navy-box%20copy.png"
              alt="CIMSPA"
              width={64}
              height={20}
              className="object-contain h-5 w-auto brightness-0 invert opacity-80"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
