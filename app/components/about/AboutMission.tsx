import Link from "next/link";

const differentiators = [
  "One-to-one learning tailored entirely to you",
  "CIMSPA accredited, internationally recognised qualifications",
  "100% pass rate across all students",
  "A community that supports you long after the course ends",
];

export default function AboutMission() {
  return (
    <section className="bg-white py-28">
      <div className="reveal mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 lg:gap-24 items-start">

          {/* Left — statement */}
          <div className="lg:col-span-3">
            <p className="text-[#CE1A19] text-xs font-semibold tracking-[4px] uppercase mb-6">
              Our Mission
            </p>
            <h2 className="text-5xl md:text-6xl font-bold text-black leading-tight uppercase mb-6">
              Education That
              <br />Actually Changes
              <br />Your Life.
            </h2>
            <div className="w-14 h-1 bg-[#CE1A19] mb-8" />
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Since 2015, Integrity Fitness Education has been rewriting the
              rules of personal training education in Norwich, Norfolk. Where
              others offer courses, we offer transformation — the kind that
              sticks.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              Harry founded IFE after seeing firsthand how impersonal and
              inadequate the standard fitness education model was. Every
              decision since has been made with one question in mind: what
              gives our students the best possible chance of building a career
              they love?
            </p>
          </div>

          {/* Right — differentiators */}
          <div className="lg:col-span-2 lg:pt-24">
            <p className="text-black text-xs font-semibold tracking-[4px] uppercase mb-8">
              What Sets Us Apart
            </p>
            <ul className="space-y-6">
              {differentiators.map((item) => (
                <li key={item} className="flex items-start gap-4">
                  <span className="w-6 h-px bg-[#CE1A19] mt-3 flex-shrink-0" />
                  <p className="text-gray-700 text-base leading-relaxed">{item}</p>
                </li>
              ))}
            </ul>
            <Link
              href="/qualifications"
              className="inline-block mt-12 bg-[#CE1A19] text-white px-8 py-4 text-sm font-semibold tracking-widest uppercase hover:bg-red-700 transition-colors"
            >
              View Qualifications
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
