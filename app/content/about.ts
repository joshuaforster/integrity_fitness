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
  subtitle: "Based in Norwich, Norfolk. You won't just gain a qualification. You'll build a career that lasts.",
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
  body: "Every course, every session, every interaction is shaped by the same clear values. This isn't just a business. It's a mission you're part of.",
} as const;

export const ourStorySection = {
  label: "The People Behind IFE",
  heading: "meet harry & paris",
  body: "Coached by people who are still on the gym floor every week. What they know, you'll know.",
  sharedImageAlt: "Harry and Paris, brother and sister, founders of Integrity Fitness Education",
} as const;

export const testimonialSection = {
  label: "From Our Graduates",
  quote: "I went from knowing nothing about fitness to running my own PT business within a year. The one-to-one format made all the difference. I actually felt prepared on day one.",
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
      "Every session is shaped around how you learn, at the pace that works for you. You're never just a name on a register.",
  },
  {
    title: "Norwich Fitness Infrastructure",
    description:
      "You'll train at a real, fully equipped gym in Norwich, building practical skills in the environment you'll actually work in.",
  },
  {
    title: "Sovereignty Over Your Time",
    description:
      "Your study fits around your life. Work full time, study part time, and move at whatever pace suits you.",
  },
  {
    title: "Continuous Career Access",
    description:
      "You stay connected to an active network of coaches and clients, giving you a real head start when you go it alone.",
  },
];

export const missionParagraphs = [
  "Since 2021, people across Norwich and Norfolk have left IFE not just with a qualification, but ready to actually use it. You build the confidence, the skills, and the career foundation from day one.",
  "Harry built IFE around one question: what gives you the best possible chance of building a career you love? Every decision since has been made with that answer in mind.",
];
