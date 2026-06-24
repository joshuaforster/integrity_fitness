"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import PageHero from "../components/ui/PageHero";
import {
  CalcCard,
  CalcCardHeader,
  CalcInputField,
  CalcSectionLabel,
  CalcCTAButton,
  CalcLoadingState,
  CalcIntro,
  CalcAnimatedAmount,
} from "../components/calc";

/* ── Course data ──────────────────────────────────────────────────────────── */
type CourseEntry = {
  id: string;
  label: string;
  sublabel: string;
  hours: number;
  minMonths: number;
  badge?: string | null;
};

const MAIN_COURSES: CourseEntry[] = [
  {
    id: "combined",
    label: "Combined L2 & L3 Diploma",
    sublabel: "Zero to fully qualified PT — the most complete route",
    hours: 240,
    minMonths: 3,
    badge: "Most Popular",
  },
  {
    id: "level-2",
    label: "Level 2 Gym Instructor",
    sublabel: "Your first step onto the gym floor",
    hours: 120,
    minMonths: 1,
    badge: null,
  },
  {
    id: "level-3",
    label: "Level 3 Personal Training",
    sublabel: "Already have Level 2? Step up to fully qualified PT",
    hours: 175,
    minMonths: 1.5,
    badge: null,
  },
];

const ALL_COURSES = MAIN_COURSES;

/* ── Life situations ──────────────────────────────────────────────────────── */
const SITUATIONS = [
  { id: "student-holiday", label: "Student — on holiday",      sublabel: "Summer break, gap year, or between terms",     presetHours: 25 },
  { id: "student-term",    label: "Student — during term",     sublabel: "University or college while studying",          presetHours: 10 },
  { id: "full-time",       label: "Full-time employed",        sublabel: "Working 35–40+ hours per week",                presetHours: 7  },
  { id: "part-time",       label: "Part-time employed",        sublabel: "Working under 25 hours per week",              presetHours: 14 },
  { id: "not-working",     label: "Not currently working",     sublabel: "Career change, redundancy, or gap year",        presetHours: 22 },
  { id: "parent-carer",    label: "Stay-at-home parent / carer", sublabel: "Primary carer for children or dependents",  presetHours: 8  },
];

/* ── Loading facts ────────────────────────────────────────────────────────── */
const LOADING_FACTS = [
  "Harry's fastest ever graduate completed the combined diploma in under 10 weeks.",
  "Consistent daily study beats long weekend sessions — 45 minutes every day adds up fast.",
  "The average IFE student qualifies 9–12 months after enrolment.",
  "You study at your own pace — there are no fixed weekly deadlines with IFE.",
  "Some students balance the course around a full-time job and qualify inside a year.",
  "A working parent studying just 5 hours a week can still complete the course within 18 months.",
];

/* ── Calculation ──────────────────────────────────────────────────────────── */
function getEstimate(
  courseHoursBase: number,
  weeklyHours: number,
  youngChildren: boolean,
  priorKnowledge: boolean,
  minMonths: number
) {
  const courseHours = courseHoursBase * (priorKnowledge ? 0.82 : 1.0);
  const effective   = weeklyHours * (youngChildren ? 0.72 : 1.0);
  if (effective <= 0) return 36;
  const raw = courseHours / (effective * 4.33);
  return Math.max(minMonths, Math.min(36, raw));
}

function getCompletionMeta(months: number) {
  if (months < 0.5)
    return { label: "Short course",    color: "text-emerald-600", bg: "bg-emerald-50 border-emerald-200", dot: "bg-emerald-500" };
  if (months <= 4)
    return { label: "Fast-track",      color: "text-emerald-600", bg: "bg-emerald-50 border-emerald-200", dot: "bg-emerald-500" };
  if (months <= 9)
    return { label: "Standard pace",   color: "text-emerald-600", bg: "bg-emerald-50 border-emerald-200", dot: "bg-emerald-500" };
  if (months <= 15)
    return { label: "Steady progress", color: "text-amber-600",   bg: "bg-amber-50 border-amber-200",     dot: "bg-amber-500"   };
  return   { label: "Long-term study", color: "text-zinc-600",    bg: "bg-zinc-100 border-zinc-300",      dot: "bg-zinc-400"    };
}

