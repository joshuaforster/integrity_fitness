"use client";

import { motion, type Variants } from "framer-motion";
import Button from "@/app/components/Button";
import SectionHeader from "@/app/components/ui/SectionHeader";
import SectionWrapper from "@/app/components/ui/SectionWrapper";
import DifferentiatorItem, { type Differentiator } from "./DifferentiatorItem";

const DIFFERENTIATORS: Differentiator[] = [
  {
    title: "1:1 Dedicated Mentorship",
    description:
      "No crowded classrooms or generic online modules. Your learning architecture is calibrated entirely around you.",
  },
  {
    title: "Norwich Fitness Infrastructure",
    description:
      "Rooted in Norfolk, training in-person at a premier local facility. Built directly for our regional health community.",
  },
  {
    title: "Sovereignty Over Your Time",
    description:
      "Engineered completely around your current work commitments, personal schedule, and natural learning velocity.",
  },
  {
    title: "Continuous Career Access",
    description:
      "An active professional network that supports your commercial lead generation long after your diploma wraps.",
  },
];

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
    <section className="bg-white py-20 md:py-28 border-t border-zinc-100">
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
                label="Our Mission"
                heading="Education That Actually Changes Your Life."
              />
            </motion.div>

            <div className="space-y-6 text-zinc-600 text-base md:text-lg leading-relaxed mt-8">
              <motion.p variants={textFadeVariants}>
                Since 2015, Integrity Fitness Education has been rewriting the
                rules of personal training education in Norwich, Norfolk. Where
                others offer courses, we offer transformation — the kind that
                sticks.
              </motion.p>
              <motion.p variants={textFadeVariants}>
                Harry founded IFE after seeing firsthand how impersonal and
                inadequate the standard fitness education model was. Every
                decision since has been made with one question in mind: what
                gives our students the best possible chance of building a career
                they love?
              </motion.p>
            </div>
          </motion.div>

          {/* Right Column — Original Layout with Staggered Bullet Points */}
          <div className="lg:col-span-6 lg:pl-6">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="text-zinc-400 text-xs font-bold tracking-[4px] uppercase mb-8"
            >
              What Sets Us Apart
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
                href="/qualifications"
                variant="primary"
                className="w-full sm:w-auto px-8"
              >
                View Qualifications
              </Button>
            </motion.div>
          </div>
        </div>
      </SectionWrapper>
    </section>
  );
}
