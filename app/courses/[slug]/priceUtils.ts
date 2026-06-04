import { type PricingTier } from "@/app/data/qualifications";

export function getPrice(tier: PricingTier, billing: "one-off" | "monthly"): number {
  if (typeof tier.price === "number") return tier.price;
  return billing === "monthly" ? tier.price.monthly : tier.price.yearly;
}

export function getSaving(tier: PricingTier, billing: "one-off" | "monthly"): number {
  if (typeof tier.price === "number") return 0;
  return billing === "one-off" ? tier.price.monthly * 12 - tier.price.yearly : 0;
}
