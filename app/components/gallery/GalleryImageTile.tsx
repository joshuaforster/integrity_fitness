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
      className="w-full relative aspect-[4/3] bg-zinc-100 overflow-hidden group outline-none"
      aria-label={`Open full screen image of ${img.alt}`}
    >
      <Image
        src={img.src}
        alt={img.alt}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/45 transition-colors duration-300" />
      {/* Zoom icon */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center">
          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
          </svg>
        </div>
      </div>
      {/* Bottom label */}
      <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
        <span className="text-[#CE1A19] text-[10px] font-black uppercase tracking-widest block mb-0.5">
          {img.category}
        </span>
        <p className="text-white text-sm font-semibold leading-tight line-clamp-1">
          {img.alt}
        </p>
      </div>
    </button>
  );
}
