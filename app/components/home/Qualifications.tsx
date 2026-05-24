import Button from "@/app/components/Button";

const qualifications = [
  {
    category: "Become a Personal Trainer",
    courses: [
      {
        title: "Combined Level 2 & 3 Personal Training Diploma",
        href: "/qualifications/become-a-personal-trainer",
        featured: true,
      },
      {
        title: "Level 2 Gym Instructor Certificate",
        href: "/qualifications/level-2-gym-instructor",
        featured: false,
      },
      {
        title: "Level 3 Personal Training Qualification",
        href: "/qualifications/level-3-personal-training",
        featured: false,
      },
    ],
  },
  {
    category: "Continued Professional Development",
    courses: [
      {
        title: "Level 2 Award in Mental Health Awareness",
        href: "/qualifications/mental-health-awareness",
        featured: false,
      },
      {
        title: "Level 3 Award in Supporting Pre & Post Natal Clients",
        href: "/qualifications/pre-post-natal",
        featured: false,
      },
      {
        title: "Level 3 Award in Emergency First Aid at Work",
        href: "/qualifications/emergency-first-aid",
        featured: false,
      },
    ],
  },
];

export default function Qualifications() {
  return (
    <section className="bg-[#1D1D1D] py-24">
      <div className="reveal mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-16">
          <p className="text-white text-xs font-semibold tracking-[4px] uppercase mb-4">
            What We Offer
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
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
                        ? "border-[#CE1A19] bg-[#111111] hover:bg-[#CE1A19]/20"
                        : "border-white/15 bg-[#111111] hover:border-[#CE1A19]/60 hover:bg-white/[0.03]"
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

        <div className="mt-16 pt-10 border-t border-white/15">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="flex-1">
              <p className="text-white/50 text-xs font-semibold tracking-[3px] uppercase mb-2">
                Not sure where to start?
              </p>
              <p className="text-white text-base leading-relaxed">
                Get in touch and we&apos;ll point you in the right direction.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
              <Button href="/qualifications" variant="primary">See All Qualifications</Button>
              <Button href="/contact" variant="outline-dark">Get In Touch</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
