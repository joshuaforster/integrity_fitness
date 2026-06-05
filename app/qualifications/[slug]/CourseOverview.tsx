import { type Qualification } from "@/app/data/qualifications";
import SectionWrapper from "@/app/components/ui/SectionWrapper";
import BulletList from "@/app/components/ui/BulletList";
import ModulesAccordion from "./ModulesAccordion";

export default function CourseOverview({ qual }: { qual: Qualification }) {
  return (
    <section
      aria-labelledby="overview-heading"
      className="relative overflow-hidden bg-white texture-grid-light py-20 md:py-28"
    >
      {/* Faint Active IQ accreditation watermark */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="https://pub-6e6bb53af6c34756a861d2c0a8259e84.r2.dev/General/activeiq.png"
        alt=""
        aria-hidden="true"
        className="absolute top-10 right-6 lg:right-12 h-10 w-auto object-contain opacity-[0.07] grayscale pointer-events-none select-none"
      />
      <SectionWrapper reveal>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left: overview text */}
          <div className="lg:col-span-7">
            <p className="text-[#CE1A19] text-xs font-bold tracking-widest uppercase mb-4">
              Overview
            </p>
            <h2
              id="overview-heading"
              className="text-3xl md:text-5xl font-black text-zinc-950 tracking-tight leading-tight uppercase mb-6"
            >
              About This Course
            </h2>
            <div className="w-14 h-1 bg-[#CE1A19] mb-8" aria-hidden="true" />

            <div className="space-y-6 text-zinc-600 text-base md:text-lg leading-relaxed">
              {qual.overview.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>

          {/* Right: requirements + what's covered + meta */}
          <div className="lg:col-span-5 space-y-10 lg:pl-6 lg:border-l border-zinc-100">
            <div>
              <p className="text-zinc-400 text-xs font-bold tracking-widest uppercase mb-5">
                Entry Requirements
              </p>
              <BulletList items={qual.entryRequirements} bulletColor="green" />
            </div>

            <div className="pt-8 border-t border-zinc-100">
              <p className="text-[#CE1A19] text-xs font-bold tracking-widest uppercase mb-5">
                What&apos;s Covered
              </p>
              <ModulesAccordion modules={qual.modules} />
            </div>

          </div>
        </div>
      </SectionWrapper>
    </section>
  );
}