function getContextText(months: number): string {
  if (months <= 3)
    return "Three months is the absolute minimum for the full diploma — achievable only with very large blocks of free time and intense daily focus. You would essentially be treating studying as a full-time job.";
  if (months <= 6)
    return "A fast but sustainable pace. You have enough study time to progress without burning out. Most students at this pace describe the experience as challenging but highly motivating.";
  if (months <= 12)
    return "This is the most common timeline for IFE students. You can build study habits around your existing commitments without feeling rushed. Regular 45–60 minute sessions several times a week are all you need to keep momentum.";
  if (months <= 18)
    return "Realistic for someone with a genuinely busy life. Progress may feel slow at times, but many of Harry's most successful graduates — working parents and full-time employees included — have qualified on a similar timeline.";
  return "A longer study period, but entirely achievable. The key at this pace is consistency over intensity — even 2 to 3 hours per week will carry you over the finish line.";
}

function addMonths(date: Date, months: number): Date {
  const d = new Date(date);
  d.setMonth(d.getMonth() + Math.round(months));
  return d;
}

function formatDate(date: Date) {
  return date.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

/* If less than ~6 weeks, display in weeks for clarity */
function displayDuration(months: number): { value: number; unit: string; fmtFn: (n: number) => string } {
  if (months < 1.5) {
    const weeks = Math.max(1, Math.round(months * 4.33));
    return { value: weeks, unit: weeks === 1 ? "week" : "weeks", fmtFn: (n) => String(Math.round(n)) };
  }
  return { value: Math.round(months), unit: "months", fmtFn: (n) => String(Math.round(n)) };
}

/* ── Confetti ─────────────────────────────────────────────────────────────── */
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
    const timer = setTimeout(() => setPieces([]), 6000);
    return () => clearTimeout(timer);
  }, [active]);

  if (!pieces.length) return null;
  return (
    <>
      {pieces.map((p, i) => <ConfettiPiece key={i} {...p} />)}
    </>
  );
}

/* ── Course card ──────────────────────────────────────────────────────────── */
function CourseCard({
  course,
  selected,
  onSelect,
  highlight,
}: {
  course: CourseEntry;
  selected: boolean;
  onSelect: () => void;
  highlight: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`relative text-left p-4 rounded-xl border-2 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CE1A19] focus-visible:ring-offset-2 ${
        selected
          ? "border-[#CE1A19] bg-[#CE1A19]/5"
          : highlight
          ? "border-red-300 bg-red-50/40 hover:border-red-400"
          : "border-zinc-200 bg-white hover:border-zinc-300"
      }`}
    >
      {course.badge && (
        <span className="absolute top-3 right-3 bg-[#CE1A19] text-white text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full leading-none">
          {course.badge}
        </span>
      )}
      <span className="block text-sm font-black text-zinc-950 leading-tight pr-16">{course.label}</span>
      <span className="block text-xs text-zinc-500 mt-1 leading-snug">{course.sublabel}</span>
      <span className="block text-xs font-bold text-[#CE1A19] mt-2">~{course.hours} study hours</span>
    </button>
  );
}

