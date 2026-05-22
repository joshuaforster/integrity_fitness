import Image from "next/image";

const panels = [
  {
    title: "Who Are We?",
    cta: "About Us",
    href: "/about-us",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80",
  },
  {
    title: "Get In Touch",
    cta: "Contact Us",
    href: "/contact",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80",
  },
];

export default function CTAPanels() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2">
      {panels.map((panel) => (
        <a
          key={panel.title}
          href={panel.href}
          className="relative h-[480px] overflow-hidden group block"
        >
          <Image
            src={panel.image}
            alt=""
            fill
            className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
          />

          {/* Base overlay */}
          <div className="absolute inset-0 bg-black/60 group-hover:bg-black/50 transition-colors duration-500" />
          {/* Gradient darkening towards centre for text legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/60" />

          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
            <p className="text-white text-xs font-semibold tracking-[4px] uppercase mb-4 opacity-70">
              Integrity Fitness Education
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight drop-shadow-lg">
              {panel.title}
            </h2>
            <span className="bg-[#CE1A19] text-white border border-white/30 px-8 py-3.5 text-xs font-semibold tracking-widest uppercase group-hover:bg-red-700 transition-colors duration-300">
              {panel.cta}
            </span>
          </div>
        </a>
      ))}
    </section>
  );
}
