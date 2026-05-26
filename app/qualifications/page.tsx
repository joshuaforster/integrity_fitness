import { Metadata } from "next";
import qualifications from "@/app/data/qualifications";
import PageHero from "@/app/components/PageHero";
import Button from "@/app/components/Button";
import PTCourseList from "./PTCourseList";
import CPDCourseGrid from "./CPDCourseGrid";

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
            <PTCourseList courses={PT_COURSES} />
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

          <CPDCourseGrid courses={CPD_COURSES} />
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
