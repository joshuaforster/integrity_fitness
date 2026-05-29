"use client";

import { motion, type Variants } from "framer-motion";
import AccordionRow, { type FAQItem } from "./AccordionRow";

export type FAQGroup = {
  category: string;
  items: readonly FAQItem[];
};

const formatId = (text: string) =>
  text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function FaqGroup({ group }: { group: FAQGroup }) {
  return (
    <motion.div
      id={formatId(group.category)}
      className="scroll-mt-24"
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.1 }}
    >
      <motion.div variants={item} className="flex items-center gap-3 mb-4 lg:mb-6">
        <div className="w-1 h-4 bg-[#CE1A19]" aria-hidden="true" />
        <h3 className="text-zinc-950 text-xs font-black uppercase tracking-widest">
          {group.category}
        </h3>
      </motion.div>

      <div className="border-t border-zinc-200">
        {group.items.map((faqItem) => (
          <motion.div key={faqItem.q} variants={item}>
            <AccordionRow q={faqItem.q} a={faqItem.a} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
