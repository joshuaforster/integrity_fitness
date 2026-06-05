"use client";

import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import Button from "@/app/components/ui/Button";
import SectionWrapper from "@/app/components/ui/SectionWrapper";
import AnimatedCheck from "@/app/components/ui/AnimatedCheck";
import { type Qualification } from "@/app/data/qualifications"
import StripeTrustBar from "@/app/components/ui/StripeTrustBar";

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

export default function PricingToggleSection({
  qual,
  slant,
}: {
  qual: Qualification;
  slant?: "rise" | "fall";
}) {
  const [billing, setBilling] = useState<"monthly" | "yearly">("yearly");
  const highlightedTier = qual.pricing.find((tier) => tier.highlighted);
  const annualSaving =
    highlightedTier && typeof highlightedTier.price !== "number"
      ? Math.round((highlightedTier.price.monthly * 12 - highlightedTier.price.yearly) * 100) / 100
      : 0;

  const clipPath = slant === "rise"
    ? "polygon(0 80px, 100% 0, 100% 100%, 0 100%)"
    : slant === "fall"
    ? "polygon(0 0, 100% 80px, 100% 100%, 0 100%)"
    : undefined;

  return (
    <section
      id="pricing-section"
      aria-labelledby="pricing-heading"
      className={`bg-zinc-100 texture-dots-light py-20 md:py-28${slant ? " -mt-20 relative z-10" : " border-t border-zinc-200/80"}`}
      style={clipPath ? { clipPath } : undefined}
    >
      <SectionWrapper reveal>
        {/* Header */}
        <motion.div
          className="flex flex-col items-center text-center mb-14 md:mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <p className="text-[#CE1A19] text-xs font-bold tracking-widest uppercase mb-4">
            Investment
          </p>
          <h2
            id="pricing-heading"
            className="text-3xl md:text-5xl font-black text-zinc-950 tracking-tight uppercase leading-none"
          >
            Choose Your Plan
          </h2>
          <div className="w-14 h-1 bg-[#CE1A19] mt-6 mb-10" aria-hidden="true" />

          {/* Toggle */}
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
                className="absolute -top-3 right-0 text-xs font-black bg-[#CE1A19] text-white px-2 py-0.5 rounded-full tracking-normal leading-none pointer-events-none"
              >
                SAVE £{Math.round(annualSaving)}
              </motion.span>
            )}
          </div>

          {qual.durationMonths && (
            <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mt-5">
              Typical completion: {qual.durationMonths}
            </p>
          )}
          {billing === "monthly" && qual.pricing.some((t) => t.deposit) && (
            <p className="text-zinc-500 text-xs mt-3 max-w-md leading-relaxed">
              Monthly payments are charged automatically to your card after the deposit — no manual action needed. Payments stop when your course is complete.
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
                ? Math.round((tier.price.monthly * 12 - tier.price.yearly) * 100) / 100
                : 0;

            return (
              <motion.div
                key={tier.name}
                variants={cardVariants}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                className={`relative flex flex-col rounded-2xl overflow-hidden transition-all duration-300 ${
                  tier.highlighted
                    ? "bg-zinc-950 texture-dots-dark border border-white/[0.10] shadow-[0_20px_60px_rgba(0,0,0,0.55)] lg:scale-[1.04] z-10"
                    : "bg-white texture-dots-light border border-zinc-200 hover:border-[#CE1A19] shadow-[0_2px_8px_rgba(0,0,0,0.05),0_8px_28px_rgba(0,0,0,0.07)] hover:shadow-[0_4px_16px_rgba(206,26,25,0.14),0_20px_52px_rgba(0,0,0,0.13)]"
                }`}
              >
                <div className="h-[3px] w-full bg-[#CE1A19] flex-shrink-0" aria-hidden="true" />
                <div className="relative flex flex-col flex-1 p-5 md:p-7">
                  {tier.highlighted && (
                    <div className="flex justify-center mb-5">
                      <span className="bg-[#CE1A19] text-white text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-[0_4px_12px_rgba(206,26,25,0.4)] whitespace-nowrap">
                        Recommended
                      </span>
                    </div>
                  )}
                  <p className={`text-xs font-black uppercase tracking-widest mb-2 ${tier.highlighted ? "text-[#CE1A19]" : "text-zinc-400"}`}>
                    {tier.name}
                  </p>
                  <div className="mb-4">
                    <div className="flex items-end gap-1">
                      <span className={`text-xl font-black self-start mt-1.5 ${tier.highlighted ? "text-white/50" : "text-zinc-400"}`}>£</span>
                      <motion.span
                        key={`${tier.name}-${price}`}
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className={`text-5xl font-black leading-none tracking-tight ${tier.highlighted ? "text-white" : "text-zinc-950"}`}
                      >
                        {price.toFixed(2)}
                      </motion.span>
                    </div>
                    <p className={`text-xs font-bold uppercase tracking-wider mt-1.5 ${tier.highlighted ? "text-white/50" : "text-zinc-500"}`}>
                      {period}
                    </p>
                    {tier.deposit && billing === "monthly" && (
                      <p className={`text-xs font-bold uppercase tracking-wider mt-0.5 ${tier.highlighted ? "text-white/50" : "text-zinc-500"}`}>
                        After a £{Number(tier.deposit).toFixed(2)} deposit
                      </p>
                    )}
                    {saving > 0 && (
                      <motion.p
                        key={saving}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-[#CE1A19] text-xs font-bold mt-1.5"
                      >
                        Saving £{Math.round(saving)} vs monthly
                      </motion.p>
                    )}
                  </div>
                  <p className={`text-sm leading-relaxed pb-4 mb-4 border-b ${tier.highlighted ? "text-white/70 border-white/[0.10]" : "text-zinc-500 border-zinc-100"}`}>
                    {tier.description}
                  </p>
                  <motion.ul
                    className="space-y-3 flex-1 mb-6"
                    role="list"
                    variants={listVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                  >
                    {(tier.highlights ?? tier.includes).map((item) => (
                      <motion.li key={item} className="flex items-start gap-3" variants={itemVariants}>
                        <AnimatedCheck size={15} delay={0} color="#16a34a" />
                        <span className={`text-sm leading-snug ${tier.highlighted ? "text-white" : "text-zinc-600"}`}>{item}</span>
                      </motion.li>
                    ))}
                  </motion.ul>
                  <Button
                    href={`/courses/${qual.slug}?tier=${i}&billing=${billing === "monthly" ? "monthly" : "one-off"}#product-client`}
                    variant={tier.highlighted ? "primary" : "outline-light"}
                    size="md"
                    fullWidth
                  >
                    Enrol Now
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-10">
          <StripeTrustBar theme="dark" />
        </div>

      </SectionWrapper>
    </section>
  );
}
