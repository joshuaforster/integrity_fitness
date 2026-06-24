"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageHero from "../components/ui/PageHero";
import {
  CalcAnimatedAmount,
  CalcCard,
  CalcCardHeader,
  CalcInputField,
  CalcSectionLabel,
  CalcCTAButton,
  CalcLoadingState,
  CalcIntro,
  CalcInfoModal,
} from "../components/calc";

/* ── Loading facts ──────────────────────────────────────────────────────── */
const LOADING_FACTS = [
  "BMI was invented in the 1830s by a Belgian mathematician, not a doctor.",
  "It was designed to assess populations, not individuals — yet it's used on individuals every day.",
  "Waist-to-Height Ratio predicts cardiovascular risk more accurately than BMI alone.",
  "A rugby prop weighing 120kg at 6'2\" has a BMI of 33.5 (Obese) — and likely single-digit body fat.",
  "Keeping your waist below half your height is a remarkably simple rule that holds across most populations.",
  "Visceral fat (around the organs) drives metabolic risk far more than subcutaneous fat under the skin.",
  "Waist-to-Hip Ratio reveals fat distribution — apple shape versus pear shape matters for heart disease risk.",
  "BMI doesn't account for age, sex, ethnicity, muscle mass, or where fat is actually stored.",
];

/* ── Storage ────────────────────────────────────────────────────────────── */
const STORAGE_KEY = "bmi-calc-v2";

/* ── Helpers ────────────────────────────────────────────────────────────── */
const fmt1 = (n: number) => n.toFixed(1);
const fmt2 = (n: number) => n.toFixed(2);

/* ── Info modal content ─────────────────────────────────────────────────── */
const INFO_CONTENT: Record<string, { title: string; body: string }> = {
  "bmi-limits": {
    title: "When BMI works — and when it doesn't",
    body: "BMI is a valid population-level screening tool. In large groups it correlates well with health outcomes, and it works reasonably well for most people who don't train seriously.\n\nWhere it breaks down:\n• High muscle mass — rugby players, powerlifters, bodybuilders. Muscle is denser than fat, so a very muscular person can have a BMI in the Overweight or Obese range while carrying very little body fat. Their actual health risk is low.\n• Steroid users and extreme athletes — BMI becomes almost meaningless here.\n• Thin but metabolically unhealthy — a person with a normal BMI but very poor fitness and high central fat may carry significant health risk that BMI completely misses.\n\nThe fix isn't to throw BMI out. It's to use it as a starting point and layer in waist measurements for the full picture.",
  },
  "whtr": {
    title: "Waist-to-Height Ratio (WHtR)",
    body: "Divide your waist circumference by your height, both in the same unit.\n\nRules of thumb:\n• Below 0.40 — Extremely slender\n• 0.40 to 0.49 — Healthy range\n• 0.50 to 0.59 — Increased risk (borderline)\n• 0.60 and above — High risk\n\nThe simple rule: keep your waist to less than half your height.\n\nWhy it's useful: Unlike BMI, WHtR is sensitive to central (abdominal) fat — the type most strongly linked to heart disease, type 2 diabetes, and metabolic syndrome. It catches the 'normal weight obese' individual with a healthy BMI but dangerous central fat, and it correctly flags that a muscular athlete (who has a low waist for their height) is not at risk.",
  },
  "whr": {
    title: "Waist-to-Hip Ratio (WHR)",
    body: "Divide your waist circumference by your hip circumference.\n\nWHO thresholds:\nMen: below 0.90 = low risk, 0.90–0.99 = moderate, 1.00+ = high risk\nWomen: below 0.80 = low risk, 0.80–0.89 = moderate, 0.90+ = high risk\n\nWHR reveals fat distribution rather than total fat. 'Apple-shaped' (carrying fat around the abdomen) is higher risk than 'pear-shaped' (carrying fat around the hips). This matters because visceral fat — stored around the organs — is metabolically far more dangerous than subcutaneous fat at the hips and thighs.",
  },
  "skinny-fat": {
    title: "Normal Weight Obesity",
    body: "This describes someone with a perfectly normal BMI but high central fat and poor metabolic health. BMI will tell them they are fine. They are not.\n\nThe best way to catch this without body fat testing: measure your waist. If your waist-to-height ratio is above 0.50, you may carry more central fat than is healthy — regardless of what the scale says.\n\nResistance training is the most effective intervention. Building lean mass raises your metabolic rate, improves insulin sensitivity, and reshapes your ratio — without necessarily changing your BMI significantly.",
  },
};

