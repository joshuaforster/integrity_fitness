import { NextResponse } from "next/server";
import { GET as getTaxRates, type TaxRates } from "../tax-rates/route";

// The itemised inputs the PT income calculator collects on the client.
// Both the main form and the "lever mix" goal-planning sliders on
// app/income/page.tsx post this same shape — the lever sliders just send
// their hypothetical session/client/class numbers in place of the real ones,
// so the identical tax/NI logic below is reused for both without duplication.
interface IncomeInput {
  ptSessions: number; ptPrice: number;
  onlineClients: number; onlinePrice: number;
  classesPerWeek: number; classAttendees: number; classPricePerHead: number;
  gymRent: number; software: number; phone: number; marketing: number; travel: number;
  insurance: number; cpd: number; equipment: number; accountant: number; membership: number;
  bufferPct: number;
}

const REQUIRED_FIELDS: (keyof IncomeInput)[] = [
  "ptSessions", "ptPrice",
  "onlineClients", "onlinePrice",
  "classesPerWeek", "classAttendees", "classPricePerHead",
  "gymRent", "software", "phone", "marketing", "travel",
  "insurance", "cpd", "equipment", "accountant", "membership",
  "bufferPct",
];

// Guard against bad input up front so the rest of the function can trust the types —
// without this, a missing/non-numeric field would silently produce NaN results.
function validate(body: Record<string, unknown>): string | null {
  for (const field of REQUIRED_FIELDS) {
    const value = body[field];
    if (typeof value !== "number" || !Number.isFinite(value)) {
      return `${field} must be a finite number`;
    }
  }
  return null;
}

// UK self-employed take-home calculation: gross revenue across the three
// income streams, minus a contingency buffer, minus allowable expenses,
// gives taxable profit. Income tax and Class 4 NI are then applied band by
// band (basic / higher / additional) using the live HMRC rates.
function calculateIncome(input: IncomeInput, rates: TaxRates) {
  const {
    ptSessions, ptPrice, onlineClients, onlinePrice,
    classesPerWeek, classAttendees, classPricePerHead,
    gymRent, software, phone, marketing, travel,
    insurance, cpd, equipment, accountant, membership, bufferPct,
  } = input;

  const annualPt = ptSessions * ptPrice * 52;
  const annualOnline = onlineClients * onlinePrice * 12;
  const annualClass = classesPerWeek * classAttendees * classPricePerHead * 52;
  const grossRevenue = annualPt + annualOnline + annualClass;
  const bufferAmount = grossRevenue * (bufferPct / 100);
  const adjustedRevenue = grossRevenue - bufferAmount;

  const annualMonthlyExpenses = (gymRent + software + phone + marketing + travel) * 12;
  const annualYearlyExpenses = insurance + cpd + equipment + accountant + membership;
  const totalExpenses = annualMonthlyExpenses + annualYearlyExpenses;
  const taxableProfit = Math.max(0, adjustedRevenue - totalExpenses);
  const taxableAfterPA = Math.max(0, taxableProfit - rates.personalAllowance);

  let incomeTax = 0;
  let niClass4 = 0;
  if (taxableProfit > rates.personalAllowance) {
    const basicTaxable = Math.min(taxableProfit, rates.basicRateLimit) - rates.personalAllowance;
    incomeTax += basicTaxable * rates.basicRate;
    niClass4 += basicTaxable * rates.ni4MainRate;
    if (taxableProfit > rates.basicRateLimit) {
      const higherTaxable = Math.min(taxableProfit, rates.higherRateLimit) - rates.basicRateLimit;
      incomeTax += higherTaxable * rates.higherRate;
      niClass4 += higherTaxable * rates.ni4UpperRate;
      if (taxableProfit > rates.higherRateLimit) {
        incomeTax += (taxableProfit - rates.higherRateLimit) * rates.additionalRate;
        niClass4 += (taxableProfit - rates.higherRateLimit) * rates.ni4UpperRate;
      }
    }
  }

  const netYearly = taxableProfit - incomeTax - niClass4;
  const netMonthly = netYearly / 12;
  const netWeekly = netYearly / 52;

  return {
    annualPt, annualOnline, annualClass, grossRevenue, bufferAmount, adjustedRevenue,
    totalExpenses, taxableProfit, taxableAfterPA, incomeTax, niClass4,
    netYearly, netMonthly, netWeekly,
  };
}

export async function POST(request: Request) {
  const body = await request.json();

  const error = validate(body);
  if (error) {
    return NextResponse.json({ error }, { status: 400 });
  }

  // Tax rates aren't user input, so we source them server-side by calling
  // the existing GET handler directly (same process, no extra HTTP hop)
  // rather than requiring the client to pass them in.
  const ratesRes = await getTaxRates();
  const rates: TaxRates = await ratesRes.json();

  const result = calculateIncome(body as IncomeInput, rates);

  return NextResponse.json(result);
}
