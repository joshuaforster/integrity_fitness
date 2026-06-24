"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

// ── Types ─────────────────────────────────────────────────────────────────────

type QualLevel = "L2" | "L3" | "L3+" | "pre";

interface Niche {
  id: string;
  name: string;
  category: string;
  tagline: string;
  hook: string;
  description: string;
  secretInsight: string;
  marketOpportunity: string;
  qualRequired: "L2" | "L3" | "L3+CPD";
  cpdNote?: string;
  firstSteps: string[];
}

interface QuestionOption {
  text: string;
  weights: Partial<Record<string, number>>;
  qualLevel?: QualLevel;
}

interface Question {
  q: string;
  subtitle?: string;
  options: QuestionOption[];
}

// ── Niche data ────────────────────────────────────────────────────────────────

const NICHES: Niche[] = [
  {
    id: "longevity",
    name: "Longevity & Anti-Ageing Specialist",
    category: "Premium Health",
    tagline: "Your clients don't want to look better. They want to outlive everyone.",
    hook: "The fastest-growing premium fitness market isn't aesthetics — it's biological age.",
    description:
      "High-earning professionals in their 40s and 50s are paying £100–150 per session not for six-packs, but for VO2 max improvements, grip strength percentiles, and bone density progress. They've read Peter Attia. They understand Zone 2 cardio, sleep quality, and mTOR pathways. They want a PT who matches their intelligence and their ambition — not someone who puts them on a standard bootcamp programme.",
    secretInsight:
      "The word 'longevity' attracts clients who don't baulk at premium pricing — because they're already spending on private healthcare, sleep trackers, and expensive supplements. Your job isn't to sell them on fitness. It's to be more knowledgeable than the YouTube rabbit holes they've already disappeared down. This is a referral-heavy niche: one executive client leads to their whole department. You never run a promotion again.",
    marketOpportunity:
      "The 45–65 demographic controls 70% of UK wealth. The longevity science conversation (Attia, Huberman, Bryan Johnson) has entered mainstream consciousness. Demand is surging, supply of genuinely knowledgeable PTs is near zero, and premium pricing (£80–150/session) is not just acceptable — it's expected.",
    qualRequired: "L3",
    firstSteps: [
      "Read Peter Attia's 'Outlive' — it is the blueprint your ideal clients already know",
      "Learn Zone 2 training protocols and how to test and track VO2 max proxies",
      "Get familiar with functional markers: grip strength norms, bone density, HRV, resting RHR trends",
      "Price at £80–120/session from day one — this market reads low prices as low expertise",
    ],
  },
  {
    id: "menopause",
    name: "Menopause & Perimenopause PT",
    category: "Women's Health",
    tagline: "13 million women in the UK are in perimenopause or menopause. Almost no PTs understand what they're going through.",
    hook: "The PT who finally explains the hormonal science becomes the PT women send everyone they know to.",
    description:
      "Perimenopause can start in a woman's early 40s, and the symptoms — weight gain despite no dietary changes, muscle loss, fatigue, brain fog, anxiety — look exactly like 'not trying hard enough.' Most PTs double down on restriction and high-intensity cardio. The evidence says the opposite works: progressive resistance training, lower-intensity steady-state work, protein-forward nutrition, and genuine stress management.",
    secretInsight:
      "Menopausal clients are arguably the most loyal clients in fitness. Once you understand them when nobody else has, they do not leave. They also refer intensely — their network of friends is going through exactly the same thing, and they have finally found the one PT who gets it. In a market of millions of women and a handful of qualified specialists, you could become the known name in your city within a year.",
    marketOpportunity:
      "Around 13 million women in the UK are peri or post-menopausal. The conversation is now mainstream (Davina McCall, NICE guideline changes). Qualified menopause fitness specialists are exceptionally rare. Premium pricing (£70–120/session) is easily justified because clients see this as specialist healthcare, not standard PT.",
    qualRequired: "L3",
    cpdNote: "A Menopause Fitness CPD sets you apart completely and is available from several UK providers",
    firstSteps: [
      "Do a Menopause Fitness CPD — it signals expertise and fills critical knowledge gaps fast",
      "Partner with local GPs and menopause clinics who are actively looking to refer patients",
      "Read Dr Louise Newson's work — your ideal clients already have",
      "Build your online presence around menopause fitness specifically — you will rank locally almost immediately because nobody else is doing it",
    ],
  },
  {
    id: "corporate",
    name: "Corporate Wellness & Desk Performance Coach",
    category: "B2B Fitness",
    tagline: "Stop chasing individual clients. Go where the money already is. It's in the office.",
    hook: "One B2B contract beats 20 individual clients. You invoice once. Income is predictable. You never chase payment.",
    description:
      "Corporate PT is not bootcamps in car parks. It is landing a contract with a tech company, a law firm, or a financial services business — then running lunchtime sessions, ergonomic assessments, or workplace wellness programmes for their staff. You charge per head, per session, or on a monthly retainer. The finance director approves the budget once a quarter. You just show up and deliver.",
    secretInsight:
      "Companies have a legal duty of care around employee health, and post-pandemic they're spending on it. HR managers are actively looking for providers but most PTs approach this completely wrong — leading with a pitch about 'fitness.' What companies actually want is stress reduction, reduced sick days, and improved productivity. Frame your service in their language, not yours, and the doors open almost immediately.",
    marketOpportunity:
      "UK corporate wellness spend exceeds £7 billion and is growing. One contract with a medium-sized business could be worth £15,000–£50,000 per year. And unlike individual clients, businesses have procurement processes that create recurring relationships — once you're in, renewals are far easier than finding new clients.",
    qualRequired: "L2",
    firstSteps: [
      "Create a 'Corporate Wellness' one-pager in HR and CFO language: ROI, sick day reduction, staff retention",
      "Start with smaller local businesses — faster decisions, easier to get meetings",
      "Offer a free taster 'Desk Athlete' workshop to demonstrate value before asking for a contract",
      "Network with HR professionals on LinkedIn — they are the gatekeepers and they are looking for you",
    ],
  },
  {
    id: "active-ageing",
    name: "Older Adult & Active Ageing Specialist",
    category: "Longevity & Independence",
    tagline: "The silver economy is the most underserved, most loyal, and most profitable client base most PTs walk straight past.",
    hook: "Adults 65+ are the clients who show up every week, pay on time, refer everyone they know, and stay for a decade.",
    description:
      "Older adult clients don't want to look like bodybuilders. They want to carry their own shopping, play with their grandchildren, stay independent, and not fall. That is a deeply achievable, profoundly meaningful goal — and a PT who delivers it builds a practice that grows entirely on word-of-mouth. The results here are obvious, life-changing, and visible to everyone in the client's circle.",
    secretInsight:
      "The NHS is actively trying to reduce falls — the second-biggest cause of injury hospitalisation for over-65s — and is looking for credible fitness professionals to refer patients to. Local GP surgeries, Age UK, care homes, and social prescribing networks are desperate for this. You could build a full client caseload from a single social prescribing meeting without spending a penny on advertising. And NHS referrals carry a credibility that no amount of Instagram content generates.",
    marketOpportunity:
      "12 million UK adults over 65, with only 9% doing the recommended weekly physical activity. The 'silver pound' is substantial — this demographic has significant disposable income and high motivation to invest in health. Group class models work especially well, creating community income and reducing per-client dependency.",
    qualRequired: "L3",
    cpdNote: "An Active Ageing or Older Adult CPD is strongly recommended and makes NHS and GP referrals significantly easier",
    firstSteps: [
      "Contact your local GP surgery's social prescribing team — they can and will refer directly to qualified fitness professionals",
      "Do an Active Ageing CPD to fully understand the physiology, safeguarding, and contraindications",
      "Partner with Age UK, a U3A group, or a local community centre for your first group sessions",
      "Learn the OTAGO falls prevention programme — it gives you immediate credibility with healthcare referrers",
    ],
  },
  {
    id: "mental-health",
    name: "Mental Health Through Movement Coach",
    category: "Wellbeing",
    tagline: "Exercise is medicine. You just need to learn how to prescribe it for the brain, not only the body.",
    hook: "The UK has a mental health crisis and a therapist shortage. Exercise is one of the most evidence-based interventions available — and you could be delivering it.",
    description:
      "Clients who struggle with anxiety, depression, trauma, or low self-worth often find that movement is the most accessible intervention available — but most PTs don't know how to work with them safely, or underestimate how much the right environment and the right language matters. A PT who understands psychological safety, motivational interviewing basics, and the evidence behind exercise as a mental health intervention produces results that go far beyond aesthetics.",
    secretInsight:
      "Therapists, counsellors, GPs, and mental health charities are actively looking for fitness professionals who understand their clients' needs. Most PTs aren't on their radar because they aren't marketing specifically in this direction. Add a Mental Health Awareness qualification, attend one GP social prescribing event, and referrals start. Then they compound. One good referral partner generates more clients than six months of social media posting.",
    marketOpportunity:
      "1 in 4 UK adults experience a mental health issue each year. NHS mental health service waiting lists are 12–18 months in many areas. 'Exercise on prescription' schemes are expanding nationally. Social prescribing referrals to exercise professionals are actively funded. This is a growth area with strong structural tailwinds.",
    qualRequired: "L3",
    cpdNote: "A Level 2 Award in Mental Health Awareness (like the one we offer at IFE) is practically essential for this niche",
    firstSteps: [
      "Get your Level 2 Mental Health Awareness qualification — it gives you both the knowledge and the professional credibility",
      "Learn the basics of trauma-informed practice and how to design psychologically safe training environments",
      "Connect with your local social prescribing network, IAPT service, and mental health charities",
      "Market yourself specifically around exercise for mental health — your ideal clients are already searching for it",
    ],
  },
  {
    id: "pre-postnatal",
    name: "Pre & Post Natal Fitness Specialist",
    category: "Women's Health",
    tagline: "A nine-month window with a client who trusts you completely. Then a relationship that lasts years.",
    hook: "Most postnatal fitness advice is dangerously generic. You will be the exception — and the referrals will follow.",
    description:
      "The standard advice — 'wait six weeks and come back to the gym' — fails postnatal women badly. Pelvic floor rehabilitation, load management, returning to impact activity, and the psychological complexity of postpartum body image are all things most PTs have never been properly trained in. The specialists who are trained build referral networks with midwives, health visitors, and NCT groups that keep them fully booked indefinitely.",
    secretInsight:
      "Pre and postnatal clients generate extraordinary referrals because they are embedded in communities with massive, trusted word-of-mouth — NCT groups, baby classes, health visitor appointments, active mum social circles. One client in a well-connected social group becomes five. And when clients return for a second pregnancy, they come to you first. This relationship can genuinely last a decade. No other niche reliably produces this kind of long-term compounding.",
    marketOpportunity:
      "Around 700,000 babies are born in the UK each year — every one of them has a mother who has been through a significant physical event and received almost no structured fitness guidance. Premium pricing (£60–100/session) is standard because clients perceive this as specialist healthcare, not standard PT.",
    qualRequired: "L3+CPD",
    cpdNote: "Level 3 Award in Supporting Pre & Post Natal Clients is not optional here — it's the qualification, and you should not work with this population without it",
    firstSteps: [
      "Get your Level 3 Pre & Post Natal CPD — study pelvic floor anatomy and rehabilitation principles thoroughly",
      "Introduce yourself to local community midwives and health visitors, showing them your qualification",
      "Join local NCT Facebook groups to understand the language and real concerns your future clients have",
      "Offer an initial consultation specifically around returning to exercise postpartum — it is your highest-converting entry point",
    ],
  },
  {
    id: "neurodivergent",
    name: "Neurodivergent Fitness Coach",
    category: "Inclusive Fitness",
    tagline: "1 in 5 people are neurodivergent. The mainstream fitness industry is failing almost all of them.",
    hook: "Be the PT who makes exercise finally work for brains that don't work like everyone else's.",
    description:
      "ADHD, autism, dyspraxia, and other neurodivergent conditions affect around 15–20% of the population — and mainstream fitness environments are often overwhelming, unpredictable, and hostile to how their brains process the world. Rigid class schedules, loud music, unexpected changes, complex social dynamics, shame-based motivation: it all works against them. A PT who genuinely understands these differences can build an intensely loyal, woefully underserved client base.",
    secretInsight:
      "Neurodivergent clients, when they find a PT who truly gets them, become evangelists. They post about you in Facebook groups for ADHD adults, autism communities, and dyspraxia networks. They tell their OTs and CAMHS workers and ADHDers UK group members. The word spreads inside tight communities that are desperately searching for what you offer. And these clients often have a highly specific relationship with routine — once you are their PT, you stay their PT for years.",
    marketOpportunity:
      "ADHD diagnoses in UK adults have tripled in the last decade. Autism identification has increased dramatically. These communities are large, underserved, and active online — but they don't search 'personal trainer.' They search 'ADHD-friendly fitness' or 'trainer who understands autism.' Rank for those specific terms and you access an audience with almost no competition.",
    qualRequired: "L3",
    cpdNote: "A Mental Health Awareness qualification is a strong foundation; specialist neurodivergent CPDs are now emerging and worth pursuing",
    firstSteps: [
      "Deep-dive into ADHD and autism first from lived-experience sources — follow neurodivergent creators and read widely",
      "Learn motivational interviewing techniques and how to design sessions that reduce sensory overwhelm",
      "Market explicitly to neurodivergent communities — Facebook groups, Reddit, specialist forums are your channels",
      "Partner with ADHD and autism support organisations who can refer members and credentialise your work",
    ],
  },
  {
    id: "chronic-pain",
    name: "Chronic Pain & Mobility Specialist",
    category: "Rehabilitation Fitness",
    tagline: "Millions of people have been told to just rest. You'll be the one who actually helps them.",
    hook: "Modern pain science says the right exercise is one of the best interventions for chronic pain. Nobody has told these clients that yet.",
    description:
      "Clients with fibromyalgia, chronic lower back pain, hypermobility, or persistent joint pain are routinely told to be careful, avoid activity, or simply manage their condition indefinitely. Pain neuroscience says the opposite: appropriate, graduated movement is one of the most effective interventions available. A PT who understands load management, the biopsychosocial model of pain, and how to build capacity without triggering flares can achieve results that feel genuinely miraculous to these clients.",
    secretInsight:
      "Chronic pain clients are desperate and loyal in equal measure. They've tried physiotherapy, seen multiple consultants, done the rounds, been told little can be done. When a PT understands their experience and actually helps them — even incrementally — the gratitude is intense and the loyalty is unmatched. They refer to rheumatologists, pain management clinics, fibromyalgia support groups, and hypermobility communities. Your waiting list fills by referral alone once you are known.",
    marketOpportunity:
      "Around 28 million UK adults live with chronic pain. NHS pain management services are overwhelmed, with waiting lists of 12–18 months in many areas. Private pain management clinics are growing rapidly and increasingly keen to refer to well-qualified exercise specialists as part of multidisciplinary care.",
    qualRequired: "L3",
    cpdNote: "A pain management, functional movement, or rehabilitation CPD strengthens your credibility with healthcare professionals enormously",
    firstSteps: [
      "Study pain neuroscience — 'Explain Pain' by Butler and Moseley is the foundational text for this niche",
      "Understand graded exposure and how to build exercise tolerance without triggering painful setbacks",
      "Connect with local physiotherapists and pain management clinics who can refer appropriate patients",
      "Join online chronic pain communities — fibromyalgia groups, chronic illness forums — to understand the lived experience",
    ],
  },
  {
    id: "cancer-recovery",
    name: "Oncology & Cancer Recovery PT",
    category: "Medical Fitness",
    tagline: "The hardest niche to enter. The most meaningful work you'll do. The best referral network in fitness.",
    hook: "Exercise is now classified as evidence-based medicine for cancer treatment and recovery. Almost no PTs are qualified to deliver it.",
    description:
      "Cancer patients and survivors are almost never given structured fitness guidance — yet exercise is now recognised as an evidence-based intervention that reduces treatment-related fatigue, helps preserve muscle mass during chemotherapy, improves psychological wellbeing, and may reduce recurrence risk in certain cancers. Macmillan Cancer Support, oncology physiotherapy teams, and cancer charities all want to refer to qualified PT specialists. Very few are there to receive those referrals.",
    secretInsight:
      "Oncology fitness specialists consistently report that this niche almost never requires cold selling. Once you are qualified and connected, referrals arrive from hospital departments, Macmillan nurses, and cancer support groups continuously. The emotional reward is incomparable. These clients fight extraordinarily hard, and every increment of progress feels earned in a way that most fitness work simply doesn't. Specialists in this niche describe it as the most important work they've ever done.",
    marketOpportunity:
      "375,000 people in the UK are diagnosed with cancer each year. Over 3 million people are currently living with or beyond cancer. Macmillan Cancer Support maintains an active directory of exercise professionals and actively promotes referrals to them. This is a funded, NHS-supported referral pathway with essentially no competition at the community PT level.",
    qualRequired: "L3+CPD",
    cpdNote: "BACR (British Association for Cardiovascular Prevention and Rehabilitation) and Macmillan both offer accredited oncology fitness qualifications",
    firstSteps: [
      "Get a cancer rehabilitation or oncology fitness CPD — Macmillan and BACR both offer routes to qualification",
      "Register with the Macmillan Move More exercise specialist directory after qualifying",
      "Introduce yourself to the oncology physiotherapy team at your nearest cancer centre",
      "Connect with local cancer support charities and Maggie's Centres who run ongoing client support groups",
    ],
  },
  {
    id: "martial-arts",
    name: "Martial Arts & Combat Sports S&C Coach",
    category: "Athletic Performance",
    tagline: "Every BJJ blue belt, boxer, and MMA fighter is massively undertrained physically. You could be the coach who fixes that.",
    hook: "Combat sport athletes train their sport obsessively. They almost never train the physical attributes that would make them far better at it.",
    description:
      "The strength and conditioning gap in amateur combat sports is enormous. BJJ practitioners who train four days a week but have never done structured grip endurance work. Boxers with no explosive hip power development. MMA fighters with no periodisation around fight camp. They overtrain sport skills and undertrain the physical qualities — strength, explosive power, aerobic base, injury resilience — that would make them significantly better and keep them healthy longer.",
    secretInsight:
      "Combat sports gyms are tight, trust-based communities. If you become the S&C coach associated with one gym — even informally at first, through workshops or free sessions — word spreads to every member, competitor, and affiliate club. Combat sport athletes are intensely motivated, intellectually curious about performance science, and willing to pay premium rates to someone who speaks their language fluently. And there are more combat gyms in the UK than there have ever been.",
    marketOpportunity:
      "BJJ participation in the UK has increased by over 300% in the last decade. Boxing and MMA gyms are proliferating in every town. Yet proper S&C coaching for amateur combat athletes barely exists outside professional fight camps. The gap between supply and demand is enormous, the community is large and growing, and digital content about combat sport S&C has almost no real competition.",
    qualRequired: "L3",
    firstSteps: [
      "Train in a combat sport yourself — you need to understand the culture and the specific physical demands",
      "Approach local BJJ, boxing, or MMA gyms and offer a free S&C workshop — lead with value",
      "Learn the distinct energy system demands of each discipline: BJJ, boxing, and MMA are all different",
      "Create S&C content for combat athletes on social media — it's a highly engaged niche with virtually no competition",
    ],
  },
  {
    id: "trail-running",
    name: "Trail Running & Endurance S&C Coach",
    category: "Athletic Performance",
    tagline: "The ultramarathon boom created thousands of overtrained, injury-prone runners who have never done a single structured strength session.",
    hook: "Trail runners spend thousands on kit, race entries, and nutrition. They will spend on a coach who makes them faster and less broken.",
    description:
      "The trail running and ultramarathon scene has exploded. People who were casual 10k runners are now signing up for 50-mile mountain races. They don't know how to strength train for single-leg stability, eccentric quad strength for descents, or hip hinge patterns that transfer to running economy. They overtrain on easy days, don't recover properly, and accumulate ITB syndrome, stress fractures, and overuse injuries that sideline them for months.",
    secretInsight:
      "Trail runners are obsessive about their sport and form intensely close communities. Local running clubs, Strava segments, and race events are the real marketing channels — not Instagram polish. Show up at a local trail race with a free movement screening or post-race mobility session, and you collect twenty interested contacts in an hour. This community rewards genuine knowledge and shared experience over slick branding, which means real expertise is your competitive advantage.",
    marketOpportunity:
      "UK trail running participation doubled between 2015 and 2024. Ultramarathon entry numbers have grown by over 200% in the same period. The average trail runner spends significantly more on their sport per year than a standard gym-goer — and coaching rates of £60–90/session are considered normal within this community.",
    qualRequired: "L3",
    firstSteps: [
      "Run trails yourself — you need to understand the terrain, the culture, and the specific physiological demands",
      "Learn eccentric loading for downhill running, single-leg strength work, and hip mobility for trail athletes",
      "Attend local trail races — volunteer, network, and offer taster movement screenings",
      "Create trail-runner-specific content: 'why runners need strength training' consistently outperforms generic PT content",
    ],
  },
  {
    id: "golf",
    name: "Golf Performance Specialist",
    category: "Sport Performance",
    tagline: "150 million golfers worldwide, most of them affluent, most in their 40s–60s. Virtually none of them train properly for their sport.",
    hook: "Golf clubs are full of people who spend £200 on a driver lesson and nothing on the body that actually swings it.",
    description:
      "Golf is one of the fastest-growing sports and its participants skew strongly toward the 40–70 affluent professional demographic. Golf-specific fitness — rotational power, hip mobility, single-leg stability, thoracic rotation, injury prevention for the lower back and elbow — is almost non-existent at club level. Most golf coaches focus purely on swing mechanics and completely ignore the physical requirements. A PT who understands golf performance can walk into any club and find clients immediately.",
    secretInsight:
      "The golf performance gap is not just about better scores — it is about pain. Lower back pain, golfer's elbow, and hip impingement are rife in amateur golfers who have never done anything to develop the physical capabilities their sport demands. A PT who can say 'I specialise in keeping golfers pain-free, playing longer, and hitting further' has a message that cuts straight through to a wealthy, motivated, and under-served audience. Once known at one golf club, you are known at every club in the county within a year through their social networks.",
    marketOpportunity:
      "Golf membership in the UK increased by 25% during and after COVID and has not declined. Premium golf clubs are expanding their wellness facilities. TPI (Titleist Performance Institute) certification is a recognisable credential that golf-specific clients actively search for when looking for a specialist.",
    qualRequired: "L3",
    cpdNote: "TPI (Titleist Performance Institute) Level 1 certification is the industry-recognised golf fitness credential — it is well worth pursuing",
    firstSteps: [
      "Take a TPI Level 1 certification — it gives you golf-specific screening tools and immediately signals serious expertise",
      "Visit your local golf club and introduce yourself to the club professional and the club manager",
      "Learn the common golf injury patterns thoroughly — lower back, golfer's elbow, hip impingement — and how to address them",
      "Offer a free 'Golf Fitness MOT' to club members: a movement screen that reveals their physical limiters",
    ],
  },
  {
    id: "teen-athlete",
    name: "Youth & Teen Athletic Development Coach",
    category: "Youth Performance",
    tagline: "The window between 12 and 16 is when athletic foundations are built or missed forever. Almost nobody is working on it properly.",
    hook: "Most young athletes are coached intensively in their sport and almost never given proper athletic development underneath.",
    description:
      "Teen athletes train their sport obsessively, but the fundamental athletic qualities — speed, power, agility, deceleration mechanics, injury resilience, structural strength — are almost never addressed systematically at grassroots level. Long-Term Athletic Development (LTAD) principles identify specific developmental windows where these qualities develop most efficiently. A coach who understands LTAD can produce meaningfully better, more durable athletes — and parents of serious young athletes are beginning to understand this.",
    secretInsight:
      "The referral network in youth sport is extraordinary and almost entirely word-of-mouth. Parents talk intensely about results. Sport coaches who see athletes improving visibly refer their entire squad. You become the S&C coach associated with a local football club, rugby team, or athletics club — and within one season, every parent of a serious young athlete in the area wants a consultation. These parents invest significantly when you can articulate the value clearly in language they understand.",
    marketOpportunity:
      "Youth sports participation in the UK is high and growing. Stage-specific athletic development is now standard in professional academies — parents of serious young athletes are starting to seek out the same approach at grassroots level. There are very few properly qualified S&C coaches working with youth athletes outside academy environments. The gap is large and the demand is increasing.",
    qualRequired: "L3",
    cpdNote: "A Youth S&C CPD is valuable; be aware that working with under-18s requires a DBS check and youth safeguarding certification",
    firstSteps: [
      "Get a DBS check and youth safeguarding certificate — these are mandatory before working with under-18s",
      "Study Long-Term Athletic Development principles and Youth Physical Literacy frameworks",
      "Approach local youth sports clubs — football, rugby, tennis academies — and offer to run a free session",
      "Build relationships with parents through education: a workshop on youth athletic development at a sports club is your best introduction",
    ],
  },
  {
    id: "shift-worker",
    name: "Shift Worker Fitness Specialist",
    category: "Lifestyle Fitness",
    tagline: "15 million people in the UK work shifts. Every piece of standard fitness advice was written for someone else entirely.",
    hook: "Standard training and nutrition guidance assumes regular sleep and consistent mealtimes. Shift workers get neither. You'll fix that.",
    description:
      "NHS nurses, paramedics, police officers, firefighters, factory workers, and hospitality staff all live in a world that standard fitness advice completely ignores. Circadian rhythm disruption, irregular sleep windows, variable energy levels, unpredictable mealtimes, rotating schedules — and then a PT who tells them to eat six meals a day and train at 6am. The disconnect is absolute. A specialist who genuinely understands their life becomes invaluable almost immediately.",
    secretInsight:
      "Shift worker communities are tight and trust-based. NHS staff Facebook groups, paramedic wellbeing forums, police welfare networks — these are extremely active communities where members share what actually works for them. One NHS nurse who sees real results tells her entire ward. And these communities often have employer wellbeing budgets: an NHS Trust might fund PT sessions as a formal workplace initiative, giving you a corporate contract alongside your individual clients simultaneously.",
    marketOpportunity:
      "Around 15 million UK workers work irregular or rotating shifts. Healthcare workers alone number over 1.8 million. There is essentially zero fitness content designed specifically for shift workers — it is a completely uncontested digital content niche, which means ranking for these search terms is achievable rapidly.",
    qualRequired: "L3",
    firstSteps: [
      "Study circadian biology and sleep science as it applies to training performance and nutrition timing",
      "Create genuinely shift-worker-specific content: 'how to train on night shifts', 'nutrition for rotating rotas'",
      "Join NHS staff Facebook groups and answer questions freely — become the trusted fitness voice in these communities",
      "Contact your local NHS Trust's staff wellbeing coordinator about delivering a formal staff fitness programme",
    ],
  },
  {
    id: "group-community",
    name: "Group Fitness & Community Coach",
    category: "Community Fitness",
    tagline: "Group fitness is not the consolation prize for Level 2. Done right, it's a scaleable community business with better client retention than 1-to-1 PT.",
    hook: "Build 30 loyal regulars before you finish Level 3 and you'll never need to cold-sell individual PT.",
    description:
      "The smartest Level 2 instructors don't treat group fitness as a waiting room for Level 3 personal training. They build a paying community — morning bootcamps, women's training groups, park HIIT sessions, community strength classes — and by the time they're qualified as Level 3 PTs, they already have an audience that trusts them, consistent income, and a waiting list of people who want 1-to-1 coaching from someone they already love working with.",
    secretInsight:
      "Community is the moat that individual PT almost never has. 1-to-1 clients come and go; a community sticks and self-reinforces. The most successful fitness businesses in the UK are not large commercial gyms or premium studio chains — they are small, tight-knit communities built around a specific identity (women over 40, beginners, shift workers, parents) with a trusted coach at the centre. Start small. Start immediately. The community is not just the delivery mechanism — it is the product.",
    marketOpportunity:
      "Boutique fitness and community-based group classes have dramatically outgrown traditional gyms in the last decade. Clients pay a premium for belonging as much as for exercise quality. Park sessions and pop-up classes require minimal overhead and can generate income from the first week of qualification.",
    qualRequired: "L2",
    firstSteps: [
      "Start a free session in a park or community space in the same week you qualify — build the habit immediately",
      "Charge a small amount from week four — undercharging signals low value and attracts low-commitment clients",
      "Build around a specific community identity from the start: who is this for and why is this different from any other class?",
      "Collect email addresses, not just Instagram followers — your community should live somewhere you own, not somewhere an algorithm controls",
    ],
  },
  {
    id: "wedding-prep",
    name: "Life Event & Wedding Prep Specialist",
    category: "Lifestyle Fitness",
    tagline: "A fixed deadline. High emotional stakes. The most coachable clients in fitness. And they travel in packs.",
    hook: "One wedding client does not become two. It becomes six — once the results are visible at the wedding.",
    description:
      "Wedding prep clients are among the most coachable clients in fitness. They have a non-negotiable deadline (the date is set), they are emotionally invested, they are already spending on venues and photographers so your fees are in context, and they are consistently focused across the entire programme. Done well, this is not a seasonal side-hustle — it is a referral engine. The bride gets results. The bridesmaids notice. The mother of the bride asks who she trained with. The social proof compounds.",
    secretInsight:
      "The wedding industry runs on supplier referrals and trusted relationships. One wedding planner, one bridal boutique, or one wedding photographer who recommends you to every bride they work with is worth more than twelve months of social media content. Wedding suppliers are actively looking for complementary service providers they can refer. You are filling a gap in their client value chain — and they know it.",
    marketOpportunity:
      "Around 225,000 weddings take place in the UK each year. Each wedding involves a bride, a groom, bridesmaids, and family members — all potentially in preparation phase. Wedding spend per couple has increased significantly. Seasonal demand creates predictable business rhythms you can plan around and market into.",
    qualRequired: "L3",
    firstSteps: [
      "Contact local wedding planners and bridal boutiques and propose a referral arrangement",
      "Create a 'Wedding Prep' package with a clear timeline structure and specific outcome promise",
      "Offer photoshoot prep as a gateway service — it has a shorter lead time and reaches a wider audience",
      "Document transformation stories (with explicit permission) — before/after wedding content consistently outperforms generic PT content online",
    ],
  },
  {
    id: "equestrian",
    name: "Equestrian & Rider Performance Coach",
    category: "Sport Performance",
    tagline: "Horse riders spend thousands on their horses. Almost none of them have ever thought about training the athlete on top.",
    hook: "Rider fitness is one of the most underserved and highest-spending niches in all of sport.",
    description:
      "Horse riding has extraordinary and highly specific physical demands — asymmetrical core stability in dynamic positions, hip mobility and hip dissociation, proprioception, balance, and significant upper body endurance. Standard gym training almost never addresses any of these. Yet the equestrian market is affluent (horse ownership costs tens of thousands per year), intensely passionate about improving their riding, and completely unserved by the fitness industry. Most riders have never even been told that sport-specific fitness for equestrians exists.",
    secretInsight:
      "One partnership with a local yard, riding school, or equestrian centre gives you access to a ready-built, trusting community of clients. Yard owners and trainers are highly respected figures in equestrian culture — if the yard owner recommends you, people listen immediately. County equestrian events, British Eventing affiliated yards, and riding club networks are networking environments where nobody else is doing what you do. You will be genuinely novel and immediately interesting to everyone you meet.",
    marketOpportunity:
      "Around 3 million people in the UK ride horses. It is a top-10 participation sport by number. Horse ownership costs tens of thousands per year — these clients have demonstrably high discretionary spending. TPI-style equestrian fitness certifications are only just beginning to emerge, meaning first movers establish significant reputational advantage.",
    qualRequired: "L3",
    firstSteps: [
      "Spend time at a local yard before anything else — you need to understand the culture and the sport from the inside",
      "Learn the specific biomechanical demands of different disciplines: dressage, jumping, and eventing each have distinct requirements",
      "Contact your nearest equestrian centre, riding school, or British Eventing affiliated yard",
      "Create content specifically for riders — 'core strength for dressage', 'fitness for jumping' — these search terms have almost no competition whatsoever",
    ],
  },
  {
    id: "new-parent",
    name: "New Parent Fitness Specialist",
    category: "Life Stage Fitness",
    tagline: "New parenthood is one of the biggest physical and psychological transitions of a lifetime. Almost no PTs are prepared for it.",
    hook: "The standard 'wait six weeks' advice fails new parents badly. You'll be the one who actually understands their reality.",
    description:
      "New parents — particularly mothers but increasingly fathers — face a unique set of challenges: physical recovery, disrupted sleep, changed body image, identity shift, limited time windows, and complete schedule unpredictability. Standard fitness advice fails them completely. A PT who understands pelvic floor rehabilitation, returning to exercise postpartum, training around broken sleep patterns, and the emotional complexity of a postpartum relationship with one's body builds the kind of client loyalty that generates referrals for years.",
    secretInsight:
      "New parent communities are extraordinarily active and interconnected. NCT groups, mum Facebook groups, baby class communities, and local parent networks are tight environments where recommendations spread immediately. A midwife or health visitor recommendation is the most valuable referral you can receive. Getting your name known in one NCT group through results can fill your diary for six months. And clients who trust you for one pregnancy come back for the second, and the third, following you across a decade.",
    marketOpportunity:
      "700,000 babies born in the UK each year means 700,000 mothers entering the immediate postpartum phase. The postnatal fitness space is beginning to develop but remains dramatically undersupplied with genuinely qualified, knowledgeable professionals. Premium pricing is readily accepted because clients perceive specialist postpartum coaching as healthcare, not standard PT.",
    qualRequired: "L3+CPD",
    cpdNote: "Pre & Post Natal CPD is essential — you should not advise on postnatal return-to-exercise without proper specialist training",
    firstSteps: [
      "Get your Pre & Post Natal CPD before working with this population — the qualification is not optional",
      "Study pelvic floor anatomy and current evidence-based postnatal return-to-exercise guidelines in depth",
      "Introduce yourself formally to local health visitors and midwifery teams, showing them your qualification",
      "Create content specifically for the fourth trimester and early return to exercise — your ideal clients are actively searching for this information",
    ],
  },
];

