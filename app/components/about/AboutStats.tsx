const stats = [
  { value: "100%", label: "Pass Rate" },
  { value: "1:1", label: "Personalised Tuition" },
  { value: "2015", label: "Established" },
  { value: "CIMSPA", label: "Accredited" },
];

export default function AboutStats() {
  return (
    <section className="bg-[#111111]">
      <div className="reveal mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-white/10">
          {stats.map((stat) => (
            <div key={stat.label} className="py-16 px-10 text-center">
              <p className="text-5xl md:text-6xl font-bold text-white mb-3 leading-none">
                {stat.value}
              </p>
              <p className="text-white text-xs uppercase tracking-[3px] font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
