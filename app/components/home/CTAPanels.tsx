"use client";

import Image from "next/image";
import Link from "next/link";

const PANELS = [
  {
    label: "Est. 2015",
    title: "Who Are We?",
    cta: "About Us",
    href: "/about",
    image:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&q=80",
    alt: "Integrity Fitness personal training facility and coaching environment",
  },
  {
    label: "Norwich, Norfolk",
    title: "Get In Touch",
    cta: "Contact Us",
    href: "/contact",
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&q=80",
    alt: "Fully equipped free-weights and lifting area at our Norwich centre",
  },
] as const;

export default function CTAPanels() {
  return (
    <section className="reveal grid grid-cols-1 lg:grid-cols-2 border-t border-zinc-900 bg-zinc-950">
      {PANELS.map((panel) => (
        <Link
          key={panel.title}
          href={panel.href}
          className="relative h-[440px] md:h-[500px] overflow-hidden group block bg-zinc-950 outline-none focus-visible:ring-2 focus-visible:ring-[#CE1A19] focus-visible:z-20"
        >
          {/* Background Image Layer */}
          <Image
            src={panel.image}
            alt={panel.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover opacity-60 transition-transform duration-700 ease-out group-hover:scale-[1.03] group-hover:opacity-50"
            loading="lazy"
          />

          {/* Premium Multi-Stage Directional Darkening Mask */}
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-950/95 via-zinc-950/75 to-zinc-950/40 transition-opacity duration-500 group-hover:opacity-95" />

          {/* Left-Aligned Clean Text Content Wrapper */}
          <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16 text-left">
            <div className="max-w-md transform transition-transform duration-500 ease-out group-hover:translate-y-[-4px]">
              <p className="text-zinc-400 text-xs font-bold tracking-[4px] uppercase mb-3">
                {panel.label}
              </p>

              <h2 className="text-3xl md:text-4xl font-black text-white mb-6 tracking-tight leading-tight">
                {panel.title}
              </h2>

              <div className="inline-flex items-center gap-3 bg-[#CE1A19] text-white px-6 py-3.5 text-xs font-bold tracking-widest uppercase transition-colors duration-300 group-hover:bg-red-700 rounded-sm shadow-md">
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

          {/* Subtle clean vertical separator bar visible only on large split monitors */}
          <div className="hidden lg:block absolute top-0 bottom-0 right-0 w-px bg-zinc-900/40 group-last:hidden" />
        </Link>
      ))}
    </section>
  );
}
