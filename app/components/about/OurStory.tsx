import Image from "next/image";

const team = [
  {
    name: "Harry",
    role: "Founder & Lead Tutor",
    image: "/harry.png",
    since: "Since 2015",
    bio: [
      "After completing the combined Level 2 & 3 Personal Training Diploma, Harry began his career as a self-employed PT at The Gym Group in Norwich. After building his client base and specialising in exercise referral, he established a reputation that led to a role as a tutor and assessor.",
      "Over the next 5 years he worked with hundreds of students, finding the same passion for helping people that first attracted him to personal training. He built a team of likeminded individuals under a unified company: Integrity Fitness Education.",
    ],
  },
  {
    name: "Paris",
    role: "Tutor & Assessor",
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80",
    since: "The Team",
    bio: [
      "Paris qualified as a personal trainer and started working in the same gym as Harry. She made a strong impression by helping plenty of clients alongside her continued professional development, gaining certificates in spinning and supporting pre and post natal populations.",
      "Harry saw the potential for her to be a great teacher and she exceeded expectations with how she brought the course alive for all of her learners. She's more motivated than ever to bring the best possible experience here at IFE.",
    ],
  },
];

export default function OurStory() {
  return (
    <section className="bg-[#0D0D0D] py-28">
      <div className="reveal mx-auto max-w-7xl px-6 lg:px-8">

        <div className="text-center max-w-2xl mx-auto mb-20">
          <p className="text-[#CE1A19] text-xs font-semibold tracking-[4px] uppercase mb-5">
            The People Behind IFE
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight uppercase">
            The IFE Founders
          </h2>
          <div className="w-14 h-1 bg-[#CE1A19] mx-auto mt-6 mb-8" />
          <p className="text-white text-lg leading-relaxed">
            Built on passion, driven by integrity. Two coaches who love what
            they do — and love helping others do it too.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {team.map((person) => (
            <div key={person.name} className="group">
              {/* Portrait */}
              <div className="relative h-[500px] overflow-hidden">
                <Image
                  src={person.image}
                  alt={person.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>

              {/* Name bar */}
              <div className="bg-[#CE1A19] px-8 py-5 flex items-center justify-between">
                <p className="text-white font-bold text-xl uppercase tracking-widest">
                  {person.name}
                </p>
                <p className="text-white text-xs tracking-[3px] uppercase">
                  {person.since}
                </p>
              </div>

              {/* Bio */}
              <div className="bg-[#1A1A1A] px-8 py-10">
                <p className="text-[#CE1A19] text-xs font-semibold tracking-[3px] uppercase mb-5">
                  {person.role}
                </p>
                {person.bio.map((para, i) => (
                  <p key={i} className="text-white text-base leading-relaxed mb-4 last:mb-0">
                    {para}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
