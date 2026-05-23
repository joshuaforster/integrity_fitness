import Link from "next/link";

export default function AboutCTA() {
  return (
    <section className="bg-white py-28">
      <div className="reveal mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left — text */}
          <div>
            <p className="text-[#CE1A19] text-xs font-semibold tracking-[4px] uppercase mb-5">
              Ready To Start?
            </p>
            <h2 className="text-5xl md:text-6xl font-bold text-black leading-tight uppercase mb-6">
              Take The
              <br />First Step.
            </h2>
            <div className="w-14 h-1 bg-[#CE1A19] mb-8" />
            <p className="text-gray-600 text-lg leading-relaxed mb-10">
              Whether you&apos;re looking to start your journey in personal
              training or take your existing career to the next level, we
              have a qualification built around you.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/qualifications"
                className="bg-[#CE1A19] text-white px-10 py-4 text-sm font-semibold tracking-widest uppercase hover:bg-red-700 transition-colors"
              >
                View Qualifications
              </Link>
              <Link
                href="/contact"
                className="border-2 border-black text-black px-10 py-4 text-sm font-semibold tracking-widest uppercase hover:bg-black hover:text-white transition-colors"
              >
                Get In Touch
              </Link>
            </div>
          </div>

          {/* Right — dark pull-quote panel */}
          <div className="bg-[#0D0D0D] p-12">
            <p className="text-[#CE1A19] text-xs font-semibold tracking-[4px] uppercase mb-6">
              Defined By
            </p>
            <p className="text-white text-4xl font-bold uppercase leading-tight mb-8">
              Honesty &amp; Strong Moral Principles.
            </p>
            <div className="space-y-4">
              {[
                "CIMSPA Accredited",
                "Active IQ Qualifications",
                "100% Pass Rate",
                "One-To-One Learning",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <span className="w-4 h-px bg-[#CE1A19] flex-shrink-0" />
                  <p className="text-white text-sm tracking-wide">{item}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
