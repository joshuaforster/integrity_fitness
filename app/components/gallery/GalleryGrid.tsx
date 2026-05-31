"use client";

import {
  useState,
  useEffect,
  useRef,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import Link from "next/link";
import Image from "next/image";
import { createPortal } from "react-dom";
import GalleryImageTile from "./GalleryImageTile";
import GalleryLightbox from "./GalleryLightbox";
import { galleryImages as IMAGES, heroImages as HERO_IMAGES, galleryHero } from "@/app/content/gallery";

const CATEGORIES = [
  "All",
  ...Array.from(new Set(IMAGES.map((i) => i.category))),
] as string[];

const PAGE_SIZE = 12;

function emptySubscribe() {
  return () => {};
}

function ClientPortal({ children }: { children: ReactNode }) {
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
  if (!mounted) return null;
  return createPortal(children, document.body);
}

function getPageNumbers(
  currentPage: number,
  totalPages: number,
): (number | "...")[] {
  if (totalPages <= 7)
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  const pages: (number | "...")[] = [1];
  if (currentPage > 3) pages.push("...");
  for (
    let i = Math.max(2, currentPage - 1);
    i <= Math.min(totalPages - 1, currentPage + 1);
    i++
  ) {
    pages.push(i);
  }
  if (currentPage < totalPages - 2) pages.push("...");
  pages.push(totalPages);
  return pages;
}

export default function GalleryGrid() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [activeImageId, setActiveImageId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [heroIndex, setHeroIndex] = useState(0);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const id = setInterval(
      () => setHeroIndex((i) => (i + 1) % HERO_IMAGES.length),
      5000,
    );
    return () => clearInterval(id);
  }, []);

  const filtered =
    activeCategory === "All"
      ? IMAGES
      : IMAGES.filter((img) => img.category === activeCategory);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const pageStart = (currentPage - 1) * PAGE_SIZE;
  const paginated = filtered.slice(pageStart, pageStart + PAGE_SIZE);

  const currentIdx = filtered.findIndex((img) => img.id === activeImageId);

  const closeLightbox = () => setActiveImageId(null);

  const prev = () => {
    setActiveImageId((id) => {
      if (id === null || filtered.length === 0) return id;
      const idx = filtered.findIndex((img) => img.id === id);
      if (idx === -1) return id;
      return filtered[(idx - 1 + filtered.length) % filtered.length].id;
    });
  };

  const next = () => {
    setActiveImageId((id) => {
      if (id === null || filtered.length === 0) return id;
      const idx = filtered.findIndex((img) => img.id === id);
      if (idx === -1) return id;
      return filtered[(idx + 1) % filtered.length].id;
    });
  };

  useEffect(() => {
    if (activeImageId === null) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [activeImageId, filtered]);

  useEffect(() => {
    document.body.style.overflow = activeImageId !== null ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeImageId]);

  function scrollToGrid() {
    const el = gridRef.current;
    if (!el) return;
    const targetY = el.getBoundingClientRect().top + window.scrollY - 16;
    const startY = window.scrollY;
    const distance = targetY - startY;
    if (Math.abs(distance) < 2) return;
    const duration = 900;
    const startTime = performance.now();
    function step(now: number) {
      const p = Math.min((now - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      window.scrollTo(0, startY + distance * ease);
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  function handleCategoryChange(cat: string) {
    setActiveCategory(cat);
    setActiveImageId(null);
    setCurrentPage(1);
  }

  return (
    <>
      {/* Hero */}
      <section
        className="relative h-[55vh] min-h-[380px] flex items-end overflow-hidden"
        aria-label="Gallery hero"
      >
        {HERO_IMAGES.map((src, i) => (
          <Image
            key={i}
            src={src}
            fill
            alt={i === 0 ? "Integrity Fitness Education gallery" : ""}
            aria-hidden={i !== 0}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
            style={{ opacity: i === heroIndex ? 1 : 0 }}
            loading={i === 0 ? "eager" : "lazy"}
          />
        ))}
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-black/30"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent"
          aria-hidden="true"
        />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pb-14 w-full">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-xs text-white/60 uppercase tracking-widest mb-4"
          >
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-white/90" aria-current="page">
              Gallery
            </span>
          </nav>
          <div className="w-10 h-0.5 bg-[#CE1A19] mb-5" aria-hidden="true" />
          <h1 className="text-5xl sm:text-6xl font-black text-white leading-tight mb-4 uppercase tracking-tight">
            {galleryHero.heading}
          </h1>
          <p className="text-lg text-white/80 max-w-xl leading-relaxed">
            {galleryHero.body}
          </p>
        </div>
      </section>

      {/* Gallery section */}
      <section className="bg-white py-16">
        <div ref={gridRef} className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Category filters */}
          <div
            role="group"
            aria-label="Filter gallery by category"
            className="flex flex-wrap justify-center gap-2 mb-4"
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => handleCategoryChange(cat)}
                aria-pressed={activeCategory === cat}
                className={`px-5 py-2 rounded-full text-sm font-light uppercase tracking-wide transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-zinc-950 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-zinc-950 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Count */}
          <p className="text-center text-gray-400 text-sm mb-10">
            Showing {filtered.length > 0 ? pageStart + 1 : 0}–
            {Math.min(pageStart + PAGE_SIZE, filtered.length)} of{" "}
            {filtered.length} images
            {activeCategory !== "All" && ` · ${activeCategory}`}
          </p>

          {/* Image grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {paginated.map((img) => (
              <GalleryImageTile
                key={img.id}
                img={img}
                onClick={setActiveImageId}
              />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <nav
              aria-label="Gallery pagination"
              className="flex justify-center items-center gap-2 mt-12 flex-wrap"
            >
              <button
                type="button"
                onClick={() => {
                  setCurrentPage((p) => Math.max(1, p - 1));
                  scrollToGrid();
                }}
                disabled={currentPage === 1}
                aria-label="Previous page"
                className="px-4 py-2 rounded text-sm bg-gray-100 text-gray-600 hover:bg-zinc-950 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                ← Prev
              </button>

              {getPageNumbers(currentPage, totalPages).map((page, i) =>
                page === "..." ? (
                  <span
                    key={`ellipsis-${i}`}
                    className="px-2 text-gray-400 select-none"
                    aria-hidden="true"
                  >
                    …
                  </span>
                ) : (
                  <button
                    key={page}
                    type="button"
                    onClick={() => {
                      setCurrentPage(page as number);
                      scrollToGrid();
                    }}
                    aria-label={`Page ${page}`}
                    aria-current={currentPage === page ? "page" : undefined}
                    className={`w-10 h-10 rounded text-sm font-light transition-colors ${
                      currentPage === page
                        ? "bg-[#CE1A19] text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-zinc-950 hover:text-white"
                    }`}
                  >
                    {page}
                  </button>
                ),
              )}

              <button
                type="button"
                onClick={() => {
                  setCurrentPage((p) => Math.min(totalPages, p + 1));
                  scrollToGrid();
                }}
                disabled={currentPage === totalPages}
                aria-label="Next page"
                className="px-4 py-2 rounded text-sm bg-gray-100 text-gray-600 hover:bg-zinc-950 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                Next →
              </button>
            </nav>
          )}
        </div>
      </section>

      {activeImageId !== null && currentIdx !== -1 && (
        <ClientPortal>
          <GalleryLightbox
            filtered={filtered}
            currentIdx={currentIdx}
            onClose={closeLightbox}
            onPrev={prev}
            onNext={next}
            onJump={setActiveImageId}
          />
        </ClientPortal>
      )}
    </>
  );
}
