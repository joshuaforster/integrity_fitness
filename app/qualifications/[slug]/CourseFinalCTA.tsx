import Button from "@/app/components/Button";
import SectionWrapper from "@/app/components/ui/SectionWrapper";

const CREDENTIALS = [
  { value: "Active IQ", label: "Nationally Recognised" },
  { value: "CIMSPA", label: "Accredited" },
  { value: "1-to-1", label: "Personal Tuition" },
] as const;

export default function CourseFinalCTA() {
  return (
    <section
      aria-labelledby="final-cta-heading"
      className="bg-zinc-950 texture-grid-dark py-20 border-t border-zinc-900"
    >
      <SectionWrapper reveal className="max-w-4xl text-center">
        <p className="text-[#CE1A19] text-xs font-bold tracking-[4px] uppercase mb-4">
          Ready To Start?
        </p>
        <h2
          id="final-cta-heading"
          className="text-2xl md:text-4xl font-black text-white uppercase tracking-tight mb-4"
        >
          Let&apos;s Talk
        </h2>
        <div className="w-14 h-1 bg-[#CE1A19] mx-auto mb-10" aria-hidden="true" />

        <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-6 sm:gap-10 mb-12 border-y border-zinc-900 py-6">
          {CREDENTIALS.map((cred, i) => (
            <div key={cred.value} className="flex items-center gap-6 sm:gap-10">
              {i > 0 && <div className="w-px bg-zinc-900 hidden sm:block h-full" aria-hidden="true" />}
              <div className="text-center">
                <p className="text-xl font-black text-white uppercase tracking-wide">
                  {cred.value}
                </p>
                <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest mt-1">
                  {cred.label}
                </p>
              </div>
            </div>
          ))}
        </div>

        <p className="text-zinc-400 text-sm md:text-base leading-relaxed mb-10 max-w-lg mx-auto">
          Have a question about the course structures or want to understand which
          pathway is right for you? Reach out and we will get back to you inside
          one business day.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center w-full sm:w-auto">
          <Button href="/contact" variant="primary" size="md" className="w-full sm:w-auto px-10 shadow-md">
            Get In Touch
          </Button>
          <Button href="/qualifications" variant="outline-dark" size="md" className="w-full sm:w-auto px-10">
            All Qualifications
          </Button>
        </div>
      </SectionWrapper>
    </section>
  );
}
