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
