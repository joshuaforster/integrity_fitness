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
    canonical: "https://www.integrityfitness.education",
  },
  openGraph: {
    title: "Integrity Fitness Education | Personal Training Courses Norwich",
    description: "CIMSPA-accredited personal trainer qualifications in Norwich, Norfolk. One-to-one learning with industry professionals.",
    url: "https://www.integrityfitness.education",
    siteName: "Integrity Fitness Education",
    locale: "en_GB",
    type: "website",
    images: [
      {
        url: "https://pub-6e6bb53af6c34756a861d2c0a8259e84.r2.dev/TGG%20HALL%20ROAD/GYM-FLOOR-EXPLANATION-IFE-TGGNHR_003.jpg",
        width: 1200,
        height: 630,
        alt: "Integrity Fitness Education — personal trainer courses in Norwich",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Integrity Fitness Education | Personal Training Courses Norwich",
    description: "CIMSPA-accredited personal trainer qualifications in Norwich, Norfolk. One-to-one learning with industry professionals.",
    images: ["https://pub-6e6bb53af6c34756a861d2c0a8259e84.r2.dev/TGG%20HALL%20ROAD/GYM-FLOOR-EXPLANATION-IFE-TGGNHR_003.jpg"],
  },
};


const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Integrity Fitness Education",
  url: "https://www.integrityfitness.education",
  telephone: "+447795033958",
  email: "harry@integrityfitness.education",
  image: "https://pub-6e6bb53af6c34756a861d2c0a8259e84.r2.dev/TGG%20HALL%20ROAD/GYM-FLOOR-EXPLANATION-IFE-TGGNHR_003.jpg",
  description: "CIMSPA-accredited personal trainer qualifications in Norwich, Norfolk. One-to-one learning with industry professionals. Level 2, Level 3 and CPD courses available.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "22 Oval Avenue",
    addressLocality: "Norwich",
    addressRegion: "Norfolk",
    postalCode: "NR5 0DP",
    addressCountry: "GB",
  },
  priceRange: "££",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
  ],
  sameAs: [],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
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
