"use client";

import { motion, type Variants } from "framer-motion";
import Button from "@/app/components/Button";
import SectionHeader from "@/app/components/ui/SectionHeader";
import SectionWrapper from "@/app/components/ui/SectionWrapper";
import FlagshipCourseCard, { type MainCourse } from "./FlagshipCourseCard";
import CourseLinkCard from "./CourseLinkCard";
import CPDCourseLink, { type CPDCourse } from "./CPDCourseLink";

const MAIN_COURSES: MainCourse[] = [
  {
    title: "Combined Level 2 & 3 Personal Training Diploma",
    description:
      "The fast-track ultimate industry standard. Everything you need to launch a fully accredited personal training career from zero experience.",
    href: "/qualifications/become-a-personal-trainer",
  },
  {
    title: "Level 2 Gym Instructor Certificate",
    description:
      "The essential foundational step into fitness coaching. Qualify to manage gym floors and lead group fitness inductions safely.",
    href: "/qualifications/level-2-gym-instructor",
  },
  {
    title: "Level 3 Personal Training Qualification",
    description:
      "Already hold a Level 2? Elevate your skill architecture, master advanced exercise programming, and open your client roster.",
    href: "/qualifications/level-3-personal-training",
  },
];

const CPD_COURSES: CPDCourse[] = [
  { title: "Level 2 Award in Mental Health Awareness", href: "/qualifications/mental-health-awareness" },
  { title: "Level 3 Award in Supporting Pre & Post Natal Clients", href: "/qualifications/pre-post-natal" },
  { title: "Level 3 Award in Emergency First Aid at Work", href: "/qualifications/emergency-first-aid" },
];

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
};

const slideUp: Variants = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

export default function Qualifications() {
  return (
    <section className="bg-zinc-900 angle-tl pb-20 md:pb-28 pt-[132px] md:pt-[164px]">
      <SectionWrapper reveal>

        <div className="mb-16 md:mb-20">
          <SectionHeader
            label="What We Offer"
            heading="Qualifications Built For Real Careers"
            theme="dark"
          />
        </div>

        {/* Main courses */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
        >
          <motion.div variants={slideUp} className="lg:col-span-7">
            <FlagshipCourseCard course={MAIN_COURSES[0]} />
          </motion.div>

          <div className="lg:col-span-5 space-y-4 h-full flex flex-col justify-between">
            <p className="text-zinc-400 text-xs font-bold tracking-widest uppercase px-1 mb-2 lg:mb-0">
              Core Technical Certificates
            </p>
            {MAIN_COURSES.slice(1).map((course) => (
              <motion.div key={course.title} variants={slideUp}>
                <CourseLinkCard course={course} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CPD strip */}
        <div className="mb-16">
          <p className="text-zinc-400 text-xs font-bold tracking-widest uppercase mb-6 px-1">
            Continued Professional Development (CPD)
          </p>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
          >
            {CPD_COURSES.map((course) => (
              <motion.div key={course.title} variants={slideUp}>
                <CPDCourseLink course={course} />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Bottom CTA row */}
        <motion.div
          className="pt-8 border-t border-zinc-800/80"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.75, delay: 0.25 }}
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 justify-between">
            <div>
              <p className="text-zinc-500 text-xs font-bold tracking-[3px] uppercase mb-1">
                Not sure where to start?
              </p>
              <p className="text-zinc-300 text-sm md:text-base leading-relaxed">
                Get in touch and we&apos;ll point you in the right direction.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <Button href="/qualifications" variant="primary" className="px-6 text-center">
                See All Qualifications
              </Button>
              <Button
                href="/contact"
                variant="outline-dark"
                className="px-6 text-center border-zinc-700 text-white hover:bg-zinc-800"
              >
                Get In Touch
              </Button>
            </div>
          </div>
        </motion.div>

      </SectionWrapper>
    </section>
  );
}
