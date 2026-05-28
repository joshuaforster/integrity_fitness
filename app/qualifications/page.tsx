import { Metadata } from "next";
import qualifications from "@/app/data/qualifications";
import PageHero from "@/app/components/PageHero";
import PTCourseList from "./PTCourseList";
import CPDCourseGrid from "./CPDCourseGrid";
import ReadyToStartCTA from "@/app/components/ReadyToStartCTA";

export const metadata: Metadata = {
  title: "Qualifications | Integrity Fitness Education",
  description:
    "Browse all CIMSPA-accredited personal training and CPD qualifications from Integrity Fitness Education in Norwich, Norfolk.",
  alternates: {
    canonical: "https://www.integrityfitnesseducation.co.uk/qualifications",
  },
};

const PT_COURSES = qualifications.filter(
  (q) => q.category === "personal-training",
);
const CPD_COURSES = qualifications.filter((q) => q.category === "cpd");

export default function QualificationsPage() {
  return (
    <main className="bg-zinc-50">
      <PageHero
        image="https://pub-6e6bb53af6c34756a861d2c0a8259e84.r2.dev/TGG%20Norwich/ANATOMY-AND-PHYSIOLOGY-EXAM-20220124-IFE-TGGNCC044.jpg"
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
        className="bg-white angle-tl pb-20 md:pb-28 pt-[132px] md:pt-[164px]"
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

      {/* 3. Bottom CTA */}
      <ReadyToStartCTA />
    </main>
  );
}
