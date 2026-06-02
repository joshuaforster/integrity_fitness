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
