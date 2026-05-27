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
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -16 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

interface Props {
  qual: Qualification;
  theme?: "light" | "dark";
}

const themes = {
  light: {
    section: "bg-zinc-50 border-t border-zinc-200/80",
    heading: "text-zinc-950",
    standardCard: "bg-white border-zinc-200/80",
    standardPrice: "text-zinc-950",
    standardPeriod: "text-zinc-500",
    standardDesc: "text-zinc-600",
    standardDescBorder: "border-zinc-100",
    standardFeature: "text-zinc-600",
    standardBullet: "bg-zinc-300",
  },
  dark: {
    section: "bg-zinc-900 border-t border-zinc-800/60",
    heading: "text-white",
    standardCard: "bg-zinc-800 border-zinc-700",
    standardPrice: "text-white",
    standardPeriod: "text-zinc-400",
    standardDesc: "text-zinc-400",
    standardDescBorder: "border-zinc-700",
    standardFeature: "text-zinc-300",
    standardBullet: "bg-zinc-600",
  },
} as const;

export default function PricingToggleSection({ qual, theme = "light" }: Props) {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");
  const t = themes[theme];

  const highlightedTier = qual.pricing.find((tier) => tier.highlighted);
  const annualSaving =
    highlightedTier && typeof highlightedTier.price !== "number"
      ? highlightedTier.price.monthly * 12 - highlightedTier.price.yearly
      : 0;

  return (
    <section aria-labelledby="pricing-heading" className={`py-20 md:py-28 ${t.section}`}>
      <SectionWrapper reveal>
        {/* Header + toggle */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-20">
          <p className="text-[#CE1A19] text-xs font-bold tracking-[4px] uppercase mb-4">
            Investment
          </p>
          <h2
            id="pricing-heading"
            className={`text-3xl md:text-5xl font-black tracking-tight uppercase leading-none ${t.heading}`}
          >
            Choose Your Plan
          </h2>
          <div className="w-14 h-1 bg-[#CE1A19] mt-6 mb-8" aria-hidden="true" />

          <div className="inline-flex bg-zinc-200/60 p-1 rounded-sm gap-1">
            <button
              type="button"
              onClick={() => setBilling("monthly")}
              aria-pressed={billing === "monthly"}
              className={`px-5 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-200 outline-none rounded-xs ${
                billing === "monthly"
                  ? "bg-zinc-950 text-white shadow-sm"
                  : "text-zinc-600 hover:text-zinc-950"
              }`}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setBilling("yearly")}
              aria-pressed={billing === "yearly"}
              className={`inline-flex items-center gap-2 px-5 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-200 outline-none rounded-xs ${
                billing === "yearly"
                  ? "bg-zinc-950 text-white shadow-sm"
                  : "text-zinc-600 hover:text-zinc-950"
              }`}
            >
              <span>Annual</span>
              {annualSaving > 0 && (
                <span
                  className={`text-[9px] font-black px-1.5 py-0.5 rounded-xs tracking-normal leading-none ${
                    billing === "yearly"
                      ? "bg-white/20 text-white"
                      : "bg-[#CE1A19] text-white"
                  }`}
                >
                  SAVE £{annualSaving}
                </span>
              )}
            </button>
          </div>

          {qual.durationMonths && (
            <p className="text-zinc-400 text-[10px] font-bold uppercase tracking-widest mt-5">
              Typical completion timeframe: {qual.durationMonths}
            </p>
          )}
        </div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          {qual.pricing.map((tier) => {
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
                <div
                  key={tier.name}
                  className="relative flex flex-col bg-zinc-950 p-6 md:p-8 border border-zinc-900 rounded-sm shadow-xl"
                >
                  <div className="absolute top-0 right-0 bg-[#CE1A19] text-white text-[9px] font-black uppercase tracking-[2px] px-3 py-1.5 rounded-bl-xs">
                    Recommended Option
                  </div>
                  <p className="text-zinc-500 text-xs font-bold tracking-widest uppercase mt-4 mb-2">
                    {tier.name}
                  </p>
                  <div className="mb-4">
                    <div className="flex items-baseline gap-0.5 text-white">
                      <span className="text-xl font-bold self-start mt-1">£</span>
                      <span className="text-5xl md:text-6xl font-black leading-none tracking-tight">
                        {price}
                      </span>
                    </div>
                    <p className="text-zinc-400 text-[10px] font-bold uppercase tracking-wider mt-2.5">
                      {period}
                    </p>
                    {saving > 0 && (
                      <p className="text-[#CE1A19] text-xs font-bold mt-2">
                        Saving £{saving} vs monthly plan
                      </p>
                    )}
                  </div>
                  <p className="text-zinc-400 text-sm leading-relaxed mt-2 pb-6 mb-6 border-b border-zinc-900">
                    {tier.description}
                  </p>
                  <motion.ul
                    className="space-y-4 flex-1 mb-8"
                    role="list"
                    variants={listVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.1 }}
                  >
                    {tier.includes.map((item) => (
                      <motion.li key={item} className="flex items-start gap-3" variants={itemVariants}>
                        <AnimatedCheck size={16} delay={0} />
                        <span className="text-zinc-300 text-sm leading-tight">{item}</span>
                      </motion.li>
                    ))}
                  </motion.ul>
                  <Button href="/contact" variant="primary" size="md" fullWidth className="shadow-md">
                    Enquire Now
                  </Button>
                </div>
              );
            }

            return (
              <div
                key={tier.name}
                className={`flex flex-col p-6 md:p-8 border rounded-sm shadow-sm ${t.standardCard}`}
              >
                <p className="text-zinc-400 text-xs font-bold tracking-widest uppercase mb-2">
                  {tier.name}
                </p>
                <div className="mb-4">
                  <div className={`flex items-baseline gap-0.5 ${t.standardPrice}`}>
                    <span className="text-xl font-bold self-start mt-1">£</span>
                    <span className="text-5xl md:text-6xl font-black leading-none tracking-tight">
                      {price}
                    </span>
                  </div>
                  <p className={`text-[10px] font-bold uppercase tracking-wider mt-2.5 ${t.standardPeriod}`}>
                    {period}
                  </p>
                  {saving > 0 && (
                    <p className="text-[#CE1A19] text-xs font-bold mt-2">
                      Saving £{saving} vs monthly plan
                    </p>
                  )}
                </div>
                <p className={`text-sm leading-relaxed mt-2 pb-6 mb-6 border-b ${t.standardDescBorder} ${t.standardDesc}`}>
                  {tier.description}
                </p>
                <motion.ul
                  className="space-y-4 flex-1 mb-8"
                  role="list"
                  variants={listVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, amount: 0.1 }}
                >
                  {tier.includes.map((item) => (
                    <motion.li key={item} className="flex items-start gap-3" variants={itemVariants}>
                      <AnimatedCheck size={16} delay={0} color={theme === "dark" ? "#a1a1aa" : "#CE1A19"} />
                      <span className={`text-sm leading-tight ${t.standardFeature}`}>{item}</span>
                    </motion.li>
                  ))}
                </motion.ul>
                <Button href="/contact" variant="outline-light" size="md" fullWidth>
                  Enquire Now
                </Button>
              </div>
            );
          })}
        </div>

        {qual.comparisonFeatures && qual.comparisonFeatures.length > 0 && (
          <PricingComparisonTable
            features={qual.comparisonFeatures}
            tiers={qual.pricing}
            billing={billing}
            theme={theme}
          />
        )}
      </SectionWrapper>
    </section>
  );
}
