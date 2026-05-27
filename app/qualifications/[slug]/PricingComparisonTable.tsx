"use client";

import { motion } from "framer-motion";
import AnimatedCheck from "@/app/components/ui/AnimatedCheck";
import { type ComparisonFeature, type PricingTier } from "@/app/data/qualifications";

interface Props {
  features: ComparisonFeature[];
  tiers: PricingTier[];
  billing: "monthly" | "yearly";
  theme: "light" | "dark";
}

function resolvePrice(tier: PricingTier, billing: "monthly" | "yearly"): number {
  if (typeof tier.price === "number") return tier.price;
  return billing === "monthly" ? tier.price.monthly : tier.price.yearly;
}

export default function PricingComparisonTable({ features, tiers, billing, theme }: Props) {
  const isLight = theme === "light";

  const borderColor = isLight ? "border-zinc-200/80" : "border-zinc-700/60";
  const rowBorder = isLight ? "border-zinc-100" : "border-zinc-800/60";
  const labelColor = isLight ? "text-zinc-500" : "text-zinc-500";
  const featureColor = isLight ? "text-zinc-700" : "text-zinc-300";
  const headerBg = isLight ? "bg-zinc-50" : "bg-zinc-800/40";
  const headerText = isLight ? "text-zinc-500" : "text-zinc-400";
  const priceColor = isLight ? "text-zinc-950" : "text-white";
  const rowHover = isLight ? "hover:bg-zinc-50/80" : "hover:bg-zinc-800/20";
  const dashColor = isLight ? "text-zinc-200" : "text-zinc-700";
  const highlightedCol = isLight ? "bg-zinc-950/[0.035]" : "bg-zinc-950/40";

  return (
    <div className={`mt-16 pt-12 border-t ${borderColor}`}>
      <p className={`text-xs font-bold tracking-[4px] uppercase mb-8 text-center ${labelColor}`}>
        Feature Comparison
      </p>

      {/* Mobile: stacked tier cards */}
      <div className="md:hidden space-y-4">
        {tiers.map((tier, tierIndex) => {
          const price = resolvePrice(tier, billing);
          const period = billing === "monthly" ? "/mo" : "/yr";
          return (
            <div
              key={tier.name}
              className={`border rounded-sm overflow-hidden ${
                tier.highlighted ? "border-zinc-950" : borderColor
              }`}
            >
              <div
                className={`px-4 py-3 ${
                  tier.highlighted ? "bg-zinc-950" : headerBg
                }`}
              >
                <span
                  className={`block text-[10px] font-bold uppercase tracking-widest mb-0.5 ${
                    tier.highlighted ? "text-zinc-400" : headerText
                  }`}
                >
                  {tier.name}
                </span>
                <span
                  className={`block text-xl font-black ${
                    tier.highlighted ? "text-white" : priceColor
                  }`}
                >
                  £{price}
                  <span
                    className={`text-[10px] font-bold ml-0.5 ${
                      tier.highlighted
                        ? "text-zinc-500"
                        : isLight
                        ? "text-zinc-400"
                        : "text-zinc-500"
                    }`}
                  >
                    {period}
                  </span>
                </span>
              </div>
              <div>
                {features.map((feature, i) => {
                  const val = feature.values[tierIndex];
                  return (
                    <motion.div
                      key={feature.label}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: false }}
                      transition={{ delay: i * 0.04, duration: 0.3 }}
                      className={`flex items-center justify-between px-4 py-2.5 border-t ${rowBorder}`}
                    >
                      <span className={`text-xs font-medium leading-snug pr-3 ${featureColor}`}>
                        {feature.label}
                      </span>
                      <span className="flex-shrink-0">
                        {val === true ? (
                          <AnimatedCheck size={14} delay={i * 0.04} color="#CE1A19" />
                        ) : val === false ? (
                          <span
                            className={`text-sm font-semibold leading-none ${dashColor}`}
                            aria-label="Not included"
                          >
                            —
                          </span>
                        ) : (
                          <span
                            className={`text-xs font-bold ${
                              tier.highlighted
                                ? "text-zinc-300"
                                : isLight
                                ? "text-zinc-600"
                                : "text-zinc-400"
                            }`}
                          >
                            {val}
                          </span>
                        )}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Desktop: comparison table */}
      <div className="hidden md:block overflow-x-auto">
        <table className={`w-full min-w-[520px] text-sm ${featureColor}`}>
          <thead>
            <tr className={headerBg}>
              <th
                className={`py-4 px-5 text-left font-bold text-xs uppercase tracking-wider w-[44%] border-b ${rowBorder} ${headerText}`}
              >
                What&apos;s included
              </th>
              {tiers.map((tier) => {
                const price = resolvePrice(tier, billing);
                const period = billing === "monthly" ? "/mo" : "/yr";
                return (
                  <th
                    key={tier.name}
                    className={`py-4 px-4 text-center border-b ${rowBorder} ${
                      tier.highlighted
                        ? "bg-zinc-950 text-white"
                        : `${headerBg} ${headerText}`
                    }`}
                  >
                    <span
                      className={`block text-[10px] font-bold uppercase tracking-widest mb-1 ${
                        tier.highlighted ? "text-zinc-400" : ""
                      }`}
                    >
                      {tier.name}
                    </span>
                    <span className={`block text-lg font-black ${tier.highlighted ? "text-white" : priceColor}`}>
                      £{price}
                      <span
                        className={`text-[10px] font-bold ml-0.5 ${
                          tier.highlighted ? "text-zinc-500" : isLight ? "text-zinc-400" : "text-zinc-500"
                        }`}
                      >
                        {period}
                      </span>
                    </span>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {features.map((feature, i) => (
              <motion.tr
                key={feature.label}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: false }}
                transition={{ delay: i * 0.04, duration: 0.3 }}
                className={`border-b ${rowBorder} ${rowHover} transition-colors duration-150`}
              >
                <td className="py-4 px-5 text-sm font-medium leading-snug">
                  {feature.label}
                </td>
                {feature.values.map((val, j) => (
                  <td
                    key={j}
                    className={`py-4 px-4 text-center ${tiers[j]?.highlighted ? highlightedCol : ""}`}
                  >
                    {val === true ? (
                      <span className="flex justify-center">
                        <AnimatedCheck
                          size={16}
                          delay={i * 0.04}
                          color="#CE1A19"
                        />
                      </span>
                    ) : val === false ? (
                      <span
                        className={`text-base font-semibold leading-none ${dashColor}`}
                        aria-label="Not included"
                      >
                        —
                      </span>
                    ) : (
                      <span
                        className={`text-xs font-bold ${
                          tiers[j]?.highlighted ? "text-zinc-300" : isLight ? "text-zinc-600" : "text-zinc-400"
                        }`}
                      >
                        {val}
                      </span>
                    )}
                  </td>
                ))}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
