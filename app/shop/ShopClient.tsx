"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, type Variants } from "framer-motion";
import { type Qualification } from "@/app/data/qualifications";
import { useCart } from "@/app/context/CartContext";
import Button from "@/app/components/ui/Button";
import SectionWrapper from "@/app/components/ui/SectionWrapper";

/* ── helpers ─────────────────────────────────────────────────────── */

function lowestPrice(q: Qualification): { oneOff: number; monthly: number | null } {
  if (!q.hasBillingToggle) {
    return { oneOff: q.pricing[0].price as number, monthly: null };
  }
  const tiers = q.pricing.map((t) => t.price as { monthly: number; yearly: number });
  return {
    oneOff: Math.min(...tiers.map((p) => p.yearly)),
    monthly: Math.min(...tiers.map((p) => p.monthly)),
  };
}

/* ── PT course row card — mirrors PTCourseList exactly, adds price + CTAs ── */

const ptListVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18 } },
};

const ptItemVariant: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: "easeOut" } },
};

function PTCourseRow({ q }: { q: Qualification }) {
  const { oneOff, monthly } = lowestPrice(q);

  return (
    <motion.div
      variants={ptItemVariant}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
    >
      {/* Card — same style as PTCourseList, no full-link wrapper so we can have separate CTAs */}
      <div className="relative flex flex-col sm:flex-row sm:items-center justify-between p-6 md:p-8 bg-white border border-zinc-950 rounded-2xl overflow-hidden shadow-[0_2px_4px_rgba(0,0,0,0.06),0_6px_24px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_8px_rgba(0,0,0,0.08),0_12px_32px_rgba(0,0,0,0.14)] transition-all duration-300 group">
        {/* Red top accent — same as PTCourseList */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#CE1A19] rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Left: course info */}
        <div className="flex-1 max-w-xl pr-4">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-zinc-600 text-xs font-bold tracking-wider uppercase">
              {q.level}
            </span>
            {q.badge && (
              <span className="text-xs uppercase tracking-widest text-[#CE1A19] border border-[#CE1A19]/20 bg-[#CE1A19]/5 px-2 py-0.5 font-black rounded-sm">
                {q.badge}
              </span>
            )}
          </div>
          <h3 className="text-zinc-950 font-black text-lg md:text-xl group-hover:text-[#CE1A19] transition-colors duration-200 mb-1.5">
            {q.title}
          </h3>
          <p className="text-zinc-600 text-sm leading-relaxed">{q.tagline}</p>
        </div>

        {/* Right: price + CTAs */}
        <div className="flex flex-col sm:items-end gap-4 flex-shrink-0 mt-6 sm:mt-0 pt-4 sm:pt-0 border-t sm:border-t-0 border-zinc-100">
          {/* Price */}
          <div className="sm:text-right">
            <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-1">From</p>
            <div className="flex items-baseline gap-2 sm:justify-end flex-wrap">
              {monthly !== null && (
                <>
                  <span className="text-xl font-black text-zinc-950 leading-none">
                    £{monthly}
                    <span className="text-sm font-bold text-zinc-500">/mo</span>
                  </span>
                  <span className="text-zinc-400 text-xs">or</span>
                </>
              )}
              <span className={`font-black leading-none ${monthly ? "text-base text-zinc-500" : "text-xl text-zinc-950"}`}>
                £{oneOff}{monthly ? " upfront" : ""}
              </span>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex items-center gap-3">
            <Button href={`/courses/${q.slug}`} variant="primary" size="sm">
              Enrol Now
            </Button>
            <Link
              href={`/qualifications/${q.slug}`}
              className="text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-zinc-950 transition-colors"
            >
              Details →
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ── CPD glass card — mirrors CPDCourseGrid exactly, adds price + add-to-basket ── */

const cpdGridVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18 } },
};

const cpdCardVariant: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: "easeOut" } },
};

