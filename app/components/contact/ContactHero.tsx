import PageHero from "@/app/components/ui/PageHero";
import { contactHero } from "@/app/content/contact";

export default function ContactHero() {
  return (
    <PageHero
      images={[...contactHero.images]}
      label={contactHero.label}
      title={contactHero.title}
      subtitle={contactHero.subtitle}
      minHeight="55vh"
      interval={7000}
    />
  );
}
