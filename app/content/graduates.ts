export type Graduate = {
  slug: string;
  name: string;
  qualification: string;
  year: number;
  location: string;
  role: string;
  quote: string;
  image: string;
  story: string[];
};

// ── Hero ──────────────────────────────────────────────────────────────────────

export const graduatesHero = {
  label: "Our Graduates",
  title: "Where They Are Now",
  subtitle: "Real people who started exactly where you are. Here is what happened next.",
  image: "/images/SANDRINE-AND-PARIS-3-20220124-IFE-TGGNCC035.jpg",
} as const;

// ── Intro ─────────────────────────────────────────────────────────────────────

export const graduatesIntro = {
  label: "The Results",
  heading: "They Were Where You Are.",
  body: "Every one of our graduates started with a question — can I actually do this? Here is the answer they found.",
} as const;

// ── Stats ─────────────────────────────────────────────────────────────────────

export const graduatesStats = [
  { value: "100%", label: "Pass Rate" },
  { value: "1:1", label: "Tuition Format" },
  { value: "5★", label: "Google Rating" },
] as const;

// ── Featured testimonial ──────────────────────────────────────────────────────

export const graduatesFeaturedTestimonial = {
  label: "From Our Graduates",
  quote: "I went from knowing nothing about fitness to running my own PT business within a year. The one-to-one format made all the difference. I actually felt prepared on day one.",
  name: "Jamie T.",
  role: "2024 Graduate · Self-Employed Personal Trainer",
} as const;

// ── Graduate stories ──────────────────────────────────────────────────────────

