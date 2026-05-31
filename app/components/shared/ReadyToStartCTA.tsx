"use client";

import { motion, type Variants } from "framer-motion";
import Button from "@/app/components/ui/Button";
import SectionHeader from "@/app/components/ui/SectionHeader";
import SectionWrapper from "@/app/components/ui/SectionWrapper";
import CredentialCard from "@/app/components/about/CredentialCard";
import { ctaCredentials as CREDENTIALS } from "@/app/content/credentials";
import { readyToStartSection } from "@/app/content/shared";

const gridVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18 } },
};

const cardVariant: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: "easeOut" } },
};

export default function ReadyToStartCTA() {
  return (
    <section
      aria-labelledby="cta-heading"
      className="bg-white texture-grid-light angle-tl pb-20 md:pb-28 pt-[132px] md:pt-[164px]"
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
              label={readyToStartSection.label}
              heading={readyToStartSection.heading}
              id="cta-heading"
              headingSize="lg"
            />
            <p className="text-zinc-600 text-base md:text-lg leading-relaxed mb-10 max-w-md mt-8">
              {readyToStartSection.body}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <Button href={readyToStartSection.button1.href} variant="primary" responsive>
                {readyToStartSection.button1.label}
              </Button>
              <Button href={readyToStartSection.button2.href} variant="outline-light" responsive>
                {readyToStartSection.button2.label}
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
