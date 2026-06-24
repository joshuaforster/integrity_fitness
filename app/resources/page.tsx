import { Metadata } from "next";
import PageHero from "@/app/components/ui/PageHero";
import TrainingTools from "./TrainingTools";
import BusinessTools from "./BusinessTools";
import ReadyToStartCTA from "@/app/components/shared/ReadyToStartCTA";

export const metadata: Metadata = {
  title: "Tools & Calculators | Integrity Fitness Education",
  description:
    "Free fitness calculators for personal trainers and clients. BMI, TDEE, protein, strength and income tools — no sign-up required.",
  alternates: {
    canonical: "https://www.integrityfitness.education/resources",
  },
  openGraph: {
    title: "Tools & Calculators | Integrity Fitness Education",
    description:
      "Free fitness calculators for personal trainers and clients. BMI, TDEE, protein, strength and income tools.",
    url: "https://www.integrityfitness.education/resources",
    siteName: "Integrity Fitness Education",
    locale: "en_GB",
    type: "website",
    images: [
      {
        url: "https://pub-6e6bb53af6c34756a861d2c0a8259e84.r2.dev/WhatsApp%20Image%202026-06-19%20at%2016.27.36.jpeg",
        width: 1200,
        height: 630,
        alt: "Free fitness tools from Integrity Fitness Education",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tools & Calculators | Integrity Fitness Education",
    description:
      "Free fitness calculators for personal trainers and clients.",
    images: [
      "https://pub-6e6bb53af6c34756a861d2c0a8259e84.r2.dev/WhatsApp%20Image%202026-06-19%20at%2016.27.36.jpeg",
    ],
  },
};

export default function ResourcesPage() {
  return (
    <main className="bg-zinc-50">
      <PageHero
        image="https://pub-6e6bb53af6c34756a861d2c0a8259e84.r2.dev/WhatsApp%20Image%202026-06-19%20at%2016.27.36.jpeg"
        label="Resources"
        title="Tools & Calculators"
        subtitle="Free tools built for personal trainers and the clients they work with. No sign-up required."
        overlayStrength="heavy"
      />

      <TrainingTools />
      <BusinessTools />
      <ReadyToStartCTA />
    </main>
  );
}
