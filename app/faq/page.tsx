import type { Metadata } from "next";
import FaqHero from "../components/faq/FaqHero";
import FaqAccordion from "../components/faq/FaqAccordion";
import FaqCTA from "../components/faq/FaqCTA";
import { faqs } from "../content/faqs";

export const metadata: Metadata = {
  title: "FAQs | Integrity Fitness Education",
  description: "Answers to common questions about our personal trainer courses — pricing, payment plans, accreditation, course structure, and how to get started in Norwich.",
  alternates: {
    canonical: "https://www.integrityfitnesseducation.co.uk/faq",
  },
  openGraph: {
    title: "Frequently Asked Questions | Integrity Fitness Education",
    description: "Common questions about our CIMSPA-accredited personal trainer courses in Norwich, Norfolk — pricing, structure, and enrolment.",
    url: "https://www.integrityfitnesseducation.co.uk/faq",
    siteName: "Integrity Fitness Education",
    locale: "en_GB",
    type: "website",
    images: [
      {
        url: "https://pub-6e6bb53af6c34756a861d2c0a8259e84.r2.dev/TGG%20HALL%20ROAD/GYM-FLOOR-EXPLANATION-IFE-TGGNHR_003.jpg",
        width: 1200,
        height: 630,
        alt: "Integrity Fitness Education FAQ — personal trainer courses Norwich",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Frequently Asked Questions | Integrity Fitness Education",
    description: "Common questions about our CIMSPA-accredited personal trainer courses in Norwich, Norfolk — pricing, structure, and enrolment.",
    images: ["https://pub-6e6bb53af6c34756a861d2c0a8259e84.r2.dev/TGG%20HALL%20ROAD/GYM-FLOOR-EXPLANATION-IFE-TGGNHR_003.jpg"],
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.flatMap((group) =>
    group.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    }))
  ),
};

export default function FAQ() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <FaqHero />
      <FaqAccordion />
      <FaqCTA />
    </>
  );
}
