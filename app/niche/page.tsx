import { Metadata } from "next";
import PageHero from "@/app/components/ui/PageHero";
import NicheFinder from "./NicheFinder";
import ReadyToStartCTA from "@/app/components/shared/ReadyToStartCTA";

export const metadata: Metadata = {
  title: "Find Your Fitness Niche | Integrity Fitness Education",
  description:
    "Answer 10 questions and discover the fitness niches you're genuinely best placed to dominate — including opportunities most PTs have never heard of.",
  alternates: {
    canonical: "https://www.integrityfitness.education/niche",
  },
  openGraph: {
    title: "Find Your Fitness Niche | Integrity Fitness Education",
    description:
      "Most PTs pick their niche by accident. This tool helps you pick it on purpose — matching your personality, background, and goals to 18 real fitness niches.",
    url: "https://www.integrityfitness.education/niche",
    siteName: "Integrity Fitness Education",
    locale: "en_GB",
    type: "website",
    images: [
      {
        url: "https://pub-6e6bb53af6c34756a861d2c0a8259e84.r2.dev/WhatsApp%20Image%202026-06-19%20at%2016.27.36.jpeg",
        width: 1200,
        height: 630,
        alt: "Find Your Fitness Niche — Integrity Fitness Education",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Find Your Fitness Niche | Integrity Fitness Education",
    description:
      "10 questions. 18 niches. Discover the opportunities most PTs never find.",
    images: [
      "https://pub-6e6bb53af6c34756a861d2c0a8259e84.r2.dev/WhatsApp%20Image%202026-06-19%20at%2016.27.36.jpeg",
    ],
  },
};

export default function NicheFinderPage() {
  return (
    <main className="bg-zinc-50">
      <PageHero
        image="https://pub-6e6bb53af6c34756a861d2c0a8259e84.r2.dev/WhatsApp%20Image%202026-06-19%20at%2016.27.36.jpeg"
        label="Niche Finder"
        title="Find Your Fitness Niche"
        subtitle="10 questions. 18 niches. Opportunities most PTs never discover."
        overlayStrength="heavy"
        size="sm"
      />
      <NicheFinder />
      <ReadyToStartCTA />
    </main>
  );
}
