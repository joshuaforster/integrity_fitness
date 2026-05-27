"use client";

import { motion, type Variants } from "framer-motion";
import SectionHeader from "@/app/components/ui/SectionHeader";
import SectionWrapper from "@/app/components/ui/SectionWrapper";
import ValueCard, { type Value } from "./ValueCard";

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

const cardVariant: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

// ── Animated icons ────────────────────────────────────────────────────────────

function HonestyIcon() {
  return (
    // Outer wrapper pulses gently while in view
    <motion.div
      animate={{ scale: [1, 1.07, 1] }}
      transition={{ duration: 3.2, repeat: Infinity, repeatDelay: 1.2, ease: "easeInOut" }}
    >
      <motion.svg
        width="28" height="28" viewBox="0 0 24 24"
        fill="none" strokeWidth={1.75} stroke="#CE1A19"
        strokeLinecap="round" strokeLinejoin="round"
      >
        {/* Badge outline — draws in first */}
        <motion.path
          d="M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
        />
        {/* Checkmark — draws in after the badge */}
        <motion.path
          d="M9 12.75 11.25 15 15 9.75"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.45, delay: 0.8, ease: "easeOut" }}
        />
      </motion.svg>
    </motion.div>
  );
}

function ExcellenceIcon() {
  return (
    // Wrapper rocks gently like a star twinkling
    <motion.div
      animate={{ rotate: [0, 10, 0, -10, 0] }}
      transition={{ duration: 4.5, repeat: Infinity, repeatDelay: 1.5, ease: "easeInOut" }}
    >
      <motion.svg
        width="28" height="28" viewBox="0 0 24 24"
        fill="none" strokeWidth={1.75} stroke="#CE1A19"
        strokeLinecap="round" strokeLinejoin="round"
      >
        {/* Star — single continuous path, draws around */}
        <motion.path
          d="M11.48 3.499c.172-.367.694-.367.866 0l2.254 4.816 5.008.643c.404.052.566.551.27.836l-3.601 3.498.88 4.974c.071.402-.353.71-.708.514L12 18.354l-4.43 2.422c-.354.197-.779-.111-.708-.514l.88-4.974-3.601-3.498c-.296-.285-.135-.784.27-.836l5.008-.643 2.254-4.816Z"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 1.1, ease: "easeInOut" }}
        />
      </motion.svg>
    </motion.div>
  );
}

function CommunityIcon() {
  return (
    // Wrapper floats up and down gently
    <motion.div
      animate={{ y: [0, -4, 0] }}
      transition={{ duration: 3.0, repeat: Infinity, repeatDelay: 0.8, ease: "easeInOut" }}
    >
      {/* Complex compound path — spring scale-in instead of pathLength */}
      <motion.svg
        width="28" height="28" viewBox="0 0 24 24"
        fill="none" strokeWidth={1.75} stroke="#CE1A19"
        strokeLinecap="round" strokeLinejoin="round"
        initial={{ opacity: 0, scale: 0.6 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: false }}
        transition={{ duration: 0.6, ease: "backOut" }}
      >
        <path d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
      </motion.svg>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

const VALUES: Value[] = [
  {
    title: "Honesty",
    description:
      "We are defined by honesty and strong moral principles. Everything we do is transparent, straightforward, and in the absolute best interest of our student roster.",
    icon: HonestyIcon,
  },
  {
    title: "Excellence",
    description:
      "We hold ourselves to the highest technical benchmarks in fitness education. Our material goes far beyond basic syllabus criteria to construct industry-ready coaches.",
    icon: ExcellenceIcon,
  },
  {
    title: "Community",
    description:
      "We believe elite skill development happens together. Our students gain lifelong access to an integrated professional network built to collaborate over career metrics.",
    icon: CommunityIcon,
  },
];

export default function Values() {
  return (
    <section
      aria-labelledby="values-heading"
      className="bg-zinc-50 texture-dots-light py-20 md:py-28 border-t border-zinc-200/80"
    >
      <SectionWrapper reveal>
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <SectionHeader
            label="What We Stand For"
            heading={<>Proven Principles.<br />Tried &amp; Tested Results.</>}
            id="values-heading"
            align="center"
          />
          <p className="text-zinc-600 text-base md:text-lg leading-relaxed mt-6">
            At Integrity, we operate with a clear set of values that shape every
            course, every session, and every interaction with our students. This
            isn&apos;t just a business — it&apos;s a mission.
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-12 md:gap-y-0"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
        >
          {VALUES.map((value) => (
            <motion.div key={value.title} variants={cardVariant}>
              <ValueCard value={value} />
            </motion.div>
          ))}
        </motion.div>
      </SectionWrapper>
    </section>
  );
}
