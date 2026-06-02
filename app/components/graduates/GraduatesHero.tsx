import PageHero from "@/app/components/ui/PageHero";
import { graduatesHero } from "@/app/content/graduates";

export default function GraduatesHero() {
  return (
    <PageHero
      image={graduatesHero.image}
      label={graduatesHero.label}
      title={graduatesHero.title}
      subtitle={graduatesHero.subtitle}
    />
  );
}
