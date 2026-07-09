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
    image: "https://pub-6e6bb53af6c34756a861d2c0a8259e84.r2.dev/Aines%20L3%20summative/20230329-IFE-CF_007.JPG",
    author: HARRY,
    body: clean([
      "<p>There is a race to the bottom happening in gyms all over the country, and it is new PTs who are losing it. I have heard of people charging £10 a session. Ten pounds. In a job where you are personally responsible for someone else's health, their movement, their safety - for an hour of your time, your preparation, and often your follow-up messages at midnight.</p>",
      "<h2>The maths nobody shows you on the PT course</h2><p>Let us say you charge £40 a session. One client, once a week, for a month. That's £160. Sounds reasonable, right? Now take out tax, national insurance, gym rent or commission, and the time you spent writing that programme, checking their food diary, and answering their WhatsApp messages before bed. You are not earning £40 an hour. You are earning £40 for a week's worth of contact. That is a very different number.</p><p>Now imagine you charge £10. Suddenly you need a full 30-session week just to scrape minimum wage - and you have got more responsibility than someone stacking shelves at Tesco. No disrespect to anyone doing that job. But a PT is taking someone's health into their hands. The rate has to reflect that.</p>",
      "<h2>Why new PTs undercut, and why it backfires</h2><p>It is hard watching another PT on the gym floor fill their diary faster than you. Especially when you have the same qualification on paper. The temptation is to offer a lower rate to compete. But here is what actually happens: clients who pay £10 care about it £10 worth. Clients who pay £40 show up. They do the homework. They take it seriously - because they have invested seriously. The price signals the value. Charge accordingly and you will attract people who are genuinely committed to the process.</p>",
      "<h2>What a fair rate actually looks like</h2><p>Do your market research. Look at what PTs in your area are charging - and use our <a href=\"/income\">PT Income &amp; Tax Calculator</a> to see what different session rates actually put in your pocket once tax and national insurance are factored in. Do not anchor on the lowest number you find - anchor on the average, and then consider what you offer. You have just qualified. You are taking someone's health into your hands. Own that. The experienced PTs who built long careers did not do it by undercutting everyone in the building. They did it by delivering quality and holding their value.</p><p>One final thing: if you are working unsociable hours - early mornings, late evenings, weekends - charge more for those slots. In any other industry, unsocial hours come with a premium. PT is no different. You are not obliged to sacrifice your evenings for the same rate as a Tuesday lunchtime. Value your time, and your clients will too.</p>"
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
      "<h2>Why the schedule looks nothing like a normal job</h2><p>Your clients live normal lives. They go to work at nine and leave at five. That means they want to train before seven in the morning or after six in the evening. Your busiest windows are the exact hours that most people would call anti-social. Early morning blocks, post-work rushes, weekend slots - these fill first. The middle of the day can be quiet, particularly when you are starting out and do not yet have the retired clients or shift workers who train at lunchtime.</p><p>The sessions themselves are just the visible part of the job. Behind each hour on the gym floor there is programme writing, nutrition check-ins, goal reviews, and the messages that come in at odd hours. You are not earning your rate for one hour. You are earning it for the whole week of contact around that hour. Our <a href=\"/income\">PT Income &amp; Tax Calculator</a> can help you work out what different session volumes and rates actually translate to in real take-home income.</p>",
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
    image: "/images/20221115-IFE-CF_005.JPG",
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
    image: "/images/20221115-IFE-CF_012.JPG",
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
    image: "/images/20221115-IFE-CF_020.JPG",
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
    image: "/images/20221115-IFE-CF_028.JPG",
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
    image: "/images/20221115-IFE-CF_035.JPG",
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
    image: "/images/20221115-IFE-CF_042.JPG",
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
    image: "/images/20221115-IFE-CF_050.JPG",
    author: HARRY,
    body: clean([
      "<p>If you are thinking about getting your personal training qualification, you will quickly discover that there are a lot of options out there. Online or in-person. Two weeks or six months. Different awarding bodies, different prices, different claims about pass rates and support. It can feel overwhelming. But not all PT courses are created equal, and the one you choose will affect not just whether you pass, but how prepared you actually are to do the job.</p>",
      "<h2>The format matters as much as the content</h2><p>Adam Beard and Dom Hills, both experienced PTs who have gone through the qualification process themselves, made the point clearly: the format of the course shapes the quality of the learning. A large cohort of students moving through material at a group pace is a very different experience from smaller, more focused tuition. When you are learning practical skills - how to observe movement, how to cue a lift, how to adapt a session on the spot - the opportunity to actually practise, receive feedback, and practise again is what makes the knowledge stick.</p><p>If you are considering an online-only course, think carefully about how the practical assessments are structured. Anatomy theory can be learned from a screen. Coaching cannot.</p>",
      "<h2>Tutor quality is everything</h2><p>The qualification company sets the curriculum. The tutor determines how much of it actually lands. A good tutor brings real-world experience into the room. They can tell you not just what the textbook says, but what you will actually encounter in your first year on the gym floor - and that context is invaluable. When Adam and Dom were going through their qualification, the quality of the teaching they received had a direct impact on how ready they felt when they started working.</p><p>Ask potential providers who will be teaching the course. What is their background? Have they worked as PTs themselves? If a provider cannot answer that question clearly, take note.</p>",
      "<h2>What the qualification actually gives you</h2><p>The Level 3 Personal Training qualification is your entry point to the industry. It gives you the foundational knowledge you need, the professional recognition that allows you to get insured and work in commercial gyms, and crucially - it gives you a framework to keep learning from. Not sure how long the qualification will take around your life? Try our <a href=\"/study-time\">Course Timeline Estimator</a> - it takes your work hours, family situation, and study time to give you a realistic personal timeline. Treat it as the beginning of your education, not the end. The PTs who develop most quickly after qualifying are the ones who go into the work hungry to learn more, not the ones who think the certificate means they know everything they need to know.</p>",
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
    image: "/images/20221115-IFE-CF_058.JPG",
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
    image: "/images/20221115-IFE-CF_065.JPG",
    author: HARRY,
    body: clean([
      "<p>The conventional story of how someone becomes a personal trainer goes something like this: they played sport growing up, they got into training, they decided to turn their passion into a career, they qualified. It is a common path, and there is nothing wrong with it. But it is far from the only one - and some of the most effective coaches I know came from completely different places.</p>",
      "<h2>When fitness was functional, not passionate</h2><p>Marcin, who built Perun Strength in Norwich, did not fall in love with training. He came to it out of necessity. He was in a difficult period of his life - homeless, dealing with substance use, in genuine physical pain - and he started training to get out of that pain. He found an Olympic weightlifting club in Plymouth. Later, powerlifting and strongman. He ran a wrestling school in Norwich, and when the parents of his wrestlers started asking him for training help, that is when the PT career began.</p><p>That origin story gives him something that many PTs do not have: a genuine, lived understanding of what it feels like to start from the very bottom, physically and otherwise. He understands his clients' starting points because he had one of his own.</p>",
      "<h2>What unconventional paths teach you</h2><p>The coaches who came to PT through a non-standard route often have a particular quality in their work: they are less attached to how things are supposed to look. Marcin does not have a template of what a motivated gym-goer should be, because he did not start out as one. He can work with people who are not starting from a place of enthusiasm or physical confidence, because he understands that place from the inside.</p><p>Charlie from Wade Fitness started training people from his grandmother's garden, then moved to a garage, then a local gym. His path was gradual and self-taught in ways that no course fully covers. Adam went from selling sofas to working part-time in a sports nutrition shop to building a PT career. None of these are the textbook route - and all of them produced coaches who are exceptionally good at meeting clients where they actually are.</p>",
      "<h2>What this means if you are considering the career</h2><p>If you are not the person who has been in the gym since you were 16, who has always been lean and strong and motivated - that is not a disqualification. It might actually be an advantage. The clients who most need a good PT are rarely the ones who look like the people on fitness social media. They are the people who are intimidated, who are starting from scratch, who have tried before and failed for reasons that had nothing to do with effort. If you understand those starting points personally, you will be a better coach for them. The qualification gives you the framework. The life experience gives you the empathy. Both matter.</p>"
    ]),
  },
  {
    slug: "self-employed-pt-finances",
    title: "The Financial Reality No PT Course Will Teach You",
    date: "06 Nov 2026",
    publishDate: "2026-11-06",
    category: "Business",
    excerpt: "Your hourly rate is not your income. Once you factor in tax, national insurance, holidays, sick pay, and pension, the maths looks very different — and nobody on your Level 3 course will do it with you.",
    image: "/images/20221115-IFE-CF_072.JPG",
    author: HARRY,
    body: clean([
      "<p>One of the most common conversations I have with newly qualified PTs goes something like this: they are charging £40 a session, doing fifteen sessions a week, and doing the sum on the back of an envelope. Forty times fifteen times four times twelve. Great number. Then January arrives and HMRC would like a word.</p>",
      "<h2>What your hourly rate actually has to cover</h2><p>When you are employed, your employer covers your pension contributions, pays for your holiday entitlement, and gives you statutory sick pay if you cannot work. As a self-employed PT, none of those things happen automatically. Every one of those protections has to come out of your hourly rate — because if it does not come from there, it does not come from anywhere. Adam Beard puts it plainly: a percentage of every hour you charge is your pension, your holidays, and your sick pay. The number that hits your bank is not what you earned. It is what is left after those things are accounted for, whether or not you have accounted for them.</p><p>Then there is tax. The self-assessment system requires you to pay tax on your profits in January. If you have not been setting money aside throughout the year, that January bill — which can run into thousands — can be genuinely destabilising. The discipline of saving a fixed percentage of every payment as soon as it arrives is not optional financial planning. It is professional basic practice.</p>",
      "<h2>The naive income projection problem</h2><p>Dom Hills describes the mental trap that catches almost every new PT at some point: you multiply your session rate by the number of weekly sessions by 52 weeks and arrive at a satisfying annual figure. Our <a href=\"/income\">PT Income &amp; Tax Calculator</a> does this maths properly - factoring in tax, national insurance, and realistic working weeks so you get an honest number, not an optimistic one. The problem with the back-of-envelope version is that it assumes no illness, no client holidays, no slow January, no week where three clients cancel in a row. Real annual income is what you earn after accounting for all of that — and the gap between the projection and the reality is where a lot of early PT careers hit their first crisis.</p><p>The practical remedy is straightforward even if it requires discipline: build a savings buffer before you need it. Adam and Dom both recommend something close to five or six months of minimum-wage equivalent sitting in a savings account before you spend freely. Not because you expect disaster, but because the nature of self-employment is that surprises arrive — and a PT with savings makes good decisions when a client drops off, while a PT without savings makes desperate ones.</p>",
      "<h2>The conversation to have with yourself now</h2><p>Before you set your session rate, do the real maths. What does the rate need to be to cover your actual costs — gym rent or commission, insurance, CPD, equipment — and still leave enough after tax and pension savings to live on? That figure is almost certainly higher than whatever you were considering. Charge accordingly. The alternative is spending the first year of your career financially fragile, making decisions driven by anxiety rather than strategy. That serves neither you nor your clients.</p>"
    ]),
  },
  {
    slug: "cancellation-policy-protects-clients",
    title: "A Cancellation Policy Protects Your Clients, Not Just Your Income",
    date: "20 Nov 2026",
    publishDate: "2026-11-20",
    category: "Business",
    excerpt: "PTs avoid setting cancellation policies because they seem harsh. In reality, a well-framed policy removes the psychological opt-out for the clients who most need accountability.",
    image: "/images/20230329-IFE-CF_050.JPG",
    author: HARRY,
    body: clean([
      "<p>Most new PTs are uncomfortable with the idea of charging for a missed session. It feels punitive. It feels like putting money before the client relationship. But there is another way to think about it — and once you have seen it clearly, the discomfort largely disappears.</p>",
      "<h2>Why people cancel</h2><p>Very rarely does a client cancel a PT session because something genuinely urgent has come up. More commonly, they cancel because training feels optional in a way that a dentist appointment or a hair booking does not. When you have spent money in advance and there is a charge attached to cancelling late, training feels less optional. The policy does not create commitment — it protects and reinforces commitment the client has already expressed by signing up.</p><p>Dom Hills makes the comparison directly: at a dentist or a hairdresser, a last-minute cancellation costs money. Nobody considers this harsh. It is standard professional practice in any field where someone has reserved time specifically for you. Your time has the same value. The only reason PT clients sometimes treat it differently is because PTs often let them.</p>",
      "<h2>The anxiety cancellation</h2><p>There is a specific pattern worth understanding: the client who consistently cancels on the day of a session, particularly one they have been dreading. Gym anxiety is real. The decision to cancel is often made not because the client does not care about their training, but because they care too much — they have built it up into something frightening and the easiest way to relieve the anxiety is to remove the event. A cancellation policy removes that easy exit. For the right client, that is exactly the support they need.</p>",
      "<h2>How to introduce it without conflict</h2><p>Set it out clearly before the working relationship begins, not after. Include it in whatever initial agreement you use when onboarding a new client. Frame it professionally and matter-of-factly, the same way a medical practice or any other service provider would. You do not need to apologise for it. The clients who are committed will not object. The clients who do object are telling you something useful about whether they are ready to commit at all — which is information worth having before you have invested months in the relationship.</p>"
    ]),
  },
  {
    slug: "why-pricing-changes-client-behaviour",
    title: "Why the Price You Charge Changes How Clients Behave",
    date: "04 Dec 2026",
    publishDate: "2026-12-04",
    category: "Business",
    excerpt: "Clients who pay more show up differently. The investment effect is real — and understanding it will change how you think about setting your rates.",
    image: "/images/HARRY-AND-PARIS-MATTHEWS-20220124-IFE-TGGNCC003.jpg",
    author: HARRY,
    body: clean([
      "<p>There is a story from Adam Beard and Dom Hills that stuck with me. They describe a PT who was charging around £18 a session and spending most of each session on their phone. The clients who worked with this PT were, correspondingly, disengaged — not doing their homework, cancelling without notice, treating sessions as optional. The pricing and the client attitude were entirely consistent with each other.</p>",
      "<h2>The principle behind it</h2><p>When someone pays £10 for a session, their investment in the outcome is £10 worth. When they pay £60, their investment is £60 worth. The price is not just compensation for your time — it shapes how seriously the client treats the process. A client who has paid a meaningful amount tends to show up prepared, do the work between sessions, and take feedback seriously. The financial commitment acts as an amplifier of everything else you are doing.</p><p>This is one of the reasons that new PTs who undercharge to attract clients often find themselves working harder for poorer outcomes. The clients who take low-rate sessions seriously are the exception. The ones who pay a proper rate and check out are also the exception. The price filters for a kind of commitment that makes the whole coaching relationship work better.</p>",
      "<h2>What this means for your rate</h2><p>Setting a serious rate is not just an act of confidence. It is a service to your clients. A client who is paying enough to care about the investment is more likely to get results — which is presumably why they came to you. The PT who charges £10 out of modesty, and ends up with clients who do not do their homework and do not progress, has not done their client a favour. They have set them up for a process that does not produce the outcome they wanted.</p><p>Adam and Dom put the point directly: clients invest in people, not services. If you want clients who are invested in the process, price yourself as someone worth investing in. The clients who cannot afford a proper rate are better served in a class environment than being taken on at a rate that undermines the dynamic from the first session.</p>",
      "<h2>The PT on their phone</h2><p>There is a second half to the story about the £18 PT. Their clients were disengaged not only because the price was low, but because the PT was visibly treating the session the same way. Price and engagement are connected in both directions — charge seriously and show up seriously, or the whole thing falls apart. The price is the beginning of the signal. The quality of your attention is how you sustain it.</p>"
    ]),
  },
  {
    slug: "fill-antisocial-hours-first",
    title: "Fill the Hard Hours Before You Get Choosy",
    date: "18 Dec 2026",
    publishDate: "2026-12-18",
    category: "Career",
    excerpt: "New PTs who refuse 6am and 8pm slots and then wonder why their diary is empty have created their own problem. The right to work comfortable hours is earned, not assumed.",
    image: "/images/BURY-BASKETBALL-HARRY-IFE-TGGNHR_035.jpg",
    author: HARRY,
    body: clean([
      "<p>Dom Hills is not a morning person. He says so openly. He is also very clear about what got him through his first few years of building a PT business: he is a money person. Those two facts produced a simple rule — if a client wanted 6am, they got 6am. The discomfort of the early start was the cost of a session in the diary, and a session in the diary was worth more than an extra hour in bed.</p>",
      "<h2>Why new PTs get this wrong</h2><p>The instinct to protect your preferred working hours is completely understandable. Nobody wants to be up at half past five every morning. But the logic of refusing antisocial slots before your diary is full has it backwards. The clients who want early mornings and late evenings are often the most reliable ones — they have built a commitment into the only window their day allows. Turning them away because the hours are inconvenient, when you have nothing filling the gaps, is a choice to stay quiet out of comfort.</p><p>Dom puts it simply: if you have got those slots free and you are not filling them, you cannot complain that the diary is not full. The choice to sleep in is a legitimate one — but it has a cost, and that cost is paid in empty appointments.</p>",
      "<h2>Earning the right to be selective</h2><p>This is not a permanent state of affairs. The PT who fills their antisocial slots, builds a full diary, and develops a reputation over the first two or three years earns the right to be selective about their hours. At that point, you can raise your rates for early mornings and evenings, restructure your week, and replace difficult hours with clients who can do midday. But you earn that flexibility by demonstrating that you can deliver consistently under conditions that are not always ideal. The blank calendar stage is not the time to be choosing hours around what is comfortable.</p>",
      "<h2>A practical framework for early-career scheduling</h2><p>When a new client enquires, ask about their availability before you name your own preferences. Fill the hardest slots first. Keep your preferred hours available for the point in your career when you can afford to be choosy. The PTs who build full diaries fastest in their first few years are almost always the ones who approached their time as a resource to be filled rather than a lifestyle to be protected. The comfort came later, because they earned it.</p>"
    ]),
  },
  {
    slug: "when-clients-drop-off-dont-quit",
    title: "When Clients Drop Off, Don't Catastrophise",
    date: "08 Jan 2027",
    publishDate: "2027-01-08",
    category: "Career",
    excerpt: "Several clients cancelling in the same week is a completely normal fluctuation. Most new PTs misread it as evidence they made a terrible mistake. Here is how to read it correctly.",
    image: "/images/HARRY-PHONE-2-20220124-IFE-TGGNCC032.jpg",
    author: HARRY,
    body: clean([
      "<p>Most PTs experience it in the first year or two. A couple of clients cancel in the same week, or three or four people go quiet in a row, and the immediate response is a spiral: I have made a terrible mistake, this is not working, I should never have done this. Adam Beard describes this as one of the most predictable and most avoidable crises in early PT careers — and the solution is largely about preparation rather than strategy.</p>",
      "<h2>What client dropout actually means</h2><p>Clients leave for reasons that often have nothing to do with you. A financial situation changes. A work commitment takes over their schedule. A family difficulty means the gym falls off the list temporarily. An injury stops them training. None of these are reflections of your coaching quality — they are the natural churn of working with human beings whose lives are more complicated than a PT session. The PT who has been doing this for twenty years loses clients too. The difference is they have enough experience to understand that others will come.</p><p>Adam is direct: you do not know that person's circumstances. The message they sent cancelling tells you they cannot train right now. It does not tell you that you failed. The catastrophising that follows a string of cancellations is almost always disproportionate to what the data actually shows.</p>",
      "<h2>Why financial preparation changes your response</h2><p>This is where the savings buffer matters practically. A PT who has five or six months of living costs in the bank is a completely different person when clients drop off to a PT who has two weeks. The financially prepared PT can read the situation with perspective, trust that more clients will come, and make deliberate decisions about how to fill the gap. The financially unprepared PT is facing a genuine emergency — and people in emergencies do not make good decisions. They undercut their rate, take on clients they should not, and project anxiety in every client interaction, which makes the problem worse.</p>",
      "<h2>Building the mindset before you need it</h2><p>The practical work here is done before the drop-off happens: build the savings, develop habits of client attraction while you already have clients, and stay connected to your professional community so that when a quiet period arrives you are not starting from scratch. Client churn is a feature of the job, not a bug. The PTs who sustain careers through it are the ones who anticipated it and planned accordingly, rather than the ones who were blindsided and never quite recovered their confidence.</p>"
    ]),
  },
  {
    slug: "how-to-get-your-first-clients",
    title: "How to Get Your First Clients When Nobody Knows You Exist",
    date: "22 Jan 2027",
    publishDate: "2027-01-22",
    category: "Business",
    excerpt: "The answer is not better social media content. It is showing up, being genuinely useful, and having real conversations before any money ever changes hands.",
    image: "/images/HARRY-PHONE-20220124-IFE-TGGNCC033.jpg",
    author: HARRY,
    body: clean([
      "<p>When Dom Hills was starting out, he did not have a following. He did not have before and after photos. He had a gym membership, a new qualification, and a decision to make about how to spend his time. What he did with it was simple and unglamorous: he ran a free 12-week group session, approached people at gym machines, and offered demonstration sessions to anyone who asked. None of it was sophisticated. All of it worked.</p>",
      "<h2>The floor strategy</h2><p>The gym floor is where your first clients are. Not social media, not paid advertising, not handing out business cards — the people already training in the building where you work, who see you every day, and who form impressions of you over weeks and months of proximity. Marcin from Perun Strength set himself a target of two or three genuine conversations a day: not pitches, just honest exchanges about what someone was working on, how a movement felt, what they were trying to achieve. Over time, those conversations become familiarity, and familiarity becomes the kind of trust that makes someone choose you when they decide to invest in a PT.</p><p>The failure mode for new PTs is staying out of the way. They worry about being annoying, so they train alone and wait for enquiries. In a gym with thousands of members, this strategy produces nothing. You cannot be chosen by someone who does not know you exist.</p>",
      "<h2>Free work as a business investment</h2><p>The free 12-week class Dom ran was not charity. It was a visibility strategy. A room full of people who have experienced your coaching first-hand is worth more than any number of Instagram posts. The class attendees who wanted more specific results — a wedding goal, a strength target, something a group session could not fully address — came to him because they had already seen what he could do. The conversion from group to individual is natural when the trust is already there.</p><p>This approach requires accepting that the short-term return is near zero. But the return compounds. Every person who has experienced your coaching can become a client, refer a friend, or provide a testimonial. The PTs who try to skip this phase and go straight to full rate without any preceding relationship-building almost always struggle.</p>",
      "<h2>What first clients actually need from you</h2><p>The most important thing a first client needs is not your most sophisticated programme. It is the certainty that you are genuinely interested in them and their goals. That you have listened. That you have planned something specifically for them. Coaching quality improves as your experience grows — but relationship quality can be excellent from the start, and that is what retains first clients long enough for everything else to develop.</p>"
    ]),
  },
  {
    slug: "building-a-referral-network",
    title: "Building a Referral Network That Works Both Ways",
    date: "05 Feb 2027",
    publishDate: "2027-02-05",
    category: "Business",
    excerpt: "The most efficient business development tool available to a PT is not advertising. It is a genuine reciprocal relationship with professionals who see your potential clients before you do.",
    image: "/images/20221115-IFE-CF_005.JPG",
    author: HARRY,
    body: clean([
      "<p>Dom Hills describes his client acquisition at this point in his career as largely self-sustaining. The bulk of it — 80 to 90 per cent, by his own estimate — comes through his website and a referral network he has built over years. The advertising budget is essentially zero. The networking investment was significant, but it was a different kind of investment: time, goodwill, and a willingness to send business to other people before expecting any in return.</p>",
      "<h2>The logic of reciprocal referrals</h2><p>A massage therapist who sees a client with chronic back tension is talking to someone who may well need a PT. A physio who has discharged a patient from rehabilitation has a client ready to return to general training. A GP whose patient has been told to lose weight or improve cardiovascular fitness has a patient who needs exactly what a PT provides. These professionals are seeing your potential clients, often before those clients know they want a PT. A relationship with them is worth more than any amount of paid advertising.</p><p>The reciprocal part is important. The arrangement only works long-term if both sides benefit. Dom sends clients who have soft tissue needs to his massage therapist. The therapist sends clients who need structured training back to Dom. Nobody is cold-calling or asking for favours. It is a genuine professional exchange built on trust and track record.</p>",
      "<h2>How to build these relationships</h2><p>Start by identifying who sees your kind of client: physios, osteopaths, massage therapists, running coaches, sports clubs, GP surgeries, sports nutrition shops. Introduce yourself in person where possible. Be clear about what you do and who you help. Ask about their work. Do not immediately ask for referrals. Demonstrate that you are someone worth referring to by being helpful, knowledgeable, and easy to work with.</p>",
      "<h2>What this looks like over time</h2><p>It takes time. The first few months produce very little. The following years produce a consistent stream of warm, pre-qualified leads who arrive already trusting you because someone they trust sent them. Dom's 80 to 90 per cent figure did not happen in year one. It is the result of years of consistent, genuine relationship-building. The PTs who understand that this is how sustainable businesses are actually built — not through viral posts but through compounding professional trust — are the ones whose businesses are still standing in ten years.</p>"
    ]),
  },
  {
    slug: "your-website-matters-more-than-instagram",
    title: "Your Most Serious Clients Will Google You, Not Instagram You",
    date: "19 Feb 2027",
    publishDate: "2027-02-19",
    category: "Business",
    excerpt: "Dom Hills gets 80 to 90 per cent of his new business from his website. His core clients are over 35 and they search, not scroll. If you do not have a website, you are invisible to the people most likely to pay a proper rate.",
    image: "/images/20221115-IFE-CF_012.JPG",
    author: HARRY,
    body: clean([
      "<p>There is a version of PT marketing that is entirely Instagram-native — reels, transformation photos, motivational quotes, clips of lifts. It is not useless, and for a specific kind of client it may be exactly right. But Dom Hills describes his actual client base and his actual acquisition channels, and neither of them looks much like Instagram.</p>",
      "<h2>Where Dom's clients actually come from</h2><p>Dom gets the overwhelming majority of his enquiries — his own figure is 80 to 90 per cent — from his website. People search for a personal trainer in his area. His website appears. They read about his approach, look at real testimonials from real named people, and contact him. The clients who find him this way tend to be 35 and above, have disposable income, and are looking for genuine long-term coaching rather than a six-week programme. They are precisely the clients worth having.</p><p>The 22-year-old who discovers you through a reel might become a client, but they are also more likely to be price-sensitive and less likely to commit for the long term. The 42-year-old who has googled you, read your website, and made a considered decision to get in touch has already demonstrated the level of seriousness that tends to make for a good coaching relationship.</p>",
      "<h2>What makes a website work</h2><p>It does not need to be impressive. It needs to be clear, findable, and honest. A description of who you work with and how. Testimonials from real people whose names are visible. A way to get in touch. If you are local, your location should appear prominently so search engines connect you to people searching in your area.</p><p>Dom's point about social proof is worth dwelling on: real people whose identities can be traced are worth more than anonymous five-star reviews. A potential client who can see a testimonial with a real name attached has much stronger grounds to trust you than one looking at a screenshot with no context. Genuine verifiable testimonials are one of the highest-value things you can have on a PT website.</p>",
      "<h2>Social media still has a role</h2><p>This is not an argument for ignoring social media entirely. It has a different job. Social media is where existing contacts and current clients stay connected with what you are doing — it maintains warmth with people who already know you. It is not usually where new serious clients find you for the first time. Understanding which platform does which job means you can use both intelligently, rather than pouring all your energy into content for an audience that is unlikely to convert at the rate you need.</p>"
    ]),
  },
  {
    slug: "take-days-off-or-pay-the-price",
    title: "Working Every Day Will Make You Miserable — and Your Clients Will Notice",
    date: "05 Mar 2027",
    publishDate: "2027-03-05",
    category: "Career",
    excerpt: "A PT who works without days off is not dedicated. They are depleted. And the people paying them are getting the version of them that has nothing left in the tank.",
    image: "/images/20221115-IFE-CF_020.JPG",
    author: HARRY,
    body: clean([
      "<p>Charlie Wade has a line about the period in his early career when he was working every day with only every other Saturday off. He describes the version of himself showing up in those sessions — not the most flattering portrait. His exact words: they come in and I am like, you are a miserable bastard. He was, by his own account, the problem.</p>",
      "<h2>What depletion looks like in practice</h2><p>PT is a job that runs on energy. The attention you bring to a session, the genuine interest you take in the person in front of you, the quality of observation and cuing — all of it requires you to be actually present. A trainer who has worked six days in a row is not present in any meaningful sense. They are physically occupying the space, counting down the sessions until they can stop. Clients may not be able to name exactly what is missing, but they feel it. The session is fine on paper. The energy in the room is flat.</p><p>What clients pay for is not just the programme and not just your knowledge. They pay for the human experience of having someone fully focused on them for an hour. That experience is impossible to deliver when you are running on empty. Enforcing rest days is not a luxury — it is the mechanism by which every session you do deliver is actually worth what you charge.</p>",
      "<h2>The productivity argument for rest</h2><p>Ten excellent sessions in six days beats fourteen mediocre ones in seven. The sessions you miss by taking a day off are compensated by the quality improvement across every session that follows. This is not a speculative claim — it is the same principle you would apply to any client's training programme. Progressive overload requires recovery. The same is true for the professional doing the coaching as it is for the client being coached.</p>",
      "<h2>What structure looks like in practice</h2><p>Charlie settled on two days off per week. That may not be right for everyone — some PTs find one sufficient, some need more if they are also training themselves alongside a full client load. The specific number matters less than the commitment to having the boundary at all. Decide what your days off are before someone asks you for a session on those days. If the boundary is not pre-set, it will erode with every request from a client who wants a technically available slot. Set it, communicate it, and hold it. The discipline of that boundary is what makes the rest of your working time sustainable.</p>"
    ]),
  },
  {
    slug: "the-first-year-is-an-apprenticeship",
    title: "The First Year of PT Is an Apprenticeship — Budget Accordingly",
    date: "19 Mar 2027",
    publishDate: "2027-03-19",
    category: "Career",
    excerpt: "The income figures in PT course marketing describe the ceiling, not the floor. Year one will probably feel closer to an apprenticeship wage than a professional salary. That is not failure — it is how this career works.",
    image: "/images/20221115-IFE-CF_028.JPG",
    author: HARRY,
    body: clean([
      "<p>PT course advertising tends to lead with the upper end of what PTs earn. The implication is that these figures represent what you can expect once you qualify. They do not. They represent what experienced, established PTs earn after years of building a client base and a reputation. A newly qualified PT earning that in year one would be a significant outlier.</p>",
      "<h2>What the first year actually looks like financially</h2><p>Charlie Wade is honest about this in a way that very few people in the PT education space are willing to be: the first year may be equivalent to minimum wage. Not because you are a bad coach, but because you are at the beginning of a career that takes time to build. Building a client base from nothing requires treating every hour of your first year as a combination of work and investment. The sessions you are delivering are real work. The conversations you are having with potential clients, the classes you might be running for free, the relationships you are building in the gym — these are investments that will not pay off immediately.</p><p>Charlie describes roughly two years before PT begins to feel like a real job financially. Our <a href=\"/income\">PT Income &amp; Tax Calculator</a> can help you model what different client loads and session rates look like in real take-home terms - useful for planning what you actually need to earn in year one to stay afloat. This is not meant to be discouraging — it is meant to be accurate. The PTs who go in expecting year-one prosperity and hit minimum-wage months in year two often quit during the hardest phase, just before the compounding they have done starts to pay off.</p>",
      "<h2>The apprenticeship framing</h2><p>Every skilled trade has a learning period where your earning is below what it will eventually become, and where the primary activity is developing competence rather than maximising income. A new electrician does not charge master rates in year one. PT is no different. The framing that treats year one as an apprenticeship — a period where the expectation is learning, not earning at ceiling — is more psychologically accurate and more strategically useful than the one offered in most course brochures.</p>",
      "<h2>What to do with this information</h2><p>Go into year one with your financial situation sorted. That might mean having savings, a part-time job alongside your PT work, or a partner who can carry more of the shared costs for a period. None of this is shameful. It is sensible. The PTs who build real careers are not the ones who had an immediately profitable first year — they are the ones who stayed in the industry long enough to compound the relationships, reputation, and skills that eventually produce full diaries and proper rates. The money follows the work, but only if you are still there when it arrives.</p>"
    ]),
  },
  {
    slug: "find-and-own-your-coaching-style",
    title: "Stop Copying Other PTs and Find Your Own Style",
    date: "02 Apr 2027",
    publishDate: "2027-04-02",
    category: "Career",
    excerpt: "Adam Beard's advice to his younger self: stop mimicking the PT you admire and deliver from your own values. Quiet patches are usually identity crises, not strategy problems.",
    image: "/images/20221115-IFE-CF_035.JPG",
    author: HARRY,
    body: clean([
      "<p>When things get quiet — when the diary is not filling as fast as you need it to, when enquiries dry up, when the comparison to another PT's apparently packed schedule becomes hard to ignore — the temptation is to look at what they are doing and try to replicate it. Adam Beard has thought about this a lot, and his conclusion is that this instinct is usually the wrong one.</p>",
      "<h2>The coaching personality spectrum</h2><p>Adam describes the range of PT archetypes he has observed: the drill sergeant who runs tight, demanding sessions and attracts clients who want exactly that. The sociable sports enthusiast who builds their business on shared passion. The calm, methodical coach whose clients value measured precision. The personality-first coach who makes every session feel more like catching up with a friend. None of these is wrong. Each attracts and retains a specific kind of client who responds to exactly that energy.</p><p>The problem arises when a PT who is naturally one type tries to perform another because they think it is more successful. Clients are perceptive about authenticity in a way that is difficult to fool over time. The PT who performs a version of themselves that does not fit who they actually are exhausts themselves — and sooner or later, the performance becomes visible.</p>",
      "<h2>Why your quiet patches are often identity crises</h2><p>Adam puts it plainly as the thing he would tell his younger self: stick to your own ethics and values in how you deliver your service, rather than trying to copy and mimic. When his own business went quiet, the instinct was to look outward — to see who was busy and figure out what they were doing differently. The real question was usually inward: had he drifted from what he actually believed in and was good at, or was he running a version of his business designed for someone else?</p>",
      "<h2>Attracting the right clients, not the most clients</h2><p>A coaching style that is genuinely yours will attract clients who are a good fit for you. That is a better outcome than a full diary of people who expected a version of you that you had to invent. The clients who fit your natural style tend to stay longer, engage more deeply, and refer people who are similarly well suited. Be the PT you actually are. The right clients will find you.</p>"
    ]),
  },
  {
    slug: "bodybuilding-competition-and-pt-business",
    title: "Dom's 8 Worst Months in Business Were His Best Months on Paper",
    date: "16 Apr 2027",
    publishDate: "2027-04-16",
    category: "Stories",
    excerpt: "When Dom Hills competed in bodybuilding, he was in the best physical shape of his life. He also describes those 8 months as the worst stretch of his PT career. The two things are directly connected.",
    image: "/images/20221115-IFE-CF_042.JPG",
    author: HARRY,
    body: clean([
      "<p>Dom Hills is clear about what his bodybuilding competition prep did to his business. He describes the eight months of it as his worst professional period — and then adds the detail that makes it useful rather than just cautionary: as soon as he finished the competition and started eating normally again, his personality came back, and his clients actually started to like him again. That sequence is worth unpacking.</p>",
      "<h2>What extreme prep does to your coaching</h2><p>The physical demands of competition-level cutting — severe caloric restriction, high training volume, reduced sleep quality, the hormonal consequences of very low body fat — do not leave a person with much left over. Dom describes sitting on a bench while a client deadlifted. Not actively coaching. Just present. The mental bandwidth that good coaching requires was not available because it was being consumed by the metabolic demands of maintaining single-digit body fat.</p><p>This is not unique to Dom. The experience of trying to coach at a high level while simultaneously running an elite prep protocol is widely reported among PTs who have tried it. You can survive it. But the version of you that shows up in sessions during a deep cut is not the version your clients came to you for.</p>",
      "<h2>The signal your condition sends to clients</h2><p>When a PT is in competition condition — visibly extreme, clearly not eating at a normal level — it signals to clients that this is the standard. Most people who hire a PT are not trying to become competitive bodybuilders. They are trying to feel better, move better, lose some weight, manage a health condition. When the person coaching them appears to be operating from a completely different set of goals and a completely different relationship with food, the distance can be disorienting.</p>",
      "<h2>What this means practically</h2><p>Competing in physique sports is a legitimate personal choice. The question is whether it can coexist with running a full coaching practice without one of them suffering. Dom's answer, based on direct experience, is essentially: probably not at the same time. The clients win when they have a coach who is healthy, energised, and fully present. That version of you is usually not compatible with competition prep. Knowing this does not mean giving up personal goals — it means not trying to do both at full intensity simultaneously.</p>"
    ]),
  },
  {
    slug: "what-to-do-with-non-compliant-clients",
    title: "Don't Fire Your Non-Compliant Clients — Pivot Them",
    date: "30 Apr 2027",
    publishDate: "2027-04-30",
    category: "Coaching",
    excerpt: "The client who won't follow their nutrition plan is not failing. They are telling you something about what kind of help they actually need. The right response is a pivot, not a dismissal.",
    image: "/images/20221115-IFE-CF_050.JPG",
    author: HARRY,
    body: clean([
      "<p>There is a reflex that some PTs develop when clients consistently fail to follow through on the plan — a frustration that eventually tips into the idea that the client is simply not motivated enough, and that continuing to work with them is a poor use of everyone's time. Dom Hills challenges this directly, and his counter-argument is worth taking seriously.</p>",
      "<h2>What non-compliance is actually telling you</h2><p>When a client repeatedly fails to execute their nutrition plan, the question worth asking is not why they are not doing what they said they would — it is whether the plan was ever appropriate for their actual life. The client with a stressful job, three young children, and a social life built around restaurants is in a genuinely different situation from the single 28-year-old who meal preps on Sunday and has total control over their kitchen. The same plan applied to both will look like compliance in one case and failure in the other.</p><p>The failure is often in the initial assessment, not in the client's willingness to try. Dom's reframe is simple and useful: if you cannot get them to engage with the goal they originally came to you with, find out what they can engage with, and work with that.</p>",
      "<h2>The pivot approach</h2><p>Dom describes redirecting non-compliant weight-loss clients to strength goals. Instead of tracking a scale number that requires dietary compliance to move, focus on a deadlift total, a number of press-ups, a running distance. These are goals where compliance is observable in the session itself, without depending on what the client does when you are not there. Progress becomes visible. The client starts to feel successful. From that position of success, other behaviour changes often follow more naturally than they would have if the original goal had been pressed harder.</p>",
      "<h2>The category this does not apply to</h2><p>There are some clients whose goals genuinely require a level of engagement they are not willing to bring — and who cannot be pivoted because they have no interest in any alternative outcome. That is a different situation, and a judgment call about whether the relationship is doing either party any good. But this category is smaller than frustrated PTs tend to assume. Most non-compliant clients are not unmotivated — they are stuck in a plan that does not fit their life. Find a plan that does, and the non-compliance often stops.</p>"
    ]),
  },
  {
    slug: "two-types-of-client-accountability-vs-goal",
    title: "The Two Types of Client You Will Work With (and Why Getting It Wrong Is Costly)",
    date: "14 May 2027",
    publishDate: "2027-05-14",
    category: "Coaching",
    excerpt: "Charlie Wade identifies two fundamentally different kinds of PT client. Treating one like the other is one of the most common and quietly costly coaching mistakes you can make.",
    image: "/images/20221115-IFE-CF_058.JPG",
    author: HARRY,
    body: clean([
      "<p>Not all PT clients come to you for the same thing. Charlie Wade has spent years identifying this distinction, and it has changed the way he approaches initial consultations. The core split is between what he calls the accountability client and the goal client. They look similar on the surface. They require very different things from you.</p>",
      "<h2>The accountability client</h2><p>This person knows broadly what to do. They understand the basics of good nutrition. They can train safely on their own. What they struggle with is consistency — showing up, following through, not talking themselves out of a session when life gets busy. They come to a PT not primarily for knowledge but for the external commitment structure. The session in the diary is what makes them do it, rather than the specific content of the session.</p><p>With this client, overcomplicating is the failure mode. An elaborate programme with multiple phases and detailed nutritional targets puts energy into a dimension of the problem they do not actually have. What they need is regular contact, genuine accountability, and a PT who notices when they are slipping and says something about it.</p>",
      "<h2>The goal client</h2><p>This person has a specific finite goal — a wedding in nine months, a marathon in six, a health target set by a doctor. The relationship has a defined shape and a defined end. Their engagement is often high and purposeful during the goal period. The programme needs to be genuinely designed around the goal, with appropriate urgency and structure. Treating them like an accountability client — giving them broadly sensible training without the specificity the goal requires — leaves them underserved.</p>",
      "<h2>Why the first conversation matters</h2><p>Charlie's practice is to establish which type he is working with as early as possible — ideally in the initial consultation, before any programming is discussed. The signals are usually there: is this person describing a specific outcome they want to reach, or a general desire to be more consistent and feel better? The answer changes everything from programme structure to how you measure progress. Getting this right from the start saves months of working at cross-purposes.</p>"
    ]),
  },
  {
    slug: "programme-for-minimum-not-maximum",
    title: "Programme for Minimum Sustainable Commitment, Not Ideal Commitment",
    date: "28 May 2027",
    publishDate: "2027-05-28",
    category: "Coaching",
    excerpt: "If a client says they want to train four times a week, Dom's question is: what is the minimum they will actually do? The answer is usually different — and it matters more than the aspiration.",
    image: "/images/20221115-IFE-CF_065.JPG",
    author: HARRY,
    body: clean([
      "<p>Dom Hills has a question he asks clients who tell him they want to train four times a week. He does not dispute the aspiration. He asks what the minimum is that they can actually commit to. The distinction sounds subtle. Its practical consequences are significant.</p>",
      "<h2>Why aspiration and commitment are not the same thing</h2><p>When someone is in a consultation, motivated and optimistic, four sessions a week feels entirely achievable. In week three, when work gets busy and the motivation of a fresh start has faded, four sessions is four things to find time for. The reality of most people's lives — work commitments, families, irregular hours, the ordinary friction of getting to a gym — means that the aspiration and the sustainable habit often sit at different points on the frequency scale.</p><p>Dom's concern is practical: if you write a four-session programme and the client comes twice, the nutrition calculations are calibrated for four sessions of activity and the client is doing two. The plan no longer matches the reality. The client does not progress as expected, feels like they have failed, even though they have been training consistently twice a week, which is genuinely good. The programme was wrong, not the client.</p>",
      "<h2>Building from minimum to maximum</h2><p>Start the programme at the frequency the client can genuinely sustain in the worst week of their normal life. Two sessions, reliably attended, for three months, produces better results than four sessions attended sporadically and a growing sense of underperformance. Once the habit of attending consistently is established, adding a third session is a progression built on a solid foundation rather than an aspiration that has not been met.</p>",
      "<h2>What this means for goal-setting conversations</h2><p>The initial consultation is where expectations get set. The client who leaves thinking they are going to train four times a week and then finds they can manage two is already in a mild version of failure before anything has happened in the gym. The client who leaves thinking two is the plan, achieves two consistently, and then adds a third when life allows, has a fundamentally different experience of the same reality. Set the client up for success by being honest about what success can realistically look like.</p>"
    ]),
  },
  {
    slug: "the-words-you-use-in-sessions-matter",
    title: "The Words You Use in Coaching Sessions Shape How Clients See Themselves",
    date: "11 Jun 2027",
    publishDate: "2027-06-11",
    category: "Coaching",
    excerpt: '"Has anything been off-plan?" and "what have you done wrong?" ask the same question. Only one creates a coaching relationship that lasts. The small language choices compound over months.',
    image: "/images/20221115-IFE-CF_072.JPG",
    author: HARRY,
    body: clean([
      "<p>Dom Hills uses a specific contrast when he talks about check-in conversations: \"has anything been off-plan this week?\" versus \"what have you done wrong?\" Both questions are asking for the same information. Only one of them creates a space where the client can be honest without feeling ashamed. The difference seems small. Over months of weekly sessions, it is enormous.</p>",
      "<h2>Why shame closes conversations</h2><p>When a client has eaten off-plan, missed a session, or not followed through on something they agreed to, they already know. They have been thinking about it since it happened. If the PT's first question implies accusation — frames the deviation as something they have done wrong rather than something that happened within a normal human life — the client does not become more honest. They become strategic. They minimise, omit, or deflect. The PT loses accurate information needed to adjust the plan, and the client begins to experience coaching as a performance rather than a conversation.</p>",
      "<h2>The compounding effect of language choices</h2><p>A single session's framing does not define a coaching relationship. But the pattern of how you ask questions across dozens of sessions does. Clients who consistently feel judged by check-ins disengage slowly — they become less forthcoming about the things actually going on in their lives, which are exactly the things a PT needs to know to coach them well. The relationship becomes thinner and more transactional, and eventually ends, often without either side being able to say exactly why.</p><p>The alternative pattern — questions framed as genuine curiosity, with no implied verdict — creates a different kind of relationship over the same timeframe. One where clients tell you what is actually happening, where adjustments can be made in real time, and where the coaching reflects reality rather than the version the client thinks they should be presenting.</p>",
      "<h2>The habit of neutral framing</h2><p>Ask what happened rather than what went wrong. Frame conversations as investigation rather than judgment. Be genuinely curious about why the client did not follow through rather than implying they should have. These are not just communication strategies — they reflect a belief about clients that either underpins or undermines your coaching practice. Clients who consistently feel that their PT is on their side, rather than evaluating them, will tell you things that make you significantly better at your job.</p>"
    ]),
  },
  {
    slug: "dont-start-hard-with-new-clients",
    title: "The First Two Weeks With a New Client Are Not About Training Hard",
    date: "25 Jun 2027",
    publishDate: "2027-06-25",
    category: "Coaching",
    excerpt: "Marcin's rule: the first fortnight is talking, movement assessment, and low intensity. The PT who goes hard from day one is usually performing for their own confidence, not coaching for the client's benefit.",
    image: "/images/20230329-IFE-CF_050.JPG",
    author: HARRY,
    body: clean([
      "<p>Marcin from Perun Strength has a structure for the first phase of any new client relationship, and it is worth describing precisely because it runs counter to what a lot of new PTs feel they should be doing. The first two weeks are intentionally unhurried. A lot of talking. Movement assessment at low intensity. Building trust and gathering information before anything demanding is attempted.</p>",
      "<h2>What the first sessions are actually for</h2><p>Before you know how someone moves, you do not know what you are programming for. A client who has chronic tension in their thoracic spine will not get the same thing from a back squat as one who moves freely. A client who has never trained before needs to build an understanding of basic movement patterns before any meaningful loading is appropriate. These are things you can only discover by watching someone move, asking questions, and creating an environment where they feel safe enough to tell you the truth about their history and limitations.</p><p>A PT who begins at high intensity on day one will discover these things too — but reactively, when something goes wrong, rather than proactively, when nothing has been compromised yet. Marcin describes the opening weeks as the foundation on which everything harder is then built safely and appropriately.</p>",
      "<h2>Why new PTs start too hard</h2><p>The pressure to demonstrate value from the first session is real. A new PT wants a client to feel they got something for their money. High intensity is the most legible form of effort — measurable in muscle soreness the next day. The quieter work of movement assessment and relationship-building is harder to invoice. But the client who sees that their PT has genuinely invested in understanding how they move, what their history is, and what they actually need — that client has received something more valuable than a session that left them unable to walk downstairs. They have seen evidence that they are being coached, not just exercised.</p>",
      "<h2>The trust that develops before the hard work starts</h2><p>By the time the training becomes genuinely demanding — which it will, because progression is the point — the client and PT have enough shared context to navigate it well. The PT knows what to watch for. The client trusts they are not going to be pushed into something they are not ready for. That trust is not just nice to have — it is the mechanism by which harder work is actually possible. Build it first.</p>"
    ]),
  },
  {
    slug: "training-habit-not-motivation",
    title: "Stop Trying to Motivate Your Clients. Make Training a Habit Instead.",
    date: "09 Jul 2027",
    publishDate: "2027-07-09",
    category: "Coaching",
    excerpt: "Marcin's question: are you motivated to brush your teeth? The goal of coaching is not to inspire clients before every session. It is to make training a default behaviour that does not require inspiration.",
    image: "/images/HARRY-AND-PARIS-MATTHEWS-20220124-IFE-TGGNCC003.jpg",
    author: HARRY,
    body: clean([
      "<p>Marcin has a simple question he asks when the motivation versus consistency conversation comes up: are you motivated to brush your teeth? The answer is almost always no. You just do it. It is not a choice you make fresh each morning — it is a behaviour so deeply embedded that motivation is irrelevant to its execution. That, he argues, is the actual goal of sustainable fitness coaching. Not inspiration. Not accountability speeches. Habit formation.</p>",
      "<h2>What the PT is actually competing against</h2><p>Marcin is clear about what competes with the gym on a dark November evening: Netflix. A warm sofa. The particular exhaustion of a long week. These are genuine competitors, and a motivational message from a PT they will see in two days is not going to reliably overcome them. The solution is not better motivation — it is making the decision to train feel less like a decision at all.</p><p>Habit formation works when training is attached to an existing behaviour, performed at a consistent time, and experienced as something other than a test of willpower. The client who trains every Monday and Thursday at 7am, regardless of how they feel, is in a completely different relationship with the gym than the client who trains when motivated and skips when not. The first client has removed motivation from the equation. The second is dependent on a resource that runs out.</p>",
      "<h2>How to coach toward habit</h2><p>Consistency trumps intensity in the early stages. A client who comes twice a week for six months, without exception, has built something that the client who comes four times a week for three weeks and then disappears has not. Designing programmes that are sustainable rather than impressive, and reinforcing consistent attendance rather than only celebrating ambitious training weeks, shifts the reward structure toward the behaviour that actually produces long-term results.</p><p>Marcin's suggestion for the client who is struggling on a bad day: go to the gym, do three working sets, and if you still hate it, go home. The arrival is the hardest part. Most clients, once there, will complete the session — because the barrier was the decision to go, not the training itself.</p>",
      "<h2>Your job is to make training something clients just do</h2><p>The PT whose clients eventually train independently, show up consistently, and no longer need to talk themselves into it has done their job. That is not a failure of the coaching relationship — it is the success of it. The habit is the point. Motivation was never the point.</p>"
    ]),
  },
  {
    slug: "small-wins-build-momentum",
    title: "The Make Your Bed Principle: Why Small Wins Change How Clients Feel",
    date: "23 Jul 2027",
    publishDate: "2027-07-23",
    category: "Coaching",
    excerpt: "Charlie Wade used the idea of starting with one small completed task to help clients rebuild momentum during difficult periods. The principle applies to every client who is struggling to get started.",
    image: "/images/BURY-BASKETBALL-HARRY-IFE-TGGNHR_035.jpg",
    author: HARRY,
    body: clean([
      "<p>Charlie Wade describes using Jordan Peterson's make-your-bed idea during the COVID lockdown period when his clients were struggling with motivation, isolation, and the collapse of their normal routines. The principle is straightforward: completing one small task creates a psychological foothold from which the second task becomes more achievable. The first box ticked changes the texture of what follows.</p>",
      "<h2>Why this applies to fitness coaching</h2><p>Clients who come to you having had a difficult relationship with exercise — who have tried before and stopped, who feel behind where they think they should be, who are intimidated by the gym environment — are not lacking motivation in the way that is usually assumed. They are lacking a recent experience of success. The problem is not effort. It is confidence built from evidence.</p><p>The PT who designs early sessions around ambitious goals gives the struggling client more opportunities to fall short. The PT who designs early sessions around achievable, clearly observable wins gives the same client a series of experiences that build a different self-image: I am someone who completes workouts. I am someone who comes back. Those experiences, accumulated over the first weeks and months, are the foundation on which more ambitious goals eventually become reachable.</p>",
      "<h2>What stepping stones look like in practice</h2><p>Charlie describes it as designing the path from where the client actually is to where they want to go, one step at a time. Not starting at the destination and working backwards. Starting at the starting point and identifying what the first achievable step is. That step should be completable within the first session or shortly after. The sense of completion matters. The PT who sends a client home having genuinely finished something — not just participated in something — has given them a different kind of resource to draw on.</p>",
      "<h2>During harder periods, smaller boxes still count</h2><p>Charlie used this approach specifically when life circumstances — COVID, periods of low motivation, personal difficulty — made the full programme temporarily unrealistic. Rather than abandoning training altogether, he and his clients found the smallest version of the habit that could still be maintained: a short walk, a bodyweight session, ten minutes of movement. These seemed small relative to the original programme. They mattered enormously relative to stopping entirely. The habit thread, however thin, was kept intact. When circumstances improved, building from there was far easier than starting from scratch.</p>"
    ]),
  },
  {
    slug: "hiit-before-base-fitness-is-backwards",
    title: "Why HIIT Before Base Fitness Is Backwards",
    date: "06 Aug 2027",
    publishDate: "2027-08-06",
    category: "Training",
    excerpt: "Marcin's question for anyone recommending HIIT to a beginner: can they run at a steady tempo for 15 minutes first? If not, there is no aerobic base for HIIT to work with — and you are setting them up for injury.",
    image: "/images/HARRY-PHONE-2-20220124-IFE-TGGNCC032.jpg",
    author: HARRY,
    body: clean([
      "<p>Marcin has a specific test he applies before considering any kind of high-intensity interval work with a new client: can they sustain a steady, comfortable tempo run for fifteen minutes? If the answer is no, HIIT is not the next step. It is the much later step, for which this is the prerequisite.</p>",
      "<h2>What HIIT actually requires</h2><p>High-intensity interval training works by alternating between near-maximum effort and partial recovery. The recovery intervals are what make the high-intensity efforts possible — and the quality of that recovery depends on the efficiency of the aerobic system. A client who has not built any aerobic base cannot recover meaningfully within the structure of an interval session. What they experience instead is not productive HIIT — it is maximum effort throughout, which produces excessive fatigue, poor form, elevated injury risk, and the kind of post-session experience that makes people never want to exercise again.</p><p>The fitness industry sells HIIT as accessible to beginners because it produces dramatic results and looks engaging on camera. The results it produces are for people who already have base conditioning. For people who do not, it is the wrong prescription applied in the wrong order.</p>",
      "<h2>Building the base first</h2><p>The alternative — steady state cardio at a conversational pace, progressive walking programmes, low-intensity aerobic work done consistently over weeks — builds exactly the aerobic foundation that makes interval training productive later. It does not produce dramatic content. It does not trend on social media. It works. The client who has done six weeks of consistent moderate-intensity cardio before any interval work is introduced is in an entirely different physiological position than the one who skipped straight to the exciting version.</p>",
      "<h2>The client management dimension</h2><p>Clients often arrive wanting HIIT specifically because they have read about it and believe it to be the most effective approach to fat loss. Managing that expectation honestly — explaining why the base-building phase is not just tolerable but necessary — is part of the PT's job. A client who understands why they are doing what they are doing is far more likely to stick with it than one who feels their goals are being ignored. Explain the sequencing. Then get them to a place where the HIIT they wanted is actually appropriate.</p>"
    ]),
  },
  {
    slug: "why-clients-think-deload-is-cheating",
    title: "Why Clients Think the Deload Week Is Cheating — and Why You Need to Explain It Better",
    date: "20 Aug 2027",
    publishDate: "2027-08-20",
    category: "Training",
    excerpt: "Marcin calls the deload 'black magic' to most clients. They feel cheated by a lighter week. The reason it never gets explained properly is that it is not exciting content. Here is why it matters.",
    image: "/images/HARRY-PHONE-20220124-IFE-TGGNCC033.jpg",
    author: HARRY,
    body: clean([
      "<p>Marcin uses the phrase black magic when describing how most clients react to seeing a deload week in their programme. Their response is some version of: this feels like nothing, I came here to train hard, this is a waste of a session. The explanation for why this week is not a step backwards but a structural requirement of the weeks that follow does not go viral — which is why almost nobody explains it, and almost every client has to be educated about it directly.</p>",
      "<h2>What adaptation actually looks like</h2><p>The body adapts to a training stimulus during recovery, not during the stimulus itself. The progressive overload you apply across a training block accumulates not just in the muscles you are loading but in the connective tissue, the joints, and the nervous system. By week three or four of a hard block, accumulated fatigue is masking the adaptations that have been taking place. The client often feels weaker in week four than they did in week two, not because they have lost fitness but because fatigue is obscuring what is there.</p><p>The deload removes the fatigue. When the client comes back in week five, the adaptations from the preceding block become visible in their performance for the first time. Strength feels better. Movement quality improves. The body has had the opportunity to fully process what it was asked to do. This is not a coincidence — it is the mechanism working correctly.</p>",
      "<h2>Why clients train through deloads</h2><p>The culture of fitness rewards effort and punishes anything that looks like rest. A client who has absorbed enough of that culture will treat a lighter week as evidence that their PT is not pushing them hard enough, or that they should add more themselves. The PT who has not explained the reasoning beforehand cannot easily intervene once the client has already decided the deload is unnecessary. The explanation has to come first.</p>",
      "<h2>What to tell them</h2><p>Keep it simple. The training blocks are when you apply the stimulus. The deload is when your body processes it and turns it into actual adaptation. Skipping the deload is like interrupting the processing before it is done. The weeks of hard work that precede a deload only produce their full return if the deload follows. Clients who understand this typically become advocates for their own recovery — which is a far more useful place to have them than in the gym secretly doing extra sessions on their rest days.</p>"
    ]),
  },
  {
    slug: "the-exercises-nobody-posts-about",
    title: "The Exercises Nobody Posts About Are the Ones That Actually Work",
    date: "03 Sep 2027",
    publishDate: "2027-09-03",
    category: "Training",
    excerpt: "Marcin's clients make the most dramatic progress from resistance bands, isometric holds, and controlled tempo work — the exercises that never trend because they are not visually impressive.",
    image: "/images/20221115-IFE-CF_005.JPG",
    author: HARRY,
    body: clean([
      "<p>Marcin makes an observation about social media fitness content that anyone who has spent time watching exercise videos will recognise: the most dramatic-looking exercises are the ones that trend, and the most effective exercises are almost never dramatic-looking. The correlation between virality and effectiveness is close to zero. It may even be negative.</p>",
      "<h2>What actually breaks clients</h2><p>Marcin's description of the exercises that produce the most significant responses in his clients is instructive: resistance bands. Isometric holds. Controlled tempo work. Simple, fundamental progressions on basic movement patterns. These are the things that expose weaknesses most clearly and address them most effectively. A client who has never done a proper isometric hold in a challenging position will find it genuinely taxing — not because they lack fitness in any conventional sense, but because they have never trained their system in this way.</p><p>The problem is that these exercises do not look impressive to an outside observer. They do not produce content that gets shared. The PT who programmes resistance band work for a client who expected to be loading a barbell has to do some explaining — because the visual signal suggests something less serious than what the client is actually experiencing.</p>",
      "<h2>Why this matters for client education</h2><p>Clients who have been shaped by fitness media tend to equate production value with effectiveness. The exercise that requires a cable machine and a specific tempo looks like it belongs in a serious programme. The bodyweight isometric in a challenging position does not, until you try it properly. Part of a PT's job is recalibrating that expectation — not by dismissing what the client came with, but by demonstrating through experience that the unsexy version is the one that produces results.</p><p>Once a client has done a properly executed isometric or worked through a genuinely controlled tempo on an exercise they thought they knew, they usually need no further persuasion. The exercise does the arguing for you.</p>",
      "<h2>What this means for your programming</h2><p>Do not programme for the content. Programme for the outcome. The exercises that will produce the most significant adaptations in a given client may not be the ones they expected and are not the ones they would have found on their own. That gap between expectation and effective prescription is part of what they are paying you for.</p>"
    ]),
  },
  {
    slug: "fix-sleep-before-supplements",
    title: "Fix Your Sleep Before You Ask About Supplements",
    date: "17 Sep 2027",
    publishDate: "2027-09-17",
    category: "Training",
    excerpt: "The client asking about cortisol-blocking supplements before addressing their sleep is asking the wrong question. Marcin's response: blackout blinds, last coffee time, phone off before bed — not a pill.",
    image: "/images/20221115-IFE-CF_012.JPG",
    author: HARRY,
    body: clean([
      "<p>Marcin describes a type of conversation he has regularly: a client presenting with elevated stress, poor recovery, and difficulty losing weight despite effort in the gym, asking about cortisol-blocking supplements. His first question is always the same: what is the sleep situation? The supplement question is usually premature.</p>",
      "<h2>Why sleep is the unsexy first fix</h2><p>Sleep hygiene content does not get likes. Blackout blinds and cutting off caffeine by early afternoon do not trend. Nobody builds an audience by telling people to put their phone down at ten o'clock. But the honest assessment of most people's recovery situation is that these unglamorous interventions would make a more meaningful difference to their cortisol, body composition, and training quality than anything available in supplement form.</p><p>Marcin's framing is direct: why are you asking about a pill to counter elevated cortisol before finding out why your sleep is poor in the first place? The cortisol is a symptom. The disrupted sleep is likely the cause. Treating the symptom while leaving the cause alone is an inefficient strategy regardless of how well-marketed the supplement is.</p>",
      "<h2>What actually drives supplement culture</h2><p>Marcin observes that the pre-workout conversation is often an early indicator of how much a client has absorbed from supplement marketing. A client whose first question is about pre-workout has already decided that the intervention they need is external and purchased rather than behavioural. The practical redirect — if a strong black coffee does not get you up for a workout, you probably do not need to train that day — is both accurate and useful. The active ingredient in most pre-workout products is caffeine. If that is what you need, you already have access to it in a form that does not cost twelve pounds a bag.</p>",
      "<h2>The coaching conversation around sleep</h2><p>Bringing sleep quality into regular check-ins is underused by many PTs. A client sleeping five hours a night and reporting poor recovery, mood fluctuations, and stalled progress is not a client with a training problem. They have a sleep problem expressing itself in their training. The programme you can give them is limited by the recovery environment they are going home to. Addressing that environment honestly — even at the risk of suggesting the less exciting intervention — is the work of a good coach rather than a good salesperson.</p>"
    ]),
  },
  {
    slug: "transformation-photos-are-dishonest",
    title: "Why Honest Coaches Won't Use Transformation Photos",
    date: "01 Oct 2027",
    publishDate: "2027-10-01",
    category: "Business",
    excerpt: "Marcin had a client who achieved outstanding results. He chose not to use those results as marketing. The reason is not modesty — it is honesty about what one person's results can promise to another.",
    image: "/images/20221115-IFE-CF_020.JPG",
    author: HARRY,
    body: clean([
      "<p>Marcin describes having a client who did everything right: consistent training, dialled nutrition, full commitment over a significant period. The results were outstanding — the kind that would look compelling in any before and after post. He declined to use them as marketing. His explanation for why is worth hearing.</p>",
      "<h2>What a transformation photo actually promises</h2><p>When you show a prospective client a dramatic transformation, you are implicitly offering them something. Not intentionally, perhaps, but the message lands regardless: this is what happens when you work with me. The person looking at that photo is comparing it to themselves, imagining their own version of that result, and using it as part of their decision to invest. The post is marketing. Marketing makes promises.</p><p>Marcin's objection is statistical. Even if a new client followed the exact same protocol as the client whose transformation is being shown — same training, same nutrition, same consistency, same duration — the result would not necessarily be the same. Genetics, starting point, hormonal context, stress load, sleep quality, age, and dozens of other individual variables mean that one person's outcome is genuinely not predictable from another's. Showing the best result and implying replicability is not technically dishonest, but it is structurally misleading.</p>",
      "<h2>The alternative</h2><p>Marcin compares it to measuring progress against yourself rather than against someone else. What this client achieved relative to where they started is the honest metric. Their progress is real, measurable, and worth celebrating. What it cannot honestly be used for is a promise to a different person starting from a different place. The coaching that produced that result is still worth having — but it should be sold on the quality of the coaching, not on the most exceptional outcome it has produced.</p>",
      "<h2>What this says about the transformation photo industry</h2><p>The transformation photo model selects for the best outcomes and presents them as typical. This creates a specific harm: the client who follows a programme faithfully, achieves genuinely good results, but does not match the before and after they saw in the marketing, and concludes they have failed. That conclusion is drawn from a comparison to an outlier presented as a norm. A coaching industry that used honest, representative outcomes would have a different relationship with its clients' self-image. Some coaches have decided to start from their end of that change.</p>"
    ]),
  },
  {
    slug: "the-pt-posturing-problem",
    title: "You're Not in the Trenches. You're in the Staffroom With a Tupperware Lid.",
    date: "15 Oct 2027",
    publishDate: "2027-10-15",
    category: "Industry",
    excerpt: "Marcin has a specific critique of the performative hustle culture that describes ordinary PT work as frontline warfare. The posturing harms the profession and flatters mediocrity.",
    image: "/images/20221115-IFE-CF_028.JPG",
    author: HARRY,
    body: clean([
      "<p>There is a vocabulary that has developed in fitness professional circles for describing the experience of working as a PT. The trenches. The front lines. Being in the thick of it. The language is borrowed from places where those metaphors have actual weight — and Marcin has a fairly unambiguous view of how it applies to someone spending most of their shift in the staffroom with a Tupperware lid.</p>",
      "<h2>What posturing culture actually does</h2><p>The performance of intensity around ordinary work serves several functions, none of them particularly useful. It inflates the perceived difficulty of the job in a way that excuses mediocre output — if you are already heroically in the trenches, nobody can ask more of you. It creates a solidarity ritual among practitioners who validate each other's performance without examining whether the work actually merited it. And it signals to people considering the profession that survival requires constant maximum effort, which confuses grind with quality.</p><p>Marcin's critique is specific: the PT who describes themselves as on the front lines while spending half their working hours scrolling through Instagram in the staffroom is not just performing for an external audience. They are telling themselves a story about their work that does not match reality. The performance gets in the way of honest self-assessment, which gets in the way of improvement.</p>",
      "<h2>What the actual work looks like</h2><p>Good PT work is consistent, patient, and not dramatic. It is sessions delivered with full attention across a full working week, including the weeks when you are tired or the client is difficult. It is the follow-up message sent after a session where something felt off. It is the programme adjusted because a client mentioned a sleep problem and you changed the loading accordingly. It is the quiet accumulation of things done properly over a long period of time. None of this is trench warfare. It is professional practice, done well.</p>",
      "<h2>Why standards protect everyone</h2><p>Marcin makes a point that goes beyond personal practice: when one PT behaves badly or performs incompetently, the effect on the profession's reputation is not contained to that PT. The client who was let down by one person does not make a precise distinction between that individual and personal trainers as a category. The collective reputation takes a hit. This is an argument for taking standards seriously not just out of individual integrity but because the alternative has costs shared across everyone who does this job. The posturing culture that flatters mediocrity lowers the floor for what clients expect — and eventually for what PTs deliver.</p>"
    ]),
  },
];

export function getPublishedPosts(): BlogPost[] {
  const today = new Date();
  return allBlogPosts
    .filter((p) => new Date(p.publishDate) <= today)
    .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return allBlogPosts.find((p) => p.slug === slug);
}