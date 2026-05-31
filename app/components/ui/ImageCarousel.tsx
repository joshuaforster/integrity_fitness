"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

type CarouselImage = {
  src: string;
  alt: string;
};

type Props = {
  images: readonly CarouselImage[];
  interval?: number;
  sizes?: string;
  theme?: "light" | "dark";
};

export default function ImageCarousel({
  images,
  interval = 4000,
  sizes = "(max-width: 1024px) 100vw, 50vw",
  theme = "light",
}: Props) {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setActiveIdx((i) => (i + 1) % images.length);
    }, interval);
    return () => clearInterval(timer);
  }, [images.length, interval]);

  const dotActive = theme === "dark" ? "bg-white" : "bg-zinc-900";
  const dotInactive = theme === "dark" ? "bg-zinc-600" : "bg-zinc-300";

  return (
    <div className="flex flex-col gap-3">
      <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-zinc-950">
        {images.map((img, i) => (
          <Image
            key={img.src}
            src={img.src}
            alt={img.alt}
            fill
            sizes={sizes}
            priority={i === 0}
            className="object-cover transition-opacity duration-[1200ms] ease-in-out"
            style={{ opacity: i === activeIdx ? 0.92 : 0 }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/30 via-transparent to-zinc-950/10 pointer-events-none" />
      </div>

      {images.length > 1 && (
        <div className="flex gap-2 justify-center">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIdx(i)}
              aria-label={`View image ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === activeIdx ? `${dotActive} w-6` : `${dotInactive} w-1.5`
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
