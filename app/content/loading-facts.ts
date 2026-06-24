import { TAX, TAX_YEAR } from "./tax-config";

function fmt(n: number): string {
  return "£" + n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Group A — facts containing numbers that change with each Budget
const taxFacts = [
  `Your Personal Allowance (${fmt(TAX.personalAllowance)}) is completely tax-free. Tax only applies on profit above this threshold.`,
  `Class 4 NI is charged at ${Math.round(TAX.ni4MainRate * 100)}% on profits between ${fmt(TAX.ni4LowerLimit)} and ${fmt(TAX.ni4UpperLimit)}.`,
  `The trading allowance lets you earn the first ${fmt(TAX.tradingAllowance)} of self-employed income tax-free.`,
  `UK tax rates are reviewed each Spring Budget. This calculator uses ${TAX_YEAR} figures and updates automatically.`,
];

// Group B — evergreen facts that don't reference specific thresholds
const evergreenFacts = [
  "CPD courses, insurance, gym rent and software are all fully tax-deductible.",
  "Online coaching clients add recurring income without extra gym hours.",
  "Most self-employed PTs file a Self Assessment tax return by 31 January each year.",
  "Group fitness instructors typically earn £28–£50 per class in the UK.",
  "CIMSPA and REPs professional memberships are claimable as business expenses.",
  "A phone used for client bookings can be claimed as a partial business expense.",
  "Keeping digital receipts via an app like Dext or Hubdoc can save hours at tax time.",
  "The average UK personal trainer charges £45–£65 per session.",
];

export const LOADING_FACTS = [...taxFacts, ...evergreenFacts];
