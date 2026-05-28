import Image from "next/image";
import { type Qualification } from "@/app/data/qualifications";
import SectionWrapper from "@/app/components/ui/SectionWrapper";
import BulletList from "@/app/components/ui/BulletList";
import CoursePreviewBook from "./CoursePreviewBook";

export default function CourseOverview({ qual }: { qual: Qualification }) {
  return (
    <section
      aria-labelledby="overview-heading"
      className="bg-white texture-grid-light py-20 md:py-28"
    >
      <SectionWrapper reveal>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left: overview text */}
          <div className="lg:col-span-7">
            <p className="text-[#CE1A19] text-xs font-bold tracking-[4px] uppercase mb-4">
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

            <CoursePreviewBook
              qualTitle={qual.title}
              bookletFolder={qual.bookletFolder}
              bookletPageCount={qual.bookletPageCount}
              bookletPdfPath={qual.bookletPdfPath}
            />
          </div>

          {/* Right: outcomes + requirements */}
          <div className="lg:col-span-5 space-y-10 lg:pl-6 lg:border-l border-zinc-100">
            <div>
              <p className="text-zinc-400 text-xs font-bold tracking-[3px] uppercase mb-5">
                What You Will Learn
              </p>
              <BulletList items={qual.whatYouWillLearn} />
            </div>

            <div className="pt-8 border-t border-zinc-100">
              <p className="text-zinc-400 text-xs font-bold tracking-[3px] uppercase mb-5">
                Entry Requirements
              </p>
              <BulletList items={qual.entryRequirements} bulletColor="green" />
            </div>

            <div className="pt-6 border-t border-zinc-100">
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs font-bold tracking-wide text-zinc-400 uppercase">
                <div>
                  <span className="text-zinc-950">Duration:</span> {qual.duration}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-zinc-950">Awarding Body:</span>
                  <Image src="https://pub-6e6bb53af6c34756a861d2c0a8259e84.r2.dev/General/activeiq.png" alt="Active IQ awarding body logo" width={80} height={17} className="h-4 w-auto" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>
    </section>
  );
}
