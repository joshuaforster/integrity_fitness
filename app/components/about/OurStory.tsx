"use client";

import Image from "next/image";

const TEAM = [
  {
    name: "Harry",
    role: "Founder & Lead Tutor",
    image: "/harry.png",
    meta: "Est. 2015",
    bio: [
      "After completing the combined Level 2 & 3 Personal Training Diploma, Harry began his career as a self-employed PT at The Gym Group in Norwich. After building his client base and specialising in exercise referral, he established a reputation that led to a role as a tutor and assessor.",
      "Over the next 5 years he worked with hundreds of students, finding the same passion for helping people that first attracted him to personal training. He built a team of likeminded individuals under a unified company: Integrity Fitness Education.",
    ],
  },
  {
    name: "Paris",
    role: "Tutor & Assessor",
    image: "/paris.webp",
    meta: "Advanced Coach",
    bio: [
      "Paris qualified as a personal trainer and started working in the same gym as Harry. She made a strong impression by helping plenty of clients alongside her continued professional development, gaining certificates in spinning and supporting pre and post natal populations.",
      "Harry saw the potential for her to be a great teacher and she exceeded expectations with how she brought the course alive for all of her learners. She's more motivated than ever to bring the best possible experience here at IFE.",
    ],
  },
] as const;

export default function OurStory() {
  return (
    <section
      aria-labelledby="team-heading"
      className="bg-zinc-50 py-20 md:py-28 border-t border-zinc-200/80"
    >
      <div className="reveal mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header Stack */}
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
          <p className="text-[#CE1A19] text-xs font-bold tracking-[4px] uppercase mb-4">
            The People Behind IFE
          </p>
          <h2
            id="team-heading"
            className="text-3xl md:text-5xl font-black text-zinc-950 tracking-tight leading-tight uppercase"
          >
            The IFE Team
          </h2>
          <div
            className="w-14 h-1 bg-[#CE1A19] mx-auto mt-6 mb-6"
            aria-hidden="true"
          />
          <p className="text-zinc-600 text-base md:text-lg leading-relaxed">
            Built on passion, driven by integrity. Two coaches who love what
            they do — and love helping others do it too.
          </p>
        </div>

        {/* Unboxed Minimal Column Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12 items-start">
          {TEAM.map((person) => (
            <div key={person.name} className="flex flex-col items-start group">
              {/* Premium Image Container */}
              <div className="relative h-[480px] w-full overflow-hidden bg-zinc-200 rounded-sm shadow-sm border border-zinc-300/40">
                <Image
                  src={person.image}
                  alt={
                    person.name === "Paris"
                      ? "Paris, Tutor & Assessor at Integrity Fitness Education"
                      : `${person.name}, ${person.role}`
                  }
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                  priority
                />
              </div>

              {/* Profile Identity Details Bar */}
              <div className="w-full pt-6 pb-4 flex items-baseline justify-between border-b border-zinc-200">
                <div>
                  <h3 className="text-zinc-950 font-black text-xl uppercase tracking-wide">
                    {person.name}
                  </h3>
                  <p className="text-[#CE1A19] text-xs font-bold tracking-widest uppercase mt-1">
                    {person.role}
                  </p>
                </div>
                <span className="text-zinc-400 text-xs font-bold tracking-[2px] uppercase whitespace-nowrap">
                  {person.meta}
                </span>
              </div>

              {/* Clean Left-Border Bio Text Area */}
              <div className="mt-5 border-l-2 border-zinc-200 pl-6 space-y-4">
                {person.bio.map((para, i) => (
                  <p
                    key={i}
                    className="text-zinc-600 text-sm md:text-base leading-relaxed"
                  >
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
