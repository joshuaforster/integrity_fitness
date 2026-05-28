import AboutHero from "../components/about/AboutHero";
import AboutMission from "../components/about/AboutMission";
import AboutStats from "../components/about/AboutStats";
import Values from "../components/about/Values";
import OurStory from "../components/about/OurStory";
import Testimonial from "../components/about/Testimonial";
import AboutCTA from "../components/about/AboutCta";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Integrity Fitness Education",
  description: "Meet the team behind Integrity Fitness Education. Based in Norwich, Norfolk, we deliver one-to-one personal trainer qualifications built around you.",
  openGraph: {
    title: "About Us | Integrity Fitness Education",
    description: "Meet the team behind Integrity Fitness Education — CIMSPA-accredited PT educators based in Norwich, Norfolk.",
    url: "https://www.integrityfitnesseducation.co.uk/about",
    siteName: "Integrity Fitness Education",
    locale: "en_GB",
    type: "website",
  },
};

export default function About() {
  return (
    <>
      <AboutHero />
      <AboutMission />
      <AboutStats />
      <Values />
      <OurStory />
      <Testimonial />
      <AboutCTA />
    </>
  );
}
