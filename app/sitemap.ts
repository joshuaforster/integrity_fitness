import type { MetadataRoute } from "next";
import { allBlogPosts } from "./content/blog";
import { graduates } from "./content/graduates";

const BASE = "https://www.integrityfitness.education";

const QUAL_SLUGS = [
  "become-a-personal-trainer",
  "level-2-gym-instructor",
  "level-3-personal-training",
  "mental-health-awareness",
  "pre-post-natal",
  "emergency-first-aid",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE, changeFrequency: "monthly", priority: 1 },
    { url: `${BASE}/about`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/qualifications`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/blog`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/graduates`, changeFrequency: "monthly", priority: 0.75 },
    { url: `${BASE}/gallery`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/faq`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/contact`, changeFrequency: "yearly", priority: 0.7 },
    { url: `${BASE}/shop`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/privacy-policy`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE}/terms`, changeFrequency: "yearly", priority: 0.3 },
    ...QUAL_SLUGS.map((slug) => ({
      url: `${BASE}/qualifications/${slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    })),
    ...allBlogPosts.map((post) => ({
      url: `${BASE}/blog/${post.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.65,
    })),
    ...graduates.map((grad) => ({
      url: `${BASE}/graduates/${grad.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}