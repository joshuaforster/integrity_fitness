import QuoteBlock from "@/app/components/ui/QuoteBlock";
import { quoteTestimonials } from "@/app/content/testimonials";

export default function GraduateVoice() {
  return (
    <section
      aria-label="Graduate testimonials"
      className="py-16 md:py-20 border-b border-zinc-200/60"
    >
      <div className="reveal mx-auto max-w-7xl px-6 lg:px-8">
        <p className="text-[#CE1A19] text-xs font-bold tracking-widest uppercase mb-8">
          From Our Graduates
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {quoteTestimonials.map((quote) => (
            <QuoteBlock key={quote.name} quote={quote} />
          ))}
        </div>
      </div>
    </section>
  );
}