export const graduates: Graduate[] = [
  {
    slug: "jamie-t",
    name: "Jamie T.",
    qualification: "Combined Level 2 & 3 Diploma",
    year: 2024,
    location: "Norwich",
    role: "Self-Employed Personal Trainer",
    quote: "I went from knowing nothing about fitness to running my own PT business within a year. The one-to-one format made all the difference.",
    image: "/images/20221115-IFE-CF_005.JPG",
    story: [
      "Before coming to IFE, Jamie had been a member of a gym for three years but had never considered coaching as a career. A redundancy gave him the push to look at something different — and a conversation with a friend who had qualified as a PT put the idea in his head.",
      "He found IFE through a Google search and was drawn in by the one-to-one format. 'I did not want to be in a room with fifteen other people and hope the tutor got round to me,' he says. 'I knew if I was going to do this properly I needed actual attention.'",
      "The Combined Level 2 & 3 Diploma took around seven months to complete alongside some part-time work. Jamie says the hardest part was the anatomy and physiology theory — but also the most valuable. 'By the time I was doing my practical assessments I actually understood why I was programming things a certain way. That is not something you get from a rushed group course.'",
      "Within six weeks of qualifying, Jamie had his first three paying clients. He now runs a full schedule from Complete Fitness in Norwich and has started taking online clients on top of his in-person work. 'I replaced my old salary within the first year. I did not expect that — but looking back, I think the quality of the qualification was the reason clients trusted me early on.'",
      "His advice to anyone considering it: do not wait for the perfect moment. 'You will find a reason to delay if you look for one. The only difference between where I was two years ago and where I am now is that I stopped looking for reasons and just started.'",
    ],
  },
  {
    slug: "sophie-c",
    name: "Sophie C.",
    qualification: "Level 3 Personal Training",
    year: 2024,
    location: "Norwich",
    role: "Personal Trainer, Complete Fitness",
    quote: "Harry and Paris genuinely care about your progress. I never felt like just another student on a course — they adjusted to exactly where I was.",
    image: "/images/20221115-IFE-CF_015.JPG",
    story: [
      "Sophie had always worked in fitness — first as a receptionist at a leisure centre, then as a gym floor assistant. She knew the environment, understood the clients, and had watched enough PTs work to know what good coaching looked like. What she lacked was the formal qualification to do it herself.",
      "She chose the Level 3 Personal Training route with IFE after a colleague recommended them. The deciding factor was simple: 'I had heard horror stories about large group courses where people passed without really knowing what they were doing. I did not want to be that person standing in front of a client without confidence.'",
      "The one-to-one format suited her. Paris was her primary tutor and Sophie describes the sessions as genuinely challenging in the best way. 'She did not let me get away with surface-level answers. If I said I would cue something a certain way, she would ask me why. That pressure made me actually learn the material rather than just memorise it.'",
      "Sophie now works full-time as a PT at Complete Fitness and has built a client base of regulars who have stayed with her from her first month. 'I think people can tell when a coach knows what they are talking about and when they are just going through the motions. The training I received meant I was never the latter.'",
      "She still keeps in touch with Harry and Paris, and has recommended IFE to two friends who are now enrolled. 'That says everything, really. You only recommend something when you believe in it.'",
    ],
  },
  {
    slug: "marcus-r",
    name: "Marcus R.",
    qualification: "Combined Level 2 & 3 Diploma",
    year: 2023,
    location: "Norfolk",
    role: "Gym Manager & Personal Trainer",
    quote: "The course prepared me for the reality of the job, not just the theory. I felt confident on day one with my first client — that does not happen by accident.",
    image: "/images/20221115-IFE-CF_025.JPG",
    story: [
      "Marcus came to fitness coaching from a background in sports. He had played semi-professional football for several years and spent a lot of time in gym environments — but always as an athlete, never as a coach. When injury cut short his playing career at 28, he needed to figure out what came next.",
      "He considered a few options before landing on personal training. 'It was the obvious move in hindsight,' he says. 'I understood training, I understood what motivated people, and I had spent years around coaches. I just needed to formalise that knowledge into something I could build a career from.'",
      "The Combined Level 2 & 3 Diploma at IFE gave him both qualifications in a single programme. What surprised him was how much the one-to-one format accelerated his learning. 'In sport you are used to having a coach who actually watches you and gives you specific feedback. That is exactly how IFE works. It is not passive — you are being coached on how to coach.'",
      "Marcus qualified in 2023 and within six months had moved into a combined PT and management role at a gym in Norfolk. 'I think what set me apart in the interview was that I could speak to both the practical side and the business side. The IFE training was thorough enough that I felt ready for the real thing — not just the assessment.'",
      "He trains a mix of clients including athletes returning from injury, which feels like a full circle from his own experience. 'I know what it is like to be the person on the other side of that relationship. That is probably the most useful thing I bring to those sessions.'",
    ],
  },
  {
    slug: "lucy-f",
    name: "Lucy F.",
    qualification: "Level 2 Gym Instructor Certificate",
    year: 2023,
    location: "Norwich",
    role: "Gym Instructor",
    quote: "I was nervous about starting but the support never stopped — not even after I qualified. They are still someone I can reach out to when I need advice.",
    image: "/images/20221115-IFE-CF_035.JPG",
    story: [
      "Lucy was 24 when she enrolled with IFE and had been working in hospitality since leaving school. She had trained consistently for two years and people around her kept telling her she should work in fitness — but she had never seriously considered it because she did not know where to start.",
      "'I was intimidated by the whole process,' she admits. 'I did not have a fitness background professionally. I just loved training. I was not sure if that was enough to build a career on.'",
      "She chose the Level 2 Gym Instructor Certificate as a starting point — a way to test whether coaching was the right direction before committing to a longer programme. What she found was that the one-to-one structure made everything feel manageable. 'Harry explained things in a way that made me feel like I could do this. Not just the material, but the career. He took it seriously so I took it seriously.'",
      "Lucy qualified in early 2023 and took up a gym instructor position shortly after. The transition from hospitality to fitness has been everything she hoped for. 'I go to work and I genuinely look forward to it. That was not something I experienced before.'",
      "She is currently considering returning to IFE to complete the Level 3 qualification. 'I feel ready for the next step now. And I know the process — so there is nothing to be nervous about this time.'",
    ],
  },
  {
    slug: "daniel-w",
    name: "Daniel W.",
    qualification: "Combined Level 2 & 3 Diploma",
    year: 2024,
    location: "Norwich",
    role: "Online PT & In-Person Coach",
    quote: "The flexibility was what sold it for me. I kept my full-time job while qualifying, and now I have replaced that income entirely with PT work.",
    image: "/images/20221115-IFE-CF_045.JPG",
    story: [
      "Daniel was working full-time in logistics management when he decided to start the process of qualifying as a PT. He had been thinking about the switch for two years but had always found a reason to put it off — the timing, the cost, the risk of giving up a stable income.",
      "The one-to-one format at IFE was what finally made it realistic. 'I could not take time off work to sit in a classroom. The flexibility to schedule sessions around my existing commitments was the difference between doing it and not doing it.'",
      "He completed the Combined Level 2 & 3 Diploma over eight months while continuing to work full-time. The process was demanding but manageable. 'There were a few late nights with the written work, but Harry was always available to answer questions. I never felt stuck on my own with it.'",
      "Daniel began taking clients in the evenings and on weekends while still employed. By the time he qualified, he had a waiting list. 'I had built enough of a client base that the financial risk felt manageable. I handed in my notice the month after I got my certificate.'",
      "He now operates a hybrid model — in-person sessions at a gym in Norwich and an online coaching service for clients who cannot train face to face. The income has exceeded what he earned in logistics. 'The irony is that I spent two years worrying about financial risk, and the risk turned out to be staying where I was.'",
    ],
  },
  {
    slug: "chloe-p",
    name: "Chloe P.",
    qualification: "Level 3 Personal Training",
    year: 2023,
    location: "Norfolk",
    role: "Personal Trainer",
    quote: "Best decision I ever made. Fitness was always a passion but I never thought I could turn it into a career. Now I cannot imagine doing anything else.",
    image: "/images/20221115-IFE-CF_055.JPG",
    story: [
      "Chloe spent her early twenties convinced that a career in fitness was not a realistic option. She trained six days a week, read everything she could about programming and nutrition, and helped friends with their training informally — but turning that into a profession felt like something other people did, not her.",
      "'I think I underestimated myself for a long time,' she says. 'I assumed you needed some kind of special background or natural authority to be a good coach. It took someone pointing out that I was already doing it for free to make me think seriously about doing it properly.'",
      "She enrolled in the Level 3 Personal Training qualification at IFE after a recommendation from someone in her training group. The format matched how she learns: focused, one-to-one, with real feedback rather than generic instructions. 'Paris pushed me in the assessments in a way that was uncomfortable at the time but made me better. I came out of it knowing I could handle a real client in a real session.'",
      "Chloe qualified in 2023 and built her client base quickly, largely through word of mouth from people who had seen her train. 'My existing network was my first marketing strategy. People who had watched me train for years were curious about training with me — and that initial trust was worth more than any advertising.'",
      "She now trains a full schedule and has a waiting list for new clients. Looking back, her only regret is not starting sooner. 'The version of me that thought this was not realistic had just not seen enough of the evidence yet. The evidence was always there — I just was not paying attention to it.'",
    ],
  },
];

export function getGraduateBySlug(slug: string): Graduate | undefined {
  return graduates.find((g) => g.slug === slug);
}
