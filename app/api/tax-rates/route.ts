import { NextResponse } from "next/server";
import { TAX } from "../../content/tax-config";

export interface TaxRates {
  taxYear: string;
  personalAllowance: number;
  basicRateLimit: number;
  higherRateLimit: number;
  basicRate: number;
  higherRate: number;
  additionalRate: number;
  ni4LowerLimit: number;
  ni4UpperLimit: number;
  ni4MainRate: number;
  ni4UpperRate: number;
}

const FALLBACK: TaxRates = {
  taxYear: "2026 to 2027",
  personalAllowance: TAX.personalAllowance,
  basicRateLimit:    TAX.basicRateLimit,
  higherRateLimit:   TAX.higherRateLimit,
  basicRate:         TAX.basicRate,
  higherRate:        TAX.higherRate,
  additionalRate:    TAX.additionalRate,
  ni4LowerLimit:     TAX.ni4LowerLimit,
  ni4UpperLimit:     TAX.ni4UpperLimit,
  ni4MainRate:       TAX.ni4MainRate,
  ni4UpperRate:      TAX.ni4UpperRate,
};

function parseAmount(str: string): number | null {
  const m = str.replace(/,/g, "").match(/£(\d+)/);
  return m ? parseInt(m[1], 10) : null;
}

async function fetchIncomeTaxRates(): Promise<Partial<TaxRates>> {
  const res = await fetch("https://www.gov.uk/api/content/income-tax-rates", {
    next: { revalidate: 86400 },
  });
  if (!res.ok) return {};
  const json = await res.json();

  const parts: { body?: string }[] = json?.details?.parts ?? [];
  const body = parts.map((p) => p.body ?? "").join(" ");

  // Strip tags
  const text = body.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");

  // Personal allowance
  const paMatch = text.match(/standard Personal Allowance is £([\d,]+)/);
  const personalAllowance = paMatch ? parseAmount(`£${paMatch[1]}`) : null;

  // Basic rate limit — "£12,571 to £50,270" or similar
  const basicMatch = text.match(/£[\d,]+ to £([\d,]+)\s+20%/);
  const basicRateLimit = basicMatch ? parseAmount(`£${basicMatch[1]}`) : null;

  // Higher rate limit — "£50,271 to £125,140" or "over £125,140" pattern
  const higherMatch = text.match(/£[\d,]+ to £([\d,]+)\s+40%/);
  const higherRateLimit = higherMatch ? parseAmount(`£${higherMatch[1]}`) : null;

  return {
    ...(personalAllowance != null && { personalAllowance }),
    ...(basicRateLimit != null && { basicRateLimit }),
    ...(higherRateLimit != null && { higherRateLimit }),
  };
}

async function fetchNiRates(): Promise<Partial<TaxRates>> {
  const res = await fetch(
    "https://www.gov.uk/api/content/government/publications/rates-and-allowances-national-insurance-contributions/rates-and-allowances-national-insurance-contributions",
    { next: { revalidate: 86400 } }
  );
  if (!res.ok) return {};
  const json = await res.json();

  const body: string = json?.details?.body ?? "";
  const text = body.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");

  // Find Class 4 section
  const c4Idx = text.indexOf("Class 4");
  if (c4Idx === -1) return {};
  const c4Text = text.slice(c4Idx, c4Idx + 800);

  // Lower Profits Limit — first £amount after "Lower Profits Limit"
  const lplMatch = c4Text.match(/Lower Profits Limit[^£]*£([\d,]+)/);
  const ni4LowerLimit = lplMatch ? parseAmount(`£${lplMatch[1]}`) : null;

  // Upper Profits Limit
  const uplMatch = c4Text.match(/Upper Profits Limit[^£]*£([\d,]+)/);
  const ni4UpperLimit = uplMatch ? parseAmount(`£${uplMatch[1]}`) : null;

  // Main rate — "Rate between ... X%"
  const mainRateMatch = c4Text.match(/Rate between[^%\d]*(\d+)%/);
  const ni4MainRate = mainRateMatch ? parseInt(mainRateMatch[1], 10) / 100 : null;

  // Upper rate — "Rate above ... X%"
  const upperRateMatch = c4Text.match(/Rate above[^%\d]*(\d+)%/);
  const ni4UpperRate = upperRateMatch ? parseInt(upperRateMatch[1], 10) / 100 : null;

  // Tax year — "2026 to 2027" style
  const yearMatch = text.match(/(\d{4} to \d{4})/);
  const taxYear = yearMatch ? yearMatch[1] : undefined;

  return {
    ...(ni4LowerLimit != null && { ni4LowerLimit }),
    ...(ni4UpperLimit != null && { ni4UpperLimit }),
    ...(ni4MainRate != null && { ni4MainRate }),
    ...(ni4UpperRate != null && { ni4UpperRate }),
    ...(taxYear && { taxYear }),
  };
}

export async function GET() {
  try {
    const [itRates, niRates] = await Promise.all([
      fetchIncomeTaxRates(),
      fetchNiRates(),
    ]);

    const rates: TaxRates = { ...FALLBACK, ...itRates, ...niRates };
    return NextResponse.json(rates, {
      headers: { "Cache-Control": "public, max-age=86400, stale-while-revalidate=3600" },
    });
  } catch {
    return NextResponse.json(FALLBACK, {
      headers: { "Cache-Control": "public, max-age=3600" },
    });
  }
}
