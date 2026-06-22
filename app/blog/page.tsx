import BlogHero from "../components/blog/BlogHero";
import FeaturedPost from "../components/blog/FeaturedPost";
import BlogGrid from "../components/blog/BlogGrid";
import ReadyToStartCTA from "../components/shared/ReadyToStartCTA";
import { blogPosts } from "../content/blog";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Integrity Fitness Education",
  description: "Advice, perspectives, and real stories from the world of fitness education. Read insights from the IFE team.",
  alternates: {
    canonical: "https://www.integrityfitness.education/blog",
  },
  openGraph: {
    title: "Blog | Integrity Fitness Education",
    description: "Advice, perspectives, and real stories from the world of fitness education.",
    url: "https://www.integrityfitness.education/blog",
    siteName: "Integrity Fitness Education",
    locale: "en_GB",
    type: "website",
    images: [
      {
        url: "https://pub-6e6bb53af6c34756a861d2c0a8259e84.r2.dev/TGG%20HALL%20ROAD/GYM-FLOOR-EXPLANATION-IFE-TGGNHR_003.jpg",
        width: 1200,
        height: 630,
        alt: "Integrity Fitness Education blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Integrity Fitness Education",
    description: "Advice, perspectives, and real stories from the world of fitness education.",
    images: ["https://pub-6e6bb53af6c34756a861d2c0a8259e84.r2.dev/TGG%20HALL%20ROAD/GYM-FLOOR-EXPLANATION-IFE-TGGNHR_003.jpg"],
  },
};

export default function BlogPage() {
  const [featured, ...rest] = blogPosts;

  return (
    <>
      <BlogHero />
      <FeaturedPost post={featured} />
      <BlogGrid posts={rest} />
      <ReadyToStartCTA />
    </>
  );
}