function CPDCourseCard({ q }: { q: Qualification }) {
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();
  const router = useRouter();

  const tier = q.pricing[0];
  const price = tier.price as number;

  function handleAddToBasket() {
    addItem({
      id: `${q.slug}-${tier.name.toLowerCase().replace(/\s+/g, "-")}-one-off`,
      slug: q.slug,
      courseName: q.title,
      tierName: tier.name,
      paymentType: "one-off",
      price,
      image: q.heroImage,
    });
    setAdded(true);
    setTimeout(() => router.push("/basket"), 700);
  }

  return (
    <motion.div
      variants={cpdCardVariant}
      whileHover={{ y: -6, transition: { duration: 0.22 } }}
      whileTap={{ scale: 0.97 }}
      className="h-full"
    >
      {/* Glass card — same styles as CPDCourseGrid */}
      <div className="relative flex flex-col justify-between p-6 md:p-8 [backdrop-filter:blur(40px)_saturate(160%)] bg-gradient-to-b from-zinc-800/70 to-zinc-900/90 border border-white/[0.13] hover:border-white/[0.28] shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.10)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.14)] transition-all duration-300 group rounded-lg h-full overflow-hidden">
        {/* Same gloss effects as CPDCourseGrid */}
        <div aria-hidden className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.18) 50%, transparent)" }} />
        <div aria-hidden className="absolute top-0 left-0 right-0 h-24 pointer-events-none" style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0.04) 0%, transparent 100%)" }} />

        {/* Course info */}
        <div>
          <span className="text-[#CE1A19] text-xs font-bold tracking-wider uppercase">
            {q.level}
          </span>
          <h3 className="text-white font-black text-lg tracking-tight mt-3 mb-2 leading-tight">
            {q.title}
          </h3>
          <p className="text-zinc-400 text-sm leading-relaxed mb-6">{q.tagline}</p>
        </div>

        {/* Bottom: price + CTAs */}
        <div className="pt-4 border-t border-white/[0.08] mt-auto">
          {/* Price */}
          <div className="flex items-end justify-between mb-5">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-zinc-600 mb-1">
                Course fee
              </p>
              <div className="flex items-baseline gap-0.5">
                <span className="text-base font-black text-zinc-500 self-start mt-0.5">£</span>
                <span className="text-3xl font-black text-white leading-none">{price}</span>
              </div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-600 mt-0.5">
                One-time · {q.duration}
              </p>
            </div>
            <Link
              href={`/qualifications/${q.slug}`}
              className="text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-white transition-colors"
            >
              Details →
            </Link>
          </div>

          {/* Add to basket button */}
          <button
            type="button"
            onClick={handleAddToBasket}
            disabled={added}
            className={`w-full py-3 text-xs font-black uppercase tracking-widest rounded-lg transition-all duration-300 ${
              added
                ? "bg-green-600 text-white cursor-default"
                : "bg-[#CE1A19] text-white hover:bg-red-700"
            }`}
          >
            {added ? "Added to Basket ✓" : "Add to Basket"}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Main component ───────────────────────────────────────────────── */

export default function ShopClient({
  ptCourses,
  cpdCourses,
}: {
  ptCourses: Qualification[];
  cpdCourses: Qualification[];
}) {
  return (
    <main className="bg-zinc-50">

      {/* ── Personal Training — mirrors qualifications page PT section ── */}
      <section
        aria-labelledby="pt-heading"
        className="py-20 md:py-28 border-b border-zinc-200/60"
      >
        <SectionWrapper reveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

            {/* Left sticky column — same as qualifications page */}
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

            {/* Right: course rows — same lg:col-span-8 area as qualifications page */}
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
        </SectionWrapper>
      </section>

      {/* ── CPD — mirrors qualifications page CPD section exactly ── */}
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

          {/* CPD grid — same structure as CPDCourseGrid */}
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
        </SectionWrapper>
      </section>

    </main>
  );
}
