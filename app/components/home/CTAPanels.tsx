"use client";

import { motion, type Variants } from "framer-motion";
import CTAPanel, { type CTAPanelData } from "./CTAPanel";

const PANELS: CTAPanelData[] = [
  {
    label: "Est. 2021",
    title: "Who Are We?",
    cta: "About Us",
    href: "/about",
    image: "https://pub-6e6bb53af6c34756a861d2c0a8259e84.r2.dev/General/harry.webp",
    alt: "Harry Matthews — Lead Instructor at Integrity Fitness Education",
  },
  {
    label: "Norwich, Norfolk",
    title: "Get In Touch",
    cta: "Contact Us",
    href: "/contact",
    image: "https://pub-6e6bb53af6c34756a861d2c0a8259e84.r2.dev/General/paris.webp",
    alt: "Paris Matthews — Co-Founder at Integrity Fitness Education",
  },
];

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.25 } },
};

const panelVariant: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.85, ease: "easeOut" } },
};

export default function CTAPanels() {
  return (
    <motion.section
      className="reveal grid grid-cols-1 lg:grid-cols-2 border-t border-zinc-900 bg-zinc-950"
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.1 }}
    >
      {PANELS.map((panel) => (
        <motion.div 
          key={panel.title} 
          variants={panelVariant}
          className="flex h-full w-full items-center justify-center text-center"
        >
          {/* Note: If your text remains stuck to the bottom of the card, open your internal CTAPanel component file and strip out classes like 'justify-end', 'mt-auto', or 'pb-...' */}
          <CTAPanel panel={panel} />
        </motion.div>
      ))}
    </motion.section>
  );
}