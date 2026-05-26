"use client";

import SectionWrapper from "@/app/components/ui/SectionWrapper";
import FaqCategoryNav from "./FaqCategoryNav";
import FaqGroup, { type FAQGroup } from "./FaqGroup";

const FAQS: FAQGroup[] = [
  {
    category: "Payments & Pricing",
    items: [
      {
        q: "Do you offer flexible payment options?",
        a: "Yes, we tailor your price to your learning needs so you can study at your own pace.",
      },
      {
        q: "What is the non-refundable deposit?",
        a: "£499 – this covers the baseline cost of your learning resources and course registration with the awarding body.",
      },
      {
        q: "If I don't like the course, can I get a refund?",
        a: "The deposit for level 2 and level 3 is non-refundable. Any subsequent fees paid are fully refundable during your 14-day statutory cooling-off period.",
      },
    ],
  },
  {
    category: "Accreditation",
    items: [
      {
        q: "Are your courses accredited?",
        a: "Yes, we are fully accredited by Active IQ. Every single qualification we award is recognised internationally.",
      },
      {
        q: "Will I be insured to give training & nutrition advice once I finish?",
        a: "Yes, our combined diploma qualifies you to secure comprehensive public liability and professional indemnity insurance to cover both personal training and structural nutritional advice.",
      },
      {
        q: "What is CIMSPA?",
        a: "CIMSPA stands for the Chartered Institute for the Management of Sport and Physical Activity. It is the professional development body for the UK's physical activity sector. Active IQ qualifications are completely mapped and recognised by CIMSPA.",
      },
    ],
  },
  {
    category: "Course Structure",
    items: [
      {
        q: "Can I complete the course while working or at University?",
        a: "Yes. The vast majority of the theory architecture is delivered online. We couple this with targeted in-person practical weekend workshops tailored around your current commercial schedule.",
      },
      {
        q: "How will I be assessed on the course?",
        a: "Practical engineering competencies are assessed in person at our dedicated Norwich facility. Your theoretical units feature multiple-choice examinations that you can complete securely online.",
      },
    ],
  },
];

export default function FaqAccordion() {
  return (
    <section
      aria-labelledby="faq-main-heading"
      className="bg-zinc-50 texture-dots-light pt-20 pb-12 md:pt-28 md:pb-16 border-t border-zinc-200/80"
    >
      <SectionWrapper reveal>
        <div className="mb-16 md:mb-24">
          <p className="text-[#CE1A19] text-xs font-bold tracking-[4px] uppercase mb-4">
            Common Inquiries
          </p>
          <h2
            id="faq-main-heading"
            className="text-3xl md:text-5xl font-black text-zinc-950 tracking-tight uppercase leading-none"
          >
            Frequently Asked Questions
          </h2>
          <div className="w-14 h-1 bg-[#CE1A19] mt-6" aria-hidden="true" />
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
