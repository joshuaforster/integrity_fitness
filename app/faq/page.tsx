import FaqHero from "../components/faq/FaqHero";
import FaqAccordion from "../components/faq/FaqAccordion";
import FaqCTA from "../components/faq/FaqCTA";

export const metadata = {
  title: "FAQs | Integrity Fitness Education",
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
