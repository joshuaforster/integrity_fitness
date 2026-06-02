"use client";

import { motion } from "framer-motion";
import SectionWrapper from "@/app/components/ui/SectionWrapper";
import SectionHeader from "@/app/components/ui/SectionHeader";
import { graduatesIntro, graduatesStats } from "@/app/content/graduates";

export default function GraduatesStats() {
  return (
    <section className="bg-white py-20 md:py-28">
      <SectionWrapper reveal>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <motion.div
            className="lg:col-span-6"
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.85, ease: "easeOut" }}
          >
            <SectionHeader
              label={graduatesIntro.label}
              heading={graduatesIntro.heading}
              headingSize="lg"
            />
            <p className="text-zinc-600 text-base md:text-lg leading-relaxed mt-8 max-w-md">
              {graduatesIntro.body}
            </p>
          </motion.div>

          <div className="lg:col-span-6 lg:pl-6">
            <div className="grid grid-cols-3 gap-6">
              {graduatesStats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="flex flex-col items-center text-center p-6 bg-zinc-50"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
                >
                  <span className="text-3xl md:text-4xl font-black text-[#CE1A19] tracking-tight leading-none mb-2">
                    {stat.value}
                  </span>
                  <span className="text-xs font-bold tracking-widest uppercase text-zinc-500">
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </SectionWrapper>
    </section>
  );
}
