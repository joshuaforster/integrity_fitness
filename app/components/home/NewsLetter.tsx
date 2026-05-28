"use client";

import { motion } from "framer-motion";
import Button from "@/app/components/Button";
import SectionHeader from "@/app/components/ui/SectionHeader";
import SectionWrapper from "@/app/components/ui/SectionWrapper";

export default function Newsletter() {
  return (
    <section
      aria-labelledby="newsletter-heading"
      className="bg-zinc-900 texture-diag-dark angle-tr-lg pb-20 md:pb-24 pt-[152px] md:pt-[168px]"
    >
      <SectionWrapper reveal>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.85, ease: "easeOut" }}
          >
            <SectionHeader
              label="Stay Updated"
              heading="Join Our Newsletter"
              id="newsletter-heading"
              theme="dark"
            />
            <p className="text-white text-base md:text-lg leading-relaxed max-w-md mt-6">
              Be the first to hear about new courses, industry tips, and career
              advice straight from our qualified trainers.
            </p>
          </motion.div>

          <motion.div
            className="lg:col-span-7 w-full"
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.85, delay: 0.15, ease: "easeOut" }}
          >
            <form onSubmit={(e) => e.preventDefault()} className="space-y-4" noValidate>
              <div className="flex flex-col sm:flex-row items-stretch gap-3 sm:gap-2">
                <div className="flex-1 relative">
                  <label htmlFor="newsletter-name" className="sr-only">Your Name</label>
                  <input
                    id="newsletter-name"
                    name="name"
                    type="text"
                    required
                    placeholder="Your name"
                    autoComplete="name"
                    className="w-full bg-zinc-950 border border-zinc-800 focus:border-[#CE1A19] px-4 py-3.5 text-white text-sm placeholder:text-zinc-500 outline-none rounded-sm transition-colors duration-200 focus-visible:ring-1 focus-visible:ring-[#CE1A19]"
                  />
                </div>
                <div className="flex-1 relative">
                  <label htmlFor="newsletter-email" className="sr-only">Email Address</label>
                  <input
                    id="newsletter-email"
                    name="email"
                    type="email"
                    required
                    placeholder="Email address"
                    autoComplete="email"
                    className="w-full bg-zinc-950 border border-zinc-800 focus:border-[#CE1A19] px-4 py-3.5 text-white text-sm placeholder:text-zinc-500 outline-none rounded-sm transition-colors duration-200 focus-visible:ring-1 focus-visible:ring-[#CE1A19]"
                  />
                </div>
                <Button type="submit" variant="primary" size="md" className="whitespace-nowrap px-8 shadow-md">
                  Subscribe
                </Button>
              </div>
              <p className="text-white text-xs tracking-wide">No spam. Unsubscribe at any time.</p>
            </form>
          </motion.div>

        </div>
      </SectionWrapper>
    </section>
  );
}
