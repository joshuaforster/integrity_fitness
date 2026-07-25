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
import { useDebouncedValue } from "../hooks/useDebouncedValue";

// Shape returned by POST /api/tdee — BMR, activity multiplier, goal
// adjustment and macro split are all computed server-side, not here.
interface TdeeResult {
  bmr: number;
  tdee: number;
  activityMult: number;
  targetCals: number;
  calDiff: number;
  proteinGrams: number;
  fatGrams: number;
  proteinCals: number;
  fatCals: number;
  carbCals: number;
  carbGrams: number;
  proteinPct: number;
  fatPct: number;
  carbPct: number;
}

/* ── Loading facts ──────────────────────────────────────────────────────── */
const LOADING_FACTS = [
  "Mifflin-St Jeor is currently considered the most accurate formula for the general population.",
  "Harris-Benedict was created in 1919 and tends to overestimate calories, especially for overweight individuals.",
  "Katch-McArdle is the most accurate if you know your true body fat percentage, as muscle burns more calories than fat.",
  "Your BMR accounts for about 60-75% of your total daily energy expenditure. Just existing burns the most calories.",
  "NEAT (Non-Exercise Activity Thermogenesis) like fidgeting and walking can account for 15-30% of your TDEE.",
  "TEF (Thermic Effect of Food) means digesting protein burns significantly more calories than digesting fats or carbs.",
  "A 500-calorie daily deficit theoretically leads to 1lb of fat loss per week, though metabolic adaptation can alter this.",
  "If your activity level varies wildly day-to-day, looking at weekly average calories is more accurate.",
];

/* ── Storage ────────────────────────────────────────────────────────────── */
const STORAGE_KEY = "tdee-calc-v1";



/* ── Constants & Helpers ────────────────────────────────────────────────── */
const formatCals = (amount: number) =>
  new Intl.NumberFormat("en-GB", {
    maximumFractionDigits: 0,
  }).format(amount);

const ACTIVITY_LEVELS = [
  { value: 1.2, label: "Sedentary", desc: "Desk job, little to no exercise" },
  { value: 1.375, label: "Light", desc: "Light exercise 1-3 days/wk" },
  { value: 1.55, label: "Moderate", desc: "Moderate exercise 3-5 days/wk" },
  { value: 1.725, label: "Active", desc: "Heavy exercise 6-7 days/wk" },
  { value: 1.9, label: "Very Active", desc: "Physical job + intense training" },
];

/* ── Icons ──────────────────────────────────────────────────────────────── */
function FlameIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 11-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 002.5 2.5z" />
    </svg>
  );
}

/* ── Goal presets ───────────────────────────────────────────────────────── */
const GOAL_PRESETS = [
  { label: "Aggressive Cut", pct: -25, short: "−25%" },
  { label: "Moderate Cut",   pct: -15, short: "−15%" },
  { label: "Maintain",       pct:   0, short: "0%"   },
  { label: "Lean Bulk",      pct:  10, short: "+10%" },
  { label: "Aggressive Bulk",pct:  20, short: "+20%" },
];

/* ── Info modal content ─────────────────────────────────────────────────── */
const INFO_CONTENT: Record<string, { title: string; body: string }> = {
  activity: {
    title: "Activity Multipliers",
    body: "Your BMR is the energy your body uses just to stay alive in a coma. To find your Total Daily Energy Expenditure (TDEE), we multiply BMR by an activity factor:\n\n• Sedentary (1.2): Desk job, little to no exercise.\n• Light (1.375): Light exercise 1-3 days/wk.\n• Moderate (1.55): Moderate exercise 3-5 days/wk.\n• Active (1.725): Heavy exercise 6-7 days/wk.\n• Very Active (1.9): Physical job + intense training.\n\nMost people overestimate their activity level. If in doubt, round down.",
  },
  formulas: {
    title: "Metabolic Formulas",
    body: "Mifflin-St Jeor: Created in 1990. Considered the gold standard for the modern general population. Relies on total body weight.\n\nHarris-Benedict: Created in 1919. It tends to overestimate calorie needs by ~5%, particularly in overweight individuals.\n\nKatch-McArdle: The most accurate formula overall, but ONLY if you know your true body fat percentage. It calculates BMR based purely on lean body mass, acknowledging that muscle burns more energy at rest than fat.",
  },
};


