"use client";

import { motion, type Variants } from "framer-motion";
import Button from "@/app/components/ui/Button";
import SectionHeader from "@/app/components/ui/SectionHeader";
import SectionWrapper from "@/app/components/ui/SectionWrapper";
import AnimatedCounter from "@/app/components/ui/AnimatedCounter";
import StatItem from "@/app/components/ui/StatItem";

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2, delayChildren: 0.2 } },
};

const statItem: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: "easeOut" } },
};

import { ESTABLISHED_YEAR, TEACHING_SINCE_YEAR, statsAccreditations, statsCopy, statsSection } from "@/app/content/home";

export default function Stats() {
  const combinedYears = (new Date().getFullYear() - TEACHING_SINCE_YEAR) * 2;

  const STATS = [
    { type: "counter" as const, value: ESTABLISHED_YEAR, label: "Established" },
    { type: "counter" as const, value: combinedYears, label: "Years Combined Teaching" },
    ...statsAccreditations,
  ];

  // const STATS = [
  //   { type: "text" as const, value: "ONE", label: "Shared Mission" },
  //   { type: "text" as const, value: "ACTIVE", label: "Coaching Network" },
  //   ...statsAccreditations,
  // ];

  return (
    <section className="bg-zinc-900 texture-dots-dark angle-tl-lg pb-24 md:pb-32 pt-[168px] md:pt-[200px]">
      <SectionWrapper reveal>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

          <div className="lg:col-span-5 flex flex-col items-start text-left">
            <SectionHeader
              label={statsSection.label}
              heading={statsSection.heading}
              theme="dark"
              headingSize="sm"
            />
            <p className="text-white text-base md:text-lg leading-relaxed mb-8 max-w-md mt-8">
              {statsCopy}
            </p>
            <Button href={statsSection.button.href} variant="primary" responsive>
              {statsSection.button.label}
            </Button>
          </div>

          <div className="lg:col-span-7 w-full lg:pl-8">
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-12 md:gap-y-16"
              variants={container}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
            >
              {STATS.map((stat) => (
                <motion.div key={stat.label} variants={statItem}>
                  {stat.type === "counter" ? (
                    <div className="border-l-2 border-zinc-800 pl-6">
                      <p className="text-3xl md:text-4xl font-black text-white tabular-nums">
                        <AnimatedCounter target={stat.value} />
                      </p>
                      <p className="text-white text-xs font-bold uppercase tracking-widest mt-2">
                        {stat.label}
                      </p>
                    </div>
                  ) : (
                    <StatItem {...stat} theme="dark" />
                  )}
                </motion.div>
              ))}
            </motion.div>
          </div>

        </div>
      </SectionWrapper>
    </section>
  );
}
