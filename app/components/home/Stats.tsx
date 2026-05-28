"use client";

import { motion, type Variants } from "framer-motion";
import Button from "@/app/components/Button";
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

export default function Stats() {
  const combinedYears = (new Date().getFullYear() - 2015) * 2;

  const STATS = [
    { type: "counter" as const, value: 2021, label: "Established" },
    { type: "counter" as const, value: combinedYears, label: "Years Combined Teaching" },
    { type: "image" as const, src: "https://pub-6e6bb53af6c34756a861d2c0a8259e84.r2.dev/General/activeiq.png", alt: "Active IQ", width: 136, height: 29, label: "Approved Centre" },
    { type: "image" as const, src: "https://pub-6e6bb53af6c34756a861d2c0a8259e84.r2.dev/General/cimspa.webp", alt: "CIMSPA", width: 136, height: 136, label: "Accredited Partner", containerClass: "h-16 w-16" },
  ];

  return (
    <section className="bg-zinc-900 texture-dots-dark angle-tl-lg pb-24 md:pb-32 pt-[168px] md:pt-[200px]">
      <SectionWrapper reveal>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

          <div className="lg:col-span-5 flex flex-col items-start text-left">
            <SectionHeader
              label="By The Numbers"
              heading="Built On A Decade Of Experience"
              theme="dark"
              headingSize="sm"
            />
            <p className="text-white text-base md:text-lg leading-relaxed mb-8 max-w-md mt-8">
              A track record built on transparency and regulatory excellence. We
              deliver premium, recognised qualifications that carry weight in
              the industry.
            </p>
            <Button href="/contact" variant="primary" className="w-full sm:w-auto px-8 py-3.5">
              Start Your Journey
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
