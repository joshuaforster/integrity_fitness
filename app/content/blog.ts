export type BlogAuthor = {
  name: string;
  role: string;
  avatar?: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  publishDate: string;
  category: string;
  excerpt: string;
  image: string;
  body: string[];
  author: BlogAuthor;
};

const clean = (arr: string[]) => arr.map((s) => s.replace(/—/g, "-"));

const HARRY: BlogAuthor = {
  name: "Harry",
  role: "Founder & Head Coach",
  avatar: "https://pub-6e6bb53af6c34756a861d2c0a8259e84.r2.dev/TGG%20Norwich/HARRY-GYM-FLOOR-20220124-IFE-TGGNCC004.jpg",
};

export const allBlogPosts: BlogPost[] = [
  {
    slug: "stop-undercharging-pt-pricing",
    title: "Stop Undercharging: The Real Maths Behind PT Pricing",
    date: "20 Jun 2026",
    publishDate: "2026-06-20",
    category: "Business",
    excerpt: "Charging £10 a session isn't being modest. Once you work out the real hourly rate, it's closer to £5. Here's why your price matters more than you think.",
    image: "https://pub-6e6bb53af6c34756a861d2c0a8259e84.r2.dev/Duncan/20221115-IFE-CF_054.JPG",
    author: HARRY,
    body: clean([
      "<p>There is a race to the bottom happening in gyms all over the country, and it is new PTs who are losing it. I have heard of people charging £10 a session. Ten pounds. In a job where you are personally responsible for someone else's health, their movement, their safety - for an hour of your time, your preparation, and often your follow-up messages at midnight.</p>",
      "<h2>The maths nobody shows you on the PT course</h2><p>Let us say you charge £40 a session. One client, once a week, for a month. That's £160. Sounds reasonable, right? Now take out tax, national insurance, gym rent or commission, and the time you spent writing that programme, checking their food diary, and answering their WhatsApp messages before bed. You are not earning £40 an hour. You are earning £40 for a week's worth of contact. That is a very different number.</p><p>Now imagine you charge £10. Suddenly you need a full 30-session week just to scrape minimum wage - and you have got more responsibility than someone stacking shelves at Tesco. No disrespect to anyone doing that job. But a PT is taking someone's health into their hands. The rate has to reflect that.</p>",
      "<h2>Why new PTs undercut, and why it backfires</h2><p>It is hard watching another PT on the gym floor fill their diary faster than you. Especially when you have the same qualification on paper. The temptation is to offer a lower rate to compete. But here is what actually happens: clients who pay £10 care about it £10 worth. Clients who pay £40 show up. They do the homework. They take it seriously - because they have invested seriously. The price signals the value. Charge accordingly and you will attract people who are genuinely committed to the process.</p>",
      "<h2>What a fair rate actually looks like</h2><p>Do your market research. Look at what PTs in your area are charging. Do not anchor on the lowest number you find - anchor on the average, and then consider what you offer. You have just qualified. You are taking someone's health into your hands. Own that. The experienced PTs who built long careers did not do it by undercutting everyone in the building. They did it by delivering quality and holding their value.</p><p>One final thing: if you are working unsociable hours - early mornings, late evenings, weekends - charge more for those slots. In any other industry, unsocial hours come with a premium. PT is no different. You are not obliged to sacrifice your evenings for the same rate as a Tuesday lunchtime. Value your time, and your clients will too.</p>"
    ]),
  },
  {
    slug: "pt-hours-reality-check",
    title: "PT Hours: The Reality Check Every New Trainer Needs",
    date: "21 Jun 2026",
    publishDate: "2026-06-21",
    category: "Career",
    excerpt: "People go into personal training thinking it is a nine-to-five. It is not. Here is what a realistic week actually looks like.",
    image: "https://pub-6e6bb53af6c34756a861d2c0a8259e84.r2.dev/Aines%20L3%20summative/20230329-IFE-CF_005.JPG",
    author: HARRY,
    body: clean([
      "<p>When people picture a personal trainer's day, they tend to imagine something fairly relaxed. A few sessions in the morning, a couple in the afternoon, finish by five. In reality, the first year of being a PT often looks closer to 14-hour days, 40 to 60 sessions a week during the busy periods, and an inbox that does not switch off when the gym closes.</p>",
      "<h2>Why the schedule looks nothing like a normal job</h2><p>Your clients live normal lives. They go to work at nine and leave at five. That means they want to train before seven in the morning or after six in the evening. Your busiest windows are the exact hours that most people would call anti-social. Early morning blocks, post-work rushes, weekend slots - these fill first. The middle of the day can be quiet, particularly when you are starting out and do not yet have the retired clients or shift workers who train at lunchtime.</p><p>The sessions themselves are just the visible part of the job. Behind each hour on the gym floor there is programme writing, nutrition check-ins, goal reviews, and the messages that come in at odd hours. You are not earning your rate for one hour. You are earning it for the whole week of contact around that hour.</p>",
      "<h2>How experienced PTs manage it</h2><p>The PTs who build sustainable careers learn to structure their week rather than just react to demand. That means deciding which hours you will and will not work, and sticking to it. It means having a proper cancellation policy - a client who cancels last-minute without notice should pay for that slot, the same as they would at a dentist or hair appointment. If you let it slide once or twice, people learn that they can, and the pattern repeats.</p><p>It also means thinking about your premium slots. If someone wants you at eight on a Saturday morning or nine on a Thursday night, charge more. That time costs you something. You should be compensated for it.</p>",
      "<h2>The harder truth about the first year</h2><p>The PTs who get through the early grind and come out the other side with a full diary are usually the ones who accepted that it was going to be hard before it got easier. Fourteen-hour days are not the long-term plan, but they are often part of the short-term reality. The ones who struggle most are the ones who expected a nine-to-five and were not prepared for anything different. Go in with your eyes open, set some boundaries around your time, and understand that what you build in that first difficult year creates the career you actually want.</p>"
    ]),
  },
  {
    slug: "where-to-start-as-a-new-pt",
    title: "Where to Start as a New PT: Why Footfall Beats Everything Else",
    date: "22 Jun 2026",
    publishDate: "2026-06-22",
    category: "Career",
    excerpt: "The most common mistake new PTs make is choosing a quiet gym. Here's why starting somewhere with thousands of members changes everything.",
    image: "https://pub-6e6bb53af6c34756a861d2c0a8259e84.r2.dev/TGG%20Norwich/HARRY-GYM-FLOOR-6-20220124-IFE-TGGNCC022.jpg",
    author: HARRY,
    body: clean([
      "<p>When you have just qualified and you are deciding where to work, it is easy to be drawn to a smaller, nicer gym. Better equipment, a quieter atmosphere, perhaps a more premium feel. But if you are a brand new PT with no client base, what you actually need is a building full of potential clients - and that means footfall.</p>",
      "<h2>Why volume matters more than prestige at the start</h2><p>A budget gym with 5,000 members is not glamorous. But it puts you in front of more people every single day than a boutique studio with 200. When you are unknown and unproven, visibility is everything. The more people who see you working, see you being friendly and approachable on the gym floor, see that you actually know what you are doing - the faster you build a reputation and a diary.</p><p>This is not about selling yourself aggressively. It is simply about being present in an environment where there are enough people that conversations happen naturally. Charlie, a PT in Norwich who started training people from a garden gym and worked his way up through every kind of facility, put it simply: go somewhere busy. You can always move somewhere more premium once you have the client base to take with you.</p>",
      "<h2>What to do once you are in the building</h2><p>Being visible is one thing. Being approachable is another. Marcin, who went from running a wrestling school to building a full PT diary at The Gym Group, set himself a target of two or three conversations a day - not sales pitches, just genuine conversations about training. What someone was working on, how a movement felt, what they were trying to achieve. Over time, those conversations become relationships, and relationships become clients.</p><p>The goal is not to be the PT who hands out business cards or pesters people on the gym floor. It is to be the PT who people already feel they know when they decide they want some help. That trust is built over weeks and months of simply being present and human.</p>",
      "<h2>One thing new PTs almost always get wrong</h2><p>They stay out of the way. They worry about being annoying, so they keep to themselves, train on their own, and wait for enquiries to come to them. The problem is that clients do not fall out of the ceiling. In a gym with 5,000 members, the PT who gets a full diary fastest is the one who is social - not pushy, just genuinely engaged with the people around them. Show up. Be visible. Have conversations. The rest follows.</p>"
    ]),
  },
  {
    slug: "your-clients-wont-be-who-you-expect",
    title: "Your Clients Won't Be Who You Expect",
    date: "03 Jul 2026",
    publishDate: "2026-07-03",
    category: "Coaching",
    excerpt: "Most new PTs picture working with young, motivated gym-goers. The reality is usually very different.",
    image: "/images/blog-placeholder.jpg",
    author: HARRY,
    body: clean([
      "<p>Before you start working as a PT, you probably have a picture in your head of who your clients will be. Young people wanting to get in shape, perhaps. People who are already motivated, who show up ready to go and just need someone to point them in the right direction. The reality is usually something else entirely - and the sooner you make peace with that, the better the PT you will become.</p>",
      "<h2>The demographic almost nobody predicts</h2><p>Charlie from Wade Fitness expected his clients to look like him - young, sporty, training for performance. When he actually built his diary, roughly half his clients turned out to be women aged 40 to 60. Not the demographic he had imagined, but as it turned out, one of the best he could have asked for. Similarly, Marcin found that about 80 per cent of his clients were women. Both PTs said the same thing: they were surprised at first, and then they were grateful.</p><p>The people who most reliably show up, do the work, follow the programme, and come back week after week tend not to be the 22-year-old who already loves the gym. They tend to be people who have a real reason to change something, who have perhaps struggled with their health or their confidence, and who genuinely trust you to help them. That trust is valuable. Do not take it for granted.</p>",
      "<h2>Why women are often the easiest clients to work with</h2><p>This is something that comes up repeatedly among experienced PTs, and it is worth saying plainly. Women tend to come to sessions with less ego attached to the process. They are more likely to ask questions, admit when something does not feel right, and actually follow the advice they are given. Men - and this is a generalisation, but a useful one - often come in thinking they should already know how to do this. They have spent years watching football or going to the gym and have formed strong opinions about what training should look like, even when those opinions are working against them.</p><p>Marcin described it well: it is like expecting to drive a car before you have had a single lesson, but being too proud to admit you need one. The ego gets in the way of the learning. Women tend not to have that problem to the same degree. They ask better questions, take on coaching more readily, and often make faster progress as a result.</p>",
      "<h2>What this means for how you approach your work</h2><p>Do not go into this job with a fixed picture of who your ideal client is. The people who will genuinely benefit from your help, who will refer their friends, who will stick with you for years - they may look nothing like what you imagined. Stay open. Be equally prepared to work with a 55-year-old woman managing a knee replacement as you are to work with a 25-year-old who wants to add 10 kilos to their deadlift. The diversity of your client base is one of the best parts of this job, if you let it be.</p>"
    ]),
  },
  {
    slug: "the-appearance-myth",
    title: "The Appearance Myth: Why Your Six-Pack Won't Build Your Business",
    date: "17 Jul 2026",
    publishDate: "2026-07-17",
    category: "Business",
    excerpt: "The fitness industry tells you that looking the part is the key to getting clients.",
    image: "/images/blog-placeholder.jpg",
    author: HARRY,
    body: clean([
      "<p>There is a persistent idea in fitness that if you look the part - lean, muscular, permanently tanned and smiling on a beach somewhere - the clients will follow. Post the right photos, project the right image, and your diary will fill itself. The PTs who have actually built sustainable businesses will tell you it is a lot more complicated than that.</p>",
      "<h2>What filtered photos actually communicate</h2><p>An eight-pack on Instagram might attract followers. It does not automatically attract clients. The people who need a PT most are not always the people scrolling through fitness influencer content thinking that looks like me. They are more often people who are slightly intimidated by the gym, who feel as though the glossy fitness world is not really for them, and who are looking for someone they can trust rather than someone they can admire from a distance.</p><p>Charlie from Wade Fitness was honest about this. When he first started, he assumed that being fit and looking fit would be enough. The reality was that clients did not just gravitate towards him because of how he looked. What actually built his diary was showing up consistently, talking to people, and being the kind of coach that people felt comfortable bringing their real problems to.</p>",
      "<h2>The no permanent tan reality</h2><p>The life of a working PT is not the life that social media tends to show. It is early starts and late finishes. It is planning sessions at midnight and following up on nutrition check-ins on a Sunday morning. It is some clients who never quite follow through on what they agreed to outside the gym, and the patience required to keep working with them anyway. It is rewarding work, genuinely, but it is also real work - and the PTs who last are the ones who went in knowing that, rather than expecting a life of flexible hours and photogenic moments.</p>",
      "<h2>What actually builds a client base</h2><p>Relationships. Consistency. Being the person in the gym who knows people's names and remembers what they told you last week. Delivering results that clients can actually feel, even when those results are not the dramatic body transformations that look good in a before-and-after. Helping someone move without pain for the first time in years. Helping someone get their energy back. Giving someone the confidence to go to the gym on their own - because you have taught them well enough that they no longer need you for every single session.</p><p>People invest in people, not photographs. Build relationships, do excellent work, and your reputation will do the marketing for you far more effectively than any set of photos ever will.</p>"
    ]),
  },
  {
    slug: "what-fitness-media-gets-wrong",
    title: "What Fitness Media Gets Wrong About Training Hard",
    date: "31 Jul 2026",
    publishDate: "2026-07-31",
    category: "Training",
    excerpt: "The grind culture that dominates fitness content is not just annoying — it actively puts people off exercise and leads to injury.",
    image: "/images/blog-placeholder.jpg",
    author: HARRY,
    body: clean([
      "<p>Open any fitness app, scroll through any training account on social media, and you will find the same message repeated in different fonts: grind. Hustle. No days off. Suffer for results. It is a compelling narrative. It is also, for most people, genuinely counterproductive - and as a PT, one of your most important jobs is helping clients unlearn it.</p>",
      "<h2>Why the workout of the day model is broken</h2><p>Marcin, a PT who coaches everyone from recreational gym-goers to competitive wrestlers, put it plainly: the fitness media presents exercise backwards. It leads with the hardest, most dramatic version of training and presents that as the goal. In reality, throwing yourself into maximum intensity before you have built the foundational movement quality, the baseline fitness, and the appropriate recovery capacity is a reliable route to injury - not results.</p><p>The irony is that the stuff that actually gets people fitter is not exciting enough to go viral. Resistance bands and isometric holds. Patient progressive overload. Deload weeks. Rest periods that actually allow full recovery between sets. These things work. They are just not visually compelling, and so they never trend.</p>",
      "<h2>The DOMS trap</h2><p>New exercisers often equate soreness with progress. If they are not wrecked after a session, they feel like they did not do enough. This is one of the most damaging misconceptions you will encounter as a PT. Delayed onset muscle soreness tells you that a stimulus was novel - it does not measure effectiveness, and it definitely does not mean you should replicate the session tomorrow. Once the body adapts to a training stimulus, the soreness largely disappears. That is a sign of adaptation, not of the training becoming useless.</p><p>The expectation that every session should leave a client barely able to walk downstairs is not just wrong - it is a recipe for burnout and dropout. Part of your job is resetting that expectation, and helping clients feel what it is actually like to train well rather than just hard.</p>",
      "<h2>What you should be teaching instead</h2><p>Progressive overload. Appropriate rest. The difference between training hard and training smart. The value of a deload. That it is completely fine - actually optimal - to take longer rest periods between sets when the intensity demands it. That not loving every single session is normal, even for people who genuinely enjoy training. That consistency over months beats intensity for three weeks followed by injury and a month off the gym.</p><p>The fitness industry sells extremes because extremes are engaging. As a coach, your job is to teach the unsexy middle ground - the stuff that actually works long-term. That is harder to post about, but it is the thing your clients will thank you for years down the line.</p>"
    ]),
  },
  {
    slug: "building-trust-not-selling",
    title: "Building Trust, Not Selling: How to Fill Your Diary Without Being Pushy",
    date: "14 Aug 2026",
    publishDate: "2026-08-14",
    category: "Business",
    excerpt: "The PTs who fill their diaries fastest are not the ones with the best sales pitch. They are the ones who build genuine relationships on the gym floor.",
    image: "/images/blog-placeholder.jpg",
    author: HARRY,
    body: clean([
      "<p>Nobody wants to feel sold to. Walk into a gym and be approached by a PT whose eyes light up at the sight of a potential client, and most people will do everything possible to avoid a repeat of that experience. Yet somehow, new PTs still think the way to build a client base is to get better at sales. It is not. It is to get better at being genuinely useful to people.</p>",
      "<h2>The two or three conversations a day approach</h2><p>Marcin, who built a full diary at The Gym Group, set himself one target when he started: two or three real conversations a day. Not pitches. Conversations. He would notice what someone was working on, ask a question about it, share something relevant. Maybe comment on someone's form, not in a critical way, but in a way that opened a dialogue. Over time, those conversations created a presence in the gym. People knew who he was, and more importantly, they trusted him before they ever considered working with him.</p><p>The crucial thing is that these were never conversations designed to convert. They were just genuine human exchanges. The diary filling was a side effect, not the goal. When someone eventually decided they wanted some help, Marcin was the obvious person to go to - because he was already the person they talked to.</p>",
      "<h2>Why trust beats technique every time</h2><p>Clients do not primarily invest in a programme. They invest in a person. A client who trusts you completely - who believes you are genuinely on their side, who has seen you be honest with them even when it was not what they wanted to hear - that client will stay with you for years. They will refer their friends. They will come back after a break, or after a life change, because they know the relationship is solid.</p><p>That kind of trust cannot be manufactured by a good sales technique. It can only be built by actually showing up for people, consistently, over time. By being the coach who remembers what they told you last week, who follows up after a session, who tells them honestly when they are not quite ready for the next progression rather than pushing them forward before they are ready.</p>",
      "<h2>What this means practically</h2><p>Show up. Be sociable, not salesy. Learn people's names. Be the PT who is clearly knowledgeable but who wears that knowledge lightly - who explains things in plain English and does not use technical language to appear impressive. Be honest when you do not know something rather than blagging an answer you are not sure of. Have a good time in the gym, because if you are visibly enjoying your work, people are drawn to that energy. Build your reputation one genuine interaction at a time. The clients will come.</p>"
    ]),
  },
  {
    slug: "teach-clients-to-not-need-you",
    title: "The Best Thing You Can Do For Your Clients Is Teach Them Not to Need You",
    date: "28 Aug 2026",
    publishDate: "2026-08-28",
    category: "Coaching",
    excerpt: "The PT who hoards knowledge to keep clients dependent has it backwards. The best coaches make themselves replaceable — and that is exactly why clients stay.",
    image: "/images/blog-placeholder.jpg",
    author: HARRY,
    body: clean([
      "<p>There is a version of PT that works by keeping clients dependent. You give them just enough information to keep coming back, but never enough to be truly independent. The theory is that if they can do it without you, they will. It is a cynical approach, and it backfires more often than not - because clients eventually figure out that they are being managed rather than coached, and they leave anyway.</p>",
      "<h2>The learn-to-drive analogy</h2><p>Charlie from Wade Fitness described it well. When someone gets in the car with a driving instructor, the whole point of the arrangement is to make the student a confident, independent driver. The instructor is not trying to create a lifelong dependency. They are transferring a skill. Once that skill is transferred, the relationship changes - but the trust built in the process is what makes the client come back for the next lesson, and the one after that.</p><p>PT works the same way. Your client came to you because they were not yet independent in the gym. Your job is to teach them how to be. You share the knowledge. You explain the reasoning behind the programming. You show them what progressive overload actually means in practice, how to pick the right weight, when to push and when to back off. If you do that job properly, they will not need you for the basics anymore.</p>",
      "<h2>Why this approach actually retains clients</h2><p>Here is the counterintuitive part: the clients who learn the most from you are the ones who stay longest. When you withhold information to maintain dependency, clients sense it. They may not be able to articulate exactly what feels off, but the relationship does not have real trust at its foundation - and without trust, they will leave at the first sign of friction.</p><p>When you educate genuinely, clients start to trust you with more. Their goals change, their situation changes, and they know you are the person to come back to - because you have already shown you are on their side. The client who learns everything they need from you and then trains confidently on their own for six months is the client who comes back when they want to take things to the next level.</p>",
      "<h2>The gatekeeping problem in fitness</h2><p>There is a culture in some corners of the fitness industry of keeping knowledge close - presenting information as more complex or more specialist than it needs to be, in order to maintain an air of indispensability. It is a short-sighted strategy. Fitness information is more accessible than it has ever been. Clients who feel gatekept will simply look elsewhere. The PTs who thrive long-term are the ones who give knowledge freely and let the quality of their coaching speak for itself.</p>"
    ]),
  },
  {
    slug: "honesty-in-coaching",
    title: "Honesty in Coaching: When to Say I Don't Know",
    date: "11 Sep 2026",
    publishDate: "2026-09-11",
    category: "Coaching",
    excerpt: "New PTs fear admitting they do not have all the answers. In reality, saying 'I don't know but I'll find out' is one of the most powerful things you can say.",
    image: "/images/blog-placeholder.jpg",
    author: HARRY,
    body: clean([
      "<p>Early in your career as a PT, there will be moments when a client asks you something and you do not know the answer. The temptation is to say something - to fill the silence with your best guess, to project confidence you do not quite feel. Resist it. The smartest, most trust-building response you can give is: I am not sure about that, but I will find out before your next session.</p>",
      "<h2>Why bluffing gets found out</h2><p>You might fool someone once. But clients ask questions, they talk to other people, they read things online. If you gave them an answer that was not right, there is a reasonable chance they will eventually figure that out. And at that point the trust does not just take a hit - it can be gone entirely. Honesty about the limits of your knowledge is far safer than a confident answer you cannot back up.</p><p>Charlie was candid about this. When he first started, he said things that were not exactly correct, and he knows it. He is honest about it now. The willingness to acknowledge that he did not always have everything right - and to keep learning - is part of what makes him a better coach. Every PT has been in that position. The ones who grow fastest are the ones who take it seriously rather than trying to paper over it.</p>",
      "<h2>Knowing when to refer out</h2><p>There will also be clients who present with something that is genuinely outside your scope. A significant spinal issue. A complex injury. A medical condition that requires a conversation with a physio or a GP before you start loading them. Knowing your limits and being willing to say so - and to refer appropriately - is not a weakness. It is professional.</p><p>Clients respect this enormously. The PT who says, honestly, that this is beyond what they are qualified to handle and offers to help connect the client with the right person, builds more trust with that action than almost anything else. People can tell when a professional is being straight with them. They remember it.</p>",
      "<h2>The habit of looking things up</h2><p>Adam Beard made a point that stuck with me: as you work with more clients, you will encounter ailments and injuries and situations you have never seen before. The response is not to pretend you have seen it before. The response is to go home that evening, research it properly, and come back better prepared. Once you have really studied something and seen it in practice, you will recognise it again. That self-directed learning - driven by what your actual clients bring to you - is some of the most valuable education you will ever do. It sticks because it is relevant, and it builds a depth of knowledge that no course alone can give you.</p>"
    ]),
  },
  {
    slug: "getting-qualified-what-to-look-for",
    title: "Getting Qualified: What to Look For in a PT Course",
    date: "25 Sep 2026",
    publishDate: "2026-09-25",
    category: "Education",
    excerpt: "Not all PT qualifications are the same. The course format, the tutor quality, and the awarding body all matter — here is what to look for before you sign up.",
    image: "/images/blog-placeholder.jpg",
    author: HARRY,
    body: clean([
      "<p>If you are thinking about getting your personal training qualification, you will quickly discover that there are a lot of options out there. Online or in-person. Two weeks or six months. Different awarding bodies, different prices, different claims about pass rates and support. It can feel overwhelming. But not all PT courses are created equal, and the one you choose will affect not just whether you pass, but how prepared you actually are to do the job.</p>",
      "<h2>The format matters as much as the content</h2><p>Adam Beard and Dom Hills, both experienced PTs who have gone through the qualification process themselves, made the point clearly: the format of the course shapes the quality of the learning. A large cohort of students moving through material at a group pace is a very different experience from smaller, more focused tuition. When you are learning practical skills - how to observe movement, how to cue a lift, how to adapt a session on the spot - the opportunity to actually practise, receive feedback, and practise again is what makes the knowledge stick.</p><p>If you are considering an online-only course, think carefully about how the practical assessments are structured. Anatomy theory can be learned from a screen. Coaching cannot.</p>",
      "<h2>Tutor quality is everything</h2><p>The qualification company sets the curriculum. The tutor determines how much of it actually lands. A good tutor brings real-world experience into the room. They can tell you not just what the textbook says, but what you will actually encounter in your first year on the gym floor - and that context is invaluable. When Adam and Dom were going through their qualification, the quality of the teaching they received had a direct impact on how ready they felt when they started working.</p><p>Ask potential providers who will be teaching the course. What is their background? Have they worked as PTs themselves? If a provider cannot answer that question clearly, take note.</p>",
      "<h2>What the qualification actually gives you</h2><p>The Level 3 Personal Training qualification is your entry point to the industry. It gives you the foundational knowledge you need, the professional recognition that allows you to get insured and work in commercial gyms, and crucially - it gives you a framework to keep learning from. Treat it as the beginning of your education, not the end. The PTs who develop most quickly after qualifying are the ones who go into the work hungry to learn more, not the ones who think the certificate means they know everything they need to know.</p>",
      "<h2>One more thing worth knowing</h2><p>Some providers pass almost everyone. The certificate arrives regardless of whether the student is genuinely ready. That might sound appealing if you are anxious about assessments, but it is actually a disservice. The assessments exist to make sure you can do the job safely and effectively. If you want to build a real career - and I believe you do - you want a course that takes that seriously. The qualification should humble you a little, because the work is genuinely complex. Any provider that makes it feel like a formality is worth approaching with scepticism.</p>"
    ]),
  },
  {
    slug: "staying-on-the-tools-as-you-grow",
    title: "Why the Best Educators Still Stay on the Tools",
    date: "09 Oct 2026",
    publishDate: "2026-10-09",
    category: "Industry",
    excerpt: "The coaches who make the best educators are the ones who never stop coaching. Here is why staying on the gym floor matters.",
    image: "/images/blog-placeholder.jpg",
    author: HARRY,
    body: clean([
      "<p>There is a version of career progression in fitness that looks like this: qualify, build a client base, start running courses, move into education, and gradually stop doing the hands-on work. It seems like a natural arc. But the best educators in this industry - the ones whose students actually come out the other side ready to work - are almost always the ones who never stopped coaching real clients.</p>",
      "<h2>Why practice keeps education honest</h2><p>When you are actively coaching, you are constantly confronted with the gap between theory and reality. The textbook tells you how movement should look. The client in front of you has a job that keeps them sitting for nine hours a day, a bad shoulder from an old rugby injury, and three hours of sleep last night because the baby was unsettled. The plan has to adapt. That adaptation - and the judgement it requires - is the thing that actually matters in coaching, and you only keep it sharp by practising it.</p><p>An educator who stopped coaching five years ago is teaching what worked five years ago, filtered through five years of not being tested on the gym floor. The industry moves, our understanding moves, and so does the population we are working with. Staying in the work keeps you honest.</p>",
      "<h2>What it signals to your students</h2><p>There is also something that students pick up on, even if they cannot always name it: whether the person teaching them still does the thing they are being taught. It is not just about credibility, though that matters. It is about the authenticity of the examples. When a tutor talks about a client they worked with last week, a situation they handled recently, a mistake they made and what they learned from it - that lands differently than recycled anecdotes from years ago. Students can tell the difference.</p>",
      "<h2>The balance is possible</h2><p>This does not mean educators need to be running 30 client sessions a week alongside everything else. But staying connected to the work in some form - even a handful of sessions, even mentoring newer PTs through real client situations - keeps the knowledge alive and the teaching relevant. The coaches I respect most are the ones who have never fully left the floor, whatever else they are doing alongside it. The willingness to stay in the work, rather than simply teaching from a distance, is one of the things that separates great fitness educators from merely qualified ones.</p>"
    ]),
  },
  {
    slug: "unusual-paths-into-pt",
    title: "There Is No Single Path Into Personal Training",
    date: "23 Oct 2026",
    publishDate: "2026-10-23",
    category: "Stories",
    excerpt: "Some of the best PTs in the industry did not come through the conventional route. Their stories are worth knowing.",
    image: "/images/blog-placeholder.jpg",
    author: HARRY,
    body: clean([
      "<p>The conventional story of how someone becomes a personal trainer goes something like this: they played sport growing up, they got into training, they decided to turn their passion into a career, they qualified. It is a common path, and there is nothing wrong with it. But it is far from the only one - and some of the most effective coaches I know came from completely different places.</p>",
      "<h2>When fitness was functional, not passionate</h2><p>Marcin, who built Perun Strength in Norwich, did not fall in love with training. He came to it out of necessity. He was in a difficult period of his life - homeless, dealing with substance use, in genuine physical pain - and he started training to get out of that pain. He found an Olympic weightlifting club in Plymouth. Later, powerlifting and strongman. He ran a wrestling school in Norwich, and when the parents of his wrestlers started asking him for training help, that is when the PT career began.</p><p>That origin story gives him something that many PTs do not have: a genuine, lived understanding of what it feels like to start from the very bottom, physically and otherwise. He understands his clients' starting points because he had one of his own.</p>",
      "<h2>What unconventional paths teach you</h2><p>The coaches who came to PT through a non-standard route often have a particular quality in their work: they are less attached to how things are supposed to look. Marcin does not have a template of what a motivated gym-goer should be, because he did not start out as one. He can work with people who are not starting from a place of enthusiasm or physical confidence, because he understands that place from the inside.</p><p>Charlie from Wade Fitness started training people from his grandmother's garden, then moved to a garage, then a local gym. His path was gradual and self-taught in ways that no course fully covers. Adam went from selling sofas to working part-time in a sports nutrition shop to building a PT career. None of these are the textbook route - and all of them produced coaches who are exceptionally good at meeting clients where they actually are.</p>",
      "<h2>What this means if you are considering the career</h2><p>If you are not the person who has been in the gym since you were 16, who has always been lean and strong and motivated - that is not a disqualification. It might actually be an advantage. The clients who most need a good PT are rarely the ones who look like the people on fitness social media. They are the people who are intimidated, who are starting from scratch, who have tried before and failed for reasons that had nothing to do with effort. If you understand those starting points personally, you will be a better coach for them. The qualification gives you the framework. The life experience gives you the empathy. Both matter.</p>"
    ]),
  },
];

export function getPublishedPosts(): BlogPost[] {
  const today = new Date();
  return allBlogPosts.filter((p) => new Date(p.publishDate) <= today);
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return allBlogPosts.find((p) => p.slug === slug);
}