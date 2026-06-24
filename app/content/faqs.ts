// ── Page hero ─────────────────────────────────────────────────────────────────

export const faqHero = {
  label: "FAQ",
  title: "Frequently Asked Questions",
  subtitle: "Everything you need to know about course structures, international accreditations, and flexible financing choices.",
  image: "https://pub-6e6bb53af6c34756a861d2c0a8259e84.r2.dev/TGG%20HALL%20ROAD/GYM-FLOOR-EXPLANATION-IFE-TGGNHR_003.jpg",
} as const;

export const faqCategoryNavLabel = "Syllabus Categories";

export const faqCta = {
  label: "Still Have Questions?",
  heading: "We're Here To Help",
  body: "Can't find the answer you need? Get in touch directly and Harry will get back to you personally.",
  button1: { label: "Get In Touch", href: "/contact" },
  button2: { label: "Email Us Directly", href: "mailto:harry@integrityfitness.education" },
} as const;

// ── FAQ data ──────────────────────────────────────────────────────────────────

export type FAQItem = {
  q: string;
  a: string;
  link?: { href: string; label: string };
};

export type FAQGroup = {
  category: string;
  items: readonly FAQItem[];
};

export const faqs: FAQGroup[] = [
  {
    category: "Payments & Pricing",
    items: [
      {
        q: "Do you offer flexible payment options?",
        a: "Yes, we tailor your price to your learning needs so you can study at your own pace.",
        link: { href: "/income", label: "See what different rates put in your pocket → PT Income Calculator" },
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
        a: "Yes. Most of the theory is delivered online, so you can work through it in your own time. We then bring you in for practical sessions at weekends, arranged around your existing commitments.",
        link: { href: "/study-time", label: "Get a personalised timeline estimate → Course Timeline Estimator" },
      },
      {
        q: "How difficult is the course?",
        a: "Level 2 sits at roughly GCSE biology and PE standard — if you paid attention in school science and enjoy sport, you will find it very manageable. Level 3 steps up to around AS Level difficulty — there is more depth to the anatomy, physiology, and programming content, but it is still well within reach for anyone who approaches it with focus. Neither level requires a degree or prior academic qualifications. Harry structures the content around you, so if anything feels unclear, you get proper support rather than being left to figure it out alone.",
      },
      {
        q: "How will I be assessed on the course?",
        a: "Your practical skills are assessed in person at our gym in Norwich. Theory is tested through multiple-choice exams that you complete online, whenever works for you.",
      },
    ],
  },
];

export const pricingFaqs: FAQItem[] = [
  {
    q: "Can I change my study plan after I enrol?",
    a: "Yes. If you start on the Independent plan and decide you would benefit from one-to-one support, you can upgrade to Part Time or Full Time at any point. The difference in course fees is invoiced at the point of change. Downgrading is available on the same terms.",
  },
  {
    q: "What is the refund policy?",
    a: "You have a 14-day cooling-off period from the date of enrolment in line with UK consumer regulations. If you withdraw within that window, you will receive a full refund minus the cost of any assessments already submitted and marked.",
  },
  {
    q: "What if I need to take a break from the course?",
    a: "Life happens. If you need to pause due to work, health, or personal circumstances, contact us and we will put your enrolment on hold at no extra charge. Extensions of up to six months are available on request with no penalty.",
  },
  {
    q: "How long does it take to receive my certificate?",
    a: "Active IQ typically issues digital certificates within two to four weeks of your final assessment being submitted and marked. Physical certificates follow by post within six to eight weeks. You can use your completion letter immediately for employment purposes while you wait.",
  },
];