// ── Questions ─────────────────────────────────────────────────────────────────

const QUESTIONS: Question[] = [
  {
    q: "What's your current qualification level?",
    subtitle: "This helps us show you what's available now — and what to aim for next.",
    options: [
      {
        text: "Level 2 Gym Instructor — qualified or currently studying",
        weights: { "group-community": 3, corporate: 1 },
        qualLevel: "L2",
      },
      {
        text: "Level 3 Personal Trainer — qualified or currently studying",
        weights: {
          longevity: 1, menopause: 1, "active-ageing": 1, "mental-health": 1,
          "chronic-pain": 1, "martial-arts": 1, "trail-running": 1, golf: 1,
          "teen-athlete": 1, "shift-worker": 1, "wedding-prep": 1, equestrian: 1,
        },
        qualLevel: "L3",
      },
      {
        text: "Level 3 PT + additional CPD qualifications",
        weights: { "cancer-recovery": 3, "pre-postnatal": 3, neurodivergent: 2, "mental-health": 2, "new-parent": 2 },
        qualLevel: "L3+",
      },
      {
        text: "Not yet qualified — planning to start soon",
        weights: { "group-community": 1 },
        qualLevel: "pre",
      },
    ],
  },
  {
    q: "What kind of people genuinely fire you up?",
    subtitle: "Not who you think you should train — who actually excites you.",
    options: [
      {
        text: "Someone fighting a serious health challenge — illness, chronic pain, or recovery from something big",
        weights: { "cancer-recovery": 3, "chronic-pain": 3, "mental-health": 2, neurodivergent: 1 },
      },
      {
        text: "A high-achiever who wants to squeeze more performance, health, and energy out of their life",
        weights: { longevity: 3, corporate: 2, golf: 2, "martial-arts": 2, "trail-running": 2 },
      },
      {
        text: "Someone going through a major life transition — pregnancy, menopause, becoming a parent, a big life event",
        weights: { menopause: 3, "pre-postnatal": 3, "new-parent": 3, "wedding-prep": 2 },
      },
      {
        text: "People that mainstream fitness has completely failed — older adults, neurodivergent folks, total beginners who've never felt welcome",
        weights: { "active-ageing": 3, neurodivergent: 3, "group-community": 2, "shift-worker": 1 },
      },
    ],
  },
  {
    q: "Where do you feel most at home training clients?",
    options: [
      {
        text: "A proper gym — barbells, cables, full equipment, the real deal",
        weights: { longevity: 2, "martial-arts": 2, "teen-athlete": 2, "chronic-pain": 1, "cancer-recovery": 1 },
      },
      {
        text: "Outside — trails, parks, fresh air, movement in the real world",
        weights: { "trail-running": 3, "group-community": 2, "active-ageing": 1, "wedding-prep": 1 },
      },
      {
        text: "A private, home, or intimate one-to-one setting",
        weights: { menopause: 2, "new-parent": 2, neurodivergent: 2, "active-ageing": 2, "chronic-pain": 2 },
      },
      {
        text: "Wherever the work is — offices, online, community halls, wherever clients actually are",
        weights: { corporate: 3, "shift-worker": 2, "group-community": 1, "mental-health": 1 },
      },
    ],
  },
  {
    q: "Which of these could you spend an hour reading about right now?",
    subtitle: "Trust your gut on this one.",
    options: [
      {
        text: "Hormones, ageing science, and how the body changes across a lifetime",
        weights: { longevity: 3, menopause: 3, "active-ageing": 2, "pre-postnatal": 1 },
      },
      {
        text: "The psychology of behaviour change — what makes people actually follow through this time",
        weights: { "mental-health": 3, neurodivergent: 3, "wedding-prep": 2, "shift-worker": 1, "new-parent": 1 },
      },
      {
        text: "Biomechanics, movement quality, and why bodies move — or stop moving — the way they do",
        weights: { "chronic-pain": 3, golf: 2, "martial-arts": 2, equestrian: 3 },
      },
      {
        text: "Sport science — energy systems, periodisation, and what actually makes athletes better",
        weights: { "martial-arts": 3, "trail-running": 3, "teen-athlete": 3, golf: 1, equestrian: 1 },
      },
    ],
  },
  {
    q: "If you could fill your diary tomorrow with one type of client, who would it be?",
    options: [
      {
        text: "Professionals in their 40s and 50s who want to be healthier and more capable for decades to come",
        weights: { longevity: 4, menopause: 2, golf: 2, corporate: 2 },
      },
      {
        text: "Athletes — combat sport, trail running, golf, riding — who want specialist performance work, not generic gym training",
        weights: { "martial-arts": 4, "trail-running": 4, golf: 4, equestrian: 4, "teen-athlete": 2 },
      },
      {
        text: "People who've been let down by the health system and need someone who finally truly understands their situation",
        weights: { "cancer-recovery": 4, "chronic-pain": 4, "mental-health": 3, neurodivergent: 2 },
      },
      {
        text: "Beginners and communities who just need a consistent, welcoming place to move — no intimidation, no judgement",
        weights: { "group-community": 4, "active-ageing": 3, "shift-worker": 2, "mental-health": 1 },
      },
    ],
  },
  {
    q: "What does your own background give you that most PTs don't have?",
    options: [
      {
        text: "I understand what it's like to struggle — with health, your body, or your mental state",
        weights: { "mental-health": 3, "chronic-pain": 3, "cancer-recovery": 2, neurodivergent: 2 },
      },
      {
        text: "I've lived the sport or athlete lifestyle — I understand performance from the inside",
        weights: { "martial-arts": 3, "trail-running": 3, "teen-athlete": 2, equestrian: 2, golf: 2 },
      },
      {
        text: "I understand what professional life really looks like — desk jobs, shift patterns, no time, real pressure",
        weights: { corporate: 4, "shift-worker": 4, longevity: 1 },
      },
      {
        text: "I've been through a major life event — parenthood, menopause, pregnancy, or a significant physical or identity change",
        weights: { "pre-postnatal": 4, "new-parent": 4, menopause: 3, "wedding-prep": 2 },
      },
    ],
  },
  {
    q: "What moment would make you feel like your work truly mattered?",
    options: [
      {
        text: "Watching someone recover from illness, injury, or years of pain — and watching them get their life back",
        weights: { "cancer-recovery": 4, "chronic-pain": 3, "mental-health": 3, "active-ageing": 2 },
      },
      {
        text: "An athlete hitting a personal milestone — a performance they thought was physically impossible for them",
        weights: { "martial-arts": 3, "trail-running": 3, "teen-athlete": 4, golf: 2, equestrian: 2 },
      },
      {
        text: "A client saying they finally feel understood — that you got their body and their situation in a way nobody else ever has",
        weights: { neurodivergent: 4, menopause: 3, "pre-postnatal": 3, "shift-worker": 2, "new-parent": 2 },
      },
      {
        text: "Building a community where people genuinely show up for each other — not just for a session",
        weights: { "group-community": 4, "active-ageing": 3, "mental-health": 2, "teen-athlete": 1 },
      },
    ],
  },
  {
    q: "How do you want to structure your working life and income?",
    options: [
      {
        text: "Premium 1-to-1 sessions — fewer clients, higher rates, deep relationships that last years",
        weights: { longevity: 3, golf: 3, equestrian: 3, "cancer-recovery": 2, menopause: 2 },
      },
      {
        text: "Group sessions — energy in the room, scale, and a community that becomes its own marketing engine",
        weights: { "group-community": 4, "active-ageing": 3, "mental-health": 2, "trail-running": 1 },
      },
      {
        text: "Become the known specialist — so respected in one niche that people travel or pay premium specifically to find you",
        weights: { neurodivergent: 4, "cancer-recovery": 4, "pre-postnatal": 3, menopause: 2, equestrian: 2 },
      },
      {
        text: "A flexible mix — some in-person, some online, adapting to wherever clients actually live their lives",
        weights: { "shift-worker": 3, corporate: 3, "trail-running": 2, "new-parent": 2, "wedding-prep": 2 },
      },
    ],
  },
  {
    q: "What gap in the fitness industry genuinely angers you?",
    options: [
      {
        text: "PTs who treat humans like machines — ignoring mental health, emotions, and the full person in front of them",
        weights: { "mental-health": 4, neurodivergent: 3, "chronic-pain": 2, "new-parent": 2 },
      },
      {
        text: "An industry obsessed with aesthetics that completely ignores actual health, longevity, and quality of life",
        weights: { longevity: 4, "active-ageing": 3, "cancer-recovery": 3, menopause: 2 },
      },
      {
        text: "That mainstream fitness completely ignores anyone who isn't young, able-bodied, and already motivated",
        weights: { "active-ageing": 3, "chronic-pain": 3, neurodivergent: 3, "cancer-recovery": 3, "shift-worker": 2 },
      },
      {
        text: "That sport-specific athletes get terrible S&C guidance — or none at all — because everyone's too focused on aesthetics",
        weights: { "martial-arts": 4, "trail-running": 3, golf: 4, equestrian: 4 },
      },
    ],
  },
  {
    q: "Complete this: 'I want to be known as the PT who...'",
    options: [
      {
        text: "...got results nobody else could — because I understood the medical and physiological picture better than anyone else in the room",
        weights: { "cancer-recovery": 3, "chronic-pain": 3, menopause: 3, neurodivergent: 3 },
      },
      {
        text: "...took athletes to places they'd never reach by just training their sport — and made them bulletproof in the process",
        weights: { "martial-arts": 4, "trail-running": 3, golf: 3, equestrian: 4, "teen-athlete": 3 },
      },
      {
        text: "...made health and movement genuinely accessible and enjoyable for people who thought it simply wasn't for them",
        weights: { "active-ageing": 4, "shift-worker": 3, "group-community": 2, "new-parent": 2 },
      },
      {
        text: "...built a reputation so strong and a client experience so exceptional that I never needed to cold-sell again",
        weights: { longevity: 3, corporate: 3, golf: 2, equestrian: 2, "wedding-prep": 3 },
      },
    ],
  },
];

