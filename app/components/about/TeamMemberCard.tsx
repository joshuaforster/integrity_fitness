"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";

export type TeamMember = {
  name: string;
  role: string;
  image: string;
  meta: string;
  bio: readonly string[];
};

const bioContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
};

const paraVariant: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut" } },
};

export default function TeamMemberCard({ person }: { person: TeamMember }) {
  return (
    <div className="flex flex-col items-start group">
      <motion.div
        className="relative h-[480px] w-full overflow-hidden bg-zinc-200 rounded-sm shadow-sm border border-zinc-300/40"
        whileHover={{ scale: 1.01 }}
      >
        <Image
          src={person.image}
          alt={
            person.name === "Paris"
              ? "Paris, Tutor & Assessor at Integrity Fitness Education"
              : `${person.name}, ${person.role}`
          }
          fill
          sizes="(max-width: 1024px) 100vw, 40vw"
          className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.02]"
          priority
        />
      </motion.div>

      <div className="w-full pt-6 pb-4 flex items-baseline justify-between border-b border-zinc-200">
        <div>
          <h3 className="text-zinc-950 font-black text-xl uppercase tracking-wide">
            {person.name}
          </h3>
          <p className="text-[#CE1A19] text-xs font-bold tracking-widest uppercase mt-1">
            {person.role}
          </p>
        </div>
        <span className="text-zinc-400 text-xs font-bold tracking-[2px] uppercase whitespace-nowrap">
          {person.meta}
        </span>
      </div>

      <motion.div
        className="mt-5 border-l-2 border-zinc-200 pl-6 space-y-4"
        variants={bioContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.1 }}
      >
        {person.bio.map((para, i) => (
          <motion.p key={i} variants={paraVariant} className="text-zinc-600 text-sm md:text-base leading-relaxed">
            {para}
          </motion.p>
        ))}
      </motion.div>
    </div>
  );
}
