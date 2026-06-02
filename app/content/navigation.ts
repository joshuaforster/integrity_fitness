// ── Footer content ────────────────────────────────────────────────────────────

export const footerContent = {
  brandCopy: "One-to-one fitness education in Norwich, Norfolk. CIMSPA accredited, Level 3 qualified, and built around you.",
  locationHeading: "Location",
  addressLine1: "Complete Fitness Gym",
  addressLine2: "Whiffler Road, Norwich",
  addressLine3: "Norfolk, NR3 2AW",
  copyright: "© 2026 Integrity Fitness Education Ltd. All rights reserved.",
  badge: "CIMSPA Accredited · Norwich, Norfolk",
  companyInfo: "Integrity Fitness Education Ltd · Company No. 13487683 · Registered office: 22 Oval Avenue, Norwich, England, NR5 0DP",
} as const;

export const footerNavQualifications = [
  { name: "Combined Level 2 & 3 Diploma", href: "/qualifications/become-a-personal-trainer" },
  { name: "Level 2 Gym Instructor", href: "/qualifications/level-2-gym-instructor" },
  { name: "Level 3 Personal Training", href: "/qualifications/level-3-personal-training" },
  { name: "Mental Health Awareness", href: "/qualifications/mental-health-awareness" },
  { name: "Pre & Post Natal", href: "/qualifications/pre-post-natal" },
  { name: "Emergency First Aid", href: "/qualifications/emergency-first-aid" },
] as const;

export const footerNavCompany = [
  { name: "About Us", href: "/about" },
  { name: "Our Graduates", href: "/graduates" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
  { name: "FAQ", href: "/faq" },
] as const;

export const footerNavLegal = [
  { name: "Privacy Policy", href: "/privacy-policy" },
  { name: "Terms & Conditions", href: "/terms" },
] as const;

// ── Header navigation ─────────────────────────────────────────────────────────

export type NavLink = {
  name: string;
  href: string;
};

export type QualCourse = {
  name: string;
  href: string;
};

export type QualCategory = {
  title: string;
  courses: readonly QualCourse[];
};

export const navLinks: readonly NavLink[] = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Graduates", href: "/graduates" },
  { name: "Blog", href: "/blog" },
  { name: "FAQ", href: "/faq" },
  { name: "Contact Us", href: "/contact" },
];

export const qualCategories: readonly QualCategory[] = [
  {
    title: "Become A Personal Trainer",
    courses: [
      { name: "Combined Level 2 & 3 Personal Training Diploma", href: "/qualifications/become-a-personal-trainer" },
      { name: "Level 2 Gym Instructor Certificate", href: "/qualifications/level-2-gym-instructor" },
      { name: "Level 3 Personal Training Qualification", href: "/qualifications/level-3-personal-training" },
    ],
  },
  {
    title: "Continued Professional Development",
    courses: [
      { name: "Level 2 Award in Mental Health Awareness", href: "/qualifications/mental-health-awareness" },
      { name: "Level 3 Award in Supporting Pre & Post Natal Clients", href: "/qualifications/pre-post-natal" },
      { name: "Level 3 Award in Emergency First Aid at Work", href: "/qualifications/emergency-first-aid" },
    ],
  },
];
