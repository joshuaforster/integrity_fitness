"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { TAX } from "@/app/content/tax-config";
import {
  CalcIntro,
  CalcCard,
  CalcCardHeader,
  CalcSectionLabel,
  CalcInputField,
  CalcCTAButton,
  CalcLoadingState,
  CalcAnimatedAmount,
} from "@/app/components/calc";

// ── Helpers ───────────────────────────────────────────────────────────────────

const GBP = (n: number, decimals = 0) =>
  new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: decimals,
  }).format(n);

// ── Tax model ─────────────────────────────────────────────────────────────────

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

// ── Data model ────────────────────────────────────────────────────────────────

export interface Inputs {
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
}

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

  return {
    targetTakeHome, totalExpenses, breakEvenMonth, salaryMatchMonth,
    lowestSavingsBalance: lowestRow.savingsBalance, lowestSavingsMonth: lowestRow.month,
    requiredBuffer, savingsSufficient: lowestRow.savingsBalance >= 0,
    recoveryMonth: recoveryRow?.month ?? null,
  };
}

// ── Loading facts ─────────────────────────────────────────────────────────────

const LOADING_FACTS = [
  "New PTs typically take 9–14 months to fill a full client book — planning your finances around this timeline is what separates a smooth transition from a stressful one.",
  "PTs who secure even 3–5 clients before going full-time can cut their break-even timeline by up to 40%.",
  "Setting your session rate too low at launch is the single most common PT business mistake — it's much harder to raise it once clients are used to paying less.",
  "A 3-month savings buffer is the minimum. Most PTs who transition successfully had 4–6 months of living costs set aside before they handed in their notice.",
  "Group fitness classes can provide a reliable income floor from day one — a gym residency or community class can cover your basics while your PT book builds.",
  "Harry's graduates who transition to full-time PT say the first 6 months are the hardest thing they've ever done — and the most rewarding career decision they've ever made.",
];

const STORAGE_KEY = "transition_calc_v3";

// ── Confetti ──────────────────────────────────────────────────────────────────

const CONFETTI_COLORS = [
  "#CE1A19", "#ffffff", "#e4e4e7", "#fbbf24", "#f97316",
  "#CE1A19", "#ffffff", "#CE1A19", "#fcd34d", "#ffffff",
];

type ConfettiPieceProps = {
  x: number; delay: number; color: string; size: number;
  rotate: number; duration: number; drift: number;
};

function ConfettiPiece({ x, delay, color, size, rotate, duration, drift }: ConfettiPieceProps) {
  return (
    <motion.div
      className="fixed top-0 pointer-events-none"
      style={{ left: `${x}%`, width: size, height: size * 0.45, backgroundColor: color, borderRadius: 2, zIndex: 9999 }}
      initial={{ y: -30, opacity: 1, rotate }}
      animate={{ y: "115vh", opacity: [1, 1, 1, 0], rotate: rotate + 600, x: drift }}
      transition={{ duration, delay, ease: [0.2, 0.7, 0.8, 1.0] }}
    />
  );
}

function Confetti({ active }: { active: boolean }) {
  const [pieces, setPieces] = useState<ConfettiPieceProps[]>([]);
  useEffect(() => {
    if (!active) return;
    const newPieces: ConfettiPieceProps[] = Array.from({ length: 70 }, (_, i) => ({
      x: Math.random() * 100,
      delay: Math.random() * 0.9,
      color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
      size: 7 + Math.random() * 8,
      rotate: Math.random() * 360,
      duration: 2.8 + Math.random() * 2,
      drift: (Math.random() - 0.5) * 120,
    }));
    setPieces(newPieces);
    const t = setTimeout(() => setPieces([]), 6000);
    return () => clearTimeout(t);
  }, [active]);
  if (!pieces.length) return null;
  return <>{pieces.map((p, i) => <ConfettiPiece key={i} {...p} />)}</>;
}

// ── SVG Chart ─────────────────────────────────────────────────────────────────

const PAD = { l: 72, r: 24, t: 28, b: 52 };
const VW = 800;
const VH = 280;
const PW = VW - PAD.l - PAD.r;
const PH = VH - PAD.t - PAD.b;

function toX(month: number, xMin: number, xMax: number) {
  return PAD.l + ((month - xMin) / (xMax - xMin)) * PW;
}
function toY(val: number, yMax: number) {
  return PAD.t + PH - (val / yMax) * PH;
}
function makePath(points: [number, number][]): string {
  return points.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
}

