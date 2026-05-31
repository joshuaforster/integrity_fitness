// ── Stats bar ─────────────────────────────────────────────────────────────────

export type AboutStat =
  | { type: "text"; value: string; label: string }
  | { type: "image"; src: string; alt: string; width: number; height: number; label: string };

export const aboutStats: AboutStat[] = [
  { type: "text", value: "1:1", label: "Personalised Tuition" },
  { type: "image", src: "https://pub-6e6bb53af6c34756a861d2c0a8259e84.r2.dev/General/activeiq.png", alt: "Active IQ", width: 130, height: 28, label: "Approved Centre" },
  { type: "image", src: "https://pub-6e6bb53af6c34756a861d2c0a8259e84.r2.dev/cimspa-logo-navy-box%20copy.png", alt: "CIMSPA", width: 130, height: 28, label: "Accredited Partner" },
];

// ── Page hero ─────────────────────────────────────────────────────────────────

export const aboutHero = {
  label: "Integrity Fitness Education",
  title: "The ife team",
  subtitle: "Based in Norwich, Norfolk — we don't just teach qualifications. We build careers that last.",
  image: "https://pub-6e6bb53af6c34756a861d2c0a8259e84.r2.dev/Godigital%20grant%20-%20Revel/Revel%20Studios%20IFE-8.jpg",
} as const;

// ── Section copy ──────────────────────────────────────────────────────────────

export const aboutMissionSection = {
  label: "Our Mission",
  heading: "Education That Actually Changes Your Life.",
  differentiatorLabel: "What Sets Us Apart",
  button: { label: "View Qualifications", href: "/qualifications" },
} as const;

export const valuesSection = {
  label: "What We Stand For",
  heading: "Proven Principles. Tried & Tested Results.",
  body: "At Integrity, we operate with a clear set of values that shape every course, every session, and every interaction with our students. This isn't just a business — it's a mission.",
} as const;

export const ourStorySection = {
  label: "The People Behind IFE",
  heading: "meet harry & paris",
  body: "Built on passion, driven by integrity. Two coaches who love what they do.",
  sharedImageAlt: "Harry and Paris, brother and sister, founders of Integrity Fitness Education",
} as const;

export const testimonialSection = {
  label: "From Our Graduates",
  quote: "I went from knowing nothing about fitness to running my own PT business within a year. The one-to-one format made all the difference — I actually felt prepared on day one.",
  name: "Jamie T.",
  role: "2024 Graduate",
} as const;

// ── Differentiators ───────────────────────────────────────────────────────────

export type Differentiator = {
  title: string;
  description: string;
};

export const differentiators: Differentiator[] = [
  {
    title: "1:1 Dedicated Mentorship",
    description:
      "No crowded classrooms or generic online modules. Your learning architecture is calibrated entirely around you.",
  },
  {
    title: "Norwich Fitness Infrastructure",
    description:
      "Rooted in Norfolk, training in-person at a premier local facility. Built directly for our regional health community.",
  },
  {
    title: "Sovereignty Over Your Time",
    description:
      "Engineered completely around your current work commitments, personal schedule, and natural learning velocity.",
  },
  {
    title: "Continuous Career Access",
    description:
      "An active professional network that supports your commercial lead generation long after your diploma wraps.",
  },
];

export const missionParagraphs = [
  "Since 2021, Integrity Fitness Education has been rewriting the rules of personal training education in Norwich, Norfolk. Where others offer courses, we offer transformation — the kind that sticks.",
  "Harry founded IFE after seeing firsthand how impersonal and inadequate the standard fitness education model was. Every decision since has been made with one question in mind: what gives our students the best possible chance of building a career they love?",
];
