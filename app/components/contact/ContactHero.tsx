import Image from "next/image";

export default function ContactHero() {
  return (
    <section className="relative min-h-[55vh] bg-[#0D0D0D] overflow-hidden flex items-end -mt-[80px]">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1400&q=80"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/65 to-black/25" />
      </div>
      <div className="relative z-10 w-full">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 pb-20 pt-48">
          <p className="flex items-center gap-3 text-white text-xs font-semibold tracking-[4px] uppercase mb-6">
            <span className="w-6 h-px bg-[#CE1A19]" />
            Integrity Fitness Education
          </p>
          <h1 className="text-7xl md:text-[100px] font-bold text-white leading-none uppercase tracking-tight">
            Get In<br />Touch
          </h1>
          <div className="w-14 h-1 bg-[#CE1A19] mt-8 mb-6" />
          <p className="text-white text-lg max-w-xl leading-relaxed">
            Have a question about our courses or want to start your journey?
            We&apos;d love to hear from you.
          </p>
        </div>
      </div>
    </section>
  );
}
