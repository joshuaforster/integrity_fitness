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
    canonical: "https://www.integrityfitnesseducation.co.uk/blog",
  },
  openGraph: {
    title: "Blog | Integrity Fitness Education",
    description: "Advice, perspectives, and real stories from the world of fitness education.",
    url: "https://www.integrityfitnesseducation.co.uk/blog",
    siteName: "Integrity Fitness Education",
    locale: "en_GB",
    type: "website",
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
