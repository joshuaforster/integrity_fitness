"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Button from "@/app/components/ui/Button";
import SectionHeader from "@/app/components/ui/SectionHeader";
import SectionWrapper from "@/app/components/ui/SectionWrapper";
import { newsletterSection } from "@/app/content/home";

export default function Newsletter() {
  return (
    <section
      aria-labelledby="newsletter-heading"
      className="bg-zinc-900 texture-diag-dark angle-tl-lg pb-20 md:pb-24 pt-[152px] md:pt-[168px]"
    >
      <SectionWrapper reveal>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          <motion.div
            className="lg:col-span-5 flex flex-col items-start"
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.85, ease: "easeOut" }}
          >
            <SectionHeader
              label={newsletterSection.label}
              heading={newsletterSection.heading}
              id="newsletter-heading"
              theme="dark"
            />
            <p className="text-white text-base md:text-lg leading-relaxed max-w-md mt-6 mb-8">
              {newsletterSection.body}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button href={newsletterSection.button1.href} variant="primary" size="md">
                {newsletterSection.button1.label}
              </Button>
              <Button href={newsletterSection.button2.href} variant="outline-dark" size="md">
                {newsletterSection.button2.label}
              </Button>
            </div>
          </motion.div>

          <motion.div
            className="lg:col-span-7 w-full"
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.85, delay: 0.15, ease: "easeOut" }}
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
              <Image
                src={newsletterSection.image.src}
                alt={newsletterSection.image.alt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 58vw"
              />
            </div>
          </motion.div>

        </div>
      </SectionWrapper>
    </section>
  );
}
