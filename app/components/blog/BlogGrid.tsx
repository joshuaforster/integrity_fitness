import SectionWrapper from "@/app/components/ui/SectionWrapper";
import SectionHeader from "@/app/components/ui/SectionHeader";
import BlogPostCard from "./BlogPostCard";
import type { BlogPost } from "@/app/content/blog";

export default function BlogGrid({ posts }: { posts: BlogPost[] }) {
  let gridLayout = "grid-cols-1 md:grid-cols-2 xl:grid-cols-3";

  if (posts.length < 3) {
    gridLayout = "grid-cols-1 md:grid-cols-2";
  }

  return (
    <section className="bg-zinc-50 texture-grid-light py-20 md:py-28">
      <SectionWrapper reveal>
        <SectionHeader
          label="All Posts"
          heading="From The Archive."
          headingSize="md"
        />

        <div className={`mt-12 grid gap-10 ${gridLayout}`}>
          {posts.map((post, i) => (
            <BlogPostCard key={post.slug} post={post} index={i} />
          ))}
        </div>
      </SectionWrapper>
    </section>
  );
}
