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

const listVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
};

const itemVariant: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: "easeOut" } },
};

export default function AboutMission() {
  return (
    <section className="bg-white py-20 md:py-28 border-t border-zinc-100">
      <SectionWrapper reveal>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          <motion.div
            className="lg:col-span-6"
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <SectionHeader
              label="Our Mission"
              heading="Education That Actually Changes Your Life."
            />
            <div className="space-y-6 text-zinc-600 text-base md:text-lg leading-relaxed mt-8">
              <p>
                Since 2015, Integrity Fitness Education has been rewriting the
                rules of personal training education in Norwich, Norfolk. Where
                others offer courses, we offer transformation — the kind that
                sticks.
              </p>
              <p>
                Harry founded IFE after seeing firsthand how impersonal and
                inadequate the standard fitness education model was. Every
                decision since has been made with one question in mind: what
                gives our students the best possible chance of building a career
                they love?
              </p>
            </div>
          </motion.div>

          <div className="lg:col-span-6 lg:pl-6">
            <p className="text-zinc-400 text-xs font-bold tracking-[4px] uppercase mb-8">
              What Sets Us Apart
            </p>
            <motion.ul
              className="space-y-8"
              role="list"
              variants={listVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
            >
              {DIFFERENTIATORS.map((item) => (
                <motion.li key={item.title} variants={itemVariant}>
                  <DifferentiatorItem item={item} />
                </motion.li>
              ))}
            </motion.ul>
            <div className="mt-10 md:mt-12">
              <Button href="/qualifications" variant="primary" className="w-full sm:w-auto px-8">
                View Qualifications
              </Button>
            </div>
          </div>

        </div>
      </SectionWrapper>
    </section>
  );
}
