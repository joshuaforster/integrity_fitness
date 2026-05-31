// ── Hero ──────────────────────────────────────────────────────────────────────

export const hero = {
  eyebrow: "Integrity Fitness Education · Norwich, Norfolk · Est. 2021",
  heading: "Become The Personal Trainer You Wish You Had",
  body: "The fitness industry needs people like you. We're here to make that happen.",
  primaryButton: { label: "Become A Personal Trainer", href: "/qualifications/become-a-personal-trainer" },
  secondaryButton: { label: "Meet Harry & Paris", href: "/about#our-story" },
  videoSrc: "https://pub-6e6bb53af6c34756a861d2c0a8259e84.r2.dev/Integrity%2016-9.mp4",
} as const;
// Replace 30/05/26 heading: "Raising The Standards Of Personal Training Qualifications",
// Hero ideas Become The Personal Trainer You Wish You'd Had

export type HeroStat =
  | { type: "text"; value: string; label: string }
  | { type: "image"; value: string; label: string; width: number; height: number; alt: string };

export const heroStats: HeroStat[] = [
  { type: "image", value: "https://pub-6e6bb53af6c34756a861d2c0a8259e84.r2.dev/General/activeiq.png", label: "Qualified", width: 1024, height: 219, alt: "Active IQ" },
  { type: "image", value: "https://pub-6e6bb53af6c34756a861d2c0a8259e84.r2.dev/cimspa-logo-navy-box%20copy.png", label: "Accredited", width: 1580, height: 2720, alt: "CIMSPA" },
  { type: "text", value: "PTs by Trade", label: "Teachers by Choice" }
];

// ── Stats section ─────────────────────────────────────────────────────────────

export const ESTABLISHED_YEAR = 2021;
export const TEACHING_SINCE_YEAR = 2015;

export type StatsSectionImage = {
  type: "image";
  src: string;
  alt: string;
  width: number;
  height: number;
  label: string;
  containerClass: string;
};

export const statsAccreditations: StatsSectionImage[] = [
  { type: "image", src: "https://pub-6e6bb53af6c34756a861d2c0a8259e84.r2.dev/General/activeiq.png", alt: "Active IQ", width: 136, height: 29, label: "Approved Centre", containerClass: "h-16 w-16" },
  { type: "image", src: "https://pub-6e6bb53af6c34756a861d2c0a8259e84.r2.dev/cimspa-logo-navy-box%20copy.png", alt: "CIMSPA", width: 136, height: 136, label: "Accredited Partner", containerClass: "h-16 w-16" },
];

export const statsCopy = [
  "The best coaches are relatable. They've been where their clients are and that's exactly the kind of coach you're going to become",
];
// ── Course listings ───────────────────────────────────────────────────────────

export type MainCourse = {
  title: string;
  description: string;
  href: string;
};

export type CPDCourse = {
  title: string;
  href: string;
};

export const mainCourses: MainCourse[] = [
  {
    title: "Combined Level 2 & 3 Personal Training Diploma",
    description:
      "The fast-track ultimate industry standard. Everything you need to launch a fully accredited personal training career from zero experience.",
    href: "/qualifications/become-a-personal-trainer",
  },
  {
    title: "Level 2 Gym Instructor Certificate",
    description:
      "The essential foundational step into fitness coaching. Qualify to manage gym floors and lead group fitness inductions safely.",
    href: "/qualifications/level-2-gym-instructor",
  },
  {
    title: "Level 3 Personal Training Qualification",
    description:
      "Already hold a Level 2? Elevate your skill architecture, master advanced exercise programming, and open your client roster.",
    href: "/qualifications/level-3-personal-training",
  },
];

export const cpdCourses: CPDCourse[] = [
  { title: "Level 2 Award in Mental Health Awareness", href: "/qualifications/mental-health-awareness" },
  { title: "Level 3 Award in Supporting Pre & Post Natal Clients", href: "/qualifications/pre-post-natal" },
  { title: "Level 3 Award in Emergency First Aid at Work", href: "/qualifications/emergency-first-aid" },
];

// ── Marquee ───────────────────────────────────────────────────────────────────

export const marqueeItems = [
  "CIMSPA Accredited",
  "1:1 Learning",
  "Active IQ",
  "Norwich, Norfolk",
  "Real Results",
  "Industry Leading",
  "Career Ready",
] as const;

// ── Section copy ──────────────────────────────────────────────────────────────

export const missionSection = {
  label: "The Approach",
  heading: "Your Starting Point Doesn't Matter. Your Output Does.",
  body: "Harry and Paris don't teach theory for the sake of it. Every session is built around what actually works on the gym floor, so when you qualify, you're ready to work with real clients from day one.",
  button: { label: "Meet Harry & Paris", href: "/about" },
} as const;

export const statsSection = {
  label: "The Mission",
  heading: "The Industry Needs Better Coaches. Become One.",
  button: { label: "Step Up", href: "/contact" },
} as const;

