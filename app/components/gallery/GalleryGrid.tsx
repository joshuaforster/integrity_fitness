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
import GalleryImageTile, { type GalleryItem } from "./GalleryImageTile";
import GalleryLightbox from "./GalleryLightbox";

const BUCKET_URL =
  "https://pub-6e6bb53af6c34756a861d2c0a8259e84.r2.dev/TGG%20HALL%20ROAD";
const NORWICH_URL =
  "https://pub-6e6bb53af6c34756a861d2c0a8259e84.r2.dev/TGG%20Norwich";
const DUNCAN_URL = "https://pub-6e6bb53af6c34756a861d2c0a8259e84.r2.dev/Duncan";
const CFG_URL =
  "https://pub-6e6bb53af6c34756a861d2c0a8259e84.r2.dev/CFG%20Group%20induction%20final%20edits";

const IMAGES: GalleryItem[] = [
  // Classes — student practical sessions (front)
  {
    id: 6,
    src: `https://pub-6e6bb53af6c34756a861d2c0a8259e84.r2.dev/Screenshot%202026-05-27%20at%2020.28.15.png`,
    alt: "Fitness discussion group session",
    category: "Classes",
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
    id: 49,
    src: `${DUNCAN_URL}/20221115-IFE-CF_001.JPG`,
    alt: "Personal training class session",
    category: "Classes",
  },
  {
    id: 50,
    src: `${DUNCAN_URL}/20221115-IFE-CF_002.JPG`,
    alt: "PT class practical exercise",
    category: "Classes",
  },
  {
    id: 51,
    src: `${DUNCAN_URL}/20221115-IFE-CF_003.JPG`,
    alt: "PT class gym floor work",
    category: "Classes",
  },
  {
    id: 52,
    src: `${DUNCAN_URL}/20221115-IFE-CF_004.JPG`,
    alt: "PT class coaching technique",
    category: "Classes",
  },
  {
    id: 53,
    src: `${DUNCAN_URL}/20221115-IFE-CF_005.JPG`,
    alt: "PT class assessment practice",
    category: "Classes",
  },
  {
    id: 54,
    src: `${DUNCAN_URL}/20221115-IFE-CF_006.JPG`,
    alt: "PT class student demonstration",
    category: "Classes",
  },
  {
    id: 55,
    src: `${DUNCAN_URL}/20221115-IFE-CF_007.JPG`,
    alt: "PT class exercise instruction",
    category: "Classes",
  },
  {
    id: 56,
    src: `${DUNCAN_URL}/20221115-IFE-CF_008.JPG`,
    alt: "PT class practical coaching",
    category: "Classes",
  },
  {
    id: 57,
    src: `${DUNCAN_URL}/20221115-IFE-CF_009.JPG`,
    alt: "PT class hands-on learning",
    category: "Classes",
  },
  {
    id: 58,
    src: `${DUNCAN_URL}/20221115-IFE-CF_010.JPG`,
    alt: "PT class group activity",
    category: "Classes",
  },
  {
    id: 59,
    src: `${DUNCAN_URL}/20221115-IFE-CF_011.JPG`,
    alt: "PT class skills practice",
    category: "Classes",
  },
  {
    id: 60,
    src: `${DUNCAN_URL}/20221115-IFE-CF_012.JPG`,
    alt: "PT class exercise review",
    category: "Classes",
  },
  {
    id: 61,
    src: `${DUNCAN_URL}/20221115-IFE-CF_013.JPG`,
    alt: "PT class movement analysis",
    category: "Classes",
  },
  {
    id: 62,
    src: `${DUNCAN_URL}/20221115-IFE-CF_014.JPG`,
    alt: "PT class practical assessment",
    category: "Classes",
  },
  {
    id: 63,
    src: `${DUNCAN_URL}/20221115-IFE-CF_015.JPG`,
    alt: "PT class technique feedback",
    category: "Classes",
  },
  {
    id: 64,
    src: `${DUNCAN_URL}/20221115-IFE-CF_016.JPG`,
    alt: "PT class coaching walkthrough",
    category: "Classes",
  },
  {
    id: 65,
    src: `${DUNCAN_URL}/20221115-IFE-CF_017.JPG`,
    alt: "PT class floor training",
    category: "Classes",
  },
  {
    id: 66,
    src: `${DUNCAN_URL}/20221115-IFE-CF_018.JPG`,
    alt: "PT class workout session",
    category: "Classes",
  },
  {
    id: 67,
    src: `${DUNCAN_URL}/20221115-IFE-CF_019.JPG`,
    alt: "PT class programme design",
    category: "Classes",
  },
  {
    id: 68,
    src: `${DUNCAN_URL}/20221115-IFE-CF_020.JPG`,
    alt: "PT class supervised training",
    category: "Classes",
  },
  {
    id: 69,
    src: `${DUNCAN_URL}/20221115-IFE-CF_021.JPG`,
    alt: "PT class resistance training",
    category: "Classes",
  },
  {
    id: 70,
    src: `${DUNCAN_URL}/20221115-IFE-CF_022.JPG`,
    alt: "PT class conditioning drill",
    category: "Classes",
  },
  {
    id: 71,
    src: `${DUNCAN_URL}/20221115-IFE-CF_023.JPG`,
    alt: "PT class strength exercise",
    category: "Classes",
  },
  {
    id: 72,
    src: `${DUNCAN_URL}/20221115-IFE-CF_024.JPG`,
    alt: "PT class end of session review",
    category: "Classes",
  },
  {
    id: 73,
    src: `${DUNCAN_URL}/20221115-IFE-CF_025.JPG`,
    alt: "PT class practical sign-off",
    category: "Classes",
  },
  // Events — exams and inductions
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
    id: 25,
    src: `${NORWICH_URL}/ANATOMY-AND-PHYSIOLOGY-4-20220124-IFE-TGGNCC026.jpg`,
    alt: "Anatomy and physiology theory session Norwich",
    category: "Events",
  },
  {
    id: 26,
    src: `${NORWICH_URL}/ANATOMY-AND-PHYSIOLOGY-5-20220124-IFE-TGGNCC025.jpg`,
    alt: "Anatomy and physiology class Norwich",
    category: "Events",
  },
  {
    id: 27,
    src: `${NORWICH_URL}/ANATOMY-AND-PHYSIOLOGY-6-20220124-IFE-TGGNCC024.jpg`,
    alt: "Anatomy and physiology study Norwich",
    category: "Events",
  },
  {
    id: 28,
    src: `${NORWICH_URL}/ANATOMY-AND-PHYSIOLOGY-7-20220124-IFE-TGGNCC023.jpg`,
    alt: "Anatomy and physiology learning Norwich",
    category: "Events",
  },
  {
    id: 29,
    src: `${NORWICH_URL}/ANATOMY-AND-PHYSIOLOGY-EXAM-2%20-20220124-IFE-TGGNCC043.jpg`,
    alt: "Anatomy and physiology exam Norwich",
    category: "Events",
  },
  {
    id: 30,
    src: `${NORWICH_URL}/ANATOMY-AND-PHYSIOLOGY-EXAM-20220124-IFE-TGGNCC044.jpg`,
    alt: "Anatomy and physiology exam session Norwich",
    category: "Events",
  },
  {
    id: 31,
    src: `${NORWICH_URL}/ANATOMY-AND-PHYSIOLOGY-EXAM-3-20220124-IFE-TGGNCC027.jpg`,
    alt: "Anatomy and physiology exam review Norwich",
    category: "Events",
  },
  {
    id: 74,
    src: `${CFG_URL}/IFE%20PT%20COURSE%20ASSESSMENT%20TEAM.JPG`,
    alt: "PT course assessment team photo",
    category: "Events",
  },
  {
    id: 75,
    src: `${CFG_URL}/IMG_0170.JPG`,
    alt: "Group induction day",
    category: "Events",
  },
  {
    id: 76,
    src: `${CFG_URL}/IMG_0171.JPG`,
    alt: "Group induction practical exercise",
    category: "Events",
  },
  {
    id: 77,
    src: `${CFG_URL}/IMG_0172.JPG`,
    alt: "Group induction gym session",
    category: "Events",
  },
  {
    id: 78,
    src: `${CFG_URL}/IMG_0173.JPG`,
    alt: "Group induction coaching",
    category: "Events",
  },
  {
    id: 79,
    src: `${CFG_URL}/IMG_0174.JPG`,
    alt: "Group induction technique work",
    category: "Events",
  },
  {
    id: 80,
    src: `${CFG_URL}/IMG_0175.JPG`,
    alt: "Group induction assessment",
    category: "Events",
  },
  {
    id: 81,
    src: `${CFG_URL}/IMG_0176.JPG`,
    alt: "Group induction floor session",
    category: "Events",
  },
  {
    id: 82,
    src: `${CFG_URL}/IMG_0177.JPG`,
    alt: "Group induction hands-on practice",
    category: "Events",
  },
  {
    id: 83,
    src: `${CFG_URL}/IMG_0178.JPG`,
    alt: "Group induction student activity",
    category: "Events",
  },
  {
    id: 84,
    src: `${CFG_URL}/IMG_0179.JPG`,
    alt: "Group induction exercise drill",
    category: "Events",
  },
  {
    id: 85,
    src: `${CFG_URL}/IMG_0180.JPG`,
    alt: "Group induction skills session",
    category: "Events",
  },
  {
    id: 86,
    src: `${CFG_URL}/IMG_0181.JPG`,
    alt: "Group induction movement practice",
    category: "Events",
  },
  {
    id: 87,
    src: `${CFG_URL}/IMG_0182.JPG`,
    alt: "Group induction coaching feedback",
    category: "Events",
  },
  {
    id: 88,
    src: `${CFG_URL}/IMG_0183.JPG`,
    alt: "Group induction practical work",
    category: "Events",
  },
  {
    id: 89,
    src: `${CFG_URL}/IMG_0184.JPG`,
    alt: "Group induction gym floor activity",
    category: "Events",
  },
  {
    id: 90,
    src: `${CFG_URL}/IMG_0185.JPG`,
    alt: "Group induction student demonstration",
    category: "Events",
  },
  {
    id: 91,
    src: `${CFG_URL}/IMG_0186.JPG`,
    alt: "Group induction technique review",
    category: "Events",
  },
  {
    id: 92,
    src: `${CFG_URL}/IMG_0187.JPG`,
    alt: "Group induction supervised exercise",
    category: "Events",
  },
  {
    id: 93,
    src: `${CFG_URL}/IMG_0188.JPG`,
    alt: "Group induction resistance work",
    category: "Events",
  },
  {
    id: 94,
    src: `${CFG_URL}/IMG_0189.JPG`,
    alt: "Group induction conditioning",
    category: "Events",
  },
  {
    id: 95,
    src: `${CFG_URL}/IMG_0190.JPG`,
    alt: "Group induction strength session",
    category: "Events",
  },
  {
    id: 96,
    src: `${CFG_URL}/IMG_0191.JPG`,
    alt: "Group induction closing session",
    category: "Events",
  },
  // Training — coaching sessions
  {
    id: 644,
    src: `${BUCKET_URL}/BURY-BASKETBALL-HARRY-IFE-TGGNHR_035.jpg`,
    alt: "Bury basketball training with Harry",
    category: "Training",
  },
  {
    id: 74444,
    src: `${BUCKET_URL}/BURY-BASKETBALL-HARRY2-IFE-TGGNHR_036.jpg`,
    alt: "Bury basketball practice match with Harry",
    category: "Training",
  },
  {
    id: 844,
    src: `${BUCKET_URL}/BURY-BASKETBALL-HARRY3-IFE-TGGNHR_037.jpg`,
    alt: "Bury basketball court drills with Harry",
    category: "Training",
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
    id: 32,
    src: `${NORWICH_URL}/BROAD-JUMP-2-20220124-IFE-TGGNCC028.jpg`,
    alt: "Broad jump training Norwich",
    category: "Training",
  },
  {
    id: 33,
    src: `${NORWICH_URL}/BROAD-JUMP-20220124-IFE-TGGNCC029.jpg`,
    alt: "Broad jump exercise Norwich",
    category: "Training",
  },
  {
    id: 34,
    src: `${NORWICH_URL}/CLOE-AND-HARRY-20220124-IFE-TGGNCC012.jpg`,
    alt: "Cloe and Harry training session Norwich",
    category: "Training",
  },
  {
    id: 35,
    src: `${NORWICH_URL}/HARRY-AND-PARIS-20220124-IFE-TGGNCC002.jpg`,
    alt: "Harry and Paris personal training Norwich",
    category: "Training",
  },
  {
    id: 36,
    src: `${NORWICH_URL}/HARRY-AND-PARIS-MATTHEWS-20220124-IFE-TGGNCC003.jpg`,
    alt: "Harry and Paris Matthews training Norwich",
    category: "Training",
  },
  {
    id: 37,
    src: `${NORWICH_URL}/HARRY-GYM-FLOOR-%204-20220124-IFE-TGGNCC047.jpg`,
    alt: "Harry gym floor coaching Norwich",
    category: "Training",
  },
  {
    id: 38,
    src: `${NORWICH_URL}/HARRY-GYM-FLOOR-%205-20220124-IFE-TGGNCC046.jpg`,
    alt: "Harry gym floor instruction Norwich",
    category: "Training",
  },
  {
    id: 39,
    src: `${NORWICH_URL}/HARRY-GYM-FLOOR-2-20220124-IFE-TGGNCC049.jpg`,
    alt: "Harry gym floor session 2 Norwich",
    category: "Training",
  },
  {
    id: 40,
    src: `${NORWICH_URL}/HARRY-GYM-FLOOR-20220124-IFE-TGGNCC004.jpg`,
    alt: "Harry on the gym floor Norwich",
    category: "Training",
  },
  {
    id: 41,
    src: `${NORWICH_URL}/HARRY-GYM-FLOOR-3-20220124-IFE-TGGNCC048.jpg`,
    alt: "Harry gym floor session 3 Norwich",
    category: "Training",
  },
  {
    id: 42,
    src: `${NORWICH_URL}/HARRY-GYM-FLOOR-6-20220124-IFE-TGGNCC022.jpg`,
    alt: "Harry gym floor session 6 Norwich",
    category: "Training",
  },
  {
    id: 43,
    src: `${NORWICH_URL}/HARRY-GYM-FLOOR-7-20220124-IFE-TGGNCC021.jpg`,
    alt: "Harry gym floor session 7 Norwich",
    category: "Training",
  },
  {
    id: 44,
    src: `${NORWICH_URL}/HARRY-GYM-FLOOR-720220124-IFE-TGGNCC019.jpg`,
    alt: "Harry gym floor training Norwich",
    category: "Training",
  },
  {
    id: 45,
    src: `${NORWICH_URL}/HARRY-GYM-FLOOR-8-20220124-IFE-TGGNCC020.jpg`,
    alt: "Harry gym floor session 8 Norwich",
    category: "Training",
  },
  {
    id: 46,
    src: `${NORWICH_URL}/HARRY-GYM-FLOOR-9-20220124-IFE-TGGNCC013.jpg`,
    alt: "Harry gym floor session 9 Norwich",
    category: "Training",
  },
  {
    id: 47,
    src: `${NORWICH_URL}/HARRY-MATTHEWS-BARNEY-HOLMES-20220124-IFE-TGGNCC001.jpg`,
    alt: "Harry Matthews and Barney Holmes Norwich",
    category: "Training",
  },
  {
    id: 48,
    src: `${NORWICH_URL}/HARRY-PARIS-CLOE-2-20220124-IFE-TGGNCC010.jpg`,
    alt: "Harry, Paris and Cloe training Norwich",
    category: "Training",
  },
  // Facilities — promotional shots (end)
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
] as string[];

