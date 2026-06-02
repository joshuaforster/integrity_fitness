"use client";

import { motion } from "framer-motion";

// Replace each `name` (and optionally add a real `logoUrl`) when Harry has the actual logos.
// logoUrl should be a hosted image URL; if absent the name is shown as styled text.
const GYMS: { name: string; logoUrl?: string }[] = [
  { name: "PureGym" },
  { name: "David Lloyd" },
  { name: "Nuffield Health" },
  { name: "Anytime Fitness" },
  { name: "The Gym Group" },
  { name: "Bannatyne's" },
  { name: "Virgin Active" },
  { name: "Everyone Active" },
];

export default function GraduateGyms() {
  return (
    <section
      aria-label="Where our graduates work"
      className="bg-zinc-950 border-t border-white/[0.06] py-8"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        <motion.p
          className="text-zinc-600 text-[10px] font-black uppercase tracking-[0.2em] text-center mb-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Our graduates now work at
        </motion.p>

        <motion.div
          className="flex flex-wrap items-center justify-center gap-3"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {GYMS.map((gym) => (
            <div
              key={gym.name}
              className="[backdrop-filter:blur(12px)] bg-white/[0.04] border border-white/[0.09] rounded-lg px-5 py-2.5 flex items-center justify-center"
              style={{ minWidth: "9rem", height: "2.75rem" }}
            >
              {gym.logoUrl ? (
                <img
                  src={gym.logoUrl}
                  alt={gym.name}
                  className="h-5 w-auto object-contain brightness-0 invert opacity-50"
                />
              ) : (
                <span className="text-zinc-500 text-xs font-bold uppercase tracking-widest whitespace-nowrap">
                  {gym.name}
                </span>
              )}
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
