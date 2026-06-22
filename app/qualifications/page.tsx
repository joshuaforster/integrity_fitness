import { Metadata } from "next";
import PageHero from "@/app/components/ui/PageHero";
import CPD from "./CPD";
import ReadyToStartCTA from "@/app/components/shared/ReadyToStartCTA";

import GraduateVoice from "./graduateVoice";
import CareerGuide from "./careerGuide";

export const metadata: Metadata = {
  title: "Qualifications | Integrity Fitness Education",
  description:
    "Browse all CIMSPA-accredited personal training and CPD qualifications from Integrity Fitness Education in Norwich, Norfolk.",
  alternates: {
    canonical: "https://www.integrityfitnesseducation.co.uk/qualifications",
  },
  openGraph: {
    title: "Qualifications | Integrity Fitness Education",
    description: "Browse all CIMSPA-accredited personal training and CPD qualifications from Integrity Fitness Education in Norwich, Norfolk.",
    url: "https://www.integrityfitnesseducation.co.uk/qualifications",
    siteName: "Integrity Fitness Education",
    locale: "en_GB",
    type: "website",
    images: [
      {
        url: "https://pub-6e6bb53af6c34756a861d2c0a8259e84.r2.dev/TGG%20HALL%20ROAD/GYM-FLOOR-EXPLANATION-IFE-TGGNHR_003.jpg",
        width: 1200,
        height: 630,
        alt: "Personal training qualifications at Integrity Fitness Education Norwich",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Qualifications | Integrity Fitness Education",
    description: "Browse all CIMSPA-accredited personal training and CPD qualifications from Integrity Fitness Education in Norwich, Norfolk.",
    images: ["https://pub-6e6bb53af6c34756a861d2c0a8259e84.r2.dev/TGG%20HALL%20ROAD/GYM-FLOOR-EXPLANATION-IFE-TGGNHR_003.jpg"],
  },
};


export default function QualificationsPage() {
  return (
    <main className="bg-zinc-50">
      <PageHero
        image="https://pub-6e6bb53af6c34756a861d2c0a8259e84.r2.dev/TGG%20HALL%20ROAD/GYM-FLOOR-EXPLANATION-IFE-TGGNHR_003.jpg"
        label="Qualifications"
        title="Qualifications"
        subtitle="One-to-one coaching education, built around you and the career you're working towards."
      />

      <CareerGuide />

      {/* 2. Graduate voices */}
      <GraduateVoice />


      <CPD />
      {/* 4. Bottom CTA */}
      <ReadyToStartCTA />
    </main>
  );
}
