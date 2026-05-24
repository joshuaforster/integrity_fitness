"use client";

import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

const faqs = [
  {
    category: "Payments & Pricing",
    items: [
      { q: "Do you offer flexible payment options?", a: "Yes, we tailor your price to your learning needs so you can study at your own pace." },
      { q: "What is the non-refundable deposit?", a: "£499 – this is for the fees we pay for your learning resources and registration." },
      { q: "If I don't like the course, can I get a refund?", a: "The deposit for level 2 and level 3 is non-refundable. Any other fees are refundable during the 14-day statutory period." },
    ],
  },
  {
    category: "Qualifications & Accreditation",
    items: [
      { q: "Are your courses accredited?", a: "Yes, we are accredited by Active iQ, whose courses are recognised internationally." },
      { q: "Are your qualifications internationally recognised?", a: "The Active IQ Level 2 & 3 qualifications are recognised in the UK and in other international countries. We recommend you speak to your country's specific awarding body to get the most up to date answer." },
      { q: "Will I be insured to give training & nutrition advice once I finish the course?", a: "Yes, the combined diploma will allow you to get public liability & professional indemnity insurance to cover training and nutrition advice." },
      { q: "What is CIMSPA?", a: "CIMSPA stands for the Chartered Institute for the Management of Sport and Physical Activity. It is the professional development body for the UK's sport and physical activity sector. Active IQ qualifications are recognised by CIMSPA." },
      { q: "What is Active iQ?", a: "Active IQ is an awarding organisation for the active leisure, learning, and wellbeing sectors. It is recognised and regulated by Ofqual, Qualifications Wales, and CCEA. Active IQ works with a network of approved training organisations (like us) to deliver its qualifications." },
      { q: "What is CPD?", a: "Continuing Professional Development. Sometimes referred to as CEUs in the USA." },
    ],
  },
  {
    category: "Course Structure",
    items: [
      { q: "Can I complete the course while I'm already working or going to University/College?", a: "Yes, the majority of the course is online with a minimum of two in-person weekends. However we take pride in our 1-1 tuition and workshops so we encourage as much in-person learning as you reasonably can." },
      { q: "How are your qualifications taught?", a: "The theoretical side can be covered mostly online by watching webinars and participating in video conferencing with tutors and guest experts. 1-1 tuition for both the theoretical and practical side of the course is available as well as full practical workshops." },
      { q: "How will I be assessed on the course?", a: "Level 2 and level 3 are assessed in person at an assessment day. Theory exams have multiple-choice tests which you can take online." },
      { q: "What happens if I don't pass an exam?", a: "You're allowed up to 3 attempts at every unit, with fees applied depending on your choice of course." },
      { q: "What if I already have a Level 2 fitness instructor qualification?", a: "Just show us proof of your certification and we can invoice you individually. Email harry@integrityfitness.education with the subject 'Level 2 verification'." },
    ],
  },
  {
    category: "Timelines & Flexibility",
    items: [
      { q: "How long does the course take to complete?", a: "You can study at your own pace and we typically expect learners to become fully qualified within 9–14 months of enrolment. We have seen some pass in under 6 months but the maximum time allowed is 36 months." },
      { q: "How long do I have to complete the qualification?", a: "You need to complete your certification within 36 months from your start date." },
      { q: "What if I'm ill or go on holiday?", a: "Not a problem, all learning is done at your own pace. All of the webinars are online so you won't miss anything." },
      { q: "How old do I need to be to do the course?", a: "You need to be 16 years of age or older." },
    ],
  },
];

function AccordionItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/10 last:border-0">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-6 text-left gap-6 group"
      >
        <span className="text-white font-semibold text-base leading-snug group-hover:text-[#CE1A19] transition-colors">
          {q}
        </span>
        <ChevronDownIcon
          className={`w-5 h-5 text-[#CE1A19] flex-shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? "max-h-96 pb-6" : "max-h-0"}`}>
        <p className="text-white/65 text-base leading-relaxed pl-4 border-l border-[#CE1A19]/30">{a}</p>
      </div>
    </div>
  );
}

export default function FaqAccordion() {
  return (
    <section className="bg-[#111111] pt-10 pb-24">
      <div className="reveal mx-auto max-w-3xl px-6 lg:px-8">
        {faqs.map((group, groupIndex) => (
          <div key={group.category} className={groupIndex === 0 ? "mb-0" : "mt-20"}>
            <div className="flex items-center gap-4 mb-5">
              <div className="w-1 h-8 bg-[#CE1A19]" />
              <h2 className="text-white text-xs font-semibold tracking-[4px] uppercase">
                {group.category}
              </h2>
            </div>
            <div className="border-t border-white/10">
              {group.items.map((item) => (
                <AccordionItem key={item.q} q={item.q} a={item.a} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
