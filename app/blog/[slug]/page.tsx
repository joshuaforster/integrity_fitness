import { notFound } from "next/navigation";
import { Metadata } from "next";
import { blogPosts, getBlogPostBySlug } from "@/app/content/blog";
import PageHero from "@/app/components/ui/PageHero";
import SectionWrapper from "@/app/components/ui/SectionWrapper";
import ReadyToStartCTA from "@/app/components/shared/ReadyToStartCTA";
import BlogPostCard from "@/app/components/blog/BlogPostCard";
import BlogShareButtons from "@/app/components/blog/BlogShareButtons";
import BlogNewsletter from "@/app/components/blog/BlogNewsletter";
import BlogPostBody from "./BlogPostBody";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return {};
  const ogImage = post.image ?? "https://pub-6e6bb53af6c34756a861d2c0a8259e84.r2.dev/TGG%20HALL%20ROAD/GYM-FLOOR-EXPLANATION-IFE-TGGNHR_003.jpg";
  return {
    title: `${post.title} | Integrity Fitness Education`,
    description: post.excerpt,
    authors: [{ name: post.author.name }],
    alternates: {
      canonical: `https://www.integrityfitnesseducation.co.uk/blog/${slug}`,
    },
    openGraph: {
      title: `${post.title} | Integrity Fitness Education`,
      description: post.excerpt,
      url: `https://www.integrityfitnesseducation.co.uk/blog/${slug}`,
      siteName: "Integrity Fitness Education",
      locale: "en_GB",
      type: "article",
      images: [{ url: ogImage, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | Integrity Fitness Education`,
      description: post.excerpt,
      images: [ogImage],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const related = blogPosts
    .filter((p) => p.slug !== slug)
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);

  const canonicalUrl = `https://www.integrityfitnesseducation.co.uk/blog/${slug}`;

  return (
    <>
      {/* Fixed share buttons — client component, desktop only */}
      <BlogShareButtons title={post.title} url={canonicalUrl} />

      <PageHero
        image={post.image}
        label={post.category}
        title={post.title}
        subtitle={post.excerpt}
        overlayStrength="heavy"
      />

      {/* Body */}
      <section className="bg-white pb-20 md:pb-28 pt-16 md:pt-20">
        <SectionWrapper>
          <BlogPostBody body={post.body} date={post.date} author={post.author} />
        </SectionWrapper>
      </section>

      {/* Newsletter opt-in */}
      <BlogNewsletter />

      {/* Related articles */}
      {related.length > 0 && (
        <section className="bg-zinc-50 texture-grid-light pb-20 md:pb-28 pt-16 md:pt-20">
          <SectionWrapper reveal>
            <p className="text-[#CE1A19] text-xs font-bold tracking-widest uppercase mb-10">
              Keep Reading
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {related.map((p, i) => (
                <BlogPostCard key={p.slug} post={p} index={i} />
              ))}
            </div>
          </SectionWrapper>
        </section>
      )}

      <ReadyToStartCTA />
    </>
  );
}
