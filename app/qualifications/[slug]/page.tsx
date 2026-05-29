import { notFound } from "next/navigation";
import { Metadata } from "next";
import qualifications, {
  getQualificationBySlug,
  type Qualification,
} from "@/app/data/qualifications";
import TestimonialsSection from "@/app/components/shared/TestimonialsSection";
import CourseHero from "./CourseHero";
import CourseOverview from "./CourseOverview";
import CourseModulesSection from "./CourseModulesSection";
import CourseFinalCTA from "./CourseFinalCTA";
import CPDPricingSection from "./CPDPricingSection";
import PricingToggleSection from "./PricingToggleSection";
import PricingFAQSection from "./PricingFAQSection";
import QualificationNav from "./QualificationNav";

interface PageProps {
  params: Promise<{ slug: string }>;
}

type SlantDir = "rise" | "fall";

function slugSlants(slug: string): { modules: SlantDir; pricing?: SlantDir } {
  const n = slug.split("").reduce((a, c, i) => a + c.charCodeAt(0) * (i + 1), 0);
  const modules: SlantDir = n & 1 ? "rise" : "fall";
  const pricing: SlantDir | undefined = n & 2 ? (n & 4 ? "rise" : "fall") : undefined;
  return { modules, pricing };
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
      <CourseModulesSection qual={qual} slant={slants.modules} />
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
