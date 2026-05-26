"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Button from "@/app/components/Button";
import SectionHeader from "@/app/components/ui/SectionHeader";
import SectionWrapper from "@/app/components/ui/SectionWrapper";

export default function Mission() {
  return (
    <section className="bg-white texture-grid-light py-20 md:py-28 border-t border-zinc-100">
      <SectionWrapper reveal>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

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

          <motion.div
            className="lg:col-span-6 xl:col-span-7 relative overflow-hidden min-h-[460px] bg-zinc-950 border border-zinc-900 rounded-sm shadow-sm group"
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.85, delay: 0.15, ease: "easeOut" }}
          >
            <Image
              src="/harry.png"
              alt="Instructor leading a personal training lesson"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
              className="object-cover opacity-80 transition-transform duration-700 ease-out group-hover:scale-[1.02]"
              priority={false}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/90 via-zinc-950/75 to-zinc-950/50" />
            <div className="relative z-10 p-8 md:p-14 flex flex-col justify-between min-h-[460px] h-full">
              <motion.span
                className="text-6xl text-[#CE1A19] font-serif leading-none select-none"
                aria-hidden="true"
                animate={{ y: [0, -6, 0], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              >
                &ldquo;
              </motion.span>
              <div className="my-auto max-w-md">
                <blockquote className="text-white text-lg md:text-xl font-medium leading-relaxed tracking-wide mb-6">
                  Develop a passion for learning. If you do, you will never cease to grow.
                </blockquote>
                <cite className="text-zinc-400 text-xs tracking-[2px] uppercase font-semibold not-italic block">
                  — Anthony J. D&apos;Angelo
                </cite>
              </div>
            </div>
          </motion.div>

        </div>
      </SectionWrapper>
    </section>
  );
}
