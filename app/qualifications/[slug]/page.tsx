import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import qualifications, { getQualificationBySlug, type Qualification, type PricingTier } from "@/app/data/qualifications";

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

function PriceDisplay({ tier, billing }: { tier: PricingTier; billing: "monthly" | "yearly" }) {
  if (typeof tier.price === "number") {
    return (
      <div className="mb-6">
        <span className="text-4xl font-bold text-white">£{tier.price}</span>
        <span className="text-white/60 text-sm ml-1">one-time</span>
      </div>
    );
  }
  const amount = billing === "monthly" ? tier.price.monthly : tier.price.yearly;
  const label = billing === "monthly" ? "/mo" : "/yr";
  const saving = tier.price.monthly * 12 - tier.price.yearly;
  return (
    <div className="mb-6">
      <span className="text-4xl font-bold text-white">£{amount}</span>
      <span className="text-white/60 text-sm ml-1">{label}</span>
      {billing === "yearly" && saving > 0 && (
        <p className="text-[#CE1A19] text-xs font-semibold mt-1">Save £{saving} vs monthly</p>
      )}
    </div>
  );
}

function PricingSection({ qual }: { qual: Qualification }) {
  // CPD courses have no billing toggle — render static cards
  if (!qual.hasBillingToggle) {
    return (
      <section className="bg-[#F5F5F5] py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-14">
            <p className="text-[#CE1A19] text-xs font-semibold tracking-[4px] uppercase mb-4">Investment</p>
            <h2 className="text-4xl md:text-5xl font-bold text-black leading-tight uppercase">Course Fee</h2>
            <div className="w-14 h-1 bg-[#CE1A19] mt-6" />
          </div>
          <div className="max-w-md">
            {qual.pricing.map((tier) => (
              <div key={tier.name} className="bg-[#111111] p-8 ring-2 ring-[#CE1A19]">
                <p className="text-white/50 text-xs font-semibold tracking-[4px] uppercase mb-6">{tier.name}</p>
                <div className="flex items-start gap-1 mb-2">
                  <span className="text-[#CE1A19] text-2xl font-bold mt-3 leading-none">£</span>
                  <span className="text-7xl font-bold text-white leading-none tracking-tight">{tier.price as number}</span>
                </div>
                <p className="text-white/40 text-xs tracking-[2px] uppercase mb-2">one-time</p>
                <p className="text-white/60 text-sm mb-8 mt-4 leading-relaxed">{tier.description}</p>
                <ul className="space-y-3 mb-8">
                  {tier.includes.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="w-4 h-px bg-[#CE1A19] mt-2.5 flex-shrink-0" />
                      <span className="text-white text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className="block w-full text-center bg-[#CE1A19] text-white px-8 py-4 text-sm font-semibold tracking-widest uppercase hover:bg-red-700 transition-colors"
                >
                  Book Your Place
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // PT courses — billing toggle handled client-side via a wrapper
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
      <section className="relative min-h-[70vh] flex items-end">
        <div className="absolute inset-0 -z-10">
          <Image
            src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=1920&q=80"
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
            <span className="text-[#CE1A19] text-xs font-semibold tracking-[4px] uppercase">{qual.awardingBody}</span>
            <span className="w-px h-3 bg-white/30" />
            <span className="text-white/60 text-xs tracking-[3px] uppercase">{qual.level}</span>
            {qual.badge && (
              <>
                <span className="w-px h-3 bg-white/30" />
                <span className="text-[10px] uppercase tracking-widest text-[#CE1A19] border border-[#CE1A19] px-2 py-0.5 font-semibold">
                  {qual.badge}
                </span>
              </>
            )}
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight uppercase max-w-4xl mb-6">
            {qual.title}
          </h1>
          <p className="text-white/80 text-lg max-w-xl mb-10">{qual.tagline}</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/contact"
              className="bg-[#CE1A19] text-white px-10 py-4 text-sm font-semibold tracking-widest uppercase hover:bg-red-700 transition-colors"
            >
              Enquire Now
            </Link>
            <Link
              href="/qualifications"
              className="border border-white/30 text-white px-10 py-4 text-sm font-semibold tracking-widest uppercase hover:border-white/60 transition-colors"
            >
              All Qualifications
            </Link>
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
              <div>
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

      {/* What's Covered */}
      <section className="bg-[#111111] py-24">
        <div className="reveal mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-14">
            <p className="text-[#CE1A19] text-xs font-semibold tracking-[4px] uppercase mb-4">Curriculum</p>
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight uppercase">
              What&apos;s Covered
            </h2>
            <div className="w-14 h-1 bg-[#CE1A19] mt-6" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {qual.modules.map((mod, i) => (
              <div key={mod.title} className="border border-white/10 p-6">
                <p className="text-[#CE1A19] text-xs font-semibold tracking-[3px] uppercase mb-1">
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

      {/* CTA */}
      <section className="bg-white py-24 border-t border-black/10">
        <div className="reveal mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <p className="text-[#CE1A19] text-xs font-semibold tracking-[4px] uppercase mb-4">Ready To Start?</p>
          <h2 className="text-4xl md:text-5xl font-bold text-black uppercase leading-tight mb-6">
            Let&apos;s Talk
          </h2>
          <div className="w-14 h-1 bg-[#CE1A19] mx-auto mb-8" />
          <p className="text-gray-500 text-lg leading-relaxed mb-10 max-w-lg mx-auto">
            Have a question about the course or want to understand which option is right for you? Reach out and we will get back to you the same day.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-[#CE1A19] text-white px-10 py-4 text-sm font-semibold tracking-widest uppercase hover:bg-red-700 transition-colors"
            >
              Get In Touch
            </Link>
            <Link
              href="/qualifications"
              className="border-2 border-black text-black px-10 py-4 text-sm font-semibold tracking-widest uppercase hover:bg-black hover:text-white transition-colors"
            >
              All Qualifications
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
