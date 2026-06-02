"use client";

import { motion, type Variants } from "framer-motion";
import Button from "@/app/components/ui/Button";
import SectionHeader from "@/app/components/ui/SectionHeader";
import SectionWrapper from "@/app/components/ui/SectionWrapper";
import {
  qualificationsSection,
  cpdCourses as CPD_COURSES,
} from "@/app/content/home";


const gridVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13 } },
};

const cardVariant: Variants = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut" } },
};

interface CourseCardProps {
  badge: string | null;
  level: string;
  title: string;
  body: string;
  href: string;
  cpd?: boolean;
}

function CourseCard({ badge, level, title, body, href, cpd }: CourseCardProps) {
  return (
    <a
      href={href}
      className="relative flex flex-col h-full bg-white border border-zinc-950 rounded-2xl p-6 group overflow-hidden
        shadow-[0_2px_4px_rgba(0,0,0,0.06),0_6px_24px_rgba(0,0,0,0.08)]
        hover:shadow-[0_4px_8px_rgba(0,0,0,0.08),0_12px_32px_rgba(0,0,0,0.14)]
        hover:border-zinc-700
        transition-all duration-300
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CE1A19] focus-visible:ring-offset-2"
    >
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#CE1A19] rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="flex items-start justify-between mb-3 gap-2">
        <span className="text-[#CE1A19] text-xs font-black uppercase tracking-widest leading-none mt-0.5">
          {level}
        </span>
        {badge && (
          <span className="bg-[#CE1A19] text-white text-xs font-black uppercase tracking-wider px-2.5 py-1 rounded-full shrink-0">
            {badge}
          </span>
        )}
      </div>

      <h3 className="text-base font-black text-zinc-900 leading-tight mb-2">
        {title}
      </h3>
      <p className="text-zinc-700 text-xs leading-relaxed flex-1 mb-4">
        {body}
      </p>

      {cpd && (
        <ul className="space-y-1.5 mb-4">
          {CPD_COURSES.map((c) => (
            <li key={c.title} className="text-zinc-600 text-xs font-medium leading-snug flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-zinc-400 shrink-0" />
              {c.title}
            </li>
          ))}
        </ul>
      )}

      <div className="flex items-center gap-1.5 pt-3 border-t border-zinc-200 text-xs font-bold text-zinc-600 uppercase tracking-wider group-hover:text-[#CE1A19] transition-colors duration-200">
        {cpd ? qualificationsSection.viewAllCPD : qualificationsSection.viewCourse}
        <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
      </div>
    </a>
  );
}

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
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.85, ease: "easeOut" }}
          >
            <SectionHeader
              label={qualificationsSection.label}
              heading={qualificationsSection.heading}
              id="qualifications-heading"
              headingSize="lg"
            />
            <div className="space-y-4 text-zinc-600 text-base md:text-lg leading-relaxed mb-10 max-w-md mt-8">
              <p>{qualificationsSection.bodyIntro}</p>
              <ul className="space-y-2">
                {qualificationsSection.bodyItems.map((item, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#CE1A19]" />
                    <span><strong className="text-zinc-900">{item.question}</strong> {item.answer}</span>
                  </li>
                ))}
              </ul>
              <p>{qualificationsSection.bodyOutro}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
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
            viewport={{ once: false, amount: 0.15 }}
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