function TrajectoryChart({ months, inp, metrics }: { months: MonthData[]; inp: Inputs; metrics: Metrics }) {
  const [animPct, setAnimPct] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    setAnimPct(0);
    const start = performance.now();
    const dur = 1200;
    function tick(now: number) {
      const t = Math.min((now - start) / dur, 1);
      setAnimPct(t);
      if (t < 1) rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [months]);

  const xMin = months[0].month;
  const xMax = 24;
  const yMax = Math.max(metrics.targetTakeHome, inp.employedTakeHome, metrics.totalExpenses) * 1.25;

  const incomePoints: [number, number][] = months.map((m) => [
    toX(m.month, xMin, xMax),
    toY(m.totalIncome, yMax),
  ]);
  const baseY = toY(0, yMax);
  const expY = toY(metrics.totalExpenses, yMax);
  const salaryY = toY(inp.employedTakeHome, yMax);

  const incomePath = makePath(incomePoints);
  const incomeAreaPath = incomePath + ` L${incomePoints[incomePoints.length - 1][0].toFixed(1)},${baseY.toFixed(1)} L${incomePoints[0][0].toFixed(1)},${baseY.toFixed(1)} Z`;

  const xZero = toX(0, xMin, xMax);
  const xBE = metrics.breakEvenMonth !== null ? toX(metrics.breakEvenMonth, xMin, xMax) : null;
  const xSM = metrics.salaryMatchMonth !== null ? toX(metrics.salaryMatchMonth, xMin, xMax) : null;

  const yAxisTicks = 4;
  const tickStep = yMax / yAxisTicks;

  return (
    <svg viewBox={`0 0 ${VW} ${VH}`} width="100%" className="overflow-visible" aria-hidden="true">
      <defs>
        <clipPath id="tc-plot"><rect x={PAD.l} y={PAD.t} width={PW} height={PH} /></clipPath>
        <clipPath id="tc-red"><rect x={PAD.l} y={expY} width={PW} height={VH - expY} /></clipPath>
        <clipPath id="tc-green"><rect x={PAD.l} y={PAD.t} width={PW} height={Math.max(0, salaryY - PAD.t)} /></clipPath>
        <linearGradient id="tc-glow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>

      {Array.from({ length: yAxisTicks + 1 }, (_, i) => {
        const val = tickStep * i;
        const y = toY(val, yMax);
        return (
          <g key={i}>
            <line x1={PAD.l} y1={y} x2={PAD.l + PW} y2={y} stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
            <text x={PAD.l - 8} y={y + 4} textAnchor="end" fontSize="10" fill="rgba(255,255,255,0.3)" fontFamily="monospace">{GBP(val)}</text>
          </g>
        );
      })}

      <line x1={xZero} y1={PAD.t} x2={xZero} y2={PAD.t + PH} stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeDasharray="4 3" />
      <text x={xZero} y={PAD.t + PH + 18} textAnchor="middle" fontSize="9" fill="rgba(255,255,255,0.4)" fontFamily="sans-serif" letterSpacing="1">YOU LEAVE</text>

      {[0, 3, 6, 9, 12, 18, 24].map((m) => {
        const x = toX(m, xMin, xMax);
        if (x < PAD.l || x > PAD.l + PW) return null;
        return (
          <text key={m} x={x} y={PAD.t + PH + 32} textAnchor="middle" fontSize="10" fill="rgba(255,255,255,0.3)" fontFamily="monospace">
            {m === 0 ? "M0" : `M${m}`}
          </text>
        );
      })}

      <line x1={PAD.l} y1={expY} x2={PAD.l + PW} y2={expY} stroke="#CE1A19" strokeWidth="1.5" strokeDasharray="5 4" opacity="0.7" />
      <text x={PAD.l + PW + 4} y={expY + 4} fontSize="9" fill="#CE1A19" opacity="0.8">Expenses</text>

      {salaryY !== expY && (
        <>
          <line x1={PAD.l} y1={salaryY} x2={PAD.l + PW} y2={salaryY} stroke="rgba(52,211,153,0.5)" strokeWidth="1.5" strokeDasharray="5 4" />
          <text x={PAD.l + PW + 4} y={salaryY + 4} fontSize="9" fill="rgba(52,211,153,0.6)">Old salary</text>
        </>
      )}

      <path d={incomeAreaPath} fill="rgba(206,26,25,0.18)" clipPath="url(#tc-red)" />
      <path d={incomeAreaPath} fill="rgba(52,211,153,0.12)" clipPath="url(#tc-green)" />
      <path d={incomeAreaPath} fill="url(#tc-glow)" clipPath="url(#tc-plot)" />

      <path
        d={incomePath} fill="none" stroke="white" strokeWidth="2.5"
        strokeLinejoin="round" strokeLinecap="round" clipPath="url(#tc-plot)"
        style={{ strokeDasharray: 2000, strokeDashoffset: 2000 - animPct * 2000, transition: "none" }}
      />

      {xBE !== null && (
        <g>
          <line x1={xBE} y1={PAD.t} x2={xBE} y2={PAD.t + PH} stroke="rgba(52,211,153,0.6)" strokeWidth="1" strokeDasharray="3 3" />
          <circle cx={xBE} cy={toY(metrics.totalExpenses, yMax)} r="4" fill="#34d399" />
          <text x={xBE} y={PAD.t - 8} textAnchor="middle" fontSize="9" fill="rgba(52,211,153,0.8)" fontFamily="sans-serif" letterSpacing="0.5">BREAK EVEN</text>
        </g>
      )}

      {xSM !== null && xSM !== xBE && (
        <g>
          <line x1={xSM} y1={PAD.t} x2={xSM} y2={PAD.t + PH} stroke="rgba(52,211,153,0.9)" strokeWidth="1.5" strokeDasharray="3 3" />
          <circle cx={xSM} cy={toY(inp.employedTakeHome, yMax)} r="5" fill="#34d399" />
          <text x={xSM} y={PAD.t - 8} textAnchor="middle" fontSize="9" fill="rgba(52,211,153,1)" fontFamily="sans-serif" letterSpacing="0.5">BEAT SALARY</text>
        </g>
      )}
    </svg>
  );
}

// ── Light metric card ─────────────────────────────────────────────────────────

function ResultMetric({ label, value, sub, tone = "neutral" }: {
  label: string; value: string; sub?: string;
  tone?: "neutral" | "success" | "danger" | "warning";
}) {
  const styles = {
    neutral: { card: "border-zinc-200 bg-zinc-50",       label: "text-zinc-500",  value: "text-zinc-950",   dot: "bg-zinc-300" },
    success: { card: "border-emerald-200 bg-emerald-50", label: "text-emerald-700", value: "text-emerald-800", dot: "bg-emerald-500" },
    danger:  { card: "border-red-200 bg-red-50",         label: "text-[#CE1A19]", value: "text-[#CE1A19]",  dot: "bg-[#CE1A19]" },
    warning: { card: "border-amber-200 bg-amber-50",     label: "text-amber-700", value: "text-amber-800",  dot: "bg-amber-500" },
  }[tone];

  return (
    <div className={`rounded-2xl border p-5 ${styles.card}`}>
      <div className={`w-1.5 h-1.5 rounded-full ${styles.dot} mb-3`} />
      <p className={`text-[10px] font-black uppercase tracking-widest mb-1.5 ${styles.label}`}>{label}</p>
      <p className={`text-xl font-black leading-none mb-1 ${styles.value}`}>{value}</p>
      {sub && <p className="text-xs text-zinc-500 leading-snug mt-1.5">{sub}</p>}
    </div>
  );
}

// ── Phase card (light) ────────────────────────────────────────────────────────

