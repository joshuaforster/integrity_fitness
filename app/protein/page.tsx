"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageHero from "../components/ui/PageHero";
import {
  CalcCard,
  CalcCardHeader,
  CalcInputField,
  CalcIntro,
  CalcCTAButton,
} from "../components/calc";

const STORAGE_KEY = "protein-dist-v1";

const INTRO_TAGS = [
  "MPS threshold science",
  "Leucine threshold",
  "Meal timing",
  "Hypertrophy optimisation",
];

export default function ProteinDistCalculator() {
  const [dailyProtein, setDailyProtein] = useState(160);
  const [meals, setMeals] = useState(4);
  const [calcState, setCalcState] = useState<"idle" | "loading" | "done">("idle");
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const saved = JSON.parse(raw);
      setDailyProtein(saved.dailyProtein ?? 160);
      setMeals(saved.meals ?? 4);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ dailyProtein, meals }));
  }, [dailyProtein, meals]);

  const proteinPerMeal = dailyProtein / meals;
  const MPS_THRESHOLD_MIN = 25;
  const MPS_THRESHOLD_MAX = 40;

  function getStatus(g: number) {
    if (g < MPS_THRESHOLD_MIN)
      return {
        label: "Under-dosed",
        color: "bg-blue-500",
        borderColor: "border-blue-200",
        bgColor: "bg-blue-50",
        textColor: "text-blue-700",
        text: "Too little to spike MPS effectively. Your body needs at least 25g of protein per meal to trigger meaningful muscle protein synthesis.",
      };
    if (g > MPS_THRESHOLD_MAX)
      return {
        label: "Excess",
        color: "bg-amber-500",
        borderColor: "border-amber-200",
        bgColor: "bg-amber-50",
        textColor: "text-amber-700",
        text: "More than required for a single MPS spike. The excess cannot be stored as amino acids for later use and will likely be oxidised for energy.",
      };
    return {
      label: "Optimal",
      color: "bg-emerald-500",
      borderColor: "border-emerald-200",
      bgColor: "bg-emerald-50",
      textColor: "text-emerald-700",
      text: "You are hitting the leucine threshold in every feeding window. This is the optimal range for maximising muscle protein synthesis.",
    };
  }

  const status = getStatus(proteinPerMeal);

  function handleCalculate() {
    setCalcState("done");
    setTimeout(
      () =>
        resultsRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        }),
      80,
    );
  }

  return (
    <>
      <PageHero
        image="https://pub-6e6bb53af6c34756a861d2c0a8259e84.r2.dev/WhatsApp%20Image%202026-06-19%20at%2016.27.36.jpeg"
        label="Science Suite"
        title="Protein Distribution Planner"
        subtitle="Are you wasting your protein intake?"
        overlayStrength="heavy"
        size="sm"
      />

      <section className="py-16 lg:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">

          <CalcIntro
            eyebrow="Nutrition Science · Meal Timing"
            heading={<>Is your protein<br />spread working?</>}
            body="Total daily protein matters, but so does how you distribute it. Every meal needs to hit the leucine threshold to trigger muscle protein synthesis (MPS). If your meals are too small or too large, you are leaving gains on the table."
            tags={INTRO_TAGS}
          />

          {/* Input card */}
          <CalcCard>
            <CalcCardHeader
              eyebrow="Your protocol"
              title="Plan your feedings"
              subtitle="Enter your total daily protein and the number of meals you eat."
              showLogo
            />

            <div className="px-8 py-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <CalcInputField
                label="Total Daily Protein (g)"
                hint="Aim for 1.6g to 2.2g per kg of body weight"
                value={dailyProtein}
                onChange={setDailyProtein}
                min={50}
                max={400}
              />
              <CalcInputField
                label="Meals per day"
                hint="Research supports 3 to 5 meals for optimal MPS distribution"
                value={meals}
                onChange={setMeals}
                min={2}
                max={8}
              />
            </div>

            <div className="px-8 py-6 border-t border-zinc-200">
              <CalcCTAButton
                calcState={calcState}
                onClick={handleCalculate}
                idleLabel="Analyse Distribution"
                doneLabel="Recalculate"
                className="w-full sm:w-auto"
              />
            </div>
          </CalcCard>

          {/* Results */}
          <AnimatePresence>
            {calcState === "done" && (
              <motion.div
                ref={resultsRef}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="rounded-2xl border border-zinc-200 border-t-[3px] border-t-[#CE1A19] overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.07)]"
              >
                {/* Dark hero strip */}
                <div className="relative bg-zinc-950 px-8 sm:px-10 py-10 overflow-hidden">
                  <div className="absolute inset-0 texture-dots-dark" aria-hidden="true" />
                  <motion.div
                    className="relative z-10 flex items-start justify-between gap-4 mb-8"
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45 }}
                  >
                    <div className="liquid-glass rounded-xl px-4 py-3">
                      <p className="text-xs font-bold tracking-widest uppercase text-white/55 leading-none mb-1">
                        MPS Analysis
                      </p>
                      <p className="text-sm font-semibold text-white leading-none">
                        Protein Distribution
                      </p>
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
                    transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
                  >
                    <p className="text-xs font-bold tracking-widest uppercase text-[#CE1A19] mb-2">
                      Protein per meal
                    </p>
                    <p className="text-5xl sm:text-6xl font-black text-white tracking-tight leading-none tabular-nums">
                      {proteinPerMeal.toFixed(1)}
                      <span className="text-xl font-bold text-zinc-400 ml-1">g</span>
                      <span className="text-[#CE1A19]">.</span>
                    </p>
                    <motion.div
                      className="flex items-center gap-4 mt-3"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.35 }}
                    >
                      <span className="text-sm font-medium text-white/50">
                        {dailyProtein}g total across {meals} meals
                      </span>
                    </motion.div>
                  </motion.div>
                </div>

                {/* Light breakdown */}
                <div className="bg-white px-8 sm:px-10 py-8">
                  {/* Status */}
                  <motion.div
                    className={`mb-8 p-5 rounded-xl border ${status.borderColor} ${status.bgColor}`}
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${status.color}`} />
                      <p className={`text-sm font-black uppercase tracking-wider ${status.textColor}`}>
                        {status.label}
                      </p>
                    </div>
                    <p className={`text-sm leading-relaxed ${status.textColor}`}>
                      {status.text}
                    </p>
                  </motion.div>

                  {/* MPS scale */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <p className="text-xs font-bold tracking-widest uppercase text-zinc-500 mb-4">
                      MPS Threshold Range
                    </p>
                    <div className="relative h-6 w-full rounded-full bg-zinc-100 overflow-hidden flex">
                      <div className="flex-[1_1_25px] bg-blue-100" title="Under-dosed" />
                      <div className="flex-[1_1_15px] bg-emerald-300" title="Optimal (25g to 40g)" />
                      <div className="flex-1 bg-amber-200" title="Excess" />
                      <div
                        className="absolute top-0 bottom-0 w-1 bg-zinc-950 shadow-[0_0_8px_rgba(0,0,0,0.4)] transition-all duration-700 ease-out"
                        style={{
                          left: `${Math.min(100, Math.max(0, ((proteinPerMeal - 10) / 60) * 100))}%`,
                        }}
                      />
                    </div>
                    <div className="flex justify-between mt-2 text-xs font-bold tracking-widest uppercase text-zinc-500">
                      <span>Under-dosed</span>
                      <span>Optimal (25g to 40g)</span>
                      <span>Excess</span>
                    </div>
                  </motion.div>

                  {/* Education block */}
                  <motion.div
                    className="mt-8 pt-6 border-t border-zinc-100"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.55 }}
                  >
                    <p className="text-xs font-bold tracking-widest uppercase text-[#CE1A19] mb-3">
                      Why distribution matters
                    </p>
                    <p className="text-base text-zinc-600 leading-relaxed">
                      Muscle protein synthesis (MPS) is the primary driver of hypertrophy. The goal is to reach the 25g to 40g leucine threshold in every feeding window. If you eat 160g total but your meals are imbalanced, you are leaving gains on the table. The body cannot store amino acids for later use the way it stores fat.
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </>
  );
}
