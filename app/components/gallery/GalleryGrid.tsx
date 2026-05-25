"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

const IMAGES = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80",
    alt: "Personal training session",
    category: "Training",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80",
    alt: "Gym equipment",
    category: "Facilities",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=800&q=80",
    alt: "Weight training",
    category: "Training",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?auto=format&fit=crop&w=800&q=80",
    alt: "Group class",
    category: "Classes",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=800&q=80",
    alt: "Coaching session",
    category: "Training",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=800&q=80",
    alt: "Modern gym floor",
    category: "Facilities",
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=800&q=80",
    alt: "Stretching and mobility",
    category: "Classes",
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&w=800&q=80",
    alt: "Cardio training",
    category: "Training",
  },
  {
    id: 9,
    src: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=800&q=80",
    alt: "Dumbbell rack",
    category: "Facilities",
  },
  {
    id: 10,
    src: "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?auto=format&fit=crop&w=800&q=80",
    alt: "One-to-one coaching",
    category: "Training",
  },
  {
    id: 11,
    src: "https://images.unsplash.com/photo-1593079831268-3381b0db4a77?auto=format&fit=crop&w=800&q=80",
    alt: "Strength training",
    category: "Classes",
  },
  {
    id: 12,
    src: "https://images.unsplash.com/photo-1559505030-85b97eaee08c?auto=format&fit=crop&w=800&q=80",
    alt: "Qualification ceremony",
    category: "Events",
  },
];

const CATEGORIES = ["All", ...Array.from(new Set(IMAGES.map((i) => i.category)))];

export default function GalleryGrid() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered =
    activeCategory === "All"
      ? IMAGES
      : IMAGES.filter((img) => img.category === activeCategory);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const prev = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : (i - 1 + filtered.length) % filtered.length));
  }, [filtered.length]);

  const next = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : (i + 1) % filtered.length));
  }, [filtered.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxIndex, closeLightbox, prev, next]);

  useEffect(() => {
    document.body.style.overflow = lightboxIndex !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightboxIndex]);

  return (
    <>
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-10">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => { setActiveCategory(cat); setLightboxIndex(null); }}
            className={`px-5 py-2 text-xs font-bold tracking-[3px] uppercase transition-all duration-200 border ${
              activeCategory === cat
                ? "bg-[#CE1A19] text-white border-[#CE1A19]"
                : "bg-transparent text-zinc-700 border-zinc-300 hover:border-[#CE1A19] hover:text-[#CE1A19]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
        {filtered.map((img, index) => (
          <button
            key={img.id}
            type="button"
            onClick={() => setLightboxIndex(index)}
            className="relative w-full overflow-hidden group block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#CE1A19]"
            aria-label={`Open ${img.alt} full screen`}
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-zinc-950/0 group-hover:bg-zinc-950/40 transition-all duration-300" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg className="w-10 h-10 text-white drop-shadow-lg" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                </svg>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 px-4 py-3 bg-gradient-to-t from-zinc-950/80 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <p className="text-white text-xs font-bold tracking-[2px] uppercase">{img.category}</p>
              <p className="text-zinc-300 text-sm">{img.alt}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[9999] bg-zinc-950 flex flex-col"
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
        >
          {/* Top bar */}
          <div className="flex-shrink-0 flex items-center justify-between px-6 py-4">
            <span className="text-white/50 text-xs font-bold tracking-[3px] uppercase">
              {lightboxIndex + 1} / {filtered.length}
            </span>
            <button
              type="button"
              onClick={closeLightbox}
              className="text-white/60 hover:text-white transition-colors p-2 -mr-2"
              aria-label="Close lightbox"
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Main image area */}
          <div className="flex-1 min-h-0 flex items-center">
            {/* Prev */}
            <button
              type="button"
              onClick={prev}
              className="flex-shrink-0 text-white/50 hover:text-white transition-colors px-4 py-8 md:px-8 self-stretch flex items-center"
              aria-label="Previous image"
            >
              <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>

            {/* Image */}
            <div className="relative flex-1 h-full min-w-0">
              <Image
                src={filtered[lightboxIndex].src.replace("w=800", "w=1600")}
                alt={filtered[lightboxIndex].alt}
                fill
                sizes="(max-width: 768px) 80vw, 70vw"
                className="object-contain"
                priority
              />
            </div>

            {/* Next */}
            <button
              type="button"
              onClick={next}
              className="flex-shrink-0 text-white/50 hover:text-white transition-colors px-4 py-8 md:px-8 self-stretch flex items-center"
              aria-label="Next image"
            >
              <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>

          {/* Caption */}
          <div className="flex-shrink-0 text-center py-3">
            <p className="text-[#CE1A19] text-xs font-bold tracking-[3px] uppercase">{filtered[lightboxIndex].category}</p>
            <p className="text-white/60 text-sm mt-1">{filtered[lightboxIndex].alt}</p>
          </div>

          {/* Thumbnail strip */}
          <div className="flex-shrink-0 flex gap-2 overflow-x-auto px-6 pb-5 justify-center">
            {filtered.map((img, i) => (
              <button
                key={img.id}
                type="button"
                onClick={() => setLightboxIndex(i)}
                className={`relative flex-shrink-0 w-14 h-10 overflow-hidden transition-all duration-200 ${
                  i === lightboxIndex
                    ? "ring-2 ring-[#CE1A19] opacity-100"
                    : "opacity-40 hover:opacity-70"
                }`}
                aria-label={`Go to image ${i + 1}`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="56px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
