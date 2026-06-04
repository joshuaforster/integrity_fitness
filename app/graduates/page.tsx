import GraduatesHero from "../components/graduates/GraduatesHero";
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
    images: [
      {
        url: "https://pub-6e6bb53af6c34756a861d2c0a8259e84.r2.dev/TGG%20HALL%20ROAD/GYM-FLOOR-EXPLANATION-IFE-TGGNHR_003.jpg",
        width: 1200,
        height: 630,
        alt: "Integrity Fitness Education graduates — qualified personal trainers",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Graduates | Integrity Fitness Education",
    description: "Meet the coaches who qualified with Integrity Fitness Education. Real people, real results.",
    images: ["https://pub-6e6bb53af6c34756a861d2c0a8259e84.r2.dev/TGG%20HALL%20ROAD/GYM-FLOOR-EXPLANATION-IFE-TGGNHR_003.jpg"],
  },
};

export default function GraduatesPage() {
  return (
    <>
      <GraduatesHero />
      <GraduateGrid />
      <GraduatesTestimonial />
      <ReadyToStartCTA />
    </>
  );
}
