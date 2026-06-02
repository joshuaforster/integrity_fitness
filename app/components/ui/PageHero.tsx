"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

interface PageHeroProps {
  image: string;
  label: string;
  title: React.ReactNode;
  subtitle: string;
  objectPosition?: string;
  overlayStrength?: "normal" | "heavy";
}

export default function PageHero({ image, label, title, subtitle, objectPosition = "center", overlayStrength = "normal" }: PageHeroProps) {
  const words = typeof title === "string" ? title.split(" ") : null;

  return (
    <section className="relative h-[70vh] min-h-[520px] sm:h-[55vh] sm:min-h-[380px] flex items-end bg-zinc-950 overflow-hidden">
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src={image}
          alt=""
          fill
          sizes="100vw"
          priority
          className="object-cover select-none pointer-events-none"
          style={{ objectPosition }}
        />
        <div className={`absolute inset-0 bg-gradient-to-t ${overlayStrength === "heavy" ? "from-black/95 via-black/75 to-black/50" : "from-black/95 via-black/70 to-black/30"}`} />
        {overlayStrength === "heavy" && (
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent" />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pb-14 pt-28 w-full">
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-xs text-white/60 uppercase tracking-widest mb-4"
        >
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span aria-hidden="true">/</span>
          <span className="text-white/90" aria-current="page">{label}</span>
        </nav>

        <div className="w-10 h-0.5 bg-[#CE1A19] mb-5" aria-hidden="true" />

        {words ? (
          <h1 className="text-5xl sm:text-6xl font-black text-white leading-tight mb-4 uppercase tracking-tight">
            {words.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.07, duration: 0.52, ease: "easeOut" }}
                className="inline-block mr-[0.25em]"
              >
                {word}
              </motion.span>
            ))}
          </h1>
        ) : (
          <motion.h1
            className="text-5xl sm:text-6xl font-black text-white leading-tight mb-4 uppercase tracking-tight"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1, ease: "easeOut" }}
          >
            {title}
          </motion.h1>
        )}

        <p className="text-lg text-white/80 max-w-xl leading-relaxed">{subtitle}</p>
      </div>
    </section>
  );
}
