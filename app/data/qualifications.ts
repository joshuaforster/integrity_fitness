export type PricingTier = {
  name: string;
  price: { monthly: number; yearly: number } | number;
  description: string;
  includes: string[];
  highlighted?: boolean;
};

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

export type Qualification = {
  slug: string;
  title: string;
  shortTitle: string;
  level: string;
  category: "personal-training" | "cpd";
  awardingBody: string;
  duration: string;
  durationMonths?: string;
  tagline: string;
  heroImage: string;
  overview: string[];
  whatYouWillLearn: string[];
  entryRequirements: string[];
  modules: { title: string; topics: string[] }[];
  pricing: PricingTier[];
  hasBillingToggle: boolean;
  badge?: string;
  testimonials?: Testimonial[];
  bookletFolder?: string;
  bookletPageCount?: number;
  bookletPdfPath?: string;
};

const qualifications: Qualification[] = [
  {
    slug: "become-a-personal-trainer",
    title: "Combined Level 2 & 3 Personal Training Diploma",
    shortTitle: "Combined L2 & L3 Diploma",
    level: "Level 2 & 3",
    category: "personal-training",
    awardingBody: "Active IQ",
    duration: "Flexible — study at your own pace",
    durationMonths: "6–12 months",
    tagline: "The fastest route from zero to fully qualified personal trainer.",
    heroImage: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=1920&q=80",
    badge: "Most Popular",
    overview: [
      "Our Combined Level 2 & 3 Diploma is the most direct path to becoming a fully qualified personal trainer. Rather than taking the two qualifications separately, you complete both in a single integrated programme — saving you time and money without cutting corners on quality.",
      "Delivered entirely one-to-one with Harry, every session is built around you. Your schedule, your learning style, your career goals. This is not a group course where you get lost in a room of twenty students — it is personal education in the truest sense.",
      "On completion you will hold a CIMSPA-accredited, internationally recognised qualification that opens the door to employment in gyms, leisure centres, and independent personal training practice.",
    ],
    whatYouWillLearn: [
      "How the body moves, adapts, and responds to exercise",
      "How to assess clients and design safe, effective programmes",
      "How to motivate, coach, and retain clients long-term",
      "Nutrition fundamentals and how to apply them in practice",
      "How to run a compliant, professional personal training business",
    ],
    entryRequirements: [
      "No prior fitness qualifications required",
      "Must be 16 years of age or older",
      "A passion for fitness and helping others",
    ],
    modules: [
      {
        title: "Anatomy & Physiology",
        topics: [
          "Skeletal and muscular systems",
          "The cardiovascular and respiratory systems",
          "Energy systems and metabolism",
          "How the body adapts to exercise",
        ],
      },
      {
        title: "Gym Instructing (Level 2)",
        topics: [
          "Health screening and PAR-Q",
          "Safe gym induction techniques",
          "Resistance and cardiovascular equipment",
          "Instructing gym-based exercise",
        ],
      },
      {
        title: "Programme Design",
        topics: [
          "Client needs analysis",
          "Goal setting and SMART targets",
          "Periodisation and progressive overload",
          "Adapting programmes for different populations",
        ],
      },
      {
        title: "Nutrition for Exercise",
        topics: [
          "Macronutrients and micronutrients",
          "Energy balance and body composition",
          "Pre, intra, and post-workout nutrition",
          "When to refer clients to a registered dietitian",
        ],
      },
      {
        title: "Personal Training in Practice",
        topics: [
          "One-to-one coaching skills",
          "Behaviour change and motivation",
          "Client record keeping and legal obligations",
          "Building and marketing your PT business",
        ],
      },
    ],
    pricing: [
      {
        name: "Independent",
        price: { monthly: 225, yearly: 2250 },
        description: "Fully self-paced, online study. All course materials and written assessments — no one-to-one sessions. Best suited to highly self-directed learners.",
        includes: [
          "Full Level 2 & 3 course materials",
          "Online learning portal access",
          "Written assessments & marking",
          "Active IQ qualification on completion",
        ],
      },
      {
        name: "Part Time",
        price: { monthly: 275, yearly: 2750 },
        description: "Regular one-to-one sessions alongside flexible study.",
        includes: [
          "Everything in Independent",
          "Weekly one-to-one sessions",
          "Practical assessment support",
          "Ongoing feedback and mentoring",
        ],
        highlighted: true,
      },
      {
        name: "Full Time",
        price: { monthly: 325, yearly: 3250 },
        description: "The complete immersive experience — fastest route to qualified.",
        includes: [
          "Everything in Part Time",
          "Multiple sessions per week",
          "Priority scheduling",
          "Post-qualification career guidance",
          "Free CPD course of your choice",
        ],
      },
    ],
    hasBillingToggle: true,
    bookletFolder: "level-3-diploma",
    bookletPageCount: 44,
    bookletPdfPath: "/Level3 Diploma .pdf",
    testimonials: [
      {
        quote: "I qualified in under a year while working full time. The one-to-one sessions meant I could actually ask questions — not just sit in a room waiting for the tutor to get round to me.",
        name: "Jamie R.",
        role: "Now a qualified PT",
      },
      {
        quote: "I looked at a few providers before choosing Integrity. The combined diploma saved me time and money, and I came out knowing exactly what I was doing.",
        name: "Chloe M.",
        role: "Qualified in 9 months",
      },
      {
        quote: "Every session was built around my schedule, which made this actually doable. I tried other courses and dropped out. This time I made it.",
        name: "Tom B.",
        role: "L2 & L3 qualified",
      },
    ],
  },
  {
    slug: "level-2-gym-instructor",
    title: "Level 2 Gym Instructor Certificate",
    shortTitle: "L2 Gym Instructor Certificate",
    level: "Level 2",
    category: "personal-training",
    awardingBody: "Active IQ",
    duration: "Flexible — study at your own pace",
    durationMonths: "3–6 months",
    tagline: "Your first step into the fitness industry — the right way.",
    heroImage: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1920&q=80",
    overview: [
      "The Level 2 Gym Instructor Certificate is the industry-standard entry qualification for anyone looking to begin a career in fitness. It equips you with everything you need to work safely and effectively on a gym floor.",
      "Delivered one-to-one with Harry, you will build a genuine foundation of knowledge — anatomy, physiology, equipment use, and how to design basic exercise programmes for a range of clients.",
      "If you already know you want to go further, you can upgrade to the Combined Level 2 & 3 Diploma at any point and the cost of this course will be credited against it.",
    ],
    whatYouWillLearn: [
      "The fundamentals of anatomy and physiology",
      "How to safely operate and instruct gym equipment",
      "How to screen clients and identify contraindications",
      "How to plan and deliver a gym floor induction",
      "The role and responsibilities of a gym instructor",
    ],
    entryRequirements: [
      "No prior fitness qualifications required",
      "Must be 16 years of age or older",
    ],
    modules: [
      {
        title: "Anatomy & Physiology Foundations",
        topics: [
          "The musculoskeletal system",
          "The cardiovascular system",
          "Basic nutrition and hydration",
          "The effects of exercise on the body",
        ],
      },
      {
        title: "Health & Fitness Assessment",
        topics: [
          "Health screening and PAR-Q",
          "Lifestyle questionnaires",
          "Recognising contraindications",
          "When to refer to medical professionals",
        ],
      },
      {
        title: "Gym Floor Instruction",
        topics: [
          "Safe use of resistance equipment",
          "Safe use of cardiovascular equipment",
          "Demonstrating and correcting technique",
          "Delivering a gym induction",
        ],
      },
    ],
    pricing: [
      {
        name: "Independent",
        price: { monthly: 149, yearly: 1490 },
        description: "Fully self-paced, online study. All course materials and written assessments — no one-to-one sessions. Best suited to highly self-directed learners.",
        includes: [
          "Full Level 2 course materials",
          "Online learning portal access",
          "Written assessments & marking",
          "Active IQ qualification on completion",
        ],
      },
      {
        name: "Part Time",
        price: { monthly: 179, yearly: 1790 },
        description: "Regular one-to-one sessions alongside flexible study.",
        includes: [
          "Everything in Independent",
          "Weekly one-to-one sessions",
          "Practical assessment support",
          "Ongoing feedback and mentoring",
        ],
        highlighted: true,
      },
      {
        name: "Full Time",
        price: { monthly: 219, yearly: 2190 },
        description: "Intensive study — the fastest route to qualified.",
        includes: [
          "Everything in Part Time",
          "Multiple sessions per week",
          "Priority scheduling",
          "Post-qualification career guidance",
        ],
      },
    ],
    hasBillingToggle: true,
    bookletFolder: "level-2-diploma",
    bookletPageCount: 24,
    bookletPdfPath: "/Level2 Diploma.pdf",
    testimonials: [
      {
        quote: "Straightforward, practical, and no fluff. I passed first time and started on the gym floor within a few weeks of finishing.",
        name: "Daniel K.",
        role: "Now a gym instructor",
      },
      {
        quote: "The content was explained clearly without making it feel overwhelming. A great first step into the industry.",
        name: "Priya S.",
        role: "Qualified gym instructor",
      },
    ],
  },
  {
    slug: "level-3-personal-training",
    title: "Level 3 Personal Training Qualification",
    shortTitle: "L3 Personal Training",
    level: "Level 3",
    category: "personal-training",
    awardingBody: "Active IQ",
    duration: "Flexible — study at your own pace",
    durationMonths: "6–9 months",
    tagline: "Already have your Level 2? This is where you become a personal trainer.",
    heroImage: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1920&q=80",
    overview: [
      "The Level 3 Personal Training Qualification is designed for those who already hold a Level 2 Gym Instructor certificate and are ready to take the next step. This is the qualification that allows you to work with clients independently — designing programmes, coaching sessions, and building a business.",
      "Working one-to-one with Harry, you will develop advanced coaching skills, programme design knowledge, and the commercial understanding needed to thrive as a self-employed personal trainer.",
      "The qualification is CIMSPA accredited and internationally recognised, meaning your certification is respected wherever your career takes you.",
    ],
    whatYouWillLearn: [
      "Advanced anatomy, physiology, and biomechanics",
      "How to design periodised training programmes",
      "Nutrition principles and how to apply them with clients",
      "Behaviour change psychology and advanced coaching skills",
      "How to build and run a profitable PT business",
    ],
    entryRequirements: [
      "Must hold a Level 2 Gym Instructor qualification",
      "Must be 16 years of age or older",
    ],
    modules: [
      {
        title: "Advanced Anatomy & Physiology",
        topics: [
          "Biomechanics and movement analysis",
          "Energy systems in depth",
          "Adaptations to resistance and endurance training",
          "Injury prevention and safe practice",
        ],
      },
      {
        title: "Programme Design & Periodisation",
        topics: [
          "Advanced client assessment",
          "Goal setting and long-term planning",
          "Periodisation models",
          "Training for specific populations",
        ],
      },
      {
        title: "Nutrition for Personal Training",
        topics: [
          "Macronutrients and micronutrients in depth",
          "Dietary analysis and planning",
          "Weight management strategies",
          "Supplementation guidance and scope of practice",
        ],
      },
      {
        title: "Coaching & Business Skills",
        topics: [
          "Advanced motivational techniques",
          "Behaviour change models",
          "PT business planning",
          "Marketing, sales, and client retention",
        ],
      },
    ],
    pricing: [
      {
        name: "Independent",
        price: { monthly: 175, yearly: 1750 },
        description: "Fully self-paced, online study. All course materials and written assessments — no one-to-one sessions. Best suited to highly self-directed learners.",
        includes: [
          "Full Level 3 course materials",
          "Online learning portal access",
          "Written assessments & marking",
          "Active IQ qualification on completion",
        ],
      },
      {
        name: "Part Time",
        price: { monthly: 215, yearly: 2150 },
        description: "Regular one-to-one sessions alongside flexible study.",
        includes: [
          "Everything in Independent",
          "Weekly one-to-one sessions",
          "Practical assessment support",
          "Ongoing feedback and mentoring",
        ],
        highlighted: true,
      },
      {
        name: "Full Time",
        price: { monthly: 259, yearly: 2590 },
        description: "Intensive study — the fastest route to qualified.",
        includes: [
          "Everything in Part Time",
          "Multiple sessions per week",
          "Priority scheduling",
          "Post-qualification career guidance",
        ],
      },
    ],
    hasBillingToggle: true,
    bookletFolder: "level-3-only",
    bookletPageCount: 30,
    bookletPdfPath: "/level3only.pdf",
    testimonials: [
      {
        quote: "I already had my Level 2 and just needed the PT qualification. The programme design module changed how I approach every session with clients.",
        name: "Sarah L.",
        role: "Now self-employed PT",
      },
      {
        quote: "The business skills section was a genuine surprise — actually useful for understanding how to run a PT business, not just train people.",
        name: "Marcus T.",
        role: "PT business owner",
      },
    ],
  },
  {
    slug: "mental-health-awareness",
    title: "Level 2 Award in Mental Health Awareness",
    shortTitle: "Mental Health Awareness",
    level: "Level 2",
    category: "cpd",
    awardingBody: "Active IQ",
    duration: "1 day",
    tagline: "Understand mental health so you can better support every client.",
    heroImage: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1920&q=80",
    overview: [
      "Mental health affects millions of people, and as a fitness professional you are often better placed than most to notice when a client is struggling. This one-day award gives you the knowledge to recognise the signs, respond appropriately, and signpost to the right support.",
      "Delivered in a small group or one-to-one format, the course covers the most common mental health conditions, the relationship between physical activity and mental wellbeing, and how to have sensitive, professional conversations with clients.",
      "The Level 2 Award in Mental Health Awareness is CPD-accredited and counts towards your continuing professional development requirements.",
    ],
    whatYouWillLearn: [
      "What mental health is and how it affects daily life",
      "The most common mental health conditions and their signs",
      "The link between exercise and mental wellbeing",
      "How to have supportive conversations with clients",
      "When and how to signpost clients to professional help",
    ],
    entryRequirements: [
      "No prior qualifications required",
      "Suitable for fitness professionals and the general public",
    ],
    modules: [
      {
        title: "Understanding Mental Health",
        topics: [
          "Defining mental health and mental illness",
          "Prevalence and impact in the UK",
          "Stigma and how to challenge it",
          "The recovery model",
        ],
      },
      {
        title: "Common Mental Health Conditions",
        topics: [
          "Anxiety and depression",
          "Stress and burnout",
          "Eating disorders and body image",
          "When to refer for professional support",
        ],
      },
      {
        title: "Exercise & Mental Wellbeing",
        topics: [
          "The evidence base for exercise and mental health",
          "Motivating clients experiencing low mood",
          "Adapting sessions for mental health considerations",
          "Self-care for fitness professionals",
        ],
      },
    ],
    pricing: [
      {
        name: "Course Fee",
        price: 225,
        description: "Full day training, assessment, and Active IQ certification.",
        includes: [
          "Full course delivery",
          "Course materials and workbook",
          "Written assessment and marking",
          "Level 2 Award certificate on completion",
          "CPD points towards annual requirements",
        ],
        highlighted: true,
      },
    ],
    hasBillingToggle: false,
    bookletFolder: "mental-health",
    bookletPageCount: 8,
    bookletPdfPath: "/mentalhealth.pdf",
  },
  {
    slug: "pre-post-natal",
    title: "Level 3 Award in Supporting Pre & Post Natal Clients",
    shortTitle: "Pre & Post Natal",
    level: "Level 3",
    category: "cpd",
    awardingBody: "Active IQ",
    duration: "1–2 days",
    tagline: "Confidently train clients through pregnancy and beyond.",
    heroImage: "https://images.unsplash.com/photo-1518310952931-b1de897abd40?auto=format&fit=crop&w=1920&q=80",
    overview: [
      "Pregnancy and the postnatal period are times when many women want to stay active but are unsure what is safe. This Level 3 Award gives you the knowledge and confidence to design and deliver safe, effective exercise programmes for pre and post natal clients.",
      "Covering the physiological changes of pregnancy, the guidelines around safe exercise, common postnatal conditions like diastasis recti, and how to adapt training accordingly, this award is an essential addition for any personal trainer working with female clients.",
      "The qualification is CIMSPA accredited and contributes to your CPD requirements.",
    ],
    whatYouWillLearn: [
      "Physiological and hormonal changes during pregnancy",
      "Safe exercise guidelines for each trimester",
      "How to screen and assess pre and post natal clients",
      "Common postnatal conditions and training adaptations",
      "How to design programmes that evolve with the client",
    ],
    entryRequirements: [
      "Must hold a Level 3 Personal Training qualification",
      "Or equivalent fitness industry experience",
    ],
    modules: [
      {
        title: "Pregnancy & Exercise",
        topics: [
          "Physiological changes by trimester",
          "Safe and contraindicated exercises",
          "Screening and PAR-Q for pregnant clients",
          "Pelvic floor health during pregnancy",
        ],
      },
      {
        title: "Postnatal Training",
        topics: [
          "Postnatal recovery timeline",
          "Diastasis recti — identification and management",
          "Returning to exercise safely",
          "Adapting sessions for sleep deprivation and fatigue",
        ],
      },
      {
        title: "Programme Design",
        topics: [
          "Designing trimester-appropriate programmes",
          "Postnatal programme progression",
          "Nutrition considerations for pre and post natal clients",
          "When to refer to a women's health physiotherapist",
        ],
      },
    ],
    pricing: [
      {
        name: "Course Fee",
        price: 325,
        description: "Full course delivery, assessment, and Active IQ certification.",
        includes: [
          "Full course delivery over 1–2 days",
          "Course materials and workbook",
          "Written and practical assessments",
          "Level 3 Award certificate on completion",
          "CPD points towards annual requirements",
        ],
        highlighted: true,
      },
    ],
    hasBillingToggle: false,
    bookletFolder: "pre-post-natal",
    bookletPageCount: 12,
    bookletPdfPath: "/pre_post.pdf",
  },
  {
    slug: "emergency-first-aid",
    title: "Level 3 Award in Emergency First Aid at Work",
    shortTitle: "Emergency First Aid",
    level: "Level 3",
    category: "cpd",
    awardingBody: "Active IQ",
    duration: "1 day",
    tagline: "The first aid qualification every fitness professional needs.",
    heroImage: "https://images.unsplash.com/photo-1612776572997-76cc42e058c3?auto=format&fit=crop&w=1920&q=80",
    overview: [
      "Emergency First Aid at Work (EFAW) is a one-day qualification that equips you to respond quickly and effectively in an emergency. For fitness professionals it is not just good practice — many employers require it, and many insurance providers expect it.",
      "The course covers CPR, the use of an AED, management of common emergency situations, and the practical skills to keep someone safe until the emergency services arrive.",
      "The Level 3 Award in Emergency First Aid at Work is Ofqual regulated, HSE-compliant, and valid for three years.",
    ],
    whatYouWillLearn: [
      "How to manage an unresponsive casualty",
      "CPR for adults, children, and infants",
      "How to use an Automated External Defibrillator (AED)",
      "Managing common emergencies: choking, bleeding, seizures",
      "Legal responsibilities of a first aider at work",
    ],
    entryRequirements: [
      "No prior qualifications required",
      "Suitable for all fitness professionals and the public",
    ],
    modules: [
      {
        title: "Emergency Response",
        topics: [
          "Primary survey and calling for help",
          "Managing an unresponsive and breathing casualty",
          "Recovery position",
          "Recognising a cardiac arrest",
        ],
      },
      {
        title: "CPR & Defibrillation",
        topics: [
          "Adult, child, and infant CPR",
          "AED operation and safety",
          "When to start and stop CPR",
          "Chain of survival",
        ],
      },
      {
        title: "Managing Common Emergencies",
        topics: [
          "Choking in adults, children, and infants",
          "Severe bleeding and wound management",
          "Seizures and epilepsy",
          "Fainting, shock, and diabetes emergencies",
        ],
      },
    ],
    pricing: [
      {
        name: "Course Fee",
        price: 175,
        description: "Full day training, assessment, and regulated certification.",
        includes: [
          "Full day practical training",
          "Course materials",
          "HSE-compliant assessment",
          "Level 3 EFAW certificate (valid 3 years)",
          "CPD points towards annual requirements",
        ],
        highlighted: true,
      },
    ],
    hasBillingToggle: false,
    bookletFolder: "first-aid",
    bookletPageCount: 17,
    bookletPdfPath: "/firstaid.pdf",
  },
];

export default qualifications;

export function getQualificationBySlug(slug: string): Qualification | undefined {
  return qualifications.find((q) => q.slug === slug);
}
