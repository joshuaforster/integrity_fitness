import { notFound } from "next/navigation";
import { type Metadata } from "next";
import qualifications, { getQualificationBySlug } from "@/app/data/qualifications";
import PageHero from "@/app/components/ui/PageHero";
import ProductPageClient from "./ProductPageClient";

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ tier?: string; billing?: string }>;
}

export async function generateStaticParams() {
  return qualifications.map((q) => ({ slug: q.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const qual = getQualificationBySlug(slug);
  if (!qual) return {};
  return {
    title: `Enrol — ${qual.shortTitle} | Integrity Fitness Education`,
    description: qual.tagline,
  };
}

function getRelatedCourses(qual: ReturnType<typeof getQualificationBySlug>) {
  if (!qual) return [];
  if (qual.category === "personal-training") {
    return qualifications.filter((q) => q.category === "cpd").slice(0, 3);
  }
  // For CPD: show the combined diploma + any other CPD courses
  return qualifications
    .filter((q) => q.slug !== qual.slug)
    .sort((a) => (a.category === "personal-training" && a.badge ? -1 : 0))
    .slice(0, 3);
}

export default async function CoursePage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const { tier, billing } = await searchParams;
  const qual = getQualificationBySlug(slug);
  if (!qual) notFound();

  const initialTierIndex = (() => {
    if (tier !== undefined) {
      const idx = parseInt(tier, 10);
      if (!isNaN(idx) && idx >= 0 && idx < qual.pricing.length) return idx;
    }
    return Math.max(qual.pricing.findIndex((t) => t.highlighted), 0);
  })();

  const initialBilling: "one-off" | "monthly" =
    billing === "monthly" ? "monthly" : "one-off";

  const relatedCourses = getRelatedCourses(qual);

  return (
    <main>
      <PageHero
        image={qual.heroImage}
        label="Enrol"
        title={qual.shortTitle}
        subtitle={qual.tagline}
        overlayStrength="heavy"
      />
      <ProductPageClient
        qual={qual}
        initialTierIndex={initialTierIndex}
        initialBilling={initialBilling}
        relatedCourses={relatedCourses}
      />
    </main>
  );
}
