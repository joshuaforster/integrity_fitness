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
  const ogImage = qual.heroImage ?? "https://pub-6e6bb53af6c34756a861d2c0a8259e84.r2.dev/TGG%20HALL%20ROAD/GYM-FLOOR-EXPLANATION-IFE-TGGNHR_003.jpg";
  return {
    title: `${qual.title} | Integrity Fitness Education`,
    description: qual.tagline,
    alternates: {
      canonical: `https://www.integrityfitnesseducation.co.uk/qualifications/${slug}`,
    },
    openGraph: {
      title: `${qual.title} | Integrity Fitness Education`,
      description: qual.tagline,
      url: `https://www.integrityfitnesseducation.co.uk/qualifications/${slug}`,
      siteName: "Integrity Fitness Education",
      locale: "en_GB",
      type: "website",
      images: [{ url: ogImage, width: 1200, height: 630, alt: qual.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${qual.title} | Integrity Fitness Education`,
      description: qual.tagline,
      images: [ogImage],
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

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.integrityfitnesseducation.co.uk" },
      { "@type": "ListItem", position: 2, name: "Qualifications", item: "https://www.integrityfitnesseducation.co.uk/qualifications" },
      { "@type": "ListItem", position: 3, name: qual.title, item: `https://www.integrityfitnesseducation.co.uk/qualifications/${slug}` },
    ],
  };

  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: qual.title,
    description: qual.tagline,
    provider: {
      "@type": "Organization",
      name: "Integrity Fitness Education",
      url: "https://www.integrityfitnesseducation.co.uk",
    },
    url: `https://www.integrityfitnesseducation.co.uk/qualifications/${slug}`,
  };

  return (
    <main className="bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
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
