import { Metadata } from "next";
import GalleryGrid from "@/app/components/gallery/GalleryGrid";

export const metadata: Metadata = {
  title: "Gallery | Integrity Fitness Education",
  description:
    "Browse photos from Integrity Fitness Education — training sessions, facilities, and events in Norwich, Norfolk.",
  alternates: {
    canonical: "https://www.integrityfitnesseducation.co.uk/gallery",
  },
};

export default function GalleryPage() {
  return (
    <main>
      <GalleryGrid />
    </main>
  );
}
