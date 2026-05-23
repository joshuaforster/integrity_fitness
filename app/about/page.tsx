import AboutHero from "../components/about/AboutHero";
import AboutMission from "../components/about/AboutMission";
import AboutStats from "../components/about/AboutStats";
import Values from "../components/about/Values";
import OurStory from "../components/about/OurStory";
import AboutCTA from "../components/about/AboutCta";

export const metadata = {
  title: "About Us | Integrity Fitness Education",
};

export default function About() {
  return (
    <>
      <AboutHero />
      <AboutMission />
      <AboutStats />
      <Values />
      <OurStory />
      <AboutCTA />
    </>
  );
}
