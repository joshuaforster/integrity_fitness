import PageHero from "@/app/components/ui/PageHero";
import { aboutHero } from "@/app/content/about";

export default function AboutHero() {
  return (
    <PageHero
      image={aboutHero.image}
      label={aboutHero.label}
      title={aboutHero.title}
      subtitle={aboutHero.subtitle}
    />
  );
}
