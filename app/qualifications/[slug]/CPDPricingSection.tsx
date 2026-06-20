"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import Button from "@/app/components/ui/Button";
import SectionWrapper from "@/app/components/ui/SectionWrapper";
import AnimatedCheck from "@/app/components/ui/AnimatedCheck";
import { type Qualification } from "@/app/data/qualifications";
import StripeTrustBar from "@/app/components/ui/StripeTrustBar";

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

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.65, delay: i * 0.14, ease: "easeOut" },
  }),
};

export default function CPDPricingSection({
  qual,
  slant,
}: {
  qual: Qualification;
  slant?: "rise" | "fall";
}) {
  if (!qual.pricing.length) return null;

  const clipPath =
    slant === "rise"
      ? "polygon(0 80px, 100% 0, 100% 100%, 0 100%)"
      : slant === "fall"
        ? "polygon(0 0, 100% 80px, 100% 100%, 0 100%)"
        : undefined;

  const logoUrl = LOGO_URLS[qual.awardingBody];
  const multiTier = qual.pricing.length > 1;

  return (
    <section
      id="pricing-section"
      aria-labelledby="pricing-heading"
      className={`relative bg-zinc-900 texture-dots-dark overflow-hidden py-20 md:py-28${slant ? " -mt-20 z-10" : " border-t border-zinc-950"}`}
      style={clipPath ? { clipPath } : undefined}
    >
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-56" style={{ background: "linear-gradient(to bottom, rgba(9,9,11,0.75) 0%, transparent 100%)" }} />
      <div aria-hidden className="pointer-events-none absolute bottom-0 left-0 w-[480px] h-[320px]" style={{ background: "radial-gradient(ellipse at 0% 100%, rgba(206,26,25,0.09) 0%, transparent 70%)" }} />

      <SectionWrapper reveal>

        <motion.div
          className="mb-14 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <p className="text-[#CE1A19] text-xs font-bold tracking-widest uppercase mb-4">Investment</p>
          <h2 id="pricing-heading" className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight uppercase">
            {multiTier ? "Choose Your Plan" : "Course Fee"}
          </h2>
          <div className="w-14 h-1 bg-[#CE1A19] mt-6" aria-hidden="true" />
        </motion.div>

        <div className="h-px bg-zinc-800 mb-14 md:mb-16" aria-hidden />

        {multiTier ? (
          /* ── Multi-tier: card grid ── */
          <div className={`grid grid-cols-1 gap-6 ${qual.pricing.length === 2 ? "md:grid-cols-2" : "md:grid-cols-3"}`}>
            {qual.pricing.map((tier, i) => (
              <motion.div
                key={tier.name}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                className="flex"
              >
                <div className={`relative flex flex-col w-full bg-white rounded-xl p-6 md:p-8 border-2 transition-shadow
                  ${tier.highlighted
                    ? "border-[#CE1A19] shadow-[0_0_0_1px_rgba(206,26,25,0.2),0_16px_48px_rgba(0,0,0,0.25)]"
                    : "border-zinc-200 shadow-[0_4px_20px_rgba(0,0,0,0.18)]"
                  }`}
                >
                  {tier.highlighted && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                      <span className="bg-[#CE1A19] text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full whitespace-nowrap">
                        Best Value
                      </span>
                    </div>
                  )}

                  <p className="text-xs font-black uppercase tracking-widest text-zinc-500 mb-1">{tier.name}</p>
                  <p className="text-sm text-zinc-600 leading-snug mb-5">{tier.description}</p>

                  <div className="flex items-baseline gap-1 mb-1">
                    <span className="text-xl font-black text-zinc-400">£</span>
                    <span className="text-5xl font-black text-zinc-900 leading-none">{Math.round(tier.price as number)}</span>
                  </div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-6">One-time</p>

                  <div className="h-px bg-zinc-200 mb-5" aria-hidden />

                  <motion.ul
                    className="space-y-3 flex-1 mb-8"
                    role="list"
                    variants={listVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                  >
                    {tier.includes.map((item) => (
                      <motion.li key={item} className="flex items-start gap-2.5" variants={itemVariants}>
                        <AnimatedCheck size={14} delay={0} color="#16a34a" />
                        <span className="text-sm text-zinc-600 leading-snug">{item}</span>
                      </motion.li>
                    ))}
                  </motion.ul>

                  <Button href={`/courses/${qual.slug}`} variant={tier.highlighted ? "primary" : "outline-light"} size="md" fullWidth>
                    Enrol Now
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          /* ── Single tier: original editorial layout ── */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.7, ease: "easeOut" }}>
              {(() => {
                const tier = qual.pricing[0];
                return (
                  <>
                    <p className="text-zinc-500 text-xs font-black uppercase tracking-widest mb-8">{tier.name}</p>
                    <div className="flex items-start leading-none mb-5">
                      <span className="text-[1.75rem] font-black text-zinc-500 mt-4 mr-2 select-none">£</span>
                      <span className="font-black text-white tracking-tight leading-none" style={{ fontSize: "clamp(5rem, 12vw, 8rem)" }}>
                        {Math.round(tier.price as number)}
                      </span>
                    </div>
                    <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-10">One-time investment</p>
                    <p className="text-zinc-300 text-base md:text-lg leading-relaxed max-w-sm">{tier.description}</p>
                    <div className="mt-10 lg:hidden">
                      <div className="h-px bg-zinc-800 mb-8" aria-hidden />
                      <Button href={`/courses/${qual.slug}`} variant="primary" size="md" fullWidth>Enrol Now</Button>
                      <div className="flex items-center gap-2 mt-4">
                        <span className="text-zinc-600 text-xs uppercase tracking-wider">{qual.duration}</span>
                        {logoUrl && (<><span className="text-zinc-700">·</span><Image src={logoUrl} alt={qual.awardingBody} width={56} height={18} className="h-4 w-auto brightness-0 invert opacity-50 object-contain" /></>)}
                      </div>
                    </div>
                  </>
                );
              })()}
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.7, delay: 0.12, ease: "easeOut" }}>
              <motion.div
                animate={{ x: [0, 5, 0, -5, 0] }}
                transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", repeatType: "loop" }}
                className="[backdrop-filter:blur(20px)_saturate(150%)] bg-white/[0.05] border border-white/[0.1] rounded-lg p-8 md:p-10 flex flex-col shadow-[0_8px_40px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.08)]"
              >
                <p className="text-zinc-400 text-xs font-black uppercase tracking-widest mb-7">What&apos;s included</p>
                <motion.ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 mb-10" role="list" variants={listVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}>
                  {qual.pricing[0].includes.map((item) => (
                    <motion.li key={item} className="flex items-start gap-3" variants={itemVariants}>
                      <AnimatedCheck size={14} delay={0} color="#16a34a" />
                      <span className="text-zinc-200 text-sm leading-snug">{item}</span>
                    </motion.li>
                  ))}
                </motion.ul>
                <div className="hidden lg:block">
                  <div className="h-px bg-white/[0.08] mb-8" aria-hidden />
                  <div className="flex flex-col sm:flex-row sm:items-center gap-5">
                    <Button href={`/courses/${qual.slug}`} variant="primary" size="md">Enrol Now</Button>
                    <div className="flex items-center gap-2.5">
                      <span className="text-zinc-500 text-xs uppercase tracking-wider">{qual.duration}</span>
                      {logoUrl && (<><span className="text-zinc-700">·</span><Image src={logoUrl} alt={qual.awardingBody} width={64} height={20} className="h-[18px] w-auto brightness-0 invert opacity-60 object-contain" /></>)}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        )}

        <div className="mt-10">
          <StripeTrustBar theme="light" />
        </div>

      </SectionWrapper>
    </section>
  );
}
