"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageHero from "../components/ui/PageHero";
import type { TaxRates } from "../api/tax-rates/route";
import { TAX } from "../content/tax-config";
import { LOADING_FACTS } from "../content/loading-facts";
import Image from "next/image";
import {
  CalcAnimatedAmount,
  CalcInputField,
  CalcInfoModal,
  CalcSectionLabel,
} from "../components/calc";

/* ── Storage ────────────────────────────────────────────────────────────── */
const STORAGE_KEY = "pt-calc-v1";

interface StoredState {
  ptSessions: number; ptPrice: number;
  onlineClients: number; onlinePrice: number;
  classesPerWeek: number; classAttendees: number; classPricePerHead: number;
  gymRent: number; gymRentType: "monthly" | "per-session";
  software: number; phone: number; marketing: number; travel: number;
  insurance: number; cpd: number; equipment: number; accountant: number; membership: number;
  bufferPct: number;
}

function loadStored(): Partial<StoredState> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch { return {}; }
}

/* ── Formatting ─────────────────────────────────────────────────────────── */
const formatGBP = (amount: number) =>
  new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
  }).format(amount);


/* ── Info modal content ─────────────────────────────────────────────────── */
const INFO_CONTENT: Record<string, { title: string; body: string }> = {
  "face-to-face": {
    title: "Face-to-face PT",
    body: "1-to-1 sessions where you train clients in person:at a gym, studio or outdoors. You charge per session, so your income scales directly with the number of billable hours you work each week.\n\nThis is the most common starting point for PTs. UK average is around 10–20 billable sessions per week:not every hour is a paid hour.",
  },
  "online-coaching": {
    title: "Online coaching",
    body: "You write and deliver personalised training programmes remotely, with regular check-ins via an app, video call, or messaging. Clients pay a monthly retainer (typically £100–200/mo) rather than per session.\n\nThe big advantage: you can coach 20–50+ clients without being physically present, so it's a powerful way to grow income without adding gym hours. Many PTs run both in-person and online side by side.",
  },
  "group-classes": {
    title: "Group classes",
    body: "Fitness classes you lead for multiple participants:bootcamp, spin, HIIT, yoga, etc. Your income depends on attendance and what you charge per head.\n\nIf you charge a flat rate per class (rather than per person), set \"Avg. attendees\" to 1 and enter your flat class fee as the price per person.",
  },
};

/* ── Result row ─────────────────────────────────────────────────────────── */
function ResultRow({ label, value, negative, bold, last, index }: {
  label: string; value: number; negative?: boolean; bold?: boolean; last?: boolean; index: number;
}) {
  return (
    <motion.div
      className={`flex justify-between py-2.5 text-md ${last ? "" : "border-b border-zinc-200"} ${bold ? "font-semibold text-zinc-950" : "text-zinc-700"}`}
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: 0.15 + index * 0.06, ease: "easeOut" }}
    >
      <span>{label}</span>
      <span className={negative ? "text-red-600 font-medium" : undefined}>
        {negative ? `− ${formatGBP(value)}` : formatGBP(value)}
      </span>
    </motion.div>
  );
}