/* ── Result row ─────────────────────────────────────────────────────────── */
function ResultRow({
  label,
  value,
  unit = "kcal",
  bold,
  last,
  index,
}: {
  label: string;
  value: number;
  unit?: string;
  bold?: boolean;
  last?: boolean;
  index: number;
}) {
  return (
    <motion.div
      className={`flex justify-between py-2.5 text-sm ${last ? "" : "border-b border-zinc-100"} ${bold ? "font-semibold text-zinc-950" : "text-zinc-500"}`}
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.3,
        delay: 0.15 + index * 0.06,
        ease: "easeOut",
      }}
    >
      <span>{label}</span>
      <span>
        {formatCals(value)}{" "}
        <span className="text-zinc-400 font-normal text-xs">{unit}</span>
      </span>
    </motion.div>
  );
}

/* ── Page ───────────────────────────────────────────────────────────────── */
export default function TDEECalculator() {
  // Safe hydration defaults
  const [gender, setGender] = useState<"male" | "female">("male");
  const [age, setAge] = useState(30);
  const [weight, setWeight] = useState(80);
  const [height, setHeight] = useState(180);
  const [bodyFat, setBodyFat] = useState(15);
  const [activityIndex, setActivityIndex] = useState(1);
  const [formula, setFormula] = useState<"mifflin" | "harris" | "katch">(
    "mifflin",
  );

  // Goals — percentage relative to TDEE so they scale with body size
  const [goalPct, setGoalPct] = useState(0);
  const [proteinKg, setProteinKg] = useState(2.0);
  const [fatKg, setFatKg] = useState(1.0);

  const [calcState, setCalcState] = useState<"idle" | "loading" | "done">(
    "idle",
  );

  // Start with a result matching the default inputs above (gender: male,
  // age: 30, weight: 80kg, height: 180cm, activityIndex: 1, formula:
  // mifflin, goalPct: 0, proteinKg: 2.0, fatKg: 1.0) so the page has
  // something correct to render before the first API response arrives.
  const [result, setResult] = useState<TdeeResult>({
    bmr: 1780,
    tdee: 2447.5,
    activityMult: 1.375,
    targetCals: 2448,
    calDiff: 0,
    proteinGrams: 160,
    fatGrams: 80,
    proteinCals: 640,
    fatCals: 720,
    carbCals: 1088,
    carbGrams: 272,
    proteinPct: 26,
    fatPct: 29,
    carbPct: 45,
  });
  const [currentFact, setCurrentFact] = useState("");
  const [openInfo, setOpenInfo] = useState<string | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  /* ── Hydrate from localStorage ────────────────────────────────────────── */
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw);
        if (saved.gender) setGender(saved.gender);
        if (saved.age !== undefined) setAge(saved.age);
        if (saved.weight !== undefined) setWeight(saved.weight);
        if (saved.height !== undefined) setHeight(saved.height);
        if (saved.bodyFat !== undefined) setBodyFat(saved.bodyFat);
        if (saved.activityIndex !== undefined)
          setActivityIndex(saved.activityIndex);
        if (saved.formula) setFormula(saved.formula);
        if (saved.proteinKg !== undefined) setProteinKg(saved.proteinKg);
        if (saved.fatKg !== undefined) setFatKg(saved.fatKg);
        if (saved.goalPct !== undefined) setGoalPct(saved.goalPct);
      }
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          gender,
          age,
          weight,
          height,
          bodyFat,
          activityIndex,
          formula,
          proteinKg,
          fatKg,
          goalPct,
        }),
      );
    } catch {}
  }, [
    gender,
    age,
    weight,
    height,
    bodyFat,
    activityIndex,
    formula,
    proteinKg,
    fatKg,
    goalPct,
  ]);

  /* ── Core Calculations (server-side) ─────────────────────────────────── */
  // Wait until the user has stopped adjusting inputs for 300ms before
  // hitting the API — stops us firing a request on every single keystroke
  // or slider tick.
  const debouncedInputs = useDebouncedValue(
    {
      gender,
      age,
      weight,
      height,
      bodyFat,
      activityIndex,
      formula,
      goalPct,
      proteinKg,
      fatKg,
    },
    300,
  );

  useEffect(() => {
    // Guards against a slow, stale response overwriting a newer one if the
    // user changes the inputs again before it comes back.
    let cancelled = false;

    fetch("/api/tdee", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(debouncedInputs),
    })
      .then((res) => res.json())
      .then((data: TdeeResult) => {
        if (!cancelled) setResult(data);
      });

    return () => {
      cancelled = true;
    };
  }, [debouncedInputs]);

  const {
    bmr,
    tdee,
    activityMult,
    targetCals,
    calDiff,
    proteinGrams,
    fatGrams,
    proteinCals,
    fatCals,
    carbCals,
    carbGrams,
    proteinPct,
    fatPct,
    carbPct,
  } = result;

  function handleCalculate() {
    setCurrentFact(
      LOADING_FACTS[Math.floor(Math.random() * LOADING_FACTS.length)],
    );
    setCalcState("loading");
    setTimeout(() => {
      setCalcState("done");
      setTimeout(
        () =>
          resultsRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          }),
        80,
      );
    }, 2800);
  }

  return (
    <>
      <PageHero
        image="https://pub-6e6bb53af6c34756a861d2c0a8259e84.r2.dev/WhatsApp%20Image%202026-06-19%20at%2016.27.36.jpeg"
        label="Metabolic Calculator"
        title="TDEE & Macro Calculator"
        subtitle="Find your baseline. Optimise your macros. Hit your goals."
        overlayStrength="heavy"
        size="sm"
      />

      <section className="py-16 lg:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
          <CalcIntro
            eyebrow="Metabolic Science · Energy Balance"
            heading={<>How much energy<br />do you actually need?</>}
            body="Your Total Daily Energy Expenditure (TDEE) is the total calories you burn per day. It's the foundation of every successful physical transformation — whether you're cutting, bulking, or maintaining. Calculate your baseline, then structure your macros to match your goal."
            tags={["Mifflin-St Jeor", "Harris-Benedict", "Katch-McArdle", "Macro planner"]}
          />

          {/* ── Input card ─────────────────────────────────────────────── */}
          <CalcCard>
            <CalcCardHeader
              eyebrow="Your details"
              title="Biometrics & Activity"
              subtitle="The more accurate your inputs, the closer the calculation will be to your true metabolic rate."
              showLogo
            />

            <div className="px-8 py-6 grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-zinc-200">
              {/* Col 1: Biometrics */}
              <div className="pb-6 lg:pb-0 lg:pr-8">
                <CalcSectionLabel
                  title="Core Biometrics"
                  hint="Your physical measurements."
                />
                <div className="space-y-4">
                  <div>
                    <span className="block text-sm font-medium text-zinc-600 mb-1.5">
                      Gender
                    </span>
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
                    label="Age (years)"
                    value={age}
                    onChange={setAge}
                    min={15}
                    max={100}
                  />
                  <CalcInputField
                    label="Weight (kg)"
                    value={weight}
                    onChange={setWeight}
                    min={30}
                    max={250}
                    step={0.5}
                  />
                  <CalcInputField
                    label="Height (cm)"
                    value={height}
                    onChange={setHeight}
                    min={120}
                    max={250}
                  />
                </div>
              </div>

              {/* Col 2: Activity & Comp */}
              <div className="py-6 lg:py-0 lg:px-8">
                <CalcSectionLabel
                  title="Activity & Composition"
                  hint="Movement and lean tissue."
                  infoId="activity"
                  onInfo={setOpenInfo}
                />
                <div className="space-y-6">
                  <CalcInputField
                    label="Activity Level"
                    hint={
                      ACTIVITY_LEVELS[activityIndex].label +
                      ": " +
                      ACTIVITY_LEVELS[activityIndex].desc
                    }
                    value={activityIndex}
                    onChange={setActivityIndex}
                    min={0}
                    max={4}
                    step={1}
                  />
                  <div className={formula !== "katch" ? "opacity-40 pointer-events-none select-none" : ""}>
                    <CalcInputField
                      label="Estimated Body Fat (%)"
                      hint={formula === "katch" ? "Required for Katch-McArdle accuracy." : "Only used with Katch-McArdle — select that formula to enable."}
                      value={bodyFat}
                      onChange={setBodyFat}
                      min={5}
                      max={60}
                      step={1}
                    />
                  </div>
                </div>
              </div>

              {/* Col 3: Formulas */}
              <div className="pt-6 lg:pt-0 lg:pl-8">
                <CalcSectionLabel
                  title="Formula Preference"
                  hint="Choose your metabolic model."
                  infoId="formulas"
                  onInfo={setOpenInfo}
                />
                <div className="flex flex-col gap-2.5">
                  <button
                    type="button"
                    onClick={() => setFormula("mifflin")}
                    className={`p-3 rounded-lg border text-left transition-colors ${formula === "mifflin" ? "border-[#CE1A19] bg-[#CE1A19]/5" : "border-zinc-200 bg-white hover:border-zinc-300"}`}
                  >
                    <p className="text-sm font-bold text-zinc-950">
                      Mifflin-St Jeor
                    </p>
                    <p className="text-xs text-zinc-500 mt-0.5">
                      Most accurate for general population
                    </p>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormula("harris")}
                    className={`p-3 rounded-lg border text-left transition-colors ${formula === "harris" ? "border-[#CE1A19] bg-[#CE1A19]/5" : "border-zinc-200 bg-white hover:border-zinc-300"}`}
                  >
                    <p className="text-sm font-bold text-zinc-950">
                      Harris-Benedict
                    </p>
                    <p className="text-xs text-zinc-500 mt-0.5">
                      Original 1919 formula (Revised)
                    </p>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormula("katch")}
                    className={`p-3 rounded-lg border text-left transition-colors ${formula === "katch" ? "border-[#CE1A19] bg-[#CE1A19]/5" : "border-zinc-200 bg-white hover:border-zinc-300"}`}
                  >
                    <p className="text-sm font-bold text-zinc-950">
                      Katch-McArdle
                    </p>
                    <p className="text-xs text-zinc-500 mt-0.5">
                      Best if you know true Body Fat %
                    </p>
                  </button>
                </div>
              </div>
            </div>

            {/* ── CTA ── */}
            <div className="px-8 py-6 border-t border-zinc-200 flex flex-col sm:flex-row items-center gap-4">
              <CalcCTAButton
                calcState={calcState}
                onClick={handleCalculate}
                idleLabel="Calculate Baseline"
                loadingLabel="Calculating…"
                className="w-full sm:w-auto"
              />
              <p className="text-xs text-zinc-500">
                Calculations based on verified physiological models. Results are
                scientific estimates.
              </p>
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
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <CalcLoadingState fact={currentFact} />
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
                      <div className="relative bg-zinc-950 px-8 sm:px-10 py-10 overflow-hidden">
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
                            <FlameIcon className="w-8 h-8 text-white flex-shrink-0" />
                            <div>
                              <p className="text-xs font-bold tracking-widest uppercase text-white/55 leading-none mb-1">
                                Energy Balance Model
                              </p>
                              <p className="text-xs font-semibold text-white leading-none">
                                Maintenance Calories (TDEE)
                              </p>
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
                          initial={{ opacity: 0, y: 16 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: 0.5,
                            delay: 0.1,
                            ease: "easeOut",
                          }}
                        >
                          <p className="text-xs font-bold tracking-widest uppercase text-[#CE1A19] mb-2">
                            Total Daily Energy Expenditure
                          </p>
                          <p className="text-5xl sm:text-6xl font-black text-white tracking-tight leading-none tabular-nums">
                            <CalcAnimatedAmount value={tdee} format={formatCals} />
                            <span className="text-[#CE1A19]">.</span>
                          </p>
                          <motion.div
                            className="flex items-center gap-4 mt-3"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.35 }}
                          >
                            <span className="text-sm font-medium text-white/50 tabular-nums">
                              {formatCals(bmr)}&nbsp;
                              <span className="text-white/25">BMR</span>
                            </span>
                            <span className="text-white/20">|</span>
                            <span className="text-sm font-medium text-white/50 tabular-nums">
                              {formatCals(tdee - bmr)}&nbsp;
                              <span className="text-white/25">Activity</span>
                            </span>
                          </motion.div>
                        </motion.div>
                      </div>

                      {/* Light breakdown */}
                      <div className="bg-white px-8 sm:px-10 py-8 space-y-6">

                        {/* BMR vs TDEE explainer cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <motion.div
                            className="rounded-xl border border-zinc-200 bg-zinc-50 p-5"
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                          >
                            <div className="flex items-start justify-between mb-3">
                              <p className="text-xs font-bold tracking-widest uppercase text-zinc-500">
                                Basal Metabolic Rate
                              </p>
                              <span className="text-[10px] font-black tracking-widest uppercase bg-zinc-200 text-zinc-600 rounded px-1.5 py-0.5 flex-shrink-0 ml-2">
                                BMR
                              </span>
                            </div>
                            <p className="text-4xl font-black text-zinc-950 tabular-nums leading-none mb-3">
                              {formatCals(Math.round(bmr))}
                              <span className="text-base font-semibold text-zinc-400 ml-1">kcal</span>
                            </p>
                            <p className="text-sm text-zinc-600 leading-relaxed">
                              What your body burns at complete rest — zero movement, zero food, just keeping organs alive. <strong className="text-zinc-800">You cannot safely eat below this number.</strong>
                            </p>
                          </motion.div>

                          <motion.div
                            className="rounded-xl border border-[#CE1A19]/20 bg-[#CE1A19]/5 p-5"
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                          >
                            <div className="flex items-start justify-between mb-3">
                              <p className="text-xs font-bold tracking-widest uppercase text-[#CE1A19]">
                                Total Daily Expenditure
                              </p>
                              <span className="text-[10px] font-black tracking-widest uppercase bg-[#CE1A19]/15 text-[#CE1A19] rounded px-1.5 py-0.5 flex-shrink-0 ml-2">
                                TDEE
                              </span>
                            </div>
                            <p className="text-4xl font-black text-zinc-950 tabular-nums leading-none mb-3">
                              <CalcAnimatedAmount value={tdee} format={formatCals} />
                              <span className="text-base font-semibold text-zinc-400 ml-1">kcal</span>
                            </p>
                            <p className="text-sm text-zinc-600 leading-relaxed">
                              BMR × {activityMult.toFixed(2)} activity factor. <strong className="text-zinc-800">Eat exactly this and your weight stays the same.</strong> Your goal determines whether you go above or below.
                            </p>
                          </motion.div>
                        </div>

                        {/* How they relate */}
                        <motion.div
                          className="rounded-xl border border-zinc-100 bg-zinc-50 p-5"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.45 }}
                        >
                          <p className="text-xs font-bold tracking-widest uppercase text-zinc-500 mb-3">
                            The relationship
                          </p>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="px-3 py-1.5 rounded-lg bg-zinc-200 text-sm font-black text-zinc-800 tabular-nums">
                              {formatCals(Math.round(bmr))} BMR
                            </span>
                            <span className="text-zinc-400 font-bold">×</span>
                            <span className="px-3 py-1.5 rounded-lg bg-zinc-200 text-sm font-black text-zinc-800">
                              {activityMult.toFixed(2)} activity
                            </span>
                            <span className="text-zinc-400 font-bold">=</span>
                            <span className="px-3 py-1.5 rounded-lg bg-[#CE1A19] text-sm font-black text-white tabular-nums">
                              {formatCals(Math.round(tdee))} TDEE
                            </span>
                            <span className="text-xs text-zinc-500 ml-1">
                              ({((bmr / tdee) * 100).toFixed(0)}% of your TDEE is base metabolism alone)
                            </span>
                          </div>
                        </motion.div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Goal & Macro Section ───────────────────────────────────── */}
          <AnimatePresence>
            {calcState === "done" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, delay: 0.15 }}
                className="rounded-2xl border border-zinc-200 overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.05)]"
              >
                {/* Header */}
                <div className="px-8 pt-7 pb-5 border-b border-zinc-200 bg-zinc-50">
                  <p className="text-xs font-bold tracking-widest uppercase text-[#CE1A19] mb-1">
                    Goal & Macro Protocol
                  </p>
                  <h2 className="text-xl font-black tracking-tight uppercase text-zinc-950">
                    Set your target
                  </h2>
                  <p className="text-sm text-zinc-500 mt-1">
                    All targets are relative to your TDEE — so they scale with your body, not an arbitrary number.
                  </p>
                </div>

                {/* Goal presets + fine-tune */}
                <div className="px-8 py-6 border-b border-zinc-200 bg-zinc-50 space-y-5">

                  {/* Preset buttons */}
                  <div>
                    <p className="text-xs font-bold tracking-widest uppercase text-zinc-500 mb-3">
                      Select a goal
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {GOAL_PRESETS.map((preset) => {
                        const isActive = goalPct === preset.pct;
                        return (
                          <button
                            key={preset.label}
                            type="button"
                            onClick={() => setGoalPct(preset.pct)}
                            className={`px-4 py-2 rounded-lg text-xs font-black uppercase tracking-wider transition-all border
                              ${isActive
                                ? "bg-[#CE1A19] text-white border-[#CE1A19] shadow-[0_2px_8px_rgba(206,26,25,0.35)]"
                                : "bg-white text-zinc-600 border-zinc-200 hover:border-[#CE1A19]/50 hover:text-zinc-900"
                              }`}
                          >
                            {preset.label}
                            <span className={`ml-1.5 font-semibold ${isActive ? "text-white/70" : "text-zinc-400"}`}>
                              {preset.short}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Fine-tune slider */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs font-bold tracking-widest uppercase text-zinc-500">
                        Fine-tune
                      </p>
                      <p className="text-sm font-black text-zinc-950 tabular-nums">
                        {goalPct > 0 ? "+" : ""}{goalPct}%
                      </p>
                    </div>
                    <input
                      type="range"
                      min={-30}
                      max={30}
                      step={1}
                      value={goalPct}
                      onChange={(e) => setGoalPct(Number(e.target.value))}
                      className="w-full h-1.5 rounded-full cursor-pointer appearance-none bg-zinc-200
                        [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5
                        [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#CE1A19]
                        [&::-webkit-slider-thumb]:shadow-[0_1px_6px_rgba(206,26,25,0.5)] [&::-webkit-slider-thumb]:-mt-[6px]"
                    />
                    <div className="flex justify-between mt-1 text-[10px] font-bold tracking-widest uppercase text-zinc-400">
                      <span>−30% cut</span>
                      <span>Maintain</span>
                      <span>+30% bulk</span>
                    </div>
                  </div>

                  {/* Result + context */}
                  <div className={`rounded-xl border p-5 ${calDiff < 0 ? "border-amber-200 bg-amber-50" : calDiff > 0 ? "border-emerald-200 bg-emerald-50" : "border-blue-200 bg-blue-50"}`}>
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div>
                        <p className={`text-xs font-bold tracking-widest uppercase mb-1 ${calDiff < 0 ? "text-amber-600" : calDiff > 0 ? "text-emerald-600" : "text-blue-600"}`}>
                          {calDiff < 0 ? "Calorie Deficit" : calDiff > 0 ? "Calorie Surplus" : "Maintenance"}
                        </p>
                        <p className={`text-4xl font-black tabular-nums leading-none ${calDiff < 0 ? "text-amber-700" : calDiff > 0 ? "text-emerald-700" : "text-blue-700"}`}>
                          {formatCals(targetCals)}
                          <span className="text-base font-semibold opacity-60 ml-1">kcal/day</span>
                        </p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className={`text-2xl font-black tabular-nums ${calDiff < 0 ? "text-amber-700" : calDiff > 0 ? "text-emerald-700" : "text-blue-700"}`}>
                          {goalPct > 0 ? "+" : ""}{goalPct}%
                        </p>
                        <p className={`text-xs font-semibold mt-0.5 ${calDiff < 0 ? "text-amber-600" : calDiff > 0 ? "text-emerald-600" : "text-blue-600"}`}>
                          vs TDEE
                        </p>
                      </div>
                    </div>
                    <p className={`text-sm leading-relaxed ${calDiff < 0 ? "text-amber-700" : calDiff > 0 ? "text-emerald-700" : "text-blue-700"}`}>
                      {calDiff < 0 ? (
                        <>
                          {Math.abs(goalPct)}% below your TDEE of {formatCals(Math.round(tdee))} kcal — that is <strong>{formatCals(Math.abs(calDiff))} kcal/day less</strong>.
                          Estimated fat loss: <strong>~{(Math.abs(calDiff) / 7700 * 7).toFixed(2)} kg/week</strong>.
                        </>
                      ) : calDiff > 0 ? (
                        <>
                          {goalPct}% above your TDEE of {formatCals(Math.round(tdee))} kcal — that is <strong>{formatCals(calDiff)} kcal/day more</strong>.
                          Ideal for progressive muscle gain with controlled fat accumulation.
                        </>
                      ) : (
                        <>
                          Eating at your exact TDEE of <strong>{formatCals(Math.round(tdee))} kcal/day</strong>.
                          Your weight will remain stable.
                        </>
                      )}
                    </p>
                  </div>
                </div>

                {/* Macro inputs */}
                <div className="px-8 py-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-4">
                    <CalcInputField
                      label="Protein (g per kg)"
                      hint="Muscle retention/growth"
                      value={proteinKg}
                      onChange={setProteinKg}
                      min={0.5}
                      max={3.5}
                      step={0.1}
                      warnAbove={2.5}
                      warnMessage="Very high protein. Diminishing returns above 2.2g/kg."
                    />
                    <div className="p-4 rounded-xl border border-zinc-200 bg-white">
                      <p className="text-xs font-bold tracking-widest uppercase text-zinc-500 mb-1">
                        Protein
                      </p>
                      <p className="text-2xl font-black text-zinc-950 tabular-nums">
                        {proteinGrams}{" "}
                        <span className="text-sm font-semibold text-zinc-400">g</span>
                      </p>
                      <p className="text-xs text-zinc-500 mt-1">
                        {proteinCals} cals ({proteinPct}%)
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <CalcInputField
                      label="Fat (g per kg)"
                      hint="Hormone function"
                      value={fatKg}
                      onChange={setFatKg}
                      min={0.3}
                      max={2.0}
                      step={0.1}
                    />
                    <div className="p-4 rounded-xl border border-zinc-200 bg-white">
                      <p className="text-xs font-bold tracking-widest uppercase text-zinc-500 mb-1">
                        Fats
                      </p>
                      <p className="text-2xl font-black text-zinc-950 tabular-nums">
                        {fatGrams}{" "}
                        <span className="text-sm font-semibold text-zinc-400">g</span>
                      </p>
                      <p className="text-xs text-zinc-500 mt-1">
                        {fatCals} cals ({fatPct}%)
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4 flex flex-col justify-end">
                    <div className={`p-4 rounded-xl border ${carbCals < 0 ? "border-red-200 bg-red-50" : "border-[#CE1A19]/20 bg-[#CE1A19]/5"}`}>
                      <p className="text-xs font-bold tracking-widest uppercase text-[#CE1A19] mb-1">
                        Carbs (Remainder)
                      </p>
                      <p className={`text-2xl font-black tabular-nums ${carbCals < 0 ? "text-red-600" : "text-[#CE1A19]"}`}>
                        {carbGrams}{" "}
                        <span className="text-sm font-semibold opacity-60">g</span>
                      </p>
                      <p className={`text-xs mt-1 ${carbCals < 0 ? "text-red-500" : "text-[#CE1A19]/70"}`}>
                        {carbCals < 0
                          ? "Calories exceeded. Lower protein/fat targets."
                          : `${Math.max(0, carbCals)} cals (${carbPct}%)`}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Visual Macro Bar */}
                <div className="px-8 pb-8">
                  <div className="h-4 w-full flex rounded-full overflow-hidden">
                    <div style={{ width: `${proteinPct}%` }} className="bg-zinc-800 transition-all duration-500" title="Protein" />
                    <div style={{ width: `${carbPct}%` }} className="bg-[#CE1A19] transition-all duration-500" title="Carbs" />
                    <div style={{ width: `${fatPct}%` }} className="bg-zinc-300 transition-all duration-500" title="Fats" />
                  </div>
                  <div className="flex justify-between mt-2 text-xs font-bold tracking-widest uppercase text-zinc-400">
                    <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-zinc-800" />Protein</span>
                    <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#CE1A19]" />Carbs</span>
                    <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-zinc-300" />Fats</span>
                  </div>
                </div>
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
