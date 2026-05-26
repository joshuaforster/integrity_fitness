import SectionWrapper from "@/app/components/ui/SectionWrapper";
import AccordionRow, { type FAQItem } from "@/app/components/faq/AccordionRow";

const PRICING_FAQS: FAQItem[] = [
  {
    q: "Can I switch from one plan to another after enrolling?",
    a: "Yes. If you start on the Independent plan and decide you would benefit from one-to-one support, you can upgrade to Part Time or Full Time at any point. The difference in course fees is invoiced at the point of change. Downgrading is available on the same terms.",
  },
  {
    q: "Is there a cooling-off period or money-back guarantee?",
    a: "You have a 14-day cooling-off period from the date of enrolment in line with UK consumer regulations. If you withdraw within that window, you will receive a full refund minus the cost of any assessments already submitted and marked.",
  },
  {
    q: "How does annual billing differ from monthly, and what do I save?",
    a: "Annual billing pays the full course fee upfront in a single payment at a reduced rate — equivalent to approximately two months free compared to the monthly plan. Your access, support, and course materials are identical either way.",
  },
  {
    q: "What if I need to pause or extend my studies?",
    a: "Life happens. If you need to pause due to work, health, or personal circumstances, contact us and we will put your enrolment on hold at no extra charge. Extensions of up to six months are available on request with no penalty.",
  },
  {
    q: "How long until I receive my qualification after completing?",
    a: "Active IQ typically issues digital certificates within two to four weeks of your final assessment being submitted and marked. Physical certificates follow by post within six to eight weeks. You can use your completion letter immediately for employment purposes while you wait.",
  },
];

export default function PricingFAQSection() {
  return (
    <section
      aria-labelledby="pricing-faq-heading"
      className="bg-white border-t border-zinc-100 py-20 md:py-24"
    >
      <SectionWrapper reveal>
        <div className="max-w-3xl mx-auto">
          <div className="mb-12">
            <p className="text-[#CE1A19] text-xs font-bold tracking-[4px] uppercase mb-4">
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
