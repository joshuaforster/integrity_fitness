"use client";

import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

type GalleryItem = { id: number; src: string; alt: string; category: string };

const IMAGES: readonly GalleryItem[] = [
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
] as const;

const CATEGORIES = [
  "All",
  ...Array.from(new Set(IMAGES.map((i) => i.category))),
] as const;

export default function GalleryGrid() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [activeImageId, setActiveImageId] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const filtered =
    activeCategory === "All"
      ? IMAGES
      : IMAGES.filter((img) => img.category === activeCategory);

  const currentIdx = filtered.findIndex((img) => img.id === activeImageId);
  const currentImage = currentIdx !== -1 ? filtered[currentIdx] : null;

  const closeLightbox = useCallback(() => setActiveImageId(null), []);

  const prev = useCallback(() => {
    if (currentIdx === -1) return;
    const prevIdx = (currentIdx - 1 + filtered.length) % filtered.length;
    setActiveImageId(filtered[prevIdx].id);
  }, [currentIdx, filtered]);

  const next = useCallback(() => {
    if (currentIdx === -1) return;
    const nextIdx = (currentIdx + 1) % filtered.length;
    setActiveImageId(filtered[nextIdx].id);
  }, [currentIdx, filtered]);

  useEffect(() => {
    if (activeImageId === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeImageId, closeLightbox, prev, next]);

  useEffect(() => {
    document.body.style.overflow = activeImageId !== null ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeImageId]);

  // Lightbox view markup structure function
  const renderLightbox = () => {
    if (!currentImage) return null;

    return (
      <div
        className="fixed inset-0 z-[9999] bg-zinc-950/98 backdrop-blur-md flex flex-col justify-between"
        role="dialog"
        aria-modal="true"
        aria-label="Media viewing lightbox overlay"
      >
        {/* Top Bar Action Section */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-900 bg-zinc-950">
          <span className="text-zinc-500 text-xs font-bold tracking-widest uppercase">
            {currentIdx + 1} &middot; {filtered.length}
          </span>
          <button
            type="button"
            onClick={closeLightbox}
            className="text-zinc-400 hover:text-white transition-colors p-2 outline-none rounded-sm focus-visible:ring-1 focus-visible:ring-[#CE1A19]"
            aria-label="Close lightbox overlay view"
          >
            <svg
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Central Image Presentation Stage Layout */}
        <div className="flex-1 min-h-0 flex items-center justify-between relative px-4 bg-zinc-900/10">
          <button
            type="button"
            onClick={prev}
            className="p-4 text-zinc-400 hover:text-white transition-colors outline-none rounded-sm focus-visible:ring-1 focus-visible:ring-[#CE1A19] z-20"
            aria-label="Previous image"
          >
            <svg
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </button>

          <div className="relative flex-1 h-full max-w-5xl mx-auto my-4">
            <Image
              src={currentImage.src.replace("w=800", "w=1600")}
              alt={currentImage.alt}
              fill
              sizes="(max-width: 1024px) 90vw, 70vw"
              className="object-contain"
              priority
            />
          </div>

          <button
            type="button"
            onClick={next}
            className="p-4 text-zinc-400 hover:text-white transition-colors outline-none rounded-sm focus-visible:ring-1 focus-visible:ring-[#CE1A19] z-20"
            aria-label="Next image"
          >
            <svg
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>

        {/* Footer Descriptive Panel */}
        <div className="bg-zinc-950/60 pt-4 pb-6 border-t border-zinc-900 w-full space-y-4">
          <div className="text-center px-4">
            <p className="text-[#CE1A19] text-xs font-black tracking-widest uppercase">
              {currentImage.category}
            </p>
            <p className="text-zinc-300 text-sm mt-0.5 font-medium">
              {currentImage.alt}
            </p>
          </div>

          {/* Synchronized Thumbnail Strips */}
          <div className="flex gap-2 overflow-x-auto px-6 justify-center max-w-md mx-auto scrollbar-none">
            {filtered.map((img) => (
              <button
                key={img.id}
                type="button"
                onClick={() => setActiveImageId(img.id)}
                className={`relative flex-shrink-0 w-12 h-9 overflow-hidden transition-all duration-200 rounded-xs border outline-none ${
                  img.id === activeImageId
                    ? "border-[#CE1A19] opacity-100 ring-1 ring-[#CE1A19]"
                    : "border-transparent opacity-30 hover:opacity-60"
                }`}
                aria-label={`Jump view to image detailing ${img.alt}`}
              >
                <Image
                  src={img.src}
                  alt=""
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full bg-white">
      {/* Category Filter Menu Controls */}
      <div className="flex flex-wrap items-center gap-x-8 gap-y-3 mb-12 pb-4 border-b border-zinc-100">
        {CATEGORIES.map((cat) => {
          const isSelected = activeCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => {
                setActiveCategory(cat);
                setActiveImageId(null);
              }}
              className="flex flex-col items-start group outline-none"
            >
              <span
                className={`text-xs font-bold uppercase tracking-[2px] transition-colors duration-200 ${
                  isSelected
                    ? "text-zinc-950 font-black"
                    : "text-zinc-400 hover:text-zinc-600"
                }`}
              >
                {cat}
              </span>
              <span
                className={`h-[2px] bg-[#CE1A19] transition-all duration-300 mt-1.5 ${
                  isSelected ? "w-8" : "w-0 group-hover:w-4"
                }`}
              />
            </button>
          );
        })}
      </div>

      {/* Primary Media Item Layout Display Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((img) => (
          <button
            key={img.id}
            type="button"
            onClick={() => setActiveImageId(img.id)}
            className="w-full relative aspect-[4/3] bg-zinc-100 overflow-hidden group outline-none rounded-sm border border-zinc-200/40 shadow-xs"
            aria-label={`Open full screen image of ${img.alt}`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
            />
            <div className="absolute inset-0 bg-zinc-950/0 group-hover:bg-zinc-950/40 transition-colors duration-300 flex items-end p-6">
              <div className="text-left opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                <span className="text-[#CE1A19] text-[10px] font-black uppercase tracking-widest block mb-1">
                  {img.category}
                </span>
                <p className="text-white font-bold text-sm tracking-wide leading-tight">
                  {img.alt}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Execute Portal directly into document body to break the stack context conflict */}
      {activeImageId !== null &&
        mounted &&
        createPortal(renderLightbox(), document.body)}
    </div>
  );
}
