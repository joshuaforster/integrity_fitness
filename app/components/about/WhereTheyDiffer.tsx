"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import SectionHeader from "@/app/components/ui/SectionHeader";
import SectionWrapper from "@/app/components/ui/SectionWrapper";
import { whereTheyDiffer as C } from "@/app/content/about";

type PersonCard = {
  name: string;
  photo: string | undefined;
  role?: string;
  rows: Record<string, string>;
};

const SHOW_ROWS: (keyof typeof C.harry.rows)[] = [
  "Cardio",
  "On the menu",
  "Drinks order",
  "Growing up",
  "Biggest falling out",
  "Better coach?",
];

const groupVariant: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut" } },
};

const bioContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const paraVariant: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

export default function WhereTheyDiffer() {
  return (
    <section
      aria-labelledby="differ-heading"
      className="bg-zinc-50 texture-grid-light py-20 md:py-28 border-t border-zinc-200/80"
    >
      <SectionWrapper>
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-14">
          <SectionHeader
            label={C.label}
            heading={C.heading}
            id="differ-heading"
            align="center"
            headingSize="sm"
          />
          <p className="text-zinc-600 text-base md:text-lg leading-relaxed mt-6">
            {C.intro}
          </p>
        </div>

        {/* Two columns — exact same pattern as TeamMemberCard */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-14 items-start">
          {([C.harry, C.paris] as PersonCard[]).map((person, i) => (
            <motion.div
              key={person.name}
              className="flex flex-col items-start"
              variants={groupVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.15 }}
              transition={{ delay: i * 0.12 }}
            >
              {/* Photo — shorter, landscape crop */}
              <div className="relative w-full h-48 md:h-75 overflow-hidden bg-zinc-200 rounded-lg border border-zinc-300/40">
                {person.photo ? (
                  <Image
                    src={person.photo}
                    alt={person.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover object-center"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-7xl font-black text-zinc-300 select-none">
                      {person.name[0]}
                    </span>
                  </div>
                )}
              </div>

              {/* Name + role — exact TeamMemberCard pattern */}
              <div className="w-full pt-6 pb-4 flex items-baseline justify-between border-b border-zinc-200">
                <div>
                  <h3 className="text-zinc-950 font-black text-xl uppercase tracking-wide">
                    {person.name}
                  </h3>
                  <p className="text-[#CE1A19] text-xs font-bold tracking-widest uppercase mt-1">
                    {person.role}
                  </p>
                </div>
              </div>

              {/* Rows — exact TeamMemberCard bio pattern */}
              <motion.div
                className="mt-5 border-l-2 border-zinc-200 pl-6 space-y-5 w-full"
                variants={bioContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.1 }}
              >
                {SHOW_ROWS.map((key) => (
                  <motion.div key={key} variants={paraVariant}>
                    <p className="text-[#CE1A19] text-[10px] font-black uppercase tracking-widest mb-1">
                      {key}
                    </p>
                    <p className="text-zinc-600 text-sm md:text-base leading-relaxed">
                      {person.rows[key]}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Closing */}
        <div className="mt-12 text-center max-w-lg mx-auto space-y-2">
          <p className="text-zinc-600 text-sm md:text-base font-medium leading-relaxed">
            {C.closing}
          </p>
        </div>
      </SectionWrapper>
    </section>
  );
}
