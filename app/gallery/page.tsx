import { Metadata } from "next";
import PageHero from "@/app/components/PageHero";
import GalleryGrid from "@/app/components/gallery/GalleryGrid";

export const metadata: Metadata = {
  title: "Gallery | Integrity Fitness Education",
  description:
    "Browse photos from Integrity Fitness Education — training sessions, facilities, and events in Norwich, Norfolk.",
};

export default function GalleryPage() {
  return (
    <main className="bg-white">
      <PageHero
        image="https://pub-6e6bb53af6c34756a861d2c0a8259e84.r2.dev/TGG%20Norwich/HARRY-GYM-FLOOR-720220124-IFE-TGGNCC019.jpg"
        label="Behind The Scenes"
        title="Gallery"
        subtitle="A look inside our sessions, facilities, and the moments that define Integrity."
        minHeight="60vh"
      />

      {/* Spacious, breathable layout container segment */}
      <section
        aria-labelledby="gallery-heading"
        className="py-20 md:py-28 bg-white"
      >
        <div className="reveal mx-auto max-w-7xl px-6 lg:px-8">
          {/* Asymmetric Section Header Block Split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-16 items-start mb-16 md:mb-20">
            {/* Left Anchor (Spans 4 Columns) */}
            <div className="lg:col-span-4">
              <p className="text-[#CE1A19] text-xs font-bold tracking-[4px] uppercase">
                Our Work
              </p>
              <div className="w-14 h-1 bg-[#CE1A19] mt-4" aria-hidden="true" />
            </div>

            {/* Right Anchor (Spans 8 Columns) */}
            <div className="lg:col-span-8 lg:pl-4">
              <h2
                id="gallery-heading"
                className="text-3xl md:text-5xl font-black text-zinc-950 tracking-tight uppercase leading-none"
              >
                Life at Integrity
              </h2>
              <p className="text-zinc-500 text-sm md:text-base leading-relaxed mt-4 max-w-xl">
                Real setups, authentic practical engineering metrics, and
                student cohorts execution. Use the options below to filter
                across our facility zones.
              </p>
            </div>
          </div>

          {/* Child client-side rendering matrix grid */}
          <GalleryGrid />
        </div>
      </section>
    </main>
  );
}
