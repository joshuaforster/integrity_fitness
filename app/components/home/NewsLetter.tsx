"use client";

import { motion } from "framer-motion";
import Button from "@/app/components/ui/Button";
import SectionHeader from "@/app/components/ui/SectionHeader";
import SectionWrapper from "@/app/components/ui/SectionWrapper";
import { newsletterSection } from "@/app/content/home";

const CHANNELS = [
  { label: "Email", value: "harry@integrityfitness.education", href: "mailto:harry@integrityfitness.education" },
  { label: "Phone", value: "+44 7795 033958", href: "tel:+447795033958" },
]

const POINTS = [
  "No sales pressure — just honest advice",
  "Harry or Paris responds personally",
  "Find the right course for where you are now",
]

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
            <Button href={newsletterSection.button.href} variant="primary" size="md">
              {newsletterSection.button.label}
            </Button>
            <p className="text-zinc-500 text-xs tracking-wide mt-4">{newsletterSection.note}</p>
          </motion.div>

          <motion.div
            className="lg:col-span-7 w-full"
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.85, delay: 0.15, ease: "easeOut" }}
          >
            <div className="border border-white/10 rounded-2xl p-8 space-y-8 bg-white/[0.03]">

              <ul className="space-y-4">
                {POINTS.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <span className="mt-1 w-4 h-4 flex-shrink-0 rounded-full bg-[#CE1A19] flex items-center justify-center">
                      <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="text-white text-sm leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>

              <div className="border-t border-white/10 pt-6 space-y-4">
                {CHANNELS.map((c) => (
                  <div key={c.label} className="flex items-center justify-between">
                    <span className="text-zinc-500 text-xs font-bold uppercase tracking-widest">{c.label}</span>
                    <a href={c.href} className="text-white text-sm font-medium hover:text-[#CE1A19] transition-colors">
                      {c.value}
                    </a>
                  </div>
                ))}
              </div>

            </div>
          </motion.div>

        </div>
      </SectionWrapper>
    </section>
  );
}
