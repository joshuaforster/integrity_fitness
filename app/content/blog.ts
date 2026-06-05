export type BlogAuthor = {
  name: string;
  role: string;
  avatar?: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  image: string;
  body: string[];
  author: BlogAuthor;
};

// ── Hero ──────────────────────────────────────────────────────────────────────

export const blogHero = {
  label: "Blog",
  title: "Insights & Stories",
  subtitle: "Advice, perspectives, and real stories from the world of fitness education.",
  image: "/images/20221115-IFE-CF_001.JPG",
} as const;

const HARRY: BlogAuthor = {
  name: "Harry",
  role: "Founder & Head Coach",
  avatar: "https://pub-6e6bb53af6c34756a861d2c0a8259e84.r2.dev/TGG%20Norwich/HARRY-GYM-FLOOR-20220124-IFE-TGGNCC004.jpg",
};

// ── Posts ─────────────────────────────────────────────────────────────────────

export const blogPosts: BlogPost[] = [
  {
    slug: "how-to-build-confidence-as-a-new-pt",
    title: "How to Build Confidence as a New Personal Trainer",
    date: "14 May 2026",
    category: "Career",
    excerpt: "Starting out as a PT can feel overwhelming. Here is what actually helps.",
    image: "/images/20221115-IFE-CF_010.JPG",
    author: HARRY,
    body: [
      "The first few weeks as a qualified personal trainer are unlike anything you prepared for. You have the knowledge. You have the certificate. But walking onto the gym floor and charging someone money for your time feels like a completely different challenge.",
      "The truth is, confidence does not come before you start — it comes because you start. Every session you complete, every client who comes back the following week, every moment a plan actually works adds something that no classroom can give you.",
      "One of the most useful things you can do in the early days is shadow a more experienced coach. Watching how someone handles a client who is struggling, or how they adjust a plan on the spot, teaches you things that no textbook covers. Most coaches are happy to let you observe — just ask.",
      "Keep a record of your sessions. When something works, write it down. When something does not, write that down too. Over time you will build a personal reference library that is far more valuable than any generic PT manual.",
      "Finally, remember that your clients are not judging you as harshly as you judge yourself. Most people just want someone who shows up, listens, and genuinely tries to help them. That part does not require years of experience — just the willingness to care.",
    ],
  },
  {
    slug: "five-things-nobody-tells-you",
    title: "5 Things Nobody Tells You About Getting Your PT Qualification",
    date: "22 Apr 2026",
    category: "Training",
    excerpt: "The industry has changed. Here is what to expect before you sign up.",
    image: "/images/20221115-IFE-CF_020.JPG",
    author: HARRY,
    body: [
      "Getting a personal training qualification is one of the best decisions you can make. But the path between signing up and actually working as a PT has a few surprises that most people are not warned about.",
      "First: the theory is harder than you expect. Anatomy, physiology, nutrition principles — there is a real academic component to this, and the students who treat it like a proper qualification from day one tend to do better than those who assume it will be straightforward.",
      "Second: practical hours matter as much as written work. You will need to complete assessed practical sessions with real clients before you qualify. The sooner you start finding people to practise with — friends, family, willing gym members — the less stressful that part becomes.",
      "Third: not all providers are the same. Large group-based courses and one-to-one tuition produce very different results. The format affects how much you actually learn, not just how quickly you get through the material.",
      "Fourth: the business side is almost never taught. Most PT courses focus entirely on fitness knowledge and say almost nothing about finding clients, pricing your services, or managing your schedule. Seek that knowledge out separately — it will make or break your first year.",
      "Fifth: passing the course is the starting line, not the finish. The most successful PTs treat qualification as the beginning of their education, not the end of it.",
    ],
  },
  {
    slug: "from-client-to-coach",
    title: "From Client to Coach: Making the Switch",
    date: "10 Mar 2026",
    category: "Stories",
    excerpt: "What it really takes to go from being trained to training others.",
    image: "/images/20221115-IFE-CF_030.JPG",
    author: HARRY,
    body: [
      "For a lot of people who become personal trainers, the path started not with a career plan but with a moment. A point where fitness changed something for them — their health, their confidence, the way they saw their own potential.",
      "That moment is powerful. But turning it into a career requires something more than enthusiasm. It requires the willingness to start over as a beginner in a completely different discipline.",
      "Being a great client does not automatically make you a great coach. The physical knowledge transfers, but coaching is a skill of its own. Listening. Observing. Communicating. Adapting a plan when the plan is not working. These things have to be learned and practised.",
      "The coaches who make the transition successfully tend to share one thing: they take the qualification as seriously as their training. They study, they question, they seek feedback. They understand that their job is not to replicate their own journey for every client — it is to help each person find theirs.",
      "If you are considering making the switch, the most important question is not whether you love fitness. The answer to that is probably yes. The question is whether you are genuinely interested in other people's progress — enough to put your own training second when needed.",
    ],
  },
  {
    slug: "why-one-to-one-coaching-changes-everything",
    title: "Why One-to-One Coaching Changes Everything",
    date: "18 Feb 2026",
    category: "Coaching",
    excerpt: "Group classes have their place. But nothing matches what happens in a 1:1 session.",
    image: "/images/20221115-IFE-CF_040.JPG",
    author: HARRY,
    body: [
      "Group fitness has had a remarkable decade. Spin classes, HIIT studios, bootcamps — they brought exercise to people who never thought they would enjoy it. That is genuinely valuable.",
      "But one-to-one coaching does something fundamentally different. It is not just the same thing with fewer people. It is a different category of service.",
      "In a one-to-one session, the programme is built around one person's specific body, history, goals, and life. The warm-up, the load selection, the rest periods, the cues used — all of it is calibrated to that individual. There is no averaging, no compromise for the group, no template designed for a generic client.",
      "This matters most when things get complicated. When someone has an old injury that changes how they should load a movement. When their work schedule means sleep is poor and today is not the day for maximum effort. When they need to be pushed, and when they need to be steadied. A one-to-one coach can read all of this and respond in real time.",
      "For students learning to coach, this also means one-to-one tuition works better than group training. The feedback is faster, the corrections are more precise, and the learning sticks because it is always contextualised to what you are actually doing.",
    ],
  },
  {
    slug: "what-does-cimspa-accreditation-mean",
    title: "What Does CIMSPA Accreditation Actually Mean?",
    date: "28 Jan 2026",
    category: "Industry",
    excerpt: "Everyone throws around the word accredited. Here is what it means in practice.",
    image: "/images/20221115-IFE-CF_050.JPG",
    author: HARRY,
    body: [
      "You will see the word 'accredited' used a lot when fitness education providers describe their courses. But accreditation from different bodies means very different things, and it is worth understanding exactly what you are getting before you sign up.",
      "CIMSPA — the Chartered Institute for the Management of Sport and Physical Activity — is the professional development body for the UK's sport and physical activity sector. When a course is CIMSPA-accredited, it means the programme has been reviewed against national standards and meets the criteria for professional recognition.",
      "In practical terms, this means the qualification is recognised by employers, gyms, and insurance providers across the UK. When you are applying for a role or setting up as self-employed, having a CIMSPA-endorsed qualification removes the doubt that a lesser-known certificate might create.",
      "It also means the provider is accountable. CIMSPA does not simply rubber-stamp a course and move on. There is an ongoing relationship between the provider and the awarding body, which gives students a level of assurance about the quality of what they are paying for.",
      "If a provider cannot clearly tell you which body accredits their courses, or which Ofqual-regulated awarding organisation sits behind the qualification, treat that as a significant warning sign. The accreditation is not a detail — it is the foundation.",
    ],
  },
  {
    slug: "building-your-first-client-base",
    title: "Building Your First Client Base From Zero",
    date: "5 Dec 2025",
    category: "Business",
    excerpt: "You have got the qualification. Now what? The honest guide to finding your first clients.",
    image: "/images/20221115-IFE-CF_060.JPG",
    author: HARRY,
    body: [
      "Nobody tells you how quiet it is after you qualify. The course ends, you have the certificate, and then you sit waiting for clients to appear. They do not appear on their own.",
      "Building a client base takes deliberate effort, and the sooner you accept that it is a skill — not something that just happens — the sooner you will make progress.",
      "Start with the people who already know you. Not because they are easy sells, but because they are honest. A friend who trains with you will give you real feedback. They will tell you what was good and what felt awkward. Early on, that feedback is more valuable than the money.",
      "Show up consistently. A social media profile that posts twice a week for six months will always outperform one that posts twelve times in January and then goes quiet. You do not need professional videos or a logo — you need to demonstrate, regularly, that you are working and that you know what you are talking about.",
      "Partner with local businesses. A sports massage therapist, a physio, a nutritionist — anyone whose clients might also need what you offer. These are not competitors. They are part of a network your ideal client is already using.",
      "Be patient. Most PTs who build a strong client base in their first year will tell you the early sessions felt thankless. They did the work before the results were visible. That is exactly what you have to be willing to do.",
    ],
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