// ── Qualification badge helper ────────────────────────────────────────────────

function getQualBadge(nicheQual: "L2" | "L3" | "L3+CPD", userLevel: QualLevel | null) {
  if (nicheQual === "L2") {
    return { label: "Level 2+", colour: "green" };
  }
  if (nicheQual === "L3") {
    if (userLevel === "L3" || userLevel === "L3+") return { label: "Qualified ✓", colour: "green" };
    return { label: "Needs Level 3", colour: "amber" };
  }
  if (nicheQual === "L3+CPD") {
    if (userLevel === "L3+") return { label: "CPD Required", colour: "amber" };
    if (userLevel === "L3") return { label: "Needs CPD", colour: "amber" };
    return { label: "Level 3 + CPD", colour: "red" };
  }
  return { label: "Level 3+", colour: "amber" };
}

const BADGE_COLOURS: Record<string, string> = {
  green: "bg-emerald-50 text-emerald-700 border-emerald-200",
  amber: "bg-amber-50 text-amber-700 border-amber-200",
  red: "bg-rose-50 text-rose-700 border-rose-200",
};

// ── Main component ────────────────────────────────────────────────────────────

export default function NicheFinder() {
  const [phase, setPhase] = useState<"intro" | "quiz" | "processing" | "results">("intro");
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [qualLevel, setQualLevel] = useState<QualLevel | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [chosen, setChosen] = useState<number | null>(null);

  function handleAnswer(option: QuestionOption) {
    setChosen(null);
    if (option.qualLevel) setQualLevel(option.qualLevel);
    setScores((prev) => {
      const next = { ...prev };
      for (const [id, w] of Object.entries(option.weights)) {
        next[id] = (next[id] ?? 0) + (w ?? 0);
      }
      return next;
    });

    if (step < QUESTIONS.length - 1) {
      setTimeout(() => setStep((s) => s + 1), 200);
    } else {
      setPhase("processing");
      setTimeout(() => {
        setPhase("results");
        setExpanded(null);
      }, 2800);
    }
  }

  function reset() {
    setPhase("intro");
    setStep(0);
    setScores({});
    setQualLevel(null);
    setExpanded(null);
    setChosen(null);
  }

  const topNiches: Niche[] = Object.entries(scores)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3)
    .map(([id]) => NICHES.find((n) => n.id === id)!)
    .filter(Boolean);

  return (
    <section className="py-20 md:py-28 bg-zinc-50">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <AnimatePresence mode="wait">
          {phase === "intro" && (
            <IntroScreen key="intro" onStart={() => setPhase("quiz")} />
          )}
          {phase === "quiz" && (
            <QuizScreen
              key={`quiz-${step}`}
              step={step}
              question={QUESTIONS[step]}
              total={QUESTIONS.length}
              chosen={chosen}
              onAnswer={(option, idx) => {
                setChosen(idx);
                setTimeout(() => handleAnswer(option), 320);
              }}
            />
          )}
          {phase === "processing" && <ProcessingScreen key="processing" />}
          {phase === "results" && (
            <ResultsScreen
              key="results"
              niches={topNiches}
              qualLevel={qualLevel}
              onRestart={reset}
              expanded={expanded}
              onExpand={setExpanded}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

// ── IntroScreen ───────────────────────────────────────────────────────────────

function IntroScreen({ onStart }: { onStart: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="mb-6">
        <span className="text-[#CE1A19] text-xs font-black tracking-widest uppercase">
          18 Niches · 10 Questions
        </span>
      </div>

      <h2 className="text-3xl md:text-5xl font-black text-zinc-950 uppercase tracking-tight leading-none mb-6">
        Most PTs pick their niche by accident.
        <span className="block text-[#CE1A19] mt-2">This tool helps you pick it on purpose.</span>
      </h2>

      <div className="w-14 h-[3px] bg-[#CE1A19] mb-8" />

      <div className="grid md:grid-cols-2 gap-4 mb-10">
        {[
          {
            heading: "Beyond the obvious",
            body: "There are fitness niches most PTs don't even know exist — and some of them are the best-paying, most referral-driven, and most personally fulfilling opportunities in the industry.",
          },
          {
            heading: "Qualification-aware",
            body: "We account for what your current qualifications actually unlock — Level 2 and Level 3 open different doors, and we'll show you exactly what to aim for next.",
          },
          {
            heading: "Personalised to you",
            body: "10 questions about who you are, what lights you up, and how you want to work. Your answers surface the 3 niches that fit your personality, background, and goals best.",
          },
          {
            heading: "Real market intelligence",
            body: "Each result includes what the opportunity actually looks like, who your referral partners are, and what your first concrete steps should be.",
          },
        ].map((item) => (
          <div
            key={item.heading}
            className="rounded-xl border border-zinc-200 bg-white p-5"
          >
            <p className="text-xs font-black uppercase tracking-wider text-[#CE1A19] mb-2">{item.heading}</p>
            <p className="text-sm text-zinc-600 leading-relaxed">{item.body}</p>
          </div>
        ))}
      </div>

      <button
        onClick={onStart}
        className="group inline-flex items-center gap-3 bg-[#CE1A19] text-white px-8 py-4 rounded-xl font-black text-sm uppercase tracking-widest hover:bg-[#b01716] transition-colors duration-200 shadow-[0_4px_20px_rgba(206,26,25,0.3)]"
      >
        Start the quiz
        <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
      </button>
    </motion.div>
  );
}

// ── QuizScreen ────────────────────────────────────────────────────────────────

function QuizScreen({
  step,
  question,
  total,
  chosen,
  onAnswer,
}: {
  step: number;
  question: Question;
  total: number;
  chosen: number | null;
  onAnswer: (option: QuestionOption, idx: number) => void;
}) {
  const progress = ((step) / total) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -24 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      {/* Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-black uppercase tracking-widest text-[#CE1A19]">
            Question {step + 1} of {total}
          </span>
          <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
            {Math.round(progress)}% complete
          </span>
        </div>
        <div className="h-1 w-full bg-zinc-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-[#CE1A19] rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="mb-7">
        <h2 className="text-xl md:text-2xl font-black text-zinc-950 leading-snug mb-2">
          {question.q}
        </h2>
        {question.subtitle && (
          <p className="text-sm text-zinc-500 leading-relaxed">{question.subtitle}</p>
        )}
      </div>

      {/* Options */}
      <div className="space-y-3">
        {question.options.map((opt, idx) => (
          <button
            key={idx}
            onClick={() => onAnswer(opt, idx)}
            disabled={chosen !== null}
            className={`w-full text-left p-5 rounded-xl border transition-all duration-200 font-semibold text-sm leading-snug focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CE1A19] focus-visible:ring-offset-2 disabled:cursor-default ${
              chosen === idx
                ? "border-[#CE1A19] bg-[#CE1A19] text-white shadow-[0_4px_16px_rgba(206,26,25,0.25)]"
                : chosen !== null
                ? "border-zinc-200 bg-white text-zinc-400"
                : "border-zinc-200 bg-white text-zinc-800 hover:border-[#CE1A19] hover:text-zinc-950 hover:shadow-sm"
            }`}
          >
            {opt.text}
          </button>
        ))}
      </div>
    </motion.div>
  );
}

// ── ProcessingScreen ──────────────────────────────────────────────────────────

function ProcessingScreen() {
  const [msgIdx, setMsgIdx] = useState(0);
  const MSGS = [
    "Analysing your answers...",
    "Matching against 18 fitness niches...",
    "Weighing your background and goals...",
    "Surfacing your best opportunities...",
  ];

  useEffect(() => {
    const id = setInterval(() => setMsgIdx((i) => (i + 1) % MSGS.length), 700);
    return () => clearInterval(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center py-24 text-center"
    >
      <div className="w-14 h-14 rounded-full border-4 border-zinc-200 border-t-[#CE1A19] animate-spin mb-8" />
      <AnimatePresence mode="wait">
        <motion.p
          key={msgIdx}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
          className="text-base font-semibold text-zinc-600"
        >
          {MSGS[msgIdx]}
        </motion.p>
      </AnimatePresence>
    </motion.div>
  );
}

// ── ResultsScreen ─────────────────────────────────────────────────────────────

function ResultsScreen({
  niches,
  qualLevel,
  onRestart,
  expanded,
  onExpand,
}: {
  niches: Niche[];
  qualLevel: QualLevel | null;
  onRestart: () => void;
  expanded: string | null;
  onExpand: (id: string | null) => void;
}) {
  const [top, ...rest] = niches;
  if (!top) return null;

  const RANKS = ["01", "02", "03"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Header */}
      <div className="mb-10">
        <p className="text-[#CE1A19] text-xs font-black tracking-widest uppercase mb-4">
          Your Results
        </p>
        <h2 className="text-3xl md:text-5xl font-black text-zinc-950 uppercase tracking-tight leading-none mb-4">
          Your Top 3
          <span className="block text-[#CE1A19]">Fitness Niches</span>
        </h2>
        <div className="w-14 h-[3px] bg-[#CE1A19] mb-5" />
        <p className="text-zinc-600 text-base leading-relaxed max-w-xl">
          These three niches match your answers most closely. Click any card to see the full breakdown — including the market intelligence and first steps most PTs never discover.
        </p>
      </div>

      {/* Cards */}
      <div className="space-y-4">
        {niches.map((niche, i) => (
          <NicheCard
            key={niche.id}
            niche={niche}
            rank={RANKS[i]}
            qualLevel={qualLevel}
            isTop={i === 0}
            isExpanded={expanded === niche.id}
            onToggle={() => onExpand(expanded === niche.id ? null : niche.id)}
            delay={i * 0.1}
          />
        ))}
      </div>

      {/* Footer CTA */}
      <div className="mt-10 pt-8 border-t border-zinc-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <p className="text-sm font-black text-zinc-950 mb-1">Want to get qualified for your niche?</p>
          <p className="text-sm text-zinc-500">Our Level 2, Level 3, and CPD courses are all available now.</p>
        </div>
        <div className="flex gap-3 flex-wrap">
          <a
            href="/qualifications"
            className="inline-flex items-center gap-2 bg-[#CE1A19] text-white px-5 py-3 rounded-lg font-black text-xs uppercase tracking-widest hover:bg-[#b01716] transition-colors duration-200"
          >
            View Qualifications
            <ArrowRightIcon className="w-3.5 h-3.5" />
          </a>
          <button
            onClick={onRestart}
            className="inline-flex items-center gap-2 bg-white border border-zinc-200 text-zinc-700 px-5 py-3 rounded-lg font-black text-xs uppercase tracking-widest hover:border-zinc-400 transition-colors duration-200"
          >
            Retake Quiz
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ── NicheCard ─────────────────────────────────────────────────────────────────

function NicheCard({
  niche,
  rank,
  qualLevel,
  isTop,
  isExpanded,
  onToggle,
  delay,
}: {
  niche: Niche;
  rank: string;
  qualLevel: QualLevel | null;
  isTop: boolean;
  isExpanded: boolean;
  onToggle: () => void;
  delay: number;
}) {
  const badge = getQualBadge(niche.qualRequired, qualLevel);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={`rounded-2xl overflow-hidden border ${
        isTop
          ? "border-[#CE1A19] shadow-[0_4px_24px_rgba(206,26,25,0.12)]"
          : "border-zinc-200 shadow-[0_2px_8px_rgba(0,0,0,0.05)]"
      } bg-white`}
    >
      {/* Top bar */}
      <div className={`h-[3px] w-full ${isTop ? "bg-[#CE1A19]" : "bg-zinc-200"}`} />

      {/* Card header — always visible */}
      <button
        onClick={onToggle}
        className="w-full text-left p-6 md:p-7 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#CE1A19]"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-3 flex-wrap">
              <span
                className={`text-3xl font-black leading-none ${
                  isTop ? "text-[#CE1A19]" : "text-zinc-200"
                }`}
              >
                {rank}
              </span>
              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 border border-zinc-200 rounded-full px-2.5 py-1">
                {niche.category}
              </span>
              <span
                className={`text-[10px] font-black uppercase tracking-widest border rounded-full px-2.5 py-1 ${
                  BADGE_COLOURS[badge.colour]
                }`}
              >
                {badge.label}
              </span>
            </div>
            <h3 className="text-lg md:text-xl font-black text-zinc-950 leading-tight mb-2">
              {niche.name}
            </h3>
            <p className="text-sm text-zinc-500 leading-relaxed italic">{niche.tagline}</p>
          </div>
          <div
            className={`w-9 h-9 rounded-full border flex items-center justify-center shrink-0 mt-1 transition-all duration-200 ${
              isExpanded
                ? "bg-[#CE1A19] border-[#CE1A19]"
                : "border-zinc-200 bg-white"
            }`}
          >
            <motion.span
              animate={{ rotate: isExpanded ? 90 : 0 }}
              transition={{ duration: 0.2 }}
              className="block"
            >
              <ArrowRightIcon
                className={`w-4 h-4 transition-colors duration-200 ${
                  isExpanded ? "text-white" : "text-zinc-400"
                }`}
              />
            </motion.span>
          </div>
        </div>

        {/* Hook — always visible */}
        <div className={`mt-4 pt-4 border-t ${isTop ? "border-[#CE1A19]/20" : "border-zinc-100"}`}>
          <p className="text-sm font-semibold text-zinc-700 leading-relaxed">{niche.hook}</p>
        </div>
      </button>

      {/* Expanded content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-6 md:px-7 pb-7 space-y-6 border-t border-zinc-100">

              {/* Description */}
              <div className="pt-6">
                <p className="text-xs font-black uppercase tracking-wider text-zinc-400 mb-3">The Opportunity</p>
                <p className="text-sm text-zinc-600 leading-relaxed">{niche.description}</p>
              </div>

              {/* Secret Insight */}
              <div className="rounded-xl bg-zinc-950 p-6">
                <p className="text-[10px] font-black uppercase tracking-widest text-[#CE1A19] mb-3">
                  The Secret Insight
                </p>
                <p className="text-sm text-white/80 leading-relaxed">{niche.secretInsight}</p>
              </div>

              {/* Market Opportunity */}
              <div className="rounded-xl bg-zinc-50 border border-zinc-200 p-5">
                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-3">
                  Market Intelligence
                </p>
                <p className="text-sm text-zinc-700 leading-relaxed">{niche.marketOpportunity}</p>
              </div>

              {/* CPD Note */}
              {niche.cpdNote && (
                <div className="flex gap-3 items-start rounded-xl border border-amber-200 bg-amber-50 p-4">
                  <span className="text-amber-500 text-base mt-0.5 shrink-0">⚡</span>
                  <p className="text-xs text-amber-800 leading-relaxed font-medium">{niche.cpdNote}</p>
                </div>
              )}

              {/* First Steps */}
              <div>
                <p className="text-xs font-black uppercase tracking-wider text-zinc-400 mb-4">Your First Steps</p>
                <ol className="space-y-3">
                  {niche.firstSteps.map((step, i) => (
                    <li key={i} className="flex gap-3 items-start">
                      <span className="w-5 h-5 rounded-full bg-[#CE1A19] text-white text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <p className="text-sm text-zinc-700 leading-relaxed">{step}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
