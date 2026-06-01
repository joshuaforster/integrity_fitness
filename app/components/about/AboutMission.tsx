"use client";

import { motion, type Variants } from "framer-motion";
import Button from "@/app/components/ui/Button";
import SectionHeader from "@/app/components/ui/SectionHeader";
import SectionWrapper from "@/app/components/ui/SectionWrapper";
import DifferentiatorItem from "./DifferentiatorItem";
import { differentiators as DIFFERENTIATORS, missionParagraphs, aboutMissionSection } from "@/app/content/about";

// Clean typographic animation configurations
const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const textFadeVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.215, 0.61, 0.355, 1] },
  },
};

export default function AboutMission() {
  return (
    <section className="bg-white angle-tr-lg pb-20 md:pb-28 pt-[152px] md:pt-[168px]">
      <SectionWrapper reveal>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column — Original Position with Text Reveal */}
          <motion.div
            className="lg:col-span-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            <motion.div variants={textFadeVariants}>
              <SectionHeader
                label={aboutMissionSection.label}
                heading={aboutMissionSection.heading}
              />
            </motion.div>

            <div className="space-y-6 text-zinc-600 text-base md:text-lg leading-relaxed mt-8">
              {missionParagraphs.map((p, i) => (
                <motion.p key={i} variants={textFadeVariants}>{p}</motion.p>
              ))}
            </div>
          </motion.div>

          {/* Right Column — Original Layout with Staggered Bullet Points */}
          <div className="lg:col-span-6 lg:pl-6">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="text-zinc-400 text-xs font-bold tracking-widest uppercase mb-8"
            >
              {aboutMissionSection.differentiatorLabel}
            </motion.p>

            <motion.ul
              className="space-y-8"
              role="list"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
            >
              {DIFFERENTIATORS.map((item) => (
                <motion.li key={item.title} variants={textFadeVariants}>
                  <DifferentiatorItem item={item} />
                </motion.li>
              ))}
            </motion.ul>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="mt-10 md:mt-12"
            >
              <Button
                href={aboutMissionSection.button.href}
                variant="primary"
                responsive
              >
                {aboutMissionSection.button.label}
              </Button>
            </motion.div>
          </div>
        </div>
      </SectionWrapper>
    </section>
  );
}
