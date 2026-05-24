import Hero from "./components/home/Hero";
import Marquee from "./components/home/Marquee";
import Mission from "./components/home/Mission";
import Stats from "./components/home/Stats";
import Location from "./components/home/Location";
import Qualifications from "./components/home/Qualifications";
import Testimonials from "./components/home/Testimonials";
import CTAPanels from "./components/home/CTAPanels";
import Newsletter from "./components/home/NewsLetter";


export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Mission />
      <Stats />
      <Location />
      <Qualifications />
      <Testimonials />
      <CTAPanels />
      <Newsletter />
    </>
  );
}
