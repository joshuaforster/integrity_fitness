import Image from "next/image";

export default function AboutHero() {
  return (
    <section className="relative min-h-screen bg-[#0D0D0D] overflow-hidden flex items-end -mt-[80px]">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=1400&q=80"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/20" />
      </div>

      <div className="relative z-10 w-full">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 pb-28 pt-48">
          <p className="flex items-center gap-3 text-white text-xs font-semibold tracking-[4px] uppercase mb-6">
            <span className="w-6 h-px bg-[#CE1A19]" />
            Integrity Fitness Education
          </p>
          <h1 className="text-7xl md:text-[120px] font-bold text-white leading-none uppercase tracking-tight">
            About<br />Us
          </h1>
          <div className="w-14 h-1 bg-[#CE1A19] mt-8 mb-8" />
          <p className="text-white text-xl max-w-2xl leading-relaxed">
            We don&apos;t just teach qualifications.
            We build careers that last.
          </p>
        </div>
      </div>
    </section>
  );
}
