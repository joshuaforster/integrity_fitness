"use client";

import { useState } from "react";
import Button from "@/app/components/Button";
import { CheckIcon } from "@heroicons/react/24/solid";
import { type Qualification } from "@/app/data/qualifications";

export default function PricingToggleSection({ qual }: { qual: Qualification }) {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");

  const highlightedTier = qual.pricing.find((t) => t.highlighted);
  const annualSaving =
    highlightedTier && typeof highlightedTier.price !== "number"
      ? highlightedTier.price.monthly * 12 - highlightedTier.price.yearly
      : 0;

  return (
    <section className="bg-[#F8F8F8] py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* Header + toggle */}
        <div className="flex flex-col items-center text-center mb-16">
          <p className="text-[#CE1A19] text-xs font-semibold tracking-[4px] uppercase mb-4">Investment</p>
          <h2 className="text-4xl md:text-5xl font-bold text-black leading-tight uppercase mb-6">Choose Your Plan</h2>
          <div className="w-14 h-1 bg-[#CE1A19] mb-10" />

          <div className="inline-flex bg-white border border-black/10 p-1 gap-1">
            <button
              type="button"
              onClick={() => setBilling("monthly")}
              aria-pressed={billing === "monthly"}
              className={`px-6 py-2.5 text-xs font-semibold tracking-widest uppercase transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#CE1A19] ${
                billing === "monthly" ? "bg-[#CE1A19] text-white" : "text-black hover:text-[#CE1A19]"
              }`}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setBilling("yearly")}
              aria-pressed={billing === "yearly"}
              className={`inline-flex items-center gap-2 px-6 py-2.5 text-xs font-semibold tracking-widest uppercase transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#CE1A19] ${
                billing === "yearly" ? "bg-[#CE1A19] text-white" : "text-black hover:text-[#CE1A19]"
              }`}
            >
              Annual
              {annualSaving > 0 && (
                <span className={`text-[9px] font-bold px-1.5 py-0.5 leading-none ${
                  billing === "yearly" ? "bg-white/20 text-white" : "bg-[#CE1A19] text-white"
                }`}>
                  SAVE £{annualSaving}
                </span>
              )}
            </button>
          </div>

          {qual.durationMonths && (
            <p className="text-gray-600 text-xs uppercase tracking-widest mt-5">
              Typical completion: {qual.durationMonths}
            </p>
          )}
        </div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {qual.pricing.map((tier) => {
            const price =
              typeof tier.price === "number"
                ? tier.price
                : billing === "monthly"
                ? tier.price.monthly
                : tier.price.yearly;
            const period =
              typeof tier.price === "number"
                ? "one-time"
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
                  className="relative flex flex-col bg-[#111111] p-8 border-t-4 border-[#CE1A19] md:-mt-4 md:mb-[-16px]"
                >
                  <span className="absolute -top-3 left-8 bg-[#CE1A19] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1">
                    Recommended
                  </span>

                  <p className="text-white/60 text-xs font-semibold tracking-[4px] uppercase mt-4 mb-3">{tier.name}</p>

                  <div className="mb-2">
                    <div className="flex items-baseline gap-0.5">
                      <span className="text-white text-lg font-bold self-start mt-2">£</span>
                      <span className="text-6xl font-bold text-white leading-none tracking-tight">{price}</span>
                    </div>
                    <p className="text-white/60 text-xs uppercase tracking-[2px] mt-2">{period}</p>
                    {saving > 0 && (
                      <p className="text-white text-xs font-semibold mt-1.5">Save £{saving} vs monthly</p>
                    )}
                  </div>

                  <p className="text-white/50 text-sm leading-relaxed mt-4 pb-5 mb-5 border-b border-white/10">
                    {tier.description}
                  </p>

                  <ul className="space-y-3 flex-1 mb-8">
                    {tier.includes.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <CheckIcon className="w-4 h-4 text-[#CE1A19] mt-0.5 flex-shrink-0" aria-hidden="true" />
                        <span className="text-white text-sm leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>

                  <Button href="/contact" variant="primary" fullWidth>
                    Enquire Now
                  </Button>
                </div>
              );
            }

            return (
              <div key={tier.name} className="flex flex-col bg-white border border-black/10 p-8">
                <p className="text-black/30 text-xs font-semibold tracking-[4px] uppercase mb-3">{tier.name}</p>

                <div className="mb-2">
                  <div className="flex items-baseline gap-0.5">
                    <span className="text-[#CE1A19] text-lg font-bold self-start mt-2">£</span>
                    <span className="text-6xl font-bold text-black leading-none tracking-tight">{price}</span>
                  </div>
                  <p className="text-black/30 text-xs uppercase tracking-[2px] mt-2">{period}</p>
                  {saving > 0 && (
                    <p className="text-[#CE1A19] text-xs font-semibold mt-1.5">Save £{saving} vs monthly</p>
                  )}
                </div>

                <p className="text-gray-500 text-sm leading-relaxed mt-4 pb-5 mb-5 border-b border-black/8">
                  {tier.description}
                </p>

                <ul className="space-y-3 flex-1 mb-8">
                  {tier.includes.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckIcon className="w-4 h-4 text-[#CE1A19] mt-0.5 flex-shrink-0" aria-hidden="true" />
                      <span className="text-gray-700 text-sm leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>

                <Button href="/contact" variant="outline-light" fullWidth>
                  Enquire Now
                </Button>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
