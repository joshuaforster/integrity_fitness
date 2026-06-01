// ── Stats bar ─────────────────────────────────────────────────────────────────

export type AboutStat =
  | { type: "text"; value: string; label: string }
  | { type: "image"; src: string; alt: string; width: number; height: number; label: string };

export const aboutStats: AboutStat[] = [
  { type: "text", value: "1:1", label: "Personalised Tuition" },
];

// ── Page hero ─────────────────────────────────────────────────────────────────

export const aboutHero = {
  label: "Integrity Fitness Education",
  title: "The IFE Team",
  subtitle: "Fitness changed your life. Now you can help others find the same. We have a qualification built around where you are starting from.",
  image: "https://pub-6e6bb53af6c34756a861d2c0a8259e84.r2.dev/Godigital%20grant%20-%20Revel/Revel%20Studios%20IFE-8.jpg",
} as const;

// ── Section copy ──────────────────────────────────────────────────────────────

export const aboutMissionSection = {
  label: "Our Mission",
  heading: "Your Eagerness Is Enough.",
  differentiatorLabel: "What You Get",
  button: { label: "View Qualifications", href: "/qualifications" },
} as const;

export const valuesSection = {
  label: "What We Stand For",
  heading: "Values That Don't Move.",
  body: "Every session and every conversation is shaped by the same three things. This is what you can always count on.",
} as const;

export const ourStorySection = {
  label: "The People Behind IFE",
  heading: "meet harry & paris",
  body: "Brother and sister. Both started where you are now. Both know what fitness can do for a person. They built IFE to give you the best possible start.",
  sharedImageAlt: "Harry and Paris, founders of Integrity Fitness Education",
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
    title: "Just You and Your Tutor",
    description:
      "Every session is built around how you learn. Full attention. Your pace. Always.",
  },
  {
    title: "Train in a Real Gym",
    description:
      "You train in a fully-equipped gym in Norwich. The same space you will work in when you qualify.",
  },
  {
    title: "Study Around Your Life",
    description:
      "Work full time. Study part time. Flexible from day one. It fits your life.",
  },
  {
    title: "Still Here When You Qualify",
    description:
      "When you qualify, you stay connected. A real network of coaches and clients. A proper head start.",
  },
];

// ── Where they differ ─────────────────────────────────────────────────────────

export const whereTheyDiffer = {
  label: "The People Behind It",
  heading: "Same Team. Different Minds.",
  intro:
    "On the things that matter, good coaching, treating people with respect, they are completely aligned. After that, they are just two different people. And that is fine.",
  harry: {
    name: "Harry",
    photo:
      "/images/HARRY-GYM-FLOOR- 5-20220124-IFE-TGGNCC046.jpg",
    rows: {
      "Pre-workout": "Double espresso. Won't start without one.",
      "How they coach": "A plan, written down, followed.",
      "Rest days": "Basketball and a book.",
      "Form check": "Films every set. Watches it back twice.",
      "Favourite lift": "Deadlifts. Nothing else comes close.",
      "On the menu": "Could eat sushi every day. Not up for debate.",
      "Drinks order": "Coke Zero. Diet Coke tastes like it's trying too hard.",
      "Cardio": "Reckons cardio is a means to an end, not the point.",
      "Better coach?": "Me, obviously. I'll never let you cut a corner.",
      "Growing up": "Used to time Paris on the track at family barbecues. Gave her feedback. She was nine.",
      "Biggest falling out": "She changed the channel during the playoffs. Still not over it.",
    },
  },
  paris: {
    name: "Paris",
    photo: "/images/20230329-IFE-CF_050.JPG",
    rows: {
      "Pre-workout": "Has a coffee. Doesn't make it a personality.",
      "How they coach": "Reads the room. Adjusts to the day.",
      "Rest days": "Still moving, just lighter.",
      "Form check": "Trusts her eye. Usually right.",
      "Favourite lift": "Give her a good squat session over deadlifts any day.",
      "On the menu": "Raw fish. No thank you. She'll have the same but cooked.",
      "Drinks order": "Diet Coke. Coke Zero tastes like regret.",
      "Cardio": "Thinks a session without some cardio is half a session.",
      "Better coach?": "Me. Clearly. I actually listen. He just talks louder.",
      "Growing up": "Made him sit through her favourite shows. He complained the whole time. Never missed an episode.",
      "Biggest falling out": "It was a rerun. He knew it was a rerun.",
    },
  },
  rivalry: {
    heading: "And The Big One",
    question: "Who's the better coach?",
    harry: {
      pick: "Me, obviously.",
      why: "I'll never let you cut a corner. You'll thank me later.",
    },
    paris: {
      pick: "Me. Clearly.",
      why: "I actually listen. He just talks louder.",
    },
  },
  closing:
    "They'll let you decide that one yourself. You don't have to copy either of them. You'll find your own way, and that's the whole point.",
} as const;

// ─────────────────────────────────────────────────────────────────────────────

export const missionParagraphs = [
  "You already know what it feels like to be changed by fitness. That lived experience is exactly what the industry needs more of.",
  "Every person who qualifies with us brings something different. A background, a story, a perspective the industry does not yet have. Your role is to be the coach your past self would have wanted. That makes you a perfect fit.",
];
