import type { MetadataRoute } from "next";

const BASE = "https://www.integrityfitnesseducation.co.uk";

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
    { url: `${BASE}/gallery`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/faq`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/contact`, changeFrequency: "yearly", priority: 0.7 },
    ...QUAL_SLUGS.map((slug) => ({
      url: `${BASE}/qualifications/${slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    })),
  ];
}
