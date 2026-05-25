const items = [
  "CIMSPA Accredited",
  "1:1 Learning",
  "Active IQ",
  "Norwich, Norfolk",
  "Real Results",
  "Industry Leading",
  "Career Ready",
];

export default function Marquee() {
  return (
    <div className="relative bg-[#CE1A19] py-10 overflow-hidden">
      <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#CE1A19] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#CE1A19] to-transparent z-10 pointer-events-none" />
      <div className="flex animate-marquee whitespace-nowrap">
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center text-white text-s font-bold uppercase tracking-[0.25em] mx-6"
          >
            {item}
            <span className="ml-6 text-white/40 text-[8px]">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
