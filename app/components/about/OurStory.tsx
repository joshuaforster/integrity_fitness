"use client";

import { motion, type Variants } from "framer-motion";
import SectionHeader from "@/app/components/ui/SectionHeader";
import SectionWrapper from "@/app/components/ui/SectionWrapper";
import TeamMemberCard, { type TeamMember } from "./TeamMemberCard";

const cardVariant: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const TEAM: TeamMember[] = [
  {
    name: "Harry",
    role: "Founder & Lead Tutor",
    image: "/harry.png",
    meta: "Teaching Since 2015",
    bio: [
      "After completing the combined Level 2 & 3 Personal Training Diploma, Harry began his career as a self-employed PT at The Gym Group in Norwich. After building his client base and specialising in exercise referral, he established a reputation that led to a role as a tutor and assessor.",
      "Over the next 5 years he worked with hundreds of students, finding the same passion for helping people that first attracted him to personal training. He built a team of likeminded individuals under a unified company: Integrity Fitness Education.",
    ],
  },
  {
    name: "Paris",
    role: "Tutor & Assessor",
    image: "/paris.webp",
    meta: "Advanced Coach",
    bio: [
      "Paris qualified as a personal trainer and started working in the same gym as Harry. She made a strong impression by helping plenty of clients alongside her continued professional development, gaining certificates in spinning and supporting pre and post natal populations.",
      "Harry saw the potential for her to be a great teacher and she exceeded expectations with how she brought the course alive for all of her learners. She's more motivated than ever to bring the best possible experience here at IFE.",
    ],
  },
];

export default function OurStory() {
  return (
    <section
      aria-labelledby="team-heading"
      className="bg-zinc-50 texture-diag-light py-20 md:py-28 border-t border-zinc-200/80"
    >
      <SectionWrapper reveal>
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
          <SectionHeader
            label="The People Behind IFE"
            heading="The IFE Team"
            id="team-heading"
            align="center"
          />
          <p className="text-zinc-600 text-base md:text-lg leading-relaxed mt-6">
            Built on passion, driven by integrity. Two coaches who love what
            they do — and love helping others do it too.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12 items-start">
          {TEAM.map((person, i) => (
            <motion.div
              key={person.name}
              variants={cardVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.15 }}
              transition={{ delay: i * 0.15 }}
            >
              <TeamMemberCard person={person} />
            </motion.div>
          ))}
        </div>
      </SectionWrapper>
    </section>
  );
}
