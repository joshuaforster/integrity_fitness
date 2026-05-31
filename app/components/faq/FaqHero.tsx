import PageHero from "@/app/components/ui/PageHero";
import { faqHero } from "@/app/content/faqs";

export default function FaqHero() {
  return (
    <PageHero
      images={[...faqHero.images]}
      label={faqHero.label}
      title={faqHero.title}
      subtitle={faqHero.subtitle}
      minHeight="60vh"
      interval={6500}
    />
  );
}
