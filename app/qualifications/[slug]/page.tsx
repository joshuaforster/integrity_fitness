import { notFound } from "next/navigation";
import { Metadata } from "next";
import qualifications, {
  getQualificationBySlug,
  type Qualification,
} from "@/app/data/qualifications";
import TestimonialsSection from "@/app/components/TestimonialsSection";
import CourseHero from "./CourseHero";
import CourseOverview from "./CourseOverview";
import CourseModulesSection from "./CourseModulesSection";
import CourseFinalCTA from "./CourseFinalCTA";
import CPDPricingSection from "./CPDPricingSection";
import PricingToggleSection from "./PricingToggleSection";
import PricingFAQSection from "./PricingFAQSection";

interface PageProps {
  params: Promise<{ slug: string }>;
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
  };
}

function PricingSection({ qual }: { qual: Qualification }) {
  if (!qual.hasBillingToggle) {
    return <CPDPricingSection qual={qual} theme="dark" />;
  }
  return <PricingToggleSection qual={qual} theme="light" />;
}

export default async function QualificationPage({ params }: PageProps) {
  const { slug } = await params;
  const qual = getQualificationBySlug(slug);
  if (!qual) notFound();

  return (
    <main className="bg-white">
      <CourseHero qual={qual} />
      <CourseOverview qual={qual} />
      <CourseModulesSection qual={qual} />
      <PricingSection qual={qual} />
      <PricingFAQSection />

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

      <CourseFinalCTA />
    </main>
  );
}
