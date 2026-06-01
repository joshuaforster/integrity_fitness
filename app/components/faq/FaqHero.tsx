import PageHero from "@/app/components/ui/PageHero";
import { faqHero } from "@/app/content/faqs";

export default function FaqHero() {
  return (
    <PageHero
      image={faqHero.image}
      label={faqHero.label}
      title={faqHero.title}
      subtitle={faqHero.subtitle}
    />
  );
}
