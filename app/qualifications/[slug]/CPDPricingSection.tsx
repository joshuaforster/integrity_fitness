"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import Button from "@/app/components/ui/Button";
import SectionWrapper from "@/app/components/ui/SectionWrapper";
import AnimatedCheck from "@/app/components/ui/AnimatedCheck";
import { type Qualification } from "@/app/data/qualifications";

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const listVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

// Map known awarding bodies to their logo URLs
const LOGO_URLS: Record<string, string> = {
  "Active IQ": "https://pub-6e6bb53af6c34756a861d2c0a8259e84.r2.dev/General/activeiq.png",
  "CIMSPA": "https://pub-6e6bb53af6c34756a861d2c0a8259e84.r2.dev/cimspa-logo-navy-box%20copy.png",
};

export default function CPDPricingSection({
  qual,
  slant,
}: {
  qual: Qualification;
  slant?: "rise" | "fall";
}) {
  const tier = qual.pricing[0];
  if (!tier) return null;

  const clipPath =
    slant === "rise"
      ? "polygon(0 48px, 100% 0, 100% 100%, 0 100%)"
      : slant === "fall"
        ? "polygon(0 0, 100% 48px, 100% 100%, 0 100%)"
        : undefined;

  const logoUrl = LOGO_URLS[qual.awardingBody];

  return (
    <section
      id="pricing-section"
      aria-labelledby="pricing-heading"
      className={`relative bg-zinc-900 texture-dots-dark overflow-hidden py-20 md:py-28${slant ? " -mt-12 z-10" : " border-t border-zinc-950"}`}
      style={clipPath ? { clipPath } : undefined}
    >
      {/* Darker-at-top depth */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-56"
        style={{ background: "linear-gradient(to bottom, rgba(9,9,11,0.75) 0%, transparent 100%)" }}
      />
      {/* Subtle red bottom-left glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 w-[480px] h-[320px]"
        style={{ background: "radial-gradient(ellipse at 0% 100%, rgba(206,26,25,0.09) 0%, transparent 70%)" }}
      />

      <SectionWrapper reveal>

        {/* Header — mirrors CourseModulesSection */}
        <motion.div
          className="mb-14 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <p className="text-[#CE1A19] text-xs font-bold tracking-[4px] uppercase mb-4">
            Investment
          </p>
          <h2
            id="pricing-heading"
            className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight uppercase"
          >
            Course Fee
          </h2>
          <div className="w-14 h-1 bg-[#CE1A19] mt-6" aria-hidden="true" />
        </motion.div>

        <div className="h-px bg-zinc-800 mb-14 md:mb-16" aria-hidden />

        {/* Editorial 2-col layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* Left: price */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <p className="text-zinc-500 text-[9px] font-black uppercase tracking-[4px] mb-8">
              {tier.name}
            </p>

            <div className="flex items-start leading-none mb-5">
              <span className="text-[1.75rem] font-black text-zinc-500 mt-4 mr-2 select-none">£</span>
              <span
                className="font-black text-white tracking-tight leading-none"
                style={{ fontSize: "clamp(5rem, 12vw, 8rem)" }}
              >
                {tier.price as number}
              </span>
            </div>

            <p className="text-zinc-500 text-[9px] font-bold uppercase tracking-[3.5px] mb-10">
              One-time investment
            </p>

            <p className="text-zinc-300 text-base md:text-lg leading-relaxed max-w-sm">
              {tier.description}
            </p>

            {/* Mobile CTA */}
            <div className="mt-10 lg:hidden">
              <div className="h-px bg-zinc-800 mb-8" aria-hidden />
              <Button href="/contact" variant="primary" size="md" fullWidth>
                Reserve Your Place
              </Button>
              <div className="flex items-center gap-2 mt-4">
                <span className="text-zinc-600 text-[10px] uppercase tracking-wider">{qual.duration}</span>
                {logoUrl && (
                  <>
                    <span className="text-zinc-700">·</span>
                    <Image src={logoUrl} alt={qual.awardingBody} width={56} height={18} className="h-4 w-auto brightness-0 invert opacity-50 object-contain" />
                  </>
                )}
              </div>
            </div>
          </motion.div>

          {/* Right: frosted glass panel with gentle sway */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 0.7, delay: 0.12, ease: "easeOut" }}
          >
            {/* The swaying glass container */}
            <motion.div
              animate={{ x: [0, 5, 0, -5, 0] }}
              transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", repeatType: "loop" }}
              className="[backdrop-filter:blur(20px)_saturate(150%)] bg-white/[0.05] border border-white/[0.1] rounded-xl p-8 md:p-10 flex flex-col shadow-[0_8px_40px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.08)]"
            >
              {/* Top specular line inside glass */}
              <div
                aria-hidden
                className="absolute top-0 left-12 right-12 h-px rounded-full"
                style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.14) 50%, transparent)" }}
              />

              <p className="text-zinc-400 text-[9px] font-black uppercase tracking-[4px] mb-7">
                What&apos;s included
              </p>

              <motion.ul
                className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 mb-10"
                role="list"
                variants={listVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.1 }}
              >
                {tier.includes.map((item) => (
                  <motion.li key={item} className="flex items-start gap-3" variants={itemVariants}>
                    <AnimatedCheck size={14} delay={0} color="#16a34a" />
                    <span className="text-zinc-200 text-sm leading-snug">{item}</span>
                  </motion.li>
                ))}
              </motion.ul>

              {/* Desktop CTA */}
              <div className="hidden lg:block">
                <div className="h-px bg-white/[0.08] mb-8" aria-hidden />
                <div className="flex flex-col sm:flex-row sm:items-center gap-5">
                  <Button href="/contact" variant="primary" size="md">
                    Reserve Your Place
                  </Button>
                  <div className="flex items-center gap-2.5">
                    <span className="text-zinc-500 text-[10px] uppercase tracking-wider">{qual.duration}</span>
                    {logoUrl && (
                      <>
                        <span className="text-zinc-700">·</span>
                        <Image
                          src={logoUrl}
                          alt={qual.awardingBody}
                          width={64}
                          height={20}
                          className="h-[18px] w-auto brightness-0 invert opacity-60 object-contain"
                        />
                      </>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </SectionWrapper>
    </section>
  );
}
