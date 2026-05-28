"use client";

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

  return (
    <div
      className="fixed inset-0 z-[9999] bg-zinc-950/98 backdrop-blur-md flex flex-col justify-between"
      role="dialog"
      aria-modal="true"
      aria-label="Media viewing lightbox overlay"
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-900 bg-zinc-950">
        <span className="text-white text-xs font-bold tracking-widest uppercase">
          {currentIdx + 1} &middot; {filtered.length}
        </span>
        <button
          type="button"
          onClick={onClose}
          className="text-white hover:text-zinc-300 transition-colors p-2 outline-none rounded-sm focus-visible:ring-1 focus-visible:ring-[#CE1A19]"
          aria-label="Close lightbox overlay view"
        >
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Image stage */}
      <div className="flex-1 min-h-0 flex items-center justify-between relative px-4 bg-zinc-900/10">
        <button
          type="button"
          onClick={onPrev}
          className="p-4 text-white hover:text-zinc-300 transition-colors outline-none rounded-sm focus-visible:ring-1 focus-visible:ring-[#CE1A19] z-20"
          aria-label="Previous image"
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
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
          onClick={onNext}
          className="p-4 text-white hover:text-zinc-300 transition-colors outline-none rounded-sm focus-visible:ring-1 focus-visible:ring-[#CE1A19] z-20"
          aria-label="Next image"
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>

      {/* Footer with thumbnails */}
      <div className="bg-zinc-950/60 pt-4 pb-6 border-t border-zinc-900 w-full space-y-4">
        <div className="text-center px-4">
          <p className="text-[#CE1A19] text-xs font-black tracking-widest uppercase">
            {currentImage.category}
          </p>
          <p className="text-white text-sm mt-0.5 font-medium">{currentImage.alt}</p>
        </div>

        <div className="flex gap-2 overflow-x-auto px-6 justify-center max-w-md mx-auto scrollbar-none">
          {filtered.map((img) => (
            <button
              key={img.id}
              type="button"
              onClick={() => onJump(img.id)}
              className={`relative flex-shrink-0 w-12 h-12 overflow-hidden transition-all duration-200 rounded-xs border outline-none focus-visible:ring-2 focus-visible:ring-[#CE1A19] ${
                img.id === currentImage.id
                  ? "border-[#CE1A19] opacity-100 ring-1 ring-[#CE1A19]"
                  : "border-transparent opacity-30 hover:opacity-60"
              }`}
              aria-label={`Jump view to image detailing ${img.alt}`}
            >
              <Image src={img.src} alt="" fill sizes="48px" className="object-cover" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
