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
};

export default function ImageCarousel({
  images,
  interval = 4000,
  sizes = "(max-width: 1024px) 100vw, 50vw",
}: Props) {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setActiveIdx((i) => (i + 1) % images.length);
    }, interval);
    return () => clearInterval(timer);
  }, [images.length, interval]);

  return (
    <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-zinc-950">
      {images.map((img, i) => (
        <Image
          key={img.src}
          src={img.src}
          alt={img.alt}
          fill
          sizes={sizes}
          priority={i === 0}
          className="object-cover"
          style={{ opacity: i === activeIdx ? 0.92 : 0 }}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/30 via-transparent to-zinc-950/10 pointer-events-none" />
    </div>
  );
}
