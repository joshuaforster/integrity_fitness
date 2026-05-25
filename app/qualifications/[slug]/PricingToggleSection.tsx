"use client";

import { useState } from "react";
import Button from "@/app/components/Button";
import { type Qualification } from "@/app/data/qualifications";

export default function PricingToggleSection({
  qual,
}: {
  qual: Qualification;
}) {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");

  const highlightedTier = qual.pricing.find((t) => t.highlighted);
  const annualSaving =
    highlightedTier && typeof highlightedTier.price !== "number"
      ? highlightedTier.price.monthly * 12 - highlightedTier.price.yearly
      : 0;

  return (
    <section
      aria-labelledby="pricing-heading"
      className="bg-zinc-50 py-20 md:py-28 border-t border-zinc-200/80"
    >
      <div className="reveal mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header & Premium Toggle System */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-20">
          <p className="text-[#CE1A19] text-xs font-bold tracking-[4px] uppercase mb-4">
            Investment
          </p>
          <h2
            id="pricing-heading"
            className="text-3xl md:text-5xl font-black text-zinc-950 tracking-tight uppercase leading-none"
          >
            Choose Your Plan
          </h2>
          <div className="w-14 h-1 bg-[#CE1A19] mt-6 mb-8" aria-hidden="true" />

          {/* Minimal Text Switch Toggle */}
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

        {/* 3-Column Symmetrical Pricing Matrix */}
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
                      <span className="text-xl font-bold self-start mt-1">
                        £
                      </span>
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

                  <ul className="space-y-4 flex-1 mb-8" role="list">
                    {tier.includes.map((item) => (
                      <li key={item} className="flex items-start gap-3 group">
                        {/* Custom sharp visual vector indicator instead of large heavy heroicon packages */}
                        <span
                          className="w-1.5 h-1.5 bg-[#CE1A19] mt-2 flex-shrink-0 rounded-xs"
                          aria-hidden="true"
                        />
                        <span className="text-zinc-300 text-sm leading-tight">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    href="/contact"
                    variant="primary"
                    size="md"
                    fullWidth
                    className="shadow-md"
                  >
                    Enquire Now
                  </Button>
                </div>
              );
            }

            return (
              <div
                key={tier.name}
                className="flex flex-col bg-white border border-zinc-200/80 p-6 md:p-8 rounded-sm shadow-sm"
              >
                <p className="text-zinc-400 text-xs font-bold tracking-widest uppercase mb-2">
                  {tier.name}
                </p>

                <div className="mb-4">
                  <div className="flex items-baseline gap-0.5 text-zinc-950">
                    <span className="text-xl font-bold self-start mt-1">£</span>
                    <span className="text-5xl md:text-6xl font-black leading-none tracking-tight">
                      {price}
                    </span>
                  </div>
                  <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-wider mt-2.5">
                    {period}
                  </p>
                  {saving > 0 && (
                    <p className="text-[#CE1A19] text-xs font-bold mt-2">
                      Saving £{saving} vs monthly plan
                    </p>
                  )}
                </div>

                <p className="text-zinc-600 text-sm leading-relaxed mt-2 pb-6 mb-6 border-b border-zinc-100">
                  {tier.description}
                </p>

                <ul className="space-y-4 flex-1 mb-8" role="list">
                  {tier.includes.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span
                        className="w-1.5 h-1.5 bg-zinc-300 mt-2 flex-shrink-0 rounded-xs"
                        aria-hidden="true"
                      />
                      <span className="text-zinc-600 text-sm leading-tight">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>

                <Button
                  href="/contact"
                  variant="outline-light"
                  size="md"
                  fullWidth
                  className="bg-white"
                >
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
