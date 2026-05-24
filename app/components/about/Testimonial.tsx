export default function Testimonial() {
  return (
    <section className="bg-[#111111] py-24">
      <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
        <p className="text-[#CE1A19] text-xs font-semibold tracking-[4px] uppercase mb-12">
          From Our Graduates
        </p>
        <blockquote>
          <p className="text-2xl md:text-3xl font-bold text-white leading-snug uppercase mb-10">
            &ldquo;I went from knowing nothing about fitness to running my own PT business within a year. The one-to-one format made all the difference — I actually felt prepared on day one.&rdquo;
          </p>
          <div className="w-14 h-1 bg-[#CE1A19] mx-auto mb-8" />
          <footer>
            <p className="text-white/50 text-xs font-semibold tracking-[4px] uppercase">
              Jamie T. &mdash; 2024 Graduate
            </p>
          </footer>
        </blockquote>
      </div>
    </section>
  );
}
