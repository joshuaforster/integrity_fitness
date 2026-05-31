"use client";

import SectionWrapper from "@/app/components/ui/SectionWrapper";
import SectionHeader from "@/app/components/ui/SectionHeader";
import FaqCategoryNav from "./FaqCategoryNav";
import FaqGroup from "./FaqGroup";
import { faqs as FAQS } from "@/app/content/faqs";

export default function FaqAccordion() {
  return (
    <section
      aria-labelledby="faq-main-heading"
      className="bg-zinc-50 texture-dots-light pt-20 pb-12 md:pt-28 md:pb-16 border-t border-zinc-200/80"
    >
      <SectionWrapper reveal>
        <div className="mb-16 md:mb-24">
          <SectionHeader
            label="Common Inquiries"
            heading="Frequently Asked Questions"
            id="faq-main-heading"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <FaqCategoryNav groups={FAQS} />

          <div className="lg:col-span-8 space-y-12 w-full">
            {FAQS.map((group) => (
              <FaqGroup key={group.category} group={group} />
            ))}
          </div>
        </div>
      </SectionWrapper>
    </section>
  );
}
