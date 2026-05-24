import Link from "next/link";
import qualifications from "@/app/data/qualifications";
import PageHero from "@/app/components/PageHero";
import Button from "@/app/components/Button";

export const metadata = {
  title: "Qualifications | Integrity Fitness Education",
  description: "Browse all CIMSPA-accredited personal training and CPD qualifications from Integrity Fitness Education in Norwich, Norfolk.",
};

const ptCourses = qualifications.filter((q) => q.category === "personal-training");
const cpdCourses = qualifications.filter((q) => q.category === "cpd");

export default function QualificationsPage() {
  return (
    <main>
      <PageHero
        image="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1920&q=80"
        label="CIMSPA Accredited"
        title="Qualifications"
        subtitle="One-to-one education built for real careers. Every course delivered personally by Harry."
        minHeight="60vh"
      />

      {/* PT Courses */}
      <section className="bg-[#111111] py-24">
        <div className="reveal mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-14">
            <p className="text-[#CE1A19] text-xs font-semibold tracking-[4px] uppercase mb-4">
              Personal Training
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight uppercase">
              Become A Personal Trainer
            </h2>
            <div className="w-14 h-1 bg-[#CE1A19] mt-6" />
          </div>
          <div className="space-y-4">
            {ptCourses.map((q) => (
              <Link
                key={q.slug}
                href={`/qualifications/${q.slug}`}
                className="flex items-center justify-between p-6 border border-white/10 hover:border-[#CE1A19]/60 hover:bg-white/[0.03] transition-all duration-200 group"
              >
                <div className="flex items-center gap-6">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-[#CE1A19] text-xs font-semibold tracking-[3px] uppercase">
                        {q.level}
                      </span>
                      {q.badge && (
                        <span className="text-[10px] uppercase tracking-widest text-[#CE1A19] border border-[#CE1A19] px-2 py-0.5 font-semibold">
                          {q.badge}
                        </span>
                      )}
                    </div>
                    <h3 className="text-white font-semibold text-lg">{q.title}</h3>
                    <p className="text-white/50 text-sm mt-1">{q.tagline}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 flex-shrink-0 ml-6">
                  <span className="text-white/40 text-xs hidden sm:block">{q.duration}</span>
                  <span className="text-[#CE1A19] text-xl group-hover:translate-x-1 transition-transform duration-200">→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CPD Courses */}
      <section className="bg-white py-24">
        <div className="reveal mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-14">
            <p className="text-[#CE1A19] text-xs font-semibold tracking-[4px] uppercase mb-4">
              CPD
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-black leading-tight uppercase">
              Continued Professional Development
            </h2>
            <div className="w-14 h-1 bg-[#CE1A19] mt-6" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {cpdCourses.map((q) => (
              <Link
                key={q.slug}
                href={`/qualifications/${q.slug}`}
                className="border border-black/10 p-8 hover:border-[#CE1A19]/50 hover:shadow-lg transition-all duration-200 group"
              >
                <span className="text-[#CE1A19] text-xs font-semibold tracking-[3px] uppercase">{q.level}</span>
                <h3 className="text-black font-bold text-xl mt-3 mb-3 leading-snug">{q.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6">{q.tagline}</p>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-xs">{q.duration}</span>
                  <span className="text-[#CE1A19] text-lg group-hover:translate-x-1 transition-transform duration-200">→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-[#111111] py-20 border-t border-white/10">
        <div className="reveal mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <p className="text-[#CE1A19] text-xs font-semibold tracking-[4px] uppercase mb-4">
            Not Sure Where To Start?
          </p>
          <h2 className="text-4xl font-bold text-white uppercase mb-6">We&apos;ll Point You In The Right Direction</h2>
          <div className="w-14 h-1 bg-[#CE1A19] mx-auto mb-8" />
          <p className="text-white/70 text-lg mb-10 max-w-lg mx-auto">
            Every student is different. Get in touch and Harry will help you find the right course for your goals and circumstances.
          </p>
          <Button href="/contact" variant="primary" size="lg">
            Get In Touch
          </Button>
        </div>
      </section>
    </main>
  );
}
