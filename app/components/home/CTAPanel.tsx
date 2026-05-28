import Image from "next/image";
import Link from "next/link";

export type CTAPanelData = {
  label: string;
  title: string;
  cta: string;
  href: string;
  image: string;
  alt: string;
};

export default function CTAPanel({ panel }: { panel: CTAPanelData }) {
  return (
    <Link
      href={panel.href}
      className="relative w-full h-[440px] md:h-[500px] overflow-hidden clip-tr-lg group block bg-zinc-950 outline-none focus-visible:ring-2 focus-visible:ring-[#CE1A19] focus-visible:z-20"
    >
      <Image
        src={panel.image}
        alt={panel.alt}
        fill
        sizes="(max-width: 1024px) 100vw, 50vw"
        className="object-cover opacity-60 transition-transform duration-700 ease-out group-hover:scale-[1.03] group-hover:opacity-50"
        loading="lazy"
      />

      <div className="absolute inset-0 bg-gradient-to-br from-zinc-950/95 via-zinc-950/75 to-zinc-950/40 transition-opacity duration-500 group-hover:opacity-95" />

      {/* Swapped justify-end for justify-center & text-left for text-center */}
      <div className="absolute inset-0 flex flex-col justify-center items-center p-8 md:p-16 text-center">
        <div className="max-w-md transform transition-transform duration-500 ease-out group-hover:translate-y-[-4px] flex flex-col items-center">
          <p className="text-white text-xs font-bold tracking-[4px] uppercase mb-3">
            {panel.label}
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-6 tracking-tight leading-tight uppercase">
            {panel.title}
          </h2>
          <div className="inline-flex items-center gap-3 bg-[#CE1A19] text-white px-6 py-3.5 text-xs font-bold tracking-widest uppercase transition-colors duration-300 group-hover:bg-red-700 clip-br shadow-md">
            <span>{panel.cta}</span>
            <span
              className="transform transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            >
              →
            </span>
          </div>
        </div>
      </div>

      <div className="hidden lg:block absolute top-0 bottom-0 right-0 w-px bg-zinc-900/40 group-last:hidden" />
    </Link>
  );
}