const PAGE_SIZE = 12;

const HERO_IMAGES = [
  `${NORWICH_URL}/HARRY-PARIS-CLOE-2-20220124-IFE-TGGNCC010.jpg`,
  `${BUCKET_URL}/FITNESS-DISCUSSION-IFE-TGGNHR_006.jpg`,
  `${CFG_URL}/20230329-IFE-CF_001.JPG`,
  `${BUCKET_URL}/GYM-FLOOR%20EDUCATION-IFE-TGGNHR_008.jpg`,
];

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
  }, [activeImageId, filtered]); // compiler will perfectly match optimization using data references

  useEffect(() => {
    document.body.style.overflow = activeImageId !== null ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeImageId]);

  function scrollToGrid() {
    gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
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
          <div className="w-10 h-[2px] bg-[#CE1A19] mb-5" aria-hidden="true" />
          <h1 className="text-5xl sm:text-6xl font-black text-white leading-tight mb-4 uppercase tracking-tight">
            Our Work
          </h1>
          <p className="text-lg text-white/80 max-w-xl leading-relaxed">
            Real sessions, real people, real results — explore our training
            sessions, practical classes, events, and facilities.
          </p>
        </div>
      </section>

      {/* Gallery section */}
      <section className="bg-white py-16">
        <div ref={gridRef} className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Category filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => handleCategoryChange(cat)}
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
            <div className="flex justify-center items-center gap-2 mt-12 flex-wrap">
              <button
                type="button"
                onClick={() => {
                  setCurrentPage((p) => Math.max(1, p - 1));
                  scrollToGrid();
                }}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded text-sm bg-gray-100 text-gray-600 hover:bg-zinc-950 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                ← Prev
              </button>

              {getPageNumbers(currentPage, totalPages).map((page, i) =>
                page === "..." ? (
                  <span
                    key={`ellipsis-${i}`}
                    className="px-2 text-gray-400 select-none"
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
                className="px-4 py-2 rounded text-sm bg-gray-100 text-gray-600 hover:bg-zinc-950 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                Next →
              </button>
            </div>
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
