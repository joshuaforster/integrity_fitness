import GraduatesHero from "../components/graduates/GraduatesHero";
import GraduatesStats from "../components/graduates/GraduatesStats";
import GraduateGrid from "../components/graduates/GraduateGrid";
import GraduatesTestimonial from "../components/graduates/GraduatesTestimonial";
import ReadyToStartCTA from "../components/shared/ReadyToStartCTA";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Graduates | Integrity Fitness Education",
  description: "Meet the coaches who qualified with Integrity Fitness Education. Real people, real results, and where they are now.",
  alternates: {
    canonical: "https://www.integrityfitnesseducation.co.uk/graduates",
  },
  openGraph: {
    title: "Our Graduates | Integrity Fitness Education",
    description: "Meet the coaches who qualified with Integrity Fitness Education. Real people, real results.",
    url: "https://www.integrityfitnesseducation.co.uk/graduates",
    siteName: "Integrity Fitness Education",
    locale: "en_GB",
    type: "website",
  },
};

export default function GraduatesPage() {
  return (
    <>
      <GraduatesHero />
      <GraduatesStats />
      <GraduateGrid />
      <GraduatesTestimonial />
      <ReadyToStartCTA />
    </>
  );
}
