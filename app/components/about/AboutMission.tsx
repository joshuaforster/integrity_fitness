"use client";

import Button from "@/app/components/Button";

const DIFFERENTIATORS = [
  {
    title: "1:1 Dedicated Mentorship",
    description:
      "No crowded classrooms or generic online modules. Your learning architecture is calibrated entirely around you.",
  },
  {
    title: "Norwich Fitness Infrastructure",
    description:
      "Rooted in Norfolk, training in-person at a premier local facility. Built directly for our regional health community.",
  },
  {
    title: "Sovereignty Over Your Time",
    description:
      "Engineered completely around your current work commitments, personal schedule, and natural learning velocity.",
  },
  {
    title: "Continuous Career Access",
    description:
      "An active professional network that supports your commercial lead generation long after your diploma wraps.",
  },
] as const;

export default function AboutMission() {
  return (
    <section className="bg-white py-20 md:py-28 border-t border-zinc-100">
      <div className="reveal mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column — Core Mission Statement Block (Spans 6 Columns) */}
          <div className="lg:col-span-6">
            <p className="text-[#CE1A19] text-xs font-bold tracking-[4px] uppercase mb-4">
              Our Mission
            </p>
            <h2 className="text-3xl md:text-5xl font-black text-zinc-950 leading-tight uppercase tracking-tight mb-6 max-w-xl">
              Education That Actually Changes Your Life.
            </h2>
            <div className="w-14 h-1 bg-[#CE1A19] mb-8" aria-hidden="true" />

            <div className="space-y-6 text-zinc-600 text-base md:text-lg leading-relaxed">
              <p>
                Since 2015, Integrity Fitness Education has been rewriting the
                rules of personal training education in Norwich, Norfolk. Where
                others offer courses, we offer transformation — the kind that
                sticks.
              </p>
              <p>
                Harry founded IFE after seeing firsthand how impersonal and
                inadequate the standard fitness education model was. Every
                decision since has been made with one question in mind: what
                gives our students the best possible chance of building a career
                they love?
              </p>
            </div>
          </div>

          {/* Right Column — Structured Differentiators Column (Spans 6 Columns) */}
          <div className="lg:col-span-6 lg:pl-6">
            <p className="text-zinc-400 text-xs font-bold tracking-[4px] uppercase mb-8">
              What Sets Us Apart
            </p>

            <ul className="space-y-8" role="list">
              {DIFFERENTIATORS.map((item) => (
                <li key={item.title} className="flex items-start gap-4 group">
                  {/* Sharp mechanical indicator marker accent */}
                  <span
                    className="w-1.5 h-1.5 bg-[#CE1A19] mt-2 flex-shrink-0 rounded-sm"
                    aria-hidden="true"
                  />
                  <div>
                    <h3 className="text-sm font-extrabold text-zinc-950 tracking-wide uppercase mb-1">
                      {item.title}
                    </h3>
                    <p className="text-zinc-600 text-sm md:text-base leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-10 md:mt-12">
              <Button
                href="/qualifications"
                variant="primary"
                className="w-full sm:w-auto px-8"
              >
                View Qualifications
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
