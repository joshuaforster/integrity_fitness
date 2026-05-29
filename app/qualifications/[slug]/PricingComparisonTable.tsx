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

  const containerBg = isLight
    ? "bg-white/80 texture-dots-light border-zinc-200/70 shadow-[0_4px_24px_rgba(0,0,0,0.06),0_1px_4px_rgba(0,0,0,0.04)]"
    : "bg-zinc-900/60 texture-dots-dark border-zinc-700/40 shadow-[0_4px_24px_rgba(0,0,0,0.4)]";
  const rowBorder = isLight ? "border-zinc-100" : "border-zinc-800/50";
  const featureColor = isLight ? "text-zinc-700" : "text-white";
  const headerBg = isLight ? "bg-zinc-50/80" : "bg-zinc-800/40";
  const headerText = isLight ? "text-zinc-500" : "text-zinc-400";
  const priceColor = isLight ? "text-zinc-950" : "text-white";
  const rowHover = isLight ? "hover:bg-zinc-50/60" : "hover:bg-zinc-800/20";
  const dashColor = isLight ? "text-zinc-300" : "text-zinc-600";
  const highlightedCol = isLight ? "bg-zinc-950/[0.025]" : "bg-white/[0.04]";
  const labelColor = isLight ? "text-zinc-400" : "text-zinc-500";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.1 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className={`mt-14 rounded-lg border overflow-hidden ${containerBg}`}
    >
      <div className={`px-6 py-5 border-b ${rowBorder}`}>
        <p className={`text-[10px] font-bold tracking-[4px] uppercase ${labelColor}`}>
          Feature Comparison
        </p>
      </div>

      {/* Mobile: stacked tier cards */}
      <div className="md:hidden divide-y divide-zinc-100/60">
        {tiers.map((tier, tierIndex) => {
          const price = resolvePrice(tier, billing);
          const period = billing === "monthly" ? "/mo" : "/yr";
          return (
            <div key={tier.name}>
              <div className={`px-5 py-4 ${tier.highlighted ? "bg-zinc-800/90" : headerBg}`}>
                <span className={`block text-[10px] font-bold uppercase tracking-widest mb-0.5 ${tier.highlighted ? "text-white/60" : headerText}`}>
                  {tier.name}
                </span>
                <span className={`block text-xl font-black ${tier.highlighted ? "text-white" : priceColor}`}>
                  £{price}
                  <span className={`text-[10px] font-bold ml-0.5 ${tier.highlighted ? "text-white/50" : isLight ? "text-zinc-400" : "text-zinc-500"}`}>
                    {period}
                  </span>
                </span>
              </div>
              <div>
                {features.map((feature, i) => {
                  const val = feature.values[tierIndex];
                  return (
                    <div
                      key={feature.label}
                      className={`flex items-center justify-between px-5 py-3 border-t ${rowBorder}`}
                    >
                      <span className={`text-xs leading-snug pr-3 ${featureColor}`}>
                        {feature.label}
                      </span>
                      <span className="flex-shrink-0">
                        {val === true ? (
                          <AnimatedCheck size={14} delay={i * 0.02} color="#16a34a" />
                        ) : val === false ? (
                          <span className={`text-sm font-medium leading-none ${dashColor}`} aria-label="Not included">—</span>
                        ) : (
                          <span className={`text-xs font-bold ${tier.highlighted ? "text-white" : isLight ? "text-zinc-600" : "text-white"}`}>
                            {val}
                          </span>
                        )}
                      </span>
                    </div>
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
            <tr>
              <th className={`py-4 px-6 text-left font-bold text-[10px] uppercase tracking-wider w-[44%] border-b ${rowBorder} ${headerText} ${headerBg}`}>
                What&apos;s included
              </th>
              {tiers.map((tier) => {
                const price = resolvePrice(tier, billing);
                const period = billing === "monthly" ? "/mo" : "/yr";
                return (
                  <th
                    key={tier.name}
                    className={`py-4 px-4 text-center border-b ${rowBorder} ${
                      tier.highlighted ? "bg-zinc-800/90" : headerBg
                    }`}
                  >
                    <span className={`block text-[10px] font-bold uppercase tracking-widest mb-1 ${tier.highlighted ? "text-white/60" : headerText}`}>
                      {tier.name}
                    </span>
                    <span className={`block text-lg font-black ${tier.highlighted ? "text-white" : priceColor}`}>
                      £{price}
                      <span className={`text-[10px] font-bold ml-0.5 ${tier.highlighted ? "text-white/50" : isLight ? "text-zinc-400" : "text-zinc-500"}`}>
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
              <tr
                key={feature.label}
                className={`border-b ${rowBorder} ${rowHover} transition-colors duration-150`}
              >
                <td className={`py-3.5 px-6 text-sm leading-snug ${featureColor}`}>
                  {feature.label}
                </td>
                {feature.values.map((val, j) => (
                  <td
                    key={j}
                    className={`py-3.5 px-4 text-center ${tiers[j]?.highlighted ? highlightedCol : ""}`}
                  >
                    {val === true ? (
                      <span className="flex justify-center">
                        <AnimatedCheck size={15} delay={i * 0.02} color="#16a34a" />
                      </span>
                    ) : val === false ? (
                      <span className={`text-base font-medium leading-none ${dashColor}`} aria-label="Not included">—</span>
                    ) : (
                      <span className={`text-xs font-bold ${tiers[j]?.highlighted ? "text-white" : isLight ? "text-zinc-600" : "text-white"}`}>
                        {val}
                      </span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
