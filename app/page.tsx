import type { Metadata } from "next";
import Hero from "./components/home/Hero";
import Marquee from "./components/home/Marquee";
import Mission from "./components/home/Mission";
import Stats from "./components/home/Stats";
import Location from "./components/home/Location";
import Qualifications from "./components/home/Qualifications";
import Testimonials from "./components/home/Testimonials";
import Newsletter from "./components/home/NewsLetter";


export const metadata: Metadata = {
  title: "Integrity Fitness Education | Personal Training Courses Norwich",
  description: "CIMSPA-accredited personal trainer qualifications in Norwich, Norfolk. One-to-one learning with industry professionals. Level 2, Level 3 and CPD courses available.",
  alternates: {
    canonical: "https://www.integrityfitnesseducation.co.uk",
  },
  openGraph: {
    title: "Integrity Fitness Education | Personal Training Courses Norwich",
    description: "CIMSPA-accredited personal trainer qualifications in Norwich, Norfolk. One-to-one learning with industry professionals.",
    url: "https://www.integrityfitnesseducation.co.uk",
    siteName: "Integrity Fitness Education",
    locale: "en_GB",
    type: "website",
  },
};


export default function Home() {

  return (
    <>
      <Hero />
      <Marquee />
      <Qualifications />
      <Mission />
      <Stats />
      <Testimonials />
      <Location />
      {/* <CTAPanels /> */}
      <Newsletter />
    </>
  );
}
