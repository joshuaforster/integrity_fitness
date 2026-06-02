import SectionWrapper from "@/app/components/ui/SectionWrapper";
import SectionHeader from "@/app/components/ui/SectionHeader";
import GraduateCard from "./GraduateCard";
import { graduates } from "@/app/content/graduates";

export default function GraduateGrid() {
  return (
    <section className="bg-zinc-50 texture-grid-light py-20 md:py-28">
      <SectionWrapper reveal>
        <SectionHeader label="Graduate Stories" heading="Meet The Coaches." headingSize="md" />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {graduates.map((graduate, i) => (
            <GraduateCard key={graduate.name} graduate={graduate} index={i} />
          ))}
        </div>
      </SectionWrapper>
    </section>
  );
}
