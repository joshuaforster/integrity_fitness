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
      "Harry started out as a PT in Norwich. He grew up playing basketball. Outside the gym he reads around anatomy and how the body works. All of that feeds into how he teaches you.",
      "Fitness is part of his life, not all of it. He wants the same for you. A normal life and a fit one should work side by side.",
      "Every session is built around where you are and where you want to get.",
    ],
  },
  {
    name: "Paris",
    role: "Lead Tutor",
    meta: "Tutor & Assessor",
    bio: [
      "Paris came to fitness through staying active outside the gym. [Interests TBC.] She qualified as a PT. Teaching is where she does her best work, and you get the full benefit.",
      "She has extra certs in spinning and in pre and post natal support. That range is yours to draw from.",
      "She wants you to leave feeling capable and clear. Not just informed. Ready.",
    ],
  },
];
