import { type Qualification } from "@/app/data/qualifications";

export function lowestPrice(q: Qualification): { oneOff: number; monthly: number | null } {
  if (!q.hasBillingToggle) {
    return { oneOff: q.pricing[0].price as number, monthly: null };
  }
  const tiers = q.pricing.map((t) => t.price as { monthly: number; yearly: number });
  return {
    oneOff: Math.min(...tiers.map((p) => p.yearly)),
    monthly: Math.min(...tiers.map((p) => p.monthly)),
  };
}
