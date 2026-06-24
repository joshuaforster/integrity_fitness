// ── Stats bar ─────────────────────────────────────────────────────────────────

export type AboutStat =
  | { type: "text"; value: string; label: string }
  | { type: "image"; src: string; alt: string; width: number; height: number; label: string };

export const aboutStats: AboutStat[] = [
  { type: "text", value: "1:1", label: "Personalised Tuition" },
];

// ── Page hero ─────────────────────────────────────────────────────────────────

export const aboutHero = {
  label: "About",
  title: "The IFE Team",
  subtitle: "Fitness changed your life. Now you can help others find the same. We have a qualification built around where you are starting from.",
  image: "/images/HARRY-AND-PARIS-MATTHEWS-20220124-IFE-TGGNCC003.jpg",
} as const;

// ── Section copy ──────────────────────────────────────────────────────────────

export const aboutMissionSection = {
  label: "Our Mission",
  heading: "THE INDUSTRY NEEDS BETTER COACHES. BECOME ONE.",
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
  quote: "Both Paris and Harry were amazing when it came to helping me to complete my Level 3 Personal Training qualification. They always made sure to answer any questions I had and made an effort to reach out and speak to me one on one about my progress.",
  name: "Poppy Hawkins",
  role: "Level 3 Graduate",
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
    photo: "/images/HARRY-PHONE-20220124-IFE-TGGNCC033.jpg",
    rows: {
      "Pre-workout": "Double espresso. Won't start without one.",
      "How they coach": "A plan, written down, followed.",
      "Rest days": "Basketball in season. Board games or Magic: The Gathering the rest of the time. He calls it rest. It still involves a strategy.",
      "Form check": "Films every set. Watches it back twice.",
      "Favourite lift": "Deadlifts. Nothing else comes close.",
      "On the menu": "Could eat sushi every day. Not up for debate.",
      "Drinks order": "Coke Zero. Diet Coke tastes like it's trying too hard.",
      "Cardio": "Reckons cardio is a means to an end, not the point.",
      "Beyond the gym": "Shadows physiotherapists at Spire Norwich. Everything he picks up there feeds back into how he coaches you. You'll feel that difference.",
      "Better coach?": "Me, obviously. I'll never let you cut a corner.",
      "Growing up": "Big brother. Always had to be right. Still working on that, apparently.",
      "Biggest falling out": "She told mum something he'd asked her not to. Didn't speak to her for two weeks. Still thinks he was right.",
    },
  },
  paris: {
    name: "Paris",
    photo: "/images/20230329-IFE-CF_050.JPG",
    rows: {
      "Pre-workout": "Has a coffee. Doesn't make it a personality.",
      "How they coach": "Reads the room. Adjusts to the day.",
      "Rest days": "Paddleboarding, beach walks, or seeing what she can move in a strongman session. Fitness makes all of it better.",
      "Form check": "Trusts her eye. Usually right.",
      "Favourite lift": "Give her a good squat session over deadlifts any day.",
      "On the menu": "Raw fish. No thank you. She'll have the same but cooked.",
      "Drinks order": "Diet Coke. Coke Zero tastes like regret.",
      "Cardio": "Thinks a session without some cardio is half a session.",
      "Off the clock": "Has a seven-year-old rescue greyhound called Pirate. Bring him up in a session. She will not stop. Learners always end up loving it.",
      "Better coach?": "Me. Clearly. I actually listen. He just talks louder.",
      "Growing up": "Grew up with Harry. That is the whole explanation.",
      "Biggest falling out": "He asked her to keep something to herself. She thought he was being dramatic. She stands by what she did.",
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

// ── Team ──────────────────────────────────────────────────────────────────────

export type TeamMember = {
  name: string;
  role: string;
  image?: string;
  meta: string;
  bio: readonly string[];
};

export const sharedImage = "/upscaled/harry-paris-8k.jpg";

export const team: TeamMember[] = [
  {
    name: "Harry",
    role: "Founder",
    meta: "22 Yrs Combined",
    bio: [
      "Harry started out as a PT in Norwich. Away from the gym he plays basketball, gets stuck into board games, and takes Magic: The Gathering seriously. He also works Physiotherapy assistant at Spire Norwich. What he picks up there comes straight back into how he coaches.",
      "Fitness is part of his life, not all of it. He wants the same for you. A normal life and a fit one should work side by side.",
      "Every session is built around where you are and where you want to get.",
    ],
  },
  {
    name: "Paris",
    role: "Lead Tutor",
    meta: "Tutor & Assessor",
    bio: [
      "Paris came to fitness through staying active outside the gym; paddleboarding, strongman, beach walks with her rescue greyhound Pirate. She qualified as a PT. Teaching is where she does her best work, and you get the full benefit.",
      "She has extra certs in spinning and in pre and post natal support. That range is yours to draw from.",
      "She wants you to leave feeling capable and clear. Not just informed. Ready.",
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────

export const missionParagraphs = [
  "You already know what it feels like to be changed by fitness. That lived experience is exactly what the industry needs more of.",
  "Every person who qualifies with us brings something different. A background, a story, a perspective the industry does not yet have. Your role is to be the coach your past self would have wanted. That makes you a perfect fit.",
];
