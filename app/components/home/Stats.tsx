import Link from "next/link";

const stats = [
  { value: "100%", label: "Pass Rate" },
  { value: "1:1", label: "Personalised Learning" },
  { value: "Level 3", label: "Qualified Instructors" },
  { value: "CIMSPA", label: "Accredited" },
];

export default function Stats() {
  return (
    <section className="bg-gray-100 py-24">
      <div className="reveal mx-auto max-w-5xl px-6 lg:px-8 text-center">

        <p className="text-[#CE1A19] text-xs font-semibold tracking-[4px] uppercase mb-4">
          Why Integrity
        </p>
        <h2 className="text-4xl md:text-5xl font-bold text-black leading-tight">
          Everything You Need To Succeed
        </h2>
        <div className="w-14 h-1 bg-[#CE1A19] mx-auto mt-6 mb-16" />

        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-gray-200 border border-gray-200">
          {stats.map((stat) => (
            <div key={stat.label} className="py-12 px-6">
              <p className="text-5xl font-bold text-[#CE1A19] mb-3">
                {stat.value}
              </p>
              <p className="text-gray-500 text-xs uppercase tracking-widest font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <Link
            href="/contact"
            className="inline-block bg-[#CE1A19] text-white px-10 py-4 text-sm font-semibold tracking-widest uppercase hover:bg-red-700 transition-colors"
          >
            Start Your Journey
          </Link>
        </div>

      </div>
    </section>
  );
}
