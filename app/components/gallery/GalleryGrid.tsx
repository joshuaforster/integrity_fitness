"use client";

import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import AnimatedTextFilter from "@/app/components/ui/AnimatedTextFilter";
import GalleryImageTile, { type GalleryItem } from "./GalleryImageTile";
import GalleryLightbox from "./GalleryLightbox";

const IMAGES: GalleryItem[] = [
  { id: 1, src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80", alt: "Personal training session", category: "Training" },
  { id: 2, src: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80", alt: "Gym equipment", category: "Facilities" },
  { id: 3, src: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=800&q=80", alt: "Weight training", category: "Training" },
  { id: 4, src: "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?auto=format&fit=crop&w=800&q=80", alt: "Group class", category: "Classes" },
  { id: 5, src: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=800&q=80", alt: "Coaching session", category: "Training" },
  { id: 6, src: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=800&q=80", alt: "Modern gym floor", category: "Facilities" },
  { id: 7, src: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=800&q=80", alt: "Stretching and mobility", category: "Classes" },
  { id: 8, src: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&w=800&q=80", alt: "Cardio training", category: "Training" },
  { id: 9, src: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=800&q=80", alt: "Dumbbell rack", category: "Facilities" },
  { id: 10, src: "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?auto=format&fit=crop&w=800&q=80", alt: "One-to-one coaching", category: "Training" },
  { id: 11, src: "https://images.unsplash.com/photo-1593079831268-3381b0db4a77?auto=format&fit=crop&w=800&q=80", alt: "Strength training", category: "Classes" },
  { id: 12, src: "https://images.unsplash.com/photo-1559505030-85b97eaee08c?auto=format&fit=crop&w=800&q=80", alt: "Qualification ceremony", category: "Events" },
];

const CATEGORIES = ["All", ...Array.from(new Set(IMAGES.map((i) => i.category)))] as const;

export default function GalleryGrid() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [activeImageId, setActiveImageId] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const filtered =
    activeCategory === "All" ? IMAGES : IMAGES.filter((img) => img.category === activeCategory);

  const currentIdx = filtered.findIndex((img) => img.id === activeImageId);

  const closeLightbox = useCallback(() => setActiveImageId(null), []);

  const prev = useCallback(() => {
    if (currentIdx === -1) return;
    setActiveImageId(filtered[(currentIdx - 1 + filtered.length) % filtered.length].id);
  }, [currentIdx, filtered]);

  const next = useCallback(() => {
    if (currentIdx === -1) return;
    setActiveImageId(filtered[(currentIdx + 1) % filtered.length].id);
  }, [currentIdx, filtered]);

  useEffect(() => {
    if (activeImageId === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [activeImageId, closeLightbox, prev, next]);

  useEffect(() => {
    document.body.style.overflow = activeImageId !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [activeImageId]);

  return (
    <div className="w-full bg-white">
      {/* Category filters */}
      <div className="flex flex-wrap items-center gap-x-8 gap-y-3 mb-12 pb-4 border-b border-zinc-100">
        {CATEGORIES.map((cat) => (
          <AnimatedTextFilter
            key={cat}
            label={cat}
            isSelected={activeCategory === cat}
            size="sm"
            onClick={() => { setActiveCategory(cat); setActiveImageId(null); }}
          />
        ))}
      </div>

      {/* Image grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((img) => (
          <GalleryImageTile key={img.id} img={img} onClick={setActiveImageId} />
        ))}
      </div>

      {activeImageId !== null && mounted && currentIdx !== -1 &&
        createPortal(
          <GalleryLightbox
            filtered={filtered}
            currentIdx={currentIdx}
            onClose={closeLightbox}
            onPrev={prev}
            onNext={next}
            onJump={setActiveImageId}
          />,
          document.body,
        )}
    </div>
  );
}
