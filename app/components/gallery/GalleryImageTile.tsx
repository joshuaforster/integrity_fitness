import Image from "next/image";

export type GalleryItem = {
  id: number;
  src: string;
  alt: string;
  category: string;
};

interface GalleryImageTileProps {
  img: GalleryItem;
  onClick: (id: number) => void;
}

export default function GalleryImageTile({ img, onClick }: GalleryImageTileProps) {
  return (
    <button
      type="button"
      onClick={() => onClick(img.id)}
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
  );
}
