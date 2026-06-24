"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageHero from "../components/ui/PageHero";

const QUESTIONS = [
  {
    q: "What is your biggest time-drain?",
    // Each option maps to a weight object
    options: [
      {
        text: "1-to-1 Sessions",
        weight: { technician: 2, systems: 0, hustler: 0, overwhelmed: 0 },
      },
      {
        text: "Programming/Admin",
        weight: { technician: 1, systems: 0, hustler: 0, overwhelmed: 1 },
      },
      {
        text: "Marketing/Sales",
        weight: { technician: 0, systems: 0, hustler: 2, overwhelmed: 0 },
      },
    ],
  },
  {
    q: "If you had 10 extra hours, what would you do?",
    options: [
      {
        text: "Build systems/automation",
        weight: { technician: 0, systems: 2, hustler: 0, overwhelmed: 0 },
      },
      {
        text: "Run more ads",
        weight: { technician: 0, systems: 0, hustler: 2, overwhelmed: 0 },
      },
      {
        text: "Sleep/Rest",
        weight: { technician: 0, systems: 0, hustler: 0, overwhelmed: 2 },
      },
    ],
  },
];

const ARCHETYPES: Record<string, { title: string; desc: string }> = {
  technician: {
    title: "The Technician",
    desc: "You are the bottleneck. Stop writing custom programs for every client.",
  },
  systems: {
    title: "The Systems Builder",
    desc: "You're scaling well, but ensure you aren't over-automating the human touch.",
  },
  hustler: {
    title: "The Hustler",
    desc: "You have leads but no system. You'll burn out without proper intake pipelines.",
  },
  overwhelmed: {
    title: "The Overwhelmed",
    desc: "Your plate is too full. Prioritize outsourcing or price increases immediately.",
  },
};

export default function PTArchetypeQuiz() {
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState({
    technician: 0,
    systems: 0,
    hustler: 0,
    overwhelmed: 0,
  });

  const handleSelect = (weight: typeof scores) => {
    setScores((prev) => ({
      technician: prev.technician + weight.technician,
      systems: prev.systems + weight.systems,
      hustler: prev.hustler + weight.hustler,
      overwhelmed: prev.overwhelmed + weight.overwhelmed,
    }));

    if (step < QUESTIONS.length - 1) setStep(step + 1);
    else setStep(QUESTIONS.length);
  };

  const getResult = () => {
    return Object.keys(scores).reduce((a, b) =>
      scores[a as keyof typeof scores] > scores[b as keyof typeof scores]
        ? a
        : b,
    );
  };

  const result = ARCHETYPES[getResult()];

  return (
    <>
      <PageHero
        image="https://pub-6e6bb53af6c34756a861d2c0a8259e84.r2.dev/WhatsApp%20Image%202026-06-19%20at%2016.27.36.jpeg"
        label="Strategic Diagnostic"
        title="Find your PT Archetype"
        subtitle="Uncover the hidden bottleneck in your current business model."
        overlayStrength="heavy"
        size="sm"
      />

      <section className="py-20 bg-white">
        <div className="max-w-xl mx-auto px-4">
          <AnimatePresence mode="wait">
            {step < QUESTIONS.length ? (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="p-8 border border-zinc-200 rounded-2xl bg-zinc-50"
              >
                <div className="text-[10px] font-bold text-[#CE1A19] tracking-widest uppercase mb-4">
                  Question {step + 1} of {QUESTIONS.length}
                </div>
                <h2 className="text-xl font-black text-zinc-950 mb-6">
                  {QUESTIONS[step].q}
                </h2>
                <div className="space-y-3">
                  {QUESTIONS[step].options.map((opt) => (
                    <button
                      key={opt.text}
                      onClick={() => handleSelect(opt.weight)}
                      className="w-full text-left p-4 rounded-xl border border-zinc-200 bg-white hover:border-[#CE1A19] transition-all font-semibold text-zinc-700"
                    >
                      {opt.text}
                    </button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 border border-zinc-200 rounded-2xl bg-white shadow-xl text-center"
              >
                <h2 className="text-2xl font-black mb-4">
                  Your Archetype: {result.title}
                </h2>
                <p className="text-zinc-500 mb-6">{result.desc}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="bg-[#CE1A19] text-white px-8 py-3 rounded-lg font-bold"
                >
                  Restart Assessment
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </>
  );
}
