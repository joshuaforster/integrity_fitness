"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { type Qualification, type PricingTier } from "@/app/data/qualifications";
import { useCart, type CartItem } from "@/app/context/CartContext";
import { staggerContainer, slideInItem, cardVariants } from "@/lib/animations";
import Button from "@/app/components/ui/Button";
import AnimatedCheck from "@/app/components/ui/AnimatedCheck";

/* ── price helpers ──────────────────────────────────────────────── */

function getPrice(tier: PricingTier, billing: "one-off" | "monthly"): number {
  if (typeof tier.price === "number") return tier.price;
  return billing === "monthly" ? tier.price.monthly : tier.price.yearly;
}

function getSaving(tier: PricingTier, billing: "one-off" | "monthly"): number {
  if (typeof tier.price === "number") return 0;
  return billing === "one-off" ? tier.price.monthly * 12 - tier.price.yearly : 0;
}

/* ── related course mini-card ───────────────────────────────────── */

function RelatedCourseCard({ q, index }: { q: Qualification; index: number }) {
  const startPrice =
    typeof q.pricing[0].price === "number"
      ? q.pricing[0].price
      : (q.pricing[0].price as { yearly: number }).yearly;

  return (
    <motion.div
      variants={cardVariants}
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      className="group relative flex flex-col rounded-xl overflow-hidden bg-white border border-zinc-200 hover:border-zinc-400 shadow-[0_2px_8px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] transition-all duration-300"
    >
      <div className="relative h-32 flex-shrink-0 overflow-hidden">
        <Image
          src={q.heroImage}
          alt={q.title}
          fill
          sizes="(max-width:768px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 to-transparent" />
        <span className="absolute top-3 left-3 text-[10px] font-black uppercase tracking-widest bg-zinc-950/70 text-zinc-400 border border-white/10 px-2 py-0.5 rounded-full">
          {q.level}
        </span>
      </div>
      <div className="flex flex-col flex-1 p-4">
        <p className="text-zinc-950 font-bold text-sm leading-snug mb-1">{q.title}</p>
        <p className="text-zinc-500 text-xs leading-relaxed flex-1 mb-4 line-clamp-2">{q.tagline}</p>
        <div className="flex items-center justify-between">
          <span className="text-zinc-950 font-black">
            £{startPrice}
            {q.hasBillingToggle && <span className="text-xs text-zinc-500 font-bold">+</span>}
          </span>
          <Link
            href={`/courses/${q.slug}`}
            className="text-xs font-bold uppercase tracking-wider text-[#CE1A19] hover:text-red-400 transition-colors"
          >
            Enrol →
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

/* ── billing toggle ─────────────────────────────────────────────── */

function BillingToggle({
  billing,
  setBilling,
  saving,
}: {
  billing: "one-off" | "monthly";
  setBilling: (v: "one-off" | "monthly") => void;
  saving: number;
}) {
  return (
    <div className="relative inline-block">
      <div
        role="group"
        aria-label="Payment type"
        className="relative inline-flex items-center bg-zinc-100 border border-zinc-200 rounded-full p-1"
      >
        <motion.div
          className="absolute top-1 bottom-1 bg-white rounded-full shadow-[0_1px_4px_rgba(0,0,0,0.12)]"
          animate={{
            left: billing === "monthly" ? "4px" : "50%",
            width: "calc(50% - 4px)",
          }}
          transition={{ type: "spring", stiffness: 400, damping: 32 }}
        />
        {(["monthly", "one-off"] as const).map((val) => (
          <button
            key={val}
            type="button"
            onClick={() => setBilling(val)}
            aria-pressed={billing === val}
            className={`relative z-10 w-28 py-2 text-xs font-bold uppercase tracking-wider rounded-full transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-[#CE1A19] ${
              billing === val ? "text-zinc-950" : "text-zinc-400 hover:text-zinc-950"
            }`}
          >
            {val === "monthly" ? "Monthly" : "Pay in Full"}
          </button>
        ))}
      </div>
      {saving > 0 && (
        <motion.span
          animate={{ opacity: billing === "one-off" ? 1 : 0.45, scale: billing === "one-off" ? 1 : 0.9 }}
          className="absolute -top-3.5 right-0 text-[10px] font-black bg-[#CE1A19] text-white px-2 py-0.5 rounded-full leading-none pointer-events-none whitespace-nowrap"
        >
          SAVE £{saving}
        </motion.span>
      )}
    </div>
  );
}

/* ── main component ─────────────────────────────────────────────── */

const slideIn: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

export default function ProductPageClient({
  qual,
  initialTierIndex = 0,
  initialBilling = "one-off",
  relatedCourses = [],
}: {
  qual: Qualification;
  initialTierIndex?: number;
  initialBilling?: "one-off" | "monthly";
  relatedCourses?: Qualification[];
}) {
  const [selectedTierIndex, setSelectedTierIndex] = useState(initialTierIndex);
  const [billing, setBilling] = useState<"one-off" | "monthly">(initialBilling);
  const { addItem } = useCart();
  const router = useRouter();

  const tier = qual.pricing[selectedTierIndex];
  if (!tier) return null;

  const price = getPrice(tier, billing);
  const saving = getSaving(tier, billing);
  const period =
    typeof tier.price === "number"
      ? "one-time"
      : billing === "monthly"
      ? "/ month"
      : "pay in full";

  function handleAddToBasket() {
    const item: Omit<CartItem, "quantity"> = {
      id: `${qual.slug}-${tier.name.toLowerCase().replace(/\s+/g, "-")}-${billing}`,
      slug: qual.slug,
      courseName: qual.title,
      tierName: tier.name,
      paymentType: billing,
      price,
      deposit: tier.deposit,
      image: qual.heroImage,
    };
    addItem(item);
    router.push("/basket");
  }

  return (
    <>
      {/* ── Main purchase section ─────────────────────────────── */}
      <section className="bg-white py-10 md:py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

            {/* ── Left: plan details ─────────────────────────── */}
            <div className="lg:col-span-7 space-y-10">

              {/* Plan selector */}
              {qual.pricing.length > 1 && (
                <motion.div variants={slideIn} initial="hidden" animate="visible" transition={{ delay: 0.05 }}>
                  <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-3">
                    Select plan
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {qual.pricing.map((t, i) => (
                      <button
                        key={t.name}
                        type="button"
                        onClick={() => setSelectedTierIndex(i)}
                        className={`relative px-5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-[#CE1A19] ${
                          i === selectedTierIndex
                            ? "bg-zinc-950 text-white shadow-[0_4px_16px_rgba(0,0,0,0.2)]"
                            : "bg-zinc-100 text-zinc-500 border border-zinc-200 hover:border-zinc-400 hover:text-zinc-900"
                        }`}
                      >
                        {t.highlighted && (
                          <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 text-[9px] font-black uppercase tracking-widest bg-[#CE1A19] text-white px-2 py-0.5 rounded-full leading-none whitespace-nowrap">
                            Recommended
                          </span>
                        )}
                        {t.name}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Plan description */}
              <motion.div
                key={`desc-${selectedTierIndex}`}
                variants={slideIn}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.1 }}
              >
                <p className="text-[#CE1A19] text-xs font-bold tracking-widest uppercase mb-3">
                  {tier.name} Plan
                </p>
                <p className="text-zinc-600 text-lg leading-relaxed">
                  {tier.description}
                </p>
              </motion.div>

              <div className="h-px bg-zinc-100" aria-hidden="true" />

              {/* What's included */}
              <motion.div
                key={`includes-${selectedTierIndex}`}
                variants={slideIn}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.15 }}
              >
                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-6">
                  What&apos;s included
                </p>
                <motion.ul
                  className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-10"
                  role="list"
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                >
                  {tier.includes.map((item) => (
                    <motion.li key={item} className="flex items-start gap-3" variants={slideInItem}>
                      <AnimatedCheck size={15} delay={0} color="#16a34a" />
                      <span className="text-zinc-700 text-sm leading-snug">{item}</span>
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>

              <div className="h-px bg-zinc-100" aria-hidden="true" />

              {/* Course at a glance */}
              <motion.div
                variants={slideIn}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.2 }}
              >
                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-5">
                  Course at a glance
                </p>
                <dl className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {[
                    { label: "Level", value: qual.level },
                    { label: "Awarding Body", value: qual.awardingBody },
                    { label: "Study", value: qual.duration },
                    ...(qual.durationMonths
                      ? [{ label: "Completion", value: qual.durationMonths }]
                      : []),
                    { label: "Delivery", value: "1-to-1 with Harry" },
                  ].map(({ label, value }) => (
                    <div
                      key={label}
                      className="bg-zinc-50 border border-zinc-200 rounded-xl p-4"
                    >
                      <dt className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-1">
                        {label}
                      </dt>
                      <dd className="text-sm font-bold text-zinc-900 leading-snug">{value}</dd>
                    </div>
                  ))}
                </dl>
              </motion.div>

            </div>

            {/* ── Right: sticky dark glass purchase panel ──────── */}
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-28">

                <motion.div
                  variants={slideIn}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.12 }}
                  className="relative rounded-2xl overflow-hidden bg-white border border-zinc-200 shadow-[0_4px_24px_rgba(0,0,0,0.08)]"
                >

                  <div className="p-7 md:p-8">

                    {/* Header */}
                    <div className="mb-6 pb-5 border-b border-zinc-200">
                      <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-1.5">
                        Your order
                      </p>
                      <p className="text-zinc-950 font-black text-base leading-snug">
                        {qual.shortTitle}
                      </p>
                      <p className="text-[#CE1A19] text-xs font-bold uppercase tracking-wider mt-1">
                        {tier.name} Plan
                      </p>
                    </div>

                    {/* Billing toggle */}
                    {qual.hasBillingToggle && (
                      <div className="mb-7">
                        <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-3">
                          Payment type
                        </p>
                        <BillingToggle
                          billing={billing}
                          setBilling={setBilling}
                          saving={saving}
                        />
                      </div>
                    )}

                    {/* Price */}
                    <div className="mb-7">
                      <div className="flex items-end gap-1 leading-none">
                        <span className="text-xl font-black text-zinc-400 self-start mt-2">£</span>
                        <motion.span
                          key={price}
                          initial={{ opacity: 0, y: -8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.25, ease: "easeOut" }}
                          className="text-6xl font-black text-zinc-950 tracking-tight"
                        >
                          {price}
                        </motion.span>
                      </div>
                      <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mt-2">
                        {period}
                      </p>
                      {tier.deposit && billing === "monthly" && (
                        <div className="mt-2 space-y-1">
                          <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest">
                            After a £{tier.deposit} deposit
                          </p>
                          <p className="text-zinc-400 text-xs leading-relaxed">
                            Monthly payments are charged automatically to your saved card — no manual action needed. Payments continue until your course is complete.
                          </p>
                        </div>
                      )}
                      {saving > 0 && (
                        <motion.p
                          key={saving}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-[#CE1A19] text-xs font-bold mt-2"
                        >
                          Saving £{saving} vs monthly
                        </motion.p>
                      )}
                    </div>

                    {/* CTA */}
                    <div className="mb-6 pb-6 border-b border-zinc-200">
                      <Button onClick={handleAddToBasket} variant="primary" size="lg" fullWidth>
                        Add to Basket — £{price}
                        {billing === "monthly" && typeof tier.price !== "number" ? "/mo" : ""}
                      </Button>
                    </div>

                    {/* Trust signals */}
                    <ul className="space-y-3" role="list">
                      {[
                        "Secure checkout",
                        "CIMSPA-accredited qualification",
                        "One-to-one delivery with Harry",
                        "Flexible study schedule",
                      ].map((text) => (
                        <li key={text} className="flex items-center gap-3">
                          <svg className="w-3.5 h-3.5 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-zinc-500 text-xs">{text}</span>
                        </li>
                      ))}
                    </ul>

                  </div>
                </motion.div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Related products ──────────────────────────────────── */}
      {relatedCourses.length > 0 && (
        <section
          aria-labelledby="related-heading"
          className="bg-[#18181B] texture-dots-dark py-20 md:py-28 border-t border-white/[0.05]"
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              className="mb-10 md:mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <p className="text-[#CE1A19] text-xs font-bold tracking-widest uppercase mb-3">
                Complete your collection
              </p>
              <h2
                id="related-heading"
                className="text-2xl md:text-4xl font-black text-white tracking-tight uppercase leading-none"
              >
                You Might Also Want
              </h2>
              <div className="w-14 h-1 bg-[#CE1A19] mt-5" aria-hidden="true" />
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {relatedCourses.map((q, i) => (
                <RelatedCourseCard key={q.slug} q={q} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
