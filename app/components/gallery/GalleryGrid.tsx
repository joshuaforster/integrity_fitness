"use client";

import { useState, useEffect, useCallback, useSyncExternalStore, type ReactNode } from "react";
import { createPortal } from "react-dom";
import AnimatedTextFilter from "@/app/components/ui/AnimatedTextFilter";
import GalleryImageTile, { type GalleryItem } from "./GalleryImageTile";
import GalleryLightbox from "./GalleryLightbox";

const BUCKET_URL = "https://pub-6e6bb53af6c34756a861d2c0a8259e84.r2.dev/TGG%20HALL%20ROAD";

const IMAGES: GalleryItem[] = [
  {
    id: 1,
    src: `${BUCKET_URL}/ANATOMY-AND-PHYSIOLOGY-THEORY-EXAM-IFE-TGGNHR_012.jpg`,
    alt: "Anatomy and physiology theory exam session",
    category: "Events",
  },
  {
    id: 2,
    src: `${BUCKET_URL}/ANATOMY-AND-PHYSIOLOGY-THEORY-EXAM2-IFE-TGGNHR_013.jpg`,
    alt: "Anatomy and physiology theory exam paper overview",
    category: "Events",
  },
  {
    id: 3,
    src: `${BUCKET_URL}/ANATOMY-AND-PHYSIOLOGY-THEORY-EXAM3-IFE-TGGNHR_014.jpg`,
    alt: "Anatomy and physiology theory exam documents",
    category: "Events",
  },
  {
    id: 4,
    src: `${BUCKET_URL}/ANATOMY-AND-PHYSIOLOGY-THEORY-EXAM4-IFE-TGGNHR_015.jpg`,
    alt: "Anatomy and physiology theory exam learning environment",
    category: "Events",
  },
  {
    id: 5,
    src: `${BUCKET_URL}/BECOME-A-PERSONAL-TRAINER-CAREER-OPTIONS-IFE-TGGNHR_011.jpg`,
    alt: "Become a personal trainer career options presentation",
    category: "Events",
  },
  {
    id: 6,
    src: `${BUCKET_URL}/BURY-BASKETBALL-HARRY-IFE-TGGNHR_035.jpg`,
    alt: "Bury basketball training with Harry",
    category: "Training",
  },
  {
    id: 7,
    src: `${BUCKET_URL}/BURY-BASKETBALL-HARRY2-IFE-TGGNHR_036.jpg`,
    alt: "Bury basketball practice match with Harry",
    category: "Training",
  },
  {
    id: 8,
    src: `${BUCKET_URL}/BURY-BASKETBALL-HARRY3-IFE-TGGNHR_037.jpg`,
    alt: "Bury basketball court drills with Harry",
    category: "Training",
  },
  {
    id: 9,
    src: `${BUCKET_URL}/FITNESS-DISCUSSION-IFE-TGGNHR_006.jpg`,
    alt: "Fitness discussion group session",
    category: "Classes",
  },
  {
    id: 10,
    src: `${BUCKET_URL}/FITNESS-DISCUSSION-2-IFE-TGGNHR_007.jpg`,
    alt: "Fitness discussion review",
    category: "Classes",
  },
  {
    id: 11,
    src: `${BUCKET_URL}/FITNESS-DISCUSSION2-IFE-TGGNHR_039.jpg`,
    alt: "Fitness consultation and review",
    category: "Classes",
  },
  {
    id: 12,
    src: `${BUCKET_URL}/GYM-FLOOR%20CHAT-IFE-TGGNHR_005.jpg`,
    alt: "Gym floor client interaction",
    category: "Training",
  },
  {
    id: 13,
    src: `${BUCKET_URL}/GYM-FLOOR-EXPLANATION-IFE-TGGNHR_003.jpg`,
    alt: "Gym floor exercise explanation",
    category: "Training",
  },
  {
    id: 14,
    src: `${BUCKET_URL}/GYM-FLOOR%20EDUCATION-IFE-TGGNHR_008.jpg`,
    alt: "Gym floor practical education delivery",
    category: "Training",
  },
  {
    id: 15,
    src: `${BUCKET_URL}/GYM-FLOOR%20EDUCATION2-IFE-TGGNHR_009.jpg`,
    alt: "Gym floor practical instruction methods",
    category: "Training",
  },
  {
    id: 16,
    src: `${BUCKET_URL}/HARRY-AND-PARIS-IFE-TGGNHR_026.jpg`,
    alt: "Harry and Paris personal training session",
    category: "Training",
  },
  {
    id: 17,
    src: `${BUCKET_URL}/HARRY-AND-PARIS2-IFE-TGGNHR_027.jpg`,
    alt: "Harry and Paris practical gym assessment",
    category: "Training",
  },
  {
    id: 18,
    src: `${BUCKET_URL}/HARRY-AND-PARIS3-IFE-TGGNHR_028.jpg`,
    alt: "Harry and Paris functional training review",
    category: "Training",
  },
  {
    id: 19,
    src: `${BUCKET_URL}/HARRY-AND-PARIS4-IFE-TGGNHR_029.jpg`,
    alt: "Harry and Paris resistance training oversight",
    category: "Training",
  },
  {
    id: 20,
    src: `${BUCKET_URL}/HARRY-AND-PARIS4-IFE-TGGNHR_030.jpg`,
    alt: "Harry and Paris exercise technique analysis",
    category: "Training",
  },
  {
    id: 21,
    src: `${BUCKET_URL}/HARRY-AND-PARIS5-IFE-TGGNHR_031.jpg`,
    alt: "Harry and Paris post-workout debrief",
    category: "Training",
  },
  {
    id: 22,
    src: `${BUCKET_URL}/HARRY-MATTHEWS-DUMBBELL-MACBOOK-AIR-IPAD-IFE-TGGNHR_032.jpg`,
    alt: "Harry Matthews reviewing data with dumbbell, MacBook Air, and iPad",
    category: "Facilities",
  },
  {
    id: 23,
    src: `${BUCKET_URL}/HARRY-MATTHEWS-DUMBBELL-MACBOOK-AIR-IPAD2-IFE-TGGNHR_033.jpg`,
    alt: "Harry Matthews planning programs using digital workspace on gym floor",
    category: "Facilities",
  },
  {
    id: 24,
    src: `${BUCKET_URL}/HARRY-MATTHEWS-PROFILE-GYM-FLOOR-IFE-TGGNHR_034.jpg`,
    alt: "Harry Matthews profile portrait on the gym floor",
    category: "Facilities",
  },
];

const CATEGORIES = [
  "All",
  ...Array.from(new Set(IMAGES.map((i) => i.category))),
] as const;

const emptySubscribe = () => () => {};

function ClientPortal({ children }: { children: ReactNode }) {
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);
  if (!mounted) return null;
  return createPortal(children, document.body);
}

export default function GalleryGrid() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [activeImageId, setActiveImageId] = useState<number | null>(null);

  const filtered =
    activeCategory === "All"
      ? IMAGES
      : IMAGES.filter((img) => img.category === activeCategory);

  const currentIdx = filtered.findIndex((img) => img.id === activeImageId);

  const closeLightbox = useCallback(() => setActiveImageId(null), []);

  const prev = useCallback(() => {
    if (currentIdx === -1) return;
    setActiveImageId(
      filtered[(currentIdx - 1 + filtered.length) % filtered.length].id,
    );
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
    return () => {
      document.body.style.overflow = "";
    };
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
            onClick={() => {
              setActiveCategory(cat);
              setActiveImageId(null);
            }}
          />
        ))}
      </div>

      {/* Image grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((img) => (
          <GalleryImageTile key={img.id} img={img} onClick={setActiveImageId} />
        ))}
      </div>

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
    </div>
  );
}
