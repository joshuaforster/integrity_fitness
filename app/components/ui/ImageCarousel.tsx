"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

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
  interval = 3500,
  sizes = "(max-width: 1024px) 100vw, 50vw",
}: Props) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, interval);
    return () => clearInterval(timer);
  }, [images.length, interval]);

  const img = images[index];
  if (!img) return null;

  return (
    <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-zinc-950">
      <AnimatePresence mode="sync">
        <motion.div
          key={index}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            sizes={sizes}
            priority={index === 0}
            className="object-cover"
            style={{ opacity: 0.92 }}
          />
        </motion.div>
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/30 via-transparent to-zinc-950/10 pointer-events-none" />

      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 pointer-events-none">
        {images.map((_, i) => (
          <span
            key={i}
            className={`block h-1.5 rounded-full transition-all duration-500 ${
              i === index ? "w-6 bg-white" : "w-1.5 bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