/* ── Page ─────────────────────────────────────────────────────────────────── */
export default function CourseTimeEstimator() {
  const [courseId, setCourseId]             = useState<string | null>(null);
  const [situation, setSituation]           = useState<string | null>(null);
  const [weeklyHours, setWeeklyHours]       = useState(10);
  const [youngChildren, setYoungChildren]   = useState(false);
  const [priorKnowledge, setPriorKnowledge] = useState(false);
  const [calcState, setCalcState]           = useState<"idle" | "loading" | "done">("idle");
  const [currentFact, setCurrentFact]       = useState("");
  const [result, setResult]                 = useState<number | null>(null);
  const [courseError, setCourseError]       = useState(false);
  const [showConfetti, setShowConfetti]     = useState(false);

  const resultsRef   = useRef<HTMLDivElement>(null);
  const courseCardRef = useRef<HTMLDivElement>(null);

  const selectedCourse = ALL_COURSES.find((c) => c.id === courseId) ?? null;

  function resetResult() {
    if (calcState === "done") setCalcState("idle");
  }

  function handleSituation(id: string) {
    const found = SITUATIONS.find((s) => s.id === id);
    if (found) { setSituation(id); setWeeklyHours(found.presetHours); resetResult(); }
  }

  function handleCalculate() {
    if (!selectedCourse) {
      setCourseError(true);
      setTimeout(() => setCourseError(false), 3500);
      courseCardRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    const months = getEstimate(
      selectedCourse.hours,
      weeklyHours,
      youngChildren,
      priorKnowledge,
      selectedCourse.minMonths
    );
    setResult(months);
    setCurrentFact(LOADING_FACTS[Math.floor(Math.random() * LOADING_FACTS.length)]);
    setCalcState("loading");
    setTimeout(() => {
      setCalcState("done");
      setShowConfetti(true);
      setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
    }, 2800);
  }

  const now          = new Date();
  const todayDate = formatDate(now);

  const safeMonths   = result ?? getEstimate(
    selectedCourse?.hours ?? MAIN_COURSES[0].hours,
    weeklyHours,
    youngChildren,
    priorKnowledge,
    selectedCourse?.minMonths ?? MAIN_COURSES[0].minMonths
  );

  const meta           = getCompletionMeta(safeMonths);
  const finishDate     = formatDate(addMonths(now, safeMonths));
  const lowMonths      = Math.max(selectedCourse?.minMonths ?? 0.25, safeMonths * 0.8);
  const highMonths     = safeMonths * 1.3;
  const effectiveHours = Math.round(weeklyHours * (youngChildren ? 0.72 : 1.0));
  const adjustedHours  = Math.round((selectedCourse?.hours ?? MAIN_COURSES[0].hours) * (priorKnowledge ? 0.82 : 1.0));
  const dur            = displayDuration(safeMonths);
  const lowDur         = displayDuration(lowMonths);
  const highDur        = displayDuration(highMonths);

  return (
    <>
      <Confetti active={showConfetti} />
      <PageHero
        image="https://pub-6e6bb53af6c34756a861d2c0a8259e84.r2.dev/WhatsApp%20Image%202026-06-19%20at%2016.27.36.jpeg"
        label="Course Planning"
        title="How Long Will It Take?"
        subtitle="Tell us about your life — we'll give you a realistic course timeline."
        overlayStrength="heavy"
        size="sm"
      />

      <section className="py-16 lg:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
          <CalcIntro
            eyebrow="Course Timeline Estimator · IFE Qualifications"
            heading={<>Your pace.<br />Your timeline.</>}
            body="The most common question Harry gets asked is: 'How long will it take?' The honest answer depends on your life. Choose your course, fill in your situation, and we'll give you a realistic estimate based on the time you actually have available."
            tags={[
              "Tailored to your course",
              "No fixed deadlines",
              "Self-paced learning",
              "Realistic, not optimistic",
            ]}
          />

          {/* ── Step 1: Course ──────────────────────────────────────────── */}
          <div ref={courseCardRef}>
            <CalcCard>
              <CalcCardHeader
                eyebrow="Step 1"
                title="Which course are you looking at?"
                subtitle="Each qualification has a different amount of content — select the one you're considering."
                showLogo
              />
              <div className="px-8 py-6 space-y-6">
                <AnimatePresence>
                  {courseError && (
                    <motion.p
                      className="text-sm font-bold text-red-600"
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                    >
                      Please select a course before estimating your timeline.
                    </motion.p>
                  )}
                </AnimatePresence>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {MAIN_COURSES.map((c) => (
                    <CourseCard
                      key={c.id}
                      course={c}
                      selected={courseId === c.id}
                      highlight={courseError}
                      onSelect={() => { setCourseId(c.id); setCourseError(false); resetResult(); }}
                    />
                  ))}
                </div>
              </div>
            </CalcCard>
          </div>

          {/* ── Step 2: Life situation ───────────────────────────────────── */}
          <CalcCard>
            <CalcCardHeader
              eyebrow="Step 2"
              title="Tell us about your life"
              subtitle="Select the option that best describes you, then adjust the sliders."
              showLogo
            />

            <div className="px-8 py-6 space-y-8">
              {/* Situation cards */}
              <div>
                <CalcSectionLabel
                  title="Current life situation"
                  hint="Choose the option that best fits your day-to-day right now."
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {SITUATIONS.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => handleSituation(s.id)}
                      className={`text-left p-4 rounded-xl border-2 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CE1A19] focus-visible:ring-offset-2 ${
                        situation === s.id
                          ? "border-[#CE1A19] bg-[#CE1A19]/5"
                          : "border-zinc-200 bg-white hover:border-zinc-300"
                      }`}
                    >
                      <span className="block text-sm font-black text-zinc-950 leading-tight">{s.label}</span>
                      <span className="block text-xs text-zinc-500 mt-0.5 leading-snug">{s.sublabel}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Weekly hours */}
              <div>
                <CalcSectionLabel
                  title="Study hours per week"
                  hint="How many hours per week can you realistically dedicate? Be honest, not optimistic."
                />
                <CalcInputField
                  label="Hours per week"
                  value={weeklyHours}
                  onChange={(v) => { setWeeklyHours(v); resetResult(); }}
                  min={1}
                  max={35}
                  step={1}
                  benchmark="Most IFE students study 5–12 hours per week"
                  warnAbove={25}
                  warnMessage="That's a high commitment — achievable only if studying is your main focus right now."
                />
              </div>

              {/* Toggles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <CalcSectionLabel
                    title="Young children or dependents?"
                    hint="Under 10 years old — unpredictable demands that reduce consistent study windows."
                  />
                  <div className="flex rounded-lg border border-zinc-200 overflow-hidden text-sm font-bold w-full">
                    <button
                      type="button"
                      onClick={() => { setYoungChildren(false); resetResult(); }}
                      className={`flex-1 py-2.5 transition-colors ${!youngChildren ? "bg-[#CE1A19] text-white" : "text-zinc-500 hover:text-zinc-700 bg-white"}`}
                    >
                      No
                    </button>
                    <button
                      type="button"
                      onClick={() => { setYoungChildren(true); resetResult(); }}
                      className={`flex-1 py-2.5 transition-colors border-l border-zinc-200 ${youngChildren ? "bg-[#CE1A19] text-white" : "text-zinc-500 hover:text-zinc-700 bg-white"}`}
                    >
                      Yes
                    </button>
                  </div>
                </div>

                <div>
                  <CalcSectionLabel
                    title="Fitness or education background?"
                    hint="Prior PT training, sports science study, or relevant professional experience."
                  />
                  <div className="flex rounded-lg border border-zinc-200 overflow-hidden text-sm font-bold w-full">
                    <button
                      type="button"
                      onClick={() => { setPriorKnowledge(false); resetResult(); }}
                      className={`flex-1 py-2.5 transition-colors ${!priorKnowledge ? "bg-[#CE1A19] text-white" : "text-zinc-500 hover:text-zinc-700 bg-white"}`}
                    >
                      Complete beginner
                    </button>
                    <button
                      type="button"
                      onClick={() => { setPriorKnowledge(true); resetResult(); }}
                      className={`flex-1 py-2.5 transition-colors border-l border-zinc-200 ${priorKnowledge ? "bg-[#CE1A19] text-white" : "text-zinc-500 hover:text-zinc-700 bg-white"}`}
                    >
                      Some background
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-8 py-6 border-t border-zinc-200 flex flex-wrap items-center gap-4">
              <CalcCTAButton
                calcState={calcState}
                onClick={handleCalculate}
                idleLabel="Estimate my timeline"
                loadingLabel="Working it out…"
                doneLabel="Recalculate"
                className="w-full sm:w-auto"
              />
              {!courseId && calcState === "idle" && !courseError && (
                <p className="text-xs text-zinc-400">Select a course in Step 1 first</p>
              )}
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

                  {calcState === "done" && result !== null && (
                    <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>

                      {/* Dark hero strip */}
                      <div className="relative bg-zinc-950 px-8 sm:px-10 py-10 overflow-hidden">
                        <div className="absolute inset-0 texture-dots-dark" aria-hidden="true" />

                        <motion.div
                          className="relative z-10 flex items-start justify-between gap-4 mb-8"
                          initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}
                        >
                          <div className="liquid-glass rounded-xl px-4 py-3 flex items-center gap-3.5">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-white flex-shrink-0" aria-hidden="true">
                              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                              <line x1="16" y1="2" x2="16" y2="6" />
                              <line x1="8" y1="2" x2="8" y2="6" />
                              <line x1="3" y1="10" x2="21" y2="10" />
                              <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" />
                            </svg>
                            <div>
                              <p className="text-xs font-bold tracking-widest uppercase text-white/55 leading-none mb-1">Course Timeline</p>
                              <p className="text-xs font-semibold text-white leading-none">{selectedCourse?.label ?? "IFE Qualification"}</p>
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
                          <p className="text-xs font-bold tracking-widest uppercase text-[#CE1A19] mb-2">Estimated time to qualify</p>
                          <p className="text-5xl sm:text-6xl font-black text-white tracking-tight leading-none tabular-nums">
                            <CalcAnimatedAmount value={dur.value} format={dur.fmtFn} />
                            <span className="text-[#CE1A19]"> {dur.unit}</span>
                          </p>
                          <motion.div
                            className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-3"
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}
                          >
                            <span className={`text-sm font-bold ${meta.color}`}>{meta.label}</span>
                            <span className="text-white/30">·</span>
                            <span className="text-sm text-white/50">{weeklyHours}h/week study</span>
                          </motion.div>
                          <motion.p
                            className="text-xs text-white/35 mt-4 leading-relaxed max-w-sm"
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                          >
                            This is an estimate. Everyone&apos;s journey is different — life changes, study habits vary, and Harry tailors every plan individually.
                          </motion.p>
                        </motion.div>
                      </div>

                      {/* Light section */}
                      <div className="bg-white px-8 sm:px-10 py-8 space-y-8">

                        {/* Timeline + Graduate image */}
                        <motion.div
                          className="grid grid-cols-1 md:grid-cols-2 gap-4"
                          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                        >
                          {/* Vertical timeline */}
                          <div className="bg-zinc-50 rounded-2xl border border-zinc-200 p-6 flex flex-col">
                            <p className="text-xs font-black uppercase tracking-widest text-zinc-500 mb-6">Your journey</p>
                            <div className="flex gap-5 flex-1">
                              {/* Dots + track */}
                              <div className="flex flex-col items-center pt-0.5">
                                <div className="w-3.5 h-3.5 rounded-full bg-[#CE1A19] flex-shrink-0 shadow-[0_0_10px_rgba(206,26,25,0.5)]" />
                                <div className="flex-1 w-0.5 bg-zinc-200 my-2 relative overflow-hidden" style={{ minHeight: 64 }}>
                                  <motion.div
                                    className="absolute inset-x-0 top-0 bg-[#CE1A19]"
                                    initial={{ height: "0%" }}
                                    animate={{ height: "100%" }}
                                    transition={{ duration: 1.3, ease: "easeInOut", delay: 0.6 }}
                                  />
                                </div>
                                <div className="w-3.5 h-3.5 rounded-full border-2 border-[#CE1A19] bg-white flex-shrink-0 flex items-center justify-center">
                                  <motion.div
                                    className="w-2 h-2 rounded-full bg-[#CE1A19]"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 1.9, duration: 0.35, type: "spring", stiffness: 260 }}
                                  />
                                </div>
                              </div>

                              {/* Labels */}
                              <div className="flex flex-col justify-between flex-1 min-h-[140px]">
                                <div>
                                  <p className="text-[10px] font-black uppercase tracking-widest text-[#CE1A19] leading-none mb-1">Today</p>
                                  <p className="text-base font-black text-zinc-950 leading-tight">{todayDate}</p>
                                  <p className="text-xs text-zinc-500 mt-0.5">Enrol and begin studying</p>
                                </div>
                                <div className="py-2">
                                  <span className="inline-flex items-center gap-1.5 bg-white border border-zinc-200 rounded-full px-3 py-1.5 text-xs font-bold text-zinc-600 shadow-sm">
                                    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="w-3 h-3 text-[#CE1A19]" aria-hidden="true">
                                      <path d="M8 2v12M4 10l4 4 4-4" />
                                    </svg>
                                    ~{dur.value} {dur.unit} of study
                                  </span>
                                </div>
                                <div>
                                  <p className="text-[10px] font-black uppercase tracking-widest text-[#CE1A19] leading-none mb-1">Est. qualification date</p>
                                  <p className="text-base font-black text-zinc-950 leading-tight">{finishDate}</p>
                                  <p className="text-xs text-zinc-500 mt-0.5">Certificate in hand — if you start today</p>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Graduate image */}
                          <div className="relative rounded-2xl overflow-hidden min-h-[420px]">
                            <Image
                              src="https://pub-6e6bb53af6c34756a861d2c0a8259e84.r2.dev/grace.jpeg"
                              alt="Grace, IFE graduate"
                              fill
                              className="object-cover object-[center_15%]"
                              unoptimized
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/25 to-transparent" />
                            <div className="absolute top-4 left-4">
                              <span className="bg-[#CE1A19] text-white text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full">
                                IFE Graduate
                              </span>
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 p-5">
                              <p className="text-white font-black text-xl leading-tight">This could be you.</p>
                              <p className="text-white/65 text-sm mt-0.5">Grace — IFE Graduate</p>
                              <p className="text-white/45 text-xs mt-1">Est. qualified around {finishDate}</p>
                            </div>
                          </div>
                        </motion.div>

                        {/* Range + disclaimer */}
                        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
                          <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-3">
                            <p className="text-xs font-bold tracking-widest uppercase text-zinc-500">Your realistic range</p>
                            <p className="text-xs text-zinc-400 italic">Estimate only — every learner is different</p>
                          </div>
                          <div className={`p-5 rounded-xl border ${meta.bg}`}>
                            <div className="flex items-start gap-3">
                              <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 mt-1 ${meta.dot}`} />
                              <div>
                                <p className={`text-sm font-bold ${meta.color} mb-1`}>
                                  {Math.round(lowDur.value)} to {Math.round(highDur.value)} {highDur.unit} — {meta.label}
                                </p>
                                <p className="text-sm text-zinc-700 leading-relaxed">
                                  {getContextText(result)}
                                </p>
                              </div>
                            </div>
                          </div>
                          <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                            These figures are based on average study patterns. Your actual timeline will depend on how consistently you study, your existing knowledge, and how Harry structures your programme — which is always built around you.
                          </p>
                        </motion.div>

                        {/* Breakdown */}
                        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}>
                          <p className="text-xs font-bold tracking-widest uppercase text-zinc-500 mb-3">How we calculated this</p>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200">
                              <p className="text-xs font-black uppercase tracking-wider text-zinc-500 mb-1">Course content</p>
                              <p className="text-lg font-black text-zinc-950">{adjustedHours} hours</p>
                              <p className="text-xs text-zinc-500 mt-0.5">
                                {priorKnowledge ? "Adjusted for your background" : "Full programme hours"}
                              </p>
                            </div>
                            <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200">
                              <p className="text-xs font-black uppercase tracking-wider text-zinc-500 mb-1">Effective study time</p>
                              <p className="text-lg font-black text-zinc-950">{effectiveHours}h/week</p>
                              <p className="text-xs text-zinc-500 mt-0.5">
                                {youngChildren ? "Adjusted for young children" : "Your stated availability"}
                              </p>
                            </div>
                            <div className="p-4 rounded-xl bg-[#CE1A19]/5 border border-[#CE1A19]/15">
                              <p className="text-xs font-black uppercase tracking-wider text-[#CE1A19] mb-1">Target date</p>
                              <p className="text-base font-black text-zinc-950 leading-tight">{finishDate}</p>
                              <p className="text-xs text-zinc-500 mt-0.5">If you start today</p>
                            </div>
                          </div>
                        </motion.div>

                        {/* Tips */}
                        <motion.div
                          className="pt-6 border-t border-zinc-100"
                          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
                        >
                          <p className="text-xs font-bold tracking-widest uppercase text-zinc-500 mb-4">How to stay on track</p>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200">
                              <p className="text-xs font-black uppercase tracking-wider text-zinc-700 mb-2">Study little and often</p>
                              <p className="text-xs text-zinc-500 leading-relaxed">45 minutes every day beats a 5-hour Sunday session. Consistency builds retention far better than cramming.</p>
                            </div>
                            <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200">
                              <p className="text-xs font-black uppercase tracking-wider text-zinc-700 mb-2">Tell Harry your timeline</p>
                              <p className="text-xs text-zinc-500 leading-relaxed">When you enrol, share your target date. Harry builds a personalised study plan around your schedule from day one.</p>
                            </div>
                            <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200">
                              <p className="text-xs font-black uppercase tracking-wider text-zinc-700 mb-2">Life happens — adapt, don&apos;t quit</p>
                              <p className="text-xs text-zinc-500 leading-relaxed">Busy weeks happen. One missed week won&apos;t derail you. IFE has no fixed deadlines — your pace is your pace.</p>
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
    </>
  );
}
