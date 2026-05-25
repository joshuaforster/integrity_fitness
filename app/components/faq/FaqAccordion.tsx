"use client";

import { useState } from "react";

type FAQItem = { q: string; a: string };
type FAQGroup = { category: string; items: readonly FAQItem[] };

const FAQS: readonly FAQGroup[] = [
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
] as const;

// Inline utility to generate clean, URL/DOM-safe element IDs
const formatId = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

function AccordionRow({ q, a }: FAQItem) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-zinc-200 last:border-0">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between py-5 md:py-6 text-left gap-6 group outline-none"
      >
        <span className="text-zinc-950 font-extrabold text-sm md:text-base leading-snug group-hover:text-[#CE1A19] transition-colors duration-200">
          {q}
        </span>
        <span
          className="w-5 h-5 flex items-center justify-center text-[#CE1A19] flex-shrink-0 relative"
          aria-hidden="true"
        >
          <span className="absolute w-3.5 h-0.5 bg-currentColor" />
          <span
            className={`absolute w-0.5 h-3.5 bg-currentColor transition-transform duration-200 ease-out ${isOpen ? "rotate-90" : ""}`}
          />
        </span>
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-[300px] pb-6" : "max-h-0"}`}
      >
        <p className="text-zinc-600 text-sm md:text-base leading-relaxed pl-4 border-l-2 border-[#CE1A19]">
          {a}
        </p>
      </div>
    </div>
  );
}

export default function FaqAccordion() {
  const handleScrollToSection = (category: string) => {
    const elementId = formatId(category);
    const targetElement = document.getElementById(elementId);

    if (targetElement) {
      // scrollIntoView with an offset calculation to account for a sticky header navbar
      const yOffset = -100;
      const yPosition =
        targetElement.getBoundingClientRect().top + window.scrollY + yOffset;

      window.scrollTo({
        top: yPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      aria-labelledby="faq-main-heading"
      className="bg-zinc-50 pt-20 pb-12 md:pt-28 md:pb-16 border-t border-zinc-200/80"
    >
      <div className="reveal mx-auto max-w-7xl px-6 lg:px-8">
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
          {/* Left Column Sidebar Menu — Now fully clickable */}
          <div className="lg:col-span-4 hidden lg:block sticky top-28 space-y-4">
            <p className="text-zinc-400 text-xs font-bold tracking-widest uppercase mb-6">
              Syllabus Categories
            </p>
            <nav className="space-y-3" aria-label="FAQ categories navigation">
              {FAQS.map((group) => (
                <button
                  key={group.category}
                  type="button"
                  onClick={() => handleScrollToSection(group.category)}
                  className="flex items-center gap-3 w-full text-left group/nav outline-none"
                >
                  <div className="w-1 h-3 bg-zinc-300 group-hover/nav:bg-[#CE1A19] transition-colors duration-200" />
                  <span className="text-zinc-900 text-xs font-bold uppercase tracking-wider group-hover/nav:text-[#CE1A19] transition-colors duration-200">
                    {group.category}
                  </span>
                </button>
              ))}
            </nav>
          </div>

          {/* Right Column Accordions */}
          <div className="lg:col-span-8 space-y-12 w-full">
            {FAQS.map((group) => (
              <div
                key={group.category}
                id={formatId(group.category)} // Injects clean, targetable anchor IDs into the DOM
                className="scroll-mt-24"
              >
                <div className="flex items-center gap-3 mb-4 lg:mb-6">
                  <div className="w-1 h-4 bg-[#CE1A19]" aria-hidden="true" />
                  <h3 className="text-zinc-950 text-xs font-black uppercase tracking-widest">
                    {group.category}
                  </h3>
                </div>

                <div className="border-t border-zinc-200">
                  {group.items.map((item) => (
                    <AccordionRow key={item.q} q={item.q} a={item.a} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
