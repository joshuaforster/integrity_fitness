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
  sizes = "(max-width: 1024px) 100vw, 50vw",
}: Props) {
  const img = images[0];
  if (!img) return null;

  return (
    <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-zinc-950">
      <Image
        src={img.src}
        alt={img.alt}
        fill
        sizes={sizes}
        priority
        className="object-cover"
        style={{ opacity: 0.92 }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/30 via-transparent to-zinc-950/10 pointer-events-none" />
    </div>
  );
}
