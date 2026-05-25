import { notFound } from "next/navigation";
import Image from "next/image";
import { CheckIcon } from "@heroicons/react/24/solid";
import qualifications, { getQualificationBySlug, type Qualification } from "@/app/data/qualifications";
import Button from "@/app/components/Button";
import TestimonialsSection from "@/app/components/TestimonialsSection";

export async function generateStaticParams() {
  return qualifications.map((q) => ({ slug: q.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const qual = getQualificationBySlug(slug);
  if (!qual) return {};
  return {
    title: `${qual.title} | Integrity Fitness Education`,
    description: qual.tagline,
  };
}

function PricingSection({ qual }: { qual: Qualification }) {
  // CPD courses — single flat-fee card
  if (!qual.hasBillingToggle) {
    return (
      <section className="bg-[#F8F8F8] py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-14">
            <p className="text-[#CE1A19] text-xs font-semibold tracking-[4px] uppercase mb-4">Investment</p>
            <h2 className="text-4xl md:text-5xl font-bold text-black leading-tight uppercase">Course Fee</h2>
            <div className="w-14 h-1 bg-[#CE1A19] mt-6" />
          </div>

          <div className="max-w-sm">
            {qual.pricing.map((tier) => (
              <div key={tier.name} className="bg-[#111111] p-10 border-t-4 border-[#CE1A19]">
                <p className="text-white/60 text-xs font-semibold tracking-[4px] uppercase mb-4">{tier.name}</p>

                <div className="mb-2">
                  <div className="flex items-baseline gap-0.5">
                    <span className="text-white text-lg font-bold self-start mt-2">£</span>
                    <span className="text-7xl font-bold text-white leading-none tracking-tight">{tier.price as number}</span>
                  </div>
                  <p className="text-white/60 text-xs uppercase tracking-[2px] mt-2">one-time</p>
                </div>

                <p className="text-white/50 text-sm leading-relaxed mt-4 pb-6 mb-6 border-b border-white/10">
                  {tier.description}
                </p>

                <ul className="space-y-3 mb-8">
                  {tier.includes.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckIcon className="w-4 h-4 text-[#CE1A19] mt-0.5 flex-shrink-0" aria-hidden="true" />
                      <span className="text-white text-sm leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>

                <Button href="/contact" variant="primary" fullWidth>
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

// Client component only needed for the toggle interaction
import PricingToggleSection from "./PricingToggleSection";

export default async function QualificationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const qual = getQualificationBySlug(slug);
  if (!qual) notFound();

  return (
    <main>
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-end bg-black">
        <div className="absolute inset-0 -z-10">
          <Image
            src={qual.heroImage}
            alt={qual.title}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 pb-20 pt-40 w-full">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-white text-xs font-semibold tracking-[4px] uppercase">{qual.awardingBody}</span>
            <span className="w-px h-3 bg-white/30" />
            <span className="text-white/60 text-xs tracking-[3px] uppercase">{qual.level}</span>
            {qual.badge && (
              <>
                <span className="w-px h-3 bg-white/30" />
                <span className="text-[10px] uppercase tracking-widest text-white border border-white/60 px-2 py-0.5 font-semibold">
                  {qual.badge}
                </span>
              </>
            )}
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight uppercase max-w-3xl mb-6">
            {qual.title}
          </h1>
          <p className="text-white/90 text-xl max-w-xl mb-10">{qual.tagline}</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button href="/contact" variant="primary" size="lg">
              Enquire Now
            </Button>
            <Button href="/qualifications" variant="outline-dark" size="lg">
              All Qualifications
            </Button>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="bg-white py-24">
        <div className="reveal mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 lg:gap-24">
            <div className="lg:col-span-3">
              <p className="text-[#CE1A19] text-xs font-semibold tracking-[4px] uppercase mb-4">Overview</p>
              <h2 className="text-4xl md:text-5xl font-bold text-black leading-tight uppercase mb-6">
                About This Course
              </h2>
              <div className="w-14 h-1 bg-[#CE1A19] mb-10" />
              {qual.overview.map((para, i) => (
                <p key={i} className="text-gray-600 text-lg leading-relaxed mb-5">{para}</p>
              ))}
            </div>
            <div className="lg:col-span-2 space-y-10">
              <div>
                <p className="text-black text-xs font-semibold tracking-[4px] uppercase mb-6">What You Will Learn</p>
                <ul className="space-y-4">
                  {qual.whatYouWillLearn.map((item) => (
                    <li key={item} className="flex items-start gap-4">
                      <span className="w-6 h-px bg-[#CE1A19] mt-3 flex-shrink-0" />
                      <p className="text-gray-700 text-base leading-relaxed">{item}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="pt-6 border-t border-black/10">
                <p className="text-black text-xs font-semibold tracking-[4px] uppercase mb-6">Entry Requirements</p>
                <ul className="space-y-4">
                  {qual.entryRequirements.map((req) => (
                    <li key={req} className="flex items-start gap-4">
                      <span className="w-6 h-px bg-[#CE1A19] mt-3 flex-shrink-0" />
                      <p className="text-gray-700 text-base leading-relaxed">{req}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="pt-2">
                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  <div>
                    <span className="font-semibold text-black">Duration:</span> {qual.duration}
                  </div>
                  <div>
                    <span className="font-semibold text-black">Awarding Body:</span> {qual.awardingBody}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Modules */}
      <section className="bg-[#111111] py-24">
        <div className="reveal mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-14">
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight uppercase">
              What&apos;s Covered
            </h2>
            <div className="w-14 h-1 bg-[#CE1A19] mt-6" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {qual.modules.map((mod, i) => (
              <div key={mod.title} className="border border-white/10 p-6">
                <p className="text-white text-xs font-semibold tracking-[3px] uppercase mb-1">
                  Module {i + 1}
                </p>
                <h3 className="text-white font-bold text-lg mb-5">{mod.title}</h3>
                <ul className="space-y-3">
                  {mod.topics.map((topic) => (
                    <li key={topic} className="flex items-start gap-3">
                      <span className="w-3 h-px bg-[#CE1A19] mt-2.5 flex-shrink-0" />
                      <span className="text-white text-sm leading-snug">{topic}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <PricingSection qual={qual} />

      {/* Testimonials */}
      {qual.testimonials && qual.testimonials.length > 0 && (
        <TestimonialsSection
          theme="light"
          label="Student Stories"
          heading="What Our Students Say"
          testimonials={qual.testimonials.map((t) => ({ body: t.quote, name: t.name, subtitle: t.role }))}
        />
      )}

      {/* CTA */}
      <section className="bg-[#111111] py-24">
        <div className="reveal mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <p className="text-white text-xs font-semibold tracking-[4px] uppercase mb-4">Ready To Start?</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white uppercase leading-tight mb-6">
            Let&apos;s Talk
          </h2>
          <div className="w-14 h-1 bg-[#CE1A19] mx-auto mb-10" />

          <div className="flex flex-wrap justify-center gap-10 mb-12">
            <div className="text-center">
              <p className="text-2xl font-bold text-white">Active IQ</p>
              <p className="text-white/60 text-xs uppercase tracking-widest mt-1">Nationally Recognised</p>
            </div>
            <div className="w-px bg-white/10 hidden sm:block" />
            <div className="text-center">
              <p className="text-2xl font-bold text-white">CIMSPA</p>
              <p className="text-white/60 text-xs uppercase tracking-widest mt-1">Accredited</p>
            </div>
            <div className="w-px bg-white/10 hidden sm:block" />
            <div className="text-center">
              <p className="text-2xl font-bold text-white">1-to-1</p>
              <p className="text-white/60 text-xs uppercase tracking-widest mt-1">Personal Tuition</p>
            </div>
          </div>

          <p className="text-white/50 text-lg leading-relaxed mb-10 max-w-lg mx-auto">
            Have a question about the course or want to understand which option is right for you? Reach out and we will get back to you the same day.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/contact" variant="primary" size="lg">
              Get In Touch
            </Button>
            <Button href="/qualifications" variant="outline-dark" size="lg">
              All Qualifications
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
