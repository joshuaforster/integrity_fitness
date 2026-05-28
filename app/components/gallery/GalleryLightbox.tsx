"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { type GalleryItem } from "./GalleryImageTile";

interface GalleryLightboxProps {
  filtered: readonly GalleryItem[];
  currentIdx: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  onJump: (id: number) => void;
}

export default function GalleryLightbox({
  filtered,
  currentIdx,
  onClose,
  onPrev,
  onNext,
  onJump,
}: GalleryLightboxProps) {
  const currentImage = filtered[currentIdx];
  const thumbnailStripRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!thumbnailStripRef.current) return;
    const thumb = thumbnailStripRef.current.children[currentIdx] as HTMLElement;
    if (thumb) thumb.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });
  }, [currentIdx]);

  return (
    <div
      className="fixed inset-0 z-[9999] bg-black/95 flex flex-col"
      role="dialog"
      aria-modal="true"
      aria-label="Media viewing lightbox overlay"
      onClick={onClose}
    >
      {/* Top bar */}
      <div
        className="flex items-center justify-between px-6 py-4 flex-shrink-0"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="text-white/60 text-sm">
          {currentIdx + 1} / {filtered.length}
        </span>
        <span className="text-[#CE1A19] text-xs uppercase tracking-widest font-bold">
          {currentImage.category}
        </span>
        <button
          type="button"
          onClick={onClose}
          className="text-white/70 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors"
          aria-label="Close lightbox"
        >
          <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Main image */}
      <div
        className="flex-1 flex items-center justify-center relative px-16 min-h-0"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={currentImage.src}
          alt={currentImage.alt}
          className="max-w-full max-h-[calc(100vh-200px)] object-contain select-none"
          draggable={false}
        />

        <button
          type="button"
          className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/25 text-white p-3 rounded-full backdrop-blur-sm transition-all border border-white/10 hover:border-white/30"
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          aria-label="Previous image"
        >
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          type="button"
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/25 text-white p-3 rounded-full backdrop-blur-sm transition-all border border-white/10 hover:border-white/30"
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          aria-label="Next image"
        >
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Thumbnail strip */}
      <div
        className="flex-shrink-0 px-4 py-3 border-t border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          ref={thumbnailStripRef}
          className="flex gap-2 overflow-x-auto pb-1"
          style={{ scrollbarWidth: "none" }}
        >
          {filtered.map((img, i) => (
            <button
              key={img.id}
              type="button"
              onClick={() => onJump(img.id)}
              className={`flex-shrink-0 w-16 h-16 overflow-hidden rounded transition-all duration-200 ${
                i === currentIdx
                  ? "ring-2 ring-[#CE1A19] opacity-100 scale-105"
                  : "opacity-40 hover:opacity-75"
              }`}
              aria-label={`View image ${i + 1}`}
            >
              <img
                src={img.src}
                alt=""
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
