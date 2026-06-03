"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { heroStats as STATS } from "@/app/content/home";

const imageStats = STATS.filter((s): s is Extract<typeof STATS[number], { type: "image" }> => s.type === "image");
const activeIQ = imageStats.find((s) => s.alt === "Active IQ");
const cimspa = imageStats.find((s) => s.alt === "CIMSPA");

export default function HeroStats() {
  if (!activeIQ || !cimspa) return null;

  return (
    <motion.div
      className="mt-10"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: 1.0, ease: "easeOut" }}
    >
      <div
        className="flex w-full md:inline-flex md:w-auto justify-center md:justify-start items-center rounded-full border border-white px-7 py-4 shadow-[0_4px_32px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.08)]"
        style={{
          backdropFilter: "blur(20px) saturate(160%)",
          background: "rgba(255,255,255,0.06)",
        }}
      >

        {/* Active IQ */}
        <Image
          src={activeIQ.value}
          alt="Active IQ"
          width={activeIQ.width}
          height={activeIQ.height}
          priority
          className="h-3 w-auto object-contain brightness-0 invert opacity-80"
        />

        {/* Divider */}
        <div
          className="w-px h-9 bg-white mx-6 flex-shrink-0"
          aria-hidden="true"
        />

        {/* CIMSPA */}
        <Image
          src={cimspa.value}
          alt="CIMSPA"
          width={cimspa.width}
          height={cimspa.height}
          priority
          className="h-12 w-auto object-contain brightness-0 invert opacity-70"
        />
      </div>
    </motion.div>
  );
}
