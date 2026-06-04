"use client";

import { motion, type Variants } from "framer-motion";
import Button from "@/app/components/ui/Button";
import SectionHeader from "@/app/components/ui/SectionHeader";
import SectionWrapper from "@/app/components/ui/SectionWrapper";
import { qualificationsSection } from "@/app/content/home";
import CourseCard from "./CourseCard";

const gridVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13 } },
};

const cardVariant: Variants = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut" } },
};

export default function Qualifications() {
  return (
    <section
      aria-labelledby="qualifications-heading"
      className="bg-white texture-grid-light py-16 md:py-24"
    >
      <SectionWrapper reveal>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <motion.div
            className="lg:col-span-5 flex flex-col items-start"
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.85, ease: "easeOut" }}
          >
            <SectionHeader
              label={qualificationsSection.label}
              heading={qualificationsSection.heading}
              id="qualifications-heading"
              headingSize="lg"
            />
            <div className="space-y-4 text-zinc-600 text-base md:text-lg leading-relaxed mb-10 max-w-md md:max-w-sm lg:max-w-md mt-8">
              <p>{qualificationsSection.bodyIntro}</p>
              <ul className="space-y-2">
                {qualificationsSection.bodyItems.map((item, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#CE1A19]" />
                    <span>
                      <strong className="text-zinc-900">{item.question}</strong>{" "}
                      {item.answer}
                    </span>
                  </li>
                ))}
              </ul>
              <p>{qualificationsSection.bodyOutro}</p>
            </div>
            <div className="flex flex-col xl:flex-row gap-3 w-full">
              <Button href={qualificationsSection.button1.href} variant="primary" responsive>
                {qualificationsSection.button1.label}
              </Button>
              <Button href={qualificationsSection.button2.href} variant="outline-light" responsive>
                {qualificationsSection.button2.label}
              </Button>
            </div>
          </motion.div>

          <motion.div
            className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full lg:pl-6"
            variants={gridVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            {qualificationsSection.courses.map((course, i) => (
              <motion.div
                key={i}
                variants={cardVariant}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.97 }}
                className="flex"
              >
                <CourseCard
                  badge={course.badge}
                  level={course.level}
                  title={course.title}
                  body={course.body}
                  href={course.href}
                  cpd={course.cpd}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </SectionWrapper>
    </section>
  );
}
