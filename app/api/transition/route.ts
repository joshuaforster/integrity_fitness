import { NextResponse } from "next/server";
import { TAX } from "@/app/content/tax-config";

// ── Data model ────────────────────────────────────────────────────────────────
// Mirrors app/transition/TransitionCalculator.tsx's `Inputs`/`MonthData`/`Metrics`
// shapes. Kept as a separate copy here (rather than imported) so this route has
// no dependency on a "use client" component, matching the app/api/rm/route.ts pattern.

interface Inputs {
  employedTakeHome: number;
  monthlyExpenses: number;
  bizCosts: number;
  savings: number;
  noticePeriod: number;
  targetSessions: number;
  sessionRate: number;
  rampMonths: number;
  existingSessions: number;
  classesPerWeek: number;
  classRate: number;
  incomeBufferPct: number;
  partTimeMonthlyTakeHome: number;
  partTimeMonths: number;
}

interface MonthData {
  month: number;
  phase: "notice" | "ramp" | "steady";
  totalIncome: number;
  expenses: number;
  net: number;
  savingsBalance: number;
}

interface Metrics {
  targetTakeHome: number;
  totalExpenses: number;
  breakEvenMonth: number | null;
  salaryMatchMonth: number | null;
  lowestSavingsBalance: number;
  lowestSavingsMonth: number;
  requiredBuffer: number;
  savingsSufficient: boolean;
  recoveryMonth: number | null;
  hasDip: boolean;
}

// ── Tax model ─────────────────────────────────────────────────────────────────
// Simplified UK self-employed take-home: basic/higher rate income tax, Class 4
// NI, and a flat Class 2 NI stamp, applied to an annualised monthly gross figure.

function seTakeHome(monthlyGross: number): number {
  if (monthlyGross <= 0) return 0;
  const annual = monthlyGross * 12;
  const { personalAllowance: PA, basicRateLimit: BRL, basicRate, higherRate,
          ni4LowerLimit, ni4UpperLimit, ni4MainRate, ni4UpperRate } = TAX;
  let tax = 0;
  if (annual > PA) {
    tax = Math.min(annual - PA, BRL - PA) * basicRate;
    if (annual > BRL) tax += (annual - BRL) * higherRate;
  }
  let ni4 = 0;
  if (annual > ni4LowerLimit) {
    ni4 = Math.min(annual - ni4LowerLimit, ni4UpperLimit - ni4LowerLimit) * ni4MainRate;
    if (annual > ni4UpperLimit) ni4 += (annual - ni4UpperLimit) * ni4UpperRate;
  }
  const class2 = annual > ni4LowerLimit ? 3.45 * 52 : 0;
  return Math.max(0, (annual - tax - ni4 - class2) / 12);
}

// Builds the month-by-month projection: notice-period months (still on employed
// income plus any existing PT/class income), then 24 months of self-employment
// where 1-to-1 sessions ramp linearly from `existingSessions` to `targetSessions`
// over `rampMonths`, blended with flat class income, an optional part-time
// bridge-income supplement for the first `partTimeMonths`, and an income buffer
// (a flat haircut on gross PT/class income to account for no-shows/quiet weeks).
function buildModel(inp: Inputs): MonthData[] {
  const { employedTakeHome, monthlyExpenses, bizCosts, savings,
          noticePeriod, targetSessions, sessionRate, rampMonths,
          existingSessions, classesPerWeek, classRate,
          incomeBufferPct, partTimeMonthlyTakeHome, partTimeMonths } = inp;
  const totalExp = monthlyExpenses + bizCosts;
  const bufferFactor = 1 - (incomeBufferPct ?? 0) / 100;
  const existingGross = existingSessions * (52 / 12) * sessionRate;
  const classGross = classesPerWeek * (52 / 12) * classRate;

  const rows: MonthData[] = [];
  let bal = savings;

  for (let m = -noticePeriod; m <= 0; m++) {
    const ptTH = seTakeHome(existingGross * bufferFactor);
    const income = employedTakeHome + ptTH;
    const net = income - totalExp;
    bal += net;
    rows.push({ month: m, phase: "notice", totalIncome: income, expenses: totalExp, net, savingsBalance: bal });
  }

  for (let m = 1; m <= 24; m++) {
    const progress = rampMonths > 0 ? Math.min(1, m / rampMonths) : 1;
    const sessions = existingSessions + (targetSessions - existingSessions) * progress;
    const ptGross = sessions * (52 / 12) * sessionRate;
    const ptIncome = seTakeHome((ptGross + classGross) * bufferFactor);
    const ptSupplement = (partTimeMonthlyTakeHome ?? 0) > 0 && m <= (partTimeMonths ?? 0) ? (partTimeMonthlyTakeHome ?? 0) : 0;
    const income = ptIncome + ptSupplement;
    const net = income - totalExp;
    bal += net;
    rows.push({ month: m, phase: m <= rampMonths ? "ramp" : "steady", totalIncome: income, expenses: totalExp, net, savingsBalance: bal });
  }

  return rows;
}

