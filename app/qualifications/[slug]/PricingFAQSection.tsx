import SectionWrapper from "@/app/components/ui/SectionWrapper";
import AccordionRow from "@/app/components/faq/AccordionRow";
import { pricingFaqs as PRICING_FAQS } from "@/app/content/faqs";

export default function PricingFAQSection() {
  return (
    <section
      aria-labelledby="pricing-faq-heading"
      className="bg-white border-t border-zinc-100 py-20 md:py-24"
    >
      <SectionWrapper reveal>
        <div className="max-w-3xl mx-auto">
          <div className="mb-12">
            <p className="text-[#CE1A19] text-xs font-bold tracking-widest uppercase mb-4">
              Common Questions
            </p>
            <h2
              id="pricing-faq-heading"
              className="text-3xl md:text-4xl font-black text-zinc-950 tracking-tight uppercase leading-none"
            >
              About Our Course Fees
            </h2>
            <div className="w-14 h-1 bg-[#CE1A19] mt-6" aria-hidden="true" />
          </div>

          <div>
            {PRICING_FAQS.map((faq) => (
              <AccordionRow key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </SectionWrapper>
    </section>
  );
}
