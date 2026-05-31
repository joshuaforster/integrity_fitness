"use client";

import { motion } from "framer-motion";

export default function SectionBreak() {
  return (
    <div className="bg-white flex items-center justify-center py-6">
      <div className="flex items-center gap-3">
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-14 h-px bg-zinc-200 origin-right"
        />
        <motion.span
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ delay: 0.25, duration: 0.3, ease: "backOut" }}
          className="text-[#CE1A19] text-[10px] select-none"
          aria-hidden
        >
          ◆
        </motion.span>
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-14 h-px bg-zinc-200 origin-left"
        />
      </div>
    </div>
  );
}
