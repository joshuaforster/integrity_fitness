import type { Metadata } from "next";
import FaqHero from "../components/faq/FaqHero";
import FaqAccordion from "../components/faq/FaqAccordion";
import FaqCTA from "../components/faq/FaqCTA";

export const metadata: Metadata = {
  title: "FAQs | Integrity Fitness Education",
  description: "Answers to common questions about our personal trainer courses — pricing, payment plans, accreditation, course structure, and how to get started in Norwich.",
  openGraph: {
    title: "Frequently Asked Questions | Integrity Fitness Education",
    description: "Common questions about our CIMSPA-accredited personal trainer courses in Norwich, Norfolk — pricing, structure, and enrolment.",
    url: "https://www.integrityfitnesseducation.co.uk/faq",
    siteName: "Integrity Fitness Education",
    locale: "en_GB",
    type: "website",
  },
};

export default function FAQ() {
  return (
    <>
      <FaqHero />
      <FaqAccordion />
      <FaqCTA />
    </>
  );
}
