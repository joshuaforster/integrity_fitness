"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import PageHero from "../components/ui/PageHero";
import {
  CalcCard,
  CalcCardHeader,
  CalcInputField,
  CalcIntro,
} from "../components/calc";

const calculate1RM = (w: number, r: number) => w * (1 + r / 30);

const PRESCRIBED_INTENSITY = [
  { reps: 1, pct: 1.0 },
  { reps: 2, pct: 0.95 },
  { reps: 3, pct: 0.93 },
  { reps: 5, pct: 0.87 },
  { reps: 8, pct: 0.8 },
  { reps: 10, pct: 0.75 },
  { reps: 12, pct: 0.7 },
];

const STRENGTH_STANDARDS = [
  { label: "Beginner", multiplier: 1.0, color: "bg-zinc-200" },
  { label: "Intermediate", multiplier: 1.5, color: "bg-blue-300" },
  { label: "Advanced", multiplier: 2.0, color: "bg-emerald-400" },
  { label: "Elite", multiplier: 2.5, color: "bg-amber-400" },
];

const INTRO_TAGS = [
  "Epley formula",
  "Relative strength",
  "Intensity prescriptor",
  "Programming targets",
];

export default function Advanced1RMCalculator() {
  const [weight, setWeight] = useState(100);
  const [reps, setReps] = useState(5);
  const [bodyWeight, setBodyWeight] = useState(80);

  const oneRM = calculate1RM(weight, reps);
  const relStrength = oneRM / bodyWeight;

  return (
    <>
      <PageHero
        image="https://pub-6e6bb53af6c34756a861d2c0a8259e84.r2.dev/WhatsApp%20Image%202026-06-19%20at%2016.27.36.jpeg"
        label="Performance Architecture"
        title="1RM Strength Estimator"
        subtitle="Estimate max capacity and generate intensity-based programming targets."
        overlayStrength="heavy"
        size="sm"
      />

      <section className="py-16 lg:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">

          <CalcIntro
            eyebrow="Performance Architecture · Strength Science"
            heading={<>Know your max.<br />Programme with precision.</>}
            body="The Epley formula uses a submaximal effort to estimate your one-rep max without the injury risk of true maximal testing. Enter the weight you lifted and the reps completed — the calculator generates a full percentage-based intensity table for your programming."
            tags={INTRO_TAGS}
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Input Column */}
            <div className="lg:col-span-1">
              <CalcCard>
                <CalcCardHeader
                  eyebrow="Input data"
                  title="Your lift"
                  showLogo
                />
                <div className="px-6 py-5 space-y-5">
                  <CalcInputField
                    label="Weight lifted (kg)"
                    value={weight}
                    onChange={setWeight}
                    min={20}
                    max={500}
                  />
                  <CalcInputField
                    label="Repetitions completed"
                    hint="Most accurate between 1 and 10 reps"
                    value={reps}
                    onChange={setReps}
                    min={1}
                    max={30}
                  />
                  <CalcInputField
                    label="Body weight (kg)"
                    hint="Used to calculate relative strength"
                    value={bodyWeight}
                    onChange={setBodyWeight}
                    min={30}
                    max={250}
                  />
                </div>
              </CalcCard>
            </div>

            {/* Results Column */}
            <div className="lg:col-span-2 space-y-4">

              {/* Key stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl bg-zinc-950 text-white p-6">
                  <p className="text-xs font-bold tracking-widest uppercase text-zinc-400 mb-2">
                    Estimated 1RM
                  </p>
                  <p className="text-4xl font-black tabular-nums">
                    {oneRM.toFixed(1)}
                    <span className="text-lg font-semibold text-zinc-500 ml-1">kg</span>
                  </p>
                  <p className="text-xs text-zinc-500 mt-2">Epley formula</p>
                </div>
                <div className="rounded-2xl bg-[#CE1A19]/5 border border-[#CE1A19]/20 p-6">
                  <p className="text-xs font-bold tracking-widest uppercase text-[#CE1A19] mb-2">
                    Relative strength
                  </p>
                  <p className="text-4xl font-black text-[#CE1A19] tabular-nums">
                    {relStrength.toFixed(2)}
                    <span className="text-lg font-semibold opacity-60 ml-1">x BW</span>
                  </p>
                  <p className="text-xs text-zinc-500 mt-2">1RM relative to body weight</p>
                </div>
              </div>

              {/* Relative strength scale */}
              <CalcCard noAccent>
                <div className="p-6">
                  <p className="text-xs font-bold tracking-widest uppercase text-zinc-500 mb-4">
                    Relative strength scale
                  </p>
                  <div className="relative h-5 w-full rounded-full overflow-hidden flex">
                    {STRENGTH_STANDARDS.map((s) => (
                      <div key={s.label} className={`flex-1 ${s.color}`} title={s.label} />
                    ))}
                    <div
                      className="absolute top-0 bottom-0 w-1 bg-zinc-950 shadow-[0_0_8px_rgba(0,0,0,0.4)] transition-all duration-700 ease-out"
                      style={{
                        left: `${Math.min(100, Math.max(0, ((relStrength - 0.5) / 2.5) * 100))}%`,
                      }}
                    />
                  </div>
                  <div className="flex justify-between mt-2">
                    {STRENGTH_STANDARDS.map((s) => (
                      <span
                        key={s.label}
                        className="text-xs font-bold tracking-widest uppercase text-zinc-500"
                      >
                        {s.label}
                      </span>
                    ))}
                  </div>
                </div>
              </CalcCard>

              {/* Intensity prescriptor */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                <CalcCard noAccent>
                  <div className="px-6 py-4 border-b border-zinc-100">
                    <p className="text-xs font-bold tracking-widest uppercase text-[#CE1A19] mb-1">
                      Programming targets
                    </p>
                    <h3 className="text-base font-black uppercase text-zinc-950">
                      Training intensity prescriptor
                    </h3>
                  </div>
                  <table className="w-full text-sm">
                    <thead className="bg-zinc-50 border-b border-zinc-100">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-black uppercase tracking-widest text-zinc-500">
                          Target reps
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-black uppercase tracking-widest text-zinc-500">
                          Intensity
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-black uppercase tracking-widest text-zinc-500">
                          Target weight
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-100">
                      {PRESCRIBED_INTENSITY.map((row) => (
                        <tr key={row.reps} className="hover:bg-zinc-50 transition-colors">
                          <td className="px-6 py-3.5 font-semibold text-zinc-700">
                            {row.reps} rep{row.reps > 1 ? "s" : ""}
                          </td>
                          <td className="px-6 py-3.5 text-right text-zinc-600">
                            {(row.pct * 100).toFixed(0)}%
                          </td>
                          <td className="px-6 py-3.5 text-right font-black text-zinc-950">
                            {(oneRM * row.pct).toFixed(1)} kg
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </CalcCard>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
