import type { QuoteTestimonialItem } from "@/app/content/testimonials";

export default function QuoteBlock({ quote }: { quote: QuoteTestimonialItem }) {
  return (
    <blockquote className="border-l-4 border-[#CE1A19] pl-5 py-1">
      <p className="text-zinc-700 text-sm md:text-base leading-relaxed font-medium italic">
        &ldquo;{quote.body}&rdquo;
      </p>
      <footer className="mt-3 flex flex-col gap-0.5">
        <span className="text-zinc-900 text-sm font-black tracking-wide leading-none">
          {quote.name}
        </span>
        {quote.subtitle && (
          <span className="text-[#CE1A19] text-xs font-bold uppercase tracking-wider">
            {quote.subtitle}
          </span>
        )}
      </footer>
    </blockquote>
  );
}