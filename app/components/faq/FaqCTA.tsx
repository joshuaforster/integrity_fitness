"use client";

import Button from "@/app/components/ui/Button";
import SectionWrapper from "@/app/components/ui/SectionWrapper";
import { faqCta } from "@/app/content/faqs";

export default function FaqCTA() {
  return (
    <section
      aria-labelledby="faq-cta-heading"
      className="bg-zinc-50 texture-diag-light pb-20 md:pb-28"
    >
      <SectionWrapper reveal>
        <div className="pt-12 border-t border-zinc-200/80 text-center max-w-3xl mx-auto">
          <p className="text-[#CE1A19] text-xs font-bold tracking-widest uppercase mb-4">
            {faqCta.label}
          </p>
          <h2
            id="faq-cta-heading"
            className="text-2xl md:text-3xl font-extrabold text-zinc-950 tracking-tight uppercase mb-4"
          >
            {faqCta.heading}
          </h2>
          <p className="text-zinc-600 text-sm md:text-base leading-relaxed max-w-md mx-auto mb-8">
            {faqCta.body}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center w-full sm:w-auto">
            <Button href={faqCta.button1.href} variant="primary" size="md" className="px-8 shadow-sm">
              {faqCta.button1.label}
            </Button>
            <Button
              href={faqCta.button2.href}
              variant="outline-light"
              size="md"
              className="px-8 bg-white"
              external
            >
              {faqCta.button2.label}
            </Button>
          </div>
        </div>
      </SectionWrapper>
    </section>
  );
}
