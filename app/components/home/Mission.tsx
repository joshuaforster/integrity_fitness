"use client";

import { motion } from "framer-motion";
import Button from "@/app/components/ui/Button";
import SectionHeader from "@/app/components/ui/SectionHeader";
import SectionWrapper from "@/app/components/ui/SectionWrapper";
import ImageCarousel from "@/app/components/ui/ImageCarousel";

import { missionImages as IMAGES, missionCopy, missionSection } from "@/app/content/home";

const SCM_TERM = "Sternocleidomastoid";
const SCM_TOOLTIP = "A large neck muscle that runs from behind your ear to your collarbone. You'll learn it — your clients probably won't ask.";

export default function Mission() {

  return (
    <section className="bg-zinc-50 texture-dots-light angle-tl-lg pt-32 md:pt-40 pb-20 md:pb-28 [filter:drop-shadow(0_-6px_18px_rgba(0,0,0,0.09))]">
      <SectionWrapper reveal>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Text column */}
          <motion.div
            className="lg:col-span-6 xl:col-span-5"
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.85, ease: "easeOut" }}
          >
            <SectionHeader
              label={missionSection.label}
              heading={missionSection.heading}
              headingSize="sm"
            />
            <div className="space-y-6 text-zinc-600 text-base md:text-lg leading-relaxed mb-10 mt-8">
              {missionCopy.map((p, i) => {
                if (p.includes(SCM_TERM)) {
                  const [before, after] = p.split(SCM_TERM);
                  return (
                    <p key={i}>
                      {before}
                      <span className="relative inline-block group">
                        <span
                          tabIndex={0}
                          aria-describedby="scm-tooltip"
                          className="underline decoration-dotted underline-offset-2 cursor-help text-zinc-900 font-medium rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#CE1A19] focus-visible:ring-offset-1"
                        >
                          {SCM_TERM}
                        </span>
                        <span
                          id="scm-tooltip"
                          role="tooltip"
                          className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-64 rounded-xl px-4 py-3 text-xs text-white/90 bg-zinc-900/75 backdrop-blur-md border border-white/10 shadow-2xl opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-200 z-10 leading-relaxed text-center"
                        >
                          {SCM_TOOLTIP}
                          <span className="absolute top-full left-1/2 -translate-x-1/2 border-[5px] border-transparent border-t-zinc-900/75" />
                        </span>
                      </span>
                      {after}
                    </p>
                  );
                }
                return <p key={i}>{p}</p>;
              })}
            </div>
            <Button href={missionSection.button.href} variant="primary" responsive>
              {missionSection.button.label}
            </Button>
          </motion.div>

          {/* Image carousel */}
          <motion.div
            className="lg:col-span-6 xl:col-span-7"
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.85, delay: 0.15, ease: "easeOut" }}
          >
            <ImageCarousel
              images={IMAGES}
              interval={5000}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
            />
          </motion.div>

        </div>
      </SectionWrapper>
    </section>
  );
}
