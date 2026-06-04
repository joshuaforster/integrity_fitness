"use client";

import { motion } from "framer-motion";
import { type Qualification } from "@/app/data/qualifications";
import SectionWrapper from "@/app/components/ui/SectionWrapper";
import StripeTrustBar from "@/app/components/ui/StripeTrustBar";
import PTCourseRow, { ptListVariants } from "./PTCourseRow";
import CPDCourseCard, { cpdGridVariants } from "./CPDCourseCard";

export default function ShopClient({
  ptCourses,
  cpdCourses,
}: {
  ptCourses: Qualification[];
  cpdCourses: Qualification[];
}) {
  return (
    <main className="bg-zinc-50">

      <section
        aria-labelledby="pt-heading"
        className="py-20 md:py-28 border-b border-zinc-200/60"
      >
        <SectionWrapper reveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

            <div className="lg:col-span-4 sticky top-28 space-y-6">
              <div>
                <p className="text-[#CE1A19] text-xs font-bold tracking-widest uppercase mb-4">
                  Career Qualifications
                </p>
                <h2
                  id="pt-heading"
                  className="text-2xl md:text-4xl font-black text-zinc-950 tracking-tight uppercase leading-none"
                >
                  Personal Training
                </h2>
                <div className="w-14 h-1 bg-[#CE1A19] mt-5" aria-hidden="true" />
              </div>

              <div className="border-l-2 border-zinc-200 pl-5 pt-1">
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-950 mb-2">
                  Where do you start?
                </h3>
                <p className="text-zinc-600 text-sm leading-relaxed">
                  New to fitness coaching? The <strong>Combined Diploma</strong> gets
                  you fully qualified in one programme. Already hold a Level 2?
                  Go straight to the <strong>Level 3</strong>.
                </p>
              </div>

              <div className="border-l-2 border-zinc-200 pl-5 pt-1">
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-950 mb-2">
                  Choosing a plan
                </h3>
                <p className="text-zinc-600 text-sm leading-relaxed">
                  Each course has three study plans — click <strong>Enrol Now</strong> to
                  pick your level of support and payment type.
                </p>
              </div>
            </div>

            <motion.div
              className="lg:col-span-8 space-y-4 w-full"
              variants={ptListVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              {ptCourses.map((q) => (
                <PTCourseRow key={q.slug} q={q} />
              ))}
            </motion.div>

          </div>
          <div className="mt-10">
            <StripeTrustBar theme="light" />
          </div>
        </SectionWrapper>
      </section>

      <section
        aria-labelledby="cpd-heading"
        className="bg-[#18181B] texture-dots-dark angle-tl pb-20 md:pb-28 pt-[132px] md:pt-[164px]"
      >
        <SectionWrapper reveal>
          <div className="mb-12 md:mb-16">
            <p className="text-[#CE1A19] text-xs font-bold tracking-widest uppercase mb-4">
              Specialist Upgrades
            </p>
            <h2
              id="cpd-heading"
              className="text-2xl md:text-4xl font-black text-white tracking-tight uppercase leading-none"
            >
              CPD Awards
            </h2>
            <div className="w-14 h-1 bg-[#CE1A19] mt-5" aria-hidden="true" />

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
              <div className="border-l-2 border-zinc-700 pl-5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-2">
                  Fixed price, one day
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  CPD awards sit alongside your core qualification and expand what
                  you can legally offer. No tiers — one clear price, one-day delivery.
                </p>
              </div>
              <div className="border-l-2 border-zinc-700 pl-5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-2">
                  Add directly to basket
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Single fixed price per course. Hit <strong className="text-zinc-200">Add to Basket</strong>{" "}
                  to enrol straight away, or browse the full course details first.
                </p>
              </div>
            </div>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={cpdGridVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {cpdCourses.map((q) => (
              <CPDCourseCard key={q.slug} q={q} />
            ))}
          </motion.div>
          <div className="mt-10">
            <StripeTrustBar theme="dark" />
          </div>
        </SectionWrapper>
      </section>

    </main>
  );
}
