"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import SectionHeader from "@/app/components/ui/SectionHeader";
import SectionWrapper from "@/app/components/ui/SectionWrapper";
import TeamMemberCard, { type TeamMember } from "./TeamMemberCard";

const groupVariant: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const SHARED_IMAGE = "/upscaled/harry-paris-8k.jpg";

const TEAM: TeamMember[] = [
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

const Heading = ({ id }: { id: string }) => (
  <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
    <SectionHeader
      label="The People Behind IFE"
      heading="The IFE Team"
      id={id}
      align="center"
    />
    <p className="text-zinc-600 text-base md:text-lg leading-relaxed mt-6">
      Built on passion, driven by integrity. Two coaches who love what they do —
      and love helping others do it too.
    </p>
  </div>
);

const SharedImage = () => (
  <div className="relative w-full h-[420px] md:h-[520px] overflow-hidden rounded-xl shadow-sm border border-zinc-300/40 mb-16 md:mb-20">
    <Image
      src={SHARED_IMAGE}
      alt="Harry and Paris, brother and sister, founders of Integrity Fitness Education"
      fill
      sizes="100vw"
      className="object-cover object-center"
      priority
    />
  </div>
);

export default function OurStory() {
  return (
    <section
      aria-labelledby="team-heading"
      className="bg-zinc-50 texture-diag-light py-20 md:py-28 border-t border-zinc-200/80"
    >
      <SectionWrapper>
        {/* ── Desktop: header + image + both bios animate as one ── */}
        <motion.div
          className="hidden lg:block"
          variants={groupVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
        >
          <Heading id="team-heading" />
          <SharedImage />
          <div className="grid grid-cols-2 gap-12 items-start">
            <TeamMemberCard person={TEAM[0]} />
            <TeamMemberCard person={TEAM[1]} />
          </div>
        </motion.div>

        {/* ── Mobile: header + image + Harry animate as one; Paris separate ── */}
        <div className="lg:hidden">
          <motion.div
            variants={groupVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.1 }}
          >
            <Heading id="team-heading-mobile" />
            <SharedImage />
            <TeamMemberCard person={TEAM[0]} />
          </motion.div>

          <motion.div
            className="mt-16"
            variants={groupVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.15 }}
          >
            <TeamMemberCard person={TEAM[1]} />
          </motion.div>
        </div>
      </SectionWrapper>
    </section>
  );
}
