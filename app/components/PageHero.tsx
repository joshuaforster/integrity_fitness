import Image from "next/image";

interface PageHeroProps {
  image: string;
  label: string;
  title: React.ReactNode;
  subtitle: string;
  minHeight?: "screen" | "60vh" | "55vh" | "45vh";
  scrollIndicator?: boolean;
  compact?: boolean;
}

const minHeightClass: Record<NonNullable<PageHeroProps["minHeight"]>, string> = {
  screen: "min-h-screen",
  "60vh": "min-h-[60vh]",
  "55vh": "min-h-[55vh]",
  "45vh": "min-h-[45vh]",
};

export default function PageHero({
  image,
  label,
  title,
  subtitle,
  minHeight = "60vh",
  scrollIndicator = false,
  compact = false,
}: PageHeroProps) {
  return (
    <section
      className={`relative ${minHeightClass[minHeight]} bg-[#0D0D0D] overflow-hidden flex flex-col justify-end -mt-[80px]`}
    >
      <div className="absolute inset-0">
        <Image
          src={image}
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30" />
      </div>

      <div className="relative z-10 w-full">
        <div className={`mx-auto max-w-7xl px-6 lg:px-8 ${compact ? "pb-12 pt-28" : "pb-20 pt-48"}`}>
          <p className="text-[#CE1A19] text-xs font-semibold tracking-[4px] uppercase mb-6">
            {label}
          </p>
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-none uppercase tracking-tight">
            {title}
          </h1>
          <div className="w-14 h-1 bg-[#CE1A19] mt-8 mb-6" aria-hidden="true" />
          <p className="text-white/80 text-lg max-w-xl leading-relaxed">
            {subtitle}
          </p>
        </div>
      </div>

      {scrollIndicator && (
        <div className="relative z-10 flex justify-center pb-10" aria-hidden="true">
          <div className="flex flex-col items-center gap-2 animate-bounce">
            <span className="text-white/40 text-[10px] tracking-[3px] uppercase font-semibold">Scroll</span>
            <svg className="w-5 h-5 text-white/40" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      )}
    </section>
  );
}
