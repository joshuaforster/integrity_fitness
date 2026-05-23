"use client";

import { useState } from "react";
import Link from "next/link";
import { type Qualification } from "@/app/data/qualifications";

export default function PricingToggleSection({ qual }: { qual: Qualification }) {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");

  return (
    <section className="bg-[#F5F5F5] py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-14 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6">
          <div>
            <p className="text-[#CE1A19] text-xs font-semibold tracking-[4px] uppercase mb-4">Investment</p>
            <h2 className="text-4xl md:text-5xl font-bold text-black leading-tight uppercase">Pricing</h2>
            <div className="w-14 h-1 bg-[#CE1A19] mt-6" />
          </div>
          {/* Billing toggle */}
          <div className="flex items-center gap-0 bg-white border border-black/10 p-1">
            <button
              type="button"
              onClick={() => setBilling("monthly")}
              className={`px-5 py-2.5 text-xs font-semibold tracking-widest uppercase transition-all duration-200 ${billing === "monthly" ? "bg-[#CE1A19] text-white" : "text-black hover:text-[#CE1A19]"}`}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setBilling("yearly")}
              className={`px-5 py-2.5 text-xs font-semibold tracking-widest uppercase transition-all duration-200 flex items-center gap-2 ${billing === "yearly" ? "bg-[#CE1A19] text-white" : "text-black hover:text-[#CE1A19]"}`}
            >
              Yearly
              <span className={`text-[9px] font-bold border px-1.5 py-0.5 ${billing === "yearly" ? "border-white/40 text-white" : "border-[#CE1A19] text-[#CE1A19]"}`}>
                SAVE
              </span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#CE1A19]/20">
          {qual.pricing.map((tier) => {
            const price = typeof tier.price === "number"
              ? tier.price
              : billing === "monthly" ? tier.price.monthly : tier.price.yearly;
            const label = typeof tier.price === "number" ? "one-time" : billing === "monthly" ? "/ month" : "/ year";
            const saving = typeof tier.price !== "number" && billing === "yearly"
              ? tier.price.monthly * 12 - tier.price.yearly
              : 0;

            return (
              <div
                key={tier.name}
                className={`relative flex flex-col p-8 ${tier.highlighted ? "bg-[#111111] ring-2 ring-[#CE1A19] ring-inset z-10" : "bg-[#111111]"}`}
              >
                {tier.highlighted && (
                  <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[9px] uppercase tracking-widest bg-[#CE1A19] text-white px-3 py-1 font-bold whitespace-nowrap">
                    Recommended
                  </span>
                )}

                {/* Tier name */}
                <p className="text-white/50 text-xs font-semibold tracking-[4px] uppercase mb-6">{tier.name}</p>

                {/* Price — hero element */}
                <div className="mb-2">
                  <div className="flex items-start gap-1">
                    <span className="text-[#CE1A19] text-2xl font-bold mt-3 leading-none">£</span>
                    <span className="text-7xl font-bold text-white leading-none tracking-tight">{price}</span>
                  </div>
                  <p className="text-white/40 text-xs tracking-[2px] uppercase mt-2">{label}</p>
                </div>

                {saving > 0 && (
                  <p className="text-[#CE1A19] text-xs font-semibold mb-4">
                    Save £{saving} compared to monthly
                  </p>
                )}

                <p className="text-white/60 text-sm mb-8 mt-4 leading-relaxed">{tier.description}</p>

                <ul className="space-y-3 mb-10 flex-1">
                  {tier.includes.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="w-4 h-px bg-[#CE1A19] mt-2.5 flex-shrink-0" />
                      <span className="text-white text-sm">{item}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/contact"
                  className={`block w-full text-center px-8 py-4 text-xs font-semibold tracking-widest uppercase transition-colors ${tier.highlighted ? "bg-[#CE1A19] text-white hover:bg-red-700" : "border border-white/20 text-white hover:border-[#CE1A19] hover:text-[#CE1A19]"}`}
                >
                  Enquire Now
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
