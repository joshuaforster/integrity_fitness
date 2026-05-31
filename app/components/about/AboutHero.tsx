import PageHero from "@/app/components/ui/PageHero";
import { aboutHero } from "@/app/content/about";

export default function AboutHero() {
  return (
    <PageHero
      images={[aboutHero.image]}
      label={aboutHero.label}
      title={aboutHero.title}
      subtitle={aboutHero.subtitle}
      minHeight="55vh"
      interval={7000}
    />
  );
}