function PhaseCard({ num, label, months: monthRange, description, tone }: {
  num: string; label: string; months: string; description: string;
  tone: "neutral" | "danger" | "warning" | "success";
}) {
  const border = { neutral: "border-zinc-200", danger: "border-red-200", warning: "border-amber-200", success: "border-emerald-200" }[tone];
  const numCol = { neutral: "text-zinc-200", danger: "text-[#CE1A19]/25", warning: "text-amber-500/30", success: "text-emerald-500/30" }[tone];
  const labelCol = { neutral: "text-zinc-600", danger: "text-[#CE1A19]", warning: "text-amber-700", success: "text-emerald-700" }[tone];

  return (
    <div className={`rounded-xl border bg-white p-5 ${border}`}>
      <div className="flex items-start gap-4">
        <span className={`text-4xl font-black leading-none shrink-0 ${numCol}`}>{num}</span>
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-0.5">{monthRange}</p>
          <p className={`text-base font-black mb-2 ${labelCol}`}>{label}</p>
          <p className="text-sm text-zinc-600 leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
}

// ── Month table ───────────────────────────────────────────────────────────────

function MonthTable({ months, inp }: { months: MonthData[]; inp: Inputs }) {
  const [open, setOpen] = useState(false);
  const selfMonths = months.filter((m) => m.month > 0);

  return (
    <div>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-zinc-400 hover:text-zinc-700 transition-colors duration-200"
      >
        <motion.span animate={{ rotate: open ? 90 : 0 }} transition={{ duration: 0.2 }}>
          <ArrowRightIcon className="w-3.5 h-3.5" />
        </motion.span>
        {open ? "Hide" : "Show"} month-by-month breakdown
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden mt-4"
          >
            <div className="overflow-x-auto rounded-xl border border-zinc-200">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="border-b border-zinc-200 bg-zinc-50">
                    {["Month", "Take-home", "Expenses", "Net", "Savings"].map((h) => (
                      <th key={h} className="px-4 py-3 text-[10px] font-black uppercase tracking-widest text-zinc-400">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {selfMonths.map((m) => {
                    const isDeficit = m.net < 0;
                    const isWin = m.totalIncome >= inp.employedTakeHome;
                    return (
                      <tr key={m.month} className="border-b border-zinc-100 hover:bg-zinc-50">
                        <td className="px-4 py-2.5 font-mono text-zinc-500">M{m.month}</td>
                        <td className="px-4 py-2.5 font-mono text-zinc-800">{GBP(m.totalIncome)}</td>
                        <td className="px-4 py-2.5 font-mono text-zinc-500">{GBP(m.expenses)}</td>
                        <td className={`px-4 py-2.5 font-mono font-bold ${isDeficit ? "text-[#CE1A19]" : "text-emerald-600"}`}>
                          {isDeficit ? "−" : "+"}{GBP(Math.abs(m.net))}
                        </td>
                        <td className={`px-4 py-2.5 font-mono ${m.savingsBalance < 0 ? "text-[#CE1A19]" : isWin ? "text-emerald-600" : "text-zinc-600"}`}>
                          {GBP(m.savingsBalance)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Defaults ──────────────────────────────────────────────────────────────────

const DEFAULTS: Inputs = {
  employedTakeHome: 2_200,
  monthlyExpenses: 1_600,
  bizCosts: 100,
  savings: 5_000,
  noticePeriod: 1,
  targetSessions: 20,
  sessionRate: 50,
  rampMonths: 9,
  existingSessions: 0,
  classesPerWeek: 0,
  classRate: 30,
  incomeBufferPct: 10,
  partTimeMonthlyTakeHome: 0,
  partTimeMonths: 6,
};

// ── Main component ────────────────────────────────────────────────────────────

export default function TransitionCalculator() {
  const [inp, setInp] = useState<Inputs>(DEFAULTS);
  const [calcState, setCalcState] = useState<"idle" | "loading" | "done">("idle");
  const [currentFact, setCurrentFact] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);

  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setInp((prev) => ({ ...prev, ...JSON.parse(stored) }));
    } catch {}
  }, []);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(inp)); } catch {}
  }, [inp]);

  const set = (key: keyof Inputs) => (v: number) => {
    setInp((prev) => ({ ...prev, [key]: v }));
    if (calcState === "done") setCalcState("idle");
  };

  const isValid =
    inp.employedTakeHome > 0 &&
    inp.monthlyExpenses > 0 &&
    inp.targetSessions > 0 &&
    inp.sessionRate > 0;

  const { months, metrics } = useMemo(() => {
    if (!isValid) return { months: [] as MonthData[], metrics: null };
    const m = buildModel(inp);
    return { months: m, metrics: calcMetrics(m, inp) };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inp]);

  function handleCalculate() {
    if (!isValid || !metrics) return;
    setCurrentFact(LOADING_FACTS[Math.floor(Math.random() * LOADING_FACTS.length)]);
    setCalcState("loading");
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
    setTimeout(() => {
      setCalcState("done");
      setShowConfetti(true);
    }, 2800);
  }

  const phases = useMemo(() => {
    if (!metrics) return [];
    const { breakEvenMonth, salaryMatchMonth } = metrics;
    const list = [];

    if (inp.noticePeriod > 0) {
      list.push({
        num: "01",
        label: "Working Your Notice",
        months: `Months −${inp.noticePeriod} to 0`,
        description: `You're still receiving ${GBP(inp.employedTakeHome)}/month from your employer while preparing to leave. Use this runway to lock in your first PT clients, sort your business admin, and build momentum before your income changes.`,
        tone: "neutral" as const,
      });
    }

    const dipEnd = breakEvenMonth ?? inp.rampMonths;
    const hasDip = metrics.totalExpenses > seTakeHome(inp.existingSessions * (52 / 12) * inp.sessionRate + inp.classesPerWeek * (52 / 12) * inp.classRate);
    list.push({
      num: list.length === 0 ? "01" : "02",
      label: "The Dip",
      months: `Months 1–${dipEnd}`,
      description: hasDip
        ? `Your income is below expenses as your client base builds. This is the phase that stops most aspiring PTs from making the leap — but with the right savings buffer it's entirely survivable. Your savings absorb the shortfall until break-even around month ${breakEvenMonth ?? "?"}.`
        : `Your existing clients and classes mean you're already close to break-even from day one — the transition is shorter and less financially demanding than average.`,
      tone: hasDip ? ("danger" as const) : ("warning" as const),
    });

    if (breakEvenMonth !== null) {
      const end = salaryMatchMonth !== null ? salaryMatchMonth : 24;
      list.push({
        num: String(list.length + 1).padStart(2, "0"),
        label: "Breaking Even",
        months: `Month ${breakEvenMonth}–${end}`,
        description: `Your PT income now covers all your expenses. You're no longer drawing down on savings — every month from here builds forward momentum. This is a significant psychological shift.`,
        tone: "warning" as const,
      });
    }

    if (salaryMatchMonth !== null) {
      list.push({
        num: String(list.length + 1).padStart(2, "0"),
        label: "Full Flight",
        months: `Month ${salaryMatchMonth}+`,
        description: `You're earning more than your old salary as a fully self-employed PT — with autonomy over your hours, your clients, and your income ceiling. Every extra session, rate increase, or new class from here is pure upside.`,
        tone: "success" as const,
      });
    }

    return list;
  }, [metrics, inp]);

  const targetGrossMonthly =
    inp.targetSessions * (52 / 12) * inp.sessionRate +
    inp.classesPerWeek * (52 / 12) * inp.classRate;

  return (
    <>
      <Confetti active={showConfetti} />

      <section className="py-16 lg:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">

          <CalcIntro
            eyebrow="Career Transition Estimator · Integrity Fitness Education"
            heading={<>The numbers<br />behind the leap.</>}
            body="Thinking about going full-time as a PT? This tool projects what your transition could look like financially — the income dip, the savings runway, and the point you'd come out the other side earning more than you do today. Enter your own numbers and explore the scenarios."
            tags={[
              "Projection, not a guarantee",
              "Month-by-month model",
              "After-tax estimates",
              "Savings runway check",
            ]}
          />

          {/* ── Disclaimer banner ─────────────────────────────────────────── */}
          <div className="rounded-xl border border-amber-200 bg-amber-50 px-5 py-4 flex items-start gap-3">
            <svg className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M8.485 2.495c-.673-1.167-2.357-1.167-3.03 0L.222 13.24C-.463 14.4.38 16 1.727 16h12.546c1.346 0 2.19-1.6 1.505-2.76L8.485 2.495zM8 6a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 018 6zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
            <p className="text-xs text-amber-800 leading-relaxed">
              <strong className="font-black">This is an illustrative projection, not a financial guarantee.</strong>{" "}
              Results are based entirely on the numbers you enter and simplified tax rules. Real-world income depends on your qualification level, local market, competition, client retention, and many other factors. Speak to a qualified financial adviser before making any major career or financial decisions.
            </p>
          </div>

          {/* ── Step 1: Where You Are ──────────────────────────────────────── */}
          <CalcCard>
            <CalcCardHeader
              eyebrow="Step 1"
              title="Your Current Situation"
              subtitle="Where you are financially right now, before you make any changes."
              showLogo
            />

            <div className="px-8 py-6 space-y-8">
              <div>
                <CalcSectionLabel
                  title="Employed take-home"
                  hint="What lands in your bank each month after tax — not your gross salary, your actual take-home."
                />
                <CalcInputField
                  label="Monthly take-home (£)"
                  value={inp.employedTakeHome}
                  onChange={set("employedTakeHome")}
                  min={500}
                  max={6_000}
                  step={50}
                  benchmark="UK median employed take-home: ~£2,000/month"
                />
              </div>

              <div className="h-px bg-zinc-200" />

              <div>
                <CalcSectionLabel
                  title="Monthly essential expenses"
                  hint="Rent or mortgage, food, transport, utilities — everything you'd need to pay even as a self-employed PT."
                />
                <CalcInputField
                  label="Monthly essentials (£)"
                  value={inp.monthlyExpenses}
                  onChange={set("monthlyExpenses")}
                  min={500}
                  max={5_000}
                  step={50}
                  benchmark="Most aspiring PTs need £1,200–£2,200/month to cover living costs"
                  warnAbove={3_000}
                  warnMessage="High fixed costs mean you need to reach break-even faster — consider reducing before you make the leap."
                />
              </div>

              <div className="h-px bg-zinc-200" />

              <div>
                <CalcSectionLabel
                  title="Transition savings"
                  hint="Money set aside specifically to cover the income dip. This is your runway — the more you have, the calmer the transition."
                />
                <CalcInputField
                  label="Savings buffer (£)"
                  value={inp.savings}
                  onChange={set("savings")}
                  min={0}
                  max={50_000}
                  step={500}
                  benchmark="Aim for at least 3–6× your monthly expenses before you hand in your notice"
                />
              </div>

              <div className="h-px bg-zinc-200" />

              <div>
                <CalcSectionLabel
                  title="Notice period"
                  hint="How long you'll still receive your employed income after handing in your notice. Enter 0 if your contract has none."
                />
                <CalcInputField
                  label="Notice period (months)"
                  value={inp.noticePeriod}
                  onChange={set("noticePeriod")}
                  min={0}
                  max={6}
                  step={1}
                  benchmark="Most employment contracts are 1–3 months — check yours carefully"
                />
              </div>

              <div className="h-px bg-zinc-200" />

              <div>
                <CalcSectionLabel
                  title="Part-time income during transition"
                  optional
                  hint="If you plan to drop hours at your current job (or take a flexible part-time role) while building your PT business, enter your monthly take-home. This fills the gap during your ramp-up and frees hours for PT delivery and marketing."
                />
                <CalcInputField
                  label="Monthly take-home from part-time work (£)"
                  value={inp.partTimeMonthlyTakeHome}
                  onChange={set("partTimeMonthlyTakeHome")}
                  min={0}
                  max={3_000}
                  step={50}
                  benchmark="Reduced hours at current job or flexible role: typically £600–£1,400/month"
                />
                {inp.partTimeMonthlyTakeHome > 0 && (
                  <div className="mt-4">
                    <CalcSectionLabel
                      title="How many months will you keep this?"
                      hint="Once your PT income is sustainable you can drop the part-time role. Set this to roughly coincide with when you expect to reach break-even."
                    />
                    <CalcInputField
                      label="Part-time duration (months)"
                      value={inp.partTimeMonths}
                      onChange={set("partTimeMonths")}
                      min={1}
                      max={24}
                      step={1}
                      benchmark="Most PTs bridge with a part-time role for 3–12 months while building their client base"
                    />
                    <p className="text-xs text-zinc-500 mt-2 font-semibold">
                      = {GBP(inp.partTimeMonthlyTakeHome)}/month supplementary income for months 1–{inp.partTimeMonths}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </CalcCard>

          {/* ── Step 2: Your PT Plan ───────────────────────────────────────── */}
          <CalcCard>
            <CalcCardHeader
              eyebrow="Step 2"
              title="Your PT Business Plan"
              subtitle="What your self-employed income could look like once you're qualified and up to speed. Adjust to match your realistic ambitions."
              showLogo
            />

            <div className="px-8 py-6 space-y-8">
              <div>
                <CalcSectionLabel
                  title="Target 1-to-1 sessions per week"
                  hint="How many personal training sessions per week once your client book is full. Be realistic — most new PTs settle at 15–22."
                />
                <CalcInputField
                  label="PT sessions per week"
                  value={inp.targetSessions}
                  onChange={set("targetSessions")}
                  min={5}
                  max={40}
                  step={1}
                  benchmark="Realistic full capacity for a new PT: 15–22 sessions/week"
                  warnAbove={28}
                  warnMessage="28+ sessions is very high — factor in travel, admin, client no-shows, and burnout risk."
                />
                {inp.targetSessions > 0 && inp.sessionRate > 0 && (
                  <p className="text-xs text-zinc-500 mt-2 font-semibold">
                    = {GBP(inp.targetSessions * (52 / 12) * inp.sessionRate)}/month gross from 1-to-1s at full capacity
                  </p>
                )}
              </div>

              <div className="h-px bg-zinc-200" />

              <div>
                <CalcSectionLabel
                  title="1-to-1 session rate"
                  hint="What you plan to charge per personal training session. Don't undercharge to win clients — it's much harder to raise your rate later."
                />
                <CalcInputField
                  label="Per session (£)"
                  value={inp.sessionRate}
                  onChange={set("sessionRate")}
                  min={25}
                  max={150}
                  step={5}
                  benchmark="New PT average: £35–£55 · Experienced: £60–£90"
                />
              </div>

              <div className="h-px bg-zinc-200" />

              <div>
                <CalcSectionLabel
                  title="Time to reach full 1-to-1 capacity"
                  hint="How long to fill your PT client book from scratch. Most new PTs take 9–12 months — planning around this is what separates smooth transitions from stressful ones."
                />
                <CalcInputField
                  label="Ramp-up time (months)"
                  value={inp.rampMonths}
                  onChange={set("rampMonths")}
                  min={1}
                  max={18}
                  step={1}
                  benchmark="Industry average: 9–12 months to fill a client book from scratch"
                />
              </div>

              <div className="h-px bg-zinc-200" />

              <div>
                <CalcSectionLabel
                  title="Group fitness classes per week"
                  optional
                  hint="If you plan to run group classes (HIIT, bootcamp, yoga, etc.) these provide income from day one and can be a reliable floor during your ramp-up period."
                />
                <CalcInputField
                  label="Group classes per week"
                  value={inp.classesPerWeek}
                  onChange={set("classesPerWeek")}
                  min={0}
                  max={15}
                  step={1}
                  benchmark="A gym class residency: 2–5 classes/week · Community classes: 1–3"
                />
                {inp.classesPerWeek > 0 && (
                  <div className="mt-4">
                    <CalcSectionLabel
                      title="Pay per class"
                      hint="What the gym or venue pays you per class. This is typically flat pay, not per-participant."
                    />
                    <CalcInputField
                      label="Per class (£)"
                      value={inp.classRate}
                      onChange={set("classRate")}
                      min={15}
                      max={100}
                      step={5}
                      benchmark="Gym residency: £20–£35/class · Independent classes: £40–£80"
                    />
                    <p className="text-xs text-zinc-500 mt-2 font-semibold">
                      = {GBP(inp.classesPerWeek * (52 / 12) * inp.classRate)}/month gross from classes
                    </p>
                  </div>
                )}
              </div>

              <div className="h-px bg-zinc-200" />

              <div>
                <CalcSectionLabel
                  title="Monthly PT business costs"
                  optional
                  hint="Insurance (~£15/mo), scheduling software (~£20), marketing, travel — the overheads of running your PT business."
                />
                <CalcInputField
                  label="Monthly overheads (£)"
                  value={inp.bizCosts}
                  onChange={set("bizCosts")}
                  min={0}
                  max={500}
                  step={10}
                  benchmark="Typical new PT overheads: £60–£150/month"
                />
              </div>

              <div className="h-px bg-zinc-200" />

              <div>
                <CalcSectionLabel
                  title="Clients you're already training"
                  optional
                  hint="If you've started training clients on the side while still employed, enter how many sessions per week. Even 2–3 existing clients significantly de-risks your transition."
                />
                <CalcInputField
                  label="Current PT sessions per week"
                  value={inp.existingSessions}
                  onChange={set("existingSessions")}
                  min={0}
                  max={20}
                  step={1}
                  benchmark="Even 2–3 sessions/week before you leave dramatically cuts your break-even timeline"
                />
              </div>

              <div className="h-px bg-zinc-200" />

              <div>
                <div className="flex items-start justify-between gap-4 mb-2">
                  <CalcSectionLabel
                    title="Income buffer"
                    hint="Reduces projected PT income to account for no-shows, illness, holidays, and quiet periods. A 10% buffer produces more realistic projections for most self-employed PTs."
                  />
                  <div className="flex items-baseline gap-1 flex-shrink-0 mt-1">
                    <input
                      type="number"
                      value={inp.incomeBufferPct}
                      min={0}
                      max={40}
                      onFocus={(e) => e.target.select()}
                      onChange={(e) => set("incomeBufferPct")(Math.min(40, Math.max(0, Number(e.target.value) || 0)))}
                      className="w-14 text-2xl font-black text-zinc-950 tabular-nums bg-transparent border-0 border-b-2 border-zinc-200 focus:border-[#CE1A19] focus:outline-none text-left"
                    />
                    <span className="text-3xl font-black text-[#CE1A19] leading-none ml-2">%</span>
                  </div>
                </div>
                <input
                  type="range"
                  min={0}
                  max={40}
                  step={1}
                  value={inp.incomeBufferPct}
                  onChange={(e) => set("incomeBufferPct")(Number(e.target.value))}
                  className="w-full h-1.5 rounded-full cursor-pointer appearance-none
                    [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5
                    [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#CE1A19]
                    [&::-webkit-slider-thumb]:shadow-[0_1px_6px_rgba(206,26,25,0.5)] [&::-webkit-slider-thumb]:-mt-[6px]
                    [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full
                    [&::-moz-range-thumb]:bg-[#CE1A19] [&::-moz-range-thumb]:border-0"
                  style={{
                    background: `linear-gradient(to right, #CE1A19 ${(inp.incomeBufferPct / 40) * 100}%, #e4e4e7 ${(inp.incomeBufferPct / 40) * 100}%)`,
                  }}
                />
                <div className="flex justify-between mt-1.5">
                  <span className="text-xs text-zinc-500">0% (no buffer)</span>
                  <span className="text-xs text-zinc-500">40% (very conservative)</span>
                </div>
              </div>
            </div>

            <div className="px-8 py-6 border-t border-zinc-200 flex flex-wrap items-center gap-4">
              <CalcCTAButton
                calcState={calcState}
                onClick={handleCalculate}
                idleLabel="Show me my projection"
                loadingLabel="Building your model…"
                doneLabel="Recalculate"
              />
              {calcState === "done" && (
                <p className="text-xs text-zinc-400">Adjust any input above then recalculate to update</p>
              )}
            </div>
          </CalcCard>

          {/* ── Results ───────────────────────────────────────────────────── */}
          <AnimatePresence>
            {calcState !== "idle" && (
              <motion.div
                ref={resultsRef}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="rounded-2xl border border-zinc-200 border-t-[3px] border-t-[#CE1A19] overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.07)]"
              >
                <AnimatePresence mode="wait">

                  {calcState === "loading" && (
                    <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
                      <CalcLoadingState fact={currentFact} />
                    </motion.div>
                  )}

                  {calcState === "done" && metrics && (
                    <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>

                      {/* Dark hero strip */}
                      <div className="relative bg-zinc-950 px-8 sm:px-10 py-10 overflow-hidden">
                        <div className="absolute inset-0 texture-dots-dark" aria-hidden="true" />

                        <motion.div
                          className="relative z-10 flex items-start justify-between gap-4 mb-8"
                          initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}
                        >
                          <div className="liquid-glass rounded-xl px-4 py-3 flex items-center gap-3.5">
                            <div>
                              <p className="text-xs font-bold tracking-widest uppercase text-white/55 leading-none mb-1">Projection · Transition Readiness</p>
                              <p className={`text-xs font-semibold leading-none ${metrics.savingsSufficient ? "text-emerald-400" : "text-[#CE1A19]"}`}>
                                {metrics.savingsSufficient
                                  ? `Savings look sufficient — ${GBP(inp.savings)} buffer`
                                  : `Estimated shortfall: ${GBP(metrics.requiredBuffer)}`}
                              </p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => setCalcState("idle")}
                            className="text-xs font-bold uppercase tracking-widest text-white/40 hover:text-white transition-colors pt-1 shrink-0"
                          >
                            Reset
                          </button>
                        </motion.div>

                        <motion.div
                          className="relative z-10"
                          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
                        >
                          <p className="text-xs font-bold tracking-widest uppercase text-[#CE1A19] mb-2">Projected monthly take-home (after tax, at full capacity)</p>
                          <p className="text-5xl sm:text-6xl font-black text-white tracking-tight leading-none tabular-nums">
                            <CalcAnimatedAmount
                              value={metrics.targetTakeHome}
                              format={(n) => `£${Math.round(n).toLocaleString("en-GB")}`}
                            />
                            <span className="text-2xl text-white/40 font-bold ml-1">/mo</span>
                          </p>

                          <motion.div
                            className="flex flex-wrap items-center gap-x-6 gap-y-3 mt-6"
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}
                          >
                            <div className="flex items-center gap-2.5">
                              <span className="w-2 h-2 rounded-full bg-[#CE1A19] flex-shrink-0" />
                              <span className="text-sm text-white/55">
                                Est. break even:&nbsp;
                                <span className="text-white font-black">
                                  {metrics.breakEvenMonth ? `~Month ${metrics.breakEvenMonth}` : "Beyond 24 months"}
                                </span>
                              </span>
                            </div>
                            <div className="flex items-center gap-2.5">
                              <span className="w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0" />
                              <span className="text-sm text-white/55">
                                Est. beat old salary:&nbsp;
                                <span className="text-white font-black">
                                  {metrics.salaryMatchMonth ? `~Month ${metrics.salaryMatchMonth}` : "Beyond 24 months"}
                                </span>
                              </span>
                            </div>
                          </motion.div>

                          <motion.p
                            className="text-xs text-white/30 mt-4 leading-relaxed max-w-md"
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                          >
                            Projection only — based on your inputs and simplified 2026/27 tax rules. Not financial advice. Actual results will vary.
                          </motion.p>
                        </motion.div>
                      </div>

                      {/* Chart */}
                      <div className="bg-[#111113] px-8 sm:px-10 pb-8 pt-6">
                        <div className="flex items-end justify-between mb-4 flex-wrap gap-3">
                          <div>
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#CE1A19] mb-1">Projected Income Trajectory</p>
                            <h3 className="text-base font-black text-white uppercase tracking-tight">Your estimated path, month by month</h3>
                          </div>
                          <div className="flex items-center gap-5 text-[10px] font-semibold">
                            <span className="flex items-center gap-2 text-white/40"><span className="w-5 h-0.5 bg-white inline-block" /> Est. take-home</span>
                            <span className="flex items-center gap-2 text-[#CE1A19]/80"><span className="w-5 border-t border-dashed border-[#CE1A19]/80 inline-block" /> Expenses</span>
                            <span className="flex items-center gap-2 text-emerald-400/70"><span className="w-5 border-t border-dashed border-emerald-400/70 inline-block" /> Old salary</span>
                          </div>
                        </div>
                        <div className="rounded-2xl border border-white/[0.06] bg-zinc-950/60 p-4 md:p-6">
                          <TrajectoryChart months={months} inp={inp} metrics={metrics} />
                        </div>
                      </div>

                      {/* Light results section */}
                      <div className="bg-white px-8 sm:px-10 py-8 space-y-8">

                        {/* 4 key metrics */}
                        <motion.div
                          className="grid grid-cols-2 lg:grid-cols-4 gap-3"
                          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                        >
                          <ResultMetric
                            label="Est. break even"
                            value={metrics.breakEvenMonth ? `~Month ${metrics.breakEvenMonth}` : "Beyond 24mo"}
                            sub="When projected income ≥ monthly expenses"
                            tone={metrics.breakEvenMonth !== null && metrics.breakEvenMonth <= 9 ? "success" : metrics.breakEvenMonth === null ? "danger" : "warning"}
                          />
                          <ResultMetric
                            label="Est. beat old salary"
                            value={metrics.salaryMatchMonth ? `~Month ${metrics.salaryMatchMonth}` : "Beyond 24mo"}
                            sub={`When projected income ≥ ${GBP(inp.employedTakeHome)}/mo`}
                            tone={metrics.salaryMatchMonth !== null && metrics.salaryMatchMonth <= 14 ? "success" : "warning"}
                          />
                          <ResultMetric
                            label="Projected savings low"
                            value={GBP(Math.min(0, metrics.lowestSavingsBalance))}
                            sub={`Estimated worst point, around month ${metrics.lowestSavingsMonth}`}
                            tone={metrics.lowestSavingsBalance < 0 ? "danger" : "success"}
                          />
                          <ResultMetric
                            label="Estimated extra buffer"
                            value={metrics.savingsSufficient ? "Looks covered" : GBP(metrics.requiredBuffer)}
                            sub={metrics.savingsSufficient ? `${GBP(inp.savings)} appears sufficient` : "Estimated extra savings needed"}
                            tone={metrics.savingsSufficient ? "success" : "danger"}
                          />
                        </motion.div>

                        {/* Projected Timeline */}
                        <motion.div
                          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.23 }}
                        >
                          <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-4">Estimated Transition Timeline</p>
                          <div className="rounded-2xl border border-zinc-200 overflow-hidden">
                            <div className="grid grid-cols-2 sm:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-zinc-200">
                              {([
                                { icon: "M0", label: "Full-time PT", detail: "You go self-employed", tone: "neutral" },
                                {
                                  icon: metrics.breakEvenMonth !== null ? `~M${metrics.breakEvenMonth}` : "24mo+",
                                  label: "Break-even",
                                  detail: "Income ≥ expenses",
                                  tone: metrics.breakEvenMonth !== null && metrics.breakEvenMonth <= 9 ? "success" : metrics.breakEvenMonth === null ? "danger" : "warning",
                                },
                                {
                                  icon: metrics.salaryMatchMonth !== null ? `~M${metrics.salaryMatchMonth}` : "24mo+",
                                  label: "Salary matched",
                                  detail: `≥ ${GBP(inp.employedTakeHome)}/mo`,
                                  tone: metrics.salaryMatchMonth !== null && metrics.salaryMatchMonth <= 14 ? "success" : "warning",
                                },
                                {
                                  icon: metrics.recoveryMonth !== null ? `~M${metrics.recoveryMonth}` : "—",
                                  label: "Savings recovered",
                                  detail: metrics.recoveryMonth !== null ? "Back to starting balance" : "Not within 24 months",
                                  tone: metrics.recoveryMonth !== null ? "success" : "neutral",
                                },
                              ] as { icon: string; label: string; detail: string; tone: string }[]).map(({ icon, label, detail, tone }, i) => {
                                const bgMap: Record<string, string> = { neutral: "bg-zinc-50", success: "bg-emerald-50", danger: "bg-red-50", warning: "bg-amber-50" };
                                const iconMap: Record<string, string> = { neutral: "text-zinc-400", success: "text-emerald-600", danger: "text-[#CE1A19]", warning: "text-amber-600" };
                                const labelMap: Record<string, string> = { neutral: "text-zinc-700", success: "text-emerald-700", danger: "text-[#CE1A19]", warning: "text-amber-700" };
                                return (
                                  <div key={i} className={`px-5 py-5 ${bgMap[tone]}`}>
                                    <p className={`text-2xl font-black tabular-nums leading-none mb-2 ${iconMap[tone]}`}>{icon}</p>
                                    <p className={`text-xs font-black uppercase tracking-widest mb-1 ${labelMap[tone]}`}>{label}</p>
                                    <p className="text-[11px] text-zinc-500 leading-snug">{detail}</p>
                                  </div>
                                );
                              })}
                            </div>
                            {(inp.incomeBufferPct > 0 || inp.partTimeMonthlyTakeHome > 0) && (
                              <div className="px-5 py-3 border-t border-zinc-200 bg-zinc-50 flex flex-wrap gap-x-6 gap-y-1">
                                {inp.incomeBufferPct > 0 && (
                                  <p className="text-[10px] text-zinc-400">
                                    <span className="font-bold text-zinc-600">{inp.incomeBufferPct}% income buffer</span> applied to all PT projections
                                  </p>
                                )}
                                {inp.partTimeMonthlyTakeHome > 0 && (
                                  <p className="text-[10px] text-zinc-400">
                                    <span className="font-bold text-zinc-600">{GBP(inp.partTimeMonthlyTakeHome)}/mo part-time income</span> included for months 1–{inp.partTimeMonths}
                                  </p>
                                )}
                              </div>
                            )}
                          </div>
                        </motion.div>

                        {/* Safety panel */}
                        <motion.div
                          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
                          className={`rounded-2xl border p-6 flex items-start gap-4 ${
                            metrics.savingsSufficient ? "border-emerald-200 bg-emerald-50" : "border-red-200 bg-red-50"
                          }`}
                        >
                          <span className={`text-xl font-black shrink-0 mt-0.5 ${metrics.savingsSufficient ? "text-emerald-600" : "text-[#CE1A19]"}`}>
                            {metrics.savingsSufficient ? "✓" : "⚠"}
                          </span>
                          <div>
                            <p className={`text-sm font-black uppercase tracking-wider mb-1.5 ${metrics.savingsSufficient ? "text-emerald-700" : "text-[#CE1A19]"}`}>
                              {metrics.savingsSufficient
                                ? "Projected savings look sufficient for the dip"
                                : "Projected savings shortfall — build this up first"}
                            </p>
                            <p className="text-sm text-zinc-600 leading-relaxed">
                              {metrics.savingsSufficient
                                ? `Based on these projections, your ${GBP(inp.savings)} buffer should cover the dip — with a lowest estimated balance of ${GBP(metrics.lowestSavingsBalance)}. This is encouraging, but remember: real income rarely follows a smooth curve. Having extra in reserve is always wise.`
                                : `Based on these projections, your savings may run out before break-even. The estimated shortfall is ${GBP(metrics.requiredBuffer)} — either build this into your savings target or find ways to reduce expenses or accelerate client growth before you leave.`}
                            </p>
                          </div>
                        </motion.div>

                        {/* Phase journey */}
                        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                          <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-4">Your Estimated Journey in Phases</p>
                          <div className="grid sm:grid-cols-2 gap-3">
                            {phases.map((p) => (
                              <PhaseCard key={p.num} {...p} />
                            ))}
                          </div>
                        </motion.div>

                        {/* Income summary */}
                        <motion.div
                          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
                          className="rounded-xl border border-zinc-200 bg-zinc-50 p-5 flex flex-wrap gap-6"
                        >
                          <div>
                            <p className="text-[10px] font-black uppercase tracking-wider text-zinc-400 mb-1">Est. gross (full capacity)</p>
                            <p className="text-xl font-black text-zinc-950">{GBP(targetGrossMonthly)}<span className="text-sm font-normal text-zinc-400">/mo</span></p>
                            {inp.classesPerWeek > 0 && (
                              <p className="text-[10px] text-zinc-400 mt-0.5">
                                1-to-1s {GBP(inp.targetSessions * (52/12) * inp.sessionRate)} + classes {GBP(inp.classesPerWeek * (52/12) * inp.classRate)}
                              </p>
                            )}
                          </div>
                          <div>
                            <p className="text-[10px] font-black uppercase tracking-wider text-zinc-400 mb-1">Est. take-home (after tax)</p>
                            <p className="text-xl font-black text-emerald-700">{GBP(metrics.targetTakeHome)}<span className="text-sm font-normal text-zinc-400">/mo</span></p>
                          </div>
                          <div>
                            <p className="text-[10px] font-black uppercase tracking-wider text-zinc-400 mb-1">vs. current take-home</p>
                            <p className={`text-xl font-black ${metrics.targetTakeHome >= inp.employedTakeHome ? "text-emerald-700" : "text-[#CE1A19]"}`}>
                              {metrics.targetTakeHome >= inp.employedTakeHome ? "+" : "−"}{GBP(Math.abs(metrics.targetTakeHome - inp.employedTakeHome))}<span className="text-sm font-normal text-zinc-400">/mo</span>
                            </p>
                          </div>
                        </motion.div>

                        {/* Aspirational panel */}
                        {metrics.salaryMatchMonth !== null && (
                          <motion.div
                            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
                            className="rounded-2xl overflow-hidden border border-zinc-200"
                          >
                            <div className="bg-zinc-950 px-7 py-5 flex items-center gap-3">
                              <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" aria-hidden="true" />
                              <p className="text-xs font-black uppercase tracking-widest text-white/60">
                                If this projection holds — around Month {metrics.salaryMatchMonth}
                              </p>
                            </div>

                            <div className="bg-white px-7 py-8 grid md:grid-cols-2 gap-8 items-center">
                              <div>
                                <h3 className="text-2xl font-black text-zinc-950 leading-tight uppercase tracking-tight mb-4">
                                  Picture your life<br />
                                  <span className="text-[#CE1A19]">from this point on.</span>
                                </h3>
                                <ul className="space-y-3">
                                  {[
                                    "You're earning more than you did employed — and every hour of your day is yours to decide.",
                                    "Your income has no ceiling. Every extra client, rate increase, or new class you run goes straight to you.",
                                    "You build genuine relationships with clients who change because of you — not because of a gym brand.",
                                    "You chose your own hours, your own niche, and the kind of PT you want to be.",
                                    "And you're still early. Most PTs at this stage have a decade of growth still ahead of them.",
                                  ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-sm text-zinc-600 leading-relaxed">
                                      <span className="w-1.5 h-1.5 rounded-full bg-[#CE1A19] flex-shrink-0 mt-2" aria-hidden="true" />
                                      {item}
                                    </li>
                                  ))}
                                </ul>
                                <p className="text-xs text-zinc-400 mt-5 leading-relaxed">
                                  Projection based on your numbers: {GBP(metrics.targetTakeHome)}/month estimated take-home. The only thing between you and Month {metrics.salaryMatchMonth} is getting qualified and getting started.
                                </p>
                              </div>

                              <div className="relative rounded-xl overflow-hidden min-h-[280px]">
                                <Image
                                  src="https://pub-6e6bb53af6c34756a861d2c0a8259e84.r2.dev/WhatsApp%20Image%202026-06-19%20at%2016.27.36.jpeg"
                                  alt="Personal trainer working with a client"
                                  fill
                                  className="object-cover object-center"
                                  unoptimized
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/95 via-zinc-950/40 to-zinc-950/10" />
                                <div className="absolute top-4 left-4">
                                  <span className="bg-[#CE1A19] text-white text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full">
                                    Projection
                                  </span>
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 p-5">
                                  <p className="text-white font-black text-xl leading-tight">This could be your day job.</p>
                                  <p className="text-white/55 text-xs mt-1">Estimated take-home at full capacity</p>
                                  <p className="text-emerald-400 font-black text-2xl mt-2">{GBP(metrics.targetTakeHome)}<span className="text-white/40 text-sm font-normal">/mo</span></p>
                                  <p className="text-white/30 text-[10px] mt-2">~Month {metrics.salaryMatchMonth} · not a guarantee</p>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}

                        {/* Month table */}
                        <MonthTable months={months} inp={inp} />

                        {/* Disclaimer footer */}
                        <div className="rounded-xl border border-zinc-200 bg-zinc-50 px-5 py-4">
                          <p className="text-xs text-zinc-500 leading-relaxed">
                            <strong className="font-black text-zinc-700">Important:</strong> This tool produces illustrative projections only. Figures are based on the numbers you entered, simplified tax calculations, and a linear ramp model — real income is unpredictable and rarely follows a smooth curve. Tax rules may change. This is not financial or professional advice. Before making any major career or financial decisions, speak to a qualified financial adviser or accountant.
                          </p>
                        </div>

                        {/* Footer CTA */}
                        <div className="pt-2 border-t border-zinc-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
                          <div>
                            <p className="text-sm font-black text-zinc-950 mb-1">Ready to start building toward this?</p>
                            <p className="text-sm text-zinc-500">Your Level 3 PT qualification is the first step. Here's what's available at IFE.</p>
                          </div>
                          <a
                            href="/qualifications"
                            className="group inline-flex items-center gap-2 bg-[#CE1A19] text-white px-6 py-3 rounded-lg font-black text-xs uppercase tracking-widest hover:bg-red-700 transition-colors duration-200 shrink-0 shadow-[0_2px_12px_rgba(206,26,25,0.25)]"
                          >
                            View Qualifications
                            <ArrowRightIcon className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                          </a>
                        </div>
                      </div>

                    </motion.div>
                  )}

                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </section>
    </>
  );
}
