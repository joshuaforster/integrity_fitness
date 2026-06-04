import AboutHero from "../components/about/AboutHero";
import AboutMission from "../components/about/AboutMission";
import WhereTheyDiffer from "../components/about/WhereTheyDiffer";

import OurStory from "../components/about/OurStory";
import Testimonial from "../components/about/Testimonial";
import AboutCTA from "../components/about/AboutCta";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Integrity Fitness Education",
  description: "Meet the team behind Integrity Fitness Education. Based in Norwich, Norfolk, we deliver one-to-one personal trainer qualifications built around you.",
  alternates: {
    canonical: "https://www.integrityfitnesseducation.co.uk/about",
  },
  openGraph: {
    title: "About Us | Integrity Fitness Education",
    description: "Meet the team behind Integrity Fitness Education — CIMSPA-accredited PT educators based in Norwich, Norfolk.",
    url: "https://www.integrityfitnesseducation.co.uk/about",
    siteName: "Integrity Fitness Education",
    locale: "en_GB",
    type: "website",
    images: [
      {
        url: "https://pub-6e6bb53af6c34756a861d2c0a8259e84.r2.dev/TGG%20HALL%20ROAD/GYM-FLOOR-EXPLANATION-IFE-TGGNHR_003.jpg",
        width: 1200,
        height: 630,
        alt: "Integrity Fitness Education team in Norwich",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | Integrity Fitness Education",
    description: "Meet the team behind Integrity Fitness Education — CIMSPA-accredited PT educators based in Norwich, Norfolk.",
    images: ["https://pub-6e6bb53af6c34756a861d2c0a8259e84.r2.dev/TGG%20HALL%20ROAD/GYM-FLOOR-EXPLANATION-IFE-TGGNHR_003.jpg"],
  },
};

export default function About() {
  return (
    <>
      <AboutHero />
      <OurStory />
      <WhereTheyDiffer />
      <AboutMission />
      {/* <Values /> */}
      <Testimonial />
      <AboutCTA />
    </>
  );
}
