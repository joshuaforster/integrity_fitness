import PageHero from "@/app/components/ui/PageHero";
import { contactHero } from "@/app/content/contact";

export default function ContactHero() {
  return (
    <PageHero
      image={contactHero.image}
      label={contactHero.label}
      title={contactHero.title}
      subtitle={contactHero.subtitle}
    />
  );
}
