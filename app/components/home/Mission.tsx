"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Button from "@/app/components/Button";
import SectionHeader from "@/app/components/ui/SectionHeader";
import SectionWrapper from "@/app/components/ui/SectionWrapper";

const IMAGES = [
  {
    src: "https://pub-6e6bb53af6c34756a861d2c0a8259e84.r2.dev/Godigital%20grant%20-%20Revel/Revel%20Studios%20IFE-4.jpg",
    alt: "Students enjoying a personal training session together",
  },
] as const;

export default function Mission() {
  const [imageIdx, setImageIdx] = useState(0);

  useEffect(() => {
    if (IMAGES.length <= 1) return;
    const imgTimer = setInterval(() => {
      setImageIdx((i) => (i + 1) % IMAGES.length);
    }, 5000);
    return () => clearInterval(imgTimer);
  }, []);

  return (
    <section className="bg-white texture-grid-light py-20 md:py-28 border-t border-zinc-100">
      <SectionWrapper reveal>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Text column */}
          <motion.div
            className="lg:col-span-6 xl:col-span-5"
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.85, ease: "easeOut" }}
          >
            <SectionHeader
              label="Who We Are"
              heading="One To One Learning Like No Other"
              headingSize="sm"
            />
            <div className="space-y-6 text-zinc-600 text-base md:text-lg leading-relaxed mb-10 mt-8">
              <p>
                At Integrity, we take pride in giving the best possible experience
                by preparing our students to enter the fitness industry confidently
                and ready to thrive.
              </p>
              <p>
                Our team bring the course to life with plenty of professional
                experience and real, applicable tips and tricks that they have
                picked up over the years.
              </p>
            </div>
            <Button href="/about" variant="primary" className="w-full sm:w-auto px-8">
              About Us
            </Button>
          </motion.div>

          {/* Image slideshow */}
          <motion.div
            className="lg:col-span-6 xl:col-span-7 relative overflow-hidden min-h-[480px] bg-zinc-950 rounded-sm shadow-sm"
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.85, delay: 0.15, ease: "easeOut" }}
          >
            {IMAGES.map((img, i) => (
              <Image
                key={img.src}
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                priority={i === 0}
                className={`object-cover ${IMAGES.length > 1 ? "transition-opacity duration-[1400ms] ease-in-out" : ""}`}
                style={{ opacity: IMAGES.length > 1 ? (i === imageIdx ? 0.92 : 0) : 0.92 }}
              />
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/30 via-transparent to-zinc-950/10 pointer-events-none" />
          </motion.div>

        </div>
      </SectionWrapper>
    </section>
  );
}