/* ── Fallback rates ─────────────────────────────────────────────────────── */
const DEFAULT_RATES: TaxRates = {
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

/* ── Page ───────────────────────────────────────────────────────────────── */
export default function Calculator() {
  const s = loadStored();

  const [ptSessions, setPtSessions] = useState(s.ptSessions ?? 15);
  const [ptPrice, setPtPrice] = useState(s.ptPrice ?? 45);
  const [onlineClients, setOnlineClients] = useState(s.onlineClients ?? 0);
  const [onlinePrice, setOnlinePrice] = useState(s.onlinePrice ?? 0);
  const [classesPerWeek, setClassesPerWeek] = useState(s.classesPerWeek ?? 0);
  const [classAttendees, setClassAttendees] = useState(s.classAttendees ?? 0);
  const [classPricePerHead, setClassPricePerHead] = useState(s.classPricePerHead ?? 0);
  const [gymRent, setGymRent] = useState(s.gymRent ?? 300);
  const [software, setSoftware] = useState(s.software ?? 25);
  const [phone, setPhone] = useState(s.phone ?? 20);
  const [marketing, setMarketing] = useState(s.marketing ?? 30);
  const [travel, setTravel] = useState(s.travel ?? 80);
  const [insurance, setInsurance] = useState(s.insurance ?? 150);
  const [cpd, setCpd] = useState(s.cpd ?? 200);
  const [equipment, setEquipment] = useState(s.equipment ?? 150);
  const [accountant, setAccountant] = useState(s.accountant ?? 400);
  const [membership, setMembership] = useState(s.membership ?? 100);
  const [bufferPct, setBufferPct] = useState(s.bufferPct ?? 10);

  const [rates, setRates] = useState<TaxRates>(DEFAULT_RATES);
  const [calcState, setCalcState] = useState<"idle" | "loading" | "done">("idle");
  const [currentFact, setCurrentFact] = useState("");
  const [goalNet, setGoalNet] = useState(40000);
  const [goalInitialised, setGoalInitialised] = useState(false);
  const [levers, setLevers] = useState({ sessions: 15, rate: 45, clients: 0, classes: 0 });
  const [leversInitialised, setLeversInitialised] = useState(false);
  const [openInfo, setOpenInfo] = useState<string | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  /* ── Persist to localStorage ────────────────────────────────────────── */
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        ptSessions, ptPrice, onlineClients, onlinePrice,
        classesPerWeek, classAttendees, classPricePerHead,
        gymRent, software, phone, marketing, travel,
        insurance, cpd, equipment, accountant, membership, bufferPct,
      }));
    } catch {}
  }, [
    ptSessions, ptPrice, onlineClients, onlinePrice,
    classesPerWeek, classAttendees, classPricePerHead,
    gymRent, software, phone, marketing, travel,
    insurance, cpd, equipment, accountant, membership, bufferPct,
  ]);

  useEffect(() => {
    async function loadRates() {
      try {
        const res = await fetch("/api/tax-rates");
        const data: TaxRates = await res.json();
        setRates(data);
      } catch {}
    }
    void loadRates();
  }, []);

  /* ── Calculations ─────────────────────────────────────────────────────── */
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

  /* ── Goal helpers ─────────────────────────────────────────────────────── */
  function calcNetFromGross(gross: number): number {
    const buf = gross * (bufferPct / 100);
    const adj = gross - buf;
    const taxable = Math.max(0, adj - totalExpenses);
    let tax = 0, ni = 0;
    if (taxable > rates.personalAllowance) {
      const basic = Math.min(taxable, rates.basicRateLimit) - rates.personalAllowance;
      tax += basic * rates.basicRate;
      ni += basic * rates.ni4MainRate;
      if (taxable > rates.basicRateLimit) {
        const higher = Math.min(taxable, rates.higherRateLimit) - rates.basicRateLimit;
        tax += higher * rates.higherRate;
        ni += higher * rates.ni4UpperRate;
        if (taxable > rates.higherRateLimit) {
          tax += (taxable - rates.higherRateLimit) * rates.additionalRate;
          ni += (taxable - rates.higherRateLimit) * rates.ni4UpperRate;
        }
      }
    }
    return taxable - tax - ni;
  }


  useEffect(() => {
    if (calcState === "done" && !goalInitialised) {
      const milestone = Math.ceil((netYearly + 2000) / 5000) * 5000;
      setGoalNet(Math.max(milestone, 10000));
      setGoalInitialised(true);
    }
  }, [calcState]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (calcState === "done" && !leversInitialised) {
      setLevers({ sessions: ptSessions, rate: ptPrice > 0 ? ptPrice : 45, clients: onlineClients, classes: classesPerWeek });
      setLeversInitialised(true);
    }
  }, [calcState]); // eslint-disable-line react-hooks/exhaustive-deps

  /* ── Goal & stream flags ─────────────────────────────────────────────── */
  const goalAchieved  = goalNet <= netYearly;
  const ptActive      = ptSessions > 0 || ptPrice > 0;
  const onlineActive  = onlineClients > 0 || onlinePrice > 0;
  const classesActive = classesPerWeek > 0 || (classAttendees > 0 && classPricePerHead > 0);

  const fallbackOnlinePrice       = onlinePrice >= 50 ? onlinePrice : 150;
  const fallbackClassPricePerHead = classPricePerHead >= 5 ? classPricePerHead : 10;
  const fallbackClassAttendees    = classAttendees > 0 ? classAttendees : 10;

  /* ── Lever mix calculations ───────────────────────────────────────────── */
  const leverPtGross     = levers.sessions * levers.rate * 52;
  const leverOnlineGross = levers.clients * fallbackOnlinePrice * 12;
  const leverClassGross  = levers.classes * fallbackClassAttendees * fallbackClassPricePerHead * 52;
  const leverTotalGross  = leverPtGross + leverOnlineGross + leverClassGross;
  const leverNet         = calcNetFromGross(leverTotalGross);
  const leverAchieved    = leverNet >= goalNet;
  const leverProgress    = goalNet > 0 ? Math.min(100, (leverNet / goalNet) * 100) : 0;
  const leverGap         = Math.max(0, goalNet - leverNet);

  function handleCalculate() {
    setCurrentFact(LOADING_FACTS[Math.floor(Math.random() * LOADING_FACTS.length)]);
    setCalcState("loading");
    setLeversInitialised(false);
    setTimeout(() => {
      setCalcState("done");
      setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
    }, 3200);
  }

  return (
    <>
      <PageHero
        image="https://pub-6e6bb53af6c34756a861d2c0a8259e84.r2.dev/WhatsApp%20Image%202026-06-19%20at%2016.27.36.jpeg"
        label="PT Income Calculator"
        title="PT Income Calculator"
        subtitle="Your real take-home after tax, NI & expenses — built for UK personal trainers."
        overlayStrength="heavy"
        size="sm"
      />

      <section className="py-16 lg:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
          {/* ── Intro ──────────────────────────────────────────────────── */}
          <div className="relative overflow-hidden pb-2">
            {/* Logo watermark */}
            <Image
              src="https://pub-6e6bb53af6c34756a861d2c0a8259e84.r2.dev/General/logo_white.png"
              alt=""
              width={280}
              height={90}
              className="absolute top-0 right-0 opacity-[0.05] invert pointer-events-none select-none hidden sm:block"
              aria-hidden="true"
            />
            <div className="flex items-center gap-2.5 mb-3">
              <span className="w-6 h-px bg-[#CE1A19] flex-shrink-0" aria-hidden="true" />
              <p className="text-sm font-bold tracking-widest uppercase text-[#CE1A19]">UK Personal Trainers · 2026</p>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight uppercase text-zinc-950 mb-4 leading-none">
              What could you<br className="hidden sm:block" /> actually take home?
            </h2>
            <p className="text-base text-zinc-600 leading-relaxed max-w-2xl mb-5">
              A realistic projection of your take-home pay after tax, National Insurance and business expenses.
              Tweak any number to model different scenarios — more clients, higher rates, or a new income stream.
            </p>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              {["Live HMRC rates", "Updated each Budget", "Saves automatically", "Goal planning"].map(tag => (
                <span key={tag} className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-zinc-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#CE1A19] flex-shrink-0" aria-hidden="true" />
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* ── Input card ─────────────────────────────────────────────── */}
          <div className="rounded-2xl border border-zinc-200 border-t-[3px] border-t-[#CE1A19] bg-zinc-50 overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
            <div className="px-8 pt-7 pb-5 border-b border-zinc-200 flex items-start justify-between gap-6">
              <div>
                <p className="text-sm font-bold tracking-widest uppercase text-[#CE1A19] mb-1">Your details</p>
                <h2 className="text-xl font-black tracking-tight uppercase text-zinc-950">Income &amp; expenses</h2>
                <p className="text-md text-zinc-600 mt-1">
                  Only fill in the services you offer — leave everything else at 0. Benchmarks in italics are typical UK figures.
                </p>
              </div>
              <Image
                src="https://pub-6e6bb53af6c34756a861d2c0a8259e84.r2.dev/General/logo_white.png"
                alt="Integrity"
                width={100}
                height={34}
                className="flex-shrink-0 invert opacity-[0.1] mt-1 hidden sm:block select-none"
                aria-hidden="true"
              />
            </div>

            {/* ── Income: 3 columns ── */}
            <div className="px-8 py-6 grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-zinc-200">
              <div className="pb-6 lg:pb-0 lg:pr-8">
                <CalcSectionLabel
                  title="Face-to-face PT"
                  hint="1-to-1 sessions in person at a gym, studio or outdoors."
                  infoId="face-to-face"
                  onInfo={setOpenInfo}
                />
                <div className="space-y-4">
                  <CalcInputField
                    label="Sessions per week"
                    hint="Billable only"
                    benchmark="UK avg: 10–20/wk"
                    value={ptSessions}
                    onChange={setPtSessions}
                    min={0}
                    max={60}
                    step={1}
                    warnAbove={35}
                    warnMessage="Very heavy load:most PTs cap at 25–30 to avoid burnout."
                  />
                  <CalcInputField
                    label="Price per session (£)"
                    hint="What you charge"
                    benchmark="UK avg: £40–70 · London: £60–100"
                    value={ptPrice}
                    onChange={setPtPrice}
                    min={0}
                    max={250}
                    step={5}
                    warnAbove={120}
                    warnMessage="Premium pricing:make sure your niche or location justifies this."
                  />
                </div>
                <p className="text-sm text-zinc-600 mt-3">
                  Annual:{" "}
                  <span className="font-semibold text-zinc-800">
                    {formatGBP(annualPt)}
                  </span>
                </p>
              </div>

              <div className="py-6 lg:py-0 lg:px-8">
                <CalcSectionLabel
                  title="Online coaching"
                  hint="Monthly retainer clients:programming, check-ins, support."
                  optional
                  infoId="online-coaching"
                  onInfo={setOpenInfo}
                />
                <div className="space-y-4">
                  <CalcInputField
                    label="Active clients"
                    hint="Monthly retainer"
                    benchmark="Typical: 10–30 clients"
                    value={onlineClients}
                    onChange={setOnlineClients}
                    min={0}
                    max={200}
                    step={1}
                    warnAbove={60}
                    warnMessage="At this volume, consider tiered packages to maintain quality."
                  />
                  <CalcInputField
                    label="Monthly fee per client (£)"
                    hint="Per client"
                    benchmark="Typical: £100–200/mo"
                    value={onlinePrice}
                    onChange={setOnlinePrice}
                    min={0}
                    max={500}
                    step={5}
                    warnAbove={350}
                    warnMessage="High end:clients at this price expect a very personalised service."
                  />
                </div>
                <p className="text-sm text-zinc-600 mt-3">
                  Annual:{" "}
                  <span className="font-semibold text-zinc-800">
                    {formatGBP(annualOnline)}
                  </span>
                </p>
              </div>

              <div className="pt-6 lg:pt-0 lg:pl-8">
                <CalcSectionLabel
                  title="Group classes"
                  hint="Bootcamp, spin, HIIT, yoga:income depends on attendance."
                  optional
                  infoId="group-classes"
                  onInfo={setOpenInfo}
                />
                <div className="space-y-4">
                  <CalcInputField
                    label="Classes per week"
                    hint="Average across year"
                    benchmark="Typical: 3–8/wk"
                    value={classesPerWeek}
                    onChange={setClassesPerWeek}
                    min={0}
                    max={30}
                    step={1}
                  />
                  <CalcInputField
                    label="Avg. attendees per class"
                    hint="Typical turnout"
                    benchmark="Typical: 8–15 per class"
                    value={classAttendees}
                    onChange={setClassAttendees}
                    min={0}
                    max={100}
                    step={1}
                  />
                  <CalcInputField
                    label="Price per person (£)"
                    hint="Per attendee"
                    benchmark="Typical: £8–15/head"
                    value={classPricePerHead}
                    onChange={setClassPricePerHead}
                    min={0}
                    max={60}
                    step={1}
                    warnAbove={25}
                    warnMessage="Above market for most group classes:ensure the premium is justified."
                  />
                </div>
                <p className="text-sm text-zinc-600 mt-3">
                  Annual:{" "}
                  <span className="font-semibold text-zinc-800">
                    {formatGBP(annualClass)}
                  </span>
                  <span className="ml-2 text-zinc-500">
                    Flat rate? Set attendees to 1.
                  </span>
                </p>
              </div>
            </div>

            <div className="h-px bg-zinc-200 mx-8" />

            {/* ── Expenses: 2 columns ── */}
            <div className="px-8 py-6 grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-zinc-200">
              <div className="pb-6 lg:pb-0 lg:pr-8">
                <CalcSectionLabel
                  title="Monthly expenses"
                  hint="Enter 0 for anything that doesn't apply."
                />
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-x-4 gap-y-4">
                    <CalcInputField
                      label="Gym / studio rent (£)"
                      hint="Space hire"
                      value={gymRent}
                      onChange={setGymRent}
                      min={0}
                      max={3000}
                      step={50}
                    />
                    <CalcInputField
                      label="Software & apps (£)"
                      hint="Trainerize, MyPTHub…"
                      value={software}
                      onChange={setSoftware}
                      min={0}
                      max={300}
                      step={5}
                    />
                    <CalcInputField
                      label="Phone & internet (£)"
                      hint="Business-use portion"
                      value={phone}
                      onChange={setPhone}
                      min={0}
                      max={150}
                      step={5}
                    />
                    <CalcInputField
                      label="Marketing & ads (£)"
                      hint="Social, website…"
                      value={marketing}
                      onChange={setMarketing}
                      min={0}
                      max={1000}
                      step={10}
                    />
                    <CalcInputField
                      label="Travel & fuel (£)"
                      hint="Client visits, commute"
                      value={travel}
                      onChange={setTravel}
                      min={0}
                      max={600}
                      step={10}
                    />
                  </div>
                </div>
              </div>

              <div className="pt-6 lg:pt-0 lg:pl-8">
                <CalcSectionLabel
                  title="Annual expenses"
                  hint="One-off or yearly costs:all fully deductible."
                />
                <div className="grid grid-cols-2 gap-x-4 gap-y-4">
                  <CalcInputField
                    label="Insurance (£)"
                    hint="PT liability cover"
                    value={insurance}
                    onChange={setInsurance}
                    min={0}
                    max={1000}
                    step={25}
                  />
                  <CalcInputField
                    label="CPD & training (£)"
                    hint="Courses, qualifications"
                    value={cpd}
                    onChange={setCpd}
                    min={0}
                    max={3000}
                    step={50}
                  />
                  <CalcInputField
                    label="Equipment & kit (£)"
                    hint="Bands, mats, tools…"
                    value={equipment}
                    onChange={setEquipment}
                    min={0}
                    max={2000}
                    step={50}
                  />
                  <CalcInputField
                    label="Accountant fees (£)"
                    hint="Tax return, bookkeeping"
                    value={accountant}
                    onChange={setAccountant}
                    min={0}
                    max={3000}
                    step={50}
                  />
                  <CalcInputField
                    label="Professional membership (£)"
                    hint="CIMSPA, REPs…"
                    value={membership}
                    onChange={setMembership}
                    min={0}
                    max={500}
                    step={25}
                  />
                </div>
              </div>
            </div>

            <div className="h-px bg-zinc-200 mx-8" />

            {/* ── Contingency buffer ── */}
            <div className="px-8 py-6">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <p className="text-sm font-bold tracking-widest uppercase text-[#CE1A19]">
                    Income buffer
                  </p>
                  <p className="text-sm text-zinc-600 mt-0.5 leading-snug max-w-lg">
                    Reduces gross revenue to account for illness, holidays,
                    quiet periods and no-shows. A 10–15% buffer is realistic for
                    most self-employed PTs.
                  </p>
                </div>
                <div className="flex items-baseline gap-0.5 flex-shrink-0">
                  <input
                    type="number"
                    value={bufferPct}
                    min={0}
                    max={40}
                    onFocus={(e) => e.target.select()}
                    onChange={(e) =>
                      setBufferPct(
                        Math.min(40, Math.max(0, Number(e.target.value) || 0)),
                      )
                    }
                    className="w-14 text-2xl font-black text-zinc-950 tabular-nums bg-transparent border-0 border-b-2 border-zinc-200 focus:border-[#CE1A19] focus:outline-none text-left"
                  />
                  <span className="text-3xl font-black text-[#CE1A19] leading-none ml-2">
                    %
                  </span>
                </div>
              </div>
              <input
                type="range"
                min={0}
                max={40}
                step={1}
                value={bufferPct}
                onChange={(e) => setBufferPct(Number(e.target.value))}
                className="w-full h-1.5 rounded-full cursor-pointer appearance-none
                  [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5
                  [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#CE1A19]
                  [&::-webkit-slider-thumb]:shadow-[0_1px_6px_rgba(206,26,25,0.5)] [&::-webkit-slider-thumb]:-mt-[6px]
                  [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full
                  [&::-moz-range-thumb]:bg-[#CE1A19] [&::-moz-range-thumb]:border-0"
                style={{
                  background: `linear-gradient(to right, #CE1A19 ${(bufferPct / 40) * 100}%, #e4e4e7 ${(bufferPct / 40) * 100}%)`,
                }}
              />
              <div className="flex justify-between mt-1.5">
                <span className="text-sm text-zinc-600">0% (no buffer)</span>
                <span className="text-sm text-zinc-600">
                  40% (very conservative)
                </span>
              </div>
            </div>

            {/* ── CTA ── */}
            <div className="px-8 py-6 border-t border-zinc-200 flex flex-col sm:flex-row items-center gap-4">
              <motion.button
                type="button"
                onClick={handleCalculate}
                disabled={calcState === "loading"}
                whileHover={calcState !== "loading" ? { scale: 1.02 } : {}}
                whileTap={calcState !== "loading" ? { scale: 0.97 } : {}}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className="w-full sm:w-auto relative overflow-hidden bg-[#CE1A19] hover:bg-red-700 disabled:bg-red-400 text-white font-bold uppercase tracking-widest text-md px-10 py-3.5 rounded-lg shadow-[0_2px_12px_rgba(206,26,25,0.3)] hover:shadow-[0_4px_20px_rgba(206,26,25,0.45)] transition-all duration-200 flex items-center justify-center gap-3"
              >
                <AnimatePresence mode="wait">
                  {calcState === "loading" ? (
                    <motion.span
                      key="loading"
                      className="flex items-center gap-2"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.2 }}
                    >
                      <svg
                        className="w-4 h-4 animate-spin"
                        viewBox="0 0 24 24"
                        fill="none"
                        aria-hidden="true"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="3"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v4l3-3-3-3V0a12 12 0 00-12 12h4z"
                        />
                      </svg>
                      Calculating…
                    </motion.span>
                  ) : calcState === "done" ? (
                    <motion.span
                      key="done"
                      className="flex items-center gap-2"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.2 }}
                    >
                      <svg
                        className="w-4 h-4"
                        viewBox="0 0 16 16"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M3 8l3.5 3.5L13 4.5" />
                      </svg>
                      Recalculate
                    </motion.span>
                  ) : (
                    <motion.span
                      key="idle"
                      className="flex items-center gap-2"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.2 }}
                    >
                      Calculate my take-home pay
                      <svg
                        className="w-4 h-4"
                        viewBox="0 0 16 16"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M3 8h10M9 4l4 4-4 4" />
                      </svg>
                    </motion.span>
                  )}
                </AnimatePresence>
                <AnimatePresence>
                  {calcState === "loading" && (
                    <motion.span
                      key="shimmer"
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      initial={{ x: "-100%" }}
                      animate={{ x: "200%" }}
                      transition={{
                        duration: 0.75,
                        ease: "easeInOut",
                        repeat: Infinity,
                      }}
                      aria-hidden="true"
                    />
                  )}
                </AnimatePresence>
              </motion.button>

              <p className="text-sm text-zinc-600 flex items-center gap-1.5">
                <svg
                  className="w-3 h-3 flex-shrink-0"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 1a7 7 0 100 14A7 7 0 008 1zM7 5a1 1 0 112 0 1 1 0 01-2 0zm1 3a.75.75 0 01.75.75v3a.75.75 0 01-1.5 0v-3A.75.75 0 018 8z"
                    clipRule="evenodd"
                  />
                </svg>
                Tax rates sourced live from HMRC · Updated each Budget
                automatically · Your values are saved automatically
              </p>
            </div>
          </div>

          {/* ── Results (below inputs) ──────────────────────────────────── */}
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
                    <motion.div
                      key="loading"
                      className="bg-white px-8 py-12 flex flex-col items-center text-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <Image
                        src="https://pub-6e6bb53af6c34756a861d2c0a8259e84.r2.dev/General/logo_white.png"
                        alt="Integrity"
                        width={110}
                        height={36}
                        className="invert opacity-25 mb-8 select-none"
                        aria-hidden="true"
                      />
                      <div className="relative w-14 h-14 mb-7">
                        <svg
                          className="w-14 h-14 text-zinc-100"
                          viewBox="0 0 56 56"
                          fill="none"
                          aria-hidden="true"
                        >
                          <circle
                            cx="28"
                            cy="28"
                            r="24"
                            stroke="currentColor"
                            strokeWidth="5"
                          />
                        </svg>
                        <svg
                          className="w-14 h-14 absolute inset-0 animate-spin text-[#CE1A19]"
                          viewBox="0 0 56 56"
                          fill="none"
                          style={{ animationDuration: "0.9s" }}
                          aria-hidden="true"
                        >
                          <circle
                            cx="28"
                            cy="28"
                            r="24"
                            stroke="currentColor"
                            strokeWidth="5"
                            strokeLinecap="round"
                            strokeDasharray="38 114"
                          />
                        </svg>
                      </div>
                      <p className="text-sm font-bold tracking-widest uppercase text-[#CE1A19] mb-2">
                        Did you know?
                      </p>
                      <motion.p
                        className="text-md text-zinc-600 max-w-sm leading-relaxed"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        {currentFact}
                      </motion.p>
                    </motion.div>
                  )}

                  {calcState === "done" && (
                    <motion.div
                      key="results"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Dark hero strip */}
                      <div className="relative bg-zinc-900 px-8 sm:px-10 py-10 overflow-hidden">
                        <div
                          className="absolute inset-0 texture-dots-dark"
                          aria-hidden="true"
                        />

                        <motion.div
                          className="relative z-10 flex items-start justify-between gap-4 mb-8"
                          initial={{ opacity: 0, y: -8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.45 }}
                        >
                          <div className="liquid-glass rounded-xl px-4 py-3 flex items-center gap-3.5">
                            <Image
                              src="https://pub-6e6bb53af6c34756a861d2c0a8259e84.r2.dev/HM_Revenue_%26_Customs.svg.png"
                              width={100}
                              height={100}
                              alt="Picture of the author"
                              className="grayscale brightness-0 invert"
                            />
                            <div>
                              <p className="text-sm font-bold tracking-widest uppercase text-white/55 leading-none mb-1">
                                HM Revenue &amp; Customs
                              </p>
                              <p className="text-sm font-semibold text-white leading-none">
                                Tax year {rates.taxYear} · Live rates
                              </p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => setCalcState("idle")}
                            className="text-sm font-bold uppercase tracking-widest text-white/40 hover:text-white transition-colors pt-1"
                          >
                            Reset
                          </button>
                        </motion.div>

                        <motion.div
                          className="relative z-10"
                          initial={{ opacity: 0, y: 16 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: 0.5,
                            delay: 0.1,
                            ease: "easeOut",
                          }}
                        >
                          <p className="text-sm font-bold tracking-widest uppercase text-[#CE1A19] mb-2">
                            Net take-home
                          </p>
                          <p className="text-5xl sm:text-6xl font-black text-white tracking-tight leading-none tabular-nums">
                            <CalcAnimatedAmount format={formatGBP} value={netYearly} />
                            <span className="text-[#CE1A19]">.</span>
                          </p>
                          <motion.div
                            className="flex items-center gap-4 mt-3"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.35 }}
                          >
                            <span className="text-md font-medium text-white/50 tabular-nums">
                              {formatGBP(netMonthly)}&nbsp;
                              <span className="text-white/25">/</span>&nbsp;mo
                            </span>
                            <span className="text-white/20">|</span>
                            <span className="text-md font-medium text-white/50 tabular-nums">
                              {formatGBP(netWeekly)}&nbsp;
                              <span className="text-white/25">/</span>&nbsp;wk
                            </span>
                          </motion.div>
                        </motion.div>
                      </div>

                      {/* Light breakdown */}
                      <div className="bg-white px-8 sm:px-10 py-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                          <div>
                            <p className="text-sm font-bold tracking-widest uppercase text-zinc-600 mb-1">
                              Income breakdown
                            </p>
                            {annualPt > 0 && (
                              <ResultRow
                                index={0}
                                label="Face-to-face PT"
                                value={annualPt}
                                bold
                              />
                            )}
                            {annualOnline > 0 && (
                              <ResultRow
                                index={1}
                                label="Online coaching"
                                value={annualOnline}
                                bold
                              />
                            )}
                            {annualClass > 0 && (
                              <ResultRow
                                index={2}
                                label="Group classes"
                                value={annualClass}
                                bold
                              />
                            )}
                            <ResultRow
                              index={3}
                              label="Gross potential revenue"
                              value={grossRevenue}
                              bold
                            />
                            {bufferPct > 0 && (
                              <ResultRow
                                index={4}
                                label={`Contingency buffer (${bufferPct}%)`}
                                value={bufferAmount}
                                negative
                              />
                            )}
                            <ResultRow
                              index={5}
                              label="Adjusted revenue"
                              value={adjustedRevenue}
                              bold
                              last
                            />
                          </div>
                          <div>
                            <p className="text-sm font-bold tracking-widest uppercase text-zinc-600 mb-1">
                              Tax breakdown
                            </p>
                            <ResultRow
                              index={0}
                              label="Allowable expenses"
                              value={totalExpenses}
                              negative
                            />
                            <ResultRow
                              index={1}
                              label="Profit after expenses"
                              value={taxableProfit}
                            />
                            <ResultRow
                              index={2}
                              label="Personal allowance"
                              value={Math.min(
                                taxableProfit,
                                rates.personalAllowance,
                              )}
                              negative
                            />
                            <ResultRow
                              index={3}
                              label="Taxable profit"
                              value={taxableAfterPA}
                              bold
                            />
                            {incomeTax > 0 && (
                              <ResultRow
                                index={4}
                                label={`Income tax (${rates.basicRate * 100}% · ${rates.higherRate * 100}% · ${rates.additionalRate * 100}%)`}
                                value={incomeTax}
                                negative
                              />
                            )}
                            <ResultRow
                              index={5}
                              label={`Class 4 NI (${rates.ni4MainRate * 100}% · ${rates.ni4UpperRate * 100}%)`}
                              value={niClass4}
                              negative
                              last
                            />
                          </div>
                        </div>
                        {/* Effective rates */}
                        {taxableProfit > 0 &&
                          (() => {
                            const itPct = (incomeTax / taxableProfit) * 100;
                            const niPct = (niClass4 / taxableProfit) * 100;
                            const keepPct = (netYearly / taxableProfit) * 100;
                            const itPence = Math.round(itPct);
                            const niPence = Math.round(niPct);
                            const keepPence = 100 - itPence - niPence;
                            return (
                              <motion.div
                                className="mt-8 pt-6 border-t border-zinc-100"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.55 }}
                              >
                                <p className="text-sm font-bold tracking-widest uppercase text-zinc-600 mb-4">
                                  Your effective rates
                                </p>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                  <div className="bg-zinc-50 rounded-xl p-4 border border-zinc-200">
                                    <p className="text-2xl font-black text-zinc-950 tabular-nums leading-none">
                                      {itPct.toFixed(1)}
                                      <span className="text-md font-semibold text-zinc-500">
                                        %
                                      </span>
                                    </p>
                                    <p className="text-sm font-semibold text-zinc-800 mt-2">
                                      Income tax
                                    </p>
                                    <p className="text-sm text-zinc-600 mt-0.5">
                                      {formatGBP(incomeTax)} of profit
                                    </p>
                                  </div>
                                  <div className="bg-zinc-50 rounded-xl p-4 border border-zinc-200">
                                    <p className="text-2xl font-black text-zinc-950 tabular-nums leading-none">
                                      {niPct.toFixed(1)}
                                      <span className="text-md font-semibold text-zinc-500">
                                        %
                                      </span>
                                    </p>
                                    <p className="text-sm font-semibold text-zinc-800 mt-2">
                                      Class 4 NI
                                    </p>
                                    <p className="text-sm text-zinc-600 mt-0.5">
                                      {formatGBP(niClass4)} of profit
                                    </p>
                                  </div>
                                  <div className="bg-zinc-50 rounded-xl p-4 border border-zinc-200">
                                    <p className="text-2xl font-black text-zinc-950 tabular-nums leading-none">
                                      {(itPct + niPct).toFixed(1)}
                                      <span className="text-md font-semibold text-zinc-500">
                                        %
                                      </span>
                                    </p>
                                    <p className="text-sm font-semibold text-zinc-800 mt-2">
                                      Combined rate
                                    </p>
                                    <p className="text-sm text-zinc-600 mt-0.5">
                                      {formatGBP(incomeTax + niClass4)} total
                                    </p>
                                  </div>
                                  <div className="bg-[#CE1A19]/8 border border-[#CE1A19]/30 rounded-xl p-4">
                                    <p className="text-2xl font-black text-[#CE1A19] tabular-nums leading-none">
                                      {keepPct.toFixed(1)}
                                      <span className="text-md font-semibold text-[#CE1A19]/70">
                                        %
                                      </span>
                                    </p>
                                    <p className="text-sm font-semibold text-zinc-800 mt-2">
                                      You keep
                                    </p>
                                    <p className="text-sm text-zinc-600 mt-0.5">
                                      of every pound of profit
                                    </p>
                                  </div>
                                </div>
                                <p className="text-sm text-zinc-700 mt-4 leading-relaxed">
                                  For every{" "}
                                  <strong className="text-zinc-900">
                                    £1 of profit
                                  </strong>
                                  :{" "}
                                  <strong className="text-zinc-900">
                                    {itPence}p
                                  </strong>{" "}
                                  income tax ·{" "}
                                  <strong className="text-zinc-900">
                                    {niPence}p
                                  </strong>{" "}
                                  National Insurance ·{" "}
                                  <strong className="text-[#CE1A19]">
                                    {keepPence}p
                                  </strong>{" "}
                                  yours to keep
                                </p>
                              </motion.div>
                            );
                          })()}

                        <motion.p
                          className="text-sm text-zinc-600 leading-relaxed mt-8 pt-6 border-t border-zinc-200"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.6 }}
                        >
                          Estimates only. Assumes this is your sole income for{" "}
                          {rates.taxYear}. Excludes student loans, pension
                          relief and non-standard tax codes. Speak to an
                          accountant for personalised advice.
                        </motion.p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Goal section ───────────────────────────────────────────── */}
          <AnimatePresence>
            {calcState === "done" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, delay: 0.15 }}
                className="rounded-2xl border border-zinc-200 border-t-[3px] border-t-[#CE1A19] overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.05)]"
              >
                {/* Header */}
                <div className="px-8 pt-7 pb-5 border-b border-zinc-200 bg-zinc-50 flex items-start justify-between gap-6">
                  <div>
                    <p className="text-sm font-bold tracking-widest uppercase text-[#CE1A19] mb-1">Income goals</p>
                    <h2 className="text-xl font-black tracking-tight uppercase text-zinc-950">What would it take?</h2>
                    <p className="text-md text-zinc-600 mt-1">Set a target and see exactly what needs to change to get there.</p>
                  </div>
                  <Image
                    src="https://pub-6e6bb53af6c34756a861d2c0a8259e84.r2.dev/General/logo_white.png"
                    alt=""
                    width={88}
                    height={30}
                    className="flex-shrink-0 invert opacity-[0.09] mt-1 hidden sm:block select-none"
                    aria-hidden="true"
                  />
                </div>

                {/* Goal slider */}
                <div className="px-8 py-6 border-b border-zinc-200 bg-zinc-50">
                  <div className="flex items-end justify-between gap-4 mb-3">
                    <div>
                      <p className="text-md font-medium text-zinc-600">
                        Target net take-home
                      </p>
                      <p className="text-sm text-zinc-600 mt-0.5">
                        Drag the slider to explore different goals
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-3xl font-black text-zinc-950 tabular-nums leading-none">
                        {formatGBP(goalNet)}
                        <span className="text-[#CE1A19]">.</span>
                      </p>
                      <p className="text-sm text-zinc-600 mt-1">per year</p>
                    </div>
                  </div>
                  <input
                    type="range"
                    min={10000}
                    max={150000}
                    step={1000}
                    value={goalNet}
                    onChange={(e) => setGoalNet(Number(e.target.value))}
                    className="w-full h-1.5 rounded-full cursor-pointer appearance-none
                      [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5
                      [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#CE1A19]
                      [&::-webkit-slider-thumb]:shadow-[0_1px_6px_rgba(206,26,25,0.5)] [&::-webkit-slider-thumb]:-mt-[6px]
                      [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full
                      [&::-moz-range-thumb]:bg-[#CE1A19] [&::-moz-range-thumb]:border-0"
                    style={{
                      background: `linear-gradient(to right, #CE1A19 ${((goalNet - 10000) / 140000) * 100}%, #e4e4e7 ${((goalNet - 10000) / 140000) * 100}%)`,
                    }}
                  />
                  <div className="flex justify-between mt-1.5">
                    <span className="text-sm text-zinc-600">£10k</span>
                    <span className="text-sm text-zinc-600">£150k</span>
                  </div>

                  {/* Gap indicator */}
                  <div
                    className={`mt-4 px-4 py-3 rounded-lg flex items-center gap-3 ${goalAchieved ? "bg-emerald-50 border border-emerald-200" : "bg-amber-50 border border-amber-200"}`}
                  >
                    <div
                      className={`w-2 h-2 rounded-full flex-shrink-0 ${goalAchieved ? "bg-emerald-500" : "bg-amber-500"}`}
                    />
                    {goalAchieved ? (
                      <p className="text-md text-emerald-700 font-medium">
                        You already hit this target:your current take-home is{" "}
                        <strong>{formatGBP(netYearly)}</strong>. Try setting a
                        higher goal.
                      </p>
                    ) : (
                      <p className="text-md text-amber-700">
                        You&apos;re currently taking home{" "}
                        <strong>{formatGBP(netYearly)}</strong>:a gap of{" "}
                        <strong>{formatGBP(goalNet - netYearly)}</strong> per
                        year ({formatGBP((goalNet - netYearly) / 12)}/mo).
                      </p>
                    )}
                  </div>
                </div>

                {/* Lever mix */}
                {!goalAchieved && (
                  <div>
                    {/* Progress summary */}
                    <div className="px-8 pt-6 pb-4">
                      <div className={`rounded-xl border p-4 ${leverAchieved ? "bg-emerald-50 border-emerald-200" : "bg-zinc-50 border-zinc-200"}`}>
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <div>
                            <p className="text-sm font-bold uppercase tracking-widest text-zinc-700">Mix your levers</p>
                            <p className="text-sm text-zinc-600 mt-0.5">Drag any slider to explore different combinations</p>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <p className="text-2xl font-black text-zinc-950 tabular-nums leading-none">
                              <CalcAnimatedAmount format={formatGBP} value={leverNet} />
                            </p>
                            <p className="text-sm text-zinc-600 mt-0.5">net / yr with this mix</p>
                          </div>
                        </div>
                        <div className="h-2 rounded-full bg-zinc-200 overflow-hidden">
                          <motion.div
                            className={`h-full rounded-full ${leverAchieved ? "bg-emerald-500" : "bg-[#CE1A19]"}`}
                            animate={{ width: `${leverProgress}%` }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                          />
                        </div>
                        <div className="flex items-center justify-between mt-1.5">
                          <span className="text-xs text-zinc-500">£0</span>
                          {leverAchieved ? (
                            <span className="text-sm font-semibold text-emerald-700">Goal reached — {formatGBP(leverNet - goalNet)} to spare</span>
                          ) : (
                            <span className="text-sm font-semibold text-zinc-700">{formatGBP(leverGap)} still to close</span>
                          )}
                          <span className="text-xs text-zinc-500">{formatGBP(goalNet)}</span>
                        </div>
                      </div>
                    </div>

                    {/* 4 lever cards */}
                    <div className="px-8 pb-6 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">

                      {/* PT sessions */}
                      <div className="rounded-xl border border-zinc-200 bg-white p-5 space-y-3">
                        <div className="flex items-center justify-between gap-2 flex-wrap">
                          <p className="text-sm font-bold tracking-widest uppercase text-[#CE1A19]">PT sessions</p>
                          {!ptActive && <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full px-2 py-0.5">New stream</span>}
                        </div>
                        <div>
                          <p className="text-2xl font-black text-zinc-950 tabular-nums">
                            {levers.sessions}<span className="text-md font-semibold text-zinc-500 ml-1">/ wk</span>
                          </p>
                          <p className="text-sm text-zinc-600 mt-0.5">{formatGBP(leverPtGross)}/yr gross</p>
                        </div>
                        <input
                          type="range" min={0} max={60} step={1} value={levers.sessions}
                          onChange={(e) => setLevers(p => ({ ...p, sessions: Number(e.target.value) }))}
                          className="w-full h-1.5 rounded-full cursor-pointer appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#CE1A19] [&::-webkit-slider-thumb]:shadow-[0_1px_4px_rgba(206,26,25,0.45)] [&::-webkit-slider-thumb]:-mt-[5px] [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[#CE1A19] [&::-moz-range-thumb]:border-0 [&::-moz-range-track]:h-1.5 [&::-moz-range-track]:rounded-full"
                          style={{ background: `linear-gradient(to right, #CE1A19 ${(levers.sessions / 60) * 100}%, #e4e4e7 ${(levers.sessions / 60) * 100}%)` }}
                        />
                        <div className="flex justify-between text-xs text-zinc-500"><span>0</span><span>60/wk</span></div>
                        {levers.sessions > 35 && <p className="text-xs text-amber-700">Heavy load — consider mixing streams.</p>}
                      </div>

                      {/* Rate per session */}
                      <div className="rounded-xl border border-zinc-200 bg-white p-5 space-y-3">
                        <div className="flex items-center justify-between gap-2 flex-wrap">
                          <p className="text-sm font-bold tracking-widest uppercase text-[#CE1A19]">Rate / session</p>
                          {!ptActive && <span className="text-xs font-bold uppercase tracking-wider text-zinc-600 bg-zinc-100 border border-zinc-200 rounded-full px-2 py-0.5">Optional</span>}
                        </div>
                        <div>
                          <p className="text-2xl font-black text-zinc-950 tabular-nums">
                            {formatGBP(levers.rate)}<span className="text-md font-semibold text-zinc-500 ml-1">/ session</span>
                          </p>
                          <p className="text-sm text-zinc-600 mt-0.5">{levers.sessions} sessions × {formatGBP(levers.rate)}</p>
                        </div>
                        <input
                          type="range" min={0} max={250} step={5} value={levers.rate}
                          onChange={(e) => setLevers(p => ({ ...p, rate: Number(e.target.value) }))}
                          className="w-full h-1.5 rounded-full cursor-pointer appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#CE1A19] [&::-webkit-slider-thumb]:shadow-[0_1px_4px_rgba(206,26,25,0.45)] [&::-webkit-slider-thumb]:-mt-[5px] [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[#CE1A19] [&::-moz-range-thumb]:border-0 [&::-moz-range-track]:h-1.5 [&::-moz-range-track]:rounded-full"
                          style={{ background: `linear-gradient(to right, #CE1A19 ${(levers.rate / 250) * 100}%, #e4e4e7 ${(levers.rate / 250) * 100}%)` }}
                        />
                        <div className="flex justify-between text-xs text-zinc-500"><span>£0</span><span>£250</span></div>
                        {levers.rate > 120 && <p className="text-xs text-amber-700">Premium rate — ensure your niche justifies this.</p>}
                      </div>

                      {/* Online clients */}
                      <div className="rounded-xl border border-zinc-200 bg-white p-5 space-y-3">
                        <div className="flex items-center justify-between gap-2 flex-wrap">
                          <p className="text-sm font-bold tracking-widest uppercase text-[#CE1A19]">Online clients</p>
                          {!onlineActive && <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full px-2 py-0.5">New stream</span>}
                        </div>
                        <div>
                          <p className="text-2xl font-black text-zinc-950 tabular-nums">
                            {levers.clients}<span className="text-md font-semibold text-zinc-500 ml-1">clients</span>
                          </p>
                          <p className="text-sm text-zinc-600 mt-0.5">{formatGBP(leverOnlineGross)}/yr · {formatGBP(fallbackOnlinePrice)}/mo each</p>
                        </div>
                        <input
                          type="range" min={0} max={100} step={1} value={levers.clients}
                          onChange={(e) => setLevers(p => ({ ...p, clients: Number(e.target.value) }))}
                          className="w-full h-1.5 rounded-full cursor-pointer appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#CE1A19] [&::-webkit-slider-thumb]:shadow-[0_1px_4px_rgba(206,26,25,0.45)] [&::-webkit-slider-thumb]:-mt-[5px] [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[#CE1A19] [&::-moz-range-thumb]:border-0 [&::-moz-range-track]:h-1.5 [&::-moz-range-track]:rounded-full"
                          style={{ background: `linear-gradient(to right, #CE1A19 ${(levers.clients / 100) * 100}%, #e4e4e7 ${(levers.clients / 100) * 100}%)` }}
                        />
                        <div className="flex justify-between text-xs text-zinc-500"><span>0</span><span>100 clients</span></div>
                        {levers.clients > 60 && <p className="text-xs text-amber-700">High volume — consider tiered packages.</p>}
                      </div>

                      {/* Group classes */}
                      <div className="rounded-xl border border-zinc-200 bg-white p-5 space-y-3">
                        <div className="flex items-center justify-between gap-2 flex-wrap">
                          <p className="text-sm font-bold tracking-widest uppercase text-[#CE1A19]">Group classes</p>
                          {!classesActive && <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full px-2 py-0.5">New stream</span>}
                        </div>
                        <div>
                          <p className="text-2xl font-black text-zinc-950 tabular-nums">
                            {levers.classes}<span className="text-md font-semibold text-zinc-500 ml-1">/ wk</span>
                          </p>
                          <p className="text-sm text-zinc-600 mt-0.5">{formatGBP(leverClassGross)}/yr · {fallbackClassAttendees} avg. attendees</p>
                        </div>
                        <input
                          type="range" min={0} max={30} step={1} value={levers.classes}
                          onChange={(e) => setLevers(p => ({ ...p, classes: Number(e.target.value) }))}
                          className="w-full h-1.5 rounded-full cursor-pointer appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#CE1A19] [&::-webkit-slider-thumb]:shadow-[0_1px_4px_rgba(206,26,25,0.45)] [&::-webkit-slider-thumb]:-mt-[5px] [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[#CE1A19] [&::-moz-range-thumb]:border-0 [&::-moz-range-track]:h-1.5 [&::-moz-range-track]:rounded-full"
                          style={{ background: `linear-gradient(to right, #CE1A19 ${(levers.classes / 30) * 100}%, #e4e4e7 ${(levers.classes / 30) * 100}%)` }}
                        />
                        <div className="flex justify-between text-xs text-zinc-500"><span>0</span><span>30/wk</span></div>
                      </div>

                    </div>
                  </div>
                )}

                <p className="px-8 pb-6 text-sm text-zinc-600 leading-relaxed">
                  Sliders initialise from your current inputs. <span className="font-semibold text-emerald-700">New stream</span> cards use typical UK defaults — enter real figures above to personalise them. The progress bar updates live as you mix.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {openInfo && (
        <CalcInfoModal id={openInfo} content={INFO_CONTENT} onClose={() => setOpenInfo(null)} />
      )}
    </>
  );
}
