// ── Hero ──────────────────────────────────────────────────────────────────────

export const hero = {
  eyebrow: "Personal Training Course Provider | Norwich, Norfolk",
  heading: "Become The Personal Trainer You Wish You Had",
  body: "The fitness industry needs people like you. Here's how you make it happen.",
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
  "You don't need to look like a fitness model. You need to have been where your clients are. That's the coach we'll build together.",
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
      "You'll go from zero experience to fully qualified in one integrated programme, graduating with everything you need to work with real clients from day one.",
    href: "/qualifications/become-a-personal-trainer",
  },
  {
    title: "Level 2 Gym Instructor Certificate",
    description:
      "Your first step into the fitness industry. You'll leave qualified to work safely on any gym floor and run client inductions with confidence.",
    href: "/qualifications/level-2-gym-instructor",
  },
  {
    title: "Level 3 Personal Training Qualification",
    description:
      "Already hold a Level 2? This is where you become a personal trainer. You'll graduate with the skills, knowledge and qualification to start building your own client base.",
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
  "Learn 1:1, Never In A Crowd",
  "Taught By Coaches Who Still Coach",
  "Get Clients, Not Just A Cert",
  "Based In Norwich, Norfolk",
  "Real Experience, Not Just Theory",
  "Become The Coach You'd Want",
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
  heading: "Your body isn't your business card.",
  button: { label: "Step Up", href: "/contact" },
} as const;

export const qualificationsSection = {
  label: "Here's How",
  heading: "Find where you fit.",
  bodyIntro: "You don't need to have it all figured out.",
  bodyItems: [
    { question: "Starting from scratch?", answer: "The Diploma builds you up from nothing." },
    { question: "Already got your Level 2?", answer: "Level 3 is your next step." },
    { question: "Just need to get qualified and working?", answer: "Level 2 is enough." },
  ],
  bodyOutro: "Not sure yet? Give us a shout. No daft questions, no pressure.",
  cpdLabel: "Continued Professional Development",
  notSureBody: "Pick the course that fits where you are. We'll take it from there.",
  button1: { label: "See All Qualifications", href: "/qualifications" },
  button2: { label: "Get In Touch", href: "/contact" },
  viewCourse: "View Course",
  viewAllCPD: "View All CPD",
  courses: [
    {
      badge: "Most Popular" as string | null,
      level: "Level 2 & 3",
      title: "Combined Personal Training Diploma",
      body: "Walk in with nothing, walk out a fully qualified PT. It's the most direct route to coaching clients of your own.",
      href: "/qualifications/become-a-personal-trainer",
      cpd: false,
    },
    {
      badge: null as string | null,
      level: "Level 2",
      title: "Gym Instructor Certificate",
      body: "Your first foot in the door. You'll be ready to coach confidently on any gym floor, knowing exactly how to keep people safe.",
      href: "/qualifications/level-2-gym-instructor",
      cpd: false,
    },
    {
      badge: null as string | null,
      level: "Level 3",
      title: "Personal Training Qualification",
      body: "Already got your Level 2? This is where you become a personal trainer and start building clients of your own.",
      href: "/qualifications/level-3-personal-training",
      cpd: false,
    },
    {
      badge: null as string | null,
      level: "CPD",
      title: "Continued Professional Development",
      body: "Pick up specialist skills that let you say yes to more clients, and stand out from every other trainer in the room.",
      href: "/qualifications",
      cpd: true,
    },
  ],
} as const;

export const newsletterSection = {
  label: "Stay Updated",
  heading: "Join Our Newsletter",
  body: "Be the first to hear about new courses, industry tips, and career advice, delivered straight to your inbox.",
  nameLabel: "Your Name",
  namePlaceholder: "Your name",
  emailLabel: "Email Address",
  emailPlaceholder: "Email address",
  submitButton: "Subscribe",
  disclaimer: "No spam. Unsubscribe at any time.",
} as const;

export const locationSection = {
  label: "Find Us",
  heading: "Getting Here Is Simple.",
  body: "You've got a full day of learning ahead. The last thing you need is a stressful journey in.",
  addressLine1: "Complete Fitness Gym, Whiffler Road",
  addressLine2: "Norwich, Norfolk, NR3 2AW",
  directionsButton: "Get Directions",
  directionsHref: "https://www.google.com/maps?...",
  mapTitle: "Complete Fitness Gym Norwich, location map",
  mapCaption: "Complete Fitness Gym",
  mapAddress: "Whiffler Road · Norwich · NR3 2AW",
  practicalInfo: [
    { label: "Driving", detail: "Free on-site parking. Pull up, walk straight in." },
    { label: "Bus", detail: "Routes 26 & 27 stop on Whiffler Road — right outside the door." },
    { label: "Train", detail: "Norwich Station is an 18-minute walk or a 5-minute taxi ride." },
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
    src: "https://pub-6e6bb53af6c34756a861d2c0a8259e84.r2.dev/TGG%20Norwich/HARRY-PARIS-CLOE-2-20220124-IFE-TGGNCC010.jpg",
    alt: "Harry, Paris and Cloe training together Norwich",
  },
] as const;

export const missionCopy = [
  "Harry and Paris care about one thing: where you end up. Both have their own clients. So every session is built around real experience, the stuff that matters when you're standing in front of a paying client.",
  "We focus on what actually counts. Your client won't ask what the Sternocleidomastoid is, but they'll want to know they are doing a safe squat or deadlift. That's what you'll learn.",
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
    alt: "Harry Matthews, Lead Instructor at Integrity Fitness Education",
  },
  {
    label: "Norwich, Norfolk",
    title: "Get In Touch",
    cta: "Contact Us",
    href: "/contact",
    image: "https://pub-6e6bb53af6c34756a861d2c0a8259e84.r2.dev/General/paris.webp",
    alt: "Paris Matthews, Co-Founder at Integrity Fitness Education",
  },
];
