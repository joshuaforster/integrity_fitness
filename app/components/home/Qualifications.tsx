"use client";

import Button from "@/app/components/Button";

const MAIN_COURSES = [
  {
    title: "Combined Level 2 & 3 Personal Training Diploma",
    description:
      "The fast-track ultimate industry standard. Everything you need to launch a fully accredited personal training career from zero experience.",
    href: "/qualifications/become-a-personal-trainer",
  },
  {
    title: "Level 2 Gym Instructor Certificate",
    description:
      "The essential foundational step into fitness coaching. Qualify to manage gym floors and lead group fitness inductions safely.",
    href: "/qualifications/level-2-gym-instructor",
  },
  {
    title: "Level 3 Personal Training Qualification",
    description:
      "Already hold a Level 2? Elevate your skill architecture, master advanced exercise programming, and open your client roster.",
    href: "/qualifications/level-3-personal-training",
  },
] as const;

const CPD_COURSES = [
  {
    title: "Level 2 Award in Mental Health Awareness",
    href: "/qualifications/mental-health-awareness",
  },
  {
    title: "Level 3 Award in Supporting Pre & Post Natal Clients",
    href: "/qualifications/pre-post-natal",
  },
  {
    title: "Level 3 Award in Emergency First Aid at Work",
    href: "/qualifications/emergency-first-aid",
  },
] as const;

export default function Qualifications() {
  return (
    <section className="bg-zinc-900 py-20 md:py-28 border-y border-zinc-800/60">
      <div className="reveal mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 md:mb-20">
          <p className="text-[#CE1A19] text-xs font-bold tracking-[4px] uppercase mb-4">
            What We Offer
          </p>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Qualifications Built For Real Careers
          </h2>
          <div className="w-14 h-1 bg-[#CE1A19] mt-6" aria-hidden="true" />
        </div>

        {/* Asymmetric Core Courses Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          {/* Left Block: Elite Flagship Course Box (Spans 7 Columns) */}
          <div className="lg:col-span-7 bg-zinc-950 border border-zinc-800 p-8 md:p-10 rounded-sm shadow-xl relative group">
            <div className="absolute top-0 right-0 bg-[#CE1A19] text-white text-[10px] font-black uppercase tracking-[2px] px-4 py-1.5 rounded-bl-sm">
              Flagship Diploma
            </div>

            <p className="text-zinc-500 text-xs font-bold tracking-widest uppercase mb-4">
              Become a Personal Trainer
            </p>
            <h3 className="text-xl md:text-2xl font-extrabold text-white leading-tight mb-4 max-w-md">
              {MAIN_COURSES[0].title}
            </h3>
            <p className="text-zinc-400 text-sm md:text-base leading-relaxed mb-8 max-w-xl">
              {MAIN_COURSES[0].description}
            </p>

            <div className="flex items-center justify-between pt-6 border-t border-zinc-900">
              <a
                href={MAIN_COURSES[0].href}
                className="inline-flex items-center gap-2 text-sm font-bold text-white uppercase tracking-wider group-hover:text-[#CE1A19] transition-colors duration-200"
              >
                View Course Structure
                <span className="group-hover:translate-x-1.5 transition-transform duration-200">
                  →
                </span>
              </a>
            </div>
          </div>

          {/* Right Block: Core Functional Upgrades List (Spans 5 Columns) */}
          <div className="lg:col-span-5 space-y-4 h-full flex flex-col justify-between">
            <p className="text-zinc-400 text-xs font-bold tracking-widest uppercase px-1 mb-2 lg:mb-0">
              Core Technical Certificates
            </p>

            {MAIN_COURSES.slice(1).map((course) => (
              <a
                key={course.title}
                href={course.href}
                className="block p-5 bg-zinc-950 border border-zinc-900 hover:border-zinc-800 hover:bg-zinc-900/50 transition-all duration-200 rounded-sm group"
              >
                <h4 className="text-sm font-bold text-white tracking-wide group-hover:text-zinc-300 transition-colors">
                  {course.title}
                </h4>
                <p className="text-xs text-zinc-500 mt-2 leading-relaxed line-clamp-2">
                  {course.description}
                </p>
              </a>
            ))}
          </div>
        </div>

        {/* CPD Inline Strip Divider Row */}
        <div className="mb-16">
          <p className="text-zinc-400 text-xs font-bold tracking-widest uppercase mb-6 px-1">
            Continued Professional Development (CPD)
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {CPD_COURSES.map((course) => (
              <a
                key={course.title}
                href={course.href}
                className="flex items-center justify-between p-4 bg-zinc-950/40 border border-zinc-900 hover:border-zinc-800 transition-all duration-200 rounded-sm group text-left"
              >
                <span className="text-xs font-medium text-zinc-300 group-hover:text-white transition-colors pr-4">
                  {course.title}
                </span>
                <span className="text-zinc-600 group-hover:text-white group-hover:translate-x-1 transition-transform text-sm">
                  →
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Guidance Action Row */}
        <div className="pt-8 border-t border-zinc-800/80">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 justify-between">
            <div>
              <p className="text-zinc-500 text-xs font-bold tracking-[3px] uppercase mb-1">
                Not sure where to start?
              </p>
              <p className="text-zinc-300 text-sm md:text-base leading-relaxed">
                Get in touch and we&apos;ll point you in the right direction.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <Button
                href="/qualifications"
                variant="primary"
                className="px-6 text-center"
              >
                See All Qualifications
              </Button>
              <Button
                href="/contact"
                variant="outline-dark"
                className="px-6 text-center border-zinc-700 text-white hover:bg-zinc-800"
              >
                Get In Touch
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
