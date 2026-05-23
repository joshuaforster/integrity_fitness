import Image from "next/image";

export default function FaqHero() {
  return (
    <section className="relative min-h-[60vh] bg-[#0D0D0D] overflow-hidden flex items-end -mt-[80px]">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1400&q=80"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/40" />
      </div>
      <div className="relative z-10 w-full">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 pb-20 pt-48">
          <p className="text-[#CE1A19] text-xs font-semibold tracking-[4px] uppercase mb-5">
            Got Questions?
          </p>
          <h1 className="text-6xl md:text-8xl font-bold text-white leading-none uppercase tracking-tight">
            FAQs
          </h1>
          <div className="w-14 h-1 bg-[#CE1A19] mt-6 mb-6" />
          <p className="text-white text-lg max-w-xl leading-relaxed">
            Everything you need to know about studying with Integrity Fitness Education.
          </p>
        </div>
      </div>
    </section>
  );
}
