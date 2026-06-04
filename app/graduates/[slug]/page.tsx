import { notFound } from "next/navigation";
import { Metadata } from "next";
import { graduates, getGraduateBySlug } from "@/app/content/graduates";
import PageHero from "@/app/components/ui/PageHero";
import SectionWrapper from "@/app/components/ui/SectionWrapper";
import ReadyToStartCTA from "@/app/components/shared/ReadyToStartCTA";
import GraduateStoryBody from "./GraduateStoryBody";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return graduates.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const graduate = getGraduateBySlug(slug);
  if (!graduate) return {};
  const ogImage = graduate.image ?? "https://pub-6e6bb53af6c34756a861d2c0a8259e84.r2.dev/TGG%20HALL%20ROAD/GYM-FLOOR-EXPLANATION-IFE-TGGNHR_003.jpg";
  return {
    title: `${graduate.name}'s Story | Integrity Fitness Education`,
    description: graduate.quote,
    alternates: {
      canonical: `https://www.integrityfitnesseducation.co.uk/graduates/${slug}`,
    },
    openGraph: {
      title: `${graduate.name}'s Story | Integrity Fitness Education`,
      description: graduate.quote,
      url: `https://www.integrityfitnesseducation.co.uk/graduates/${slug}`,
      siteName: "Integrity Fitness Education",
      locale: "en_GB",
      type: "article",
      images: [{ url: ogImage, width: 1200, height: 630, alt: `${graduate.name} — Integrity Fitness Education graduate` }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${graduate.name}'s Story | Integrity Fitness Education`,
      description: graduate.quote,
      images: [ogImage],
    },
  };
}

export default async function GraduateStoryPage({ params }: PageProps) {
  const { slug } = await params;
  const graduate = getGraduateBySlug(slug);
  if (!graduate) notFound();

  return (
    <>
      <PageHero
        image={graduate.image}
        label={graduate.qualification}
        title={graduate.name}
        subtitle={graduate.role}
        overlayStrength="heavy"
      />

      <section className="bg-white py-20 md:py-28">
        <SectionWrapper>
          <GraduateStoryBody graduate={graduate} />
        </SectionWrapper>
      </section>

      <ReadyToStartCTA />
    </>
  );
}
