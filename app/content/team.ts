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
    meta: "Teaching Since 2015",
    bio: [
      "Harry and Paris are brother and sister — and IFE is their shared mission. Harry completed the combined Level 2 & 3 Personal Training Diploma and spent years building his reputation as a self-employed PT at The Gym Group in Norwich, specialising in exercise referral before moving into education.",
      "Since 2015 he has worked with hundreds of students, channelling the same drive that drew him to personal training into helping others build careers that last. That vision became Integrity Fitness Education.",
    ],
  },
  {
    name: "Paris",
    role: "Lead Tutor",
    meta: "Teaching Since 2015",
    bio: [
      "Paris qualified as a personal trainer and joined Harry at The Gym Group, quickly making her mark through her dedication to clients and her own continued development — earning certificates in spinning and supporting pre and post natal populations.",
      "Harry recognised her natural gift for teaching early on, and she has surpassed every expectation since stepping into the classroom. As Lead Tutor at IFE, she brings energy, empathy, and lived experience to every course she delivers.",
    ],
  },
];
