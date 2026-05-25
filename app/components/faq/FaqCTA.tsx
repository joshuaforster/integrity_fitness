"use client";

import Button from "@/app/components/Button";

export default function FaqCTA() {
  return (
    <section
      aria-labelledby="faq-cta-heading"
      className="bg-zinc-50 pb-20 md:pb-28"
    >
      <div className="reveal mx-auto max-w-7xl px-6 lg:px-8">
        <div className="pt-12 border-t border-zinc-200/80 text-center max-w-3xl mx-auto">
          <p className="text-[#CE1A19] text-xs font-bold tracking-[3px] uppercase mb-4">
            Still Have Questions?
          </p>
          <h2
            id="faq-cta-heading"
            className="text-2xl md:text-3xl font-extrabold text-zinc-950 tracking-tight uppercase mb-4"
          >
            We&apos;re Here To Help
          </h2>
          <p className="text-zinc-600 text-sm md:text-base leading-relaxed max-w-md mx-auto mb-8">
            Can&apos;t find the exact answer you need? Get in touch directly and
            our trainers will answer your queries.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center w-full sm:w-auto">
            <Button
              href="/contact"
              variant="primary"
              size="md"
              className="px-8 shadow-sm"
            >
              Get In Touch
            </Button>
            <Button
              href="mailto:harry@integrityfitness.education"
              variant="outline-light"
              size="md"
              className="px-8 bg-white"
              external
            >
              Email Us Directly
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
