"use client";

import { motion } from "framer-motion";
import Button from "@/app/components/ui/Button";
import SectionHeader from "@/app/components/ui/SectionHeader";
import SectionWrapper from "@/app/components/ui/SectionWrapper";
import ImageCarousel from "@/app/components/ui/ImageCarousel";

import { statsCopy, statsSection, statsImages } from "@/app/content/home";

export default function Stats() {
  return (
    <section className="bg-zinc-900 texture-dots-dark angle-tr-lg pb-24 md:pb-32 pt-[168px] md:pt-[200px]">
      <SectionWrapper>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          <motion.div
            className="flex flex-col items-start text-left"
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <SectionHeader
              label={statsSection.label}
              heading={statsSection.heading}
              theme="dark"
              headingSize="sm"
            />
            <p className="text-white text-base md:text-lg leading-relaxed mt-6 mb-8 max-w-md">
              {statsCopy}
            </p>
            <Button href={statsSection.button.href} variant="primary" responsive>
              {statsSection.button.label}
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
          >
            <ImageCarousel
              images={statsImages}
              interval={3500}
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </motion.div>

        </div>
      </SectionWrapper>
    </section>
  );
}
