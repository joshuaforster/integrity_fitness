import { type Qualification } from "@/app/data/qualifications";
import SectionWrapper from "@/app/components/ui/SectionWrapper";
import ModulesAccordion from "./ModulesAccordion";

export default function CourseModulesSection({ qual }: { qual: Qualification }) {
  return (
    <section
      aria-labelledby="modules-heading"
      className="bg-zinc-900 texture-dots-dark py-20 md:py-24 border-b border-zinc-950"
    >
      <SectionWrapper reveal>
        <div className="mb-12 md:mb-16">
          <p className="text-zinc-500 text-xs font-bold tracking-[4px] uppercase mb-4">
            Syllabus
          </p>
          <h2
            id="modules-heading"
            className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight uppercase"
          >
            What&apos;s Covered
          </h2>
          <div className="w-14 h-1 bg-[#CE1A19] mt-6" aria-hidden="true" />
        </div>

        <ModulesAccordion
          modules={qual.modules}
          bookletFolder={qual.bookletFolder}
          bookletPageCount={qual.bookletPageCount}
        />
      </SectionWrapper>
    </section>
  );
}
