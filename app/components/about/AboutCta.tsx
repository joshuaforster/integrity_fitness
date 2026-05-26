"use client";

import { motion, type Variants } from "framer-motion";
import Button from "@/app/components/Button";
import SectionHeader from "@/app/components/ui/SectionHeader";
import SectionWrapper from "@/app/components/ui/SectionWrapper";
import CredentialCard, { type CredentialCard as CredentialCardType } from "./CredentialCard";

const CREDENTIALS: CredentialCardType[] = [
  {
    type: "brand",
    src: "/cimspa.webp",
    alt: "CIMSPA Chartered Institute logo",
    width: 140,
    height: 32,
    label: "Accredited Partner",
  },
  {
    type: "brand",
    src: "/activeiq.png",
    alt: "Active IQ Awarding Body logo",
    width: 140,
    height: 32,
    label: "Approved Centre",
  },
  { type: "metric", value: "1:1", label: "Format", description: "Tailored private mentorship." },
  { type: "metric", value: "NR3", label: "Norwich", description: "Complete Fitness Gym base." },
];

const gridVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18 } },
};

const cardVariant: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: "easeOut" } },
};

export default function AboutCTA() {
  return (
    <section
      aria-labelledby="cta-heading"
      className="bg-white texture-grid-light py-20 md:py-28 border-t border-zinc-100"
    >
      <SectionWrapper reveal>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          <motion.div
            className="lg:col-span-5 flex flex-col items-start"
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.85, ease: "easeOut" }}
          >
            <SectionHeader
              label="Ready To Start?"
              heading={<>Take The<br />First Step.</>}
              id="cta-heading"
              headingSize="lg"
            />
            <p className="text-zinc-600 text-base md:text-lg leading-relaxed mb-10 max-w-md mt-8">
              Whether you&apos;re looking to start your journey in personal
              training or take your existing career to the next level, we have a
              qualification built around your exact velocity.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <Button href="/qualifications" variant="primary" size="md" className="w-full sm:w-auto px-8">
                View Qualifications
              </Button>
              <Button href="/contact" variant="outline-light" size="md" className="w-full sm:w-auto px-8">
                Get In Touch
              </Button>
            </div>
          </motion.div>

          <motion.div
            className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full lg:pl-6"
            variants={gridVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
          >
            {CREDENTIALS.map((item, i) => (
              <motion.div
                key={i}
                variants={cardVariant}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.97 }}
              >
                <CredentialCard item={item} />
              </motion.div>
            ))}
          </motion.div>

        </div>
      </SectionWrapper>
    </section>
  );
}
