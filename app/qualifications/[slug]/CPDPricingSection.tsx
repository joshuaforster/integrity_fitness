"use client";

import { motion, type Variants } from "framer-motion";
import Button from "@/app/components/Button";
import SectionWrapper from "@/app/components/ui/SectionWrapper";
import AnimatedCheck from "@/app/components/ui/AnimatedCheck";
import { type Qualification } from "@/app/data/qualifications";

const listVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -16 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

interface CPDPricingSectionProps {
  qual: Qualification;
  theme?: "dark" | "light";
}

const sectionBg = {
  dark: "bg-zinc-900 border-b border-zinc-950",
  light: "bg-zinc-50 border-t border-zinc-200/80",
};

const cardBg = {
  dark: "bg-zinc-950 border-zinc-900",
  light: "bg-white border-zinc-200/80",
};

const labelColor = {
  dark: "text-white",
  light: "text-zinc-950",
};

const priceColor = {
  dark: "text-white",
  light: "text-zinc-950",
};

const periodColor = {
  dark: "text-white",
  light: "text-zinc-500",
};

const descBorder = {
  dark: "border-zinc-900",
  light: "border-zinc-100",
};

const descText = {
  dark: "text-white",
  light: "text-zinc-600",
};

const featureText = {
  dark: "text-white",
  light: "text-zinc-600",
};

export default function CPDPricingSection({ qual, theme = "dark" }: CPDPricingSectionProps) {
  return (
    <section
      id="pricing-section"
      aria-labelledby="pricing-heading"
      className={`py-20 md:py-24 ${sectionBg[theme]}`}
    >
      <SectionWrapper reveal>
        <div className="mb-12 md:mb-16">
          <p className="text-[#CE1A19] text-xs font-bold tracking-[4px] uppercase mb-4">
            Investment
          </p>
          <h2
            id="pricing-heading"
            className={`text-3xl md:text-5xl font-black tracking-tight uppercase leading-none ${
              theme === "dark" ? "text-white" : "text-zinc-950"
            }`}
          >
            Course Fee
          </h2>
          <div className="w-14 h-1 bg-[#CE1A19] mt-6" aria-hidden="true" />
        </div>

        <div className="max-w-md w-full">
          {qual.pricing.map((tier) => (
            <div
              key={tier.name}
              className={`p-6 md:p-8 border rounded-sm shadow-xl flex flex-col ${cardBg[theme]}`}
            >
              <p className={`text-xs font-bold tracking-widest uppercase mb-3 ${
                theme === "dark" ? "text-white" : "text-zinc-400"
              }`}>
                {tier.name}
              </p>

              <div className="mb-4">
                <div className={`flex items-baseline gap-0.5 ${priceColor[theme]}`}>
                  <span className="text-xl font-bold self-start mt-1">£</span>
                  <span className="text-5xl md:text-6xl font-black leading-none tracking-tight">
                    {tier.price as number}
                  </span>
                </div>
                <p className={`text-[10px] font-bold uppercase tracking-wider mt-2.5 ${periodColor[theme]}`}>
                  one-time investment
                </p>
              </div>

              <p className={`text-sm leading-relaxed mt-2 pb-6 mb-6 border-b ${descBorder[theme]} ${descText[theme]}`}>
                {tier.description}
              </p>

              <motion.ul
                className="space-y-4 mb-8"
                role="list"
                variants={listVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.1 }}
              >
                {tier.includes.map((item) => (
                  <motion.li key={item} className="flex items-start gap-3" variants={itemVariants}>
                    <AnimatedCheck size={16} delay={0} />
                    <span className={`text-sm leading-tight ${featureText[theme]}`}>
                      {item}
                    </span>
                  </motion.li>
                ))}
              </motion.ul>

              <Button href="/contact" variant="primary" size="md" fullWidth className="shadow-md">
                Book Your Place
              </Button>
            </div>
          ))}
        </div>
      </SectionWrapper>
    </section>
  );
}
