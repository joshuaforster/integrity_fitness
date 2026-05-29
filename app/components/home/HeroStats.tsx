"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";

const STATS = [
  { type: "text", value: "1:1", label: "Learning" },
  {
    type: "image",
    value: "https://pub-6e6bb53af6c34756a861d2c0a8259e84.r2.dev/General/activeiq.png",
    label: "Qualified",
    width: 1024,
    height: 219,
    alt: "Active IQ",
  },
  {
    type: "image",
    value: "https://pub-6e6bb53af6c34756a861d2c0a8259e84.r2.dev/cimspa-logo-navy-box%20copy.png",
    label: "Accredited",
    width: 1580,
    height: 1720,
    alt: "CIMSPA",
  },
] as const;

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18, delayChildren: 0.8 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut" } },
};

export default function HeroStats() {
  return (
    <motion.div
      className="w-full mt-12 max-w-3xl border border-white/20 bg-black/20 backdrop-blur-sm p-4 md:p-6 rounded-xl"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 1.0, ease: "easeOut" }}
    >
      <motion.dl
        className="grid grid-cols-3 divide-x divide-white/20 text-center"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {STATS.map((stat, index) => (
          <motion.div
            key={stat.label}
            variants={item}
            className={`flex flex-col-reverse items-center ${index === 0 ? "" : "pl-3 md:pl-6"}`}
          >
            <dt className="text-[9px] md:text-[10px] text-white uppercase tracking-[2px] mt-2 font-semibold">
              {stat.label}
            </dt>
            <dd className="m-0">
              {stat.type === "image" ? (
                <div className={`relative ${stat.alt === "CIMSPA" ? "h-10 w-10 md:h-12 md:w-12" : "h-9 w-24 md:h-11 md:w-28"}`}>
                  <Image
                    src={stat.value}
                    alt={stat.alt}
                    width={stat.width}
                    height={stat.height}
                    priority
                    quality={60}
                    sizes={stat.alt === "CIMSPA" ? "48px" : "112px"}
                    className="h-full w-full object-contain brightness-0 invert"
                  />
                </div>
              ) : (
                <span className="text-xl md:text-3xl font-extrabold text-white tracking-tight leading-none">
                  {stat.value}
                </span>
              )}
            </dd>
          </motion.div>
        ))}
      </motion.dl>
    </motion.div>
  );
}
