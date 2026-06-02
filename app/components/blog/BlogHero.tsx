import PageHero from "@/app/components/ui/PageHero";
import { blogHero } from "@/app/content/blog";

export default function BlogHero() {
  return (
    <PageHero
      image={blogHero.image}
      label={blogHero.label}
      title={blogHero.title}
      subtitle={blogHero.subtitle}
    />
  );
}