export const qualificationsSection = {
  label: "Here's How",
  heading: "Find where you fit.",
  body: "New to fitness, partway there, or already qualified? Wherever you're starting from, we've got you covered.",
  cpdLabel: "Continued Professional Development",
  notSureBody: "Pick the course that fits where you are — we'll take it from there.",
  button1: { label: "See All Qualifications", href: "/qualifications" },
  button2: { label: "Get In Touch", href: "/contact" },
  viewCourse: "View Course",
  viewAllCPD: "View All CPD",
  courses: [
    {
      badge: "Most Popular" as string | null,
      level: "Level 2 & 3",
      title: "Combined Personal Training Diploma",
      body: "Zero to fully qualified PT in one integrated programme — the most direct route into a personal training career.",
      href: "/qualifications/become-a-personal-trainer",
      cpd: false,
    },
    {
      badge: null as string | null,
      level: "Level 2",
      title: "Gym Instructor Certificate",
      body: "The industry-standard first step. Qualify to instruct on any gym floor safely and professionally.",
      href: "/qualifications/level-2-gym-instructor",
      cpd: false,
    },
    {
      badge: null as string | null,
      level: "Level 3",
      title: "Personal Training Qualification",
      body: "Already have a Level 2? This is where you become a personal trainer and open your client roster.",
      href: "/qualifications/level-3-personal-training",
      cpd: false,
    },
    {
      badge: null as string | null,
      level: "CPD",
      title: "Continued Professional Development",
      body: "Specialist short courses to expand your skills and serve a wider range of clients.",
      href: "/qualifications",
      cpd: true,
    },
  ],
} as const;

export const newsletterSection = {
  label: "Stay Updated",
  heading: "Join Our Newsletter",
  body: "Be the first to hear about new courses, industry tips, and career advice straight from our qualified trainers.",
  nameLabel: "Your Name",
  namePlaceholder: "Your name",
  emailLabel: "Email Address",
  emailPlaceholder: "Email address",
  submitButton: "Subscribe",
  disclaimer: "No spam. Unsubscribe at any time.",
} as const;

export const locationSection = {
  label: "Find Us",
  heading: "Based At Complete Fitness Gym, Norwich",
  body: "Our courses are delivered in person at Complete Fitness Gym on Whiffler Road, a fully equipped facility with everything you need to train and qualify properly.",
  addressLine1: "Complete Fitness Gym, Whiffler Road",
  addressLine2: "Norwich, Norfolk, NR3 2AW",
  directionsButton: "Get Directions",
  directionsHref: "https://www.google.com/maps?...",
  mapTitle: "Complete Fitness Gym Norwich — location map",
  mapCaption: "Complete Fitness Gym",
  mapAddress: "Whiffler Road · Norwich · NR3 2AW",
  practicalInfo: [
    { label: "Parking", detail: "Free on-site parking available" },
    { label: "Bus", detail: "Routes 26 & 27 stop on Whiffler Road" },
    { label: "Train", detail: "15 mins from Norwich Station by bus or taxi" },
  ],
} as const;

// ── Mission section ───────────────────────────────────────────────────────────

export const missionImages = [
  {
    src: "https://pub-6e6bb53af6c34756a861d2c0a8259e84.r2.dev/Godigital%20grant%20-%20Revel/Revel%20Studios%20IFE-4.jpg",
    alt: "Students enjoying a personal training session together",
  },
  {
    src: "https://pub-6e6bb53af6c34756a861d2c0a8259e84.r2.dev/TGG%20HALL%20ROAD/HARRY-AND-PARIS-IFE-TGGNHR_026.jpg",
    alt: "Harry and Paris personal training session",
  },
  {
    src: "https://pub-6e6bb53af6c34756a861d2c0a8259e84.r2.dev/TGG%20Norwich/HARRY-AND-PARIS-20220124-IFE-TGGNCC002.jpg",
    alt: "Harry and Paris personal training Norwich",
  },
  {
    src: "https://pub-6e6bb53af6c34756a861d2c0a8259e84.r2.dev/TGG%20Norwich/HARRY-PARIS-CLOE-2-20220124-IFE-TGGNCC010.jpg",
    alt: "Harry, Paris and Cloe training together Norwich",
  },
  {
    src: "https://pub-6e6bb53af6c34756a861d2c0a8259e84.r2.dev/TGG%20HALL%20ROAD/GYM-FLOOR%20EDUCATION-IFE-TGGNHR_008.jpg",
    alt: "Learners practising on the gym floor",
  },
  {
    src: "https://pub-6e6bb53af6c34756a861d2c0a8259e84.r2.dev/TGG%20Norwich/HARRY-GYM-FLOOR-20220124-IFE-TGGNCC004.jpg",
    alt: "Harry coaching on the gym floor Norwich",
  },
] as const;

export const missionCopy = [
  "Harry and Paris care about one thing, where you end up. Every session is built around real gym floor experience, the stuff that matters when you're standing in front of a paying client.",
  "Both Harry and Paris have their own clients and are on the gym floor most days. The experience they bring goes further than any textbook."
];

// ── CTA panels ────────────────────────────────────────────────────────────────

export type CTAPanelData = {
  label: string;
  title: string;
  cta: string;
  href: string;
  image: string;
  alt: string;
};

export const ctaPanels: CTAPanelData[] = [
  {
    label: "Est. 2021",
    title: "Who Are We?",
    cta: "About Us",
    href: "/about",
    image: "https://pub-6e6bb53af6c34756a861d2c0a8259e84.r2.dev/General/harry.webp",
    alt: "Harry Matthews — Lead Instructor at Integrity Fitness Education",
  },
  {
    label: "Norwich, Norfolk",
    title: "Get In Touch",
    cta: "Contact Us",
    href: "/contact",
    image: "https://pub-6e6bb53af6c34756a861d2c0a8259e84.r2.dev/General/paris.webp",
    alt: "Paris Matthews — Co-Founder at Integrity Fitness Education",
  },
];
