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
    <main className="bg-zinc-50">
      <PageHero
        image="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=1920&q=80"
        label="Behind The Scenes"
        title="Gallery"
        subtitle="A look inside our sessions, facilities, and the moments that define Integrity."
        minHeight="60vh"
      />

      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-[#CE1A19] text-xs font-bold tracking-[4px] uppercase mb-4">
              Our Work
            </p>
            <h2 className="text-2xl md:text-4xl font-black text-zinc-950 tracking-tight uppercase leading-none">
              Life At Integrity
            </h2>
            <div className="w-14 h-1 bg-[#CE1A19] mt-5" aria-hidden="true" />
          </div>

          <GalleryGrid />
        </div>
      </section>
    </main>
  );
}
