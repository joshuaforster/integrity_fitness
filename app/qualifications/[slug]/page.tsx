import { notFound } from "next/navigation";
import { Metadata } from "next";
import qualifications, {
  getQualificationBySlug,
  type Qualification,
} from "@/app/data/qualifications";
import TestimonialsSection from "@/app/components/shared/TestimonialsSection";
import CourseHero from "./CourseHero";
import CourseOverview from "./CourseOverview";
import CourseFinalCTA from "./CourseFinalCTA";
import CPDPricingSection from "./CPDPricingSection";
import PricingToggleSection from "./PricingToggleSection";
import PricingFAQSection from "./PricingFAQSection";
import QualificationNav from "./QualificationNav";

interface PageProps {
  params: Promise<{ slug: string }>;
}

type SlantDir = "rise" | "fall";

const SLANT_OVERRIDES: Partial<Record<string, SlantDir>> = {
  "become-a-personal-trainer": "fall",
  "level-3-personal-training": "fall",
};

function slugSlants(slug: string): { pricing: SlantDir } {
  if (slug in SLANT_OVERRIDES) return { pricing: SLANT_OVERRIDES[slug]! };
  const n = slug.split("").reduce((a, c, i) => a + c.charCodeAt(0) * (i + 1), 0);
  return { pricing: n & 1 ? "rise" : "fall" };
}

export async function generateStaticParams() {
  return qualifications.map((q) => ({ slug: q.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const qual = getQualificationBySlug(slug);
  if (!qual) return {};
  return {
    title: `${qual.title} | Integrity Fitness Education`,
    description: qual.tagline,
    alternates: {
      canonical: `https://www.integrityfitnesseducation.co.uk/qualifications/${slug}`,
    },
  };
}

function PricingSection({ qual, slant }: { qual: Qualification; slant?: "rise" | "fall" }) {
  if (!qual.hasBillingToggle) {
    return <CPDPricingSection qual={qual} slant={slant} />;
  }
  return <PricingToggleSection qual={qual} slant={slant} />;
}

export default async function QualificationPage({ params }: PageProps) {
  const { slug } = await params;
  const qual = getQualificationBySlug(slug);
  if (!qual) notFound();

  const slants = slugSlants(slug);

  return (
    <main className="bg-white">
      <CourseHero qual={qual} />
      <CourseOverview qual={qual} />
      <PricingSection qual={qual} slant={slants.pricing} />
      <PricingFAQSection />

      {qual.testimonials && qual.testimonials.length > 0 && (
        <TestimonialsSection
          testimonials={qual.testimonials.map((t) => ({
            body: t.quote,
            name: t.name,
            subtitle: t.role,
          }))}
        />
      )}

      <CourseFinalCTA />
      <QualificationNav currentSlug={slug} />
    </main>
  );
}