// Derives headline metrics from the month-by-month rows: target steady-state
// take-home, break-even month (income covers expenses), salary-match month
// (income beats the old employed take-home), the lowest projected savings
// balance (and therefore the extra buffer needed if it dips negative), and the
// month savings recover back to their starting balance.
function calcMetrics(months: MonthData[], inp: Inputs): Metrics {
  const targetPTGross = inp.targetSessions * (52 / 12) * inp.sessionRate;
  const targetClassGross = inp.classesPerWeek * (52 / 12) * inp.classRate;
  const bufferFactor = 1 - (inp.incomeBufferPct ?? 0) / 100;
  const targetTakeHome = seTakeHome((targetPTGross + targetClassGross) * bufferFactor);
  const totalExpenses = inp.monthlyExpenses + inp.bizCosts;
  const selfMonths = months.filter((m) => m.month > 0);

  const breakEvenMonth = selfMonths.find((m) => m.totalIncome >= totalExpenses)?.month ?? null;
  const salaryMatchMonth = selfMonths.find((m) => m.totalIncome >= inp.employedTakeHome)?.month ?? null;
  const lowestRow = months.reduce((a, b) => (b.savingsBalance < a.savingsBalance ? b : a));
  const requiredBuffer = Math.max(0, -lowestRow.savingsBalance);
  const recoveryRow = selfMonths.find((m) => m.savingsBalance >= inp.savings);

  // Whether target income (before ramp-up, unbuffered by the income-buffer %)
  // is still below expenses — used by the client to describe the "Dip" phase.
  const hasDip = totalExpenses > seTakeHome(
    inp.existingSessions * (52 / 12) * inp.sessionRate + inp.classesPerWeek * (52 / 12) * inp.classRate
  );

  return {
    targetTakeHome, totalExpenses, breakEvenMonth, salaryMatchMonth,
    lowestSavingsBalance: lowestRow.savingsBalance, lowestSavingsMonth: lowestRow.month,
    requiredBuffer, savingsSufficient: lowestRow.savingsBalance >= 0,
    recoveryMonth: recoveryRow?.month ?? null,
    hasDip,
  };
}

const NUMERIC_FIELDS: (keyof Inputs)[] = [
  "employedTakeHome", "monthlyExpenses", "bizCosts", "savings", "noticePeriod",
  "targetSessions", "sessionRate", "rampMonths", "existingSessions",
  "classesPerWeek", "classRate", "incomeBufferPct", "partTimeMonthlyTakeHome",
  "partTimeMonths",
];

export async function POST(request: Request) {
  const body = await request.json();

  // Guard against bad input up front so buildModel/calcMetrics can trust the
  // types — a missing/non-numeric field would otherwise silently produce NaN
  // throughout the whole month-by-month projection.
  for (const field of NUMERIC_FIELDS) {
    const value = body?.[field];
    if (typeof value !== "number" || !Number.isFinite(value)) {
      return NextResponse.json(
        { error: `${field} must be a finite number` },
        { status: 400 }
      );
    }
  }

  const inp = body as Inputs;
  const months = buildModel(inp);
  const metrics = calcMetrics(months, inp);

  return NextResponse.json({ months, metrics });
}
