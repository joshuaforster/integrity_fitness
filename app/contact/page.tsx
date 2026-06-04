import type { Metadata } from "next";
import ContactHero from "../components/contact/ContactHero";
import ContactForm from "../components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact | Integrity Fitness Education",
  description: "Get in touch with Integrity Fitness Education. Ask us about our personal trainer courses, CPD qualifications, or enrol in our Norwich-based programme today.",
  alternates: {
    canonical: "https://www.integrityfitnesseducation.co.uk/contact",
  },
  openGraph: {
    title: "Contact | Integrity Fitness Education",
    description: "Get in touch with Integrity Fitness Education about our CIMSPA-accredited personal trainer courses in Norwich, Norfolk.",
    url: "https://www.integrityfitnesseducation.co.uk/contact",
    siteName: "Integrity Fitness Education",
    locale: "en_GB",
    type: "website",
    images: [
      {
        url: "https://pub-6e6bb53af6c34756a861d2c0a8259e84.r2.dev/TGG%20HALL%20ROAD/GYM-FLOOR-EXPLANATION-IFE-TGGNHR_003.jpg",
        width: 1200,
        height: 630,
        alt: "Contact Integrity Fitness Education in Norwich",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact | Integrity Fitness Education",
    description: "Get in touch with Integrity Fitness Education about our CIMSPA-accredited personal trainer courses in Norwich, Norfolk.",
    images: ["https://pub-6e6bb53af6c34756a861d2c0a8259e84.r2.dev/TGG%20HALL%20ROAD/GYM-FLOOR-EXPLANATION-IFE-TGGNHR_003.jpg"],
  },
};

export default function Contact() {
  return (
    <>
      <ContactHero />
      <ContactForm />
    </>
  );
}