/* ── Classifications ────────────────────────────────────────────────────── */
function getBmiMeta(bmi: number) {
  if (bmi < 18.5) return { category: "Underweight", color: "text-blue-500", bg: "bg-blue-50 border-blue-200", dot: "bg-blue-500" };
  if (bmi < 25)   return { category: "Normal weight", color: "text-emerald-600", bg: "bg-emerald-50 border-emerald-200", dot: "bg-emerald-500" };
  if (bmi < 30)   return { category: "Overweight", color: "text-amber-500", bg: "bg-amber-50 border-amber-200", dot: "bg-amber-400" };
  return            { category: "Obese", color: "text-red-500", bg: "bg-red-50 border-red-200", dot: "bg-red-500" };
}

function getWhtrMeta(whtr: number) {
  if (whtr < 0.40) return { label: "Extremely slender", color: "text-blue-500", bg: "bg-blue-50 border-blue-200", pct: 0 };
  if (whtr < 0.50) return { label: "Healthy", color: "text-emerald-600", bg: "bg-emerald-50 border-emerald-200", pct: ((whtr - 0.40) / 0.10) * 25 };
  if (whtr < 0.60) return { label: "Increased risk", color: "text-amber-500", bg: "bg-amber-50 border-amber-200", pct: 25 + ((whtr - 0.50) / 0.10) * 25 };
  return            { label: "High risk", color: "text-red-500", bg: "bg-red-50 border-red-200", pct: 75 + Math.min(25, ((whtr - 0.60) / 0.10) * 25) };
}

function getWhrMeta(whr: number, gender: "male" | "female") {
  if (gender === "male") {
    if (whr < 0.90) return { label: "Low risk", color: "text-emerald-600", bg: "bg-emerald-50 border-emerald-200" };
    if (whr < 1.00) return { label: "Moderate risk", color: "text-amber-500", bg: "bg-amber-50 border-amber-200" };
    return            { label: "High risk", color: "text-red-500", bg: "bg-red-50 border-red-200" };
  }
  if (whr < 0.80) return { label: "Low risk", color: "text-emerald-600", bg: "bg-emerald-50 border-emerald-200" };
  if (whr < 0.90) return { label: "Moderate risk", color: "text-amber-500", bg: "bg-amber-50 border-amber-200" };
  return            { label: "High risk", color: "text-red-500", bg: "bg-red-50 border-red-200" };
}

/* ── Icons ──────────────────────────────────────────────────────────────── */
function BodyIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M12 4a2 2 0 100-4 2 2 0 000 4z" />
      <path d="M19.8 11.4l-3.3-1.6c-.6-.3-1.3-.4-2-.4h-5c-.7 0-1.4.1-2 .4l-3.3 1.6a2 2 0 00-1.1 2.5l1.6 4.9a2 2 0 002.5 1.1l1.8-.6v5.8c0 1.1.9 2 2 2h2c1.1 0 2-.9 2-2v-5.8l1.8.6a2 2 0 002.5-1.1l1.6-4.9a2 2 0 00-1.1-2.5z" />
    </svg>
  );
}

