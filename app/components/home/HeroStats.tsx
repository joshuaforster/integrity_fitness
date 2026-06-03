"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function HeroStats() {
  return (
    <motion.div
      className="mt-10 lg:mt-0"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: 1.0, ease: "easeOut" }}
    >
      <div
        className="inline-flex items-center gap-3 px-4 py-2.5 rounded-full [backdrop-filter:blur(16px)_saturate(120%)] bg-white/[0.07] border border-white/[0.12]"
        aria-label="Approved by Active IQ and CIMSPA"
      >
        <span className="text-white/50 text-xs font-bold uppercase tracking-widest whitespace-nowrap">
          Approved by
        </span>
        <div className="w-px h-4 bg-white/20" aria-hidden="true" />
        <Image
          src="https://pub-6e6bb53af6c34756a861d2c0a8259e84.r2.dev/General/activeiq.png"
          alt="Active IQ"
          width={56}
          height={18}
          priority
          className="object-contain h-4 w-auto brightness-0 invert opacity-80"
        />
        <div className="w-px h-4 bg-white/20" aria-hidden="true" />
        <Image
          src="https://pub-6e6bb53af6c34756a861d2c0a8259e84.r2.dev/cimspa-logo-navy-box%20copy.png"
          alt="CIMSPA"
          width={56}
          height={18}
          priority
          className="object-contain h-4 w-auto brightness-0 invert opacity-80"
        />
      </div>
    </motion.div>
  );
}
