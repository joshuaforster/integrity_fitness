const qualifications = [
  {
    category: "Become a Personal Trainer",
    courses: [
      {
        title: "Combined Level 2 & 3 Personal Training Diploma",
        href: "/become-a-personal-trainer",
        featured: true,
      },
      {
        title: "Level 2 Gym Instructor Certificate",
        href: "/aiq_level_2_certificate_in_gym_instructing",
        featured: false,
      },
      {
        title: "Level 3 Personal Training Qualification",
        href: "/aiq_level_3_personal_training_qualification",
        featured: false,
      },
    ],
  },
  {
    category: "Continued Professional Development",
    courses: [
      {
        title: "Level 2 Award in Mental Health Awareness",
        href: "/l2-mental-health-awareness-aiq-qualification",
        featured: false,
      },
      {
        title: "Level 3 Award in Supporting Pre & Post Natal Clients",
        href: "/level-3-award-in-supporting-pre-and-post-natal-clients-with-exercise-nutrition",
        featured: false,
      },
      {
        title: "Level 3 Award in Emergency First Aid at Work",
        href: "/emergency-first-aid-at-work",
        featured: false,
      },
    ],
  },
];

export default function Qualifications() {
  return (
    <section className="bg-[#111111] py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        <div className="mb-16">
          <p className="text-white text-xs font-semibold tracking-[4px] uppercase mb-4">
            What We Offer
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight max-w-2xl">
            Qualifications Built For Real Careers
          </h2>
          <div className="w-14 h-1 bg-[#CE1A19] mt-6" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-12">
          {qualifications.map((group) => (
            <div key={group.category}>
              <div className="flex items-center gap-3 mb-6">
                <span className="w-1 h-4 bg-[#CE1A19] inline-block" />
                <p className="text-white text-xs uppercase tracking-widest font-semibold">
                  {group.category}
                </p>
              </div>
              <div className="space-y-3">
                {group.courses.map((course) => (
                  <a
                    key={course.title}
                    href={course.href}
                    className={`flex items-center justify-between p-5 border transition-all duration-200 group ${
                      course.featured
                        ? "border-[#CE1A19] bg-[#CE1A19]/10 hover:bg-[#CE1A19]/20"
                        : "border-white/15 hover:border-[#CE1A19]/60 hover:bg-white/[0.03]"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      {course.featured && (
                        <span className="text-[10px] uppercase tracking-widest text-[#CE1A19] border border-[#CE1A19] px-2 py-0.5 font-semibold whitespace-nowrap">
                          Popular
                        </span>
                      )}
                      <span className="text-white font-medium text-sm leading-snug">
                        {course.title}
                      </span>
                    </div>
                    <span className="text-[#CE1A19] text-lg flex-shrink-0 ml-4 group-hover:translate-x-1 transition-transform duration-200">
                      →
                    </span>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-10 border-t border-white/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <p className="text-white text-base max-w-lg">
            Not sure which qualification is right for you? Get in touch and
            we&apos;ll point you in the right direction.
          </p>
          <a
            href="/qualifications"
            className="flex-shrink-0 bg-[#CE1A19] text-white px-8 py-4 text-sm font-semibold tracking-widest uppercase hover:bg-red-700 transition-colors"
          >
            See All Qualifications
          </a>
        </div>

      </div>
    </section>
  );
}
