import { Metadata } from "next";
import Link from "next/link";
import qualifications from "@/app/data/qualifications";
import PageHero from "@/app/components/PageHero";
import Button from "@/app/components/Button";

export const metadata: Metadata = {
  title: "Qualifications | Integrity Fitness Education",
  description:
    "Browse all CIMSPA-accredited personal training and CPD qualifications from Integrity Fitness Education in Norwich, Norfolk.",
};

const PT_COURSES = qualifications.filter(
  (q) => q.category === "personal-training",
);
const CPD_COURSES = qualifications.filter((q) => q.category === "cpd");

export default function QualificationsPage() {
  return (
    <main className="bg-zinc-50">
      <PageHero
        image="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1920&q=80"
        label="CIMSPA Accredited"
        title="Qualifications"
        subtitle="One-to-one education built for real careers. Every course delivered personally by Harry."
        minHeight="60vh"
      />

      {/* 1. Guided Career Tracks: Personal Training */}
      <section
        aria-labelledby="pt-heading"
        className="py-20 md:py-28 border-b border-zinc-200/60"
      >
        <div className="reveal mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Frame: Strategic Career Path Guidance (Spans 4 Columns) */}
            <div className="lg:col-span-4 sticky top-28 space-y-6">
              <div>
                <p className="text-[#CE1A19] text-xs font-bold tracking-[4px] uppercase mb-4">
                  Syllabus Tracks
                </p>
                <h2
                  id="pt-heading"
                  className="text-2xl md:text-4xl font-black text-zinc-950 tracking-tight uppercase leading-none"
                >
                  Personal Training
                </h2>
                <div
                  className="w-14 h-1 bg-[#CE1A19] mt-5"
                  aria-hidden="true"
                />
              </div>

              <div className="border-l-2 border-zinc-200 pl-5 pt-1">
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-950 mb-2">
                  Where do you start?
                </h3>
                <p className="text-zinc-600 text-sm leading-relaxed">
                  If you are entirely new to fitness coaching, the{" "}
                  <strong>Combined Diploma</strong> is your required baseline
                  launchpad. If you already hold an accredited Level 2
                  certificate, select the standalone{" "}
                  <strong>Level 3 Qualification</strong> to upgrade your roster
                  capability.
                </p>
              </div>
            </div>

            {/* Right Frame: Unboxed Clean List Elements (Spans 8 Columns) */}
            <div className="lg:col-span-8 space-y-4 w-full">
              {PT_COURSES.map((q) => (
                <Link
                  key={q.slug}
                  href={`/qualifications/${q.slug}`}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-6 md:p-8 bg-white border border-zinc-200/60 hover:border-zinc-400 transition-all duration-200 group rounded-sm shadow-xs outline-none focus-visible:ring-2 focus-visible:ring-[#CE1A19]"
                >
                  <div className="flex-1 max-w-2xl pr-4">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-zinc-500 text-xs font-bold tracking-wider uppercase">
                        {q.level}
                      </span>
                      {q.badge && (
                        <span className="text-[9px] uppercase tracking-widest text-[#CE1A19] border border-[#CE1A19]/20 bg-[#CE1A19]/5 px-2 py-0.5 font-black rounded-xs">
                          {q.badge}
                        </span>
                      )}
                    </div>
                    <h4 className="text-zinc-950 font-black text-lg md:text-xl group-hover:text-[#CE1A19] transition-colors duration-200">
                      {q.title}
                    </h4>
                    <p className="text-zinc-600 text-sm mt-1.5 leading-relaxed">
                      {q.tagline}
                    </p>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-6 flex-shrink-0 mt-6 sm:mt-0 pt-4 sm:pt-0 border-t sm:border-t-0 border-zinc-100">
                    <span className="text-zinc-500 text-xs font-bold tracking-wider uppercase bg-zinc-100 px-3 py-1.5 rounded-sm">
                      {q.duration}
                    </span>
                    <span
                      className="text-zinc-400 group-hover:text-zinc-950 transform transition-transform duration-200 group-hover:translate-x-1.5 text-xl"
                      aria-hidden="true"
                    >
                      →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. Continued Professional Development (CPD) */}
      <section
        aria-labelledby="cpd-heading"
        className="py-20 md:py-28 bg-white"
      >
        <div className="reveal mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-12 md:mb-16">
            <p className="text-zinc-400 text-xs font-bold tracking-[4px] uppercase mb-4">
              Specialist Upgrades
            </p>
            <h2
              id="cpd-heading"
              className="text-2xl md:text-4xl font-black text-zinc-950 tracking-tight uppercase leading-none"
            >
              Continued Professional Development
            </h2>
            <div className="w-14 h-1 bg-zinc-200 mt-5" aria-hidden="true" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CPD_COURSES.map((q) => (
              <Link
                key={q.slug}
                href={`/qualifications/${q.slug}`}
                className="flex flex-col justify-between p-6 md:p-8 bg-zinc-50 border border-zinc-200/80 hover:border-zinc-400 transition-all duration-200 group rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-[#CE1A19]"
              >
                <div>
                  <span className="text-[#CE1A19] text-xs font-bold tracking-wider uppercase">
                    {q.level}
                  </span>
                  <h3 className="text-zinc-950 font-black text-lg tracking-tight mt-3 mb-2 leading-tight">
                    {q.title}
                  </h3>
                  <p className="text-zinc-600 text-sm leading-relaxed mb-8">
                    {q.tagline}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-zinc-200 mt-auto">
                  <span className="text-zinc-500 text-xs font-bold tracking-wide uppercase">
                    {q.duration}
                  </span>
                  <span
                    className="text-zinc-400 group-hover:text-zinc-950 transform transition-transform duration-200 group-hover:translate-x-1 text-sm"
                    aria-hidden="true"
                  >
                    →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Bottom Direct Guidance Action Row */}
      <section
        aria-labelledby="cta-heading"
        className="py-20 md:py-24 border-t border-zinc-200 bg-zinc-50"
      >
        <div className="reveal mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <p className="text-[#CE1A19] text-xs font-bold tracking-[4px] uppercase mb-4">
            Not Sure Where To Start?
          </p>
          <h2
            id="cta-heading"
            className="text-2xl md:text-4xl font-black text-zinc-950 uppercase tracking-tight mb-4"
          >
            We&apos;ll Point You in the Right Direction.
          </h2>
          <div
            className="w-14 h-1 bg-[#CE1A19] mx-auto mb-6"
            aria-hidden="true"
          />
          <p className="text-zinc-600 text-sm md:text-base mb-10 max-w-lg mx-auto leading-relaxed">
            Every student follows a distinct educational path. Get in touch
            directly and Harry will calibrate the perfect structure matching
            your career goals and availability constraints.
          </p>
          <div className="flex justify-center">
            <Button
              href="/contact"
              variant="primary"
              size="md"
              className="px-10 shadow-sm"
            >
              Get In Touch
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
