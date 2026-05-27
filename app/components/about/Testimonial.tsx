"use client";

export default function Testimonial() {
  return (
    <section
      aria-label="Featured graduate testimonial"
      className="bg-zinc-900 texture-dots-dark angle-tr-lg pb-20 md:pb-28 pt-[152px] md:pt-[184px] relative overflow-hidden"
    >
      {/* Subtle background ambient graphic mark */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 text-zinc-950 font-black text-[12rem] md:text-[16rem] select-none opacity-20 pointer-events-none leading-none z-0">
        &ldquo;
      </div>

      <div className="reveal mx-auto max-w-4xl px-6 lg:px-8 text-center relative z-10">
        <p className="text-[#CE1A19] text-xs font-bold tracking-[4px] uppercase mb-10">
          From Our Graduates
        </p>

        <blockquote className="m-0 p-0">
          <p className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-relaxed max-w-3xl mx-auto mb-10">
            &ldquo;I went from knowing nothing about fitness to running my own
            PT business within a year. The one-to-one format made all the
            difference — I actually felt prepared on day one.&rdquo;
          </p>

          <div
            className="w-14 h-1 bg-[#CE1A19] mx-auto mb-8"
            aria-hidden="true"
          />

          <footer className="mt-6">
            <cite className="not-italic text-zinc-400 text-xs font-bold tracking-[3px] uppercase">
              Jamie T. <span className="text-zinc-600">&middot;</span> 2024
              Graduate
            </cite>
          </footer>
        </blockquote>
      </div>
    </section>
  );
}
