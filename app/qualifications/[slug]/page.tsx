import { notFound } from "next/navigation";
import Image from "next/image";
import { Metadata } from "next";
import qualifications, {
  getQualificationBySlug,
  type Qualification,
} from "@/app/data/qualifications";
import Button from "@/app/components/Button";
import TestimonialsSection from "@/app/components/TestimonialsSection";
import PricingToggleSection from "./PricingToggleSection";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return qualifications.map((q) => ({ slug: q.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const qual = getQualificationBySlug(slug);
  if (!qual) return {};
  return {
    title: `${qual.title} | Integrity Fitness Education`,
    description: qual.tagline,
  };
}

function PricingSection({ qual }: { qual: Qualification }) {
  // CPD courses — single flat-fee card layout
  if (!qual.hasBillingToggle) {
    return (
      <section
        aria-labelledby="pricing-heading"
        className="bg-zinc-900 py-20 md:py-24 border-b border-zinc-950"
      >
        <div className="reveal mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-12 md:mb-16">
            <p className="text-[#CE1A19] text-xs font-bold tracking-[4px] uppercase mb-4">
              Investment
            </p>
            <h2
              id="pricing-heading"
              className="text-3xl md:text-5xl font-black text-white tracking-tight uppercase leading-none"
            >
              Course Fee
            </h2>
            <div className="w-14 h-1 bg-[#CE1A19] mt-6" aria-hidden="true" />
          </div>

          <div className="max-w-md w-full">
            {qual.pricing.map((tier) => (
              <div
                key={tier.name}
                className="bg-zinc-950 p-6 md:p-8 border border-zinc-900 rounded-sm shadow-xl flex flex-col"
              >
                <p className="text-zinc-500 text-xs font-bold tracking-widest uppercase mb-3">
                  {tier.name}
                </p>

                <div className="mb-4">
                  <div className="flex items-baseline gap-0.5 text-white">
                    <span className="text-xl font-bold self-start mt-1">£</span>
                    <span className="text-5xl md:text-6xl font-black leading-none tracking-tight">
                      {tier.price as number}
                    </span>
                  </div>
                  <p className="text-zinc-400 text-[10px] font-bold uppercase tracking-wider mt-2.5">
                    one-time investment
                  </p>
                </div>

                <p className="text-zinc-400 text-sm leading-relaxed mt-2 pb-6 mb-6 border-b border-zinc-900">
                  {tier.description}
                </p>

                <ul className="space-y-4 mb-8" role="list">
                  {tier.includes.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span
                        className="w-1.5 h-1.5 bg-[#CE1A19] mt-2 flex-shrink-0 rounded-xs"
                        aria-hidden="true"
                      />
                      <span className="text-zinc-300 text-sm leading-tight">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>

                <Button
                  href="/contact"
                  variant="primary"
                  size="md"
                  fullWidth
                  className="shadow-md"
                >
                  Book Your Place
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // PT courses — billing toggle handled client-side
  return <PricingToggleSection qual={qual} />;
}

export default async function QualificationPage({ params }: PageProps) {
  const { slug } = await params;
  const qual = getQualificationBySlug(slug);
  if (!qual) notFound();

  return (
    <main className="bg-white">
      {/* 1. Cinematic Background Layer Hero */}
      <section className="relative min-h-[65vh] md:min-h-[70vh] flex items-end bg-zinc-950 overflow-hidden ">
        <div className="absolute inset-0" aria-hidden="true">
          <Image
            src={qual.heroImage}
            alt=""
            fill
            className="object-cover opacity-85"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-zinc-950/40 z-[1]" />
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/80 to-transparent z-[2]" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 pb-16 md:pb-20 pt-40 w-full mt-auto">
          <div className="flex items-center flex-wrap gap-2.5 mb-4">
            <span className="text-[#CE1A19] text-xs font-bold tracking-[3px] uppercase">
              {qual.awardingBody}
            </span>
            <span className="w-1 h-1 rounded-full bg-zinc-700" />
            <span className="text-zinc-300 text-xs font-bold tracking-[2px] uppercase">
              {qual.level}
            </span>
            {qual.badge && (
              <>
                <span className="w-1 h-1 rounded-full bg-zinc-700" />
                <span className="text-[9px] uppercase tracking-widest text-white border border-white/20 bg-white/5 px-2 py-0.5 font-bold rounded-xs">
                  {qual.badge}
                </span>
              </>
            )}
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-none uppercase tracking-tight max-w-4xl mb-6">
            {qual.title}
          </h1>
          <p className="text-zinc-200 text-base md:text-xl max-w-2xl leading-relaxed mb-10 opacity-95">
            {qual.tagline}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <Button
              href="/contact"
              variant="primary"
              size="md"
              className="w-full sm:w-auto px-8 shadow-md"
            >
              Enquire Now
            </Button>
            <Button
              href="/qualifications"
              variant="outline-dark"
              size="md"
              className="w-full sm:w-auto px-8"
            >
              All Qualifications
            </Button>
          </div>
        </div>
      </section>

      {/* 2. Overview & Syllabus Information Area */}
      <section
        aria-labelledby="overview-heading"
        className="bg-white py-20 md:py-28"
      >
        <div className="reveal mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column: Descriptive Summary Text Blocks (Spans 7 Columns) */}
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
            </div>

            {/* Right Column: Key Takeaways & Pre-requisites (Spans 5 Columns) */}
            <div className="lg:col-span-5 space-y-10 lg:pl-6 lg:border-l border-zinc-100">
              <div>
                <p className="text-zinc-400 text-xs font-bold tracking-[3px] uppercase mb-5">
                  What You Will Learn
                </p>
                <ul className="space-y-4" role="list">
                  {qual.whatYouWillLearn.map((item) => (
                    <li key={item} className="flex items-start gap-4">
                      <span
                        className="w-1.5 h-1.5 bg-[#CE1A19] mt-2 flex-shrink-0 rounded-xs"
                        aria-hidden="true"
                      />
                      <p className="text-zinc-600 text-sm md:text-base leading-relaxed">
                        {item}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-8 border-t border-zinc-100">
                <p className="text-zinc-400 text-xs font-bold tracking-[3px] uppercase mb-5">
                  Entry Requirements
                </p>
                <ul className="space-y-4" role="list">
                  {qual.entryRequirements.map((req) => (
                    <li key={req} className="flex items-start gap-4">
                      <span
                        className="w-1.5 h-1.5 bg-zinc-300 mt-2 flex-shrink-0 rounded-xs"
                        aria-hidden="true"
                      />
                      <p className="text-zinc-600 text-sm md:text-base leading-relaxed">
                        {req}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 border-t border-zinc-100">
                <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs font-bold tracking-wide text-zinc-400 uppercase">
                  <div>
                    <span className="text-zinc-950">Duration:</span>{" "}
                    {qual.duration}
                  </div>
                  <div>
                    <span className="text-zinc-950">Awarding Body:</span>{" "}
                    {qual.awardingBody}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Detailed Curricular Modules */}
      <section
        aria-labelledby="modules-heading"
        className="bg-zinc-900 py-20 md:py-24 border-b border-zinc-950"
      >
        <div className="reveal mx-auto max-w-7xl px-6 lg:px-8">
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {qual.modules.map((mod, i) => (
              <div
                key={mod.title}
                className="bg-zinc-950 border border-zinc-950 p-6 md:p-8 rounded-sm shadow-md"
              >
                <p className="text-[#CE1A19] text-[10px] font-black tracking-[3px] uppercase mb-1">
                  Module 0{i + 1}
                </p>
                <h3 className="text-white font-extrabold text-lg mb-5 tracking-wide">
                  {mod.title}
                </h3>
                <ul className="space-y-3" role="list">
                  {mod.topics.map((topic) => (
                    <li key={topic} className="flex items-start gap-3">
                      <span
                        className="w-1 h-1 bg-zinc-700 mt-2.5 flex-shrink-0 rounded-full"
                        aria-hidden="true"
                      />
                      <span className="text-zinc-400 text-sm leading-snug">
                        {topic}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Pricing / Investment Section */}
      <PricingSection qual={qual} />

      {/* 5. Student Reviews Module */}
      {qual.testimonials && qual.testimonials.length > 0 && (
        <TestimonialsSection
          theme="light"
          label="Student Stories"
          heading="What Our Students Say"
          testimonials={qual.testimonials.map((t) => ({
            body: t.quote,
            name: t.name,
            subtitle: t.role,
          }))}
        />
      )}

      {/* 6. Closing Direct Conversion Module Footer */}
      <section
        aria-labelledby="final-cta-heading"
        className="bg-zinc-950 py-20 border-t border-zinc-900"
      >
        <div className="reveal mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <p className="text-[#CE1A19] text-xs font-bold tracking-[4px] uppercase mb-4">
            Ready To Start?
          </p>
          <h2
            id="final-cta-heading"
            className="text-2xl md:text-4xl font-black text-white uppercase tracking-tight mb-4"
          >
            Let&apos;s Talk
          </h2>
          <div
            className="w-14 h-1 bg-[#CE1A19] mx-auto mb-10"
            aria-hidden="true"
          />

          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-6 sm:gap-10 mb-12 border-y border-zinc-900 py-6">
            <div className="text-center">
              <p className="text-xl font-black text-white uppercase tracking-wide">
                Active IQ
              </p>
              <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest mt-1">
                Nationally Recognised
              </p>
            </div>
            <div
              className="w-px bg-zinc-900 hidden sm:block"
              aria-hidden="true"
            />
            <div className="text-center">
              <p className="text-xl font-black text-white uppercase tracking-wide">
                CIMSPA
              </p>
              <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest mt-1">
                Accredited
              </p>
            </div>
            <div
              className="w-px bg-zinc-900 hidden sm:block"
              aria-hidden="true"
            />
            <div className="text-center">
              <p className="text-xl font-black text-white uppercase tracking-wide">
                1-to-1
              </p>
              <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest mt-1">
                Personal Tuition
              </p>
            </div>
          </div>

          <p className="text-zinc-400 text-sm md:text-base leading-relaxed mb-10 max-w-lg mx-auto">
            Have a question about the course structures or want to understand
            which pathway is right for you? Reach out and we will get back to
            you inside one business day.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center w-full sm:w-auto">
            <Button
              href="/contact"
              variant="primary"
              size="md"
              className="w-full sm:w-auto px-10 shadow-md"
            >
              Get In Touch
            </Button>
            <Button
              href="/qualifications"
              variant="outline-dark"
              size="md"
              className="w-full sm:w-auto px-10"
            >
              All Qualifications
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
