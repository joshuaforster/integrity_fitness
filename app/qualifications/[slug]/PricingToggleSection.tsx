"use client";

import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import Button from "@/app/components/Button";
import SectionWrapper from "@/app/components/ui/SectionWrapper";
import AnimatedCheck from "@/app/components/ui/AnimatedCheck";
import PricingComparisonTable from "./PricingComparisonTable";
import { type Qualification } from "@/app/data/qualifications";

const listVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -12 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: i * 0.14, ease: "easeOut" },
  }),
};

export default function PricingToggleSection({ qual }: { qual: Qualification }) {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");
  const highlightedTier = qual.pricing.find((tier) => tier.highlighted);
  const annualSaving =
    highlightedTier && typeof highlightedTier.price !== "number"
      ? highlightedTier.price.monthly * 12 - highlightedTier.price.yearly
      : 0;

  return (
    <section
      id="pricing-section"
      aria-labelledby="pricing-heading"
      className="bg-zinc-50 border-t border-zinc-200/80 py-24 md:py-32"
    >
      <SectionWrapper reveal>
        {/* Header */}
        <motion.div
          className="flex flex-col items-center text-center mb-16 md:mb-20"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <p className="text-[#CE1A19] text-xs font-bold tracking-[4px] uppercase mb-4">
            Investment
          </p>
          <h2
            id="pricing-heading"
            className="text-3xl md:text-5xl font-black text-zinc-950 tracking-tight uppercase leading-none"
          >
            Choose Your Plan
          </h2>
          <div className="w-14 h-1 bg-[#CE1A19] mt-6 mb-10" aria-hidden="true" />

          {/* Glass pill toggle */}
          <div className="relative">
            <div
              role="group"
              aria-label="Billing period"
              className="relative inline-flex items-center bg-zinc-200/70 border border-zinc-300/60 rounded-full p-1 shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
            >
              <motion.div
                className="absolute top-1 bottom-1 bg-zinc-950 rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.25)]"
                animate={{
                  left: billing === "monthly" ? "4px" : "50%",
                  width: "calc(50% - 4px)",
                }}
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
              />
              <button
                type="button"
                onClick={() => setBilling("monthly")}
                aria-pressed={billing === "monthly"}
                className={`relative z-10 w-32 py-2.5 text-xs font-bold uppercase tracking-wider rounded-full transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-[#CE1A19] ${
                  billing === "monthly" ? "text-white" : "text-zinc-500 hover:text-zinc-950"
                }`}
              >
                Monthly
              </button>
              <button
                type="button"
                onClick={() => setBilling("yearly")}
                aria-pressed={billing === "yearly"}
                className={`relative z-10 w-32 py-2.5 text-xs font-bold uppercase tracking-wider rounded-full transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-[#CE1A19] ${
                  billing === "yearly" ? "text-white" : "text-zinc-500 hover:text-zinc-950"
                }`}
              >
                Annual
              </button>
            </div>
            {annualSaving > 0 && (
              <motion.span
                animate={{ opacity: billing === "yearly" ? 1 : 0.6, scale: billing === "yearly" ? 1 : 0.92 }}
                className="absolute -top-3 right-0 text-[9px] font-black bg-[#CE1A19] text-white px-2 py-0.5 rounded-full tracking-normal leading-none pointer-events-none"
              >
                SAVE £{annualSaving}
              </motion.span>
            )}
          </div>

          {qual.durationMonths && (
            <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest mt-5">
              Typical completion: {qual.durationMonths}
            </p>
          )}
        </motion.div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-stretch">
          {qual.pricing.map((tier, i) => {
            const price =
              typeof tier.price === "number"
                ? tier.price
                : billing === "monthly"
                  ? tier.price.monthly
                  : tier.price.yearly;
            const period =
              typeof tier.price === "number"
                ? "one-time investment"
                : billing === "monthly"
                  ? "per month"
                  : "per year";
            const saving =
              typeof tier.price !== "number" && billing === "yearly"
                ? tier.price.monthly * 12 - tier.price.yearly
                : 0;

            if (tier.highlighted) {
              return (
                <motion.div
                  key={tier.name}
                  variants={cardVariants}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, amount: 0.1 }}
                  className="relative flex flex-col [backdrop-filter:blur(40px)_saturate(130%)_brightness(0.88)] bg-zinc-950/[0.92] border border-white/[0.18] rounded-2xl p-7 md:p-9 shadow-[0_24px_64px_rgba(206,26,25,0.12),0_8px_32px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.10)] lg:scale-[1.04] z-10"
                >
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <span className="bg-[#CE1A19] text-white text-[9px] font-black uppercase tracking-[2.5px] px-4 py-1.5 rounded-full shadow-[0_4px_12px_rgba(206,26,25,0.5)] whitespace-nowrap">
                      Recommended
                    </span>
                  </div>

                  <p className="text-white/50 text-[10px] font-black uppercase tracking-[2.5px] mt-4 mb-3">
                    {tier.name}
                  </p>

                  <div className="mb-5">
                    <div className="flex items-end gap-1 text-white">
                      <span className="text-2xl font-black self-start mt-2 text-white/50">£</span>
                      <motion.span
                        key={`${tier.name}-${price}`}
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="text-6xl md:text-7xl font-black leading-none tracking-tight"
                      >
                        {price}
                      </motion.span>
                    </div>
                    <p className="text-white/50 text-[10px] font-bold uppercase tracking-wider mt-2">
                      {period}
                    </p>
                    {tier.deposit && billing === "monthly" && (
                      <p className="text-white/50 text-[10px] font-bold uppercase tracking-wider mt-1">
                        After a £{tier.deposit} deposit
                      </p>
                    )}
                    {saving > 0 && (
                      <motion.p
                        key={saving}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-[#CE1A19] text-xs font-bold mt-2"
                      >
                        Saving £{saving} vs monthly
                      </motion.p>
                    )}
                  </div>

                  <p className="text-white/75 text-sm leading-relaxed pb-6 mb-6 border-b border-white/[0.10]">
                    {tier.description}
                  </p>

                  <motion.ul
                    className="space-y-3.5 flex-1 mb-8"
                    role="list"
                    variants={listVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.1 }}
                  >
                    {tier.includes.map((item) => (
                      <motion.li key={item} className="flex items-start gap-3" variants={itemVariants}>
                        <AnimatedCheck size={15} delay={0} />
                        <span className="text-white text-sm leading-snug">{item}</span>
                      </motion.li>
                    ))}
                  </motion.ul>

                  <Button href="/contact" variant="primary" size="md" fullWidth className="shadow-[0_4px_16px_rgba(206,26,25,0.35)]">
                    Enquire Now
                  </Button>
                </motion.div>
              );
            }

            return (
              <motion.div
                key={tier.name}
                variants={cardVariants}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.1 }}
                className="flex flex-col bg-white border border-zinc-200 hover:border-zinc-400 hover:shadow-md rounded-2xl p-7 md:p-9 shadow-sm transition-all duration-300"
              >
                <p className="text-zinc-400 text-[10px] font-black uppercase tracking-[2.5px] mb-3">
                  {tier.name}
                </p>

                <div className="mb-5">
                  <div className="flex items-end gap-1">
                    <span className="text-2xl font-black self-start mt-2 text-zinc-400">£</span>
                    <motion.span
                      key={`${tier.name}-${price}`}
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="text-6xl md:text-7xl font-black leading-none tracking-tight text-zinc-950"
                    >
                      {price}
                    </motion.span>
                  </div>
                  <p className="text-zinc-600 text-[10px] font-bold uppercase tracking-wider mt-2">
                    {period}
                  </p>
                  {tier.deposit && billing === "monthly" && (
                    <p className="text-zinc-600 text-[10px] font-bold uppercase tracking-wider mt-1">
                      After a £{tier.deposit} deposit
                    </p>
                  )}
                  {saving > 0 && (
                    <motion.p
                      key={saving}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-[#CE1A19] text-xs font-bold mt-2"
                    >
                      Saving £{saving} vs monthly
                    </motion.p>
                  )}
                </div>

                <p className="text-zinc-500 text-sm leading-relaxed pb-6 mb-6 border-b border-zinc-100">
                  {tier.description}
                </p>

                <motion.ul
                  className="space-y-3.5 flex-1 mb-8"
                  role="list"
                  variants={listVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, amount: 0.1 }}
                >
                  {tier.includes.map((item) => (
                    <motion.li key={item} className="flex items-start gap-3" variants={itemVariants}>
                      <AnimatedCheck size={15} delay={0} color="#16a34a" />
                      <span className="text-zinc-600 text-sm leading-snug">{item}</span>
                    </motion.li>
                  ))}
                </motion.ul>

                <Button href="/contact" variant="outline-light" size="md" fullWidth>
                  Enquire Now
                </Button>
              </motion.div>
            );
          })}
        </div>

        {qual.comparisonFeatures && qual.comparisonFeatures.length > 0 && (
          <PricingComparisonTable
            features={qual.comparisonFeatures}
            tiers={qual.pricing}
            billing={billing}
            theme="light"
          />
        )}
      </SectionWrapper>
    </section>
  );
}
