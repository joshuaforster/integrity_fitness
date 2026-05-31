"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import SectionHeader from "@/app/components/ui/SectionHeader";
import SectionWrapper from "@/app/components/ui/SectionWrapper";
import TeamMemberCard from "./TeamMemberCard";
import { team as TEAM, sharedImage as SHARED_IMAGE } from "@/app/content/team";
import { ourStorySection } from "@/app/content/about";

const groupVariant: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const Heading = ({ id }: { id: string }) => (
  <div className="text-center max-w-2xl mx-auto mb-8 md:mb-10">
    <SectionHeader
      label={ourStorySection.label}
      heading={ourStorySection.heading}
      id={id}
      align="center"
    />
    <p className="text-zinc-600 text-base md:text-lg leading-relaxed mt-6">
      {ourStorySection.body}
    </p>
  </div>
);

const SharedImage = () => (
  <div className="relative w-full h-[420px] md:h-[520px] overflow-hidden rounded-lg shadow-sm border border-zinc-300/40 mb-16 md:mb-20">
    <Image
      src={SHARED_IMAGE}
      alt={ourStorySection.sharedImageAlt}
      fill
      sizes="100vw"
      className="object-cover object-center"
      priority
    />
  </div>
);

export default function 
OurStory() {
  return (
    <section
      id="our-story"
      aria-labelledby="team-heading"
      className="bg-zinc-100 texture-diag-light py-10  border-t border-zinc-200/80"
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