/* ── Page ───────────────────────────────────────────────────────────────── */
export default function NuancedBMICalculator() {
  const [gender, setGender] = useState<"male" | "female">("male");
  const [height, setHeight] = useState(180);
  const [weight, setWeight] = useState(80);
  const [waist, setWaist] = useState(0);
  const [hip, setHip] = useState(0);

  const [calcState, setCalcState] = useState<"idle" | "loading" | "done">("idle");
  const [currentFact, setCurrentFact] = useState("");
  const [openInfo, setOpenInfo] = useState<string | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const s = JSON.parse(raw);
        if (s.gender)              setGender(s.gender);
        if (s.height !== undefined) setHeight(s.height);
        if (s.weight !== undefined) setWeight(s.weight);
        if (s.waist  !== undefined) setWaist(s.waist);
        if (s.hip    !== undefined) setHip(s.hip);
      }
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ gender, height, weight, waist, hip }));
    } catch {}
  }, [gender, height, weight, waist, hip]);

  /* ── Calculations ─────────────────────────────────────────────────────── */
  const heightM = height / 100;
  const bmi = weight / (heightM * heightM);
  const whtr = waist > 0 ? waist / height : 0;
  const whr  = waist > 0 && hip > 0 ? waist / hip : 0;

  const bmiMeta  = getBmiMeta(bmi);
  const whtrMeta = whtr > 0 ? getWhtrMeta(whtr) : null;
  const whrMeta  = whr > 0  ? getWhrMeta(whr, gender) : null;

  function handleCalculate() {
    setCurrentFact(LOADING_FACTS[Math.floor(Math.random() * LOADING_FACTS.length)]);
    setCalcState("loading");
    setTimeout(() => {
      setCalcState("done");
      setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
    }, 2800);
  }

  return (
    <>
      <PageHero
        image="https://pub-6e6bb53af6c34756a861d2c0a8259e84.r2.dev/WhatsApp%20Image%202026-06-19%20at%2016.27.36.jpeg"
        label="Contextual Calculator"
        title="BMI & Body Proportion Analysis"
        subtitle="Know your number. Understand what it does and doesn't mean."
        overlayStrength="heavy"
        size="sm"
      />

      <section className="py-16 lg:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
          <CalcIntro
            eyebrow="Body Composition Science · BMI in Context"
            heading={<>Your BMI.<br />The full picture.</>}
            body="BMI is a validated population tool — it has genuine clinical value and works well for most people. Where it struggles is distinguishing fat from muscle, and it can't tell you where fat is stored. This calculator adds waist-based measurements so you can see the full picture and know when to trust your number."
            tags={["BMI validated", "Waist-to-Height Ratio", "Waist-to-Hip Ratio", "Central fat detection"]}
          />

          {/* ── Input card ─────────────────────────────────────────────── */}
          <CalcCard>
            <CalcCardHeader
              eyebrow="Your measurements"
              title="Enter your stats"
              subtitle="Height and weight are required. Waist and hip add precision — all you need is a tape measure."
              showLogo
            />
            <div className="px-8 py-6 grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-zinc-200">

              {/* Col 1: BMI basics */}
              <div className="pb-6 lg:pb-0 lg:pr-8">
                <CalcSectionLabel
                  title="Required"
                  hint="Used to calculate your BMI."
                />
                <div className="space-y-4">
                  <div>
                    <span className="block text-sm font-medium text-zinc-600 mb-1.5">Gender</span>
                    <div className="flex rounded-lg border border-zinc-200 overflow-hidden text-sm font-bold w-full">
                      <button
                        type="button"
                        onClick={() => setGender("male")}
                        className={`flex-1 py-2 transition-colors ${gender === "male" ? "bg-[#CE1A19] text-white" : "text-zinc-500 hover:text-zinc-700 bg-white"}`}
                      >
                        Male
                      </button>
                      <button
                        type="button"
                        onClick={() => setGender("female")}
                        className={`flex-1 py-2 transition-colors border-l border-zinc-200 ${gender === "female" ? "bg-[#CE1A19] text-white" : "text-zinc-500 hover:text-zinc-700 bg-white"}`}
                      >
                        Female
                      </button>
                    </div>
                  </div>
                  <CalcInputField
                    label="Height (cm)"
                    value={height}
                    onChange={setHeight}
                    min={120}
                    max={250}
                  />
                  <CalcInputField
                    label="Weight (kg)"
                    value={weight}
                    onChange={setWeight}
                    min={30}
                    max={250}
                    step={0.5}
                  />
                </div>
              </div>

              {/* Col 2: Waist-based metrics */}
              <div className="pt-6 lg:pt-0 lg:pl-8">
                <CalcSectionLabel
                  title="Optional — but better"
                  hint="A tape measure gives you far more useful data than body fat guesswork."
                  optional
                  infoId="whtr"
                  onInfo={setOpenInfo}
                />
                <div className="space-y-4">
                  <CalcInputField
                    label="Waist circumference (cm)"
                    hint="Measure at the narrowest point, roughly at the navel. Enables Waist-to-Height Ratio."
                    value={waist}
                    onChange={setWaist}
                    min={0}
                    max={200}
                    step={0.5}
                  />
                  <CalcInputField
                    label="Hip circumference (cm)"
                    hint="Measure at the widest point of your hips. Enables Waist-to-Hip Ratio."
                    value={hip}
                    onChange={setHip}
                    min={0}
                    max={200}
                    step={0.5}
                  />
                  <div className="p-4 rounded-xl border border-zinc-100 bg-zinc-50">
                    <p className="text-xs font-bold text-zinc-700 mb-1">Why waist measurements?</p>
                    <p className="text-xs text-zinc-500 leading-relaxed">
                      Body fat % is hard to measure accurately at home. Waist circumference is not — it takes 30 seconds and a tape measure. Research consistently shows waist-based ratios predict metabolic and cardiovascular risk better than BMI alone.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-8 py-6 border-t border-zinc-200">
              <CalcCTAButton
                calcState={calcState}
                onClick={handleCalculate}
                idleLabel="Analyse"
                className="w-full sm:w-auto"
              />
            </div>
          </CalcCard>

          {/* ── Results ─────────────────────────────────────────────────── */}
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

                  {calcState === "done" && (
                    <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>

                      {/* Dark hero strip — BMI */}
                      <div className="relative bg-zinc-950 px-8 sm:px-10 py-10 overflow-hidden">
                        <div className="absolute inset-0 texture-dots-dark" aria-hidden="true" />
                        <motion.div
                          className="relative z-10 flex items-start justify-between gap-4 mb-8"
                          initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}
                        >
                          <div className="liquid-glass rounded-xl px-4 py-3 flex items-center gap-3.5">
                            <BodyIcon className="w-8 h-8 text-white flex-shrink-0" />
                            <div>
                              <p className="text-xs font-bold tracking-widest uppercase text-white/55 leading-none mb-1">Standard Calculation</p>
                              <p className="text-xs font-semibold text-white leading-none">Body Mass Index</p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => setCalcState("idle")}
                            className="text-xs font-bold uppercase tracking-widest text-white/40 hover:text-white transition-colors pt-1"
                          >
                            Reset
                          </button>
                        </motion.div>

                        <motion.div
                          className="relative z-10"
                          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
                        >
                          <p className="text-xs font-bold tracking-widest uppercase text-[#CE1A19] mb-2">Your BMI</p>
                          <p className="text-5xl sm:text-6xl font-black text-white tracking-tight leading-none tabular-nums">
                            <CalcAnimatedAmount value={bmi} format={fmt1} />
                            <span className="text-[#CE1A19]">.</span>
                          </p>
                          <motion.div className="flex items-center gap-3 mt-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}>
                            <span className={`text-sm font-bold ${bmiMeta.color}`}>{bmiMeta.category}</span>
                            <span className="text-white/30">·</span>
                            <span className="text-sm text-white/50">{weight} kg / {heightM.toFixed(2)} m</span>
                          </motion.div>
                        </motion.div>
                      </div>

                      {/* Light section */}
                      <div className="bg-white px-8 sm:px-10 py-8 space-y-8">

                        {/* BMI context — nuance */}
                        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                          <div className="flex items-center gap-2 mb-3">
                            <p className="text-xs font-bold tracking-widest uppercase text-zinc-500">What this means</p>
                            <button
                              type="button"
                              onClick={() => setOpenInfo("bmi-limits")}
                              className="flex items-center justify-center w-5 h-5 rounded-full bg-zinc-100 text-zinc-500 hover:bg-zinc-200 transition-colors flex-shrink-0"
                              aria-label="About BMI limitations"
                            >
                              <span className="font-serif font-bold text-xs">i</span>
                            </button>
                          </div>
                          <div className={`p-5 rounded-xl border ${bmiMeta.bg}`}>
                            <div className="flex items-start gap-3">
                              <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 mt-1 ${bmiMeta.dot}`} />
                              <div>
                                <p className={`text-sm font-bold ${bmiMeta.color} mb-1`}>BMI {fmt1(bmi)} — {bmiMeta.category}</p>
                                <p className="text-sm text-zinc-700 leading-relaxed">
                                  {bmi < 18.5 && "A BMI under 18.5 typically indicates insufficient body mass. This is worth discussing with a GP, particularly if unintentional."}
                                  {bmi >= 18.5 && bmi < 25 && "Your BMI falls in the healthy range. For most people this is a good sign — though BMI alone cannot confirm metabolic health. Waist measurements add more certainty."}
                                  {bmi >= 25 && bmi < 30 && "BMI 25–30 is classified as Overweight. For many people this is a meaningful signal, but if you carry significant muscle — through sport, lifting, or a physically demanding job — your actual fat-to-muscle ratio may be well within a healthy range."}
                                  {bmi >= 30 && "A BMI above 30 is classified as Obese. This is a serious health flag for most people. However, professional athletes, bodybuilders, and rugby players can reach these numbers through muscle mass rather than fat. Waist measurements help clarify the picture significantly."}
                                </p>
                                {(bmi >= 25) && (
                                  <p className="text-sm text-zinc-500 mt-2 leading-relaxed italic">
                                    If you train seriously, play a contact sport, or have significant muscle, do not take this classification at face value without considering your waist measurement.
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        </motion.div>

                        {/* WHtR result */}
                        {whtrMeta && (
                          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                            <div className="flex items-center gap-2 mb-3">
                              <p className="text-xs font-bold tracking-widest uppercase text-zinc-500">Waist-to-Height Ratio</p>
                              <button
                                type="button"
                                onClick={() => setOpenInfo("whtr")}
                                className="flex items-center justify-center w-5 h-5 rounded-full bg-zinc-100 text-zinc-500 hover:bg-zinc-200 transition-colors flex-shrink-0"
                                aria-label="About WHtR"
                              >
                                <span className="font-serif font-bold text-xs">i</span>
                              </button>
                            </div>
                            <div className={`p-5 rounded-xl border ${whtrMeta.bg}`}>
                              <div className="flex items-start justify-between gap-4 mb-3">
                                <div>
                                  <p className={`text-xs font-bold tracking-widest uppercase ${whtrMeta.color} mb-1`}>{whtrMeta.label}</p>
                                  <p className={`text-3xl font-black tabular-nums ${whtrMeta.color}`}>
                                    {fmt2(whtr)}
                                    <span className="text-sm font-semibold opacity-60 ml-1">ratio</span>
                                  </p>
                                </div>
                                <div className="text-right flex-shrink-0">
                                  <p className="text-xs text-zinc-500 mb-0.5">Target</p>
                                  <p className="text-sm font-black text-zinc-700">Below 0.50</p>
                                  <p className="text-xs text-zinc-400">waist &lt; ½ height</p>
                                </div>
                              </div>
                              {/* Scale bar */}
                              <div className="relative h-3 w-full rounded-full overflow-hidden flex mt-3">
                                <div className="flex-[1_1_10%] bg-blue-200" title="Slender" />
                                <div className="flex-[1_1_25%] bg-emerald-300" title="Healthy" />
                                <div className="flex-[1_1_25%] bg-amber-300" title="Increased risk" />
                                <div className="flex-1 bg-red-400" title="High risk" />
                                <div
                                  className="absolute top-0 bottom-0 w-0.5 bg-zinc-950 shadow-[0_0_6px_rgba(0,0,0,0.4)] transition-all duration-700"
                                  style={{ left: `${Math.min(97, Math.max(2, ((whtr - 0.30) / (0.70 - 0.30)) * 100))}%` }}
                                />
                              </div>
                              <div className="flex justify-between mt-1 text-[10px] font-bold tracking-widest uppercase text-zinc-400">
                                <span>Slender</span>
                                <span>Healthy</span>
                                <span>Borderline</span>
                                <span>High risk</span>
                              </div>
                              <p className="text-xs text-zinc-600 mt-3 leading-relaxed">
                                Your waist ({waist} cm) is {fmt1((whtr * 100))}% of your height ({height} cm).{" "}
                                {whtr < 0.5
                                  ? "You are within the healthy boundary — waist below half your height."
                                  : `To reach the healthy boundary (0.50), your waist would need to be ${Math.round(height * 0.5)} cm or below.`}
                              </p>
                            </div>
                          </motion.div>
                        )}

                        {/* WHR result */}
                        {whrMeta && (
                          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                            <div className="flex items-center gap-2 mb-3">
                              <p className="text-xs font-bold tracking-widest uppercase text-zinc-500">Waist-to-Hip Ratio</p>
                              <button
                                type="button"
                                onClick={() => setOpenInfo("whr")}
                                className="flex items-center justify-center w-5 h-5 rounded-full bg-zinc-100 text-zinc-500 hover:bg-zinc-200 transition-colors flex-shrink-0"
                                aria-label="About WHR"
                              >
                                <span className="font-serif font-bold text-xs">i</span>
                              </button>
                            </div>
                            <div className={`p-5 rounded-xl border ${whrMeta.bg}`}>
                              <div className="flex items-start justify-between gap-4">
                                <div>
                                  <p className={`text-xs font-bold tracking-widest uppercase ${whrMeta.color} mb-1`}>{whrMeta.label}</p>
                                  <p className={`text-3xl font-black tabular-nums ${whrMeta.color}`}>
                                    {fmt2(whr)}
                                    <span className="text-sm font-semibold opacity-60 ml-1">ratio</span>
                                  </p>
                                </div>
                                <div className="text-right flex-shrink-0">
                                  <p className="text-xs text-zinc-500 mb-0.5">WHO threshold</p>
                                  <p className="text-sm font-black text-zinc-700">
                                    {gender === "male" ? "Below 0.90" : "Below 0.80"}
                                  </p>
                                  <p className="text-xs text-zinc-400">low risk</p>
                                </div>
                              </div>
                              <p className="text-xs text-zinc-600 mt-3 leading-relaxed">
                                {whrMeta.label === "Low risk"
                                  ? "Your fat distribution is in the lower-risk (pear-shaped) pattern. Central fat is not the primary concern based on this metric."
                                  : "Your fat distribution suggests an apple-shaped pattern — more fat around the abdomen than hips. This is a stronger predictor of cardiovascular and metabolic risk than BMI alone."}
                              </p>
                            </div>
                          </motion.div>
                        )}

                        {/* No optional measurements */}
                        {!whtrMeta && !whrMeta && (
                          <motion.div
                            className="p-5 rounded-xl border border-zinc-200 bg-zinc-50"
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}
                          >
                            <p className="text-sm font-bold text-zinc-700 mb-1">Get a more complete picture</p>
                            <p className="text-sm text-zinc-500 leading-relaxed">
                              Reset and add your waist measurement — it takes 30 seconds with a tape measure and will tell you far more than BMI alone. If you also add your hip measurement, you get your fat distribution pattern too.
                            </p>
                          </motion.div>
                        )}

                        {/* Tool comparison / nuance section */}
                        <motion.div
                          className="pt-6 border-t border-zinc-100"
                          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                        >
                          <p className="text-xs font-bold tracking-widest uppercase text-zinc-500 mb-4">Using these tools in conjunction</p>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200">
                              <p className="text-xs font-black uppercase tracking-wider text-zinc-700 mb-2">BMI alone</p>
                              <p className="text-xs text-zinc-500 leading-relaxed">Useful for most sedentary adults. Misleading for anyone with high muscle mass — athletes, rugby players, heavy lifters, and people using performance-enhancing drugs.</p>
                            </div>
                            <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200">
                              <p className="text-xs font-black uppercase tracking-wider text-zinc-700 mb-2">BMI + WHtR</p>
                              <p className="text-xs text-zinc-500 leading-relaxed">A much stronger picture. Catches both the muscular person with a falsely high BMI (their WHtR will be low) and the thin person with dangerous central fat (their WHtR will be high despite a healthy BMI).</p>
                            </div>
                            <div className="p-4 rounded-xl bg-[#CE1A19]/5 border border-[#CE1A19]/15">
                              <p className="text-xs font-black uppercase tracking-wider text-[#CE1A19] mb-2">All three together</p>
                              <p className="text-xs text-zinc-500 leading-relaxed">The fullest picture. WHR adds fat distribution — knowing whether you are apple or pear shaped is one of the strongest independent predictors of cardiovascular disease risk.</p>
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {openInfo && (
        <CalcInfoModal
          id={openInfo}
          content={INFO_CONTENT}
          onClose={() => setOpenInfo(null)}
        />
      )}
    </>
  );
}
