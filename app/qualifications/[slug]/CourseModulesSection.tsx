import { type Qualification } from "@/app/data/qualifications";
import SectionWrapper from "@/app/components/ui/SectionWrapper";
import SectionHeader from "@/app/components/ui/SectionHeader";
import ModulesAccordion from "./ModulesAccordion";

export default function CourseModulesSection({
  qual,
  slant,
}: {
  qual: Qualification;
  slant?: "rise" | "fall";
}) {
  const clipPath = slant === "rise"
    ? "polygon(0 48px, 100% 0, 100% 100%, 0 100%)"
    : slant === "fall"
    ? "polygon(0 0, 100% 48px, 100% 100%, 0 100%)"
    : undefined;

  return (
    <section
      aria-labelledby="modules-heading"
      className={`bg-zinc-900 texture-dots-dark py-20 md:py-24 border-b border-zinc-950${slant ? " -mt-12 relative z-10" : ""}`}
      style={clipPath ? { clipPath } : undefined}
    >
      <SectionWrapper reveal>
        <div className="mb-6 md:mb-8">
          <SectionHeader
            label="Syllabus"
            heading="What's Covered"
            id="modules-heading"
            theme="dark"
          />
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
