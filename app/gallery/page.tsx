import { Metadata } from "next";
import GalleryGrid from "@/app/components/gallery/GalleryGrid";

export const metadata: Metadata = {
  title: "Gallery | Integrity Fitness Education",
  description:
    "Browse photos from Integrity Fitness Education — training sessions, facilities, and events in Norwich, Norfolk.",
  alternates: {
    canonical: "https://www.integrityfitness.education/gallery",
  },
  openGraph: {
    title: "Gallery | Integrity Fitness Education",
    description: "Browse photos from Integrity Fitness Education — training sessions, facilities, and events in Norwich, Norfolk.",
    url: "https://www.integrityfitness.education/gallery",
    siteName: "Integrity Fitness Education",
    locale: "en_GB",
    type: "website",
    images: [
      {
        url: "https://pub-6e6bb53af6c34756a861d2c0a8259e84.r2.dev/TGG%20HALL%20ROAD/GYM-FLOOR-EXPLANATION-IFE-TGGNHR_003.jpg",
        width: 1200,
        height: 630,
        alt: "Integrity Fitness Education gallery — Norwich gym facilities",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gallery | Integrity Fitness Education",
    description: "Browse photos from Integrity Fitness Education — training sessions, facilities, and events in Norwich, Norfolk.",
    images: ["https://pub-6e6bb53af6c34756a861d2c0a8259e84.r2.dev/TGG%20HALL%20ROAD/GYM-FLOOR-EXPLANATION-IFE-TGGNHR_003.jpg"],
  },
};

export default function GalleryPage() {
  return (
    <main>
      <GalleryGrid />
    </main>
  );
}
